'use client';

import React from 'react';
import Image from 'next/image';
import useDashboardData from './useDashboardData';
import styles  from '../styles/styles';
export default function DashboardTopbar() {
  const { logout } = useDashboardData();

  return (
    <header className="flex items-center justify-between p-4 bg-stone-50 text-stone-800 shadow-md border-b border-stone-200">
      <div className="flex items-center gap-2">
        <Image
          src="/logo.png" 
          alt="MootCoach Logo"
          width={40}
          height={40}
          className="object-contain"
        />
      </div>

      <button
        onClick={logout}
        className={styles.primaryBtn}
      >
        Logout
      </button>
    </header>
  );
}
