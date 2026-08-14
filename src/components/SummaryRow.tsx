import React from 'react';
import { AlertCircle, Wifi, WifiOff, Bed } from 'lucide-react';

interface SummaryRowProps {
  activeAlertsCount?: number;
  devicesOnlineCount?: number;
  devicesOfflineCount?: number;
  bedsRegisteredCount?: number;
}

export const SummaryRow: React.FC<SummaryRowProps> = ({
  activeAlertsCount = 0,
  devicesOnlineCount = 0,
  devicesOfflineCount = 1,
  bedsRegisteredCount = 1
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Metric 1: Active Alerts */}
      <div className="glass-card p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            ACTIVE ALERTS
          </span>
          <span className="text-3xl font-extrabold text-white">
            {activeAlertsCount}
          </span>
        </div>
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${activeAlertsCount > 0 ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-slate-800/80 border-slate-700/60 text-slate-400'}`}>
          <AlertCircle className="w-5 h-5" />
        </div>
      </div>

      {/* Metric 2: Devices Online */}
      <div className="glass-card p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            DEVICES ONLINE
          </span>
          <span className="text-3xl font-extrabold text-white">
            {devicesOnlineCount}
          </span>
        </div>
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${devicesOnlineCount > 0 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-slate-800/80 border-slate-700/60 text-slate-400'}`}>
          <Wifi className="w-5 h-5" />
        </div>
      </div>

      {/* Metric 3: Devices Offline */}
      <div className="glass-card p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            DEVICES OFFLINE
          </span>
          <span className="text-3xl font-extrabold text-white">
            {devicesOfflineCount}
          </span>
        </div>
        <div className="w-11 h-11 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-400 flex items-center justify-center">
          <WifiOff className="w-5 h-5" />
        </div>
      </div>

      {/* Metric 4: Beds Registered */}
      <div className="glass-card p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            BEDS REGISTERED
          </span>
          <span className="text-3xl font-extrabold text-white">
            {bedsRegisteredCount}
          </span>
        </div>
        <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
          <Bed className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};
