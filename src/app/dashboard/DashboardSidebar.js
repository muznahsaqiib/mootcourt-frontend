'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from '../store/slices/authSlice';
import { Home, BookOpen, User, ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { DASHBOARD_ROUTE, PROFILE_ROUTE } from '@/utils/routes.constant';

const links = [
  { href: DASHBOARD_ROUTE, label: 'Dashboard', icon: Home },
  { href: PROFILE_ROUTE, label: 'Profile', icon: User },
];

export default function DashboardSidebar({ collapsed, setCollapsed }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      dispatch(fetchCurrentUser()).unwrap().catch(() => router.push('/'));
    }
  }, [dispatch, router, user]);

  const username = user?.username
    ? user.username.charAt(0).toUpperCase() + user.username.slice(1)
    : 'User';

  return (
    <div className={clsx(
      'h-full bg-white border-r border-rose-100 flex flex-col transition-all duration-200 ease-in-out overflow-hidden',
      collapsed ? 'w-[72px]' : 'w-56'
    )}>

      {/* ── User card ── */}
      <div className={clsx(
        'flex items-center gap-3 px-4 py-5 border-b border-rose-100',
        collapsed && 'justify-center px-3'
      )}>
        <div className="w-9 h-9 rounded-full bg-rose-700 flex items-center justify-center
          text-white font-bold text-sm flex-shrink-0 ring-2 ring-rose-100 shadow-sm">
          {username.charAt(0)}
        </div>

        {!collapsed && (
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-semibold text-stone-800 truncate leading-tight">
              {username}
            </span>
            <span className="text-xs text-stone-400 truncate mt-0.5">
              {user?.email || 'user@example.com'}
            </span>
          </div>
        )}
      </div>

      {/* ── Nav ── */}
      <nav className="flex flex-col gap-1 flex-1 px-2 py-4">
        {!collapsed && (
          <p className="text-[10px] font-bold tracking-widest uppercase text-stone-300 px-3 mb-2">
            Menu
          </p>
        )}

        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group',
                collapsed ? 'justify-center' : 'justify-start',
                isActive
                  ? 'bg-rose-600 text-white shadow-sm shadow-rose-200'
                  : 'text-stone-600 hover:bg-rose-50 hover:text-rose-800'
              )}
            >
              {isActive && !collapsed && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-rose-300 rounded-r-full" />
              )}

              <Icon
                size={17}
                className={clsx(
                  'flex-shrink-0 transition-colors',
                  isActive ? 'text-white' : 'text-rose-400 group-hover:text-rose-600'
                )}
              />

              {!collapsed && (
                <span className="text-sm font-medium">{label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── Collapse toggle ── */}
      <div className={clsx(
        'border-t border-rose-100 py-3',
        collapsed ? 'flex justify-center' : 'flex justify-end px-3'
      )}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg text-stone-400 hover:bg-rose-50 hover:text-rose-600 transition-all"
        >
          {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
        </button>
      </div>

    </div>
  );
}