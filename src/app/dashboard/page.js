'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CaseCard from './CaseCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { fetchCurrentUser } from '../../app/store/slices/authSlice';
import { fetchCases } from '../../app/store/slices/casesSlice';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const loading = useSelector((state) => state.loading.isLoading);
  const user = useSelector((state) => state.auth.user);
  const cases = useSelector((state) => state.cases.items);
  const error = useSelector((state) => state.cases.error);

  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    document.title = 'Explorer - MootCourt AI';
    dispatch(fetchCurrentUser()).unwrap().catch(() => router.push('/'));
    dispatch(fetchCases());
  }, [dispatch, router]);

  // Derive unique case types from loaded cases
  const caseTypes = useMemo(() => {
    if (!cases) return [];
    const types = [...new Set(cases.map((c) => c.case_type).filter(Boolean))];
    return ['All', ...types.sort()];
  }, [cases]);

  // Filter cases by active type
  const filteredCases = useMemo(() => {
    if (!cases) return [];
    if (activeFilter === 'All') return cases;
    return cases.filter((c) => c.case_type === activeFilter);
  }, [cases, activeFilter]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-6 py-10">
        <div className="max-w-lg mx-auto bg-rose-50 border-l-4 border-rose-600 rounded-xl shadow-sm px-6 py-5 flex items-start gap-3">
          <span className="text-rose-600 text-xl mt-0.5">⚠</span>
          <p className="text-rose-700 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  if (!cases || cases.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <span className="text-5xl opacity-20">⚖️</span>
        <p className="text-stone-500 text-lg font-medium tracking-wide">No cases available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="px-6 py-8">

      {/* ── Section header ── */}
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-sm font-semibold tracking-[0.2em] text-stone-400 uppercase whitespace-nowrap">
          Available Cases
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-rose-200 to-transparent" />
        <span className="text-xs text-stone-400 font-medium tabular-nums">
          {filteredCases.length} / {cases.length}
        </span>
      </div>

      {/* ── Filter bar ── */}
      <div className="flex flex-wrap gap-2 mb-8 p-3 bg-rose-50 border border-rose-100 rounded-2xl">
        {caseTypes.map((type) => {
          const isActive = activeFilter === type;
          const count = type === 'All'
            ? cases.length
            : cases.filter((c) => c.case_type === type).length;

          return (
            <button
              key={type}
              onClick={() => setActiveFilter(type)}
              className={`
                inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold
                tracking-wide transition-all duration-200 border
                ${isActive
                  ? 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-200'
                  : 'bg-white text-stone-600 border-rose-100 hover:border-rose-300 hover:text-rose-700 hover:bg-rose-50'
                }
              `}
            >
              {type}
              <span className={`
                text-xs px-1.5 py-0.5 rounded-full font-bold tabular-nums
                ${isActive
                  ? 'bg-rose-500 text-white'
                  : 'bg-rose-100 text-rose-500'
                }
              `}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Empty filter result ── */}
      {filteredCases.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <span className="text-4xl opacity-20">⚖️</span>
          <p className="text-stone-400 text-base font-medium tracking-wide">
            No cases found for <span className="text-rose-500 font-semibold">"{activeFilter}"</span>
          </p>
          <button
            onClick={() => setActiveFilter('All')}
            className="mt-2 text-sm text-rose-500 hover:text-rose-700 font-semibold underline underline-offset-2 transition-colors"
          >
            Clear filter
          </button>
        </div>
      )}

      {/* ── Grid ── */}
      {filteredCases.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 items-stretch">
          {filteredCases.map((item, index) => (
            <CaseCard key={item?.id || index} item={item} />
          ))}
        </div>
      )}

    </div>
  );
}