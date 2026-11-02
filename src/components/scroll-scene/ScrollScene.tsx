'use client';

import React, { useEffect, useRef, useState, useSyncExternalStore, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { FrameSequence, FrameSequenceHandle } from './FrameSequence';
import { IntroOverlay } from './IntroOverlay';
import { SceneProgress } from './SceneProgress';
import { ReducedMotionFallback } from './ReducedMotionFallback';
import { PresenterStage } from '../presenter/PresenterStage';
import { ContentPanel } from '../presenter/ContentPanel';
import { ChapterFlowNav } from '../presenter/ChapterFlowNav';
import { PresenterComparisonView } from '../presenter/PresenterComparisonView';
import { FieldNotesGallery } from '../gallery/FieldNotesGallery';
import { OperationsLab } from '../lab/OperationsLab';
import { CHAPTERS } from '@/data/chaptersData';
import { SCROLL_RUNWAY_PERCENT } from './config';

// Register GSAP plugins safely on client
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export const ScrollScene: React.FC = () => {
  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const [progress, setProgress] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showDevCompare, setShowDevCompare] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const frameSequenceRef = useRef<FrameSequenceHandle | null>(null);
  const updateRafRef = useRef<number | null>(null);

  // Eagerly preload and GPU-decode all presenters and field photos on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Preload all 6 presenters
    const presenterSrcs = [
      '/images/presenters/presenter1.png',
      '/images/presenters/presenter2.png',
      '/images/presenters/presenter3.png',
      '/images/presenters/presenter4.png',
      '/images/presenters/presenter5.png',
      '/images/presenters/presenter6.png',
    ];

    presenterSrcs.forEach((src) => {
      const img = new Image();
      img.src = src;
      if (img.decode) {
        img.decode().catch(() => {});
      }
    });

    // 2. Preload chapter field photos
    CHAPTERS.forEach((ch) => {
      if (ch.imageSrc) {
        const img = new Image();
        img.src = ch.imageSrc;
        if (img.decode) img.decode().catch(() => {});
      }
      if (ch.secondaryImageSrc) {
        const img = new Image();
        img.src = ch.secondaryImageSrc;
        if (img.decode) img.decode().catch(() => {});
      }
    });
  }, []);

  // Section Ranges in the continuous scroll timeline:
  // 0.00 - 0.06: Intro
  // 0.06 - 0.66: 6 Chapters
  // 0.66 - 0.82: Field Notes Photographic Gallery
  // 0.82 - 0.96: Operations Lab Simulation
  // 0.96 - 1.00: Conclusion Wrap-up
  const isGalleryActive = progress >= 0.66 && progress < 0.82;
  const isLabActive = progress >= 0.82 && progress < 0.96;

  // Determine current active section for navigation
  let currentSection: 'intro' | 'chapter' | 'gallery' | 'lab' = 'intro';
  if (progress < 0.06) {
    currentSection = 'intro';
  } else if (isGalleryActive) {
    currentSection = 'gallery';
  } else if (isLabActive) {
    currentSection = 'lab';
  } else {
    currentSection = 'chapter';
  }

  // Calculate current active chapter for navigation pills
  let activeChapterIndex = -1;
  for (let i = 0; i < CHAPTERS.length; i++) {
    const [start, end] = CHAPTERS[i].scrollRange;
    if (progress >= start - 0.02 && progress < end + 0.02) {
      activeChapterIndex = i;
      break;
    }
  }

  // Presenters and Content are active whenever chapters are in view (0.035 to 0.68)
  const isPresenterActive = progress >= 0.035 && progress < 0.68 && !isGalleryActive && !isLabActive;

  // Jump helper to smoothly scroll trigger container via GSAP's optimized ScrollToPlugin
  const scrollToNormalizedProgress = useCallback((targetProgress: number) => {
    const triggerEl = triggerRef.current;
    if (triggerEl && typeof window !== 'undefined') {
      const totalScroll = triggerEl.offsetHeight - window.innerHeight;
      const targetY = triggerEl.offsetTop + targetProgress * totalScroll;

      // GSAP silky-smooth ease with autoKill: true (hands control back instantly on manual wheel/touch)
      gsap.to(window, {
        scrollTo: { y: targetY, autoKill: true },
        duration: 0.8,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  }, []);

  // Jump to specific chapter progress - lands in the stable plateau (center of chapter) so presenter and content are at 100% full opacity
  const jumpToChapter = useCallback((index: number) => {
    if (index < 0 || index >= CHAPTERS.length) return;
    const [start, end] = CHAPTERS[index].scrollRange;
    const targetProgress = start + 0.5 * (end - start);
    scrollToNormalizedProgress(targetProgress);
  }, [scrollToNormalizedProgress]);

  // Jump to intro
  const jumpToIntro = useCallback(() => {
    scrollToNormalizedProgress(0);
  }, [scrollToNormalizedProgress]);

  // Jump to Gallery
  const jumpToGallery = useCallback(() => {
    scrollToNormalizedProgress(0.72);
  }, [scrollToNormalizedProgress]);

  // Jump to Lab
  const jumpToLab = useCallback(() => {
    scrollToNormalizedProgress(0.88);
  }, [scrollToNormalizedProgress]);

  // Fullscreen toggle handler
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      // Fullscreen
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      }

      // Dev Comparison View [D]
      if (e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        setShowDevCompare((prev) => !prev);
      }

      // Gallery shortcut [G]
      if (e.key === 'g' || e.key === 'G') {
        e.preventDefault();
        jumpToGallery();
      }

      // Lab shortcut [L]
      if (e.key === 'l' || e.key === 'L') {
        e.preventDefault();
        jumpToLab();
      }

      // Chapter keys 1 to 6
      if (e.key >= '1' && e.key <= '6') {
        e.preventDefault();
        const chIdx = parseInt(e.key, 10) - 1;
        jumpToChapter(chIdx);
      }

      // Key 0 jumps to intro
      if (e.key === '0') {
        e.preventDefault();
        jumpToIntro();
      }

      // Step arrows
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (progress < 0.06) {
          jumpToChapter(0);
        } else if (activeChapterIndex >= 0 && activeChapterIndex < CHAPTERS.length - 1) {
          jumpToChapter(activeChapterIndex + 1);
        } else if (activeChapterIndex === CHAPTERS.length - 1) {
          jumpToGallery();
        } else if (isGalleryActive) {
          jumpToLab();
        }
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (isLabActive) {
          jumpToGallery();
        } else if (isGalleryActive) {
          jumpToChapter(CHAPTERS.length - 1);
        } else if (activeChapterIndex > 0) {
          jumpToChapter(activeChapterIndex - 1);
        } else {
          jumpToIntro();
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    toggleFullscreen,
    jumpToChapter,
    jumpToIntro,
    jumpToGallery,
    jumpToLab,
    activeChapterIndex,
    isGalleryActive,
    isLabActive,
    progress,
  ]);

  // GSAP ScrollTrigger setup
  useEffect(() => {
    if (isReducedMotion) return;

    const triggerEl = triggerRef.current;
    const containerEl = containerRef.current;
    if (!triggerEl || !containerEl) return;

    const st = ScrollTrigger.create({
      trigger: triggerEl,
      start: 'top top',
      end: `+=${SCROLL_RUNWAY_PERCENT}%`,
      pin: containerEl,
      pinSpacing: true,
      scrub: 0.15, // Silky smooth micro-scrubbing with zero jitter
      anticipatePin: 1,
      onUpdate: (self) => {
        const currentProgress = self.progress;

        // Immediate direct canvas frame update (no React overhead)
        if (frameSequenceRef.current) {
          frameSequenceRef.current.setProgress(currentProgress);
        }

        // rAF-coalesced React state update prevents redundant VDOM diffing on high-frequency wheel ticks
        if (updateRafRef.current === null) {
          updateRafRef.current = requestAnimationFrame(() => {
            updateRafRef.current = null;
            setProgress((prev) => {
              if (Math.abs(prev - currentProgress) > 0.0003) {
                return currentProgress;
              }
              return prev;
            });
          });
        }
      },
    });

    return () => {
      st.kill();
      if (updateRafRef.current !== null) {
        cancelAnimationFrame(updateRafRef.current);
        updateRafRef.current = null;
      }
    };
  }, [isReducedMotion]);

  if (isReducedMotion) {
    return <ReducedMotionFallback />;
  }

  return (
    <div ref={triggerRef} className="relative w-full bg-[#15120F]">
      {/* Pinned Viewport Container */}
      <div
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden bg-[#15120F]"
      >
        {/* Layer 1: Canvas Frame Sequence Background (Phase 1, continuous 480 frames, untouched) */}
        <FrameSequence
          ref={frameSequenceRef}
          initialProgress={0}
          zoom={1.36}
          className="absolute inset-0 z-0"
        />

        {/* Subtle Vignette Backdrop */}
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#15120F]/65 via-transparent to-[#15120F]/35" />

        {/* Intro Hero Overlay (active when progress < 0.08) */}
        <IntroOverlay
          progress={progress}
          onStartPresentation={() => jumpToChapter(0)}
          onJumpToChapter={jumpToChapter}
          onOpenGallery={jumpToGallery}
          onOpenLab={jumpToLab}
        />

        {/* Layer 2: Presenter Cutout Stage (Left Column, ~40% width) with seamless cross-dissolve */}
        <PresenterStage
          globalProgress={progress}
          isVisible={isPresenterActive}
        />

        {/* Layer 3: Content Panel (Right Column, ~48% width) with eye-comfort seamless crossfade */}
        <ContentPanel
          globalProgress={progress}
          isVisible={isPresenterActive}
        />

        {/* Layer 4: Dedicated Field Notes Photographic Gallery */}
        <FieldNotesGallery
          isVisible={isGalleryActive}
          onClose={() => jumpToChapter(CHAPTERS.length - 1)}
        />

        {/* Layer 5: Operations Lab & Simulation Dashboard */}
        <OperationsLab
          isVisible={isLabActive}
          onClose={jumpToGallery}
        />

        {/* Layer 6: Chapter Flow Navigation (Pinned bottom, always accessible) */}
        <ChapterFlowNav
          activeChapterIndex={activeChapterIndex}
          currentSection={currentSection}
          onSelectChapter={jumpToChapter}
          onSelectGallery={jumpToGallery}
          onSelectLab={jumpToLab}
          isVisible={true}
        />

        {/* Minimal Fullscreen Controls without technical clutter */}
        <SceneProgress
          onToggleFullscreen={toggleFullscreen}
          isFullscreen={isFullscreen}
        />

        {/* Development Visual Verification Comparison View */}
        {showDevCompare && (
          <PresenterComparisonView onClose={() => setShowDevCompare(false)} />
        )}
      </div>
    </div>
  );
};
