'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CHAPTERS, ChapterItem, getChapterOpacity } from '@/data/chaptersData';

/* ────────────────────────────────────────────────────────────────────────
   DESIGN TOKENS (from design.md)
   ──────────────────────────────────────────────────────────────────────── */
const T = {
  // Surfaces
  base:    '#100B08',   // --espresso-950
  surface: '#18110D',   // --espresso-900
  raised:  '#231913',   // --espresso-850
  card:    '#2C1E16',   // --espresso-800
  tint:    '#3D2619',   // --coffee-brown
  // Text
  heading: '#FAF4EC',   // --cream-100 (high contrast)
  sub:     '#EADCCB',   // --cream-200
  body:    '#D2C1AC',   // --cream-300
  muted:   '#B39E88',   // --muted-400
  dim:     '#8E7B68',   // --muted-500
  // Accent
  caramel: '#E0A362',   // --caramel-400 (warm gold)
  copper:  '#A05E33',   // --copper-600
  // Semantic
  success: '#95B38E',
  warn:    '#E2AD67',
  danger:  '#D68472',
  // Borders & shadows
  lineWarm: 'rgba(224, 163, 98, 0.24)',
  lineSubtle: 'rgba(224, 163, 98, 0.12)',
  shadow: '0 4px 20px rgba(0, 0, 0, 0.55)',
} as const;

