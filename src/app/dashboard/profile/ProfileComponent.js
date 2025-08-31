'use client';

import { useSelector } from 'react-redux';

export default function ProfileComponent({ user, stats }) {
  const loading = useSelector((state) => state.loading.isLoading);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start bg-stone-50 text-stone-800 overflow-hidden py-20 px-4">

      {user ? (
        <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-10 w-full max-w-3xl animate-fadeInUp border border-stone-200 flex flex-col md:flex-row gap-10">

          {/* LEFT PANEL - Basic Info */}
          <div className="flex flex-col items-center md:w-1/3">
            <div className="w-28 h-28 rounded-full bg-rose-200 flex items-center justify-center text-5xl text-rose-800 font-bold mb-6">
              {user.username.charAt(0).toUpperCase()}
            </div>

            <h1 className="text-2xl font-extrabold text-center text-rose-800 mb-6">
              {user.username}
            </h1>

            <div className="space-y-3 w-full">
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="font-semibold text-stone-700">Email</span>
                <span className="text-stone-900">{user.email}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="font-semibold text-stone-700">Joined</span>
                <span className="text-stone-900">{user.joinedDate || 'N/A'}</span>
              </div>
            </div>

            <button className="mt-8 w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 rounded-xl transition duration-300 shadow-md">
              Edit Profile
            </button>
          </div>

          {/* RIGHT PANEL - Stats */}
          <div className="md:w-2/3 flex flex-col gap-6">
            <h2 className="text-xl font-bold text-stone-800">Case History</h2>

            {stats && stats.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stats.map((item, index) => (
                  <div key={index} className="bg-stone-100 p-4 rounded-xl shadow-sm flex flex-col gap-2">
                    <span className="font-semibold text-stone-700">{item.caseTitle}</span>
                    <div className="flex justify-between">
                      <span className="text-stone-600">Result:</span>
                      <span className={item.result === 'Won' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                        {item.result}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-600">Date:</span>
                      <span className="text-stone-800">{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-stone-500 font-medium">No case history available.</div>
            )}

            {/* Summary cards */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="bg-blue-100 rounded-xl p-4 text-center shadow-sm">
                <p className="font-semibold text-blue-800 text-lg">{stats?.filter(s => s.result === 'Won').length || 0}</p>
                <p className="text-stone-600 text-sm">Cases Won</p>
              </div>
              <div className="bg-red-100 rounded-xl p-4 text-center shadow-sm">
                <p className="font-semibold text-red-800 text-lg">{stats?.filter(s => s.result === 'Lost').length || 0}</p>
                <p className="text-stone-600 text-sm">Cases Lost</p>
              </div>
              <div className="bg-yellow-100 rounded-xl p-4 text-center shadow-sm">
                <p className="font-semibold text-yellow-800 text-lg">{stats?.length || 0}</p>
                <p className="text-stone-600 text-sm">Total Cases</p>
              </div>
            </div>

          </div>
        </div>
      ) : !loading && (
        <div className="relative z-10 text-center text-red-500 text-xl font-medium">
          Could not load profile.
        </div>
      )}
    </div>
  );
}
