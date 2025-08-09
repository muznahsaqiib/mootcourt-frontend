
'use client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '@/app/store/slices/loadingSlice';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Loading() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startLoading());

        
        return () => {
            dispatch(stopLoading());
        };
    }, [dispatch]);

    return <LoadingSpinner />;
}
