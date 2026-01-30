export default function Benches() {
  return (
    <>
      {/* Bench (Judge's Table) */}
      <div className="absolute top-48 left-1/2 -translate-x-1/2 w-[32rem] h-16 bg-gradient-to-r from-yellow-500 via-yellow-600 to-orange-600 rounded-full shadow-2xl border-2 border-yellow-400 z-0">
        <span className="absolute left-1/2 -translate-x-1/2 -top-8 bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 rounded-full shadow-lg text-xs font-black text-white font-sans uppercase tracking-wider border-2 border-yellow-300">
          ⚖ JUDICIAL BENCH ⚖
        </span>
      </div>

      {/* AI Lawyer Table & Chair */}
      <div className="absolute left-48 bottom-36 flex flex-col items-center z-10">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 border-3 border-indigo-400 flex items-center justify-center shadow-lg">
          <span className="font-black text-white text-2xl">R</span>
        </div>
        <span className="mt-2 text-xs font-black text-white font-sans uppercase tracking-widest drop-shadow-lg">Respondent AI</span>
        <div className="w-12 h-4 bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-full mt-2 shadow-lg" />
      </div>

      {/* User Lawyer Table & Chair */}
      <div className="absolute right-48 bottom-36 flex flex-col items-center z-10">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 to-rose-600 border-3 border-rose-400 flex items-center justify-center shadow-lg">
          <span className="font-black text-white text-2xl">A</span>
        </div>
        <span className="mt-2 text-xs font-black text-white font-sans uppercase tracking-widest drop-shadow-lg">Petitioner</span>
        <div className="w-12 h-4 bg-gradient-to-r from-rose-600 to-rose-700 rounded-full mt-2 shadow-lg" />
      </div>
    </>
  );
}