/* Shared Bento module component */
function BentoModule({
  children,
  className = '',
  span = '',
  padded = true,
}: {
  children: React.ReactNode;
  className?: string;
  span?: string;
  padded?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl transition-all ${padded ? 'p-3.5 sm:p-4' : ''} ${span} ${className}`}
      style={{
        backgroundColor: T.raised,
        border: `1px solid ${T.lineWarm}`,
        boxShadow: T.shadow,
      }}
    >
      {children}
    </div>
  );
}

/* Module label */
function ModuleLabel({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <span
      className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-bold block mb-1"
      style={{ color: accent ? T.caramel : T.muted }}
    >
      {children}
    </span>
  );
}

/* Module value – large editorial number/metric */
function ModuleValue({ children, unit }: { children: React.ReactNode; unit?: string }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="text-xl sm:text-2xl font-black tabular-nums tracking-tight" style={{ color: T.heading }}>
        {children}
      </span>
      {unit && <span className="text-xs font-mono font-medium" style={{ color: T.muted }}>{unit}</span>}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   CHAPTER BENTO CONTENT
   ──────────────────────────────────────────────────────────────────────── */

function ChapterBentoContent({
  ch,
  recPage,
  setRecPage,
}: {
  ch: ChapterItem;
  recPage: 0 | 1;
  setRecPage: (page: 0 | 1) => void;
}) {
  return (
    <>
      {/* ──────────── CHAPTER HEADER (shared across all 6) ──────────── */}
      <div className="mb-4 sm:mb-5">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-1.5">
          <span className="font-mono text-xs font-bold tracking-[0.2em] tabular-nums" style={{ color: T.caramel }}>
            {ch.number}
          </span>
          <span className="w-4 h-[1.5px] rounded-full" style={{ backgroundColor: T.caramel }} />
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] font-semibold" style={{ color: T.muted }}>
            {ch.academicTopic}
          </span>
        </div>

        {/* Title */}
        <h2
          className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-[1.05]"
          style={{ color: T.heading }}
        >
          {ch.title}
        </h2>

        {/* Subtitle */}
        <p className="mt-1 text-sm sm:text-base font-semibold leading-snug" style={{ color: T.sub }}>
          {ch.subtitle}
        </p>

        {/* Lead paragraph */}
        <p className="mt-1.5 text-xs sm:text-[13px] leading-relaxed" style={{ color: T.body }}>
          {ch.description}
        </p>
      </div>

        {/* ──────────── BENTO GRID (chapter-specific) ──────────── */}

        {/* ═══ CH 01 — IPO Model ═══ */}
        {ch.id === 'origin' && ch.ipoData && (
          <div className="grid grid-cols-12 gap-2.5 sm:gap-3">

            {/* Feature: Process Flow (spans 7 cols) */}
            <BentoModule span="col-span-12 sm:col-span-7">
              <ModuleLabel accent>Transformation Process</ModuleLabel>
              <div className="space-y-1.5 mt-1.5">
                {ch.ipoData.processes.map((p, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-xl px-2.5 py-1.5"
                    style={{
                      backgroundColor: p.isBottleneck ? 'rgba(224, 163, 98, 0.16)' : T.surface,
                      border: p.isBottleneck ? `1px solid rgba(224, 163, 98, 0.45)` : `1px solid ${T.lineSubtle}`,
                    }}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-mono text-[10px] font-bold tabular-nums shrink-0" style={{ color: T.caramel }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[12px] font-medium truncate" style={{ color: p.isBottleneck ? T.heading : T.sub }}>
                        {p.step}
                      </span>
                      {p.isBottleneck && (
                        <span className="text-[8px] font-mono uppercase px-1.5 py-0.5 rounded font-bold shrink-0" style={{ color: T.warn, backgroundColor: 'rgba(226, 173, 103, 0.2)', border: '1px solid rgba(226, 173, 103, 0.4)' }}>
                          Bottleneck
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-[11px] font-bold tabular-nums shrink-0 ml-2" style={{ color: T.caramel }}>
                      {p.time}
                    </span>
                  </div>
                ))}
              </div>
            </BentoModule>

            {/* Inputs & Outputs Column (spans 5 cols) */}
            <div className="col-span-12 sm:col-span-5 flex flex-col gap-2.5">
              <BentoModule className="flex-1">
                <ModuleLabel>Inputs</ModuleLabel>
                <ul className="space-y-1 text-[11px] leading-snug" style={{ color: T.body }}>
                  {ch.ipoData.inputs.map((inp, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="mt-[3px] w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: T.caramel }} />
                      <span>{inp}</span>
                    </li>
                  ))}
                </ul>
              </BentoModule>

              <BentoModule className="flex-1">
                <ModuleLabel>Outputs</ModuleLabel>
                <ul className="space-y-1 text-[11px] leading-snug" style={{ color: T.body }}>
                  {ch.ipoData.outputs.map((out, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="mt-[3px] w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: T.caramel }} />
                      <span>{out}</span>
                    </li>
                  ))}
                </ul>
              </BentoModule>
            </div>

            {/* Photo module (7 cols) */}
            <BentoModule span="col-span-12 sm:col-span-7" padded={false}>
              <div className="relative w-full h-28 sm:h-32 rounded-2xl overflow-hidden">
                <Image src={ch.imageSrc} alt={ch.imageCaption} fill sizes="500px" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#100B08]/85 via-[#100B08]/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 px-3.5 py-2 flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-semibold" style={{ color: T.sub }}>
                    {ch.imageCaption}
                  </span>
                  <span className="text-[9px] font-mono uppercase" style={{ color: T.caramel }}>Field Visit</span>
                </div>
              </div>
            </BentoModule>

            {/* SLA Baseline (5 cols) */}
            <BentoModule span="col-span-12 sm:col-span-5" className="flex flex-col justify-between">
              <div>
                <ModuleLabel accent>Service Level Agreement</ModuleLabel>
                <div className="mt-1">
                  <span className="text-xl sm:text-2xl font-black tabular-nums" style={{ color: T.heading }}>
                    ≤ 8 min
                  </span>
                  <p className="text-[11px] mt-0.5" style={{ color: T.body }}>
                    Standard order delivery commitment
                  </p>
                </div>
              </div>
              <div className="mt-2 pt-2" style={{ borderTop: `1px solid ${T.lineSubtle}` }}>
                <span className="font-mono text-[10px] font-bold" style={{ color: T.caramel }}>
                  3-Day Bean Freshness Window
                </span>
              </div>
            </BentoModule>
          </div>
        )}

        {/* ═══ CH 02 — The 4Vs ═══ */}
        {ch.id === 'preparation' && ch.fourVsData && (
          <div className="grid grid-cols-12 gap-2.5 sm:gap-3">

            {/* Volume – Feature module (7 cols) with revenue split bar */}
            <BentoModule span="col-span-12 sm:col-span-7">
              <ModuleLabel accent>Volume</ModuleLabel>
              <p className="text-[12px] leading-snug mb-2.5" style={{ color: T.body }}>
                {ch.fourVsData[0].description}
              </p>
              {ch.revenueSplit && (
                <div className="rounded-xl p-2.5" style={{ backgroundColor: T.surface, border: `1px solid ${T.lineSubtle}` }}>
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold mb-1.5" style={{ color: T.sub }}>
                    <span>Verified Revenue Contribution</span>
                    <span style={{ color: T.caramel }}>Field Observation</span>
                  </div>
                  <div className="w-full h-3 rounded-full overflow-hidden flex" style={{ backgroundColor: T.base, border: `1px solid ${T.lineSubtle}` }}>
                    <div style={{ width: '70%', backgroundColor: T.caramel }} className="h-full" />
                    <div style={{ width: '25%', backgroundColor: T.body }} className="h-full" />
                    <div style={{ width: '5%', backgroundColor: T.tint }} className="h-full" />
                  </div>
                  <div className="flex items-center justify-between mt-1.5 text-[10px] font-mono font-bold tabular-nums">
                    <span style={{ color: T.caramel }}>Coffee 70%</span>
                    <span style={{ color: T.body }}>Bakery 25%</span>
                    <span style={{ color: T.muted }}>Unclassified 5%</span>
                  </div>
                  <p className="text-[9.5px] italic mt-1" style={{ color: T.dim }}>
                    * Revenue contribution ≠ transaction volume.
                  </p>
                </div>
              )}
            </BentoModule>

            {/* Photo module (5 cols) */}
            <BentoModule span="col-span-12 sm:col-span-5" padded={false}>
              <div className="relative w-full h-full min-h-[140px] rounded-2xl overflow-hidden">
                <Image src={ch.imageSrc} alt={ch.imageCaption} fill sizes="350px" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#100B08]/85 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-3">
                  <span className="text-[9.5px] font-mono uppercase tracking-wider font-semibold" style={{ color: T.sub }}>
                    Field Visit • Preparation
                  </span>
                </div>
              </div>
            </BentoModule>

            {/* Variety (4 cols) */}
            <BentoModule span="col-span-12 sm:col-span-4">
              <ModuleLabel accent>Variety</ModuleLabel>
              <ModuleValue>High</ModuleValue>
              <p className="text-[11px] leading-snug mt-1" style={{ color: T.body }}>
                {ch.fourVsData[1].description}
              </p>
            </BentoModule>

            {/* Variation (4 cols) */}
            <BentoModule span="col-span-6 sm:col-span-4">
              <ModuleLabel accent>Variation</ModuleLabel>
              <ModuleValue>High</ModuleValue>
              <p className="text-[11px] leading-snug mt-1" style={{ color: T.body }}>
                {ch.fourVsData[2].description}
              </p>
            </BentoModule>

            {/* Visibility (4 cols) */}
            <BentoModule span="col-span-6 sm:col-span-4">
              <ModuleLabel accent>Visibility</ModuleLabel>
              <ModuleValue>Very High</ModuleValue>
              <p className="text-[11px] leading-snug mt-1" style={{ color: T.body }}>
                {ch.fourVsData[3].description}
              </p>
            </BentoModule>
          </div>
        )}

        {/* ═══ CH 03 — Five Performance Objectives ═══ */}
        {ch.id === 'order' && ch.fiveObjectives && (
          <div className="grid grid-cols-12 gap-2.5 sm:gap-3">

            {/* Quality — Feature module (7 cols, Order Winner) */}
            <BentoModule span="col-span-12 sm:col-span-7">
              <div className="flex items-center justify-between mb-1">
                <ModuleLabel accent>Quality — Order Winner</ModuleLabel>
                <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded font-bold" style={{ color: T.warn, backgroundColor: 'rgba(226, 173, 103, 0.16)', border: '1px solid rgba(226, 173, 103, 0.35)' }}>
                  Competitive Advantage
                </span>
              </div>
              <p className="text-[12.5px] leading-snug" style={{ color: T.sub }}>
                {ch.fiveObjectives[0].detail}
              </p>
              <span className="block mt-2 font-mono text-[11px] font-bold tabular-nums" style={{ color: T.caramel }}>
                {ch.fiveObjectives[0].fieldMetric}
              </span>
            </BentoModule>

            {/* Speed (5 cols) */}
            <BentoModule span="col-span-12 sm:col-span-5">
              <ModuleLabel>Speed</ModuleLabel>
              <ModuleValue unit="max">≤ 8 min</ModuleValue>
              <p className="text-[11px] leading-snug mt-1" style={{ color: T.body }}>
                {ch.fiveObjectives[1].detail}
              </p>
            </BentoModule>

            {/* Dependability (4 cols) */}
            <BentoModule span="col-span-6 sm:col-span-4">
              <ModuleLabel>Dependability</ModuleLabel>
              <p className="text-[11.5px] leading-snug" style={{ color: T.body }}>
                {ch.fiveObjectives[2].detail}
              </p>
            </BentoModule>

            {/* Flexibility (4 cols) */}
            <BentoModule span="col-span-6 sm:col-span-4">
              <ModuleLabel>Flexibility</ModuleLabel>
              <p className="text-[11.5px] leading-snug" style={{ color: T.body }}>
                {ch.fiveObjectives[3].detail}
              </p>
            </BentoModule>

            {/* Cost (4 cols) */}
            <BentoModule span="col-span-12 sm:col-span-4">
              <ModuleLabel>Cost</ModuleLabel>
              <p className="text-[11.5px] leading-snug" style={{ color: T.body }}>
                {ch.fiveObjectives[4].detail}
              </p>
              <span className="block mt-1 font-mono text-[10px] font-bold" style={{ color: T.muted }}>
                {ch.fiveObjectives[4].fieldMetric}
              </span>
            </BentoModule>

            {/* Photo module (12 cols full width strip) */}
            <BentoModule span="col-span-12" padded={false}>
              <div className="relative w-full h-24 sm:h-28 rounded-2xl overflow-hidden">
                <Image src={ch.imageSrc} alt={ch.imageCaption} fill sizes="600px" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#100B08]/85 via-[#100B08]/30 to-transparent" />
                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-semibold" style={{ color: T.sub }}>
                    {ch.imageCaption}
                  </span>
                  <span className="text-[9px] font-mono uppercase" style={{ color: T.caramel }}>Field Notes</span>
                </div>
              </div>
            </BentoModule>
          </div>
        )}

        {/* ═══ CH 04 — Process Type & Layout ═══ */}
        {ch.id === 'brew' && (
          <div className="grid grid-cols-12 gap-2.5 sm:gap-3">

            {/* Classification (6 cols) */}
            <BentoModule span="col-span-12 sm:col-span-6">
              <ModuleLabel accent>Process Classification</ModuleLabel>
              <ModuleValue>{ch.processTypeData?.type}</ModuleValue>
              <p className="text-[11.5px] leading-snug mt-1.5" style={{ color: T.body }}>
                {ch.processTypeData?.justification}
              </p>
            </BentoModule>

            {/* Feature Photo (6 cols) */}
            <BentoModule span="col-span-12 sm:col-span-6" padded={false}>
              <div className="relative w-full h-full min-h-[120px] rounded-2xl overflow-hidden">
                <Image src={ch.imageSrc} alt={ch.imageCaption} fill sizes="400px" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#100B08]/85 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
                  <span className="text-[9.5px] font-mono uppercase tracking-wider font-semibold" style={{ color: T.sub }}>
                    {ch.imageCaption}
                  </span>
                </div>
              </div>
            </BentoModule>

            {/* Timing Steps (4 x 3 cols) */}
            {ch.timingSteps?.map((ts, i) => (
              <BentoModule key={i} span="col-span-6 sm:col-span-3">
                <ModuleLabel>{ts.label}</ModuleLabel>
                <ModuleValue>{ts.time}</ModuleValue>
              </BentoModule>
            ))}

            {/* Cellular Layout Workcells (12 cols) */}
            <BentoModule span="col-span-12">
              <ModuleLabel accent>Cellular Bar Layout — 4 Workcells</ModuleLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1.5">
                {ch.layoutData?.cells.map((cell, i) => (
                  <div
                    key={i}
                    className="rounded-xl px-3 py-2 flex items-center justify-between"
                    style={{ backgroundColor: T.surface, border: `1px solid ${T.lineSubtle}` }}
                  >
                    <div className="min-w-0 mr-2">
                      <span className="text-[12px] font-semibold block truncate" style={{ color: T.sub }}>{cell.name}</span>
                      <span className="text-[10px] block" style={{ color: T.muted }}>{cell.equipment}</span>
                    </div>
                    <span className="font-mono text-[11px] font-bold tabular-nums shrink-0" style={{ color: T.caramel }}>
                      {cell.cycleTime}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] mt-2 italic" style={{ color: T.muted }}>
                Identified bottleneck: {ch.layoutData?.bottleneck}
              </p>
            </BentoModule>
          </div>
        )}

        {/* ═══ CH 05 — Operations Strategy ═══ */}
        {ch.id === 'perfect-serve' && (
          <div className="grid grid-cols-12 gap-2.5 sm:gap-3">

            {/* Strategic Overview Feature Module (7 cols) */}
            <BentoModule span="col-span-12 sm:col-span-7">
              <ModuleLabel accent>Operations Strategy Trade-offs</ModuleLabel>
              <div className="space-y-1.5 mt-1.5">
                {ch.strategyData?.map((s, i) => (
                  <div key={i} className="rounded-xl px-3 py-2" style={{ backgroundColor: T.surface, border: `1px solid ${T.lineSubtle}` }}>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[12px] font-bold" style={{ color: T.heading }}>{s.pillar}</span>
                      <span className="font-mono text-[10px] font-bold" style={{ color: T.caramel }}>{s.choice}</span>
                    </div>
                    <p className="text-[10.5px] leading-snug" style={{ color: T.body }}>{s.tradeoff}</p>
                  </div>
                ))}
              </div>
            </BentoModule>

            {/* Photo (5 cols) */}
            <BentoModule span="col-span-12 sm:col-span-5" padded={false}>
              <div className="relative w-full h-full min-h-[160px] rounded-2xl overflow-hidden">
                <Image src={ch.imageSrc} alt={ch.imageCaption} fill sizes="350px" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#100B08]/85 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-3">
                  <span className="text-[9.5px] font-mono uppercase tracking-wider font-semibold" style={{ color: T.sub }}>
                    {ch.imageCaption}
                  </span>
                </div>
              </div>
            </BentoModule>

            {/* Competitive Positioning Table (12 cols) */}
            {ch.comparisons && (
              <BentoModule span="col-span-12">
                <ModuleLabel>Competitive Positioning Matrix</ModuleLabel>
                <div className="overflow-x-auto mt-1">
                  <table className="w-full text-[11px]">
                    <thead>
                      <tr style={{ borderBottom: `1px solid ${T.lineWarm}` }}>
                        <th className="text-left py-1.5 pr-2 font-mono font-bold uppercase text-[9.5px]" style={{ color: T.muted }}>Dimension</th>
                        <th className="text-left py-1.5 pr-2 font-mono font-bold uppercase text-[9.5px]" style={{ color: T.caramel }}>True Black</th>
                        <th className="text-left py-1.5 pr-2 font-mono font-bold uppercase text-[9.5px]" style={{ color: T.muted }}>Starbucks</th>
                        <th className="text-left py-1.5 font-mono font-bold uppercase text-[9.5px]" style={{ color: T.muted }}>Third Wave</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ch.comparisons.map((c, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${T.lineSubtle}` }}>
                          <td className="py-1.5 pr-2 font-medium" style={{ color: T.sub }}>{c.dimension}</td>
                          <td className="py-1.5 pr-2 font-semibold" style={{ color: T.heading }}>{c.trueBlack}</td>
                          <td className="py-1.5 pr-2" style={{ color: T.muted }}>{c.starbucks}</td>
                          <td className="py-1.5" style={{ color: T.muted }}>{c.thirdWave}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </BentoModule>
            )}
          </div>
        )}

        {/* ═══ CH 06 — Practical Applications ═══ */}
        {ch.id === 'beyond-cup' && ch.recommendations && (
          <div className="grid grid-cols-12 gap-2.5 sm:gap-3">

            {/* Feature Recommendation #1 (7 cols) */}
            <BentoModule span="col-span-12 sm:col-span-7">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <ModuleLabel accent>Priority Recommendation</ModuleLabel>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="font-mono text-base font-black tabular-nums" style={{ color: T.caramel }}>01.</span>
                    <span className="text-sm sm:text-base font-bold leading-tight" style={{ color: T.heading }}>
                      {ch.recommendations[0].title}
                    </span>
                  </div>
                  <p className="text-[11.5px] leading-snug mt-1.5" style={{ color: T.body }}>
                    {ch.recommendations[0].action}
                  </p>
                </div>
                <span className="text-[8.5px] font-mono uppercase px-2 py-0.5 rounded font-bold shrink-0" style={{ color: T.warn, backgroundColor: 'rgba(226, 173, 103, 0.16)', border: '1px solid rgba(226, 173, 103, 0.35)' }}>
                  {ch.recommendations[0].impact}
                </span>
              </div>
              <div className="mt-2.5 pt-1.5 flex items-center justify-between" style={{ borderTop: `1px solid ${T.lineSubtle}` }}>
                <span className="text-[10px] font-mono" style={{ color: T.muted }}>Proposed Target:</span>
                <span className="text-[11px] font-mono font-bold" style={{ color: T.sub }}>{ch.recommendations[0].kpi}</span>
              </div>
            </BentoModule>

            {/* Photo (5 cols) */}
            <BentoModule span="col-span-12 sm:col-span-5" padded={false}>
              <div className="relative w-full h-full min-h-[130px] rounded-2xl overflow-hidden">
                <Image src={ch.imageSrc} alt={ch.imageCaption} fill sizes="350px" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#100B08]/85 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-3">
                  <span className="text-[9.5px] font-mono uppercase tracking-wider font-semibold" style={{ color: T.sub }}>
                    {ch.imageCaption}
                  </span>
                </div>
              </div>
            </BentoModule>

            {/* Pillar Tabs */}
            <div className="col-span-12 flex items-center justify-between">
              <div className="flex items-center gap-1 p-0.5 rounded-lg" style={{ backgroundColor: T.surface, border: `1px solid ${T.lineSubtle}` }}>
                <button
                  onClick={() => setRecPage(0)}
                  className="px-3 py-1 rounded-md text-[10px] font-mono transition-all cursor-pointer"
                  style={{
                    backgroundColor: recPage === 0 ? T.raised : 'transparent',
                    color: recPage === 0 ? T.caramel : T.muted,
                    fontWeight: recPage === 0 ? 700 : 500,
                    border: recPage === 0 ? `1px solid ${T.lineWarm}` : '1px solid transparent',
                  }}
                >
                  02–04 Quality & Bottlenecks
                </button>
                <button
                  onClick={() => setRecPage(1)}
                  className="px-3 py-1 rounded-md text-[10px] font-mono transition-all cursor-pointer"
                  style={{
                    backgroundColor: recPage === 1 ? T.raised : 'transparent',
                    color: recPage === 1 ? T.caramel : T.muted,
                    fontWeight: recPage === 1 ? 700 : 500,
                    border: recPage === 1 ? `1px solid ${T.lineWarm}` : '1px solid transparent',
                  }}
                >
                  05–08 Flow & Capacity
                </button>
              </div>
            </div>

            {/* Recommendation cards — 3 per page, displayed as editorial list items */}
            {(recPage === 0
              ? ch.recommendations.slice(1, 4)
              : ch.recommendations.slice(4, 8)
            ).map((rec) => (
              <BentoModule key={rec.id} span="col-span-12 sm:col-span-6">
                <div className="flex items-start gap-2">
                  <span className="font-mono text-sm font-bold tabular-nums shrink-0 mt-0.5" style={{ color: T.caramel }}>
                    {String(rec.id).padStart(2, '0')}.
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1.5 mb-0.5">
                      <span className="text-[12px] font-bold leading-tight" style={{ color: T.heading }}>
                        {rec.title}
                      </span>
                      <span className="text-[8px] font-mono uppercase px-1 py-0.5 rounded shrink-0" style={{ color: T.muted, backgroundColor: T.surface, border: `1px solid ${T.lineSubtle}` }}>
                        {rec.impact}
                      </span>
                    </div>
                    <p className="text-[10.5px] leading-snug" style={{ color: T.body }}>
                      {rec.action}
                    </p>
                    <div className="mt-1.5 pt-1 flex items-center justify-between" style={{ borderTop: `1px solid ${T.lineSubtle}` }}>
                      <span className="text-[9px] font-mono" style={{ color: T.dim }}>Proposed Target:</span>
                      <span className="text-[10px] font-mono font-bold" style={{ color: T.sub }}>{rec.kpi}</span>
                    </div>
                  </div>
                </div>
              </BentoModule>
            ))}
          </div>
        )}
    </>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   CONTENT PANEL (Multi-Chapter Seamless Cross-Dissolve Stage)
   ──────────────────────────────────────────────────────────────────────── */

