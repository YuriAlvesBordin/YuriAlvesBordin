# Yuri Alves Bordin — Portfolio

Meu portfolio pessoal. HTML/CSS/JS puro, sem build, sem dependências. Deploy automático no GitHub Pages.

## Rodar localmente

```bash
python3 -m http.server 8000
# ou: npx serve .
# abre http://localhost:8000
```

> Abrir `index.html` direto no browser funciona pra visual, mas service worker e cache de CDN funcionam melhor sobre HTTP.

---

## Estrutura

```
.
├── .github/workflows/deploy.yml   # deploy automático no push pra main
├── assets/                        # favicon, og-image, foto, icons PWA
├── css/styles.css                 # tudo: tokens, dark/light, animações, responsivo
├── js/main.js                     # intro overlay + hero + scroll-reveal (IntersectionObserver)
├── index.html                     # single-page: intro, hero, skills, projects, about, contact
├── manifest.json                  # PWA
├── robots.txt / sitemap.xml       # SEO básico
└── CNAME                          # domínio customizado (opcional)
```

---

## Personalizar

1. **Info pessoal** — edite `index.html`: title, meta tags, JSON-LD, hero headline, about, contatos
2. **Hero headline** — `js/main.js`: `HERO_LINES = ['Like water shape the code', 'to solve the problem.']`
3. **Nome no intro** — `js/main.js`: `NAME = 'Yuri Alves Bordin'`
4. **Skills** — `#skills` no `index.html`, cada item é um `.tech-item` com ícone (devicon/simpleicons) + label
5. **Projetos** — `#projects` no `index.html`, duplique um `<article class="project-card">` e edite
6. **Foto** — substitua `assets/photo.png` (recomendado 3:4, ≥600×800). Se faltar, aparece placeholder automático
7. **Social preview** — troque `assets/og-image.png` (1200×630). Tem `assets/og-image.svg` de referência
8. **PWA / theme color** — `manifest.json` + `<meta name="theme-color">` no `index.html`
9. **Domínio próprio** — crie `CNAME` na raiz com seu domínio, configure DNS (ALIAS/ANAME pra `usuario.github.io` ou A pra IPs do GitHub Pages), ative "Enforce HTTPS" em Settings → Pages

---

## Deploy

O workflow `.github/workflows/deploy.yml` roda em todo push pra `main`/`master` e publica via `actions/deploy-pages`.

**Setup único:**
1. Crie o repo no GitHub (ex: `YuriAlvesBordin.github.io` pra raiz ou `portfolio` pra `/portfolio/`)
2. Push inicial:
   ```bash
   git init && git add . && git commit -m "init portfolio"
   git branch -M main
   git remote add origin git@github.com:YuriAlvesBordin/<repo>.git
   git push -u origin main
   ```
3. Settings → Pages → **Source: GitHub Actions**
4. Primeira roda sozinho. Acompanhe na aba Actions. Geralmente sobe em < 1 min.

Depois é só `git push` — o resto é automático.

---

## Stack

- HTML5 semântico, single-page
- CSS: custom properties, `clamp()`, `color-mix()`, grid container-friendly
- Vanilla JS (ES6+): `IntersectionObserver`, sem dependências
- GitHub Actions: `actions/configure-pages` + `actions/deploy-pages`

Sem framework, sem bundler, sem `node_modules`. Só arquivos.

---

## Licença

MIT — © Yuri Alves Bordin.

Fork à vontade, adapte pro seu portfolio. Um crédito ou menção é bem-vindo mas não obrigatório.