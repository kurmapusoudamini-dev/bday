# Birthday Star Constellation

A single-page React + Vite experience that guides visitors through a dreamy night sky, revealing **A&nbsp;P&nbsp;A&nbsp;R&nbsp;A&nbsp;N&nbsp;J&nbsp;I&nbsp;T&nbsp;H&nbsp;A** letter-by-letter with quotes and a finale wallpaper.

## Local development
```bash
npm install
npm run dev
```

## Build static site
```bash
npm run build
```

## Deploying on GitHub Pages
This repository includes a convenient deploy script powered by [`gh-pages`](https://github.com/tschaub/gh-pages):

1. Commit & push your code to `main`.
2. Run:
   ```bash
   npm run deploy
   ```
   The script runs `vite build` then pushes the contents of `/dist` to a `gh-pages` branch.
3. Open **Settings → Pages** and select **Deploy from branch → gh-pages**.
4. Wait a minute, then visit `https://<user>.github.io/<repo>/`.

### GitHub Actions alternative
Prefer CI? Create `.github/workflows/pages.yml` that installs deps, runs `npm run build`, and uploads the `dist/` directory.

---
Built with Vite (`base:'./'`) so the site works perfectly under any sub-path, as required for GitHub Pages.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
