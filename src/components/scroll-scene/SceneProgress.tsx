'use client';

import React from 'react';

interface SceneProgressProps {
  progress?: number;
  onToggleFullscreen?: () => void;
  isFullscreen?: boolean;
}

export const SceneProgress: React.FC<SceneProgressProps> = ({
  onToggleFullscreen,
  isFullscreen = false,
}) => {
  if (!onToggleFullscreen) return null;

  return (
    <div
      className="absolute bottom-4 sm:bottom-6 right-6 sm:right-10 z-20 flex items-center select-none"
      role="region"
      aria-label="Display controls"
    >
      {/* Discrete, elegant Fullscreen Button without technical clutter */}
      <button
        type="button"
        onClick={onToggleFullscreen}
        title={isFullscreen ? 'Exit Fullscreen (Esc / F)' : 'Enter Fullscreen (F)'}
        className="pointer-events-auto p-2 rounded-full text-[#A9957E] hover:text-[#F5EEE4] bg-[#17100C]/80 hover:bg-[#211710] border border-[rgba(214,154,89,0.2)] transition-colors flex items-center justify-center cursor-pointer shadow-sm backdrop-blur-sm"
        aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
      >
        {isFullscreen ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 9L4 4m0 0v4m0-4h4m6 6l5 5m0 0v-4m0 4h-4M9 15l-5 5m0 0v-4m0 4h4m11-9l-5-5m0 0h4m-4 0v4" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        )}
      </button>
    </div>
  );
};
