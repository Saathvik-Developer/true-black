'use client';

import React, { useState } from 'react';

/* Design tokens (from design.md) */
const T = {
  base:    '#100B08',
  surface: '#17100C',
  raised:  '#211710',
  card:    '#2A1D14',
  heading: '#F5EEE4',
  sub:     '#E7D9C8',
  body:    '#CDBBA5',
  muted:   '#A9957E',
  dim:     '#82715F',
  caramel: '#D69A59',
  success: '#8EAA87',
  warn:    '#D5A15E',
  danger:  '#C87968',
  lineWarm: 'rgba(214,154,89,0.18)',
  lineSubtle: 'rgba(214,154,89,0.10)',
  shadow: '0 2px 16px rgba(0,0,0,0.45)',
} as const;

function LabModule({ children, className = '', span = '' }: { children: React.ReactNode; className?: string; span?: string }) {
  return (
    <div
      className={`rounded-2xl p-4 sm:p-5 ${span} ${className}`}
      style={{ backgroundColor: T.raised, border: `1px solid ${T.lineWarm}`, boxShadow: T.shadow }}
    >
      {children}
    </div>
  );
}

interface OperationsLabProps {
  isVisible: boolean;
  onClose?: () => void;
}

export const OperationsLab: React.FC<OperationsLabProps> = ({ isVisible, onClose }) => {
  const [arrivalRate, setArrivalRate] = useState(24);
  const [baristas, setBaristas]       = useState(2);
  const [prepTimeSec, setPrepTimeSec] = useState(90);

  if (!isVisible) return null;

  const serviceRate = 3600 / prepTimeSec;
  const totalCap    = baristas * serviceRate;
  const utilization = Math.min(1.5, arrivalRate / totalCap);
  const utilPct     = Math.round(utilization * 100);

  let waitMin = 0;
  if (utilization < 0.98) {
    waitMin = Math.round(((utilization / (1 - utilization + 0.05)) * (prepTimeSec / 60)) * 10) / 10;
  } else {
    waitMin = 15.0;
  }

  const totalMin   = Math.round((waitMin + prepTimeSec / 60) * 10) / 10;
  const slaBreach  = totalMin > 8.0;

  const statusColor = utilPct < 75 ? T.success : utilPct < 90 ? T.warn : T.danger;

  const applyPreset = (p: 'normal' | 'peak' | 'opt') => {
    if (p === 'normal')  { setArrivalRate(20); setBaristas(2); setPrepTimeSec(90); }
    if (p === 'peak')    { setArrivalRate(48); setBaristas(2); setPrepTimeSec(105); }
    if (p === 'opt')     { setArrivalRate(48); setBaristas(3); setPrepTimeSec(75); }
  };

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center p-3 sm:p-5 md:p-8 select-none" style={{ backgroundColor: 'rgba(16,11,8,0.88)', backdropFilter: 'blur(4px)' }}>
      <div
        className="relative w-full max-w-5xl max-h-[92vh] rounded-2xl p-5 sm:p-7 flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-[rgba(214,154,89,0.2)]"
        style={{ backgroundColor: T.surface, border: `1px solid ${T.lineWarm}`, boxShadow: '0 24px 60px rgba(0,0,0,0.8)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-3" style={{ borderBottom: `1px solid ${T.lineWarm}` }}>
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] font-bold block" style={{ color: T.caramel }}>
              Operations Management Simulation
            </span>
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight" style={{ color: T.heading }}>
              OPERATIONS LAB
            </h3>
          </div>
          {onClose && (
            <button onClick={onClose} className="p-1.5 rounded-full transition-colors cursor-pointer" style={{ color: T.muted, border: `1px solid ${T.lineWarm}` }} title="Close">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Disclaimer */}
        <div className="rounded-xl p-3 mb-4 flex items-start gap-3" style={{ backgroundColor: T.raised, border: `1px solid rgba(214,154,89,0.25)` }}>
          <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: T.caramel }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-[11px] leading-relaxed" style={{ color: T.body }}>
            <strong style={{ color: T.caramel }}>Academic Simulation:</strong> All values are illustrative OM models, not measured performance data from True Black Café.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-2.5 sm:gap-3">

          {/* Presets (full width) */}
          <div className="col-span-12 flex items-center gap-2 flex-wrap">
            <span className="font-mono text-[10px] font-bold uppercase" style={{ color: T.muted }}>Presets:</span>
            {[
              { label: 'Normal Steady', key: 'normal' as const, color: T.sub },
              { label: 'Peak Evening',  key: 'peak' as const,   color: T.warn },
              { label: 'Optimised',     key: 'opt' as const,    color: T.success },
            ].map(p => (
              <button key={p.key} onClick={() => applyPreset(p.key)} className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-medium transition-all cursor-pointer" style={{ color: p.color, backgroundColor: T.raised, border: `1px solid ${T.lineWarm}` }}>
                {p.label}
              </button>
            ))}
          </div>

          {/* Slider 1: Arrival Rate (8 cols) */}
          <LabModule span="col-span-12 lg:col-span-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12.5px] font-bold" style={{ color: T.heading }}>Customer Arrival Rate (λ)</span>
              <span className="font-mono text-xs font-bold tabular-nums px-2 py-0.5 rounded-md" style={{ color: T.caramel, backgroundColor: T.surface, border: `1px solid ${T.lineWarm}` }}>
                {arrivalRate} orders/hr
              </span>
            </div>
            <input type="range" min="10" max="60" step="2" value={arrivalRate} onChange={e => setArrivalRate(+e.target.value)} className="w-full accent-[#D69A59] cursor-pointer" />
            <div className="flex justify-between text-[9px] font-mono mt-1" style={{ color: T.dim }}>
              <span>10 Quiet</span><span>35 Moderate</span><span>60 Weekend Peak</span>
            </div>
          </LabModule>

          {/* Utilization Gauge (4 cols) */}
          <LabModule span="col-span-12 lg:col-span-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] uppercase font-bold" style={{ color: T.muted }}>Utilisation (ρ)</span>
              <span className="font-mono text-xs font-bold tabular-nums px-2 py-0.5 rounded-md" style={{ color: statusColor, backgroundColor: T.surface, border: `1px solid ${statusColor}40` }}>
                {utilPct}%
              </span>
            </div>
            <div className="w-full h-3 rounded-full overflow-hidden" style={{ backgroundColor: T.base, border: `1px solid ${T.lineSubtle}` }}>
              <div className="h-full transition-all duration-300 rounded-full" style={{ width: `${Math.min(100, utilPct)}%`, backgroundColor: statusColor }} />
            </div>
            <p className="text-[10px] mt-2 leading-tight" style={{ color: T.body }}>
              {utilPct < 75 ? 'Healthy buffer. Room for hospitality.' : utilPct < 90 ? 'High load. Queue forming at peak.' : 'Critical congestion. SLA at risk.'}
            </p>
          </LabModule>

          {/* Slider 2: Baristas (6 cols) */}
          <LabModule span="col-span-12 lg:col-span-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12.5px] font-bold" style={{ color: T.heading }}>Active Baristas (c)</span>
              <span className="font-mono text-xs font-bold tabular-nums px-2 py-0.5 rounded-md" style={{ color: T.caramel, backgroundColor: T.surface, border: `1px solid ${T.lineWarm}` }}>
                {baristas}
              </span>
            </div>
            <input type="range" min="1" max="4" step="1" value={baristas} onChange={e => setBaristas(+e.target.value)} className="w-full accent-[#D69A59] cursor-pointer" />
            <div className="flex justify-between text-[9px] font-mono mt-1" style={{ color: T.dim }}>
              <span>1 Solo</span><span>2 Standard</span><span>3 Expedite</span><span>4 Max</span>
            </div>
          </LabModule>

          {/* Slider 3: Prep Time (6 cols) */}
          <LabModule span="col-span-12 lg:col-span-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12.5px] font-bold" style={{ color: T.heading }}>Assembly Time (T<sub className="text-[9px]">s</sub>)</span>
              <span className="font-mono text-xs font-bold tabular-nums px-2 py-0.5 rounded-md" style={{ color: T.caramel, backgroundColor: T.surface, border: `1px solid ${T.lineWarm}` }}>
                {prepTimeSec}s
              </span>
            </div>
            <input type="range" min="45" max="150" step="5" value={prepTimeSec} onChange={e => setPrepTimeSec(+e.target.value)} className="w-full accent-[#D69A59] cursor-pointer" />
            <div className="flex justify-between text-[9px] font-mono mt-1" style={{ color: T.dim }}>
              <span>45s Americano</span><span>90s Latte</span><span>150s Complex</span>
            </div>
          </LabModule>

          {/* SLA Result — Feature module (8 cols) */}
          <LabModule span="col-span-12 lg:col-span-8" className={slaBreach ? '' : ''}>
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider block" style={{ color: T.muted }}>Total Order Time (Queue + Prep)</span>
                <span className="text-3xl font-black tabular-nums" style={{ color: T.heading }}>{totalMin} <span className="text-sm font-medium" style={{ color: T.muted }}>min</span></span>
              </div>
              <div className="text-right">
                <span className="font-mono text-[9px] uppercase tracking-wider block" style={{ color: T.muted }}>8-Min SLA</span>
                <span className="font-mono text-xs font-bold uppercase px-2 py-0.5 rounded-md inline-block mt-0.5" style={{ color: slaBreach ? T.danger : T.success, backgroundColor: T.surface, border: `1px solid ${slaBreach ? T.danger : T.success}40` }}>
                  {slaBreach ? 'Breached' : 'Within SLA'}
                </span>
              </div>
            </div>
            <div className="mt-2 pt-2 flex justify-between text-[10px] font-mono tabular-nums" style={{ color: T.muted, borderTop: `1px solid ${T.lineSubtle}` }}>
              <span>Queue Wait: ~{waitMin} min</span>
              <span>Active Prep: {(prepTimeSec / 60).toFixed(1)} min</span>
            </div>
          </LabModule>

          {/* Bottleneck Diagnostic (4 cols) */}
          <LabModule span="col-span-12 lg:col-span-4">
            <span className="font-mono text-[10px] uppercase font-bold block mb-1" style={{ color: T.caramel }}>Bottleneck Analysis</span>
            <p className="text-[11px] leading-snug" style={{ color: T.body }}>
              {utilPct > 85
                ? 'Primary constraint: Barista assembly station. Consider adding an expedite cell or pre-staging milk.'
                : 'Assembly flow is smooth. Upstream roast batch testing remains the primary constraint.'}
            </p>
          </LabModule>

          {/* Field Benchmarks (full width) */}
          <LabModule span="col-span-12">
            <span className="font-mono text-[10px] uppercase font-bold block mb-2" style={{ color: T.caramel }}>Field Benchmark Reference</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { label: 'Grinding', value: '6–7 sec' },
                { label: 'Extraction', value: '25–30 sec' },
                { label: 'Steaming', value: '~60 sec' },
                { label: 'Delivery SLA', value: '≤ 8 min' },
              ].map((b, i) => (
                <div key={i} className="rounded-xl px-3 py-2" style={{ backgroundColor: T.surface, border: `1px solid ${T.lineSubtle}` }}>
                  <span className="text-[9px] font-mono uppercase block" style={{ color: T.muted }}>{b.label}</span>
                  <span className="text-sm font-bold tabular-nums" style={{ color: T.sub }}>{b.value}</span>
                </div>
              ))}
            </div>
          </LabModule>
        </div>
      </div>
    </div>
  );
};
