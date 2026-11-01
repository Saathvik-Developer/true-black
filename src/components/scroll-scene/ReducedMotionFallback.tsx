'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FRAME_COUNT, getFrameUrl } from './config';

export const ReducedMotionFallback: React.FC = () => {
  const [frameIndex, setFrameIndex] = useState(0);

  return (
    <section className="relative min-h-screen w-full bg-[#15120F] flex flex-col justify-between p-6 sm:p-12 md:p-16 text-[#F5F0E8]">
      {/* Background still / selected frame */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-60">
        <Image
          src={getFrameUrl(frameIndex)}
          alt={`True Black coffee transformation frame ${frameIndex + 1}`}
          fill
          priority
          sizes="100vw"
          className="object-contain object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#15120F] via-transparent to-[#15120F]/60" />
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center gap-3">
        <span className="h-2 w-2 rounded-full bg-[#B77A43]" />
        <span className="text-xs uppercase tracking-[0.3em] font-medium text-[#C8B49A]">
          True Black Café — Hyderabad
        </span>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-3xl my-auto">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#F5F0E8] leading-[0.95]">
          BEHIND EVERY CUP.
        </h1>
        <p className="mt-4 sm:mt-6 text-base sm:text-xl md:text-2xl text-[#E9DFD2] font-light tracking-wide max-w-xl leading-relaxed">
          Every cup has a journey. Every journey has an operation.
        </p>

        {/* Accessible manual step control for reduced motion */}
        <div className="mt-8 flex flex-col gap-2 max-w-xs">
          <label htmlFor="frame-stepper" className="text-xs font-mono text-[#C8B49A] uppercase tracking-wider">
            Explore frames (Reduced Motion): {frameIndex + 1} / {FRAME_COUNT}
          </label>
          <input
            id="frame-stepper"
            type="range"
            min={0}
            max={FRAME_COUNT - 1}
            value={frameIndex}
            onChange={(e) => setFrameIndex(Number(e.target.value))}
            className="w-full accent-[#B77A43] bg-[#292019] cursor-pointer"
          />
        </div>
      </div>

      {/* Footer info */}
      <div className="relative z-10 text-xs font-mono text-[#C8B49A]/60">
        Reduced motion active. Continuous scroll scrub disabled.
      </div>
    </section>
  );
};

