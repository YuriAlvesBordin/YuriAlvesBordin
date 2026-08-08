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

## Adding a New Project

**Add the thumbnail** to `assets/projects/` (recommended: 3:2 aspect ratio, ~800×533px)

**Edit `data/projects.json`** — add an object to the array:

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

## License

MIT — feel free to use as a template for your own portfolio.