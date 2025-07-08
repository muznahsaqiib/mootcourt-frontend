"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }), 
      });

      const data = await res.json();
        if (!res.ok) {
        const data = await res.json();
        console.log('Error response:', data);
        const errorMessage = typeof data.detail === 'string' ? data.detail : (data.detail?.[0]?.msg || 'Invalid credentials');
        setError(errorMessage);
        return;
        }


      console.log('✅ Login success:', data);
      router.push('/dashboard');
    } catch (err) {
      setError('Something went wrong.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F1E7] px-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Login to MootCoach</h1>

      <form onSubmit={handleLogin} className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="mb-4">
          <label className="block text-left text-gray-700 mb-2">Username</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-left text-gray-700 mb-2">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        Don't have an account? <a href="/register" className="text-blue-600 underline">Register here</a>
      </p>
    </div>
  );
}
