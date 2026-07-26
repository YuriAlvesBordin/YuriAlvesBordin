# Yuri Alves Bordin — Portfolio

Personal portfolio site, built with vanilla HTML, CSS, and JavaScript.
Live at **<https://yurialvesbordin.github.io/>** (replace with your own GitHub Pages URL).

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Made with HTML](https://img.shields.io/badge/Made%20with-HTML%2FCSS%2FJS-orange)

---

## Highlights

- **No build step** — open `index.html` and ship.
- **Dark / light mode** that follows the OS preference.
- **Accessible**: skip link, focus styles, semantic landmarks, `prefers-reduced-motion` support.
- **SEO-ready**: Open Graph + Twitter cards, JSON-LD `Person` schema, `sitemap.xml`, `robots.txt`.
- **PWA-installable**: `manifest.json` + icons, installable to home screen.
- **Intro animation** that gracefully skips itself when reduced motion is requested.
- **CI/CD via GitHub Actions** — every push to `main` deploys to GitHub Pages automatically.

---

## Project structure

```
.
├── .github/workflows/deploy.yml   # Auto-deploy to GitHub Pages
├── assets/
│   ├── favicon.svg                # Vector favicon
│   ├── favicon.ico                # Raster favicon (multi-size)
│   ├── og-image.png               # Social share preview (1200x630)
│   ├── photo.jpg                  # <-- Replace with your photo
│   └── icons/                     # PWA / apple-touch icons
├── css/
│   └── styles.css                 # All styles
├── js/
│   └── main.js                    # Intro + scroll-reveal logic
├── index.html                     # Main page
├── manifest.json                  # PWA manifest
├── robots.txt                     # SEO
├── sitemap.xml                    # SEO
├── CNAME                          # Optional custom domain
└── README.md                      # This file
```

---

## Run locally

No build tools required. Pick any of the options below.

### Option A — Python (already installed on macOS/Linux)

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

### Option B — Node.js

```bash
npx serve .
# or: npx http-server -p 8000
```

### Option C — VS Code

Install the **Live Server** extension, right-click `index.html` → **Open with Live Server**.

> Opening `index.html` directly with `file://` works for visual testing, but
> some browser features (service workers, certain CDN caching) behave better
> over HTTP.

---

## Customize

### 1. Personal info & social links

Edit `index.html` and update:

- `<title>`, meta tags (`description`, `og:*`, `twitter:*`)
- The `<script type="application/ld+json">` JSON-LD block (URL, `sameAs` links)
- The `#hero` headline copy and subtitle
- The `#contact` links (GitHub, email, LinkedIn)
- The `#about` paragraphs and `about-items` (education, location, languages)

### 2. Hero headline animation

The hero headline is built dynamically in `js/main.js`:

```js
const HERO_LINES = ['Like water shape the code', 'to solve the problem.'];
```

Change the strings (or add/remove lines) to update the animated headline.

### 3. Intro name

The intro overlay types out the name defined in `js/main.js`:

```js
const NAME = 'Yuri Alves Bordin';
```

### 4. Skills

In `index.html`, find the `#skills` section. Each tech is a `<div class="tech-item">`
with an `<img>` (or inline `<svg>`) and a `<span>` label. Icons are loaded from
[devicon](https://devicon.dev) and [simpleicons.org](https://simpleicons.org) —
swap the `src` to change any icon.

### 5. Projects

In `index.html`, find the `#projects` section. Each card is an
`<article class="project-card from-left|from-right">`. Duplicate an article to
add a project, update the tag, title, description, and link.

### 6. Your photo

Replace `assets/photo.jpg` with a portrait photo (recommended 3:4 aspect ratio,
at least 600×800 px). If the file is missing or fails to load, a placeholder is
shown automatically — no code change needed.

### 7. Social preview image

Replace `assets/og-image.png` (1200×630) with your own preview. A reference SVG
is at `assets/og-image.svg` you can edit and re-export.

### 8. PWA / theme color

Edit `manifest.json` and the `<meta name="theme-color">` tags in `index.html`
to change the install theme color.

### 9. Custom domain (optional)

If you own a custom domain (e.g. `yuribordin.dev`):

1. Create a `CNAME` file at the repo root containing your domain (one line, no protocol):
   ```
   yuribordin.dev
   ```
2. In your DNS provider, add an `ALIAS`/`ANAME` record pointing to your
   `<username>.github.io` URL (or an `A` record to GitHub Pages IPs — see
   [GitHub's docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)).
3. Push, then in **Settings → Pages** of the repo, enter your custom domain and
   enable **Enforce HTTPS**.

A sample `CNAME` file is already included (commented out — uncomment or replace).

---

## Deploy to GitHub Pages

This repo ships with a GitHub Actions workflow that auto-deploys on every push
to `main` (or `master`).

### One-time setup

1. **Create the repository** on GitHub (e.g. `YuriAlvesBordin.github.io` if you
   want it at the root of `https://yurialvesbordin.github.io/`, or any name
   like `portfolio` for `https://yurialvesbordin.github.io/portfolio/`).

2. **Push this project** to the new repo:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin git@github.com:YuriAlvesBordin/<repo-name>.git
   git push -u origin main
   ```

3. **Enable Pages from Actions**:
   - Go to **Settings → Pages** in the repo.
   - Under **Build and deployment → Source**, choose **GitHub Actions**.

4. The first workflow run will trigger automatically. Watch it under the
   **Actions** tab. When it finishes, your site is live at the URL shown in
   **Settings → Pages**.

### Subsequent updates

Just push to `main` — the workflow handles the rest. The site typically goes
live within 30–60 seconds of a green build.

### Manual deploy

You can also trigger a deploy manually from **Actions → Deploy to GitHub Pages →
Run workflow**.

---

## Regenerating raster assets

If you want to rebuild `favicon.ico`, `og-image.png`, PWA icons, or the
placeholder photo, run:

```bash
pip install Pillow
python3 ../scripts/generate_assets.py   # adjust path as needed
```

> The script lives in `scripts/generate_assets.py` (sibling of this `portfolio/`
> folder in the source layout). For a published repo you may copy it inside the
> repo under `tools/` or remove it once you've customized the assets manually.

---

## Tech stack

- **HTML5** — semantic, single page.
- **CSS** — custom properties, `color-mix()`, `clamp()`, container-friendly grid.
- **Vanilla JS (ES6+)** — `IntersectionObserver`, no dependencies.
- **GitHub Actions** — official `actions/deploy-pages` workflow.

No frameworks. No bundlers. No `node_modules`. Just files.

---

## License

[MIT](./LICENSE) — © Yuri Alves Bordin.

Feel free to fork and adapt for your own portfolio. A heads-up or credit is
appreciated but not required.
