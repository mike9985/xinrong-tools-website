/* ============================================
   XINRONG Tools - Main JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  initInquiryForms();
  initModalForms();
});

/* --- Navbar scroll effect --- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  // Set active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* --- Mobile menu toggle --- */
function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  // Close menu on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove('open');
    }
  });
}

/* --- Scroll-triggered fade-in animations --- */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* --- Inline inquiry form handler --- */
function initInquiryForms() {
  document.querySelectorAll('.inquiry-form').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const errorEl = form.querySelector('.form-error');
      const successEl = form.closest('.form-container')?.querySelector('.form-success');

      // Show loading
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner"></span> Submitting...';
      }

      if (errorEl) errorEl.classList.remove('visible');

      const data = {
        name: form.querySelector('[name="name"]')?.value || '',
        company: form.querySelector('[name="company"]')?.value || '',
        email: form.querySelector('[name="email"]')?.value || '',
        whatsapp: form.querySelector('[name="whatsapp"]')?.value || '',
        product: form.querySelector('[name="product"]')?.value || '',
        quantity: form.querySelector('[name="quantity"]')?.value || '',
        message: form.querySelector('[name="message"]')?.value || ''
      };

      try {
        await submitInquiry(data);
        // Hide form, show success
        form.style.display = 'none';
        if (successEl) successEl.classList.add('visible');
      } catch (err) {
        console.error('Submission error:', err);
        if (errorEl) {
          errorEl.textContent = 'Submission failed. Please try again or email us directly at mike@xinrongtools.com.';
          errorEl.classList.add('visible');
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Inquiry';
        }
      }
    });
  });
}

/* --- Modal inquiry forms --- */
function initModalForms() {
  // Open modal
  document.querySelectorAll('[data-modal="inquiry"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const product = btn.getAttribute('data-product') || '';
      const modal = document.getElementById('inquiry-modal');
      if (!modal) {
        // Navigate to contact page instead
        window.location.href = 'contact.html';
        return;
      }
      const productSelect = modal.querySelector('[name="product"]');
      if (productSelect && product) {
        productSelect.value = product;
      }
      modal.classList.add('visible');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal
  document.querySelectorAll('.modal-close, .modal-overlay').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target === el || el.classList.contains('modal-close')) {
        const overlay = el.closest('.modal-overlay');
        if (overlay) {
          overlay.classList.remove('visible');
          document.body.style.overflow = '';
        }
      }
    });
  });

  // Prevent modal content click from closing
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => e.stopPropagation());
  });
}
