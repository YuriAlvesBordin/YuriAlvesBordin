# Yuri Alves Bordin — Developer Portfolio

A minimal, performant portfolio site built with vanilla HTML, CSS, and JavaScript. No frameworks, no build step — just static files that deploy directly to GitHub Pages.

## Tech Stack

- **HTML5** — Semantic, accessible markup
- **CSS3** — Custom properties (design tokens), CSS Grid/Flexbox, fluid typography with `clamp()`, scroll-driven animations via IntersectionObserver
- **Vanilla JS (ES6+)** — Module pattern, dynamic project rendering from JSON, lazy-loading, reduced-motion support
- **GitHub Pages** — Free static hosting with custom domain support

## Project Structure

```
├── index.html          # Main page
├── css/
│   └── styles.css      # All styles (design tokens, components, responsive)
├── js/
│   ├── main.js         # Core interactions (intro, hero, scroll-reveal, photo load)
│   └── projects.js     # Fetches data/projects.json, renders project cards
├── data/
│   └── projects.json   # Project data — add/edit projects here
├── assets/
│   ├── hero.png        # Hero background
│   ├── photo.png       # About photo
│   ├── favicon.ico
│   ├── icons/
│   └── projects/       # Project thumbnails (referenced from JSON)
│       ├── btn.png
│       ├── dc-motor-controller.png
│       ├── agenda-medica.png
│       └── webxr-demos.png
└── .github/
    └── workflows/      # (optional) CI for validation
```

## Key Features

- **Zero dependencies** — No npm, no build tools, no frameworks
- **Dark/light mode** — Automatic via `prefers-color-scheme`
- **Reduced motion** — Respects `prefers-reduced-motion: reduce`
- **Accessible** — Skip link, semantic HTML, ARIA labels, focus styles
- **Performant** — Lazy-loaded images, preconnect hints, minimal CSS/JS
- **JSON-driven projects** — Add projects by editing `data/projects.json` + dropping an image in `assets/projects/`

## Adding a New Project

1. **Add the thumbnail** to `assets/projects/` (recommended: 3:2 aspect ratio, ~800×533px)

2. **Edit `data/projects.json`** — add an object to the array:

```json
{
  "id": "my-new-project",
  "title": "My New Project",
  "description": "Short description of what it does and why it's cool.",
  "tags": ["Category · Subcategory"],
  "languages": ["Language1", "Framework"],
  "image": "my-new-project.png",
  "repoUrl": "https://github.com/YuriAlvesBordin/my-new-project",
  "demoUrl": "https://example.com/live-demo",  // optional
  "stats": { "stars": 0, "forks": 0 },
  "animation": "from-left"  // or "from-right" — alternates visually
}
```

3. **Commit and push** — GitHub Pages rebuilds automatically.

## Local Development

Just open `index.html` in a browser, or serve it:

```bash
# Python 3
python3 -m http.server 8080

# Or Node (if you have it)
npx serve .
```

Then visit `http://localhost:8080`.

> **Note:** `fetch()` for `data/projects.json` requires HTTP(S) — `file://` protocol will fail due to CORS. Use a local server.

## Deployment

1. Push to the `gh-pages` branch
2. Enable GitHub Pages in repo Settings → Pages → Source: `gh-pages` branch
3. Site lives at `https://<username>.github.io/<repo>/` or your custom domain

## Design Tokens (CSS Variables)

All colors, spacing, and sizing defined in `:root` at top of `css/styles.css`:

```css
:root {
  --bg:      #ffffff;
  --fg:      #1d1d1f;
  --muted:   #6e6e73;
  --subtle:  #f5f5f7;
  --border:  #d2d2d7;
  --accent:  #0071e3;
  --radius:  12px;
  --max:     980px;
}
```

Dark mode overrides automatically via `@media (prefers-color-scheme: dark)`.

## License

MIT — feel free to use as a template for your own portfolio.