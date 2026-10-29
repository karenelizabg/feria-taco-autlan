/* Feria del Taco Autlán — comportamiento de la página. Sin dependencias. */
(() => {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  /* Aviso breve (toast) ---------------------------------------------------- */
  const toastEl = $('[data-toast]');
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-on'), 2600);
  }

  /* Menú móvil ------------------------------------------------------------- */
  const menuBtn = $('.menu-btn');
  const menu = $('#menu');
  function setMenu(open) {
    menuBtn.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
  }
  menuBtn.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) { setMenu(false); menuBtn.focus(); }
  });

  /* Cuenta regresiva ------------------------------------------------------- */
  const count = $('[data-countdown]');
  if (count) {
    const start = Date.parse(count.dataset.start);
    const end = Date.parse(count.dataset.end);
    const label = $('[data-count-label]', count);
    const grid = $('[data-count-grid]', count);
    const out = { d: $('[data-d]', count), h: $('[data-h]', count), m: $('[data-m]', count), s: $('[data-s]', count) };
    const pad = (n) => String(n).padStart(2, '0');
    let state = '';

    function setState(next, text) {
      if (state === next) return;
      state = next;
      label.textContent = text;
      grid.hidden = next !== 'before';
      count.classList.toggle('is-live', next !== 'before');
    }

    function tick() {
      const now = Date.now();
      if (now >= end) { setState('over', '¡Gracias por venir a la feria!'); return false; }
      if (now >= start) { setState('live', '¡La feria está en marcha! Te esperamos hasta las 11:00 pm.'); return true; }
      setState('before', 'Faltan');
      const left = Math.floor((start - now) / 1000);
      out.d.textContent = pad(Math.floor(left / 86400));
      out.h.textContent = pad(Math.floor((left % 86400) / 3600));
      out.m.textContent = pad(Math.floor((left % 3600) / 60));
      out.s.textContent = pad(left % 60);
      return true;
    }

    if (tick()) {
      const id = setInterval(() => { if (!tick()) clearInterval(id); }, 1000);
    }
  }

  /* Compartir -------------------------------------------------------------- */
  const shareText = document.body.dataset.shareText
    || 'Feria del Taco Autlán 2026 · Domingo 29 de noviembre · Jardín Las Montañas. ¡Entrada gratuita!';
  const pageUrl = () => location.href.split('#')[0];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(pageUrl());
      toast('Enlace copiado');
    } catch {
      toast('No pudimos copiar el enlace');
    }
  }

  $$('[data-share]').forEach((btn) => btn.addEventListener('click', async () => {
    if (navigator.share) {
      try { await navigator.share({ title: document.title, text: shareText, url: pageUrl() }); }
      catch { /* el usuario canceló */ }
    } else {
      copyLink();
    }
  }));

  $$('[data-share-wa]').forEach((a) => {
    a.href = 'https://wa.me/?text=' + encodeURIComponent(`${shareText} ${pageUrl()}`);
  });

  /* Directorio de taquerías ------------------------------------------------ */
  const list = Array.isArray(window.FERIA_TAQUERIAS) ? window.FERIA_TAQUERIAS : [];
  const mount = $('#taquerias-lista');

  function el(tag, props = {}, ...children) {
    const node = Object.assign(document.createElement(tag), props);
    node.append(...children.filter(Boolean));
    return node;
  }

  function link(text, href) {
    return el('a', { textContent: text, href, target: '_blank', rel: 'noopener' });
  }

  function taqueriaCard(t) {
    const links = [];
    if (t.instagram) links.push(link('Instagram', `https://instagram.com/${encodeURIComponent(t.instagram)}`));
    if (t.facebook) links.push(link('Facebook', `https://facebook.com/${encodeURIComponent(t.facebook)}`));
    if (t.telefono) links.push(el('a', { textContent: 'Llamar', href: `tel:${String(t.telefono).replace(/[^\d+]/g, '')}` }));

    return el('article', { className: 'tcard reveal' },
      el('h3', { textContent: t.nombre }),
      t.especialidad && el('p', { textContent: t.especialidad }),
      t.colonia && el('p', { textContent: t.colonia }),
      links.length ? el('div', { className: 'tcard__links' }, ...links) : null
    );
  }

  if (mount && list.length) {
    mount.replaceChildren(...list.filter((t) => t && t.nombre).map(taqueriaCard));
  }

  /* Formulario de taquerías → WhatsApp ------------------------------------- */
  const form = $('#form-taqueria');
  if (form) {
    const status = $('[data-form-status]', form);

    // El patrón solo restringe caracteres; aquí se exigen al menos 10 dígitos.
    const phone = form.elements.telefono;
    phone.addEventListener('input', () => {
      const digits = phone.value.replace(/\D/g, '');
      phone.setCustomValidity(digits.length >= 10 ? '' : 'Escribe tu número a 10 dígitos');
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;

      const data = Object.fromEntries(new FormData(form).entries());
      const lines = [
        'Hola, quiero participar en la Feria del Taco Autlán 2026.',
        '',
        `Taquería: ${data.taqueria.trim()}`,
        `Responsable: ${data.nombre.trim()}`,
        `Teléfono: ${data.telefono.trim()}`,
      ];
      if (data.especialidad.trim()) lines.push(`Especialidad: ${data.especialidad.trim()}`);
      if (data.mensaje.trim()) lines.push(`Comentarios: ${data.mensaje.trim()}`);
      lines.push('', '¿Me comparten los requisitos de participación? Gracias.');

      const url = `https://wa.me/${form.dataset.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`;
      const opened = window.open(url, '_blank', 'noopener');

      status.replaceChildren(
        opened
          ? document.createTextNode('Abrimos WhatsApp con tu mensaje listo para enviar. ')
          : document.createTextNode('Tu navegador bloqueó la ventana. '),
        link('Abrir WhatsApp', url)
      );
    });
  }

  /* Animación de entrada --------------------------------------------------- */
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-in'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach((node) => io.observe(node));
  } else {
    reveals.forEach((node) => node.classList.add('is-in'));
  }
})();
