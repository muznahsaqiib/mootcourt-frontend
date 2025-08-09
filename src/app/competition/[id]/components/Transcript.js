export default function Transcript({ history }) {
  return (
    <div className="absolute top-72 left-1/2 -translate-x-1/2 w-[40rem] max-w-full h-56 overflow-y-auto bg-white/95 rounded-xl shadow-lg border border-blue-200 p-4 z-20">
      <h3 className="text-lg font-bold text-blue-700 mb-2">Courtroom Transcript</h3>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-left py-1 px-2 text-blue-800">Speaker</th>
            <th className="text-left py-1 px-2 text-blue-800">Statement</th>
          </tr>
        </thead>
        <tbody>
          {history.length === 0 && (
            <tr>
              <td colSpan={2} className="text-center text-gray-500 py-2">No arguments yet.</td>
            </tr>
          )}
          {history.map((item, idx) => (
            <tr key={idx}>
              <td className={`py-1 px-2 font-semibold ${item.role === 'user' ? 'text-yellow-700' : 'text-blue-700'}`}>
                {item.role === 'user' ? 'You' : 'AI Lawyer'}
              </td>
              <td className="py-1 px-2 text-gray-900">{item.text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
