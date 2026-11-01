# TRUE BLACK CAFÉ — DESIGN SYSTEM & VISUAL CONSTITUTION
Version 1.0  
Scope: Cinematic Operations Management presentation website  
Brand context: True Black Café, Hyderabad

This file is the visual rulebook for every page, chapter, presenter state, gallery view, Operations Lab panel, diagram, chart, navigation element and responsive layout in this project.

**This document is mandatory. It takes precedence over ad-hoc styling decisions.** Do not introduce visual treatments that contradict it without an explicit design decision.

---

## 1. Design philosophy

The experience should feel like a premium coffee documentary presented through a refined editorial interface.

The design must communicate:
- Craft and precision.
- Warmth without visual clutter.
- Confidence without excessive decoration.
- Academic clarity without looking like a classroom template.
- Cinematic atmosphere without sacrificing readability.

### Core principle

**The coffee imagery creates atmosphere. The interface creates clarity.**

The background may be rich, textured and cinematic. Foreground content must remain calm, structured, aligned and easy to read.

Design is not decoration. Every element must have a clear purpose.

### Non-negotiable rules

1. Readability always outranks visual effects.
2. Alignment always outranks decorative asymmetry.
3. Consistency always outranks one-off styling.
4. Evidence and accuracy outrank dramatic claims.
5. The six presenters share one fixed stage.
6. Content uses one shared grid and spacing system.
7. All content remains inside the existing continuous scroll experience.
8. Never cover important parts of the coffee animation with unnecessary opaque panels.
9. Never allow the coffee animation to reduce text contrast.
10. Do not use generic AI landing-page patterns.

---

## 2. Brand mood and visual language

### Desired mood

- Premium
- Cinematic
- Editorial
- Warm
- Tactile
- Minimal
- Confident
- Contemporary

### Avoid

- Cheap gold gradients.
- Bright orange glows.
- Excessive glassmorphism.
- Frosted-glass cards everywhere.
- Random floating particles.
- Neon outlines.
- Thick glowing borders.
- Generic SaaS dashboard styling.
- Repeated identical cards for every piece of information.
- Excessive pill badges.
- Tiny uppercase text used for everything.
- Random icons with no information value.
- Excessive shadows and blur.
- Unmotivated animations.
- Dense text walls.

The site should resemble a considered premium hospitality brand editorial, not a gaming HUD or crypto dashboard.

---

## 3. Color system

Use a restrained palette. The colors below are the approved starting tokens. If the existing project already has a documented brand token system, reconcile it with these values rather than creating a second palette.

### Foundation

| Token | Hex | Purpose |
|---|---|---|
| `--espresso-950` | `#100B08` | Deepest page/background tone |
| `--espresso-900` | `#17100C` | Main content background |
| `--espresso-850` | `#211710` | Raised content surfaces |
| `--espresso-800` | `#2A1D14` | Secondary surface |
| `--coffee-brown` | `#3A2518` | Subtle image/surface tint |
| `--cream-100` | `#F5EEE4` | Primary text |
| `--cream-200` | `#E7D9C8` | Secondary headings |
| `--cream-300` | `#CDBBA5` | Body text |
| `--muted-400` | `#A9957E` | Metadata and subdued labels |
| `--muted-500` | `#82715F` | Disabled/tertiary text only |

### Accent

| Token | Hex | Purpose |
|---|---|---|
| `--caramel-400` | `#D69A59` | Primary accent |
| `--caramel-500` | `#B9783D` | Accent emphasis |
| `--copper-600` | `#92552E` | Restrained secondary accent |
| `--line-warm` | `rgba(214,154,89,0.22)` | Fine dividers and outlines |

### Semantic colors

| Token | Hex | Use |
|---|---|---|
| `--success` | `#8EAA87` | Verified positive/complete status |
| `--warning` | `#D5A15E` | Caution or pending validation |
| `--danger` | `#C87968` | Actual error or risk |
| `--info` | `#91AFC0` | Neutral informational state |

Semantic colors must not become decorative accents.

### Color usage ratios

