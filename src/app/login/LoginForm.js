'use client';
import { useState } from 'react';
import useLogin from './useLogin';
import styles from "../styles/styles"
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '../store/slices/loadingSlice';
const LoginForm = ({ toast }) => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    handleLogin,
  } = useLogin(toast);

  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(startLoading());
    const result = await handleLogin();
    dispatch(stopLoading());
    if (result.success) {
      window.location.href = "/dashboard";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-left text-gray-800 mb-1 font-medium">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-200 text-gray-800 border border-[#3a3a4d] focus:outline-none focus:ring-2 focus:ring-red-400"
          placeholder="Enter your username"
          required
        />
      </div>

      <div>
        <label className="block text-left text-gray-800 mb-1 font-medium">Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-200 text-gray-800 border border-[#3a3a4d] focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder="Enter your password"
            required
          />
          <i
            className={`pi ${showPassword ? 'pi-eye-slash' : 'pi-eye'} absolute right-4 top-1/2 transform -translate-y-1/2 text-red-600 cursor-pointer`}
            onClick={() => setShowPassword(prev => !prev)}
          />
        </div>
      </div>

      <button
        type="submit"
        className={styles.primaryBtn}
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
