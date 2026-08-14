import React, { useState } from 'react';
import { X, Cpu, Bed, User, Hash, Scale, FileText } from 'lucide-react';
import type { BedData } from '../types';

interface AddDeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDevice: (newBed: BedData) => void;
}

export const AddDeviceModal: React.FC<AddDeviceModalProps> = ({
  isOpen,
  onClose,
  onAddDevice
}) => {
  const [deviceId, setDeviceId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientId, setPatientId] = useState('');
  const [age, setAge] = useState('');
  const [ward, setWard] = useState('General Ward A');
  const [bedNumber, setBedNumber] = useState('');
  const [bagWeightGrams, setBagWeightGrams] = useState('550');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bedNumber || !patientName || !patientId) return;

    // Calculate approximate initial volume from bag weight (assuming ~50g empty container)
    const totalVol = Math.max(0, parseInt(bagWeightGrams) - 50) || 500;

    const newBed: BedData = {
      id: `bed-${Date.now()}`,
      bedNumber: bedNumber || '01',
      patientName: patientName || 'New Patient',
      patientId: patientId || 'ID-000000',
      percentage: 100,
      volumeLeftMl: totalVol,
      totalVolumeMl: totalVol,
      estCompletion: 'Just Started',
      status: 'NORMAL',
      lastSeenText: 'Just now',
      deviceId: deviceId || `ESP32-${Math.floor(100 + Math.random() * 900)}`,
      ward: ward
    };

    onAddDevice(newBed);
    onClose();

    // Reset form
    setDeviceId('');
    setPatientName('');
    setPatientId('');
    setAge('');
    setBedNumber('');
    setBagWeightGrams('550');
    setNotes('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel w-full max-w-lg rounded-2xl border border-slate-700/80 shadow-2xl overflow-hidden text-slate-100 relative">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Add Monitoring Device</h2>
              <p className="text-xs text-slate-400">
                Register a new ESP32 sensor to a patient bed
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Device ID & Ward Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                DEVICE ID
              </label>
              <input
                type="text"
                placeholder="e.g. ESP32-A1"
                value={deviceId}
                onChange={(e) => setDeviceId(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Bed className="w-3.5 h-3.5 text-cyan-400" />
                WARD
              </label>
              <select
                value={ward}
                onChange={(e) => setWard(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="General Ward A">General Ward A</option>
                <option value="ICU Wing 1">ICU Wing 1</option>
                <option value="ICU Wing 2">ICU Wing 2</option>
                <option value="Emergency Ward">Emergency Ward</option>
              </select>
            </div>
          </div>

          {/* Patient Name & MRN */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-cyan-400" />
                PATIENT NAME
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Sarah Connor"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-cyan-400" />
                PATIENT ID / MRN
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 123546"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Bed Number, Age, Weight */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Bed className="w-3.5 h-3.5 text-cyan-400" />
                BED NUMBER
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 13"
                value={bedNumber}
                onChange={(e) => setBedNumber(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                AGE
              </label>
              <input
                type="number"
                placeholder="e.g. 45"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-cyan-400" />
                IV WEIGHT (G)
              </label>
              <input
                type="number"
                placeholder="e.g. 550"
                value={bagWeightGrams}
                onChange={(e) => setBagWeightGrams(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              NOTES (OPTIONAL)
            </label>
            <textarea
              rows={2}
              placeholder="Add clinical observations or infusion specs..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-cyan-500/20 active:scale-95 cursor-pointer"
            >
              Register Device
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
