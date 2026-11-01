# Scroll Animation Technical Specification
## True Black Café — Phase 1

### Goal

A pinned, scroll-controlled cinematic scene that scrubs a supplied 480-frame coffee transformation sequence. Scroll position is the timeline. There is no autonomous playback.

### Asset facts

| Property | Value |
|---|---:|
| Frame count | 480 |
| Frame dimensions | 1280 × 720 |
| Aspect ratio | 16:9 |
| Source cadence | 24 FPS |
| Format | WebP |
| First file | `frame-000001.webp` |
| Last file | `frame-000480.webp` |
| Manifest | `coffee-frame-manifest.json` |

### Mapping

Scroll progress is normalized to `[0, 1]`.

```ts
const index = Math.round(progress * 479);
const filename = `frame-${String(index + 1).padStart(6, "0")}.webp`;
```

Boundary conditions:
- `progress = 0` → `frame-000001.webp`
- `progress = 0.5` → approximately `frame-000241.webp`
- `progress = 1` → `frame-000480.webp`

Clamp progress before mapping. Do not use `480` as the maximum zero-based index.

### Scroll lifecycle

1. Before pinned region: scene remains at first frame.
2. Enter pinned region: progress begins at zero.
3. Within pinned region: progress follows scroll position.
4. At end: progress reaches one and last frame remains visible.
5. After pinned region: page continues normal scrolling.
6. Reverse scroll: progress reverses; frame sequence reverses.
7. Re-enter region: progress is recalculated from current scroll position.

### Rendering pipeline

Recommended separation:

- `ScrollScene`: owns pinning and normalized progress.
- `FrameSequence`: owns URL resolution, loading, decode, cache, and rendering.
- `IntroOverlay`: owns heading, subheading, and scroll cue.
- `SceneProgress`: subtle accessible progress indication.

The scroll callback should only calculate/set the latest progress. Frame rendering should be coalesced through `requestAnimationFrame`.

### Cache guidance

Use a small bounded cache, for example 20–40 decoded frames to start, and tune by measuring memory and scroll smoothness. Prioritize:
1. Current frame.
2. A few frames in the direction of travel.
3. A few frames behind the current frame.

Do not eagerly decode all 480. Avoid duplicate requests. Keep the last successfully drawn frame visible while the requested frame loads. If using `ImageBitmap`, close evicted bitmaps.

### Scroll runway

Start with a pinned runway around 300–500 viewport heights (e.g. `end: "+=400%"` in a ScrollTrigger setup), then test. The final distance should make the sequence controllable without making the user scroll an unreasonable distance. Do not add snap points or wheel hijacking by default.

### Canvas sizing

If using canvas:
- Set backing resolution with device pixel ratio, but cap DPR if memory/GPU pressure is high.
- Use `ResizeObserver` to update dimensions.
- Draw with a deliberate `cover` or `contain` calculation.
- Never distort 16:9 into the viewport ratio.
- Do not clear to transparent between frames if it causes visible flicker; keep the last frame until the next is ready.

### Fallback

If reduced motion is requested, do not pin the page for a long scrub. Render an appropriate still (preferably the first frame or a carefully chosen frame) and show all meaningful text. If assets fail, display a designed dark fallback and log a development-only warning.

### Acceptance criteria

- Bidirectional scrub is deterministic.
- Frame boundaries are correct.
- No autoplay.
- No blank flashes during normal use.
- No unbounded decoded-frame memory.
- No layout shift from frame loading.
- Pinning cleans up on unmount and resize.
- Keyboard and touch scrolling remain native.
- Reduced-motion behavior is provided.
