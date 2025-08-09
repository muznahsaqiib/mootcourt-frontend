'use client';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '../store/slices/loadingSlice';
import { showToast } from '../store/slices/toastSlice'; 
import { REGISTER_URL } from '../../utils/api-url.constant.js';
const useRegister = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleRegister = async () => {
    dispatch(startLoading());

    try {
      const res = await axios.post(`${REGISTER_URL}`, {
        username,
        email,
        password,
      });

      dispatch(showToast({
        severity: 'success',
        summary: 'Success',
        detail: res.data.message || 'Registration successful',
      }));

      return true;

    } catch (err) {
      const errMsg = err.response?.data?.detail || 'Registration failed';
      setError(errMsg);

      dispatch(showToast({
        severity: 'error',
        summary: 'Registration Failed',
        detail: errMsg,
      }));

      return false;

    } finally {
      dispatch(stopLoading());
    }
  };

  return {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleRegister,
  };
};

export default useRegister;
