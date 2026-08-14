import { NavLink } from 'react-router-dom';
import { Activity, LayoutDashboard, Bell, BarChart3, Settings } from 'lucide-react';

export const AppSidebar: React.FC = () => {
  const mainNavItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Alerts', path: '/alerts', icon: Bell },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 min-h-screen flex flex-col fixed left-0 top-0 bottom-0 z-30 shadow-xl">
      {/* Brand Logo & Title */}
      <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-800/80 bg-slate-900/50">
        <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-inner">
          <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
        </div>
        <div>
          <span className="text-lg font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-cyan-400">
            VitalFlow
          </span>
          <span className="block text-[10px] uppercase tracking-widest text-cyan-400 font-semibold">
            Clinical Telemetry
          </span>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 py-6 px-4 space-y-6 overflow-y-auto">
        <div className="space-y-1">
          <div className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Main Navigation
          </div>
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-300 border-l-4 border-cyan-400 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-300'
                      }`}
                    />
                    <span>{item.name}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* SYSTEM Section */}
        <div className="space-y-1 pt-4 border-t border-slate-800/60">
          <div className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            SYSTEM
          </div>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-cyan-500/10 text-cyan-300 border-l-4 border-cyan-400 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Settings
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-300'
                  }`}
                />
                <span>Settings</span>
              </>
            )}
          </NavLink>
        </div>
      </div>

      {/* Footer / System Status */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-900/80 text-xs text-slate-400">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            VITAL-OS v2.4
          </span>
          <span className="text-[10px] text-slate-400">Online</span>
        </div>
      </div>
    </aside>
  );
};
