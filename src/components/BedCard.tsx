import React from 'react';
import { WifiOff, AlertTriangle, CheckCircle2, Clock, Activity } from 'lucide-react';
import type { BedData } from '../types';

export type { BedData };

interface BedCardProps {
  bed: BedData;
}

export const BedCard: React.FC<BedCardProps> = ({ bed }) => {
  const getStatusBadge = () => {
    switch (bed.status) {
      case 'CRITICAL':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-red-500/20 text-red-400 border border-red-500/30 uppercase tracking-wide flex items-center gap-1 animate-pulse">
            <AlertTriangle className="w-3 h-3" />
            CRITICAL
          </span>
        );
      case 'LOW':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase tracking-wide flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            LOW WARNING
          </span>
        );
      case 'NORMAL':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase tracking-wide flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            NORMAL
          </span>
        );
      case 'WAITING':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 uppercase tracking-wide flex items-center gap-1">
            <Activity className="w-3 h-3" />
            WAITING
          </span>
        );
      case 'OFFLINE':
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700/80 uppercase tracking-wide flex items-center gap-1">
            <WifiOff className="w-3 h-3" />
            OFFLINE
          </span>
        );
    }
  };

  const getCardBorder = () => {
    switch (bed.status) {
      case 'CRITICAL':
        return 'border-red-500/40 bg-red-950/10 shadow-lg shadow-red-500/5 hover:border-red-500/60';
      case 'LOW':
        return 'border-amber-500/40 bg-amber-950/10 shadow-lg shadow-amber-500/5 hover:border-amber-500/60';
      case 'NORMAL':
        return 'border-slate-800 bg-slate-900/60 hover:border-slate-700';
      case 'WAITING':
        return 'border-cyan-500/30 bg-cyan-950/10 hover:border-cyan-500/50';
      case 'OFFLINE':
      default:
        return 'border-slate-800/80 bg-slate-900/40 hover:border-slate-700';
    }
  };

  const getPercentageColor = () => {
    switch (bed.status) {
      case 'CRITICAL':
        return 'text-red-400';
      case 'LOW':
        return 'text-amber-400';
      case 'NORMAL':
        return 'text-emerald-400';
      case 'WAITING':
        return 'text-cyan-400';
      case 'OFFLINE':
      default:
        return 'text-slate-400';
    }
  };

  return (
    <div className={`glass-card p-5 rounded-2xl border flex flex-col justify-between transition-all duration-200 ${getCardBorder()}`}>
      {/* Header */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800/90 text-white font-extrabold text-lg flex items-center justify-center border border-slate-700/60 shadow-inner">
              {bed.bedNumber}
            </div>
            <div>
              <h3 className="text-base font-bold text-white leading-tight">
                {bed.patientName}
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                ID: {bed.patientId}
              </p>
            </div>
          </div>
          {getStatusBadge()}
        </div>

        {/* Body Percentage */}
        <div className="text-center py-5 my-1 bg-slate-950/40 rounded-xl border border-slate-800/50">
          <div className={`text-4xl font-black ${getPercentageColor()}`}>
            {bed.percentage}%
          </div>
          <div className="text-xs text-slate-400 font-medium mt-1">
            IV remaining
          </div>
        </div>
      </div>

      {/* Details & Footer */}
      <div className="space-y-3 pt-3">
        {/* Details Row */}
        <div className="grid grid-cols-2 gap-2 text-xs border-t border-slate-800/80 pt-3">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              VOLUME LEFT
            </span>
            <span className="text-white font-semibold text-sm">
              {bed.volumeLeftMl} ml
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              EST. COMPLETION
            </span>
            <span className={`font-semibold text-sm ${bed.status === 'CRITICAL' ? 'text-red-400 font-bold' : bed.status === 'LOW' ? 'text-amber-400 font-bold' : 'text-slate-300'}`}>
              {bed.estCompletion}
            </span>
          </div>
        </div>

        {/* Footer Status */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/40">
          <div className="flex items-center gap-1.5 text-slate-400">
            {bed.status === 'OFFLINE' ? (
              <WifiOff className="w-3.5 h-3.5 text-slate-400" />
            ) : (
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
            )}
            <span className="text-[11px] font-medium">{bed.lastSeenText}</span>
          </div>
          {bed.deviceId && (
            <span className="text-[10px] font-mono text-slate-400 px-1.5 py-0.5 rounded bg-slate-800">
              {bed.deviceId}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
