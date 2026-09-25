'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import PostCard from '@/components/PostCard';
import InstagramPost from '@/components/InstagramPost';
import CreatePostModal from '@/components/CreatePostModal';
import { fetchPosts, updatePostCaption, deletePost, createPost } from '@/lib/api';

export default function PostsPage() {
    const router = useRouter();
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toast, setToast] = useState(null);

    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(null), 3500);
    };

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

        loadPosts(storedToken);
    }, [router]);

    const loadPosts = async (activeToken) => {
        setIsLoading(true);
        try {
            const data = await fetchPosts(activeToken);
            setPosts(data);
        } catch (err) {
            showToast(`❌ ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Update caption only via PATCH /users/posts/<id>/
     */
    const handleUpdateCaption = async (postId, newCaption) => {
        const updatedPost = await updatePostCaption(token, postId, newCaption);
        setPosts((prev) =>
            prev.map((p) => (p.id === postId ? { ...p, caption: updatedPost.caption || newCaption, updated_at: updatedPost.updated_at } : p))
        );
        showToast(`💾 Caption for post #${postId} updated via PATCH /users/posts/${postId}/!`);
    };

    /**
     * Delete post via DELETE /users/posts/<id>/
     */
    const handleDeletePost = async (postId) => {
        const msg = await deletePost(token, postId);
        setPosts((prev) => prev.filter((p) => p.id !== postId));
        showToast(`🗑️ ${msg} (DELETE /users/posts/${postId}/)`);
    };

    /**
     * Create post via POST /users/posts/
     */
    const handleCreatePost = async (imageUrl, caption) => {
        const newPost = await createPost(token, imageUrl, caption);
        setPosts((prev) => [newPost, ...prev]);
        showToast(`🚀 Post #${newPost.id} published via POST /users/posts/!`);
    };

    if (!token) return null;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
            <Navbar user={user} token={token} />

            {toast && (
                <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-slate-900 border border-pink-500/40 text-slate-200 text-sm shadow-2xl animate-fadeIn">
                    {toast}
                </div>
            )}

            <main className="flex-grow max-w-6xl w-full mx-auto px-4 py-8 space-y-8">
                {/* Header Section */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
                    <div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">Your Posts</h2>
                        <p className="text-xs text-slate-400 mt-0.5">
                            Connected to <code className="text-pink-400 font-mono">/users/posts/</code> with caption editing (PATCH) and delete options
                        </p>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <button
                            onClick={() => loadPosts(token)}
                            disabled={isLoading}
                            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all"
                        >
                            🔄 Refresh
                        </button>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-xs font-bold shadow-lg shadow-pink-500/25 transition-all"
                        >
                            ➕ Create Post
                        </button>
                    </div>
                </div>

                {/* Educational Section: Zero-Prop <InstagramPost /> Component Demonstration */}
                <section className="p-6 rounded-3xl bg-indigo-950/40 border border-indigo-500/30 space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                        <div>
                            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
                                🧩 Component Demo: Zero-Prop &lt;InstagramPost /&gt;
                            </span>
                            <p className="text-xs text-slate-300 mt-0.5">
                                Writing <code className="text-pink-400 font-mono">&lt;InstagramPost /&gt;</code> below renders this complete section.
                                Writing it once more right below stamps out another identical section with isolated state!
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        <div>
                            <div className="text-[11px] font-mono text-slate-400 mb-2">
                                Section 1: <code>&lt;InstagramPost /&gt;</code>
                            </div>
                            <InstagramPost />
                        </div>
                        <div>
                            <div className="text-[11px] font-mono text-slate-400 mb-2">
                                Section 2: <code>&lt;InstagramPost /&gt;</code> (Written again below!)
                            </div>
                            <InstagramPost />
                        </div>
                    </div>
                </section>

                {/* Posts from DRF Backend (/users/posts/) */}
                <section className="space-y-4">
                    <h3 className="text-lg font-bold text-white tracking-tight">Backend Posts Feed (/users/posts/)</h3>

                    {isLoading ? (
                        <div className="text-center py-20 text-slate-400 text-sm">
                            ⏳ Loading posts from /users/posts/...
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="text-center py-20 text-slate-500 text-sm">
                            No posts found. Click "+ Create Post" to add one!
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {posts.map((post) => (
                                <PostCard
                                    key={post.id}
                                    post={post}
                                    onUpdateCaption={handleUpdateCaption}
                                    onDeletePost={handleDeletePost}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </main>

            <CreatePostModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreatePost={handleCreatePost}
            />
        </div>
    );
}
