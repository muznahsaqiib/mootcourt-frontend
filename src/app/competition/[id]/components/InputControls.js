export default function InputControls({
  userInput,
  setUserInput,
  handleSubmitArgument,
  clearInput,
}) {
  return (
    <div className="absolute left-1/2 bottom-6 -translate-x-1/2 z-30 flex justify-center w-full">
      <div className="flex gap-6 items-start bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl px-10 py-6 border border-blue-400 transition-all duration-300 ease-in-out w-[700px]">

        {/* Left Section - Input & Buttons */}
        <div className="flex flex-col gap-4 w-1/2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Craft your argument..."
            className="px-5 py-3 rounded-md border border-pink-400 focus:outline-none focus:ring-4 focus:ring-pink-300 text-blue-900 placeholder-gray-500 transition-all duration-200 ease-in-out shadow-inner"
          />
          <div className="flex gap-3">
            <button
              onClick={handleSubmitArgument}
              className="flex-1 bg-gradient-to-r from-pink-200 via-pink-100 to-blue-200 text-gray-900 px-6 py-2.5 rounded-md shadow-lg hover:scale-105 hover:from-pink-500 hover:to-blue-700 transition-all duration-300 font-semibold"
            >
             Submit
            </button>
            <button
              onClick={clearInput}
              className="flex-1 bg-pink-200 text-blue-800 px-5 py-2.5 rounded-md shadow hover:bg-gray-300 hover:scale-105 font-medium transition-all duration-300"
            >
             Clear
            </button>
          </div>
        </div>

        {/* Right Section - Live Preview */}
        <div className="w-1/2 bg-white border border-gray-300 rounded-xl p-4 shadow-inner">
          <p className="text-sm font-semibold text-gray-600 mb-2">Preview:</p>
          <div className="text-blue-900 text-base whitespace-pre-wrap break-words max-h-32 overflow-auto">
            {userInput || (
              <span className="text-gray-400 italic">Start typing to preview your argument...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
