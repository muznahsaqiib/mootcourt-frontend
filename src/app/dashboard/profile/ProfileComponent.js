'use client';

export default function ProfileComponent({ user, stats = [], loading }) {
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-rose-50">
        <div className="text-3xl text-rose-400 mb-3">⚖</div>
        <p className="text-sm text-rose-400 tracking-widest font-medium">Loading profile…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-rose-50">
        <p className="text-sm text-rose-500 font-medium tracking-wide">Profile not found.</p>
      </div>
    );
  }

  const avg = (arr) => {
    const valid = arr.filter((v) => typeof v === 'number');
    if (!valid.length) return '—';
    return (valid.reduce((a, b) => a + b, 0) / valid.length).toFixed(1);
  };

  const totalSessions = stats.length;
  const avgScore = avg(stats.map((s) => s.result?.user_score));
  const clarity = avg(stats.map((s) => s.result?.detailed_scores_user?.clarity));
  const responsiveness = avg(stats.map((s) => s.result?.detailed_scores_user?.responsiveness));
  const structure = avg(stats.map((s) => s.result?.detailed_scores_user?.structure));
  const totalPracticeMinutes = Math.floor(
    stats.reduce((sum, s) => sum + (s.duration_seconds || 0), 0) / 60
  );

  return (
    <div className="min-h-screen bg-rose-50 px-8 py-10 text-stone-800">

      {/* Header */}
      <div className="flex items-center gap-2 mb-10">
        <span className="text-rose-500 text-xl">⚖</span>
        <h1 className="text-base font-bold text-stone-700 tracking-wide">Counsel Profile</h1>
      </div>

      <div className="max-w-6xl mx-auto flex gap-8">

        {/* ── Left panel ── */}
        <div className="w-72 flex-shrink-0 bg-white border border-rose-100 rounded-2xl p-7 shadow-sm flex flex-col gap-6">

          {/* Avatar */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-20 h-20 rounded-full bg-rose-100 border-2 border-rose-200
              flex items-center justify-center text-3xl font-bold text-rose-600">
              {user.username[0].toUpperCase()}
            </div>
            <div className="text-center">
              <p className="font-semibold text-stone-800 text-base">{user.username}</p>
              <p className="text-xs text-stone-400 mt-0.5">{user.email}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-rose-100" />

          {/* Info rows */}
          <div className="flex flex-col gap-3">
            <InfoRow label="Total Sessions" value={totalSessions} />
            <InfoRow label="Practice Time" value={`${totalPracticeMinutes} min`} />
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className="flex-1 flex flex-col gap-6">

          {/* Analytics */}
          <div className="bg-white border border-rose-100 rounded-2xl p-7 shadow-sm">
            <SectionTitle>Performance Analytics</SectionTitle>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatCard label="Avg Score" value={avgScore} />
              <StatCard label="Clarity" value={clarity} />
              <StatCard label="Responsiveness" value={responsiveness} />
              <StatCard label="Structure" value={structure} />
            </div>
          </div>

          {/* Session history */}
          <div className="bg-white border border-rose-100 rounded-2xl p-7 shadow-sm flex-1">
            <SectionTitle>Session Record</SectionTitle>

            {stats.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 gap-3">
                <span className="text-3xl text-rose-200">⚖</span>
                <p className="text-sm text-stone-400 tracking-wide">No proceedings recorded yet.</p>
              </div>
            ) : (
              <div className="max-h-72 overflow-y-auto space-y-3 pr-1">
                {stats.map((s) => (
                  <div key={s.session_id}
                    className="flex justify-between items-center bg-rose-50 border border-rose-100
                      rounded-xl px-5 py-4 hover:border-rose-300 transition-colors">
                    <div>
                      <p className="text-sm font-semibold text-stone-800">
                        {s.case_title || `Case ${s.case_id}`}
                      </p>
                      <p className="text-xs text-stone-400 mt-0.5">
                        {Math.floor((s.duration_seconds || 0) / 60)} min
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-stone-400 mb-0.5">Score</p>
                      <p className="text-xl font-bold text-rose-600">
                        {s.result?.user_score ?? '—'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

/* ── Subcomponents ── */

function SectionTitle({ children }) {
  return (
    <div className="flex items-center gap-2 mb-5">
      <div className="w-1 h-4 bg-rose-500 rounded-full" />
      <h3 className="text-sm font-bold text-stone-700 tracking-wide">{children}</h3>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between items-center border-b border-rose-50 pb-2">
      <span className="text-xs text-stone-400 font-medium">{label}</span>
      <span className="text-sm font-semibold text-stone-700">{value}</span>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-rose-50 border border-rose-100 rounded-xl p-5 text-center
      hover:border-rose-300 transition-colors">
      <p className="text-xs text-stone-400 font-medium mb-2">{label}</p>
      <p className="text-2xl font-bold text-rose-600">{value}</p>
    </div>
  );
}