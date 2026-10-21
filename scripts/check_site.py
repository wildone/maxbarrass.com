"""Check static page metadata, landmarks, IDs and local link destinations.

Run with Python 3: python scripts/check_site.py
No build or third-party dependencies required.
"""
from html.parser import HTMLParser
from hashlib import sha256
from pathlib import Path
from urllib.parse import urljoin, urlsplit, unquote
import sys

ARTICLE_DATES = {
    '1767-contributions-in-one-day': '2026/10/11',
    '42850-contributions-the-year-i-changed-how-i-build-software': '2026/10/14',
    'has-your-software-factory-run-out-of-tokens': '2026/09/30',
    'what-could-you-do-with-more-tokens': '2026/10/08',
    'your-organisation-needs-a-software-factory': '2026/08/30',
}
REDIRECTS = {f'/blog/{slug}/': f'/blog/{date}/{slug}/' for slug, date in ARTICLE_DATES.items()}


class Page(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.tags = []
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        self.tags.append((tag, dict(attrs)))

    handle_startendtag = handle_starttag


def check(root):
    asset_versions = {name: sha256((root / name.lstrip('/')).read_bytes()).hexdigest()[:12] for name in ('/assets/theme.js', '/assets/writing.css', '/assets/article-redirect.js')}
    files = [root / 'index.html', *sorted((root / 'blog').rglob('*.html'))]
    errors, pages, canonicals = [], {}, set()
    for old, new in REDIRECTS.items():
        for route in (old, new):
            if not (root / route.lstrip('/') / 'index.html').is_file():
                errors.append(f'Missing article or redirect: {route}')
    for file in files:
        source = file.read_text(encoding='utf-8')
        page = pages[file] = Page(source)
        label = file.relative_to(root)
        for tag in ('h1', 'main', 'title'):
            if sum(t == tag for t, _ in page.tags) != 1:
                errors.append(f'{label}: expected one {tag}')
        if not any(t == 'span' and 'data-theme-icon' in a and a.get('id') == 'theme-icon' for t, a in page.tags):
            errors.append(f'{label}: missing nested theme icon')
        if not any(t == 'span' and 'data-theme-label' in a and a.get('id') == 'theme-label' for t, a in page.tags):
            errors.append(f'{label}: missing nested theme label')
        if not any(t == 'link' and 'fonts.googleapis.com' in a.get('href', '') and 'Material+Symbols+Outlined' in a.get('href', '') for t, a in page.tags):
            errors.append(f'{label}: missing theme icon font')
        ids = [a['id'] for _, a in page.tags if 'id' in a]
        if len(ids) != len(set(ids)):
            errors.append(f'{label}: duplicate IDs')
        canonical = [a.get('href') for t, a in page.tags if t == 'link' and a.get('rel') == 'canonical']
        route = '/' + str(file.parent.relative_to(root)).replace('\\', '/') + '/'
        if file == root / 'index.html':
            route = '/'
        redirect = REDIRECTS.get(route)
        expected_canonical = 'https://maxbarrass.com' + (redirect or route)
        if canonical != [expected_canonical] or (not redirect and expected_canonical in canonicals):
            errors.append(f'{label}: missing, duplicate or incorrect canonical')
        if not redirect:
            canonicals.update(canonical)
        if route == '/blog/' and not any(t == 'main' and a.get('data-series-index') == 'building-my-software-factory' for t, a in page.tags):
            errors.append(f'{label}: missing series index marker')
        if route in REDIRECTS.values():
            if not any(t == 'article' and a.get('data-series') == 'building-my-software-factory' for t, a in page.tags):
                errors.append(f'{label}: missing series membership')
            if not any(t == 'a' and 'data-series-home' in a and a.get('href') == '/blog/' for t, a in page.tags):
                errors.append(f'{label}: missing series navigation')
        if route.startswith('/blog/'):
            social_urls = [a.get('content') for t, a in page.tags if t == 'meta' and a.get('property') == 'og:url']
            if social_urls != [expected_canonical]:
                errors.append(f'{label}: social URL differs from canonical')
        if redirect:
            refreshes = [a.get('content') for t, a in page.tags if t == 'meta' and a.get('http-equiv', '').lower() == 'refresh']
            if refreshes != ['1;url=' + redirect]:
                errors.append(f'{label}: missing or incorrect static redirect')
            if not any(t == 'a' and a.get('href') == redirect for t, a in page.tags):
                errors.append(f'{label}: missing visible redirect fallback')
            if not any(t == 'meta' and a.get('name') == 'robots' and a.get('content') == 'noindex,follow' for t, a in page.tags):
                errors.append(f'{label}: redirect should not be indexed')
            if not any(t == 'script' and urlsplit(a.get('src', '')).path == '/assets/article-redirect.js' for t, a in page.tags):
                errors.append(f'{label}: missing query/fragment-preserving redirect')
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
            if url.path in asset_versions and url.query != 'v=' + asset_versions[url.path]:
                errors.append(f'{file.relative_to(root)}: stale asset version for {target}; run python scripts/version_assets.py')
            if url.path in REDIRECTS:
                errors.append(f'{file.relative_to(root)}: link still points to old article URL {target}')
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
    print(f'PASS: {len(files)} pages, {len(REDIRECTS)} legacy redirects; canonical/social URLs, landmarks, IDs; {checked} local links/assets/fragments.')
    return 0


if __name__ == '__main__':
    sys.exit(check(Path(__file__).resolve().parent.parent))
