'use client';

import React from 'react';
import useDashboardData from './useDashboardData';
import CaseCard from './CaseCard';
import {useSelector } from 'react-redux';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function DashboardPage() {
  const { cases, user } = useDashboardData();

  const loading = useSelector((state) => state.loading.isLoading);

  const safeCases = Array.isArray(cases) ? cases : [];

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {safeCases.length === 0 ? (
        <p className="text-gray-800 text-lg px-4">No cases available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
          {safeCases.map((item, index) => (
            <CaseCard key={item?.id || index} item={item} />
          ))}
        </div>
      )}
    </>
  );
}
