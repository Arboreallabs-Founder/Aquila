/* ════════════════════════════════════════════
   AQUILA — Shared interactions (safe on any page;
   every block guards for the elements it needs)
════════════════════════════════════════════ */
(function () {
  'use strict';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Nav shadow on scroll ──
  var navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // ── Mobile hamburger ──
  var hamburger = document.getElementById('hamburgerBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  }
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var open = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', String(open));
      mobileMenu.setAttribute('aria-hidden', String(!open));
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) { closeMenu(); hamburger.focus(); }
    });
    document.addEventListener('click', function (e) {
      if (mobileMenu.classList.contains('open') &&
          !mobileMenu.contains(e.target) && !hamburger.contains(e.target)) closeMenu();
    });
  }

  // ── Fade-in on scroll ──
  var fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      fadeEls.forEach(function (el) { el.classList.add('visible'); });
    } else {
      var fo = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visible'); fo.unobserve(e.target); } });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      fadeEls.forEach(function (el) { fo.observe(el); });
    }
  }

  // ── Animated number counters ──
  var counters = document.querySelectorAll('[data-target]');
  if (counters.length) {
    var inr = new Intl.NumberFormat('en-IN');
    var started = false;
    var run = function () {
      if (started) return; started = true;
      counters.forEach(function (el) {
        var target = parseInt(el.dataset.target, 10);
        var suffix = el.dataset.suffix || '';
        if (reduceMotion) { el.textContent = inr.format(target) + suffix; return; }
        var dur = 1800, start = performance.now();
        (function step(now) {
          var p = Math.min((now - start) / dur, 1);
          var ease = 1 - Math.pow(1 - p, 3);
          el.textContent = inr.format(Math.round(ease * target)) + suffix;
          if (p < 1) requestAnimationFrame(step);
        })(start);
      });
    };
    var anchor = counters[0].closest('.metrics') || counters[0];
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (ents) {
        if (ents.some(function (e) { return e.isIntersecting; })) run();
      }, { threshold: 0.4 }).observe(anchor);
    } else { run(); }
  }

  // ── Contact form — posts to FormSubmit.co (AJAX endpoint) ──
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = document.getElementById('formStatus');
      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
      if (status) { status.hidden = true; status.classList.remove('error'); }

      var payload = {};
      new FormData(form).forEach(function (v, k) { payload[k] = v; });

      fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      })
      .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, data: d }; }); })
      .then(function (res) {
        var success = res.ok && (res.data.success === 'true' || res.data.success === true);
        if (!success) throw new Error((res.data && res.data.message) || 'Submission failed');
        form.reset();
        if (status) {
          status.hidden = false;
          status.textContent = 'Thanks — your message has been received. The Aquila team will be in touch shortly.';
          if (status.focus) status.focus();
        }
      })
      .catch(function () {
        if (status) {
          status.hidden = false;
          status.classList.add('error');
          status.textContent = 'Sorry, we could not send your message. Please email us directly at rewa@aquilalearning.in.';
          if (status.focus) status.focus();
        }
      })
      .then(function () {
        if (btn) { btn.disabled = false; btn.textContent = 'Send Message'; }
      });
    });
  }
})();
