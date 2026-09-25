'use client';

export default function ProfileAvatar({ profilePic, username, size = 'lg' }) {
    const sizeClasses = size === 'lg' ? 'w-28 h-28 border-4' : 'w-14 h-14 border-2';
    const defaultPic = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400';
    const displayPic = profilePic || defaultPic;

    return (
        <div className="flex flex-col items-center text-center my-4">
            <div className="p-1 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 shadow-xl shadow-pink-500/25 animate-pulse">
                <img
                    src={displayPic}
                    alt={username || 'Profile DP'}
                    className={`${sizeClasses} rounded-full object-cover border-slate-900 bg-slate-800`}
                    onError={(e) => {
                        e.currentTarget.src = defaultPic;
                    }}
                />
            </div>
            <h3 className="text-xl font-bold text-white mt-3">@{username || 'user'}</h3>
        </div>
    );
}
