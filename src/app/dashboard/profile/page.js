'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { fetchCurrentUser, fetchUserHistory } from '../../store/slices/authSlice'; // ✅ import history thunk
import ProfileComponent from './ProfileComponent';
import { LOGIN_ROUTE } from '@/utils/routes.constant';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state) => state.auth.user);
  const stats = useSelector((state) => state.auth.history); // ✅ use history for analytics
  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    document.title = "Profile";

    // fetch user and history
    dispatch(fetchCurrentUser())
      .unwrap()
      .catch(() => router.push(LOGIN_ROUTE));

    dispatch(fetchUserHistory()); // ✅ fetch session history
  }, [dispatch, router]);

  return <ProfileComponent user={user} stats={stats} loading={loading} />;
}
