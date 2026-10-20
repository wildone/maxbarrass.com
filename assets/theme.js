(() => {
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const read = () => { try { return localStorage.getItem('theme') || 'auto'; } catch { return 'auto'; } };
  let mode = read();
  const apply = () => {
    document.documentElement.classList.toggle('dark', mode === 'dark' || (mode !== 'light' && media.matches));
    const button = document.querySelector('[data-theme-toggle]');
    if (button) {
      button.textContent = 'Theme: ' + mode[0].toUpperCase() + mode.slice(1);
      button.setAttribute('aria-label', 'Theme: ' + mode + '. Switch to ' + ({auto:'light',light:'dark',dark:'auto'}[mode] || 'light') + ' theme');
    }
  };
  apply();
  document.addEventListener('DOMContentLoaded', () => {
    apply();
    document.querySelector('[data-theme-toggle]')?.addEventListener('click', () => {
      mode = ({auto:'light',light:'dark',dark:'auto'}[mode] || 'light');
      try { localStorage.setItem('theme', mode); } catch {}
      apply();
    });
  });
  media.addEventListener('change', apply);
})();
