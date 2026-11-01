'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FIELD_GALLERY_PHOTOS, FieldPhotoItem } from '@/data/chaptersData';

/* Design tokens */
const T = {
  base:    '#100B08',
  surface: '#17100C',
  raised:  '#211710',
  heading: '#F5EEE4',
  sub:     '#E7D9C8',
  body:    '#CDBBA5',
  muted:   '#A9957E',
  caramel: '#D69A59',
  lineWarm: 'rgba(214,154,89,0.18)',
  lineSubtle: 'rgba(214,154,89,0.10)',
} as const;

interface FieldNotesGalleryProps {
  isVisible: boolean;
  onClose?: () => void;
}

export const FieldNotesGallery: React.FC<FieldNotesGalleryProps> = ({ isVisible, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePhoto, setActivePhoto] = useState<FieldPhotoItem | null>(null);

  if (!isVisible) return null;

  const categories = ['All', 'Architecture', 'Equipment', 'Craft', 'Service'];
  const filteredPhotos = selectedCategory === 'All'
    ? FIELD_GALLERY_PHOTOS
    : FIELD_GALLERY_PHOTOS.filter(p => p.category === selectedCategory);

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center p-3 sm:p-5 md:p-8 select-none" style={{ backgroundColor: 'rgba(16,11,8,0.88)', backdropFilter: 'blur(4px)' }}>
      <div
        className="relative w-full max-w-5xl max-h-[90vh] rounded-2xl p-5 sm:p-7 flex flex-col overflow-hidden"
        style={{ backgroundColor: T.surface, border: `1px solid ${T.lineWarm}`, boxShadow: '0 24px 60px rgba(0,0,0,0.8)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-3" style={{ borderBottom: `1px solid ${T.lineWarm}` }}>
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] font-bold block" style={{ color: T.caramel }}>
              True Black Café — Hyderabad
            </span>
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight" style={{ color: T.heading }}>
              FIELD NOTES
            </h3>
            <p className="text-xs" style={{ color: T.body }}>
              Authentic on-site photographic documentation and operational analysis.
            </p>
          </div>
          {onClose && (
            <button onClick={onClose} className="p-1.5 rounded-full transition-colors cursor-pointer" style={{ color: T.muted, border: `1px solid ${T.lineWarm}` }} title="Close">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 mb-4 overflow-x-auto pb-1 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer"
              style={{
                backgroundColor: selectedCategory === cat ? T.caramel : T.raised,
                color: selectedCategory === cat ? T.base : T.muted,
                fontWeight: selectedCategory === cat ? 700 : 500,
                border: `1px solid ${selectedCategory === cat ? 'transparent' : T.lineWarm}`,
              }}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto text-[11px] font-mono tabular-nums hidden sm:inline" style={{ color: T.muted }}>
            {filteredPhotos.length} captures
          </span>
        </div>

        {/* Bento Photo Grid */}
        <div className="grid grid-cols-12 gap-2.5 sm:gap-3 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-[rgba(214,154,89,0.2)]">
          {filteredPhotos.map((photo, idx) => {
            // Asymmetric sizing: first photo spans wider
            const isFeature = idx === 0;
            const span = isFeature ? 'col-span-12 sm:col-span-8' : 'col-span-6 sm:col-span-4';
            const height = isFeature ? 'h-52 sm:h-56' : 'h-44 sm:h-48';

            return (
              <div
                key={photo.id}
                onClick={() => setActivePhoto(photo)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all ${span} ${height}`}
                style={{ border: `1px solid ${T.lineSubtle}`, backgroundColor: T.base }}
              >
                <Image src={photo.imageSrc} alt={photo.title} fill sizes={isFeature ? '600px' : '300px'} className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${T.base}ee, ${T.base}55, transparent)` }} />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                  <span className="font-mono text-[9px] uppercase tracking-wider font-bold block" style={{ color: T.caramel }}>
                    {photo.category}
                  </span>
                  <h4 className="text-sm font-bold leading-tight mt-0.5" style={{ color: T.heading }}>
                    {photo.title}
                  </h4>
                  <p className="text-[10px] line-clamp-1 mt-0.5" style={{ color: T.body }}>
                    {photo.caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lightbox */}
        {activePhoto && (
          <div className="absolute inset-0 z-40 flex flex-col justify-between p-4 sm:p-6" style={{ backgroundColor: `${T.base}f2`, backdropFilter: 'blur(8px)' }} onClick={() => setActivePhoto(null)}>
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest" style={{ color: T.caramel }}>
                {activePhoto.category} — {activePhoto.location}
              </span>
              <button onClick={() => setActivePhoto(null)} className="px-2.5 py-1 rounded-lg text-xs font-mono transition-colors" style={{ color: T.heading, backgroundColor: T.raised, border: `1px solid ${T.lineWarm}` }}>
                Close
              </button>
            </div>
            <div className="relative w-full flex-1 my-3 rounded-2xl overflow-hidden" style={{ border: `1px solid ${T.lineWarm}` }}>
              <Image src={activePhoto.imageSrc} alt={activePhoto.title} fill sizes="100vw" className="object-contain" />
            </div>
            <div className="rounded-xl p-4" style={{ backgroundColor: T.raised, border: `1px solid ${T.lineWarm}` }}>
              <h4 className="text-base font-bold" style={{ color: T.heading }}>{activePhoto.title}</h4>
              <p className="text-xs mt-0.5" style={{ color: T.sub }}>{activePhoto.caption}</p>
              <div className="mt-2 pt-2 flex items-start gap-2 text-[11px] font-mono" style={{ borderTop: `1px solid ${T.lineSubtle}`, color: T.caramel }}>
                <span className="font-bold uppercase shrink-0">OM Analysis:</span>
                <span style={{ color: T.body }}>{activePhoto.omNotes}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
