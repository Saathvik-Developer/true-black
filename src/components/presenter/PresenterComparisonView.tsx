'use client';

import React from 'react';
import Image from 'next/image';
import { PRESENTER_CONFIGS } from '@/data/presenterConfig';

interface PresenterComparisonViewProps {
  onClose: () => void;
}

export const PresenterComparisonView: React.FC<PresenterComparisonViewProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#15120F]/95 backdrop-blur-xl flex flex-col p-6 overflow-y-auto select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#292019] pb-4 mb-4">
        <div>
          <h2 className="text-xl font-bold text-[#F5F0E8] tracking-tight">
            Presenter Calibration Stage Comparison (Dev View)
          </h2>
          <p className="text-xs text-[#C8B49A] mt-0.5">
            Verifying head height, eye level, shoulder width, and bottom baseline alignment across all 6 calibrated presenters.
          </p>
        </div>
        <button
          onClick={onClose}
          className="px-3 py-1.5 rounded-lg bg-[#292019] hover:bg-[#B77A43] hover:text-[#15120F] text-[#F5F0E8] text-xs font-mono transition-colors cursor-pointer"
        >
          Close [Esc / D]
        </button>
      </div>

      {/* Guide Lines Legend */}
      <div className="flex items-center gap-6 text-[11px] font-mono mb-4 px-2">
        <span className="flex items-center gap-2 text-rose-400">
          <span className="w-4 h-[2px] bg-rose-400 border-dashed" /> Target Head Height
        </span>
        <span className="flex items-center gap-2 text-sky-400">
          <span className="w-4 h-[2px] bg-sky-400 border-dashed" /> Eye Level
        </span>
        <span className="flex items-center gap-2 text-amber-400">
          <span className="w-4 h-[2px] bg-amber-400 border-dashed" /> Shoulder Alignment
        </span>
        <span className="flex items-center gap-2 text-emerald-400">
          <span className="w-4 h-[2px] bg-emerald-400" /> Bottom Baseline
        </span>
      </div>

      {/* 6 Identical Stages Side-by-Side */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 flex-1 min-h-[500px]">
        {[0, 1, 2, 3, 4, 5].map((idx) => {
          const config = PRESENTER_CONFIGS[idx];
          return (
            <div
              key={idx}
              className="relative flex flex-col bg-[#1a1410] border border-[#292019] rounded-xl p-2.5 overflow-hidden shadow-lg"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-[#B77A43] mb-2 border-b border-[#292019]/60 pb-1">
                <span>0{idx + 1}</span>
                <span className="text-[#C8B49A]">{config.framingType}</span>
                <span className="text-[#F5F0E8] font-bold">{config.scale}x</span>
              </div>

              {/* Shared Stage Mockup with Guide Lines */}
              <div className="relative flex-1 w-full h-[460px] overflow-hidden flex items-end justify-center bg-[#15120F] border border-dashed border-[#292019] rounded-lg">
                {/* Horizontal Alignment Guides */}
                <div className="absolute top-[18%] left-0 right-0 h-[1px] bg-rose-500/50 border-t border-dashed border-rose-400 z-20 pointer-events-none" />
                <div className="absolute top-[28%] left-0 right-0 h-[1px] bg-sky-500/50 border-t border-dashed border-sky-400 z-20 pointer-events-none" />
                <div className="absolute top-[42%] left-0 right-0 h-[1px] bg-amber-500/50 border-t border-dashed border-amber-400 z-20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-500/70 z-20 pointer-events-none" />

                {/* Presenter Cutout with Per-Presenter Calibration */}
                <div
                  className="relative w-full h-full flex items-end justify-center origin-bottom transition-transform duration-150"
                  style={{
                    transform: `translateX(${config.horizontalOffset}px) translateY(${config.verticalOffset}px) scale(${config.scale})`,
                    maxHeight: config.maxHeight,
                  }}
                >
                  <Image
                    src={config.src}
                    alt={config.name}
                    fill
                    sizes="200px"
                    className="object-contain object-bottom"
                    style={{ objectPosition: config.objectPosition }}
                  />
                </div>
              </div>

              <div className="mt-2 text-[10px] font-mono text-[#C8B49A]/80 text-center">
                Offset: {config.horizontalOffset}px / {config.verticalOffset}px
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

