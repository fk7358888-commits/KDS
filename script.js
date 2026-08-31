const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('.faq-question').forEach((question) => {
  question.addEventListener('click', () => {
    const isOpen = question.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.faq-question').forEach((item) => {
      item.setAttribute('aria-expanded', 'false');
      document.getElementById(item.getAttribute('aria-controls')).hidden = true;
    });
    if (!isOpen) {
      question.setAttribute('aria-expanded', 'true');
      document.getElementById(question.getAttribute('aria-controls')).hidden = false;
    }
  });
});

const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => revealObserver.observe(item));

document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelector('#contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const emailInput = document.querySelector('#email');
  const formMessage = document.querySelector('#form-message');
  formMessage.textContent = `Thanks. We'll be in touch at ${emailInput.value}.`;
  emailInput.value = '';
});
