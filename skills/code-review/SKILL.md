---
name: code-review
description: Perform rigorous code review focused on bugs, regressions, security, performance, and maintainability risks. Use when reviewing pull requests, auditing refactors, checking production-readiness, or providing review feedback with prioritized findings and concrete fixes.
---

# Code Review

Review changes with severity-first findings and proof-oriented reasoning.

## Workflow

1. Determine scope.
Review changed files and infer user-facing impact, data impact, and runtime risk.
2. Detect high-risk issues first.
Check correctness, security, data loss, race conditions, migration safety, and compatibility.
3. Check behavioral regressions.
Validate edge cases, null handling, feature flag behavior, fallback behavior, and error boundaries.
4. Evaluate maintainability.
Spot unclear abstractions, hidden coupling, naming ambiguity, or brittle control flow.
5. Evaluate tests and verification.
Call out missing tests for critical paths and propose minimal test additions.

## Review Output Contract

Return findings first, ordered by severity:
1. `Critical`
2. `High`
3. `Medium`
4. `Low`

For each finding include:
- Title
- Why it matters
- File/line reference
- Reproduction or failure mode
- Concrete fix suggestion

After findings include:
1. Open questions or assumptions
2. Residual risks
3. Brief summary

If no findings are discovered, explicitly state that and still include residual risk/testing gaps.

## Quality Bar

- Avoid style-only comments unless they impact bugs or maintainability.
- Prefer evidence from actual code paths.
- Do not report speculative issues without explaining assumptions.
- Keep recommendations actionable and minimal.

## References

- Use `references/review-checklist.md` to run the full review checklist.
