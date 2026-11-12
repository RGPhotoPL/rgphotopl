(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* header: solid once the page is scrolled */
  const header = $('[data-header]');
  const onScroll = () => header.classList.toggle('is-stuck', scrollY > 24);
  onScroll();
  addEventListener('scroll', onScroll, { passive: true });

  /* mobile nav */
  const toggle = $('[data-nav-toggle]');
  const setNav = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    root.classList.toggle('nav-open', open);
  };
  toggle.addEventListener('click', () => setNav(toggle.getAttribute('aria-expanded') !== 'true'));
  addEventListener('keydown', (e) => { if (e.key === 'Escape') setNav(false); });
  matchMedia('(min-width: 901px)').addEventListener('change', () => setNav(false));

  $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  /* reveal on scroll */
  const reveals = $$('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach((el) => io.observe(el));
  }

  /* rotating word in the statement */
  const rot = $('[data-rotator]');
  if (rot && !reduce) {
    const words = JSON.parse(rot.dataset.rotator);
    let i = 0;
    setInterval(() => {
      rot.classList.add('is-out');
      setTimeout(() => {
        i = (i + 1) % words.length;
        rot.textContent = words[i];
        rot.classList.remove('is-out');
      }, 360);
    }, 2600);
  }

  /* services: hovering a row swaps the preview photo */
  const svc = $('[data-svc]');
  if (svc) {
    const rows = $$('[data-svc-row]', svc);
    const imgs = $$('[data-svc-img]', svc);
    const pick = (i) => {
      rows.forEach((r) => r.classList.toggle('is-active', r.dataset.svcRow === String(i)));
      imgs.forEach((m) => m.classList.toggle('is-active', m.dataset.svcImg === String(i)));
    };
    rows.forEach((r) => {
      r.addEventListener('mouseenter', () => pick(r.dataset.svcRow));
      r.addEventListener('focus', () => pick(r.dataset.svcRow));
    });
  }

  /* portfolio filter */
  const gallery = $('[data-gallery]');
  const chips = $$('[data-filter]');
  chips.forEach((chip) => chip.addEventListener('click', () => {
    const f = chip.dataset.filter;
    chips.forEach((c) => {
      const on = c === chip;
      c.classList.toggle('is-active', on);
      c.setAttribute('aria-pressed', String(on));
    });
    $$('.pf__item', gallery).forEach((it) => { it.hidden = f !== 'all' && it.dataset.cat !== f; });
  }));

  /* lightbox */
  const lb = $('[data-lightbox]');
  if (gallery && lb && typeof lb.showModal === 'function') {
    const lbImg = $('[data-lb-img]', lb);
    const lbCap = $('[data-lb-cap]', lb);
    const lbCount = $('[data-lb-count]', lb);
    let items = [];
    let at = 0;
    const pad = (n) => String(n).padStart(2, '0');
    const show = (i) => {
      at = (i + items.length) % items.length;
      const a = items[at];
      lbImg.src = a.href;
      lbImg.alt = $('img', a).alt;
      lbCap.textContent = a.dataset.cap;
      lbCount.textContent = `${pad(at + 1)} / ${pad(items.length)}`;
    };
    gallery.addEventListener('click', (e) => {
      const a = e.target.closest('.pf__item');
      if (!a) return;
      e.preventDefault();
      items = $$('.pf__item:not([hidden])', gallery);
      show(items.indexOf(a));
      lb.showModal();
    });
    $('[data-lb-prev]', lb).addEventListener('click', () => show(at - 1));
    $('[data-lb-next]', lb).addEventListener('click', () => show(at + 1));
    $('[data-lb-close]', lb).addEventListener('click', () => lb.close());
    lb.addEventListener('click', (e) => { if (e.target === lb) lb.close(); });
    lb.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') show(at - 1);
      if (e.key === 'ArrowRight') show(at + 1);
    });
    lb.addEventListener('close', () => { lbImg.removeAttribute('src'); });
  }

  /* contact form: preselect topic from ?temat= */
  const topic = $('[data-topic-select]');
  const wanted = new URLSearchParams(location.search).get('temat');
  if (topic && wanted && [...topic.options].some((o) => o.value === wanted)) topic.value = wanted;

  /* szkolenia: "Zapisz się" picks the course in the form */
  const courseSelect = $('[data-course-select]');
  $$('[data-pick-course]').forEach((a) => a.addEventListener('click', () => {
    if (courseSelect) courseSelect.value = a.dataset.pickCourse;
  }));

  /* forms are not wired to anything in the mockup */
  $$('[data-demo-form]').forEach((form) => form.addEventListener('submit', (e) => {
    e.preventDefault();
    const status = $('[data-form-status]', form);
    const fields = $$('[required]', form);
    fields.forEach((f) => f.classList.toggle('is-invalid', !f.checkValidity()));
    const bad = fields.find((f) => !f.checkValidity());
    if (bad) {
      status.textContent = 'Uzupełnij zaznaczone pola.';
      bad.focus();
      return;
    }
    status.textContent = 'To makieta — formularz jeszcze nie wysyła wiadomości. Napisz na kontakt@rgphoto.pl lub zadzwoń: 513 453 933.';
  }));
})();
