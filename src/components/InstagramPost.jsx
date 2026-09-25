'use client';

import { useState } from 'react';

/**
 * 🧱 Self-Contained <InstagramPost /> Component
 * 
 * ✨ Usage:
 * Simply write:
 * <InstagramPost />
 * 
 * Writing it again adds another identical section with completely isolated state:
 * <InstagramPost />
 * <InstagramPost />
 */
export default function InstagramPost() {
    const [caption, setCaption] = useState('Chasing golden hour at the coastline 🌅🌊 #beachvibes #sunset');
    const [isEditing, setIsEditing] = useState(false);
    const [editCaption, setEditCaption] = useState(caption);
    const [likes, setLikes] = useState(142);
    const [isLiked, setIsLiked] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [comments, setComments] = useState(['Stunning view! 🔥', 'Great shot 📸']);
    const [newComment, setNewComment] = useState('');
    const [showComments, setShowComments] = useState(false);

    if (isDeleted) {
        return (
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center font-medium animate-fadeIn">
                🗑️ This &lt;InstagramPost /&gt; component instance was deleted.
            </div>
        );
    }

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    };

    const handleSaveCaption = () => {
        setCaption(editCaption);
        setIsEditing(false);
    };

    const handleAddComment = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            setComments([...comments, newComment.trim()]);
            setNewComment('');
        }
    };

    return (
        <article className="rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl hover:border-white/20 transition-all flex flex-col justify-between group">
            {/* Component Header */}
            <div className="flex items-center justify-between p-3.5 border-b border-white/5 bg-slate-950/40">
                <div className="flex items-center gap-2.5">
                    <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
                        alt="Author DP"
                        className="w-8 h-8 rounded-full object-cover border-2 border-pink-500"
                    />
                    <div>
                        <span className="text-sm font-bold text-slate-200 block leading-tight">@alex_creator</span>
                        <span className="text-[10px] text-slate-400">Verified Creator</span>
                    </div>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20">
                    &lt;InstagramPost /&gt;
                </span>
            </div>

            {/* Post Image */}
            <div className="relative aspect-square w-full bg-black overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800"
                    alt="Coastline sunset"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* Post Body & Interactive Controls */}
            <div className="p-4 space-y-3 flex-grow flex flex-col justify-between">
                {/* Likes & Comments Bar */}
                <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleLike}
                            className="flex items-center gap-1.5 hover:text-pink-500 active:scale-125 transition-all text-sm"
                            title="Like"
                        >
                            <span>{isLiked ? '❤️' : '🤍'}</span>
                            <span className={isLiked ? 'text-pink-400 font-bold' : 'text-slate-300'}>{likes}</span>
                        </button>
                        <button
                            onClick={() => setShowComments(!showComments)}
                            className="flex items-center gap-1 hover:text-slate-200 transition-all"
                        >
                            💬 {comments.length}
                        </button>
                    </div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">Just Now</span>
                </div>

                {/* Caption / Inline Editor */}
                {isEditing ? (
                    <div className="space-y-2 animate-fadeIn bg-slate-950/60 p-2.5 rounded-xl border border-indigo-500/40">
                        <label className="block text-[10px] font-bold text-indigo-300 uppercase tracking-wider">
                            Update Caption
                        </label>
                        <textarea
                            value={editCaption}
                            onChange={(e) => setEditCaption(e.target.value)}
                            rows={2}
                            className="w-full p-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => { setIsEditing(false); setEditCaption(caption); }}
                                className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-[11px] font-medium text-slate-300"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSaveCaption}
                                className="px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-[11px] font-semibold text-white shadow"
                            >
                                💾 Save Caption
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-xs text-slate-200 leading-relaxed break-words">
                        <strong className="text-white mr-1.5 font-semibold">@alex_creator</strong>
                        <span>{caption}</span>
                    </div>
                )}

                {/* Comments Dropdown */}
                {showComments && (
                    <div className="pt-2 border-t border-white/5 space-y-2 text-xs text-slate-300 animate-fadeIn">
                        <div className="space-y-1 max-h-24 overflow-y-auto">
                            {comments.map((c, i) => (
                                <div key={i} className="bg-white/5 px-2 py-1 rounded text-[11px]">
                                    {c}
                                </div>
                            ))}
                        </div>
                        <form onSubmit={handleAddComment} className="flex gap-1.5">
                            <input
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Add a comment..."
                                className="flex-1 px-2.5 py-1 rounded bg-slate-950 border border-white/10 text-[11px] text-white focus:outline-none focus:border-pink-500"
                            />
                            <button type="submit" className="px-2 py-1 rounded bg-pink-600 text-[10px] font-bold text-white">
                                Post
                            </button>
                        </form>
                    </div>
                )}

                {/* Action Controls: Edit Caption & Delete */}
                <div className="pt-3 border-t border-white/5 flex gap-2">
                    <button
                        type="button"
                        onClick={() => setIsEditing(!isEditing)}
                        className="flex-1 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all flex items-center justify-center gap-1"
                    >
                        ✏️ Edit Caption
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            if (confirm('Delete this <InstagramPost /> component?')) {
                                setIsDeleted(true);
                            }
                        }}
                        className="flex-1 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-xs font-semibold text-red-400 hover:text-red-300 transition-all flex items-center justify-center gap-1"
                    >
                        🗑️ Delete Post
                    </button>
                </div>
            </div>
        </article>
    );
}
