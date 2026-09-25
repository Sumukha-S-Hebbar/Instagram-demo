'use client';

import { useState } from 'react';

export default function LoginCard({ onLogin, isLoading }) {
    const [email, setEmail] = useState('test@gmail.com');
    const [password, setPassword] = useState('django_user');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(email.trim(), password);
    };

    const handleQuickFill = () => {
        setEmail('test@gmail.com');
        setPassword('django_user');
    };

    return (
        <div className="w-full max-w-md p-8 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 shadow-lg shadow-pink-500/30 text-3xl mb-4">
                    📸
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Sign In to Instagram</h2>
                <p className="text-slate-400 text-xs mt-1">Endpoint: <code className="text-pink-400 font-mono">/users/auth/login/</code></p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Email Address
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="test@gmail.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all text-sm"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all text-sm"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white font-semibold text-sm shadow-lg shadow-pink-500/25 active:scale-[0.98] transition-all disabled:opacity-50"
                >
                    {isLoading ? '⏳ Authenticating...' : '✨ Sign In'}
                </button>
            </form>

            <div className="mt-6 pt-5 border-t border-white/10 text-xs text-slate-400">
                <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-slate-300">⚡ Demo Credentials:</span>
                    <button
                        type="button"
                        onClick={handleQuickFill}
                        className="text-pink-400 hover:text-pink-300 font-medium underline"
                    >
                        Auto-Fill
                    </button>
                </div>
                <div className="font-mono bg-slate-950/80 p-2.5 rounded-lg border border-white/5 space-y-0.5 text-[11px]">
                    <div>email: <span className="text-emerald-400">test@gmail.com</span></div>
                    <div>password: <span className="text-emerald-400">django_user</span></div>
                </div>
            </div>
        </div>
    );
}
