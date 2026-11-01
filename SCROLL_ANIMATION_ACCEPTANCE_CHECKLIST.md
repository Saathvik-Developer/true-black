# Scroll Animation Acceptance Checklist

Use this checklist before declaring Phase 1 complete.

## Assets
- [ ] 480 WebP frames are present.
- [ ] Filenames are sequential from `frame-000001.webp` to `frame-000480.webp`.
- [ ] Manifest parses successfully.
- [ ] First, middle, and last frames load.
- [ ] No 404 frame requests.

## Motion
- [ ] No autoplay or time-based playback.
- [ ] Scroll down advances frames.
- [ ] Scroll up reverses frames.
- [ ] First and last frame boundaries are exact.
- [ ] Progress is clamped to 0–1.
- [ ] Fast scrolling does not create a blank screen.
- [ ] Re-entering the pinned region works.
- [ ] Normal page scrolling resumes after the scene.
- [ ] No wheel/touch hijacking.
- [ ] No unwanted snapping.

## Rendering and performance
- [ ] Frame rendering is coalesced with `requestAnimationFrame`.
- [ ] Frames are loaded progressively.
- [ ] Decoded-frame cache is bounded.
- [ ] Current frame has priority.
- [ ] Last valid frame remains visible while next frame loads.
- [ ] No image stretching or layout shift.
- [ ] Resize handling works.
- [ ] No unbounded event listeners, observers, or animation loops.

## Visual
- [ ] Follows project `design.md`.
- [ ] Coffee transformation remains the visual focal point.
- [ ] “BEHIND EVERY CUP” is readable.
- [ ] Supporting line is readable.
- [ ] Text does not obscure the main coffee action.
- [ ] No generic dashboard/card UI.
- [ ] No fade-to-black or artificial cuts.
- [ ] Mobile crop preserves the important visual.

## Accessibility and responsive
- [ ] Reduced-motion fallback exists.
- [ ] Semantic heading structure.
- [ ] Text contrast is sufficient.
- [ ] Keyboard and native touch scrolling work.
- [ ] No horizontal overflow on mobile.

## Verification
- [ ] Build passes.
- [ ] Typecheck passes (if available).
- [ ] Lint passes (if available).
- [ ] Browser console has no relevant errors.
- [ ] Desktop viewport tested.
- [ ] Mobile viewport tested.
- [ ] Actual test results are reported accurately.