As a general visual balance:
- 65–75% deep espresso / near-black foundation.
- 15–22% warm cream and readable content surfaces.
- 5–10% coffee brown and muted neutrals.
- 3–5% caramel/copper accents.

These are visual proportions, not rigid per-component quotas.

### Contrast rules

- Primary text must have strong contrast against its surface.
- Body text must never use low-contrast muted beige over moving coffee footage.
- Metadata may be subdued, but must remain readable.
- Accent color is not a substitute for text contrast.
- Never place critical text directly over bright highlights, steam, crema or high-detail coffee textures without a contrast treatment.
- Use a dark content backing or local gradient when necessary.

Target WCAG AA contrast where practical: 4.5:1 for normal text and 3:1 for large text and meaningful interface elements.

### Surface treatment

Use layered espresso surfaces, not flat opaque black rectangles:
- Base: `#17100C`.
- Raised surface: `#211710`.
- Subtle warm border: `rgba(214,154,89,0.18)`.
- Very restrained shadow: broad, low-opacity, no bright glow.

Content backings should be opaque enough to preserve legibility over every frame, but should retain a refined sense of depth. Prefer a carefully controlled dark translucent surface with a subtle warm tint and a gradient edge over a strong blur.

Do not use transparency values that make body text depend on whichever frame happens to be behind it.

---

## 4. Typography system

Use no more than two font families:
1. Display/editorial face for large chapter headings, if already available.
2. Highly legible sans-serif for body text, labels, navigation and data.

Preferred direction:
- Display: Instrument Serif, Fraunces or the project's existing editorial display face.
- Sans-serif: DM Sans, Manrope, Inter or the project's existing sans-serif.

Do not add multiple font families for decoration. Check existing assets and dependencies before loading fonts.

### Type scale

Use responsive `clamp()` values rather than arbitrary per-section font sizes.

| Role | Desktop guidance | Weight |
|---|---:|---|
| Main chapter title | 52–72 px | 700–800 |
| Section subtitle | 25–32 px | 500–650 |
| Lead paragraph | 18–21 px | 400–500 |
| Body paragraph | 16–18 px | 400 |
| Diagram label | 14–16 px | 500–600 |
| Metadata / eyebrow | 11–13 px | 600 |
| Data value | 26–40 px | 650–750 |
| Caption | 13–14 px | 400–500 |

These are guidance ranges. The actual rendered size must suit the viewport and content density.

### Typography rules

- Use sentence case for most explanatory copy.
- Reserve uppercase for short chapter titles, section markers and concise labels.
- Do not set long paragraphs in all caps.
- Use consistent letter spacing; avoid extreme tracking.
- Body line-height: approximately 1.5–1.7.
- Heading line-height: approximately 0.95–1.15.
- Keep paragraphs to a readable line length, typically 55–75 characters.
- Avoid justified text.
- Do not use tiny text to force content into a fixed panel.
- Use tabular numerals for data values and time measurements.
- Maintain consistent heading margins across all six sections.

---

## 5. Grid, alignment and spacing

### Global layout

The presentation has three independent visual layers:
1. Coffee animation background.
2. Presenter stage on the left.
3. Content stage on the right.

The presenter and content must never overlap.

### Shared desktop composition

Use one consistent grid for all six chapters:
- Presenter stage: approximately 38–42% of viewport width.
- Content stage: approximately 54–58% of viewport width.
- Remaining width: safe separation and outer margins.

Exact values may be tuned to the actual viewport and portrait asset, but all six chapters must share the same stage boundaries.

### Presenter stage

- Same left anchor for all six people.
- Same bottom safe-area baseline.
- Same reserved width.
- Same maximum stage height.
- Individual image scaling/crop may vary after inspecting each source photograph.
- Do not change the stage position to accommodate one portrait.
- Preserve natural body proportions.
- Keep face and uniform details visible.
- Avoid clipping hands, hair, head or important clothing details.

### Content stage

All six sections use the same:
- Left edge.
- Right edge.
- Maximum width.
- Top anchor.
- Internal padding.
- Bottom safe area.
- Heading alignment.
- Vertical rhythm.

