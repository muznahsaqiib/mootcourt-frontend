'use client';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function GlobalLoading() {
    const reduxLoading = useSelector(state => state.loading.isLoading);
    const pathname = usePathname();
    const [routeLoading, setRouteLoading] = useState(false);

   
    useEffect(() => {
        if (pathname) {
            setRouteLoading(true);
            const timer = setTimeout(() => setRouteLoading(false), 300); 
            return () => clearTimeout(timer);
        }
    }, [pathname]);

    if (!reduxLoading && !routeLoading) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
            <LoadingSpinner />
        </div>
    );
}
