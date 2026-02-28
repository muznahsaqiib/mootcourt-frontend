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
  const id = rawId ? rawId.replace(/['"]/g, '') : null;

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
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white border border-rose-100 rounded-3xl shadow-md overflow-hidden">

          {/* ── Card header band ── */}
          <div className="bg-rose-50 border-b border-rose-100 px-10 py-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              {/* Case type badge */}
              {summaryData?.case_type && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 border border-rose-200 text-rose-700 text-xs font-bold tracking-widest uppercase mb-3">
                  ⚖️ {summaryData.case_type}
                </span>
              )}
              <h1 className="text-2xl font-extrabold text-rose-900 leading-snug">
                {summaryData?.title || mootData?.title}
              </h1>
            </div>

            <button
              onClick={handleNavigate}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-700 text-white text-sm font-bold tracking-wide shadow-sm hover:bg-rose-600 active:scale-95 transition-all"
            >
              🤖 Compete Against AI
            </button>
          </div>

          {/* ── Tab row ── */}
          <div className="flex gap-1 px-10 pt-6 border-b border-stone-100">
            {['summary', 'moot'].map((tab) => (
              <button
                key={tab}
                onClick={() => setView(tab)}
                className={`px-5 py-2.5 rounded-t-lg text-sm font-bold tracking-wide transition-all border-b-2 -mb-px
                  ${view === tab
                    ? 'border-rose-700 text-rose-800 bg-white'
                    : 'border-transparent text-stone-400 hover:text-rose-700 hover:border-rose-200 bg-transparent'
                  }`}
              >
                {tab === 'summary' ? 'Summary' : 'Moot Problem'}
              </button>
            ))}
          </div>

          {/* ── Content ── */}
          <div className="px-10 py-8">

            {/* Summary view */}
            {view === 'summary' && summaryData && (
              <div className="space-y-6">

                {/* Type row */}
                <div className="flex items-center gap-3 pb-4 border-b border-stone-100">
                  <span className="text-xs font-bold tracking-widest uppercase text-stone-400">Case Type</span>
                  <span className="px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-700 text-sm font-semibold">
                    {summaryData.case_type}
                  </span>
                </div>

                {/* Summary */}
                {summaryData.summary && (
                  <div>
                    <p className="text-xs font-bold tracking-widest uppercase text-stone-400 mb-2">Summary</p>
                    <p className="text-stone-700 text-base leading-relaxed whitespace-pre-line">
                      {summaryData.summary}
                    </p>
                  </div>
                )}

                {/* Description */}
                {summaryData.description && (
                  <div className="pt-4 border-t border-stone-100">
                    <p className="text-xs font-bold tracking-widest uppercase text-stone-400 mb-2">Description</p>
                    <p className="text-stone-700 text-base leading-relaxed whitespace-pre-line">
                      {summaryData.description}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Moot problem view */}
            {view === 'moot' && mootData && (
              <FormattedMootText content={mootData.content} />
            )}

          </div>
        </div>
      </div>
    </div>
  );
}