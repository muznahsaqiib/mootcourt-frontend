export default function Benches() {
  return (
    <>
      {/* Bench (Judge's Table) */}
      <div className="absolute top-48 left-1/2 -translate-x-1/2 w-[32rem] h-16 bg-gray-300 rounded-t-3xl shadow-2xl border-t-4 border-pink-500 z-0">
        <span className="absolute left-1/2 -translate-x-1/2 -top-6 bg-pink-300 px-3 py-1 rounded shadow text-sm font-semibold text-gray-800">
          Judge's Bench
        </span>
      </div>

      {/* AI Lawyer Table & Chair */}
      <div className="absolute left-48 bottom-36 flex flex-col items-center z-10">
        <div className="w-16 h-16 rounded-full bg-blue-200 border-2 border-blue-500 flex items-center justify-center shadow-lg">
          <span className="text-5xl">🤖</span>
        </div>
        <span className="mt-1 text-sm font-semibold text-blue-700">AI Lawyer</span>
        <div className="w-12 h-4 bg-blue-400 rounded-b-xl mt-1 shadow-md" />
      </div>

      {/* User Lawyer Table & Chair */}
      <div className="absolute right-48 bottom-36 flex flex-col items-center z-10">
        <div className="w-16 h-16 rounded-full bg-pink-100 border-2 border-pink-500 flex items-center justify-center shadow-lg">
          <span className="text-5xl">🧑‍💼</span>
        </div>
        <span className="mt-1 text-sm font-semibold text-pink-700">You</span>
        <div className="w-12 h-4 bg-pink-300 rounded-b-xl mt-1 shadow-md" />
      </div>
    </>
  );
}
