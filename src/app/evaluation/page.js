'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DASHBOARD_ROUTE } from '@/utils/routes.constant';

export default function EvaluationPage() {
    const router = useRouter();
    const [evaluation, setEvaluation] = useState(null);

    useEffect(() => {
        const dataStr = localStorage.getItem('latestEvaluation');
        if (!dataStr) {
            router.push(DASHBOARD_ROUTE);
            return;
        }
        try {
            const data = JSON.parse(dataStr);
            setEvaluation(data);
        } catch {
            router.push(DASHBOARD_ROUTE);
        }
    }, [router]);

    if (!evaluation) {
        return (
            <div className="min-h-screen flex items-center justify-center text-stone-600">
                Loading evaluation…
            </div>
        );
    }

    // ✅ Fix: access the nested evaluation object
    const { scores = {}, overall_feedback } = evaluation.evaluation || {};

    return (
        <div className="min-h-screen bg-rose-50 text-stone-800 px-6 py-10">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold mb-10 text-rose-600">
                    Evaluated Feedback
                </h1>

                {Object.keys(scores).length === 0 && (
                    <p className="text-stone-600">No evaluation scores found.</p>
                )}

                <div className="grid md:grid-cols-2 gap-4 mb-8">
                    {Object.entries(scores).map(([criterion, data], i) => (
                        <div
                            key={i}
                            className="bg-white rounded-2xl p-4 shadow-sm border border-rose-100"
                        >
                            <div className="flex justify-between mb-2 items-center">
                                <h3 className="font-semibold text-stone-800">{criterion}</h3>
                                <span className="px-3 py-1 text-sm rounded-full bg-rose-100 text-rose-600 font-semibold">
                                    {data?.score ?? 0} / 10
                                </span>
                            </div>
                            <p className="text-stone-700 text-sm leading-relaxed">
                                {data?.justification || 'No justification provided.'}
                            </p>
                        </div>
                    ))}
                </div>

                {overall_feedback && (
                    <div className="bg-rose-100 p-5 rounded-2xl border border-rose-200 shadow-sm mb-8">
                        <p className="text-stone-700">{overall_feedback}</p>
                    </div>
                )}

                <button
                    onClick={() => router.push(DASHBOARD_ROUTE)}
                    className="px-8 py-3 rounded-full bg-rose-500 text-white font-semibold shadow hover:bg-rose-400 transition"
                >
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
}
