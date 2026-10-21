// Native links retain browser history, fragment scrolling and no-JS navigation.
document.documentElement.classList.add('nav-ready');
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('[data-site-header]');
  const menu = header?.querySelector('[data-menu-toggle]');
  const links = header?.querySelector('.site-links');
  if (!menu || !links) return;
  const close = () => { menu.setAttribute('aria-expanded', 'false'); links.removeAttribute('data-open'); };
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    links.toggleAttribute('data-open', open);
  });
  links.addEventListener('click', event => { if (event.target.closest('a')) close(); });
  header.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { close(); menu.focus(); }
  });
  const update = () => {
    for (const link of links.querySelectorAll('a')) {
      const url = new URL(link.href);
      const page = url.pathname === '/blog/' ? location.pathname.startsWith('/blog/') : url.pathname === location.pathname;
      const active = page && (!url.hash || url.hash === location.hash);
      if (active) link.setAttribute('aria-current', url.hash ? 'location' : 'page');
      else link.removeAttribute('aria-current');
    }
  };
  window.addEventListener('hashchange', update);
  window.addEventListener('popstate', update);
  window.addEventListener('pageshow', () => { close(); update(); });
  update();
});
