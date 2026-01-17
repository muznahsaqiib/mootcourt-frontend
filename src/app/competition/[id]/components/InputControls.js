'use client';

import React from 'react';

export default function InputControls({
  userInput,
  setUserInput,
  handleSubmitArgument,
  clearInput,
  loading = false,
  onEndSession,
  sessionId,
  placeholder = "Type your argument...",
}) {
  const disabled = loading || !sessionId;

  return (
    <div className="w-full p-4 bg-slate-900/95 flex gap-3 items-center justify-center border-t border-slate-700">

      {/* Input */}
      <input
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder={sessionId ? placeholder : "Waiting for session to start..."}
        disabled={disabled}
        className="
          px-4 py-2 w-[22rem]
          rounded-full
          bg-slate-800
          text-slate-100
          placeholder-slate-400
          border border-slate-600
          focus:outline-none focus:ring-2 focus:ring-amber-400
          disabled:opacity-60
        "
      />

      {/* Submit */}
      <button
        onClick={() => {
          if (!sessionId) return;
          handleSubmitArgument();
        }}
        disabled={disabled}
        title={disabled ? (loading ? "Loading…" : "Waiting for session") : "Submit argument"}
        className={`
          px-6 py-2 rounded-full font-semibold
          transition-all
          ${disabled
            ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-amber-500 to-orange-600 text-black hover:scale-[1.02]'
          }
        `}
      >
        {loading ? 'Sending…' : 'Submit'}
      </button>

      {/* Clear */}
      <button
        onClick={clearInput}
        className="
          px-4 py-2 rounded-full
          bg-slate-700 text-slate-200
          hover:bg-slate-600
          transition
        "
      >
        Clear
      </button>

      {/* End Session */}
      {onEndSession && (
        <button
          onClick={onEndSession}
          className="
            px-4 py-2 rounded-full
            bg-rose-600 text-white
            hover:bg-rose-700
            transition
          "
        >
          Quit & Save
        </button>
      )}
    </div>
  );
}
