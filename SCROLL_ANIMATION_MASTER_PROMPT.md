# MASTER IMPLEMENTATION PROMPT — TRUE BLACK CAFÉ
## Phase 1: Cinematic, scroll-controlled coffee transformation

You are a senior creative developer, motion designer, and frontend performance engineer. Implement **only Phase 1: the scroll-based coffee transformation experience** for the True Black Café Operations Management presentation website.

This is not a generic scrolling landing page. It is a presenter-controlled, cinematic storytelling sequence in which the user's scroll position scrubs a supplied 20-second coffee transformation frame sequence. The motion must feel continuous, deliberate, premium, and presentation-ready.

## 1. First inspect; do not assume

Before changing code:

1. Inspect the existing repository, package manager, framework, routing, components, styling conventions, and current app entry point.
2. Read the project's `design.md` (if present) as the visual rulebook. Also inspect relevant `AGENTS.md`, `README.md`, `PROJECT.md`, `CONSTITUTION.md`, `AI_CONTEXT.md`, or other project instructions if present.
3. Inspect the supplied coffee frame assets and manifest. The source sequence contains **480 WebP frames**, 1280×720, captured at 24 FPS, representing a continuous coffee transformation.
4. Identify existing dependencies before installing anything. Reuse the existing stack and conventions. Do not replace the framework or restructure unrelated parts of the app.
5. Report a short implementation plan, then implement. Do not stop after giving advice.

If an asset path differs from the expected path below, locate the real files and adapt the implementation. Do not silently substitute a video, stock images, or generated frames.

## 2. Scope — what to build now

Build the first working section of the website:

- A full-viewport cinematic hero/scroll scene.
- A continuous coffee transformation background controlled by scroll position.
- Smooth forward and reverse scrubbing.
- A restrained editorial title and supporting line.
- A clear invitation to scroll / begin.
- A small, unobtrusive progress indicator.
- A pinned scroll region that gives the frame sequence enough scroll distance to play from first frame to last frame.
- Responsive behavior and reduced-motion fallback.
- A clean integration boundary so later phases can add presenter cutouts, chapter content, chapter navigation, and presenter handoffs without rebuilding the frame engine.

Do **not** build the full Operations Management presentation, presenter biographies, chapter content, Operations Lab, forms, dashboard, or unrelated pages in this phase. Do not invent presenter names or academic claims.

## 3. Asset contract

Expected public asset structure:

```text
public/
└── coffee-frames/
    ├── coffee-frame-manifest.json
    ├── frame-000001.webp
    ├── frame-000002.webp
    ├── ...
    └── frame-000480.webp
```

The user may have extracted four ZIP parts into the same directory. Verify that the final directory contains one uninterrupted sequence numbered 000001 through 000480. Do not create duplicate nested folders such as `part-1/`, `part-2/`, etc. unless the actual assets are structured that way; if so, normalize the asset path or create a manifest mapping.

Use the manifest as the source of truth if it contains filenames and timing. If the manifest is absent or malformed, use the verified sequential naming convention. Validate first, last, and several intermediate frame URLs. Never assume a successful fetch merely because a path string was constructed.

## 4. Core motion behavior

### Scroll-to-frame mapping

- Scroll down: move from frame 1 toward frame 480.
- Scroll up: reverse smoothly toward frame 1.
- The frame displayed must always correspond to the current normalized scroll progress.
- At the top boundary, hold frame 1.
- At the bottom boundary, hold frame 480.
- No autoplay. No timer-driven playback. No automatic progression when the user is idle.
- Do not use a conventional `<video>` element's `currentTime` as the primary implementation. The supplied WebP sequence is the primary source.
- Do not use CSS background-position sprite tricks that require combining the individual WebPs into a sprite sheet.
- Use a single canvas or a single image presentation surface. Prefer canvas if it provides reliable frame drawing and avoids layout shifts; otherwise use one `<img>` with carefully managed decoding and loading.
- Use `requestAnimationFrame` to coalesce scroll updates and avoid drawing multiple frames in one browser paint.
- Clamp progress and frame indices. Avoid off-by-one errors.

Reference mapping:

```ts
const FRAME_COUNT = 480;

function progressToFrame(progress: number) {
  const clamped = Math.max(0, Math.min(1, progress));
  return Math.round(clamped * (FRAME_COUNT - 1)); // zero-based: 0..479
}
```

The implementation must map zero-based index 0 to `frame-000001.webp` and index 479 to `frame-000480.webp`.

### Scroll architecture

Use the motion library already present in the project. If GSAP is already installed, use GSAP ScrollTrigger. If no motion library exists, prefer a minimal native scroll-progress implementation rather than adding a large dependency without need. Do not add both GSAP and Framer Motion for the same job.

The pinned scene should:
- Occupy the viewport while the sequence is being scrubbed.
- Have a deliberate scroll runway, initially around 300–500vh, tuned by testing.
- Start at progress 0 and end at progress 1.
- Support reverse scrolling.
- Avoid snapping unless the existing product direction explicitly requires it.
- Avoid hijacking the wheel or touch input.
- Keep normal document scrolling before and after the pinned region.
- Avoid nested scroll containers for the main scene.
- Clean up all listeners, observers, animation frames, and ScrollTriggers on unmount.

Do not let the page become stuck. Test entering the scene, leaving it, scrolling back into it, and resizing while it is active.

## 5. Visual direction

Follow `design.md` if present. The established direction is:

