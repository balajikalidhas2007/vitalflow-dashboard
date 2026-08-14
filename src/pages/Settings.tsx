import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Cpu,
  Users,
  Sliders,
  Scale,
  Shield,
  FileText,
  Save,
  CheckCircle2,
  History
} from 'lucide-react';
import { useIVStore } from '../context/IVStoreContext';

export const Settings: React.FC = () => {
  const { settings, updateSettings, auditLogs, addAuditLog, beds } = useIVStore();

  const [activeTab, setActiveTab] = useState<'Devices' | 'Patients' | 'Features' | 'Calibration' | 'System' | 'Audit Log'>('System');

  // Form local states for System tab
  const [offlineTimeoutSec, setOfflineTimeoutSec] = useState(settings.offlineTimeoutSec);
  const [criticalThreshold, setCriticalThreshold] = useState(settings.criticalThreshold);
  const [lowThreshold, setLowThreshold] = useState(settings.lowThreshold);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveSystem = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      offlineTimeoutSec: Number(offlineTimeoutSec),
      criticalThreshold: Number(criticalThreshold),
      lowThreshold: Number(lowThreshold),
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const tabs = [
    { id: 'System', label: 'System', icon: Shield },
    { id: 'Devices', label: 'Devices', icon: Cpu },
    { id: 'Patients', label: 'Patients', icon: Users },
    { id: 'Features', label: 'Features', icon: Sliders },
    { id: 'Calibration', label: 'Calibration', icon: Scale },
    { id: 'Audit Log', label: 'Audit Log', icon: FileText },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <SettingsIcon className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">System Admin &amp; Settings</h1>
            <p className="text-xs text-slate-400">
              Configure telemetry alert thresholds, manage ESP32 hardware units, and view audit history
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-extrabold'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800/80 hover:text-white hover:border-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}

      {/* 1. SYSTEM TAB */}
      {activeTab === 'System' && (
        <div className="space-y-6">
          <form onSubmit={handleSaveSystem} className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white">Telemetry &amp; Threshold Configuration</h3>
                <p className="text-xs text-slate-400">Adjust automated alert triggers and offline timeout parameters</p>
              </div>
              {isSaved && (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold animate-fadeIn">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Settings Saved
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Critical Threshold */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-red-400 uppercase tracking-wider">
                  CRITICAL THRESHOLD (%)
                </label>
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={criticalThreshold}
                  onChange={(e) => setCriticalThreshold(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-base focus:border-cyan-500 focus:outline-none"
                />
                <p className="text-[11px] text-slate-400">
                  Beds below this percentage sort first and glow red.
                </p>
              </div>

              {/* Low Threshold */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider">
                  LOW THRESHOLD (%)
                </label>
                <input
                  type="number"
                  min={criticalThreshold + 1}
                  max={80}
                  value={lowThreshold}
                  onChange={(e) => setLowThreshold(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-base focus:border-cyan-500 focus:outline-none"
                />
                <p className="text-[11px] text-slate-400">
                  Triggers amber warning status for nurses.
                </p>
              </div>

              {/* Offline Timeout */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  OFFLINE TIMEOUT (SECONDS)
                </label>
                <input
                  type="number"
                  min={10}
                  max={300}
                  value={offlineTimeoutSec}
                  onChange={(e) => setOfflineTimeoutSec(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-base focus:border-cyan-500 focus:outline-none"
                />
                <p className="text-[11px] text-slate-400">
                  Time missing Wi-Fi heartbeat before device is marked offline.
                </p>
              </div>
            </div>

            {/* GRADIENT ALERT THRESHOLD PREVIEW BAR */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Alert Threshold Preview
              </h4>

              <div className="h-10 w-full rounded-xl overflow-hidden flex font-bold text-[11px] text-slate-950 shadow-inner">
                {/* Critical Segment */}
                <div
                  style={{ width: `${criticalThreshold}%` }}
                  className="bg-gradient-to-r from-red-600 to-red-500 flex items-center justify-center px-2 text-white transition-all duration-300 relative group"
                >
                  <span className="truncate">CRITICAL (0-{criticalThreshold}%)</span>
                </div>

                {/* Low Warning Segment */}
                <div
                  style={{ width: `${lowThreshold - criticalThreshold}%` }}
                  className="bg-gradient-to-r from-amber-500 to-amber-400 flex items-center justify-center px-2 transition-all duration-300 relative group"
                >
                  <span className="truncate">LOW ({criticalThreshold}-{lowThreshold}%)</span>
                </div>

                {/* Normal Segment */}
                <div
                  style={{ width: `${100 - lowThreshold}%` }}
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 flex items-center justify-center px-2 transition-all duration-300 relative group"
                >
                  <span className="truncate">NORMAL ({lowThreshold}-100%)</span>
                </div>
              </div>

              <div className="flex justify-between text-[11px] font-mono text-slate-500 px-1">
                <span>0% Empty</span>
                <span>{criticalThreshold}% Critical</span>
                <span>{lowThreshold}% Low</span>
                <span>100% Full</span>
              </div>
            </div>

            {/* Submit Action */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-cyan-500/20 active:scale-95 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save System Thresholds</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 2. AUDIT LOG TAB */}
      {activeTab === 'Audit Log' && (
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <History className="w-4 h-4 text-cyan-400" />
                Chronological System Audit Trail
              </h3>
              <p className="text-xs text-slate-400">Complete log of system events, sensor registrations, and threshold alerts</p>
            </div>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20">
              {auditLogs.length} Events Recorded
            </span>
          </div>

          <div className="space-y-3">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="glass-card p-4 rounded-xl border border-slate-800 flex items-center justify-between gap-4 hover:border-slate-700 transition-all text-xs"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2.5 py-1 rounded-md font-bold text-[10px] uppercase border ${
                      log.category === 'ALERT'
                        ? 'bg-red-500/20 text-red-400 border-red-500/30'
                        : log.category === 'DEVICE'
                        ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    {log.category}
                  </span>
                  <div>
                    <h4 className="font-bold text-white text-sm">{log.action}</h4>
                    <p className="text-slate-400 text-xs">{log.details}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-slate-400 font-mono text-[11px] block">{log.timestamp}</span>
                  <span className="text-[10px] text-slate-500">By: {log.actor}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. DEVICES TAB */}
      {activeTab === 'Devices' && (
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white">Registered ESP32 Telemetry Hardware</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {beds.map((b) => (
              <div key={b.id} className="glass-card p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{b.deviceId || 'ESP32-GENERIC'}</h4>
                    <p className="text-xs text-slate-400">Assigned to Bed {b.bedNumber} ({b.patientName})</p>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${b.status === 'OFFLINE' ? 'bg-slate-800 text-slate-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                  {b.status === 'OFFLINE' ? 'Offline' : 'Online'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. PATIENTS TAB */}
      {activeTab === 'Patients' && (
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white">Admitted Patients &amp; Bed Assignments</h3>
          <div className="space-y-3">
            {beds.map((b) => (
              <div key={b.id} className="glass-card p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">{b.patientName} (MRN: {b.patientId})</h4>
                  <p className="text-xs text-slate-400">Bed {b.bedNumber} • {b.ward || 'General Ward A'}</p>
                </div>
                <span className="text-xs font-mono text-cyan-400 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                  {b.volumeLeftMl} mL Remaining
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. FEATURES TAB */}
      {activeTab === 'Features' && (
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
          <h3 className="text-base font-bold text-white">System Modules &amp; Feature Toggles</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-950/60 rounded-xl border border-slate-800">
              <div>
                <h4 className="font-bold text-white text-sm">Predictive Depletion Engine</h4>
                <p className="text-xs text-slate-400">Calculate empty times dynamically using historical consumption rate deltas</p>
              </div>
              <input type="checkbox" defaultChecked className="toggle cursor-pointer accent-cyan-500 w-5 h-5" />
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-950/60 rounded-xl border border-slate-800">
              <div>
                <h4 className="font-bold text-white text-sm">Automated Severity Auto-Sorting</h4>
                <p className="text-xs text-slate-400">Prioritize Critical and Low warning beds at the top of nurse station views</p>
              </div>
              <input type="checkbox" defaultChecked className="toggle cursor-pointer accent-cyan-500 w-5 h-5" />
            </div>
          </div>
        </div>
      )}

      {/* 6. CALIBRATION TAB */}
      {activeTab === 'Calibration' && (
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
          <h3 className="text-base font-bold text-white">HX711 Load Cell Amplifier Calibration</h3>
          <p className="text-xs text-slate-400">Tare scale offsets and calibrate gain factors for IV weight sensors</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-cyan-400 uppercase">Scale Factor Offset</span>
              <input type="text" defaultValue="420.5" className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono text-sm" />
              <button
                type="button"
                onClick={() => addAuditLog('Scale Tared', 'Zeroed tare weight offset for ESP32-A1', 'CALIBRATION', 'Nurse Admin')}
                className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold text-xs rounded-lg hover:bg-cyan-400 transition-colors"
              >
                Tare Scale (Zero Offset)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
