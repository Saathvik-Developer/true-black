# Presenter and Content Motion Specification
## Six-section cinematic stage

## Composition

- Left stage: presenter cutout, approximately 30–38% of available width.
- Right stage: title, lead statement, evidence points, and one meaningful visual.
- Background: existing continuous coffee frame sequence.
- Keep a consistent presenter anchor across all six sections.
- Use a responsive composition on mobile; do not simply shrink the desktop layout.

## Entrance sequence

1. Previous presenter begins leaving the stage.
2. Next presenter enters from left with a controlled horizontal transform and opacity transition.
3. Section title appears on the right.
4. Lead sentence appears.
5. Evidence points reveal in a short stagger.
6. The relevant diagram or visual appears last, only if it adds understanding.

Suggested motion:
- Presenter: 550–850 ms.
- Heading: 350–550 ms.
- Lead: 250–400 ms.
- Evidence points: 200–350 ms stagger.
- Use a subtle ease-out. No bounce or elastic overshoot.

Use `transform` and `opacity`; avoid animating `left`, `top`, `width`, or layout-affecting properties.

## Exit sequence

- Presenter moves laterally out or slightly recedes.
- Text exits with a coordinated opacity/transform transition.
- New content must not collide with old content.
- Overlap outgoing and incoming transitions slightly to avoid an empty stage.
- Avoid a hard cut, full-screen fade to black, or sudden background reset.

## Scroll synchronization

The active section must derive from a single, deterministic chapter progress model. Do not maintain separate, conflicting scroll states in multiple components.

When the user scrolls backward:
- Reverse the presenter transition.
- Restore the preceding title and evidence.
- Keep the background coffee animation moving backward according to the global scroll timeline.

When using GSAP timelines, ensure the timeline can reverse cleanly and does not replay entrance animations unpredictably after small scroll changes.

## Content reveal

For each chapter:
- Section number.
- Short editorial title.
- One source-supported lead.
- Two to four evidence-backed points.
- One purposeful visual or diagram, when supported.
- Small source/observation attribution where needed.

Avoid six copies of the same card layout. Use a consistent grid and typography system but let each section's visual explain its particular concept.

## Portrait handling

- Use the approved supplied cutout assets.
- Preserve face, expression, hair, skin tone, clothing, and body proportions.
- Do not generate replacement faces.
- Do not add a rectangular photo frame.
- Use a subtle grounding shadow only if needed to integrate the cutout into the background.
- Do not crop off the head, hands, or important uniform details unintentionally.
- If the source is not transparent, remove the background only through an approved asset-editing workflow; do not distort the subject.

## Reduced motion

When `prefers-reduced-motion: reduce`:
- Avoid large lateral travel and staggered sequences.
- Use a short opacity change or immediate content swap.
- Keep section state and content fully accessible.
