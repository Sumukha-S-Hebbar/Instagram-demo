'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('drf_auth_token');
        if (token) {
            router.replace('/profile');
        } else {
            router.replace('/login');
        }
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400 text-sm">
            ⏳ Loading...
        </div>
    );
}