Content can vary in height, but it must remain within the same content frame and safe area.

### Spacing scale

Use a consistent spacing scale based on 4px:
- 4px — micro adjustment.
- 8px — tight inline spacing.
- 12px — compact grouping.
- 16px — standard component gap.
- 24px — paragraph/group spacing.
- 32px — section element spacing.
- 40px — major grouping.
- 48px — panel padding where space allows.
- 64px — major editorial separation.

Do not use arbitrary one-off margins where shared tokens can solve the problem.

### Alignment rules

- Align chapter number, eyebrow and title to one vertical axis.
- Align body copy with the heading.
- Align process diagrams to the content grid.
- Align card edges and dividers precisely.
- Keep consistent gutters between columns.
- Do not allow text and diagrams to drift horizontally between chapters.
- Use a clear baseline grid.
- No accidental overlap, clipping or horizontal scrolling.

---

## 6. Content panel and card design

### Content panel

The content panel should feel like a premium editorial surface:
- Deep espresso surface with subtle warm undertone.
- Strong text contrast.
- Restrained thin border.
- Consistent internal padding.
- Rounded corners only where appropriate; avoid excessive pill-like rounding.
- No bright glow.
- No heavy glass blur.
- No visible coffee texture directly behind paragraphs.

The panel must be large enough for its content, but not so large that it dominates the entire screen.

### Cards

Use cards only when information is genuinely modular.

For example:
- IPO input/process/output groups.
- Five performance objectives.
- Dashboard metrics.
- Recommendation summaries.
- Process stages.

Card rules:
- One clear purpose per card.
- Consistent padding and alignment.
- Clear title, content and metadata hierarchy.
- Avoid nesting cards inside cards.
- Avoid using identical card grids for every chapter.
- Use subtle borders and restrained surface contrast.
- Keep labels and values aligned.
- Do not make all cards the same height if doing so creates empty space or truncates content.

### Recommendations

For recommendation content:
- Use a clean numbered editorial list or carefully aligned grid.
- Recommendation number and title must share a consistent baseline.
- Impact labels should be small and secondary.
- Description must have enough width and line-height.
- KPI or expected outcome must be separated clearly from the recommendation description.
- Never present an invented target KPI as a measured or guaranteed improvement.
- Any proposed target must be explicitly marked as a proposed target or illustrative estimate.
- Do not compress eight recommendations into unreadable small cards.

---

## 7. Photography and image treatment

### Authenticity hierarchy

1. Actual True Black Café visit photographs.
2. Actual team photographs.
3. Approved presenter cutouts.
4. Clearly identified illustrative stock photographs.

Never imply that a stock image depicts the actual café.

### Image treatment

- Maintain a coherent warm-neutral color grade.
- Avoid excessive orange saturation.
- Preserve realistic skin tones.
- Use consistent image corner radius within the same component family.
- Crop with intention; do not crop faces, equipment details or relevant evidence.
- Use image captions where they add context.
- Add source/attribution metadata where required.

### Gallery

The field-visit gallery should feel like a premium visual field journal:
- Large images.
- Varied but controlled compositions.
- Clear captions.
- Generous spacing.
- Lightbox viewing.
- No wall of tiny thumbnails.
- Relevant photographs also appear within their corresponding academic sections.

---

## 8. Data visualization and Operations Lab

The Operations Lab is an illustrative simulation, not a report of measured café performance.

### Visual rules

- Use clear units.
- Label inputs and outputs.
- Distinguish reported observations from simulation assumptions.
- Use restrained chart colors from the approved palette.
- Use charts only when they improve understanding.
- Show the formula or a concise explanation for calculated results.
- Do not use decorative gauges with no analytical purpose.
- Do not imply that illustrative outputs are actual café data.

### Data hierarchy

1. Metric name.
2. Value and unit.
3. Context / assumption.
4. Comparison or interpretation.

Use tabular numerals and consistent precision.

### Revenue mix

