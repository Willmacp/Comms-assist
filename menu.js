function toggleMenu() {
  const menu = document.querySelector('.menu-buttons');
  menu.classList.toggle('show');
}

// Optional: Close menu when clicking outside on mobile
document.addEventListener('click', function (event) {
  const menu = document.querySelector('.menu-buttons');
  const hamburger = document.querySelector('.hamburger');

  const isClickInside = menu.contains(event.target) || hamburger.contains(event.target);

  if (!isClickInside && menu.classList.contains('show')) {
    menu.classList.remove('show');
  }
});
