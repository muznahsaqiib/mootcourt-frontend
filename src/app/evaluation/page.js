'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DASHBOARD_ROUTE } from '@/utils/routes.constant';

export default function EvaluationPage() {
    const router = useRouter();
    const [evaluations, setEvaluations] = useState([]);

    useEffect(() => {
        const dataStr = localStorage.getItem('latestEvaluation');
        if (!dataStr) {
            router.push(DASHBOARD_ROUTE);
            return;
        }

        try {
            const data = JSON.parse(dataStr);
            setEvaluations(data);
        } catch (err) {
            console.error('Invalid evaluation data', err);
            router.push(DASHBOARD_ROUTE);
        }
    }, [router]);

    // Helper: extract JSON from raw string
    const parseEvaluation = (raw) => {
        if (!raw) return null;
        const firstBrace = raw.indexOf('{');
        const lastBrace = raw.lastIndexOf('}');
        if (firstBrace === -1 || lastBrace === -1) return null;
        try {
            return JSON.parse(raw.slice(firstBrace, lastBrace + 1));
        } catch {
            return null;
        }
    };

    return (
        <div className="min-h-screen bg-rose-50 text-stone-800 px-6 py-10">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold mb-10 text-rose-600">
                    Evaluated Feedback
                </h1>

                {evaluations.length === 0 && (
                    <p className="text-stone-600">No evaluations found.</p>
                )}

                {evaluations.map((item, idx) => {
                    const parsedEval = parseEvaluation(item.evaluation?.raw_output || item.evaluation);

                    if (!parsedEval) {
                        return (
                            <div
                                key={idx}
                                className="bg-white rounded-3xl p-6 mb-8 shadow-sm border border-rose-100"
                            >
                                <p className="text-stone-600">Could not parse evaluation.</p>
                            </div>
                        );
                    }

                    const { scores, overall_feedback } = parsedEval;

                    return (
                        <div key={idx} className="mb-10">
                            {/* Role */}
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-rose-100 mb-6">
                                <h2 className="text-lg font-semibold text-rose-500 mb-2">
                                    {item.role?.toUpperCase()}
                                </h2>
                                {item.argument && (
                                    <p className="text-stone-700">
                                        <span className="font-semibold">Argument:</span> {item.argument}
                                    </p>
                                )}
                            </div>

                            {/* Scores */}
                            <div className="grid md:grid-cols-2 gap-4 mb-6">
                                {scores &&
                                    Object.entries(scores).map(([criterion, data], i) => (
                                        <div
                                            key={i}
                                            className="bg-white rounded-2xl p-4 shadow-sm border border-rose-100"
                                        >
                                            <div className="flex justify-between mb-2 items-center">
                                                <h3 className="font-semibold text-stone-800">
                                                    {criterion}
                                                </h3>
                                                <span className="px-3 py-1 text-sm rounded-full bg-rose-100 text-rose-600 font-semibold">
                                                    {data.score} / 10
                                                </span>
                                            </div>
                                            <p className="text-stone-700 text-sm leading-relaxed">
                                                {data.justification}
                                            </p>
                                        </div>
                                    ))}
                            </div>

                            {/* Overall Feedback */}
                            {overall_feedback && (
                                <div className="bg-rose-100 p-5 rounded-2xl border border-rose-200 shadow-sm">
                                    <h3 className="font-semibold text-rose-700 mb-2">
                                        Overall Feedback
                                    </h3>
                                    <p className="text-stone-700 leading-relaxed">
                                        {overall_feedback}
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                })}

                <button
                    onClick={() => router.push(DASHBOARD_ROUTE)}
                    className="mt-10 px-8 py-3 rounded-full bg-rose-500 text-white font-semibold shadow hover:bg-rose-400 transition"
                >
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
}
