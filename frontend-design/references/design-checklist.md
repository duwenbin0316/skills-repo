# Frontend Design Checklist

## 1. Goal and Audience

- What is the page primary conversion goal?
- Who is the target user and what is the key action?
- What platforms are in scope (desktop/mobile/tablet)?

## 2. Information Hierarchy

- Is there one clear primary heading?
- Are sections ordered by user decision flow?
- Is critical action visible without deep scrolling?

## 3. Visual System

- Typography scale is consistent.
- Spacing scale is consistent.
- Color roles are semantic (primary/success/warning/danger/surface/text).
- Contrast is readable for text and controls.

## 4. Components and States

- All key components have default/hover/focus/active/disabled states.
- Empty/loading/error states are defined.
- Form validation states are explicit.

## 5. Responsive Behavior

- Mobile layout preserves primary action visibility.
- Breakpoint behavior is explicit.
- Touch targets are large enough.

## 6. Accessibility

- Keyboard navigation is possible.
- Focus ring is visible.
- Semantic landmarks/headings are logical.
- Color is not the only status signal.

## 7. Implementation Readiness

- Component boundaries are clear.
- Token definitions are usable in CSS or theme config.
- No ambiguous language like "make it better" without specifics.
