import React from 'react';
import { Search } from 'lucide-react';

export type FilterStatus = 'ALL' | 'CRITICAL' | 'LOW' | 'NORMAL' | 'OFFLINE' | 'WAITING';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeStatus: FilterStatus;
  onStatusChange: (status: FilterStatus) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  activeStatus,
  onStatusChange
}) => {
  const filterOptions: { label: string; value: FilterStatus }[] = [
    { label: 'ALL', value: 'ALL' },
    { label: 'CRITICAL', value: 'CRITICAL' },
    { label: 'LOW', value: 'LOW' },
    { label: 'NORMAL', value: 'NORMAL' },
    { label: 'OFFLINE', value: 'OFFLINE' },
    { label: 'WAITING', value: 'WAITING' },
  ];

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 py-2">
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search patient, bed, device..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
        />
      </div>

      {/* Filter Status Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {filterOptions.map((opt) => {
          const isActive = activeStatus === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onStatusChange(opt.value)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-extrabold'
                  : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              {opt.label}
            </button>
          );
        })}

        {/* Clear filter button */}
        {(activeStatus !== 'ALL' || searchQuery.length > 0) && (
          <button
            type="button"
            onClick={() => {
              onStatusChange('ALL');
              onSearchChange('');
            }}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
          >
            ✕ Clear
          </button>
        )}
      </div>
    </div>
  );
};
