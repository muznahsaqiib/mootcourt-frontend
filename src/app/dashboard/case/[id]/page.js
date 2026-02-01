'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useCaseDetails from './useCaseDetails';
import FormattedMootText from './FormattedMootText';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '../../../store/slices/loadingSlice';
import { useRouter } from 'next/navigation';
import { COMPETITION_ROUTE } from '../../../../utils/routes.constant';

export default function CaseDetailsPage() {
  const { id: rawId } = useParams();

  // Clean the ID (remove quotes) before passing
  const id = rawId ? rawId.replace(/['"]/g, "") : null;

  const { summaryData, mootData } = useCaseDetails(id);
  const [view, setView] = useState('summary');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleNavigate = () => {
    dispatch(startLoading());
    router.push(COMPETITION_ROUTE(id));
  };

  useEffect(() => {
    dispatch(startLoading());
    return () => dispatch(stopLoading());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 py-10 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="bg-white border border-rose-900 rounded-3xl shadow-lg p-10 backdrop-blur-sm">
          <div className="flex flex-wrap gap-4 mb-6">
            <button
              onClick={handleNavigate}
              className="px-4 py-2 rounded-lg bg-rose-800 text-white font-semibold hover:bg-rose-700 transition"
            >
              🤖 Compete Against AI
            </button>
          </div>
          <h1 className="text-4xl font-extrabold text-rose-800 mb-6 drop-shadow">
            {summaryData?.title || mootData?.title}
          </h1>

          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setView('summary')}
              className={`px-4 py-2 rounded-lg border font-semibold transition ${view === 'summary'
                ? 'bg-rose-800 text-white border-rose-800'
                : 'border-rose-800 text-rose-800 hover:bg-rose-100'
                }`}
            >
              Summary
            </button>
            <button
              onClick={() => setView('moot')}
              className={`px-4 py-2 rounded-lg border font-semibold transition ${view === 'moot'
                ? 'bg-rose-800 text-white border-rose-800'
                : 'border-rose-800 text-rose-800 hover:bg-rose-100'
                }`}
            >
              Moot Problem
            </button>
          </div>

          <div className="mt-4 space-y-4">
            {view === 'summary' && summaryData && (
              <>
                <p>
                  <span className="font-semibold text-stone-700">Type:</span>{' '}
                  <span className="text-stone-900">{summaryData.case_type}</span>
                </p>
                <p className="whitespace-pre-line">
                  <strong className="text-stone-700">Summary:</strong> {summaryData.summary}
                </p>
                <p className="whitespace-pre-line">{summaryData.description}</p>
              </>
            )}

            {view === 'moot' && mootData && (
              <FormattedMootText content={mootData.content} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
