// DashboardTopbar.js
'use client';
import React from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logoutUser } from '../../app/store/slices/authSlice';
import styles from '../styles/styles';
import { HOME_ROUTE } from '@/utils/routes.constant';

export default function DashboardTopbar() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      router.push(HOME_ROUTE); // Redirect to homepage
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="flex items-center justify-between p-4 bg-stone-50 text-stone-800 shadow-md border-b border-stone-200">
      <div className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="Mootcourt"
          width={40}
          height={40}
          className="object-contain"
        />
      </div>
      <button onClick={handleLogout} className={styles.primaryBtn}>
        Logout
      </button>
    </header>
  );
}
