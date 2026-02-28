# skills-site

React static page for browsing and searching skills in this repository.

## Scripts

- `npm run dev` - Start local dev server.
- `npm run build` - Sync skills data then build static assets.
- `npm run preview` - Preview production build.
- `npm run skills:sync` - Regenerate `src/data/skills.json` from `../skills`.

## Quick Start

```bash
cd skills-site
npm install
npm run skills:sync
npm run dev
```

## Data Source

`skills-site/scripts/generate-skills-json.mjs` scans `../skills` recursively.
Any directory containing `SKILL.md` will be included in the UI.
