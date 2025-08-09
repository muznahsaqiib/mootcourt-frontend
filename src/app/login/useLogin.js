'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '../store/slices/loadingSlice';
import { useRouter } from 'next/navigation';
import { showToast } from '../store/slices/toastSlice';
import { LOGIN_URL } from '../../utils/api-url.constant.js';
const useLogin = (toast) => {
 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();


  const handleLogin = async () => {
    dispatch(startLoading());

    try {
      const res = await fetch(`${LOGIN_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(showToast({
          severity: 'error',
          summary: 'Login Failed',
          detail: data.detail || 'Invalid credentials',
        }));
        return { success: false, error: data.detail };
      }

      localStorage.setItem("user", JSON.stringify(data.user));

      dispatch(showToast({
        severity: 'success',
        summary: 'Login Successful',
        detail: `Welcome ${data.user.username}`,
      }));

      
      setTimeout(() => {
        router.push('/dashboard');
      }, 300);

      return { success: true };
    } catch (err) {
      toast?.current?.show?.({
        severity: 'error',
        summary: 'Network Error',
        detail: err.message || 'Something went wrong',
        life: 3000,
      });
      return { success: false, error: err.message };
    } finally {
      dispatch(stopLoading());
      
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    handleLogin,
  };
};

export default useLogin;
