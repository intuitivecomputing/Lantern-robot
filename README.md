# Lantern website

The project site for **Lantern: A Minimalist Robotic Object Platform** (HRI '26), live at
https://intuitivecomputing.github.io/Lantern-robot/. It shares its design with the
[M site](https://intuitivecomputing.github.io/M-robot/) as the second "volume" of an open robot collective.

```bash
npm install
npm run dev          # http://localhost:5174
npm run build        # dist/, served from /
npm run build:pages  # dist/, served from /Lantern-robot/ as on GitHub Pages
```

## Deployment

Every push to `main` runs `.github/workflows/pages.yml`, which typechecks, runs `scripts/build-pages.sh`, and
publishes `dist/` to GitHub Pages. GitHub Pages has no rewrites, so the script copies the page to each route
(`build-guide.html`, `bill-of-materials.html`) and to `404.html`.

## Layout

- `src/app/data/` holds every fact the pages show: paper metadata and links (`project.ts`), the bill of
  materials (`billOfMaterials.ts`, from `public/downloads/lantern-bom.xlsx`), the build guide's sections, and
  the collective's robot list (`collective.ts`).
- `src/styles/theme.css`, `src/app/components/layout.tsx`, and `src/app/routes.ts` are copied from the M site
  and should stay identical to it until the collective's design system is a shared package.
- `public/images/build-guide/` is the build guide PDF, one WebP per page.

Values still to confirm are marked `TODO(release)` in `src/app/data/project.ts`.

The HRI '26 paper cites https://lantern-website-iota.vercel.app/, so that address must keep working (or
redirect here).
