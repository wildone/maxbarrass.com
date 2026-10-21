(() => {
  const canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) return;
  const destination = new URL(canonical.href);
  // Keep old shared campaign links and section anchors useful on the new path.
  window.location.replace(destination.pathname + window.location.search + window.location.hash);
})();
