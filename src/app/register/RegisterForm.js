'use client';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/slices/authSlice';
import { useRouter } from 'next/navigation';
import 'primeicons/primeicons.css';
import styles from "../styles/styles";
import InputControl from '../shared/input.control';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// ✅ Validation schema
const registerSchema = yup.object({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords do not match')
    .required('Confirm Password is required'),
});

const RegisterForm = ({ toast, onSuccess }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { error } = useSelector((state) => state.auth || {});

  // ✅ Setup RHF with Yup validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  // ✅ Submit handler
  const onSubmit = (data) => {
    dispatch(registerUser({ username: data.username, email: data.email, password: data.password, router, toast }))
      .unwrap()
      .then(() => {
        if (onSuccess) onSuccess();
      })
      .catch((err) => {
        console.error("Registration failed:", err);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Username */}
      <InputControl
        label="Username"
        name="username"
        register={register}
        error={errors.username}
      />

      {/* Email */}
      <InputControl
        label="Email"
        name="email"
        type="email"
        register={register}
        error={errors.email}
      />

      {/* Password */}
      <InputControl
        label="Password"
        name="password"
        type="password"
        register={register}
        error={errors.password}
        showPasswordToggle
      />

      {/* Confirm Password */}
      <InputControl
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        register={register}
        error={errors.confirmPassword}
        showPasswordToggle
      />

      {/* Server Error */}
      {error && <p className="text-red-600 text-sm">{typeof error === 'object' ? error.detail || JSON.stringify(error) : error}</p>}


      {/* Submit */}
      <button type="submit" className={styles.primaryBtn}>
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
