'use client';

import React from 'react';
import { CHAPTERS } from '@/data/chaptersData';

interface ChapterFlowNavProps {
  activeChapterIndex: number;
  currentSection: 'intro' | 'chapter' | 'gallery' | 'lab';
  onSelectChapter: (index: number) => void;
  onSelectGallery: () => void;
  onSelectLab: () => void;
  isVisible: boolean;
}

export const ChapterFlowNav: React.FC<ChapterFlowNavProps> = ({
  activeChapterIndex,
  currentSection,
  onSelectChapter,
  onSelectGallery,
  onSelectLab,
  isVisible,
}) => {
  if (!isVisible) return null;

  return (
    <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 select-none pointer-events-auto max-w-[95vw] overflow-x-auto px-2 py-1 scrollbar-none">
      <div className="flex items-center gap-1 sm:gap-1.5 bg-[#17100C]/96 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[rgba(214,154,89,0.22)] shadow-[0_16px_36px_rgba(0,0,0,0.7)]">
        {/* 6 Presentation Chapters */}
        {CHAPTERS.map((chapter, idx) => {
          const isActive = currentSection === 'chapter' && idx === activeChapterIndex;
          return (
            <button
              key={chapter.id}
              onClick={() => onSelectChapter(idx)}
              className={`flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#D69A59] text-[#100B08] font-bold shadow-sm scale-105'
                  : 'text-[#A9957E] hover:text-[#F5EEE4] hover:bg-[#211710]'
              }`}
              title={`Jump to ${chapter.number} ${chapter.title}`}
            >
              <span className="tabular-nums">{chapter.number}</span>
              <span className="hidden lg:inline text-[11px] font-sans font-medium">
                {chapter.title}
              </span>
            </button>
          );
        })}

        <div className="h-3 w-[1px] bg-[rgba(214,154,89,0.2)] mx-0.5" />

        {/* Field Notes Gallery Button */}
        <button
          onClick={onSelectGallery}
          className={`px-2.5 py-1 rounded-full text-[11px] font-mono transition-all duration-200 cursor-pointer ${
            currentSection === 'gallery'
              ? 'bg-[#D69A59] text-[#100B08] font-bold shadow-sm scale-105'
              : 'text-[#A9957E] hover:text-[#F5EEE4] hover:bg-[#211710]'
          }`}
          title="Open Field Notes Photo Gallery"
        >
          Gallery
        </button>

        {/* Operations Lab Button */}
        <button
          onClick={onSelectLab}
          className={`px-2.5 py-1 rounded-full text-[11px] font-mono transition-all duration-200 cursor-pointer ${
            currentSection === 'lab'
              ? 'bg-[#D69A59] text-[#100B08] font-bold shadow-sm scale-105'
              : 'text-[#D69A59]/80 hover:text-[#D69A59] hover:bg-[#211710]'
          }`}
          title="Open Operations Lab Simulator"
        >
          Ops Lab
        </button>
      </div>
    </div>
  );
};
