'use client';

import React, { useEffect } from 'react';
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

  useEffect(() => {
    dispatch(fetchCurrentUser())
      .unwrap()
      .catch(() => {
        // If not logged in, redirect
        router.push('/');
      });

    dispatch(fetchCases());
  }, [dispatch, router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className="text-red-600 px-4">{error}</p>;
  }

  if (!cases || cases.length === 0) {
    return <p className="text-gray-800 text-lg px-4">No cases available at the moment.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {cases.map((item, index) => (
        <CaseCard key={item?.id || index} item={item} />
      ))}
    </div>
  );
}
