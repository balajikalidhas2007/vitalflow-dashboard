import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { SummaryRow } from '../components/SummaryRow';
import { FilterBar, type FilterStatus } from '../components/FilterBar';
import { BedCard } from '../components/BedCard';
import { AddDeviceModal } from '../components/AddDeviceModal';
import type { DashboardOutletContext } from '../layouts/DashboardLayout';
import { useIVStore } from '../context/IVStoreContext';
import type { BedData } from '../types';
import { BedDouble, Play, Pause, Activity } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const context = useOutletContext<DashboardOutletContext>();
  const isAddDeviceOpen = context?.isAddDeviceOpen || false;
  const setIsAddDeviceOpen = context?.setIsAddDeviceOpen || (() => {});

  const { beds, addBed, isSimulatorRunning, toggleSimulator } = useIVStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeStatus, setActiveStatus] = useState<FilterStatus>('ALL');

  const handleAddDevice = (newBed: BedData) => {
    addBed(newBed);
  };

  // Filter beds based on search & status pill
  const filteredBeds = beds.filter((bed) => {
    const matchesSearch =
      bed.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bed.bedNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bed.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (bed.deviceId && bed.deviceId.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      activeStatus === 'ALL' ? true : bed.status === activeStatus;

    return matchesSearch && matchesStatus;
  });

  // Calculate dynamic metrics
  const activeAlertsCount = beds.filter((b) => b.status === 'CRITICAL' || b.status === 'LOW').length;
  const devicesOnlineCount = beds.filter((b) => b.status !== 'OFFLINE').length;
  const devicesOfflineCount = beds.filter((b) => b.status === 'OFFLINE').length;
  const bedsRegisteredCount = beds.length;

  return (
    <div className="space-y-6">
      {/* Live Telemetry Simulator Controller Banner */}
      <div className="glass-card p-3.5 px-5 rounded-2xl border border-cyan-500/20 bg-cyan-950/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            {isSimulatorRunning ? (
              <>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500" />
              </>
            ) : (
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500" />
            )}
          </div>
          <div>
            <span className="font-bold text-white flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              Telemetry Simulator Stream: {isSimulatorRunning ? 'TICKING (3s Payload Sync)' : 'PAUSED'}
            </span>
            <p className="text-slate-400 text-[11px]">
              Simulating ESP32 load cell weight readings &amp; predictive depletion engine
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={toggleSimulator}
          className={`px-4 py-1.5 rounded-xl font-extrabold flex items-center gap-1.5 transition-all shadow-md cursor-pointer ${
            isSimulatorRunning
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30'
              : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-cyan-500/20'
          }`}
        >
          {isSimulatorRunning ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              Pause Simulator
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              Resume Simulator
            </>
          )}
        </button>
      </div>

      {/* Top Metrics Row */}
      <SummaryRow
        activeAlertsCount={activeAlertsCount}
        devicesOnlineCount={devicesOnlineCount}
        devicesOfflineCount={devicesOfflineCount}
        bedsRegisteredCount={bedsRegisteredCount}
      />

      {/* Filter and Search Bar */}
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeStatus={activeStatus}
        onStatusChange={setActiveStatus}
      />

      {/* Bed Cards CSS Grid */}
      {filteredBeds.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBeds.map((bed) => (
            <BedCard key={bed.id} bed={bed} />
          ))}
        </div>
      ) : (
        <div className="glass-panel p-12 rounded-2xl border border-slate-800 text-center space-y-3 my-8">
          <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-500 flex items-center justify-center mx-auto">
            <BedDouble className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">No Beds Found</h3>
          <p className="text-sm text-slate-400 max-w-sm mx-auto">
            No patient beds match your current search query or filter selection.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveStatus('ALL');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold text-xs transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Add Device Modal Dialog */}
      <AddDeviceModal
        isOpen={isAddDeviceOpen}
        onClose={() => setIsAddDeviceOpen(false)}
        onAddDevice={handleAddDevice}
      />
    </div>
  );
};

export default Dashboard;
