import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '../store/slices/loadingSlice';
import { CASES_URL, LOGOUT_URL, ME_URL } from '@/utils/api-url.constant';

const useDashboardData = () => {
  const [user, setUser] = useState(null);
  const [cases, setCases] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
     dispatch(startLoading()); 
      try {
        const resUser = await axios.get(`${ME_URL}`, {
          withCredentials: true,
        });

        const resCases = await axios.get(`${CASES_URL}`, {
          withCredentials: true,
        });

        setUser(resUser.data);

        if (Array.isArray(resCases.data)) {
          setCases(resCases.data);
        } else if (Array.isArray(resCases.data?.cases)) {
          setCases(resCases.data.cases);
        } else {
          setCases([]);
          console.warn("Unexpected /cases response:", resCases.data);
        }
      } catch (err) {
        console.error("Dashboard fetch failed:", err);
        if (err.response?.status === 401) {
          router.push('/');
        }
        setError('Failed to load dashboard');
      } finally {
        dispatch(stopLoading());
      }
    };

    fetchData();
  }, [router, dispatch]);

  const logout = async () => {
    try {
      await axios.post(`${LOGOUT_URL}`, {}, {
        withCredentials: true,
      });
    } catch (err) {
      console.error('Logout failed:', err);
    }

    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  return { user, setUser, cases, error, logout };
};

export default useDashboardData;
