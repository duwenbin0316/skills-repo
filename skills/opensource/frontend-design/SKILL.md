---
name: frontend-design
description: Design and refine web or React frontends with clear visual hierarchy, component structure, and implementation-ready guidance. Use when asked to design new pages, improve UI/UX quality, restructure layout, define design tokens, or turn product requirements into concrete frontend implementation plans.
---

# Frontend Design

Produce design decisions that can be implemented immediately in code.

## Workflow

1. Identify context and constraints.
Gather target users, page goal, platform, brand constraints, accessibility requirements, and device priorities.
2. Audit current UI (if code exists).
List hierarchy issues, spacing issues, readability problems, interaction friction, and responsive breakpoints to fix.
3. Define the visual system.
Specify typography scale, spacing scale, color roles, corner radius, elevation, and motion behavior.
4. Propose layout and component structure.
Provide page sections, component tree, state variants, and empty/loading/error states.
5. Deliver implementation-ready guidance.
Return concrete React/CSS instructions, including class naming or component API expectations.

## Output Format

Return results in this order:
1. Goal and constraints summary
2. UI issues found (if redesign)
3. Design direction
4. Component structure
5. Design tokens (type, spacing, color, radius, shadow, motion)
6. Responsive behavior
7. Accessibility checks
8. Implementation notes

## Quality Bar

- Prefer specific and testable recommendations over generic advice.
- Explain tradeoffs when presenting alternatives.
- Keep desktop and mobile behavior explicit.
- Include interaction feedback states: hover, focus, active, disabled.
- Maintain contrast and keyboard accessibility by default.

## References

- Use `references/design-checklist.md` as the delivery checklist before finalizing.
