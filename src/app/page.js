import HomePage from '@/components/HomePage';          // landing page
import UserHomePage from '@/components/UserHomePage';  // logged-in homepage
import { cookies } from 'next/headers';

export default async function Page() {
  const cookieStore = await cookies();   // ✅ await here
  const sessionId = cookieStore.get("session_id");

  let user = null;

  if (sessionId) {
    try {
      // Add timeout to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

      const res = await fetch("http://localhost:8000/auth/me", {
        method: "GET",
        headers: {
          Cookie: `session_id=${sessionId.value}`,
        },
        cache: "no-store",
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        user = await res.json();
      }
    } catch (e) {
      console.error("Auth check failed:", e);
      // If backend is not available, treat as not logged in
      user = null;
    }
  }

  return user ? <UserHomePage user={user} /> : <HomePage />;
}
