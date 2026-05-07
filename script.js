/* ============================================================
   ABHI CAFE POINT – script.js
   Designed by: Prateek | https://yourportfolio.com
   ============================================================ */

'use strict';

/* ============================================================
   1. PRELOADER
============================================================ */
const preloader = document.getElementById('preloader');

window.addEventListener('load', () => {
  // Let the fill animation finish (~2.2s), then fade out
  setTimeout(() => {
    preloader.classList.add('hidden');
    document.body.classList.remove('loading');
  }, 2400);
});

// Prevent scroll while loading
document.body.classList.add('loading');

/* ============================================================
   2. STICKY NAVBAR + ACTIVE LINK ON SCROLL
============================================================ */
const navbar   = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateNavbar() {
  const scrollY = window.scrollY;

  // Scrolled state
  if (scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active link highlighting
  let current = '';
  sections.forEach(section => {
    const sectionTop    = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateNavbar, { passive: true });
updateNavbar();

/* ============================================================
   3. HAMBURGER MENU (MOBILE)
============================================================ */
const hamburger  = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  navLinksEl.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close on nav link click
navLinksEl.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksEl.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (
    navLinksEl.classList.contains('open') &&
    !navLinksEl.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    hamburger.classList.remove('open');
    navLinksEl.classList.remove('open');
    document.body.style.overflow = '';
  }
});

/* ============================================================
   4. SMOOTH SCROLL FOR ALL ANCHOR LINKS
============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navHeight = navbar.offsetHeight;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
  });
});

/* ============================================================
   5. SCROLL-TO-TOP BUTTON
============================================================ */
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
}, { passive: true });

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============================================================
   6. SCROLL REVEAL ANIMATION (data-aos elements)
============================================================ */
function revealOnScroll() {
  const elements = document.querySelectorAll('[data-aos]');
  const windowHeight = window.innerHeight;

  elements.forEach((el, i) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < windowHeight - 80) {
      // Stagger animation delay for service cards, why cards, etc.
      const delay = el.closest('.services-grid, .why-grid, .gallery-grid')
        ? Array.from(el.parentElement.children).indexOf(el) * 80
        : 0;
      setTimeout(() => el.classList.add('aos-animate'), delay);
    }
  });
}

window.addEventListener('scroll', revealOnScroll, { passive: true });
window.addEventListener('resize', revealOnScroll, { passive: true });
// Trigger on load after preloader
setTimeout(revealOnScroll, 2500);

/* ============================================================
   7. CONTACT FORM HANDLING
   (Client-side only — wire up to a backend/email service later)
   Recommended: Use EmailJS, Formspree, or Netlify Forms
============================================================ */
const contactForm  = document.getElementById('contactForm');
const formSuccess  = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const name = contactForm.querySelector('#name').value.trim();
    const message = contactForm.querySelector('#message').value.trim();

    if (!name) {
      flashInvalid(contactForm.querySelector('#name'), 'Please enter your name.');
      return;
    }

    if (!message) {
      flashInvalid(contactForm.querySelector('#message'), 'Please enter a message.');
      return;
    }

    // Simulate send (replace this block with your actual email service call)
    const submitBtn = contactForm.querySelector('[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

    setTimeout(() => {
      // Show success message
      formSuccess.classList.add('show');
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';

      // Hide success after 5 seconds
      setTimeout(() => formSuccess.classList.remove('show'), 5000);
    }, 1500);

    /*
      ── TO INTEGRATE A REAL EMAIL SERVICE ──────────────────────────
      Option 1 – EmailJS (free tier):
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
          from_name:    name,
          reply_to:     contactForm.querySelector('#phone').value,
          service_need: contactForm.querySelector('#service').value,
          message:      message,
        }).then(() => { ... });

      Option 2 – Formspree:
        Change <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
        and remove the preventDefault & setTimeout above.

      Option 3 – WhatsApp redirect:
        const waMsg = encodeURIComponent(`Name: ${name}\nMessage: ${message}`);
        window.open(`https://wa.me/919315670736?text=${waMsg}`, '_blank');
      ──────────────────────────────────────────────────────────────
    */
  });
}

function flashInvalid(input, msg) {
  input.style.borderColor = '#EF4444';
  input.focus();
  const prev = input.placeholder;
  input.placeholder = msg;
  setTimeout(() => {
    input.style.borderColor = '';
    input.placeholder = prev;
  }, 2500);
}

/* ============================================================
   8. DYNAMIC FOOTER YEAR
============================================================ */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ============================================================
   9. NAVBAR OVERLAY CLOSE ON RESIZE (DESKTOP)
============================================================ */
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    hamburger.classList.remove('open');
    navLinksEl.classList.remove('open');
    document.body.style.overflow = '';
  }
});

/* ============================================================
   10. GALLERY LIGHTBOX (Simple version — expand if needed)
   Clicking a gallery item with a real image will open it larger.
   Currently shows a placeholder message since no real images exist.
============================================================ */
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('.gallery-img');
    if (img) {
      // Open image in a basic overlay
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position:fixed; inset:0; background:rgba(0,0,0,0.92);
        z-index:9999; display:flex; align-items:center; justify-content:center;
        cursor:zoom-out; padding:1rem;
      `;
      const bigImg = document.createElement('img');
      bigImg.src = img.src;
      bigImg.style.cssText = 'max-width:90vw; max-height:90vh; object-fit:contain; border-radius:12px;';
      overlay.appendChild(bigImg);
      document.body.appendChild(overlay);
      overlay.addEventListener('click', () => overlay.remove());
    }
  });
});

/* ============================================================
   11. SERVICE CARDS HOVER – subtle 3D tilt effect
============================================================ */
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect   = card.getBoundingClientRect();
    const x      = e.clientX - rect.left - rect.width  / 2;
    const y      = e.clientY - rect.top  - rect.height / 2;
    const rotateX = -(y / (rect.height / 2)) * 3;
    const rotateY =  (x / (rect.width  / 2)) * 3;
    card.style.transform = `translateY(-6px) perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});



/* ============================================================
   END OF SCRIPT
============================================================ */
