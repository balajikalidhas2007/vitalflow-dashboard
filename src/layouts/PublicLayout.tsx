import { Outlet } from 'react-router-dom';
import { PublicNavbar } from '../components/PublicNavbar';
import { PublicFooter } from '../components/PublicFooter';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased">
      <PublicNavbar />
      <main className="flex-1 bg-slate-900">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
};
