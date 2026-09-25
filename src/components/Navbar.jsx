'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { logoutUser } from '@/lib/api';

export default function Navbar({ user, token }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            // Call POST /users/auth/logout/ with Authorization: Token <key>
            if (token) {
                await logoutUser(token);
            }
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            localStorage.removeItem('drf_auth_token');
            localStorage.removeItem('drf_user_info');
            setIsLoggingOut(false);
            router.push('/login');
        }
    };

    return (
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-white/10 px-6 py-3.5">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link href="/profile" className="flex items-center gap-2.5 text-xl font-bold bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                        📸 Instagram Demo
                    </Link>

                    {/* Navigation Links */}
                    {token && (
                        <nav className="flex items-center gap-2 text-sm">
                            <Link 
                                href="/profile" 
                                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                                    pathname === '/profile' ? 'bg-white/10 text-white font-semibold shadow' : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                👤 Profile
                            </Link>
                            <Link 
                                href="/posts" 
                                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                                    pathname === '/posts' ? 'bg-white/10 text-white font-semibold shadow' : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                🖼️ Your Posts
                            </Link>
                        </nav>
                    )}
                </div>

                {/* Right Profile Badge & Logout Button */}
                {token ? (
                    <div className="flex items-center gap-3">
                        <Link href="/profile" className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full hover:bg-white/10 transition-all">
                            <span className="text-xs font-semibold text-slate-200">@{user?.username || 'testuser'}</span>
                        </Link>
                        <button
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className="text-xs px-3.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-semibold transition-all disabled:opacity-50 flex items-center gap-1.5"
                        >
                            {isLoggingOut ? '⏳ Logging out...' : '🚪 Logout'}
                        </button>
                    </div>
                ) : (
                    <Link
                        href="/login"
                        className="text-xs px-4 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-semibold transition-all shadow"
                    >
                        Sign In
                    </Link>
                )}
            </div>
        </header>
    );
}
