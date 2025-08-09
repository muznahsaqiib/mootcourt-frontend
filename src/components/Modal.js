'use client';

export default function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/10 backdrop-brightness-75">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-pink-600 text-lg font-bold"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
