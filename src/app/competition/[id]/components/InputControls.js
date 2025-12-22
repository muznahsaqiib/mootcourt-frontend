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
}) {
  const disabled = loading || !sessionId;

  return (
    <div className="w-full p-4 bg-white/90 flex gap-3 items-center justify-center border-t">
      <input
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder={sessionId ? "Type your argument..." : "Waiting for session to start..."}
        className="px-4 py-2 rounded-full border w-80"
        disabled={disabled}
      />

      <button
        onClick={() => {
          if (!sessionId) return;
          handleSubmitArgument();
        }}
        disabled={disabled}
        title={disabled ? (loading ? "Loading…" : "Waiting for session") : "Submit argument"}
        className={`px-6 py-2 rounded-full font-semibold ${disabled ? 'bg-gray-300 text-gray-600' : 'bg-gradient-to-r from-pink-600 to-purple-600 text-white'}`}
      >
        {loading ? 'Sending…' : 'Submit'}
      </button>

      <button
        onClick={clearInput}
        className="px-4 py-2 rounded-full bg-gray-100"
      >
        Clear
      </button>

      {onEndSession && (
        <button
          onClick={onEndSession}
          className="px-4 py-2 rounded-full bg-rose-500 text-white"
        >
          Quit & Save
        </button>
      )}
    </div>
  );
}
