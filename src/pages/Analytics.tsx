import React, { useState } from 'react';
import { BarChart3, TrendingUp, Droplets, Activity, Layers } from 'lucide-react';

export const Analytics: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'24h' | '7d' | '30d'>('24h');

  // Simulated bar chart data
  const chartBars = [
    { label: '00:00', value: 45, height: '45%' },
    { label: '02:00', value: 60, height: '60%' },
    { label: '04:00', value: 30, height: '30%' },
    { label: '06:00', value: 85, height: '85%' },
    { label: '08:00', value: 95, height: '95%' },
    { label: '10:00', value: 70, height: '70%' },
    { label: '12:00', value: 55, height: '55%' },
    { label: '14:00', value: 90, height: '90%' },
    { label: '16:00', value: 75, height: '75%' },
    { label: '18:00', value: 40, height: '40%' },
    { label: '20:00', value: 65, height: '65%' },
    { label: '22:00', value: 50, height: '50%' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Clinical Analytics &amp; Flow Trends</h1>
            <p className="text-xs text-slate-400">
              Ward-wide infusion rate analytics, volumetric consumption, and depletion historical data
            </p>
          </div>
        </div>

        {/* Timeframe selector */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
          {(['24h', '7d', '30d'] as const).map((tf) => (
            <button
              key={tf}
              type="button"
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                timeframe === tf
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tf.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Recreated Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
            <span>TOTAL INFUSIONS</span>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">24</div>
          <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            +12% vs yesterday
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
            <span>AVG FLOW RATE</span>
            <Droplets className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">
            4.2 <span className="text-sm font-normal text-slate-400">mL/min</span>
          </div>
          <div className="text-[11px] text-slate-400">Within target infusion range</div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
            <span>TOTAL VOLUMETRIC</span>
            <Layers className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">
            14.8 <span className="text-sm font-normal text-slate-400">Leters</span>
          </div>
          <div className="text-[11px] text-slate-400">Administered past 24 hrs</div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
            <span>WARD EFFICIENCY</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400">98.4%</div>
          <div className="text-[11px] text-slate-400">Zero manual bag run-outs</div>
        </div>
      </div>

      {/* Bar Chart Section */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Hourly Volumetric Flow Analytics</h3>
            <p className="text-xs text-slate-400">Volumetric output consumption across Ward A (mL/hr)</p>
          </div>
          <span className="text-xs text-cyan-400 font-mono bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20 font-semibold">
            LIVE TELEMETRY FEED
          </span>
        </div>

        {/* Visual Bar Chart */}
        <div className="h-64 flex items-end justify-between gap-2 pt-8 pb-4 px-4 bg-slate-950/60 rounded-xl border border-slate-800/80">
          {chartBars.map((bar, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
              <div
                style={{ height: bar.height }}
                className="w-full max-w-[28px] bg-gradient-to-t from-cyan-500/40 via-cyan-400 to-blue-500 rounded-t-md transition-all duration-300 group-hover:brightness-125 group-hover:scale-y-105 relative"
              >
                {/* Tooltip on hover */}
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-lg pointer-events-none transition-opacity">
                  {bar.value} mL
                </div>
              </div>
              <span className="text-[10px] font-mono text-slate-500 mt-2">
                {bar.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Fluid Distribution Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-white">Saline 0.9%</span>
            <span className="text-xs font-bold text-cyan-400">58% Total</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-cyan-500 h-full w-[58%]" />
          </div>
          <p className="text-xs text-slate-400">14 Active Infusions • Avg 4.0 mL/min</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-white">Dextrose 5%</span>
            <span className="text-xs font-bold text-indigo-400">25% Total</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-indigo-500 h-full w-[25%]" />
          </div>
          <p className="text-xs text-slate-400">6 Active Infusions • Avg 2.1 mL/min</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-white">Ringer's Lactate</span>
            <span className="text-xs font-bold text-teal-400">17% Total</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-teal-400 h-full w-[17%]" />
          </div>
          <p className="text-xs text-slate-400">4 Active Infusions • Avg 3.5 mL/min</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
