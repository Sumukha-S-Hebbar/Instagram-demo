'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import LoginCard from '@/components/LoginCard';
import { loginUser } from '@/lib/api';

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const handleLogin = async (email, password) => {
        setIsLoading(true);
        setErrorMsg(null);
        try {
            const data = await loginUser(email, password);
            // Save token and user object in localStorage
            localStorage.setItem('drf_auth_token', data.token);
            localStorage.setItem('drf_user_info', JSON.stringify(data.user));
            // Redirect directly to /profile page as requested!
            router.push('/profile');
        } catch (err) {
            setErrorMsg(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
            <Navbar token={null} />

            <main className="flex-grow flex items-center justify-center p-4">
                <div className="w-full max-w-md flex flex-col items-center">
                    {errorMsg && (
                        <div className="w-full mb-4 p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center font-medium animate-fadeIn">
                            ❌ {errorMsg}
                        </div>
                    )}
                    <LoginCard onLogin={handleLogin} isLoading={isLoading} />
                </div>
            </main>
        </div>
    );
}
