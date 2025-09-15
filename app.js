// Custom smooth scroll function
function smoothScrollTo(targetPosition, duration = 1000) {
  const start = window.scrollY || window.pageYOffset;
  const distance = targetPosition - start;
  let startTime = null;

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = progress < 0.5
      ? 2 * progress * progress
      : -1 + (4 - 2 * progress) * progress; // easeInOutQuad
    window.scrollTo(0, start + distance * ease);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  requestAnimationFrame(animation);
}

// Smooth scroll for menu links
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      smoothScrollTo(target.offsetTop, 1200); // Slow scroll 1.2s
    }
  });
});

// Scroll to top button
document.querySelector('.scroll-btns .scroll-btn:nth-child(1)')?.addEventListener('click', function() {
  smoothScrollTo(0, 1200); // 1.2 seconds duration
  animateScrollBtn(this);
});

// Scroll to bottom button
document.querySelector('.scroll-btns .scroll-btn:nth-child(2)')?.addEventListener('click', function() {
  smoothScrollTo(document.body.scrollHeight, 1200); // 1.2 seconds duration
  animateScrollBtn(this);
});

// Animate scroll buttons
function animateScrollBtn(btn) {
  btn.animate([
    { transform: 'scale(1) rotate(0deg)' },
    { transform: 'scale(1.2) rotate(-10deg)' },
    { transform: 'scale(1) rotate(0deg)' }
  ], {
    duration: 350,
    easing: 'cubic-bezier(.23,1.01,.32,1)'
  });
}

// Theme toggle logic with black & gold theme
const themeToggle = document.getElementById('theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');

const setTheme = (theme) => {
  document.body.classList.remove('dark', 'light');
  document.body.classList.add(theme);
  if (themeToggle) {
    themeToggle.innerHTML = theme === 'dark' ? '&#9788;' : '&#9790;';
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
};

if (savedTheme === 'light' || savedTheme === 'dark') {
  setTheme(savedTheme);
} else {
  setTheme(prefersDark ? 'dark' : 'light');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark');
    setTheme(isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    // Animate toggle button
    themeToggle.animate([
      { transform: 'scale(1) rotate(0deg)' },
      { transform: 'scale(1.2) rotate(-20deg)' },
      { transform: 'scale(1) rotate(0deg)' }
    ], {
      duration: 350,
      easing: 'cubic-bezier(.23,1.01,.32,1)'
    });
  });
}
function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
  }
