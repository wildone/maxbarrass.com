(() => {
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const read = () => {
    try {
      const stored = localStorage.getItem('theme');
      return ['auto', 'light', 'dark'].includes(stored) ? stored : 'auto';
    } catch { return 'auto'; }
  };
  let mode = read();
  const apply = () => {
    document.documentElement.classList.toggle('dark', mode === 'dark' || (mode === 'auto' && media.matches));
    const button = document.querySelector('[data-theme-toggle]');
    if (button) {
      const label = mode[0].toUpperCase() + mode.slice(1);
      const icon = button.querySelector('[data-theme-icon]');
      const text = button.querySelector('[data-theme-label]');
      if (icon) icon.textContent = { auto: 'brightness_auto', light: 'light_mode', dark: 'dark_mode' }[mode];
      if (text) text.textContent = label;
      button.setAttribute('aria-label', 'Theme: ' + mode + '. Switch to ' + { auto: 'light', light: 'dark', dark: 'auto' }[mode] + ' theme');
      button.setAttribute('title', 'Theme: ' + label + '. Switch theme');
    }
  };
  apply();
  document.addEventListener('DOMContentLoaded', () => {
    apply();
    document.querySelector('[data-theme-toggle]')?.addEventListener('click', () => {
      mode = { auto: 'light', light: 'dark', dark: 'auto' }[mode];
      try { localStorage.setItem('theme', mode); } catch {}
      apply();
    });
  });
  media.addEventListener('change', apply);
})();
