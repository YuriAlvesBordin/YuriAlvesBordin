/**
 * Yuri Alves Bordin — Portfolio
 * Projects module: fetch projects from JSON and render dynamically
 */

'use strict';

(function () {
  const PROJECTS_JSON = 'data/projects.json';
  const GRID_SELECTOR = '#projects-grid';

  /**
   * Create a tag element
   */
  function createTag(text, className) {
    const span = document.createElement('span');
    span.className = className;
    span.textContent = text;
    return span;
  }

  /**
   * Create project meta section (tags + language tags)
   */
  function createProjectMeta(project) {
    const meta = document.createElement('div');
    meta.className = 'project-meta';

    // Primary tag
    if (project.tags && project.tags.length > 0) {
      project.tags.forEach(tag => {
        meta.appendChild(createTag(tag, 'tag'));
      });
    }

    // Language tags
    if (project.languages && project.languages.length > 0) {
      project.languages.forEach(lang => {
        meta.appendChild(createTag(lang, 'lang-tag'));
      });
    }

    return meta;
  }

  /**
   * Create project stats (stars, forks)
   */
  function createProjectStats(stats) {
    const statsDiv = document.createElement('div');
    statsDiv.className = 'project-stats';

    if (stats.stars !== undefined) {
      const starStat = document.createElement('span');
      starStat.className = 'stat';
      starStat.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
        ${stats.stars}
      `;
      statsDiv.appendChild(starStat);
    }

    if (stats.forks !== undefined) {
      const forkStat = document.createElement('span');
      forkStat.className = 'stat';
      forkStat.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
          <path d="M7 5C7 3.34 8.34 2 10 2h4c1.66 0 3 1.34 3 3v1h2a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2V5z"/>
        </svg>
        ${stats.forks} fork${stats.forks !== 1 ? 's' : ''}
      `;
      statsDiv.appendChild(forkStat);
    }

    return statsDiv;
  }

  /**
   * Create project footer with links
   */
  function createProjectFooter(project) {
    const footer = document.createElement('div');
    footer.className = 'project-footer';

    // Repo link (always present)
    const repoLink = document.createElement('a');
    repoLink.className = 'btn-link';
    repoLink.href = project.repoUrl;
    repoLink.target = '_blank';
    repoLink.rel = 'noopener';
    repoLink.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
      View source
    `;
    footer.appendChild(repoLink);

    // Demo link (optional)
    if (project.demoUrl) {
      const demoLink = document.createElement('a');
      demoLink.className = 'btn-link';
      demoLink.href = project.demoUrl;
      demoLink.target = '_blank';
      demoLink.rel = 'noopener';
      demoLink.setAttribute('aria-label', 'Live demo');
      demoLink.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      `;
      footer.appendChild(demoLink);
    }

    return footer;
  }

  /**
   * Create a single project card element
   */
  function createProjectCard(project) {
    const article = document.createElement('article');
    article.className = `project-card ${project.animation || 'from-left'}`;
    article.dataset.repo = project.id;

    // Thumbnail
    const thumbDiv = document.createElement('div');
    thumbDiv.className = 'project-thumb';
    const img = document.createElement('img');
    img.src = `assets/projects/${project.image}`;
    img.alt = `${project.title} project preview`;
    img.loading = 'lazy';
    img.onerror = function() {
      // Fallback: show a colored placeholder
      this.style.display = 'none';
      thumbDiv.style.background = 'var(--border)';
    };
    thumbDiv.appendChild(img);

    // Body
    const bodyDiv = document.createElement('div');
    bodyDiv.className = 'project-body';

    // Meta (tags)
    bodyDiv.appendChild(createProjectMeta(project));

    // Title
    const h3 = document.createElement('h3');
    h3.textContent = project.title;
    bodyDiv.appendChild(h3);

    // Description
    const p = document.createElement('p');
    p.textContent = project.description;
    bodyDiv.appendChild(p);

    // Stats
    if (project.stats) {
      bodyDiv.appendChild(createProjectStats(project.stats));
    }

    // Footer
    bodyDiv.appendChild(createProjectFooter(project));

    // Assemble card
    article.appendChild(thumbDiv);
    article.appendChild(bodyDiv);

    return article;
  }

  /**
   * Render all projects into the grid
   */
  function renderProjects(projects) {
    const grid = document.querySelector(GRID_SELECTOR);
    if (!grid) {
      console.error('Projects grid not found:', GRID_SELECTOR);
      return;
    }

    // Clear any existing content
    grid.innerHTML = '';

    // Add each project card
    projects.forEach(project => {
      const card = createProjectCard(project);
      grid.appendChild(card);
    });

    // Re-initialize scroll reveal for new cards
    // The main.js observe() function will pick these up if called again
    // But since main.js runs once at load, we need to trigger observation manually
    if (typeof initProjectScrollReveal === 'function') {
      initProjectScrollReveal();
    }
  }

  /**
   * Initialize scroll reveal for project cards (called after dynamic render)
   * This mimics the logic in main.js
   */
  function initProjectScrollReveal() {
    const cards = document.querySelectorAll('.project-card');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const cards = document.querySelectorAll('.project-card');
            const i = [...cards].indexOf(e.target);
            setTimeout(() => e.target.classList.add('in'), i * 80);
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    cards.forEach((el) => observer.observe(el));
  }

  /**
   * Fetch projects and render
   */
  async function loadProjects() {
    try {
      const response = await fetch(PROJECTS_JSON);
      if (!response.ok) {
        throw new Error(`Failed to load projects: ${response.status}`);
      }
      const projects = await response.json();
      renderProjects(projects);
    } catch (error) {
      console.error('Error loading projects:', error);
      // Show fallback message
      const grid = document.querySelector(GRID_SELECTOR);
      if (grid) {
        grid.innerHTML = `
          <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--muted);">
            Failed to load projects. Please try again later.
          </div>
        `;
      }
    }
  }

  // Expose for manual triggering if needed
  window.initProjectScrollReveal = initProjectScrollReveal;

  // Load projects when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadProjects);
  } else {
    loadProjects();
  }
})();