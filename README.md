# skills

Private multi-skill repository template compatible with OpenSkills.

Users can install skills directly from this repo:

```bash
npx openskills install git@github.com:<your-org-or-user>/skills.git
```

## Repository Layout

```text
skills/
├── opensource/                  # Open-source general skills
│   ├── algorithmic-art/
│   ├── docx/
│   ├── pdf/
│   ├── skill-creator/
│   └── ... (synced from anthropics/skills)
└── internal/                    # Internal company skills
    ├── frontend/                # Frontend team
    │   └── team-frontend-<skill-name>/
    └── backend/                 # Backend team
        └── team-backend-<skill-name>/
```

OpenSkills discovers every directory that contains a `SKILL.md`, so adding a new folder with `SKILL.md` makes it installable.

`opensource` currently mirrors the `skills/` directory from `https://github.com/anthropics/skills`.

## Naming Convention

- Keep first-level category fixed as `opensource`, `internal`.
- Ensure each skill directory name is globally unique in the repo.
- Keep open-source skill names the same as upstream whenever possible.
- Internal skills must use `team-<domain>-<skill-name>`:
  - Frontend team: `team-frontend-...`
  - Backend team: `team-backend-...`
- Keep `SKILL.md` frontmatter `name` equal to the skill directory basename.

## Add a New Skill

Use the Codex skill-creator initializer:

```bash
python3 ~/.codex/skills/.system/skill-creator/scripts/init_skill.py team-frontend-<skill-name> --path skills/internal/frontend
```

Then update the generated `SKILL.md` description so OpenSkills can trigger it correctly.

## Private Repo Installation Notes

- Use SSH install for private repositories:
  - `npx openskills install git@github.com:<your-org-or-user>/skills.git`
- Example for this repository:
  - `npx openskills install git@github.com:duwenbin0316/skills-repo.git`
- HTTPS shorthand can still be used for public repositories:
  - `npx openskills install <your-org-or-user>/skills`

After install, users can sync to their `AGENTS.md`:

```bash
npx openskills sync
```

## Skills Static Page

A React static page is available in `skills-site/` to show and search repository skills.

```bash
cd skills-site
npm install
npm run skills:sync
npm run dev
```

Build static files:

```bash
npm run build
```
