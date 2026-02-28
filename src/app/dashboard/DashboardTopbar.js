'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logoutUser } from '../../app/store/slices/authSlice';
import { HOME_ROUTE } from '@/utils/routes.constant';
import { LogOut } from 'lucide-react';

export default function DashboardTopbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await dispatch(logoutUser()).unwrap();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      router.push(HOME_ROUTE); // always redirect, even if API call fails
    }
  };

  return (
    <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-rose-100 shadow-sm flex-shrink-0">

      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="relative w-8 h-8">
          <Image
            src="/logo.png"
            alt="Mootcourt"
            fill
            className="object-contain"
            sizes="32px"
          />
        </div>
        <span className="text-sm font-bold tracking-widest uppercase text-rose-800 hidden sm:block">
          MootCourt AI
        </span>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        disabled={loggingOut}
        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-rose-100 bg-rose-50
          text-rose-700 text-sm font-semibold tracking-wide
          hover:bg-rose-100 hover:border-rose-300 active:scale-95
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-150"
      >
        {loggingOut
          ? <span className="w-4 h-4 border-2 border-rose-300 border-t-rose-600 rounded-full animate-spin" />
          : <LogOut size={15} />
        }
        <span>{loggingOut ? 'Logging out…' : 'Logout'}</span>
      </button>

    </header>
  );
}