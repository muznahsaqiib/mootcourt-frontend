export default function FormattedMootText({ content }) {
  if (!content) return null;

  return (
    <div className="mt-3 space-y-1">
      {content.split('\n').map((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={index} className="h-3" />;

        // Section headings: Facts:, Issues:, etc.
        if (/^(Facts|Background|Issues|Relevant Laws|Jurisdiction|Note):/i.test(trimmed)) {
          return (
            <h5
              key={index}
              className="flex items-center gap-2 text-rose-800 mt-7 mb-2 font-bold uppercase tracking-widest text-sm border-b border-rose-100 pb-1"
            >
              <span className="text-rose-400 text-xs">§</span>
              {trimmed}
            </h5>
          );
        }

        // Court heading: IN THE ... COURT
        if (index === 0 || /^IN THE/i.test(trimmed)) {
          return (
            <h2
              key={index}
              className="text-center text-rose-900 uppercase font-extrabold text-xl tracking-widest mb-2 drop-shadow-sm"
            >
              {trimmed}
            </h2>
          );
        }

        // Case title: X v. Y
        if (index === 1 || /^[A-Z].+v\./.test(trimmed)) {
          return (
            <h4
              key={index}
              className="text-center italic text-stone-700 text-lg font-semibold mb-5"
            >
              {trimmed}
            </h4>
          );
        }

        // Body paragraph
        return (
          <p
            key={index}
            className="text-stone-700 text-base leading-relaxed mb-1 whitespace-pre-line"
          >
            {trimmed}
          </p>
        );
      })}
    </div>
  );
}