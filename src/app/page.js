import HomePage from '@/components/HomePage';          // landing page
import UserHomePage from '@/components/UserHomePage';  // logged-in homepage
import { cookies } from 'next/headers';

export default async function Page() {
  const cookieStore = await cookies();   // ✅ await here
  const sessionId = cookieStore.get("session_id");

  let user = null;

  if (sessionId) {
    try {
      const res = await fetch("http://localhost:8000/auth/me", {
        method: "GET",
        headers: {
          Cookie: `session_id=${sessionId.value}`,
        },
        cache: "no-store",
      });
      if (res.ok) {
        user = await res.json();
      }
    } catch (e) {
      console.error("Auth check failed:", e);
    }
  }

  return user ? <UserHomePage user={user} /> : <HomePage />;
}
