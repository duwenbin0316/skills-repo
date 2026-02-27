# skills

Private multi-skill repository template compatible with OpenSkills.

Users can install skills directly from this repo:

```bash
npx openskills install git@github.com:<your-org-or-user>/skills.git
```

## Repository Layout

```text
skills/
├── frontend-design/
│   ├── SKILL.md
│   ├── agents/openai.yaml
│   └── references/design-checklist.md
├── code-review/
│   ├── SKILL.md
│   ├── agents/openai.yaml
│   └── references/review-checklist.md
└── docs-writer/
    ├── SKILL.md
    ├── agents/openai.yaml
    └── references/doc-templates.md
```

OpenSkills discovers every directory that contains a `SKILL.md`, so adding a new folder with `SKILL.md` makes it installable.

## Add a New Skill

Use the Codex skill-creator initializer:

```bash
python3 ~/.codex/skills/.system/skill-creator/scripts/init_skill.py <skill-name> --path .
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
