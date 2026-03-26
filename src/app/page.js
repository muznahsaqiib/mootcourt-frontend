import HomePage from '@/components/HomePage';          
import UserHomePage from '@/components/UserHomePage';  
import { cookies } from 'next/headers';

export default async function Page() {
  const cookieStore = await cookies();   
  const sessionId = cookieStore.get("session_id");

  let user = null;

  if (sessionId) {
    try {
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); 

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
    
      user = null;
    }
  }

  return user ? <UserHomePage user={user} /> : <HomePage />;
}