interface ContentPanelProps {
  globalProgress: number;
  isVisible: boolean;
}

export const ContentPanel: React.FC<ContentPanelProps> = ({
  globalProgress,
  isVisible,
}) => {
  const [recPage, setRecPage] = useState<0 | 1>(0);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="pointer-events-none absolute inset-y-0 right-0 z-20 flex items-center justify-end select-none w-full sm:w-[58%] md:w-[54%] lg:w-[50%] xl:w-[48%] max-w-[760px] pr-3 sm:pr-6 md:pr-8 lg:pr-10 pt-2 pb-12"
      aria-hidden={!isVisible}
    >
      <div className="relative w-full h-full flex items-center justify-end">
        {CHAPTERS.map((ch, idx) => {
          const opacity = getChapterOpacity(globalProgress, idx);
          if (opacity <= 0.005) return null;

          return (
            <div
              key={ch.id}
              className="absolute inset-0 flex items-center justify-end pointer-events-none transition-opacity duration-75 ease-out"
              style={{
                opacity,
              }}
            >
              {/* Editorial Content Canvas with lavish Espresso Glass Backdrop */}
              <div
                className="w-full max-h-[calc(100vh-7rem)] overflow-y-auto pr-1 flex flex-col scrollbar-thin scrollbar-thumb-[rgba(224,163,98,0.3)] scrollbar-track-transparent rounded-3xl p-3.5 sm:p-5 lg:p-6"
                style={{
                  backgroundColor: 'rgba(18, 12, 9, 0.92)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(224, 163, 98, 0.22)',
                  boxShadow:
                    '0 24px 64px rgba(0, 0, 0, 0.88), inset 0 1px 0 rgba(224, 163, 98, 0.18)',
                  pointerEvents: opacity > 0.45 ? 'auto' : 'none',
                }}
              >
                <ChapterBentoContent ch={ch} recPage={recPage} setRecPage={setRecPage} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