- Premium, minimal, cinematic, warm, editorial.
- A dark espresso environment with restrained warm cream / caramel accents.
- The coffee transformation is the visual hero; UI should not compete with it.
- Strong typography hierarchy, generous negative space, precise alignment.
- One focal point per moment.
- Avoid generic gradient blobs, glassmorphism, dashboard cards, excessive labels, decorative icons, random borders, and repetitive template sections.
- Use no more than two type families unless the project's design system already defines otherwise.
- Use the project's existing fonts and tokens when available. Do not download random fonts without checking.
- Keep text legible over the moving background with subtle contrast treatment only where needed. Do not cover the central coffee action with a heavy opaque panel.
- Use the visual frame sequence as supplied; do not recolor or distort individual frames.

Suggested palette only if the repository has no established tokens:
- espresso: `#17120F`
- deep coffee: `#292019`
- warm cream: `#F0E8DB`
- muted beige: `#C8B49A`
- caramel accent: `#B77A43`
- soft text: `#E9DFD2`

### Composition

The video source is 16:9 (1280×720). Preserve its aspect ratio. Fill the viewport elegantly without stretching. If using `object-fit: cover` or canvas crop, ensure the important transformation remains visible across common desktop and mobile aspect ratios. Use a neutral dark backing color behind letterboxed areas if `contain` is more faithful.

Do not assume the center of every frame is the only important region. Inspect the contact sheet and actual frames before deciding crop, focal point, overlays, and text placement.

## 6. Intro content

Create a restrained opening overlay. Use this exact core concept unless existing project content supersedes it:

**BEHIND EVERY CUP**

“Every cup has a journey. Every journey has an operation.”

The title should be visible at the opening frame and should not obstruct the bean/coffee transformation. Keep supporting copy brief. Include a subtle “Scroll to explore” cue that disappears or becomes less prominent once the user begins scrolling. Do not use an animated bouncing arrow.

The intro overlay should remain readable and should transition out through restrained opacity/position changes tied to scroll progress. Do not use a fade-to-black between frames or scenes.

## 7. Frame loading and performance — critical

480 individual 1280×720 images can consume substantial memory. Do not eagerly decode all 480 images at once.

Implement a robust progressive loader:
- Load and decode the first frame immediately.
- Preload a small initial window around the current frame.
- As progress advances, progressively load frames ahead of the current frame.
- When scrolling backward, ensure nearby previous frames are available too.
- Use a bounded cache / LRU strategy or another measured memory strategy.
- Avoid unbounded `new Image()` allocation and retaining every decoded bitmap forever.
- If using `createImageBitmap`, close evicted bitmaps with `.close()`.
- If using `Image.decode()`, keep cache size bounded and release references when appropriate.
- Prioritize the current requested frame. If it is not loaded yet, keep the last valid frame visible rather than flashing blank.
- Do not draw a blank canvas during frame changes.
- Avoid requesting the same URL repeatedly.
- Add a graceful loading state that matches the visual direction.
- Do not show a giant percentage/loading dashboard.

Use `loading="eager"` only for the initial visible asset if using an image element. Consider `fetchpriority="high"` for the first frame where supported. Do not set every frame to high priority.

The frame engine should expose a clean API, for example:

```ts
type FrameSequenceController = {
  setProgress(progress: number): void;
  preloadInitial(): Promise<void>;
  destroy(): void;
};
```

The exact implementation may differ, but keep scroll logic separate from frame loading/rendering.

## 8. Responsive and accessibility requirements

- Desktop: preserve the cinematic 16:9 composition and generous typography.
- Tablet: scale typography and overlays without crowding the visual.
- Mobile: test portrait layout carefully. Keep the coffee action visible; do not simply shrink desktop typography.
- Ensure there is no horizontal overflow.
- Respect `prefers-reduced-motion`. For reduced motion, do not force the long pinned scrub experience. Show a representative still frame (or a simple user-controlled reduced sequence) and keep the intro content accessible.
- Keep semantic heading structure.
- Ensure text contrast is sufficient.
- Do not make scroll the only way to understand the opening message.
- Keyboard users must be able to reach the page content and any controls.
- Do not hijack keyboard or wheel events.

## 9. Code quality and integration

- Follow existing naming, linting, formatting, and TypeScript conventions.
- Keep components focused: scene/pin wrapper, frame renderer/loader, intro overlay, progress indicator.
- Keep frame count, asset base path, and scroll distance in one well-named configuration location.
- Avoid a monolithic page component.
- Avoid hard-coded DOM queries if refs are available.
- Do not use global mutable state unnecessarily.
- Avoid adding dependencies unless justified.
- Handle missing frames with a useful development warning and a graceful visual fallback.
- Make sure no console errors, React key warnings, hydration mismatches, or broken image requests remain.
- Do not break existing routes or unrelated site functionality.

## 10. Visual and functional verification

After implementation, run the project's available checks (build, typecheck, lint, tests). Fix errors caused by your changes.

Manually verify:
1. Initial load displays frame 1 without a blank flash.
2. Scrolling down advances through the transformation smoothly.
3. Scrolling up reverses the transformation smoothly.
4. Reaching the end displays frame 480.
5. Returning to the top displays frame 1.
6. Fast scroll does not permanently skip into a blank state.
7. Slow scroll does not stutter excessively.
8. The image does not stretch, flicker, or jump in size.
9. Resizing during the pinned section works.
10. Leaving and re-entering the scene works.
11. Mobile portrait has no horizontal overflow.
12. Reduced-motion mode is usable.
13. The browser console and network panel show no missing frame assets or repeated uncontrolled downloads.

If a browser automation tool is available, use it to test the actual page at desktop and mobile viewport sizes. Do not claim tests passed unless they were actually run.

## 11. Deliverables

At the end:
- Provide the files/components created or changed.
- Explain the frame loading strategy and scroll-progress mapping briefly.
- State which checks were actually run and their results.
- List any remaining blockers, especially missing or incorrectly extracted frame assets.
- Do not proceed into the later presenter/chapter build. Stop when this first scroll-driven cinematic scene is working reliably.
