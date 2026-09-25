'use client';

export default function ProfileDetails({ profile }) {
    if (!profile) return null;

    const user = profile.user || {};
    const fullName = [user.first_name, user.middle_name, user.last_name].filter(Boolean).join(' ') || user.username || 'User';

    const formatDate = (dateStr) => {
        if (!dateStr) return 'Recently';
        try {
            return new Date(dateStr).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch {
            return dateStr;
        }
    };

    return (
        <div className="mt-6 p-6 rounded-2xl bg-slate-950/70 border border-white/10 shadow-xl text-left animate-fadeIn space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h4 className="text-base font-bold text-white">{fullName}</h4>
                    <span className="text-xs text-slate-400">{user.email || 'No email provided'}</span>
                </div>
                <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    User ID #{user.id || profile.id}
                </span>
            </div>

            <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Biography</span>
                <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line bg-white/5 p-3 rounded-xl border border-white/5">
                    {profile.bio || 'No bio provided.'}
                </p>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-slate-900/80 p-3 rounded-xl border border-white/5 text-center">
                <div>
                    <span className="block text-lg font-bold text-white">{profile.followers_count ?? 0}</span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Followers</span>
                </div>
                <div>
                    <span className="block text-lg font-bold text-white">{profile.following_count ?? 0}</span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Following</span>
                </div>
            </div>

            <div className="text-[11px] text-slate-500 flex justify-between pt-2 border-t border-white/5">
                <span>Joined: {formatDate(profile.created_at)}</span>
                <span>Profile ID: #{profile.id}</span>
            </div>
        </div>
    );
}
