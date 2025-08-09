// src/app/hooks/useCaseDetails.js
'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '../../../store/slices/loadingSlice';
export default function useCaseDetails(id) {
  const [summaryData, setSummaryData] = useState(null);
  const [mootData, setMootData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const [summaryRes, mootRes] = await Promise.all([
          fetch(`http://localhost:8000/cases/${id}`),
          fetch(`http://localhost:8000/moot-problems/${id}`),
        ]);
        const summaryJson = await summaryRes.json();
        const mootJson = await mootRes.json();

        setSummaryData(summaryJson);
        setMootData(mootJson);
      } catch (error) {
        console.error('Error fetching case details:', error);
      } finally {
       dispatch(stopLoading());
      }
    };

    fetchData();
  }, [id]);

  return { summaryData, mootData, dispatch};
}
