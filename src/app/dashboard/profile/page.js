'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { fetchCurrentUser } from '../../store/slices/authSlice';
import { LOGIN_ROUTE } from '@/utils/routes.constant';
import ProfileComponent from './ProfileComponent';
export default function ProfilePage() {

  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
 
  useEffect(() => {
    document.title = "Profile ";
    dispatch(fetchCurrentUser())
      .unwrap()
      .catch(() => router.push(LOGIN_ROUTE));
  }, [dispatch, router]);


  return <ProfileComponent user={user} loading={loading} />;
}
