'use client';

export default function ProfileComponent({ user, stats = [], loading }) {
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-rose-50 text-rose-800 font-serif">
        <div className="text-4xl mb-3 text-rose-600">⚖</div>
        <p className="tracking-widest font-cinzel">LOADING PROFILE...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-rose-50">
        <p className="font-cinzel text-rose-700 tracking-widest">
          PROFILE NOT FOUND
        </p>
      </div>
    );
  }

  const totalSessions = stats.length;

  const avg = (arr) => {
    const valid = arr.filter((v) => typeof v === "number");
    if (!valid.length) return "—";
    return (valid.reduce((a, b) => a + b, 0) / valid.length).toFixed(1);
  };

  const avgScore = avg(stats.map((s) => s.result?.user_score));
  const clarity = avg(stats.map((s) => s.result?.detailed_scores_user?.clarity));
  const responsiveness = avg(stats.map((s) => s.result?.detailed_scores_user?.responsiveness));
  const structure = avg(stats.map((s) => s.result?.detailed_scores_user?.structure));

  const totalPracticeMinutes = Math.floor(
    stats.reduce((sum, s) => sum + (s.duration_seconds || 0), 0) / 60
  );

  return (
    <div className="min-h-screen bg-rose-50 px-8 py-16 font-serif text-rose-900">

      {/* Header */}
      <div className="flex items-center gap-3 mb-12">
        <span className="text-3xl text-rose-600">⚖</span>
        <h1 className="font-cinzel tracking-[0.3em] text-lg font-bold text-rose-800">
          COUNSEL PROFILE
        </h1>
      </div>

      <div className="max-w-6xl mx-auto flex gap-10">

        {/* LEFT PANEL */}
        <div className="w-1/3 bg-white border-2 border-rose-200 rounded-2xl p-8 shadow-sm">

          <div className="w-24 h-24 mx-auto rounded-full bg-rose-200 text-rose-800 
                          flex items-center justify-center text-4xl font-bold">
            {user.username[0].toUpperCase()}
          </div>

          <h2 className="mt-6 text-center font-cinzel tracking-widest text-rose-800">
            {user.username}
          </h2>

          <div className="mt-8 space-y-4 text-sm">
            <InfoRow label="EMAIL" value={user.email} />
            <InfoRow label="TOTAL SESSIONS" value={totalSessions} />
            <InfoRow label="PRACTICE TIME" value={`${totalPracticeMinutes} MIN`} />
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 bg-white border-2 border-rose-200 rounded-2xl p-8 shadow-sm">

          {/* Analytics */}
          <SectionTitle>PERFORMANCE ANALYTICS</SectionTitle>

          <div className="grid grid-cols-2 gap-6 mb-10">
            <StatCard label="AVG SCORE" value={avgScore} />
            <StatCard label="CLARITY" value={clarity} />
            <StatCard label="RESPONSIVENESS" value={responsiveness} />
            <StatCard label="STRUCTURE" value={structure} />
          </div>

          {/* History */}
          <SectionTitle>SESSION RECORD</SectionTitle>

          {stats.length === 0 ? (
            <p className="font-cinzel tracking-widest text-rose-700 text-sm">
              NO PROCEEDINGS RECORDED.
            </p>
          ) : (
            <div className="max-h-72 overflow-y-auto space-y-4 pr-2">
              {stats.map((s) => (
                <div
                  key={s.session_id}
                  className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex justify-between"
                >
                  <div>
                    <p className="font-semibold text-sm">
                      {s.case_title || `CASE ${s.case_id}`}
                    </p>
                    <p className="text-xs text-rose-700 tracking-wide">
                      {Math.floor((s.duration_seconds || 0) / 60)} MINUTES
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] font-cinzel tracking-widest text-rose-700">
                      SCORE
                    </p>
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
  );
}

/* Subcomponents */

function SectionTitle({ children }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-1 h-5 bg-rose-600 rounded-sm" />
      <h3 className="font-cinzel text-sm tracking-[0.25em] font-bold text-rose-800">
        {children}
      </h3>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between border-b border-rose-200 pb-2">
      <span className="font-cinzel text-xs tracking-widest text-rose-700">
        {label}
      </span>
      <span>{value}</span>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-rose-50 border border-rose-200 rounded-xl p-6 text-center">
      <p className="font-cinzel text-xs tracking-widest text-rose-700 mb-2">
        {label}
      </p>
      <p className="text-2xl font-bold text-rose-600">
        {value}
      </p>
    </div>
  );
}