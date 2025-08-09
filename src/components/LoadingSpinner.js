import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import styles from '../app/styles/styles';
export default function LoadingSpinner() {
    const isLoading = useSelector((state) => state.loading.isLoading);

    useEffect(() => {
        console.log('Loading state changed:', isLoading);
    }, [isLoading]);

    if (!isLoading) return null;

    return (
        <div className={styles.LoadingSpinner}>
            <div className="relative">
                <div className={styles.loadingDiv}></div>
                <div className={styles.div}>
                    <span className="text-3xl text-pink-600 animate-pulse">⚖️</span>
                </div>
            </div>
        </div>
    );
};
