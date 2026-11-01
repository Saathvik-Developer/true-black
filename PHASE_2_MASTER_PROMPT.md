# TRUE BLACK CAFÉ — PHASE 2 MASTER PROMPT
## Six presenter entrances, six content reveals, one continuous cinematic experience

You are a senior creative developer, interaction designer, motion director, and evidence-conscious academic storyteller. Extend the existing True Black Café Operations Management presentation website with **Phase 2: six presenter-led content sections**.

The result must feel like one carefully directed cinematic presentation, not six web cards, not a generic template, and not AI-generated filler.

## A. Understand the project before editing

Before writing code:

1. Inspect the entire existing project structure and identify the Phase 1 scroll scene, frame renderer, scroll controller, design tokens, routing, and current dependencies.
2. Read `design.md` and all applicable `AGENTS.md`, `README.md`, `PROJECT.md`, `CONSTITUTION.md`, and project context files.
3. Inspect the six-part extracted coffee frame sequence and existing asset folders.
4. Locate all project source materials relevant to the academic content: report, field notes, interview/survey notes, assignment brief, reference documents, images, and any existing slide content. Search the repository and provided project assets; do not assume filenames.
5. Locate the six real presenter cutout assets, if present. Inspect the images to understand which person belongs to which presenter. Do not infer names or identities from appearance.
6. Create a content evidence map before implementing: every factual statement must point to a source file, page, section, observation, or clearly identified user-provided fact.
7. If the source materials are not available, do not fabricate content. Build the presentation structure with clearly marked content slots and report exactly what is missing.

Do not replace or regress Phase 1. Preserve its working scroll-to-frame engine and integrate the six sections as a layer above it.

## B. Confirmed project context

The project is an Operations Management presentation about **True Black Café, Hyderabad**.

Confirmed context:
- The team has six members and the intended presentation has six sections, one section per presenter.
- The team visited the café and surveyed/interviewed a server.
- The available observations are described as mostly qualitative.
- The presentation duration target is 15–20 minutes.
- The core storytelling device is the journey of coffee preparation, from bean to finished cup.
- The experience is presenter-controlled and cinematic.

Do not convert qualitative impressions into quantitative measurements. Do not invent customer counts, order volumes, service times, staffing numbers, costs, inventory levels, demand forecasts, percentages, ratings, or measured productivity.

## C. Six-section content structure

The following is the **working narrative structure** from the earlier storyboard. Treat these as chapter themes, not as verified findings. Validate and map them to the actual project report and team allocation before displaying them as final section titles.

1. **ORIGIN — Understanding the Café Operation**
   - Café context and scope of the study.
   - What operation is being observed, and why Operations Management applies.
   - Planning, demand, capacity, and service context only where supported by sources.

2. **PREPARATION — Resources and Readiness**
   - Inputs, ingredients, equipment, people, and preparation.
   - Inventory and resource readiness only where supported.
   - Distinguish directly observed practices from general OM concepts.

3. **THE ORDER — Customer and Information Flow**
   - Customer interaction, order capture, communication, and coordination.
   - Show the real order path only if the visit/interview notes establish it.
   - Do not assume a POS system, kitchen display, queue design, or exact role split.

4. **THE BREW — Process Flow and Time**
   - Steps in preparing and delivering a beverage.
   - Process flow, cycle time, waiting, bottlenecks, and utilization as concepts.
   - Use measured values only if they exist in the source material. Otherwise use a clearly labelled illustrative process diagram or simulation, not a claimed café measurement.

5. **THE PERFECT SERVE — Quality and Customer Experience**
   - Consistency, service quality, product presentation, customer interaction.
   - Use the team's actual observations and interview evidence.
   - Do not claim customer satisfaction scores or quality-control procedures without evidence.

6. **BEYOND THE CUP — Findings and Recommendations**
   - Findings grounded in the visit and interview.
   - Practical recommendations linked to identified observations.
   - Limitations of the study and conclusion.
   - Never manufacture problems merely to make recommendations look impressive.

The final chapter labels and content must be reconciled with the team's actual report. If the report has a different order or required headings, preserve the report's authoritative structure and adapt the visual storytelling around it.

## D. Visual composition

Maintain the established storyboard:

