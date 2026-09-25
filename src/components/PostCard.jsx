'use client';

import { useState } from 'react';

/**
 * 🧱 Reusable PostCard Component
 * Encapsulates the UI for individual posts from /users/posts/
 * Supports editing only the caption (PATCH /users/posts/<id>/) and delete (DELETE /users/posts/<id>/)
 */
export default function PostCard({ post, onUpdateCaption, onDeletePost, badgeLabel }) {
    const [isEditing, setIsEditing] = useState(false);
    const [captionText, setCaptionText] = useState(post.caption || '');
    const [isLiked, setIsLiked] = useState(post.is_liked || false);
    const [likeCount, setLikeCount] = useState(post.likes_count || 0);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    };

    const handleSaveCaption = async () => {
        if (!captionText.trim()) return;
        setIsSaving(true);
        try {
            await onUpdateCaption(post.id, captionText.trim());
            setIsEditing(false);
        } catch (err) {
            alert(`Error: ${err.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (confirm(`Are you sure you want to delete post #${post.id}?`)) {
            setIsDeleting(true);
            try {
                await onDeletePost(post.id);
            } catch (err) {
                alert(`Error: ${err.message}`);
                setIsDeleting(false);
            }
        }
    };

    const authorName = post.username || post.author?.username || 'testuser';
    const postImage = post.image || post.image_url || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800';

    return (
        <article className="rounded-3xl bg-slate-900/80 backdrop-blur-md border border-white/10 overflow-hidden shadow-xl hover:shadow-2xl hover:border-white/20 transition-all flex flex-col justify-between group">
            {/* Header */}
            <div className="flex items-center justify-between p-3.5 border-b border-white/5 bg-slate-950/40">
                <div className="flex items-center gap-2.5">
                    <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
                        alt={authorName}
                        className="w-8 h-8 rounded-full object-cover border border-pink-500"
                    />
                    <span className="text-sm font-semibold text-slate-200">@{authorName}</span>
                </div>
                {badgeLabel ? (
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {badgeLabel}
                    </span>
                ) : (
                    <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                        ID #{post.id}
                    </span>
                )}
            </div>

            {/* Media */}
            <div className="relative aspect-square w-full bg-black overflow-hidden">
                <img
                    src={postImage}
                    alt="Post media"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800';
                    }}
                />
            </div>

            {/* Body & Actions */}
            <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
                {/* Stats Bar */}
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
                    <button
                        onClick={handleLike}
                        className="flex items-center gap-1.5 hover:text-pink-500 active:scale-125 transition-all text-sm"
                        title="Like Post"
                    >
                        <span>{isLiked ? '❤️' : '🤍'}</span>
                        <span className={isLiked ? 'text-pink-400 font-bold' : 'text-slate-300'}>{likeCount}</span>
                    </button>
                    <span className="flex items-center gap-1">
                        💬 {post.comments_count || 0}
                    </span>
                    <span className="flex items-center gap-1">
                        🔄 {post.shares_count || 0}
                    </span>
                </div>

                {/* Caption View / Inline Caption Editor */}
                {isEditing ? (
                    <div className="space-y-2 animate-fadeIn bg-slate-950/70 p-3 rounded-2xl border border-indigo-500/40">
                        <label className="block text-[10px] font-bold text-indigo-300 uppercase tracking-wider">
                            Edit Caption for Post #{post.id} (PATCH /users/posts/{post.id}/)
                        </label>
                        <textarea
                            value={captionText}
                            onChange={(e) => setCaptionText(e.target.value)}
                            rows={2}
                            className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
                            placeholder="Update caption..."
                        />
                        <div className="flex items-center justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => { setIsEditing(false); setCaptionText(post.caption || ''); }}
                                className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-medium text-slate-300"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSaveCaption}
                                disabled={isSaving}
                                className="px-3.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-[11px] font-semibold text-white shadow disabled:opacity-50"
                            >
                                {isSaving ? 'Saving...' : '💾 Save Caption'}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-xs text-slate-200 leading-relaxed break-words">
                        <strong className="text-white mr-1.5 font-semibold">@{authorName}</strong>
                        <span>{post.caption || 'No caption'}</span>
                    </div>
                )}

                {/* Post Controls: Edit Caption & Delete Post */}
                <div className="pt-3 border-t border-white/5 flex gap-2">
                    <button
                        type="button"
                        onClick={() => setIsEditing(!isEditing)}
                        className="flex-1 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all flex items-center justify-center gap-1"
                    >
                        ✏️ Edit Caption
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="flex-1 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-xs font-semibold text-red-400 hover:text-red-300 transition-all flex items-center justify-center gap-1 disabled:opacity-50"
                    >
                        {isDeleting ? '⏳ Deleting...' : '🗑️ Delete Post'}
                    </button>
                </div>
            </div>
        </article>
    );
}
