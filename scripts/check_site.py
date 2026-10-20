"""Check static page metadata, landmarks, IDs and local link destinations.

Run with Python 3: python scripts/check_site.py
No build or third-party dependencies required.
"""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlsplit, unquote
import sys


class Page(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.tags = []
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        self.tags.append((tag, dict(attrs)))

    handle_startendtag = handle_starttag


def check(root):
    files = [root / 'index.html', *sorted((root / 'blog').rglob('*.html'))]
    errors, pages, canonicals = [], {}, set()
    for file in files:
        source = file.read_text(encoding='utf-8')
        page = pages[file] = Page(source)
        label = file.relative_to(root)
        for tag in ('h1', 'main', 'title'):
            if sum(t == tag for t, _ in page.tags) != 1:
                errors.append(f'{label}: expected one {tag}')
        ids = [a['id'] for _, a in page.tags if 'id' in a]
        if len(ids) != len(set(ids)):
            errors.append(f'{label}: duplicate IDs')
        canonical = [a.get('href') for t, a in page.tags if t == 'link' and a.get('rel') == 'canonical']
        route = '/' + str(file.parent.relative_to(root)).replace('\\', '/') + '/'
        if file == root / 'index.html':
            route = '/'
        if canonical != ['https://maxbarrass.com' + route] or canonical[0] in canonicals:
            errors.append(f'{label}: missing, duplicate or incorrect canonical')
        canonicals.update(canonical)
        if not any(t == 'meta' and a.get('name') == 'description' and a.get('content') for t, a in page.tags):
            errors.append(f'{label}: missing description')
        for private_field in ('editorial_status:', 'publishing_action:', 'draft_for_review'):
            if private_field in source:
                errors.append(f'{label}: editorial field leaked')
    checked = 0
    for file, page in pages.items():
        route = '/' + file.relative_to(root).as_posix()
        for tag, attrs in page.tags:
            target = attrs.get('href') if tag in ('a', 'link') else attrs.get('src') if tag in ('img', 'script') else None
            if not target:
                continue
            url = urlsplit(urljoin('https://maxbarrass.com' + route, target))
            if url.scheme not in ('http', 'https') or url.netloc != 'maxbarrass.com':
                continue
            destination = root / unquote(url.path).lstrip('/')
            if destination.is_dir():
                destination /= 'index.html'
            checked += 1
            if not destination.is_file():
                errors.append(f'{file.relative_to(root)}: missing {target}')
            elif url.fragment:
                dest_page = pages.get(destination) or Page(destination.read_text(encoding='utf-8'))
                if not any(a.get('id') == unquote(url.fragment) for _, a in dest_page.tags):
                    errors.append(f'{file.relative_to(root)}: missing fragment {target}')
    if errors:
        print('\n'.join(errors))
        return 1
    print(f'PASS: {len(files)} pages; unique metadata, landmarks, IDs; {checked} local links/assets/fragments.')
    return 0


if __name__ == '__main__':
    sys.exit(check(Path(__file__).resolve().parent.parent))
