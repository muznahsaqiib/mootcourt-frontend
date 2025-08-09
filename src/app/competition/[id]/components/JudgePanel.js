export default function JudgePanel({ judgeQuestion }) {
  return (
    <div className="absolute top-24 left-1/2 -translate-x-1/2 flex gap-16 z-10">
      <div className="flex flex-col items-center relative">
        <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-pink-500 flex items-center justify-center shadow-xl">
          <span role="img" aria-label="Judge" className="text-4xl">👩‍⚖️</span>
        </div>
        <span className="text-xs mt-1 font-semibold text-pink-600">Judge 1</span>

        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white border border-pink-300 rounded-lg px-4 py-2 text-xs shadow font-medium z-20 max-w-xs text-center">
          {judgeQuestion}
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-pink-500 flex items-center justify-center shadow-xl">
          <span role="img" aria-label="Judge" className="text-4xl">👨‍⚖️</span>
        </div>
        <span className="text-xs mt-1 font-semibold text-pink-600">Judge 2</span>
      </div>
    </div>
  );
}
