import { Activity } from 'lucide-react';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-sm py-8 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-cyan-400" />
          <span className="font-bold text-slate-200">VitalFlow Clinical Suite</span>
        </div>
        <p className="text-xs text-slate-500">
          &copy; {new Date().getFullYear()} VitalFlow Monitoring Systems. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
