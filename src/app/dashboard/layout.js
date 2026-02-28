'use client';

import DashboardSidebar from './DashboardSidebar';
import DashboardTopbar from './DashboardTopbar';
import { Provider } from 'react-redux';
import store from '../store/store';
import { useState } from 'react';
import GlobalLoading from '@/components/GlobalLoading';

export default function DashboardLayout({ user, onLogout, children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Provider store={store}>
      <div className="h-screen flex overflow-hidden bg-stone-50 text-stone-800">

        {/* Sidebar */}
        <div className={`h-full flex-shrink-0 transition-all duration-200 ${collapsed ? 'w-[72px]' : 'w-56'}`}>
          <DashboardSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>

        {/* Main column */}
        <div className="flex flex-col flex-1 overflow-hidden min-w-0">
          <DashboardTopbar user={user} onLogout={onLogout} />
          <GlobalLoading />
          <main className="flex-1 overflow-y-auto bg-stone-50">
            {children}
          </main>
        </div>

      </div>
    </Provider>
  );
}