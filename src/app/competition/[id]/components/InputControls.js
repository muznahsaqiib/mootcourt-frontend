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
    <div className="w-full p-4 bg-gradient-to-t from-stone-100/90 via-rose-50/80 to-gray-200/80 backdrop-blur-md flex gap-3 items-center justify-center border-t-2 border-rose-300 rounded-t-3xl">

      {/* Input */}
      <input
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder={sessionId ? placeholder : "Initializing session..."}
        disabled={disabled}
        className="
          px-6 py-3 w-[28rem]
          rounded-2xl
          bg-stone-100/50 backdrop-blur-sm
          text-stone-700
          placeholder-stone-400
          border-2 border-rose-300/50
          focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400 focus:bg-stone-100
          disabled:opacity-50 disabled:cursor-not-allowed
          text-base font-sans
          transition-all duration-200
        "
      />

      {/* Submit */}
      <button
        onClick={() => {
          if (!sessionId) return;
          handleSubmitArgument();
        }}
        disabled={disabled}
        title={disabled ? (loading ? "Processing…" : "Waiting for session") : "Submit argument"}
        className={`
          px-8 py-3 rounded-2xl font-bold text-base font-sans tracking-wide
          transition-all duration-200 transform
          ${disabled
            ? 'bg-stone-200/50 text-stone-400 cursor-not-allowed border-2 border-stone-300'
            : 'bg-gradient-to-r from-rose-300 to-rose-400 text-white hover:scale-105 hover:shadow-lg hover:shadow-rose-300/50 border-2 border-rose-300'
          }
        `}
      >
        {loading ? 'PROCESSING…' : 'SUBMIT'}
      </button>

      {/* Clear */}
      <button
        onClick={clearInput}
        disabled={disabled}
        className="
          px-6 py-3 rounded-2xl font-semibold font-sans text-base tracking-wide
          bg-stone-200 text-stone-700 border-2 border-stone-300
          hover:bg-stone-100 hover:border-stone-400 hover:shadow-md
          transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        CLEAR
      </button>

      {/* End Session */}
      {onEndSession && (
        <button
          onClick={onEndSession}
          className="
            px-6 py-3 rounded-2xl font-semibold font-sans text-base tracking-wide
            bg-gradient-to-r from-rose-400 to-rose-500 text-white border-2 border-rose-400
            hover:scale-105 hover:shadow-lg hover:shadow-rose-300/50
            transition-all duration-200
          "
        >
          END
        </button>
      )}
    </div>
  );
}
