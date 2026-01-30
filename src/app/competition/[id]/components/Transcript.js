export default function Transcript({ history }) {
  if (!history || history.length === 0) {
    return (
      <div className="text-center text-stone-400 py-8">
        <p className="text-base font-sans font-semibold">Awaiting opening statements...</p>
        <p className="text-xs mt-2 text-stone-500">Court record will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 px-2">
      {history.map((item, idx) => (
        <div
          key={idx}
          className={`p-3 rounded-2xl border-l-4 shadow-md backdrop-blur-sm transition-all duration-200 ${item.role === "judge"
              ? "bg-gradient-to-r from-yellow-100/30 to-yellow-200/20 border-yellow-400 text-yellow-800"
              : item.role === "petitioner"
                ? "bg-gradient-to-r from-rose-100/30 to-rose-200/20 border-rose-400 text-rose-800"
                : item.role === "respondent"
                  ? "bg-gradient-to-r from-indigo-100/30 to-indigo-200/20 border-indigo-400 text-indigo-800"
                  : "bg-stone-100/30 border-stone-400 text-stone-800"
            }`}
        >
          <div className="flex items-center justify-between mb-1">
            <strong className="text-xs font-black uppercase tracking-wide font-sans">
              {item.role === "petitioner" ? "🎯 PETITIONER" :
                item.role === "respondent" ? "🤖 RESPONDENT" :
                  item.role === "judge" ? "⚖ BENCH" :
                    item.role}
            </strong>
            <span className="text-xs opacity-70 font-sans font-semibold">
              {item.type || "statement"}
            </span>
          </div>
          <p className="text-sm leading-relaxed font-sans">{item.text}</p>
        </div>
      ))}
    </div>
  );
}
