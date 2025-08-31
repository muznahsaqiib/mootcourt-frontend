import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../store/slices/authSlice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputControl from '../shared/input.control';
import styles from "../styles/styles";
import { useRouter } from 'next/navigation';

const loginSchema = yup.object({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
});

const LoginForm = ({ toast }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { error } = useSelector((state) => state.auth);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(loginSchema),
    });

    // ✅ Clear any previous error when modal/page mounts
    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    const onSubmit = (data) => {
        dispatch(loginUser({ ...data, router, toast })).unwrap()
            .then(() => reset());
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <InputControl
                label="Username"
                name="username"
                register={register}
                error={errors.username}
            />
            <InputControl
                label="Password"
                name="password"
                type="password"
                register={register}
                error={errors.password}
                showPasswordToggle
            />
            {error && <p className="text-red-600 text-sm">{typeof error === 'object' ? error.detail || JSON.stringify(error) : error}</p>}
            <button type="submit" className={styles.primaryBtn}>Login</button>
        </form>
    );
};

export default LoginForm;
