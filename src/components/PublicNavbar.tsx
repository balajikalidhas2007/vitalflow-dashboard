import { Link } from 'react-router-dom';
import { Activity, ArrowRight } from 'lucide-react';

export const PublicNavbar: React.FC = () => {
  return (
    <nav className="h-16 bg-slate-900/90 border-b border-slate-800 backdrop-blur-md px-6 lg:px-12 flex items-center justify-between sticky top-0 z-40">
      {/* Brand Logo */}
      <Link to="/" className="flex items-center gap-3 group">
        <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
          <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
        </div>
        <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-cyan-400">
          VitalFlow
        </span>
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
        <a href="/#features" className="hover:text-cyan-400 transition-colors">
          Features
        </a>
        <a href="/#how-it-works" className="hover:text-cyan-400 transition-colors">
          How it Works
        </a>
      </div>

      {/* Open Dashboard Action Button */}
      <Link
        to="/dashboard"
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-md shadow-cyan-500/20 active:scale-95"
      >
        <span>Open Dashboard</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </nav>
  );
};
