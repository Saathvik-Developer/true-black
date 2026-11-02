'use client';

import React, { useEffect, useRef, useImperativeHandle, forwardRef, useCallback } from 'react';
import {
  FRAME_COUNT,
  FRAME_WIDTH,
  FRAME_HEIGHT,
  LRU_CACHE_CAPACITY,
  PRELOAD_AHEAD_WINDOW,
  PRELOAD_BEHIND_WINDOW,
  getFrameUrl,
  progressToFrameIndex,
} from './config';

export interface FrameSequenceHandle {
  setProgress: (progress: number) => void;
  preloadInitial: () => Promise<void>;
  destroy: () => void;
}

interface FrameSequenceProps {
  initialProgress?: number;
  className?: string;
  zoom?: number;
}

type DrawableFrame = ImageBitmap | HTMLImageElement;

export const FrameSequence = forwardRef<FrameSequenceHandle, FrameSequenceProps>(
  ({ initialProgress = 0, className = '', zoom = 1.36 }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    // State refs to keep callbacks performant without re-renders
    const cacheRef = useRef<Map<number, DrawableFrame>>(new Map());
    const inFlightRef = useRef<Map<number, Promise<DrawableFrame | null>>>(new Map());
    const currentFrameIndexRef = useRef<number>(progressToFrameIndex(initialProgress));
    const lastRenderedIndexRef = useRef<number | null>(null);
    const lastDirectionRef = useRef<number>(1);
    const rafIdRef = useRef<number | null>(null);
    const pendingProgressRef = useRef<number | null>(null);
    const isDestroyedRef = useRef<boolean>(false);
    const isIdleStreamStartedRef = useRef<boolean>(false);

    // Evict oldest entries when cache exceeds capacity
    const evictOldest = useCallback(() => {
      const cache = cacheRef.current;
      while (cache.size > LRU_CACHE_CAPACITY) {
        // First entry in Map is least recently used
        const oldestKey = cache.keys().next().value;
        if (oldestKey === undefined) break;

        // Never evict the currently displayed frame
        if (oldestKey === lastRenderedIndexRef.current) {
          const keys = Array.from(cache.keys());
          const candidate = keys.find((k) => k !== lastRenderedIndexRef.current);
          if (candidate !== undefined) {
            const item = cache.get(candidate);
            cache.delete(candidate);
            if (item && 'close' in item && typeof item.close === 'function') {
              try {
                item.close();
              } catch {}
            }
          }
          break;
        } else {
          const item = cache.get(oldestKey);
          cache.delete(oldestKey);
          if (item && 'close' in item && typeof item.close === 'function') {
            try {
              item.close();
            } catch {}
          }
        }
      }
    }, []);

    // Draw the specified frame onto the canvas with high-quality smoothing and expanded scale
    const drawFrame = useCallback(
      (frame: DrawableFrame, index: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const w = canvas.width;
        const h = canvas.height;
        if (w === 0 || h === 0) return;

        // Enable high-quality bicubic resampling for 4K clarity
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Expand/zoom to fill full-screen viewport and bring coffee transformation into cinematic focus
        const scale = Math.max(w / FRAME_WIDTH, h / FRAME_HEIGHT) * zoom;
        const renderW = FRAME_WIDTH * scale;
        const renderH = FRAME_HEIGHT * scale;
        const offsetX = (w - renderW) / 2;
        const offsetY = (h - renderH) / 2;

        ctx.drawImage(frame, offsetX, offsetY, renderW, renderH);
        lastRenderedIndexRef.current = index;
      },
      [zoom]
    );

    // Find closest loaded frame in cache to keep animation responsive during network fetches
    const getClosestCachedFrame = useCallback((target: number): { frame: DrawableFrame; index: number } | null => {
      const cache = cacheRef.current;
      if (cache.size === 0) return null;
      if (cache.has(target)) {
        return { frame: cache.get(target)!, index: target };
      }

      let closestIdx = -1;
      let minDiff = Infinity;
      for (const idx of cache.keys()) {
        const diff = Math.abs(idx - target);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      }

      if (closestIdx !== -1 && minDiff <= 32) {
        return { frame: cache.get(closestIdx)!, index: closestIdx };
      }
      return null;
    }, []);

    // Load a single frame via Image element, upgrading to ImageBitmap when possible
    const loadFrame = useCallback(
      (index: number): Promise<DrawableFrame | null> => {
        if (index < 0 || index >= FRAME_COUNT) return Promise.resolve(null);

        // Check cache (mark as recently accessed by re-inserting)
        const cache = cacheRef.current;
        if (cache.has(index)) {
          const item = cache.get(index)!;
          cache.delete(index);
          cache.set(index, item);
          return Promise.resolve(item);
        }

        // Check if already in-flight to prevent duplicate network calls
        const inFlight = inFlightRef.current;
        if (inFlight.has(index)) {
          return inFlight.get(index)!;
        }

        const url = getFrameUrl(index);
        const promise = new Promise<DrawableFrame | null>((resolve) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';

          img.onload = async () => {
            if (isDestroyedRef.current) {
              return resolve(null);
            }

            try {
              if (typeof window !== 'undefined' && 'createImageBitmap' in window) {
                const bitmap = await createImageBitmap(img);
                if (isDestroyedRef.current) {
                  try {
                    bitmap.close();
                  } catch {}
                  return resolve(null);
                }
                cache.set(index, bitmap);
                evictOldest();
                resolve(bitmap);
              } else {
                cache.set(index, img);
                evictOldest();
                resolve(img);
              }
            } catch {
              // Fallback to Image element if createImageBitmap is unavailable
              cache.set(index, img);
              evictOldest();
              resolve(img);
            }
          };

          img.onerror = (e) => {
            console.error(`Failed to load frame ${index} from ${url}`, e);
            resolve(null);
          };

          img.src = url;
        }).finally(() => {
          inFlight.delete(index);
        });

        inFlight.set(index, promise);
        return promise;
      },
      [evictOldest]
    );

    // Render loop triggered via rAF with closest-frame fallback
    const renderTargetFrame = useCallback(
      async (index: number) => {
        if (isDestroyedRef.current) return;

        const cache = cacheRef.current;
        if (cache.has(index)) {
          const frame = cache.get(index)!;
          cache.delete(index);
          cache.set(index, frame);
          drawFrame(frame, index);
        } else {
          // Immediately draw closest cached frame so the canvas never freezes while downloading
          const closest = getClosestCachedFrame(index);
          if (closest && (!lastRenderedIndexRef.current || Math.abs(closest.index - index) < Math.abs(lastRenderedIndexRef.current - index))) {
            drawFrame(closest.frame, closest.index);
          }

          // Fetch requested frame
          const frame = await loadFrame(index);
          if (frame && !isDestroyedRef.current) {
            const currentTarget = currentFrameIndexRef.current;
            const distToCurrent = Math.abs(currentTarget - index);
            const currentRenderedDist = lastRenderedIndexRef.current !== null
              ? Math.abs(currentTarget - lastRenderedIndexRef.current)
              : Infinity;

            // Draw if this newly loaded frame is closer to the current scroll target than what is currently rendered
            if (distToCurrent <= currentRenderedDist || distToCurrent <= 16) {
              drawFrame(frame, index);
            }
          }
        }

        // Direction-aware background preload window
        const direction = lastDirectionRef.current;
        if (direction >= 0) {
          for (let i = 1; i <= PRELOAD_AHEAD_WINDOW; i++) {
            const nextIdx = index + i;
            if (nextIdx < FRAME_COUNT && !cache.has(nextIdx)) {
              loadFrame(nextIdx);
            }
          }
          for (let i = 1; i <= PRELOAD_BEHIND_WINDOW; i++) {
            const prevIdx = index - i;
            if (prevIdx >= 0 && !cache.has(prevIdx)) {
              loadFrame(prevIdx);
            }
          }
        } else {
          for (let i = 1; i <= PRELOAD_AHEAD_WINDOW; i++) {
            const prevIdx = index - i;
            if (prevIdx >= 0 && !cache.has(prevIdx)) {
              loadFrame(prevIdx);
            }
          }
          for (let i = 1; i <= PRELOAD_BEHIND_WINDOW; i++) {
            const nextIdx = index + i;
            if (nextIdx < FRAME_COUNT && !cache.has(nextIdx)) {
              loadFrame(nextIdx);
            }
          }
        }
      },
      [drawFrame, getClosestCachedFrame, loadFrame]
    );

    // Progress update handler with rAF coalescing
    const setProgress = useCallback(
      (progress: number) => {
        pendingProgressRef.current = progress;

        if (rafIdRef.current !== null) {
          return; // Already scheduled
        }

        rafIdRef.current = requestAnimationFrame(() => {
          rafIdRef.current = null;
          if (pendingProgressRef.current === null || isDestroyedRef.current) return;

          const p = pendingProgressRef.current;
          pendingProgressRef.current = null;

          const targetIndex = progressToFrameIndex(p);
          if (targetIndex !== currentFrameIndexRef.current) {
            lastDirectionRef.current = targetIndex > currentFrameIndexRef.current ? 1 : -1;
            currentFrameIndexRef.current = targetIndex;
            renderTargetFrame(targetIndex);
          }
        });
      },
      [renderTargetFrame]
    );

    // Background progressive idle stream to pre-fill browser HTTP disk cache
    const startIdleStream = useCallback(() => {
      if (isIdleStreamStartedRef.current || typeof window === 'undefined') return;
      isIdleStreamStartedRef.current = true;

      let nextBatchStart = 41;
      const batchSize = 6;

      const streamNextBatch = () => {
        if (isDestroyedRef.current || nextBatchStart >= FRAME_COUNT) return;

        const end = Math.min(FRAME_COUNT, nextBatchStart + batchSize);
        for (let i = nextBatchStart; i < end; i++) {
          const img = new Image();
          img.src = getFrameUrl(i);
        }
        nextBatchStart = end;

        if (nextBatchStart < FRAME_COUNT) {
          if ('requestIdleCallback' in window) {
            (window as any).requestIdleCallback(streamNextBatch, { timeout: 600 });
          } else {
            setTimeout(streamNextBatch, 80);
          }
        }
      };

      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(streamNextBatch, { timeout: 1000 });
      } else {
        setTimeout(streamNextBatch, 300);
      }
    }, []);

    // Initial preload: loads Tier 1 hero frames (0..40) then triggers idle background stream
    const preloadInitial = useCallback(async () => {
      const initialIdx = progressToFrameIndex(initialProgress);
      const firstFrame = await loadFrame(initialIdx);
      if (firstFrame && !isDestroyedRef.current) {
        drawFrame(firstFrame, initialIdx);
      }

      // Preload immediate tier 1 hero frames (0..40)
      const tier1Promises: Promise<any>[] = [];
      for (let i = 1; i <= 40; i++) {
        const idx = initialIdx + i;
        if (idx < FRAME_COUNT) {
          tier1Promises.push(loadFrame(idx));
        }
      }
      await Promise.allSettled(tier1Promises);

      // Start idle streaming for all remaining frames
      startIdleStream();
    }, [initialProgress, loadFrame, drawFrame, startIdleStream]);

    // Cleanup resources
    const destroy = useCallback(() => {
      isDestroyedRef.current = true;
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      inFlightRef.current.clear();

      cacheRef.current.forEach((frame) => {
        if (frame && 'close' in frame && typeof frame.close === 'function') {
          try {
            frame.close();
          } catch {}
        }
      });
      cacheRef.current.clear();
    }, []);

    // Expose imperative handle
    useImperativeHandle(
      ref,
      () => ({
        setProgress,
        preloadInitial,
        destroy,
      }),
      [setProgress, preloadInitial, destroy]
    );

    // Handle Resize, 4K DPR backing resolution, and Lifecycle
    useEffect(() => {
      // Re-enable in case of React StrictMode remount
      isDestroyedRef.current = false;

      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const updateDimensions = () => {
        if (isDestroyedRef.current) return;
        const rect = container.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        // Native 4K / High-DPI backing resolution: supports up to full native DPR (up to 3x)
        const dpr = Math.max(window.devicePixelRatio || 1, 2);
        const targetWidth = Math.round(rect.width * dpr);
        const targetHeight = Math.round(rect.height * dpr);

        if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
          canvas.width = targetWidth;
          canvas.height = targetHeight;

          // Redraw or fetch current frame at new size
          const currentIdx = currentFrameIndexRef.current;
          const frame = cacheRef.current.get(currentIdx);
          if (frame) {
            drawFrame(frame, currentIdx);
          } else {
            loadFrame(currentIdx).then((f) => {
              if (f && !isDestroyedRef.current) {
                drawFrame(f, currentIdx);
              }
            });
          }
        }
      };

      updateDimensions();
      const resizeObserver = new ResizeObserver(updateDimensions);
      resizeObserver.observe(container);

      // Preload initial frames
      preloadInitial();

      return () => {
        resizeObserver.disconnect();
        destroy();
      };
    }, [drawFrame, preloadInitial, loadFrame, destroy]);

    return (
      <div
        ref={containerRef}
        className={`relative w-full h-full overflow-hidden bg-[#15120F] ${className}`}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          style={{
            imageRendering: '-webkit-optimize-contrast',
            filter: 'contrast(1.08) brightness(1.03) saturate(1.08)',
          }}
        />
      </div>
    );
  }
);

FrameSequence.displayName = 'FrameSequence';
