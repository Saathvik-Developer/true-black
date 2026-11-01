# True Black Café — Scroll Animation Docs

This package contains the implementation brief and supporting specifications for **Phase 1 only**: the cinematic scroll-controlled coffee transformation.

## Files

- `SCROLL_ANIMATION_MASTER_PROMPT.md` — paste this into Cursor / Claude Code / your coding agent. It directs the agent to inspect the repository, implement the scene, and verify it.
- `SCROLL_ANIMATION_TECHNICAL_SPEC.md` — exact frame mapping, scroll lifecycle, rendering, caching, and fallback requirements.
- `FRAME_ASSET_SETUP.md` — where to place the four ZIP parts, expected filenames, and verification steps.
- `SCROLL_ANIMATION_ACCEPTANCE_CHECKLIST.md` — completion criteria.

## Recommended order

1. Extract all four frame ZIP parts into `public/coffee-frames/`.
2. Copy `coffee-frame-manifest.json` into that folder.
3. Verify there are 480 frame files.
4. Give your coding agent `SCROLL_ANIMATION_MASTER_PROMPT.md` and ask it to read the other three supporting files.
5. Ask it to stop after Phase 1 is working. Presenter overlays and chapter storytelling are later phases.

The project’s own `design.md` and `AGENTS.md` (if present) remain authoritative. These documents are scoped only to the scroll animation and do not replace the project's overall design or engineering rules.
