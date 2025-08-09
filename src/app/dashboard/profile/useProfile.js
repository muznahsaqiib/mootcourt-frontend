'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '../../store/slices/loadingSlice'; 
import { LOGIN_ROUTE } from '@/utils/routes.constant';
export default function useProfile() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(startLoading());
    fetch('http://localhost:8000/auth/me', {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => {
        if (res.status === 401) {
          router.push(LOGIN_ROUTE)
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data && data.username) {
          setUser({ username: data.username, email: data.email });
        } else {
          setUser(null);
        }
        dispatch(stopLoading());
      })
      .catch(() => {
        setUser(null);
        dispatch(stopLoading());
        router.push(LOGIN_ROUTE);
      });
  }, [router, dispatch]);

  return { user};
}
