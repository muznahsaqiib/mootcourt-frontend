"use client";

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F1E7] text-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">⚖️ AI powered MootCourt Competition</h1>
      <p className="text-lg italic text-gray-700 mb-8">Your Virtual Moot Court Mentor</p>

      <div className="flex gap-4">
        <Link href="/moot">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition">
            Start Moot Session
          </button>
        </Link>

        <Link href="/register">
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}
