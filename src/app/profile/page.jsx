'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ProfileAvatar from '@/components/ProfileAvatar';
import ProfileDetails from '@/components/ProfileDetails';
import { fetchProfile } from '@/lib/api';

export default function ProfilePage() {
    const router = useRouter();
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('drf_auth_token');
        if (!storedToken) {
            router.replace('/login');
            return;
        }
        setToken(storedToken);

        const storedUser = localStorage.getItem('drf_user_info');
        if (storedUser) {
            try { setUser(JSON.parse(storedUser)); } catch (e) {}
        }
    }, [router]);

    /**
     * "Get Profile" button calls DRF GET /users/profile/ with Authorization: Token <key>
     */
    const handleGetProfile = async () => {
        setIsLoading(true);
        setMsg(null);
        try {
            const data = await fetchProfile(token);
            setProfile(data);
            if (data.user) {
                setUser(data.user);
                localStorage.setItem('drf_user_info', JSON.stringify(data.user));
            }
            setMsg('✅ Profile details fetched successfully from /users/profile/!');
        } catch (err) {
            setMsg(`❌ ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    if (!token) return null;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
            <Navbar user={user} token={token} />

            <main className="flex-grow max-w-2xl w-full mx-auto px-4 py-10 space-y-6">
                <div className="p-8 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl text-center space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">User Profile</h2>
                        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                            GET /users/profile/
                        </span>
                    </div>

                    {/* Profile DP Logo */}
                    <ProfileAvatar 
                        profilePic={profile?.profile_picture} 
                        username={user?.username || profile?.user?.username || 'testuser'} 
                    />

                    {/* "Get Profile" Action Trigger */}
                    <div>
                        <button
                            id="btn-get-profile"
                            onClick={handleGetProfile}
                            disabled={isLoading}
                            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white font-bold text-sm shadow-xl shadow-pink-500/25 active:scale-98 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isLoading ? '⏳ Fetching /users/profile/ ...' : '⚡ Get Profile'}
                        </button>
                    </div>

                    {msg && (
                        <div className="text-xs font-semibold p-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 animate-fadeIn">
                            {msg}
                        </div>
                    )}

                    {/* Profile Details from Backend */}
                    <ProfileDetails profile={profile} />

                    {/* Navigation Link to Your Posts */}
                    <div className="pt-2">
                        <Link
                            href="/posts"
                            className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold text-xs transition-all text-center flex items-center justify-center gap-2 shadow"
                        >
                            🖼️ View Your Posts (Create, Update & Delete) →
                        </Link>
                    </div>

                    {/* Auth Header Inspector */}
                    <div className="text-left pt-4 border-t border-white/10">
                        <span className="text-[11px] font-bold text-slate-400 block mb-1">🔐 DRF Authorization Header:</span>
                        <code className="block p-3 rounded-xl bg-slate-950 text-cyan-400 text-xs font-mono break-all border border-white/5">
                            Authorization: Token {token}
                        </code>
                    </div>
                </div>
            </main>
        </div>
    );
}
