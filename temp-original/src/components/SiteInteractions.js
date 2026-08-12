const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.site-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.site-nav a')];
const observer = new IntersectionObserver((entries) => {
  entries.filter((entry) => entry.isIntersecting).forEach((entry) => {
    navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-45% 0px -45% 0px' });
sections.forEach((section) => observer.observe(section));

const heroImages = ['assets/hero-trade.png', 'assets/hero-healthcare.png', 'assets/hero-electromechanical.png', 'assets/hero-it.png'];
const heroMessages = ['Delivering IT consulting, electromechanical works, and health and hospital solutions for organizations across Ethiopia.', 'Mindray DigiEye 330 systems support high-resolution imaging, fast acquisition, and smoother diagnostic workflow.', 'Electromechanical works designed to support reliable, day-to-day operations.', 'IT consulting that helps teams build practical, dependable technology systems.'];
let currentHeroSlide = 0;
setInterval(() => {
  currentHeroSlide = (currentHeroSlide + 1) % heroImages.length;
  document.querySelector('.hero-image').style.backgroundImage = `url("${heroImages[currentHeroSlide]}")`;
  document.querySelector('#heroMessage').textContent = heroMessages[currentHeroSlide];
}, 5000);