- Presenter: left side, approximately 30–38% of the composition.
- Editorial content: right side, approximately 52–60%.
- Coffee transformation: continuous cinematic background, visible behind both layers.
- Maintain a clear visual safe zone around the central coffee subject.
- Presenter is a real photographic cutout, not an avatar, illustration, AI replacement, or framed portrait.
- Content is concise and readable from a classroom projector.

Use the existing True Black uniform reference and existing approved generated portraits. Do not generate substitute people. Do not change a presenter's face, skin tone, hairstyle, expression, body shape, or clothing. Never synthesize or infer a real person's identity. If a portrait is missing, show a neutral placeholder silhouette only in development and clearly flag the missing asset.

Do not put every point in a card. Prefer editorial typography, a short lead sentence, 2–4 concise evidence-backed points, and one purposeful diagram/visual per section.

## E. Presenter entrance choreography

Each presenter should feel like they enter the stage:

1. The previous presenter exits with a deliberate lateral movement and restrained opacity change.
2. The next presenter enters from just outside the left edge or from a subtle depth offset.
3. Use transform and opacity; avoid animating layout properties.
4. Settle the cutout into its consistent left-side anchor position.
5. Use a slight scale settle only if it feels natural; no bounce, elastic overshoot, or cartoon motion.
6. Preserve the original cutout proportions and crop. Never stretch.
7. Use a short stagger for presenter and content, so the scene reads in this order: presenter arrival → section title → supporting copy → key evidence/visual.
8. Avoid excessive blur, glow, particle effects, spinning, floating, or parallax that distracts from the speaker.

Suggested timing, tune through actual testing:
- Presenter entrance: 550–850 ms.
- Section title: 350–550 ms, beginning shortly after presenter movement starts.
- Supporting content: 250–450 ms stagger.
- Exit and entrance should overlap slightly to avoid a dead empty stage.
- Respect reduced-motion settings by replacing large travel with a minimal opacity change or instant state swap.

These are timing guides, not rigid requirements. Motion should be calm and intentional.

## F. Content reveal choreography

For each section:
- Reveal the section number and title.
- Reveal one strong, source-supported framing sentence.
- Reveal 2–4 concise content points.
- Reveal one section-specific visual: process flow, resource map, order journey, quality checkpoints, or evidence-led findings.
- Add source labels or footnotes unobtrusively where needed.
- Avoid long paragraphs on screen. Presenter narration can carry detail; screen content should support it.
- Use consistent information hierarchy but vary the visual treatment according to the actual content.

Content transitions must be synchronized with presenter handoffs. Do not show the next section's text while the previous presenter is still the focal subject unless deliberately designed as a transition.

## G. Connect chapters to the coffee transformation

The coffee sequence is a continuous visual timeline, not six unrelated background clips.

Map the six chapters to meaningful phases of the existing coffee sequence after inspecting the actual frames. Use the coffee transformation as a metaphorical chapter bridge:
- Early bean/origin imagery can introduce the café and its operation.
- Preparation imagery can support resources and readiness.
- Portafilter/order-to-preparation handoff can bridge order flow and preparation.
- Extraction can support process flow.
- Crema/swirl/latte art can support quality and service.
- Finished cup can support findings and conclusion.

This is a narrative metaphor, not proof that the café follows a particular process. Never claim a visual metaphor is a documented café procedure.

If Phase 1 already scrubs the entire 480-frame sequence with global scroll progress, do not break or restart it at every chapter. Keep the coffee sequence continuous while chapter/presenter state changes on deliberate section boundaries or controlled chapter progress.

## H. Interaction model

Build six chapters that can be navigated by:
- Natural scrolling.
- Previous / next chapter controls.
- Direct chapter navigation (small, unobtrusive progress/navigation treatment).
- Keyboard navigation only when focus and accessibility make the action clear; do not hijack ordinary arrow keys while users are reading or typing.

The experience must:
- Keep scroll position and active chapter in sync.
- Support reverse scrolling.
- Avoid accidental rapid chapter skipping.
- Avoid wheel hijacking and forced autoplay.
- Provide clear active chapter indication.
- Keep navigation usable on touch devices.
- Preserve browser history/back behavior where appropriate.
- Avoid scroll-jacking.

The six sections should fit a 15–20 minute presentation. Do not make the viewer scroll through an excessively long page merely to reach the final chapter.

## I. Evidence and anti-hallucination rules — mandatory

