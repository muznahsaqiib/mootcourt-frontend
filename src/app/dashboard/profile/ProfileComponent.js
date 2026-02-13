'use client';

export default function ProfileComponent({ user, stats = [], loading }) {
  if (loading) return <p className="text-center">Loading...</p>;

  const totalSessions = stats.length;

  const avg = (arr) => {
    const valid = arr.filter((v) => typeof v === "number");
    if (!valid.length) return "—";
    return (valid.reduce((a, b) => a + b, 0) / valid.length).toFixed(1);
  };

  const avgScore = avg(stats.map((s) => s.result?.user_score));

  const totalPracticeMinutes = Math.floor(
    stats.reduce((sum, s) => sum + (s.duration_seconds || 0), 0) / 60
  );

  const clarity = avg(
    stats.map((s) => s.result?.detailed_scores_user?.clarity)
  );

  const responsiveness = avg(
    stats.map((s) => s.result?.detailed_scores_user?.responsiveness)
  );

  const structure = avg(
    stats.map((s) => s.result?.detailed_scores_user?.structure)
  );


  return (
    <div className="min-h-screen bg-stone-50 py-20 px-4">
      {user ? (
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-10 flex flex-col md:flex-row gap-10">
          {/* LEFT */}
          <div className="md:w-1/3 flex flex-col items-center">
            <div className="w-28 h-28 rounded-full bg-rose-200 flex items-center justify-center text-5xl font-bold text-rose-800">
              {user.username[0].toUpperCase()}
            </div>
            <h1 className="mt-4 text-2xl font-extrabold text-rose-800">{user.username}</h1>
            <div className="mt-6 w-full space-y-3 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span>Email</span>
                <span>{user.email}</span>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="md:w-2/3 space-y-8">
            {/* SUMMARY */}
            <div>
              <h2 className="text-xl font-bold mb-4">Analytics</h2>
              <div className="grid grid-cols-3 gap-4">
                <Stat label="Total Sessions" value={totalSessions} />
                <Stat label="Avg Score" value={avgScore} />
                <Stat label="Practice Time" value={`${totalPracticeMinutes}m`} />
              </div>
            </div>

            {/* PERFORMANCE */}
            <div>
              <h3 className="font-bold mb-3">Performance Insights</h3>
              <div className="grid grid-cols-3 gap-4">
                <Stat label="Clarity" value={clarity} />
                <Stat label="Responsiveness" value={responsiveness} />
                <Stat label="Structure" value={structure} />
              </div>
            </div>

            {/* HISTORY */}
            <div>
              <h3 className="font-bold mb-3">Session History</h3>
              {stats.length === 0 ? (
                <p className="text-stone-500">No sessions yet.</p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {stats.map((s) => (
                    <div
                      key={s.session_id}
                      className="p-4 rounded-xl bg-stone-100 flex justify-between"
                    >
                      <div>
                        <p className="font-semibold">{s.case_title || `Case ${s.case_id}`}</p>
                        <p className="text-sm text-stone-600">
                          {Math.floor((s.duration_seconds || 0) / 60)}m
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-stone-500">Score</p>
                        <p className="text-xl font-bold">{s.result?.user_score ?? '—'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-red-500">Profile not found</p>
      )}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-stone-100 rounded-xl p-4 text-center">
      <p className="text-sm text-stone-500">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
