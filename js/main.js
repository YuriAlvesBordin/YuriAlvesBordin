/**
 * Yuri Alves Bordin — Portfolio
 * Main script
 *
 * Modules:
 *  1. Intro animation overlay
 *  2. Hero headline build + reveal
 *  3. Scroll-reveal observer
 *  4. About photo load state
 *  5. Footer year auto-update
 */

'use strict';

(function () {
  /* ---------------------------------------------------------
   * Helpers
   * ------------------------------------------------------- */
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  function observe(selector, callback, options) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            callback(e.target);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, ...(options || {}) }
    );
    document.querySelectorAll(selector).forEach((el) => obs.observe(el));
  }

  /* ---------------------------------------------------------
   * 1. Intro animation overlay
   * ------------------------------------------------------- */
  function initIntro() {
    const intro  = document.getElementById('intro');
    if (!intro) return;

    if (prefersReducedMotion) {
      intro.classList.add('gone');
      document.body.style.overflow = '';
      triggerHero();
      return;
    }

    const nameEl = document.getElementById('intro-name');
    const lineEl = document.getElementById('intro-line');
    const tagEl  = document.getElementById('intro-tag');
    const skipEl = document.getElementById('intro-skip');
    const NAME   = 'Yuri Alves Bordin';

    const isMobile = window.matchMedia('(max-width: 480px)').matches;

    if (isMobile) {
      const words = NAME.split(' ');
      words.forEach((word, wi) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'word';
        wordSpan.textContent = word;
        nameEl.appendChild(wordSpan);
        if (wi < words.length - 1) {
          const space = document.createElement('span');
          space.className = 'space';
          space.textContent = ' ';
          nameEl.appendChild(space);
        }
      });

      const wordEls = nameEl.querySelectorAll('.word');

      let done = false;
      function finish() {
        if (done) return;
        done = true;
        intro.classList.add('fade-out');
        setTimeout(() => {
          intro.classList.add('gone');
          document.body.style.overflow = '';
          triggerHero();
        }, 1050);
      }

      skipEl.addEventListener('click', finish);
      skipEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          finish();
        }
      });

      document.body.style.overflow = 'hidden';

      setTimeout(() => intro.classList.add('bars-in'), 50);
      setTimeout(() => {
        // FIX: make the container visible before animating words in
        nameEl.classList.add('visible');
        wordEls.forEach((w, i) => setTimeout(() => w.classList.add('in'), i * 120));
      }, 600);

      setTimeout(() => {
        lineEl.classList.add('expand');
        tagEl.classList.add('visible');
      }, 800);

      setTimeout(() => skipEl.classList.add('visible'), 1400);
      setTimeout(finish, 2800);
      return;
    }

    // Desktop: per-letter animation
    NAME.split('').forEach((ch) => {
      if (ch === ' ') {
        nameEl.insertAdjacentHTML('beforeend', '<span class="space"> </span>');
      } else {
        const s = document.createElement('span');
        s.className = 'letter';
        s.textContent = ch;
        nameEl.appendChild(s);
      }
    });
    const letters = nameEl.querySelectorAll('.letter');

    let done = false;
    function finish() {
      if (done) return;
      done = true;
      intro.classList.add('fade-out');
      setTimeout(() => {
        intro.classList.add('gone');
        document.body.style.overflow = '';
        triggerHero();
      }, 1050);
    }

    skipEl.addEventListener('click', finish);
    skipEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        finish();
      }
    });

    document.body.style.overflow = 'hidden';

    setTimeout(() => intro.classList.add('bars-in'), 50);
    setTimeout(() => {
      nameEl.classList.add('visible');
      letters.forEach((l, i) => setTimeout(() => l.classList.add('in'), i * 55));
    }, 600);

    const totalLetterDelay = 600 + letters.length * 55;
    setTimeout(() => {
      lineEl.classList.add('expand');
      tagEl.classList.add('visible');
    }, totalLetterDelay + 200);
    setTimeout(() => skipEl.classList.add('visible'), totalLetterDelay + 800);
    setTimeout(finish, totalLetterDelay + 2200);
  }

  /* ---------------------------------------------------------
   * 2. Hero headline build + reveal
   * ------------------------------------------------------- */
  const HERO_LINES = ['I shape the code', 'to solve the problem.'];

  function buildHeroHeadline() {
    const heroH1 = document.querySelector('#hero h1');
    if (!heroH1) return;

    HERO_LINES.forEach((line, li) => {
      const words = line.split(' ');
      words.forEach((word, wi) => {
        const wrap  = document.createElement('span');
        wrap.className = 'word';
        const inner = document.createElement('span');
        inner.className = 'word-inner';
        inner.textContent = word;
        inner.dataset.delay = String((li * words.length + wi) * 90);
        wrap.appendChild(inner);
        heroH1.appendChild(wrap);
        if (wi < words.length - 1) {
          heroH1.appendChild(document.createTextNode(' '));
        }
      });
      if (li < HERO_LINES.length - 1) {
        heroH1.appendChild(document.createElement('br'));
      }
    });
  }

  function triggerHero() {
    document.querySelector('#hero .eyebrow')?.classList.add('in');
    document.getElementById('hero-sub')?.classList.add('in');
    document.querySelector('.btn-group')?.classList.add('in');

    document.querySelectorAll('#hero h1 .word-inner').forEach((el) => {
      const delay = parseInt(el.dataset.delay, 10) || 0;
      setTimeout(() => el.classList.add('in'), delay);
    });
  }

  /* ---------------------------------------------------------
   * 3. Scroll-reveal observer wiring
   * ------------------------------------------------------- */
  function initScrollReveal() {
    observe('.section-header', (el) => el.classList.add('in'));

    observe('.project-card', (el) => {
      const cards = document.querySelectorAll('.project-card');
      const i = [...cards].indexOf(el);
      setTimeout(() => el.classList.add('in'), i * 80);
    });

    observe('.tech-category', (el) => {
      el.querySelector('h3')?.classList.add('in');
      el.querySelectorAll('.tech-item').forEach((item, i) => {
        setTimeout(() => item.classList.add('in'), 150 + i * 60);
      });
    });

    observe('.about-photo',   (el) => el.classList.add('in'));
    observe('.about-content', (el) => el.classList.add('in'));

    observe('#contact h2',           (el) => el.classList.add('in'));
    observe('#contact > .inner > p', (el) => el.classList.add('in'));

    observe('.contact-links', (el) => {
      el.querySelectorAll('a').forEach((a, i) => {
        setTimeout(() => a.classList.add('in'), 300 + i * 120);
      });
    });
  }

  /* ---------------------------------------------------------
   * 4. About photo load state
   * ------------------------------------------------------- */
  function initAboutPhoto() {
    const img = document.getElementById('about-photo-img');
    if (!img) return;

    if (img.complete && img.naturalWidth > 0) {
      img.classList.add('loaded');
      return;
    }
    img.addEventListener('load',  () => img.classList.add('loaded'), { once: true });
    img.addEventListener('error', () => { /* placeholder stays visible */ }, { once: true });
  }

  /* ---------------------------------------------------------
   * Boot
   * ------------------------------------------------------- */
  buildHeroHeadline();
  initIntro();
  initScrollReveal();
  initAboutPhoto();
})();
