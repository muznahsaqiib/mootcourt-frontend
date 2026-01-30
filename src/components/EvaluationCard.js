'use client';

function extractEvaluationJSON(raw) {
    if (!raw) return null;
    if (typeof raw === 'object') return raw;
    if (typeof raw !== 'string') return null;

    const firstBrace = raw.indexOf('{');
    const lastBrace = raw.lastIndexOf('}');

    if (firstBrace === -1 || lastBrace === -1) return null;

    try {
        return JSON.parse(raw.slice(firstBrace, lastBrace + 1));
    } catch {
        return null;
    }
}

export default function EvaluationCard({ evaluation }) {
    const { role, argument, evaluation: rawEval } = evaluation || {};
    const parsed = extractEvaluationJSON(rawEval);

    if (!parsed) {
        return (
            <div className="bg-rose-50 p-6 rounded-3xl border border-rose-200">
                <p className="text-stone-600">Could not parse evaluation.</p>
            </div>
        );
    }

    const { scores, overall_feedback } = parsed;

    return (
        <div className="bg-rose-50 rounded-3xl p-7 border border-rose-200">
            <h3 className="text-rose-600 font-bold text-lg mb-4">
                {role?.toUpperCase()}
            </h3>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
                {Object.entries(scores || {}).map(([title, data]) => (
                    <div
                        key={title}
                        className="bg-white p-4 rounded-2xl border border-rose-100"
                    >
                        <div className="flex justify-between mb-2">
                            <span className="font-semibold text-stone-800">
                                {title}
                            </span>
                            <span className="px-3 py-1 text-sm rounded-full bg-rose-100 text-rose-600 font-semibold">
                                {data.score}/10
                            </span>
                        </div>
                        <p className="text-sm text-stone-700">
                            {data.justification}
                        </p>
                    </div>
                ))}
            </div>

            {overall_feedback && (
                <div className="bg-rose-100 p-5 rounded-2xl border border-rose-200">
                    <h4 className="font-semibold text-rose-700 mb-1">
                        Overall Feedback
                    </h4>
                    <p className="text-stone-700">
                        {overall_feedback}
                    </p>
                </div>
            )}
        </div>
    );
}