Use the reported figures:
- Coffee 70%.
- Bakery 25%.
- Unclassified 5%.

Do not silently allocate the remaining 5%.

### Process timings

Show reported timings as separate observations unless a verified process sequence establishes that they are sequential.

Never sum incompatible timings into a fabricated total.

---

## 9. Motion and interaction

Motion should support comprehension and continuity.

### Approved motion

- Restrained opacity transitions.
- Short lateral presenter entrances/exits.
- Small transform-based content reveals.
- Smooth chapter handoffs.
- Scroll-linked coffee frame scrubbing.
- Subtle image reveal when entering the gallery.

### Avoid

- Bounce and elastic overshoot.
- Large repeated zooms.
- Excessive parallax.
- Continuous floating animations.
- Decorative particle storms.
- Fade-to-black between chapters.
- Autoplay unrelated to scroll.
- Animating layout properties such as width, height, left or top when transforms can be used.

### Timing guidance

- Presenter transition: 550–850ms.
- Heading reveal: 350–550ms.
- Body reveal: 250–450ms.
- Small stagger between related content elements.

The exact duration should be tuned to feel natural, not applied mechanically.

### Scroll integrity

- One master scroll timeline.
- Existing 480-frame coffee animation remains continuous.
- All six academic sections remain inside the existing pinned experience.
- Gallery and Operations Lab are integrated into the same presentation flow.
- No second pinned section or competing scroll container.
- Reverse scroll must restore previous states.
- Fullscreen must preserve frame and chapter progress.
- Respect reduced-motion preferences.

---

## 10. Navigation and controls

Navigation must remain secondary to the content.

- Six chapter markers.
- Clear active chapter.
- Readable labels.
- Consistent spacing.
- Dedicated bottom safe area.
- Do not overlap presenter or content.
- Fullscreen control must remain accessible.
- Frame counter may remain subtle.
- Do not make navigation resemble a gaming HUD.

Controls must have visible focus states and accessible labels.

---

## 11. Responsive design

Test at:
- 1920×1080.
- 1600×900.
- 1440×900.
- 1366×768.
- Tablet landscape and portrait.
- Mobile portrait.

At each breakpoint:
- Preserve presenter/content separation.
- Recalculate stage dimensions using shared rules.
- Maintain readable typography.
- Reposition diagrams when required.
- Prevent horizontal overflow.
- Keep navigation accessible.
- Preserve the main coffee visual subject.
- Do not simply shrink the desktop composition.

Mobile may use a deliberate stacked composition, but all six chapters must use the same mobile layout rules.

---

## 12. Accessibility

- Meet WCAG AA contrast where practical.
- Respect `prefers-reduced-motion`.
- Use semantic headings.
- Provide meaningful image alt text.
- Provide keyboard-accessible controls.
- Do not rely on color alone to communicate status.
- Ensure focus indicators are visible.
- Keep text selectable and readable.
- Do not trap the user in fullscreen or a pinned scroll state.

---

## 13. Code and design governance

Before introducing a new style:
1. Check whether a token or component already exists.
2. Reuse the existing design system.
3. Avoid one-off CSS values.
4. Do not create duplicate typography or color systems.
5. Keep shared presenter and content geometry centralized.
6. Keep per-image calibration separate from shared stage geometry.
7. Keep animation code separate from content data.

When a visual change is made, verify all six chapters, not just the currently visible chapter.

---

## 14. Final design review checklist

Reject the implementation if:
- Text is hard to read over the coffee footage.
- Content cards are misaligned.
- Heading and body copy do not share a grid.
- Spacing changes randomly between chapters.
- Presenter positions jump between people.
- Cards are cramped or inconsistently padded.
- Images look unrelated or repetitive.
- Stock photography is presented as actual field evidence.
- KPI targets are invented or presented as measured.
- Dashboard values are not traceable to formulas.
- Navigation overlaps the content.
- Fullscreen scrolling breaks.
- The design resembles a generic AI-generated dashboard.

**Final design principle: cinematic in the background, editorial in the foreground, precise in every alignment, and academically trustworthy in every claim.**
