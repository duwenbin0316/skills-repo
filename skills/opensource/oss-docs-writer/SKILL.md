---
name: oss-docs-writer
description: Write and improve technical documentation that is accurate, structured, and implementation-friendly. Use when producing README files, architecture docs, onboarding guides, API usage guides, changelogs, migration notes, or internal knowledge base content from code or requirements.
---

# Docs Writer

Create concise but complete docs that help readers execute tasks without guesswork.

## Workflow

1. Identify document intent and audience.
Define whether the document is for end users, contributors, operators, or maintainers.
2. Build content outline.
Use only sections that serve the target audience and remove generic filler.
3. Extract facts from source material.
Prefer concrete behavior, commands, examples, and caveats from actual code and configs.
4. Draft with executable clarity.
Use direct language, concrete commands, expected outputs, and troubleshooting guidance.
5. Run consistency checks.
Ensure terms, command names, paths, and versions are consistent throughout.

## Output Format

Return docs with this structure when applicable:
1. Purpose and scope
2. Prerequisites
3. Quick start
4. Detailed usage
5. Configuration
6. Troubleshooting
7. FAQ or next steps

## Quality Bar

- Prefer concrete examples over abstract explanation.
- Keep steps verifiable and ordered.
- Include failure modes and recovery guidance.
- Avoid undocumented assumptions.
- Keep terminology consistent across headings and examples.

## References

- Use `references/doc-templates.md` for baseline templates and wording patterns.
