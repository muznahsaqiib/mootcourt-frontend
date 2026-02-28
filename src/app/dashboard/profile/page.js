'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { fetchCurrentUser, fetchUserHistory } from '../../store/slices/authSlice';
import ProfileComponent from './ProfileComponent';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state) => state.auth.user);
  const stats = useSelector((state) => state.auth.history);
  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    document.title = "Profile";

    dispatch(fetchCurrentUser())
      .unwrap()
      .catch(() => router.push('/'));

    dispatch(fetchUserHistory());
  }, [dispatch, router]);

  return <ProfileComponent user={user} stats={stats} loading={loading} />;
}