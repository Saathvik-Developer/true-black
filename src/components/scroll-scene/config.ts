/**
 * Configuration constants for the True Black Coffee Transformation Scroll Scene
 * Reference: SCROLL_ANIMATION_TECHNICAL_SPEC.md
 */

export const FRAME_COUNT = 480;
export const FRAME_BASE_PATH = '/coffee-frames';
export const FRAME_WIDTH = 1280;
export const FRAME_HEIGHT = 720;
export const FRAME_ASPECT_RATIO = 16 / 9;

// Pinned scroll runway for Phase 1 + Phase 2 (950vh allows comfortable pacing for all 6 chapters + Gallery + Lab)
export const SCROLL_RUNWAY_PERCENT = 950;

// Expanded LRU cache limit for decoded ImageBitmaps in memory (smooth 60fps scrub without thrashing)
export const LRU_CACHE_CAPACITY = 180;

// How many frames to preload ahead in the direction of travel
export const PRELOAD_AHEAD_WINDOW = 32;
// How many frames to keep/preload behind
export const PRELOAD_BEHIND_WINDOW = 16;

/**
 * Maps a 0-based frame index (0..479) to its padded filename URL.
 */
export function getFrameUrl(index: number): string {
  const frameNumber = Math.max(1, Math.min(FRAME_COUNT, index + 1));
  const padded = String(frameNumber).padStart(6, '0');
  return `${FRAME_BASE_PATH}/frame-${padded}.webp`;
}

/**
 * Converts normalized scroll progress [0, 1] to zero-based frame index [0..479].
 */
export function progressToFrameIndex(progress: number): number {
  const clamped = Math.max(0, Math.min(1, progress));
  return Math.round(clamped * (FRAME_COUNT - 1));
}

