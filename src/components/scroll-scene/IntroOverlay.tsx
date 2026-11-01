'use client';

import React from 'react';

interface IntroOverlayProps {
  progress: number;
  onStartPresentation: () => void;
  onJumpToChapter: (index: number) => void;
  onOpenGallery?: () => void;
  onOpenLab?: () => void;
}

export const IntroOverlay: React.FC<IntroOverlayProps> = ({
  progress,
  onStartPresentation,
  onJumpToChapter,
  onOpenGallery,
  onOpenLab,
}) => {
// Fade out smoothly between progress 0.02 and 0.06, providing a seamless blend into Chapter 1
  const t = Math.max(0, Math.min(1, (progress - 0.02) / 0.04));
  const textOpacity = progress < 0.02 ? 1 : 0.5 + 0.5 * Math.cos(Math.PI * t);
  const textTranslateY = Math.round(progress * -40);

  if (progress >= 0.065 || textOpacity <= 0) {
    return null;
  }

  return (
    <div
      className="absolute inset-0 z-20 flex flex-col justify-between p-4 sm:p-8 md:p-12 lg:p-16 select-none pointer-events-none"
      style={{
        opacity: textOpacity,
        transform: `translateY(${textTranslateY}px)`,
        transition: 'opacity 0.1s linear',
      }}
      aria-hidden={textOpacity === 0}
    >
      {/* Top Brand Bar with True Black Coffee Cup Logo */}
      <div className="flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-2.5">
          {/* Stylized Coffee Cup Icon */}
          <div className="w-8 h-8 rounded-lg bg-[#211710] border border-[rgba(214,154,89,0.25)] flex items-center justify-center text-[#D69A59] shadow-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 1v3M10 1v3M14 1v3" />
            </svg>
          </div>
          <div>
            <span className="font-mono text-xs sm:text-sm font-black tracking-[0.25em] text-[#F5EEE4] uppercase block">
              TRUE BLACK CAFÉ
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-[#D69A59] uppercase block">
              Hyderabad
            </span>
          </div>
        </div>

        {/* Quick Access Badges */}
        <div className="hidden sm:flex items-center gap-2">
          {onOpenGallery && (
            <button
              onClick={onOpenGallery}
              className="px-3 py-1 rounded-full bg-[#17100C]/90 hover:bg-[#D69A59] hover:text-[#100B08] text-xs font-mono text-[#A9957E] border border-[rgba(214,154,89,0.2)] transition-all cursor-pointer shadow-sm"
            >
              Field Photo Gallery
            </button>
          )}
          {onOpenLab && (
            <button
              onClick={onOpenLab}
              className="px-3 py-1 rounded-full bg-[#17100C]/90 hover:bg-[#D69A59] hover:text-[#100B08] text-xs font-mono text-[#A9957E] border border-[rgba(214,154,89,0.2)] transition-all cursor-pointer shadow-sm"
            >
              Operations Lab
            </button>
          )}
        </div>
      </div>

      {/* Main Title & Interactive CTA */}
      <div className="max-w-2xl my-auto">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#F5EEE4] leading-[0.95] drop-shadow-2xl uppercase">
          BEHIND EVERY CUP.
        </h1>
        <p className="mt-3 sm:mt-5 text-sm sm:text-lg md:text-xl text-[#E7D9C8] font-normal tracking-wide max-w-xl leading-relaxed drop-shadow">
          An Operations Management Study at True Black Café.
        </p>
        <p className="mt-1 text-xs sm:text-sm text-[#CDBBA5] font-light max-w-lg leading-relaxed">
          Every cup has a journey. Every journey has an operation. Exploring the IPO model, 4Vs, Slack&apos;s objectives, cellular bar layouts, and operational strategy.
        </p>

        {/* Interactive "Start Presentation" Button */}
        <div className="mt-6 flex flex-wrap items-center gap-3 pointer-events-auto">
          <button
            onClick={onStartPresentation}
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#D69A59] hover:bg-[#b9783d] text-[#100B08] font-mono text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span>Begin Presentation</span>
          </button>
        </div>

        {/* Chapter Quick Jump Pills */}
        <div className="mt-5 flex flex-wrap gap-1.5 pointer-events-auto">
          {[
            { num: '01', title: 'Origin & IPO' },
            { num: '02', title: '4Vs of Operations' },
            { num: '03', title: 'Performance' },
            { num: '04', title: 'Cellular Layout' },
            { num: '05', title: 'Strategy' },
            { num: '06', title: 'Recommendations' },
          ].map((item, idx) => (
            <button
              key={item.num}
              onClick={() => onJumpToChapter(idx)}
              className="px-2.5 py-1 rounded bg-[#211710] hover:bg-[#D69A59] hover:text-[#100B08] text-[10px] sm:text-[11px] font-mono text-[#CDBBA5] border border-[rgba(214,154,89,0.18)] transition-all cursor-pointer shadow-sm"
            >
              <span className="font-bold text-[#D69A59] mr-1 group-hover:text-[#100B08] tabular-nums">{item.num}</span>
              {item.title}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="flex items-center gap-3 text-[#A9957E] pointer-events-auto">
        <div className="w-5 h-8 rounded-full border-2 border-[rgba(214,154,89,0.4)] flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-[#D69A59] animate-bounce" />
        </div>
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-mono">
          Scroll to explore presentation
        </span>
      </div>
    </div>
  );
};
