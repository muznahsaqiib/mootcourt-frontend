// components/UserHomePage.js
'use client';

export default function UserHomePage({ user }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <h1 className="text-3xl font-bold mb-4">
                    Welcome back, {user.username} 🎉
                </h1>
                <p className="text-gray-700">
                    You’re logged in as: {user.email}
                </p>
            </div>
        </div>
    );
}
