'use client';

import { useSelector } from 'react-redux';

export default function ProfileComponent({ user }) {
  
  const loading = useSelector((state) => state.loading.isLoading);
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 bg-stone-50 text-stone-800">
      {user ? (
        <div className="bg-white border border-stone-200 rounded-3xl shadow-2xl p-10 w-full max-w-md animate-fadeInUp">
          <h1 className="text-3xl font-extrabold text-center text-rose-800 mb-6">👤 Your Profile</h1>
          <div className="space-y-4 text-lg">
            <div>
              <span className="font-semibold text-stone-800">Username:</span> {user.username}
            </div>
            <div>
              <span className="font-semibold text-stone-800">Email:</span> {user.email}
            </div>

          </div>
          
        </div>
        
      ) : !loading && (
        <div className="text-center text-red-500 text-xl font-medium">
          Could not load profile.
        </div>
      )}
    </div>
    
  );
}
