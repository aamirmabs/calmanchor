/**
 * Calm Anchor — Theme Toggle
 * Handles light/dark mode switching via data-theme attribute
 */
function toggleTheme() {
  const h = document.documentElement;
  const b = document.getElementById('themeBtn');
  const cur = h.getAttribute('data-theme');
  if (cur === 'light') {
    h.setAttribute('data-theme', 'dark');
    b.textContent = '☀️ Light mode';
  } else {
    h.setAttribute('data-theme', 'light');
    b.textContent = '🌙 Dark mode';
  }
}
