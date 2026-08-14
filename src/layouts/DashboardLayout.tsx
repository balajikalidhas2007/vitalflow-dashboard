import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AppSidebar } from '../components/AppSidebar';
import { AppHeader } from '../components/AppHeader';

export interface DashboardOutletContext {
  isAddDeviceOpen: boolean;
  setIsAddDeviceOpen: (open: boolean) => void;
  openAddDevice: () => void;
}

export const DashboardLayout: React.FC = () => {
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);

  const openAddDevice = () => setIsAddDeviceOpen(true);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans antialiased">
      {/* Fixed Left Sidebar */}
      <AppSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen pl-64">
        <AppHeader onOpenAddDevice={openAddDevice} />
        <main className="flex-1 p-6 lg:p-8 bg-slate-950 overflow-y-auto">
          <Outlet context={{ isAddDeviceOpen, setIsAddDeviceOpen, openAddDevice }} />
        </main>
      </div>
    </div>
  );
};
