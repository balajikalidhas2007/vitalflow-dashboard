import React from 'react';
import { BellOff, Bell, CheckCircle2, AlertTriangle, ShieldCheck, Trash2 } from 'lucide-react';
import { useIVStore } from '../context/IVStoreContext';

export const Alerts: React.FC = () => {
  const { alerts, acknowledgeAlert, clearAlerts } = useIVStore();

  const activeUnacknowledged = alerts.filter((a) => !a.acknowledged);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              Clinical Alert Feed
              {activeUnacknowledged.length > 0 && (
                <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-extrabold animate-pulse">
                  {activeUnacknowledged.length} ACTIVE
                </span>
              )}
            </h1>
            <p className="text-xs text-slate-400">
              Real-time fluid level notifications, depletion warnings, and threshold triggers
            </p>
          </div>
        </div>

        {alerts.length > 0 && (
          <button
            type="button"
            onClick={clearAlerts}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4 text-slate-400" />
            <span>Clear All Alerts</span>
          </button>
        )}
      </div>

      {/* Alerts List or All Clear Empty State */}
      {alerts.length === 0 ? (
        /* RECREATE "ALL CLEAR" EMPTY STATE WITH SLASHED BELL ICON */
        <div className="glass-panel p-16 rounded-2xl border border-slate-800/80 text-center flex flex-col items-center justify-center space-y-4 my-8">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shadow-inner">
              <BellOff className="w-10 h-10" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center border-2 border-slate-950">
              <CheckCircle2 className="w-4 h-4 stroke-[3]" />
            </div>
          </div>
          <div className="space-y-1 max-w-sm">
            <h2 className="text-2xl font-extrabold text-white">All Clear</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              No active alerts or critical fluid depletion warnings across monitored ward beds.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Telemetry engine continuously monitoring</span>
          </div>
        </div>
      ) : (
        /* Active Alerts Feed */
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`glass-card p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all ${
                alert.type === 'CRITICAL'
                  ? 'border-red-500/40 bg-red-950/10'
                  : 'border-amber-500/40 bg-amber-950/10'
              } ${alert.acknowledged ? 'opacity-60 grayscale-[30%]' : ''}`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    alert.type === 'CRITICAL'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-white text-base">
                      Bed {alert.bedNumber} - {alert.patientName}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      (ID: {alert.patientId})
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                        alert.type === 'CRITICAL'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {alert.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {alert.message}
                  </p>
                  <span className="text-[10px] text-slate-500 font-mono block">
                    Triggered at {alert.timestamp}
                  </span>
                </div>
              </div>

              {!alert.acknowledged ? (
                <button
                  type="button"
                  onClick={() => acknowledgeAlert(alert.id)}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  Acknowledge
                </button>
              ) : (
                <span className="px-3 py-1 rounded-lg bg-slate-800 text-emerald-400 text-xs font-semibold flex items-center gap-1 border border-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Acknowledged
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Alerts;
