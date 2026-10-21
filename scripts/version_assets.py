"""Refresh shared asset URL versions after editing JS/CSS; no build required."""
from hashlib import sha256
from pathlib import Path
import re

root = Path(__file__).resolve().parent.parent
assets = ('/assets/theme.js', '/assets/writing.css', '/assets/article-redirect.js', '/assets/navigation.js')
versions = {name: sha256((root / name.lstrip('/')).read_bytes()).hexdigest()[:12] for name in assets}
pattern = re.compile(r'((?:src|href)=")(/assets/(?:theme\.js|writing\.css|article-redirect\.js|navigation\.js))(?:\?[^\"]*)?(\")')
for page in [root / 'index.html', *sorted((root / 'blog').rglob('*.html')), root / 'projects/index.html']:
    source = page.read_text(encoding='utf-8')
    updated = pattern.sub(lambda match: match[1] + match[2] + '?v=' + versions[match[2]] + match[3], source)
    if updated != source:
        page.write_text(updated, encoding='utf-8', newline='\n')
print('Shared asset URL versions refreshed.')
