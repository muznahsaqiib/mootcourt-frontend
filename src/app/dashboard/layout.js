'use client';

import DashboardSidebar from './DashboardSidebar';
import DashboardTopbar from './DashboardTopbar';

import { Provider } from 'react-redux';
import store from '../store/store';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import GlobalLoading from '@/components/GlobalLoading';

export default function DashboardLayout({ user, onLogout, children }) {
 
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Provider store={store}>
      

      <div className="h-screen flex overflow-hidden bg-stone-50 text-stone-800 font-inter">
        <div
          className={`h-full transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'
            }`}
        >
          <DashboardSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>
        
        <div className="flex flex-col flex-1 overflow-hidden">
          <DashboardTopbar user={user} onLogout={onLogout} />
          <GlobalLoading/>
          <main className="flex-1 overflow-y-auto px-6 py-4 transition-all duration-300">
            {children}
          </main>
        </div>
      </div>
    </Provider>
  );
}
