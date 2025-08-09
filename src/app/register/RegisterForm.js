'use client';

import { useState } from 'react';
import useRegister from './useRegister';
import 'primeicons/primeicons.css';
import styles from "../styles/styles"
const RegisterForm = ({ toast, onSuccess }) => {
  const {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleRegister,
  } = useRegister(toast);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setConfirmError('Passwords do not match');
      return;
    }

    setConfirmError('');

    const success = await handleRegister();
    if (success && onSuccess) {
      onSuccess();
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-left text-gray-800 mb-1 font-medium">Username</label>
        <input
          type="text"
          className="w-full px-4 py-2 bg-gray-200 border text-gray-800  border-[#374151] text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your Username"
          required
        />
      </div>

      <div>
        <label className="block text-left text-gray-800 mb-1 font-medium">Email</label>
        <input
          type="email"
          className="w-full px-4 py-2 bg-gray-200 border text-gray-800  border-[#374151] text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Email"
          required
        />
      </div>
      <div>
        <label className="block text-left text-gray-800 mb-1 font-medium">Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            className="w-full px-4 py-2 bg-gray-200 border text-gray-800  border-[#374151] text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
           
            placeholder="Enter your password"
            required
          />
          <i
            className={`pi ${showPassword ? 'pi-eye-slash' : 'pi-eye'} absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-red-800`}
            onClick={() => setShowPassword((prev) => !prev)}
          ></i>
        </div>
      </div>
      <div>
        <label className="block text-left text-gray-800 mb-1 font-medium">Confirm Password</label>
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            className="w-full px-4 py-2 bg-gray-200 border border-[#374151] text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition pr-10"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
          />
          <i
            className={`pi ${showConfirmPassword ? 'pi-eye-slash' : 'pi-eye'} absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-red-800`}
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          ></i>
        </div>
      </div>

      {(error || confirmError) && (
        <p className="text-red-600 text-sm mt-2">{error || confirmError}</p>
      )}

      <button
        type="submit"
        className={styles.primaryBtn}
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
