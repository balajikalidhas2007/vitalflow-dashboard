import React from 'react';
import { Plus, Hospital } from 'lucide-react';

interface AppHeaderProps {
  onOpenAddDevice?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ onOpenAddDevice }) => {
  return (
    <header className="h-16 bg-slate-800/90 border-b border-slate-700/60 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20 shadow-md">
      {/* Contextual Title Area */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-slate-700/60 border border-slate-600/50 flex items-center justify-center text-cyan-400">
          <Hospital className="w-4 h-4 text-cyan-400" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
            WARD: General Ward A
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 font-medium">
              ICU Wing 2
            </span>
          </h2>
          <p className="text-xs text-slate-400">
            Real-time telemetry stream &amp; automated vital telemetry
          </p>
        </div>
      </div>

      {/* Right Side Actions & Status */}
      <div className="flex items-center gap-4">
        {/* Status Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-700/60 text-xs font-medium text-slate-200">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-slate-300">Monitoring Active</span>
        </div>

        {/* Add Device Button */}
        <button
          type="button"
          onClick={onOpenAddDevice}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-cyan-500/20 active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add Device</span>
        </button>
      </div>
    </header>
  );
};
