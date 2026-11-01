'use client';

import React from 'react';
import Image from 'next/image';
import { CHAPTERS, getChapterOpacity } from '@/data/chaptersData';
import { PRESENTER_CONFIGS, PresenterImageConfig } from '@/data/presenterConfig';

interface PresenterStageProps {
  globalProgress: number;
  isVisible: boolean;
}

export const PresenterStage: React.FC<PresenterStageProps> = ({
  globalProgress,
  isVisible,
}) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="pointer-events-none absolute bottom-0 left-0 z-10 w-full sm:w-[46%] md:w-[44%] lg:w-[42%] xl:w-[40%] h-[78vh] sm:h-[88vh] lg:h-[94vh] max-h-[1050px] flex items-end justify-start pl-4 sm:pl-8 md:pl-12 lg:pl-16 select-none overflow-visible"
      aria-hidden={!isVisible}
    >
      {/* Ambient grounding glow beneath presenter */}
      <div className="absolute bottom-0 left-12 w-72 h-36 bg-black/80 blur-3xl pointer-events-none -z-1" />

      {/* Shared Presenter Stage Container - coordinates remain 100% fixed, stable & eye-comfort aligned */}
      <div className="relative w-full h-full flex items-end justify-center origin-bottom">
        {CHAPTERS.map((chapter, i) => {
          const opacity = getChapterOpacity(globalProgress, i);
          if (opacity <= 0.005) return null;

          const config: PresenterImageConfig = PRESENTER_CONFIGS[i] || {
            id: `presenter-${i + 1}`,
            name: `Presenter ${i + 1}`,
            src: chapter.presenterImage,
            scale: 1.0,
            objectPosition: 'bottom center',
            objectFit: 'contain',
            horizontalOffset: 0,
            verticalOffset: 0,
            maxHeight: '100%',
            framingType: 'waist-up',
          };

          return (
            <div
              key={chapter.id}
              className="absolute inset-0 flex items-end justify-center pointer-events-none"
              style={{
                opacity,
                filter:
                  'drop-shadow(0 30px 45px rgba(0, 0, 0, 0.92)) drop-shadow(0 6px 18px rgba(0, 0, 0, 0.7))',
              }}
            >
              <Image
                src={config.src}
                alt={`Presenter for ${chapter.title}`}
                fill
                priority
                unoptimized
                sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 44vw"
                className="object-contain object-bottom object-left sm:object-center"
                style={{ objectPosition: config.objectPosition }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
