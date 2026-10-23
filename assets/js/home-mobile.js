(() => {
  const button = document.querySelector('.mobile-menu-toggle');
  const links = document.getElementById('home-navigation');
  const setOpen = open => {
    button.setAttribute('aria-expanded', String(open));
    links.classList.toggle('is-open', open);
  };
  button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
  links.addEventListener('click', event => { if (event.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') { setOpen(false); button.focus(); }
  });
  matchMedia('(max-width: 900px)').addEventListener('change', () => setOpen(false));
})();