Create a content source map, e.g. `content/evidence-map.md`, with columns:
- On-screen claim / data point.
- Exact source (file and page/section, interview note, or observation).
- Evidence type: observed / interview-reported / report-derived / external reference / illustrative assumption.
- Confidence or limitation.
- Where it appears in the presentation.

Strict rules:
- Never invent statistics, timings, costs, staff counts, order counts, demand patterns, queue lengths, customer ratings, or inventory data.
- Never turn a single server interview into a statement about every employee or every shift.
- Never present general textbook knowledge as a fact about this café.
- Label every simulated number **ILLUSTRATIVE SIMULATION — NOT MEASURED AT TRUE BLACK CAFÉ**.
- Label conceptual diagrams as conceptual if not directly observed.
- If a fact is not in the source, omit it or mark it as “not recorded in the field study”; do not guess.
- Keep recommendations traceable to an actual observation or clearly state they are general suggestions.
- Do not invent citations, interview quotes, page numbers, sources, or presenter assignments.
- Preserve the terminology and findings of the team's report. Do not silently rewrite the report's conclusions.

## J. Presenter and asset mapping

Create a single data configuration for all six sections. Suggested shape:

```ts
type EvidenceItem = {
  text: string;
  sourceId: string;
  evidenceType: "observed" | "interview" | "report" | "external" | "illustrative";
};

type PresentationSection = {
  id: string;
  title: string;
  presenterName?: string; // only when supported by team source
  presenterImage: string; // existing cutout path
  durationSeconds?: number; // only if team schedule provides it
  lead: string;
  points: EvidenceItem[];
  visualType: "process" | "flow" | "resource-map" | "quality" | "findings" | "conclusion";
};
```

Use actual project names and file paths once verified. Do not invent the six names. If presenter allocation is missing, use neutral labels such as “Presenter 1” in the development data and clearly flag it for replacement; do not guess which portrait belongs to whom.

Keep content separate from animation code. Do not hard-code six separate, duplicated components if a data-driven section renderer is appropriate.

## K. Engineering and performance

- Reuse the existing Phase 1 frame renderer and scroll controller.
- Keep presenter/content transitions independent from the frame loading cache.
- Use GSAP/ScrollTrigger if already used in Phase 1; do not add a second motion system.
- Use transforms and opacity for entrances/exits.
- Use `prefers-reduced-motion`.
- Clean up animation timelines and ScrollTriggers on unmount.
- Avoid layout shift and image reflow.
- Preload presenter images before their section becomes active.
- Do not preload every large image at once if it creates memory pressure.
- Avoid rendering hidden sections in ways that cause multiple presenters to overlap visually.
- Ensure only the active presenter is exposed to assistive technology.
- Keep text semantic and selectable.
- Avoid horizontal overflow on mobile.

## L. Visual quality bar

Reject the result if it looks like:
- Six repeated cards.
- A dashboard.
- A generic AI-generated presentation template.
- Six unrelated hero sections.
- A slideshow with abrupt cuts.
- A busy infographic with too many icons.
- An over-animated portfolio site.

The quality target is a restrained editorial presentation with a photographic presenter, precise typography, intentional negative space, a continuous coffee film, and evidence-led content.

## M. Acceptance tests

Verify:
1. Exactly six sections render in the correct source-supported order.
2. Each section maps to the correct presenter only when team allocation is confirmed.
3. Presenter entrances/exits are smooth and do not overlap incorrectly.
4. Content reveals in a deliberate stagger and remains readable.
5. Scrolling backward restores the previous presenter and content.
6. Direct chapter navigation updates the active state and visuals correctly.
7. Coffee frame scrubbing remains continuous and functional.
8. No fake facts, fabricated numbers, unsupported claims, or invented quotes appear.
9. Every factual claim has a source entry in the evidence map.
10. Missing sources or portraits are clearly reported.
11. Reduced-motion and mobile behavior work.
12. Build, typecheck, lint, and relevant tests pass where available.

At completion, report:
- The six section titles actually used.
- Presenter-to-section mapping and the source for that mapping.
- Which facts are observed, interview-reported, report-derived, external, or illustrative.
- Which source materials were unavailable.
- Files changed and tests actually run.
- Any remaining content/assets requiring the user's input.

Do not start a third phase. Finish and verify this six-section presenter/content experience only.
