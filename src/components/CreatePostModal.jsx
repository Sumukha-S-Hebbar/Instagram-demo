'use client';

import { useState } from 'react';

export default function CreatePostModal({ isOpen, onClose, onCreatePost }) {
    const [imageUrl, setImageUrl] = useState('http://localhost:8000/media/posts/Panther.jpg');
    const [caption, setCaption] = useState('Sunset tranquil vibes ✨🌊');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onCreatePost(imageUrl.trim(), caption.trim());
            onClose();
        } catch (err) {
            alert(`Error: ${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
            <div className="w-full max-w-lg p-6 rounded-3xl bg-slate-900 border border-white/10 shadow-2xl relative">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h3 className="text-lg font-bold text-white">➕ Create New Post</h3>
                        <span className="text-[11px] font-mono text-pink-400">POST /users/posts/</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white text-xl font-bold p-1"
                    >
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                            Image URL / Media Path
                        </label>
                        <input
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            required
                            placeholder="http://localhost:8000/media/posts/Panther.jpg"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-pink-500 font-mono"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                            Caption
                        </label>
                        <textarea
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            rows={3}
                            required
                            placeholder="Write an inspiring caption..."
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-pink-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold text-xs shadow-lg shadow-pink-500/25 transition-all disabled:opacity-50"
                    >
                        {isSubmitting ? '⏳ Publishing to /users/posts/ ...' : '🚀 Publish Post'}
                    </button>
                </form>
            </div>
        </div>
    );
}
