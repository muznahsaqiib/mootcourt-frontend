export default function FormattedMootText({ content }) {
  if (!content) return null;

  return (
    <div className="mt-3">
      {content.split('\n').map((line, index) => {
        const trimmed = line.trim();

        if (/^(Facts|Background|Issues|Relevant Laws|Jurisdiction|Note):/i.test(trimmed)) {
          return (
            <h5 
              key={index} 
              className="text-gray-900 mt-6 mb-2 font-semibold uppercase tracking-wide"
            >
              {trimmed}
            </h5>
          );
        }

        if (index === 0 || /^IN THE/i.test(trimmed)) {
          return (
            <h2
              key={index}
              className="text-center text-gray-800 uppercase font-extrabold text-xl drop-shadow-md mb-4"
            >
              {trimmed}
            </h2>
          );
        }

        if (index === 1 || /^[A-Z].+v\./.test(trimmed)) {
          return (
            <h4
              key={index}
              className="text-center italic text-slate-900 mb-4"
            >
              {trimmed}
            </h4>
          );
        }

        return (
          <p
            key={index}
            className="text-slate-900 text-m leading-relaxed mb-2 whitespace-pre-line"
          >
            {trimmed}
          </p>
        );
      })}
    </div>
  );
}
