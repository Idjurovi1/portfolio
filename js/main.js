// ===== Godina u podnožju =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Tamna / svijetla tema (pamti se u localStorage) =====
const themeBtn = document.querySelector('.theme-toggle');

const applyTheme = (theme) => {
  document.body.classList.toggle('dark', theme === 'dark');
  themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
};

let savedTheme = 'light';
try { savedTheme = localStorage.getItem('theme') || 'light'; } catch (e) {}
applyTheme(savedTheme);

themeBtn.addEventListener('click', () => {
  const next = document.body.classList.contains('dark') ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// ===== Mobilni izbornik =====
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// ===== Filtriranje projekata (samo na početnoj) =====
const filterBtns = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.card');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    cards.forEach((card) => {
      const show = filter === 'all' || card.dataset.tech === filter;
      card.classList.toggle('hidden', !show);
    });
  });
});

// ===== Validacija kontakt forme (samo na kontaktu) =====
const form = document.querySelector('.contact-form');

if (form) {
  const status = form.querySelector('.form-status');

  form.addEventListener('submit', (event) => {
    event.preventDefault();               // ne šalji stranicu nigdje
    let valid = true;

    form.querySelectorAll('input, textarea').forEach((field) => {
      const ok = field.checkValidity();   // koristi HTML atribute required, minlength, type="email"
      field.classList.toggle('invalid', !ok);
      if (!ok) valid = false;
    });

    if (valid) {
      status.textContent = `Hvala, ${form.name.value}! Poruka je spremna. 🎉`;
      form.reset();
    } else {
      status.textContent = 'Provjeri označena polja.';
    }
  });
}
