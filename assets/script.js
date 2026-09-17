/* ====================================================
   SSB — SHREE SKHANDHA BUILDERS
   script.js
   - Navbar scroll behaviour
   - Active nav link
   - Scroll reveal
   - Enquiry form: validation + WhatsApp redirect
   - Lightbox gallery
==================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ── NAVBAR SCROLL CLASS ── */
  const navbar = document.querySelector('.ssb-navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    });
  }

  /* ── ACTIVE NAV LINK ── */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.ssb-navbar .nav-link').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { obs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ── ENQUIRY FORM ── */
  const form = document.getElementById('enquiry-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearErrors(form);

      const name        = form.querySelector('#f-name');
      const phone       = form.querySelector('#f-phone');
      const projectType = form.querySelector('#f-project');
      const message     = form.querySelector('#f-message');
      let valid = true;

      if (!name.value.trim()) {
        showError(name, 'Please enter your name.'); valid = false;
      }
      if (!phone.value.trim() || !/^[\d\s\+\-\(\)]{7,15}$/.test(phone.value.trim())) {
        showError(phone, 'Please enter a valid phone number.'); valid = false;
      }
      if (!projectType.value) {
        showError(projectType, 'Please select a project type.'); valid = false;
      }
      if (!message.value.trim()) {
        showError(message, 'Please enter your message.'); valid = false;
      }

      if (!valid) return;

      /* Build WhatsApp message */
      const waNumber = '918610436594';
      const text = [
        'Hello SSB — Shree Skhandha Builders,',
        '',
        'I would like to enquire about your construction services.',
        '',
        'Name: ' + name.value.trim(),
        'Phone: ' + phone.value.trim(),
        'Project Type: ' + projectType.value,
        'Message: ' + message.value.trim(),
      ].join('\n');

      const waUrl = 'https://wa.me/' + waNumber + '?text=' + encodeURIComponent(text);
      window.open(waUrl, '_blank');

      // Show confirmation
      const successMsg = document.getElementById('form-success');
      if (successMsg) successMsg.classList.add('show');
      form.reset();
    });
  }

  function showError(field, msg) {
    field.style.borderColor = '#E21B23';
    const err = document.createElement('div');
    err.className = 'field-error';
    err.style.cssText = 'color:#E21B23;font-size:0.75rem;margin-top:0.25rem;';
    err.textContent = msg;
    field.parentNode.appendChild(err);
  }
  function clearErrors(form) {
    form.querySelectorAll('.field-error').forEach(function (el) { el.remove(); });
    form.querySelectorAll('input, select, textarea').forEach(function (el) {
      el.style.borderColor = '';
    });
    const successMsg = document.getElementById('form-success');
    if (successMsg) successMsg.classList.remove('show');
  }

  /* ── LIGHTBOX (Bootstrap modal) ── */
  const galleryItems = document.querySelectorAll('.gallery-item[data-img]');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg   = document.getElementById('lightbox-img');
  const lightboxCat   = document.getElementById('lightbox-cat');

  if (galleryItems.length && lightboxModal) {
    galleryItems.forEach(function (item) {
      item.addEventListener('click', function () {
        const src = item.getAttribute('data-img');
        const cat = item.getAttribute('data-cat') || '';
        lightboxImg.setAttribute('src', src);
        lightboxImg.setAttribute('alt', cat);
        if (lightboxCat) lightboxCat.textContent = cat;
        const modal = new bootstrap.Modal(lightboxModal);
        modal.show();
      });
    });
  }

  /* ── MOBILE NAV: close on link click ── */
  const navLinks = document.querySelectorAll('.ssb-navbar .nav-link');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });

});
