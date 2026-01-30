'use client';

export default function JudgePanel({ question }) {
  return (
    <div className="flex flex-col items-center gap-4">

      {/* Judge's Bench */}
      <div className="bg-gradient-to-b from-stone-200 via-stone-100 to-stone-50 p-6 rounded-3xl shadow-xl border-2 border-rose-300 w-96">
        <div className="flex justify-center gap-12">

          {/* Chief Judge */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-300 to-rose-400 border-2 border-rose-200 flex items-center justify-center shadow-md relative">
              <span className="text-4xl font-black">⚖</span>
              <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-stone-300 to-stone-200 rounded-full flex items-center justify-center border-2 border-white">
                <span className="text-sm font-black text-stone-700">1</span>
              </div>
            </div>
            <span className="text-stone-800 font-black text-sm mt-3 font-sans tracking-wide">JUDGE</span>
          </div>

          {/* Regular Judge */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-200 to-indigo-300 border-2 border-indigo-200 flex items-center justify-center shadow-md">
              <span className="text-4xl font-black">⚖</span>
            </div>
            <span className="text-stone-800 font-black text-sm mt-3 font-sans tracking-wide">JUDGE</span>
          </div>
        </div>
      </div>

      {/* Judge Question Display */}
      {question && (
        <div className="bg-gradient-to-br from-stone-100 via-rose-50 to-stone-200 border-2 border-rose-300 p-5 rounded-3xl shadow-xl max-w-md">
          <h4 className="text-rose-400 font-black text-center mb-3 font-sans text-xs tracking-widest">⚡ JUDICIAL INQUIRY ⚡</h4>
          <p className="text-stone-800 text-center text-base font-semibold leading-relaxed">{question}</p>
        </div>
      )}

    </div>
  );
}
