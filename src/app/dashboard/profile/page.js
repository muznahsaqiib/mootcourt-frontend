'use client';

import useProfile from './useProfile';
import ProfileComponent from './ProfileComponent';

export default function ProfilePage() {
  const { user, loading } = useProfile();

  return <ProfileComponent user={user} loading={loading} />;
}
