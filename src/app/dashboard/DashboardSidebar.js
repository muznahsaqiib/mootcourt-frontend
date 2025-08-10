'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from '../store/slices/authSlice';
import {
  Home,
  BookOpen,
  User,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import clsx from 'clsx';
import { DASHBOARD_ROUTE, PROFILE_ROUTE, LOGIN_ROUTE } from '@/utils/routes.constant';

const links = [
  { href: DASHBOARD_ROUTE, label: 'Dashboard', icon: Home },
  { href: '/cases', label: 'My Cases', icon: BookOpen },
  { href: PROFILE_ROUTE, label: 'Profile', icon: User },
];

export default function DashboardSidebar({ collapsed, setCollapsed }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      dispatch(fetchCurrentUser())
        .unwrap()
        .catch(() => router.push(LOGIN_ROUTE));
    }
  }, [dispatch, router, user]);

  const username = user?.username
    ? user.username.charAt(0).toUpperCase() + user.username.slice(1)
    : 'User';

  return (
    <div
      className={clsx(
        'h-full bg-stone-50 border-r border-stone-200 p-4 flex flex-col transition-all duration-150 ease-in-out',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* User info */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 rounded-full bg-rose-800 flex items-center justify-center text-stone-50 font-bold text-lg">
          {username.charAt(0)}
        </div>
        {!collapsed && (
          <div className="flex flex-col max-w-[10rem] overflow-hidden">
            <h1 className="text-md font-semibold text-stone-800 leading-tight break-words line-clamp-2">
              {username}
            </h1>
            <h4 className="text-sm text-stone-600 leading-snug break-words line-clamp-2">
              {user?.email || 'user@example.com'}
            </h4>
          </div>
        )}
      </div>

      {/* Collapse button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded hover:bg-rose-100 transition"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex flex-col gap-2 flex-1">
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex items-center gap-3 px-3 py-2 rounded transition-all group',
                collapsed ? 'justify-center' : 'justify-start',
                isActive
                  ? 'bg-rose-800 text-white font-semibold'
                  : 'hover:bg-rose-100 text-stone-800'
              )}
            >
              <Icon
                size={20}
                className={clsx(
                  'transition',
                  isActive
                    ? 'text-white'
                    : 'text-rose-500 group-hover:text-rose-700'
                )}
              />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
