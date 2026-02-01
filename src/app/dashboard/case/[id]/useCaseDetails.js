'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '../../../store/slices/loadingSlice';

export default function useCaseDetails(id) {
  const [summaryData, setSummaryData] = useState(null);
  const [mootData, setMootData] = useState(null);
  const [caseType, setCaseType] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;

    // Clean the ID: remove quotes from frontend if any
    const cleanId = id.replace(/^['"]|['"]$/g, '');

    const fetchData = async () => {
      dispatch(startLoading());

      try {
        const [summaryRes, mootRes] = await Promise.all([
          fetch(`http://localhost:8000/cases/${cleanId}`),
          fetch(`http://localhost:8000/moot-problems/${cleanId}`),
        ]);

        if (!summaryRes.ok || !mootRes.ok) {
          throw new Error("Failed to fetch case data");
        }

        const summaryJson = await summaryRes.json();
        const mootJson = await mootRes.json();

        setSummaryData(summaryJson);
        setMootData(mootJson);

        // Extract case type for downstream usage
        setCaseType(summaryJson.case_type || null);

      } catch (error) {
        console.error('Error fetching case details:', error);
        setSummaryData(null);
        setMootData(null);
      } finally {
        dispatch(stopLoading());
      }
    };

    fetchData();
  }, [id, dispatch]);

  return {
    summaryData,
    mootData,
    caseType,
  };
}
