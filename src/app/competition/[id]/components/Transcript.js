export default function Transcript({ history }) {
  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 w-[60rem] max-w-full h-[28rem] overflow-y-auto bg-white/95 rounded-2xl shadow-xl border border-blue-300 p-4 z-50 flex flex-col">
      <h3 className="text-2xl font-bold text-blue-700 mb-4 text-center">Courtroom Transcript</h3>

      <div className="flex-1 flex flex-col gap-3">
        {(!history || history.length === 0) && (
          <div className="text-center text-gray-500 py-4">No arguments yet.</div>
        )}

        {history && history.map((item, idx) => {
          // Handle different possible formats
          const role = item.role || item.speaker || item.type || 'unknown';
          const text = item.text || item.content || item.message || '';
          const timestamp = item.timestamp || item.time || '';

          return (
            <div
              key={idx}
              className={`max-w-[85%] px-4 py-3 rounded-xl ${
                role.toLowerCase().includes('petitioner') || role === 'user'
                  ? 'self-end bg-yellow-200 text-yellow-900'
                  : role.toLowerCase().includes('respondent') || role.toLowerCase().includes('ai')
                  ? 'self-start bg-blue-200 text-blue-900'
                  : 'self-center bg-gray-200 text-gray-900'
              } shadow`}
            >
              <div className="font-semibold mb-1">
                {role === 'user' ? 'You' :
                 role.toLowerCase().includes('petitioner') ? 'Petitioner' :
                 role.toLowerCase().includes('respondent') ? 'Respondent' :
                 role.toLowerCase().includes('judge') ? 'Judge' :
                 role.charAt(0).toUpperCase() + role.slice(1)}
                {timestamp && <span className="text-xs ml-2 opacity-70">({timestamp})</span>}
              </div>
              <div className="whitespace-pre-line">{text}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
