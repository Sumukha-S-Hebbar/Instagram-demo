'use client';

import { useState, useRef } from 'react';

export default function CreatePostModal({ isOpen, onClose, onCreatePost }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [caption, setCaption] = useState('First Post');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef(null);

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            alert('Please select an image file to upload.');
            return;
        }

        setIsSubmitting(true);
        try {
            await onCreatePost(selectedFile, caption.trim());
            onClose();
        } catch (err) {
            alert(`Error creating post: ${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div className="w-full max-w-lg p-6 rounded-3xl bg-slate-900 border border-white/10 shadow-2xl relative">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h3 className="text-lg font-bold text-white">➕ Create New Post</h3>
                        <span className="text-[11px] font-mono text-pink-400">form-data (binary upload) → POST /users/posts/</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white text-xl font-bold p-1"
                    >
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* File Upload / Drag & Drop Area */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                            Select Image File (binary)
                        </label>
                        
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />

                        <div
                            onClick={() => fileInputRef.current?.click()}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleDrop}
                            className="w-full border-2 border-dashed border-white/15 hover:border-pink-500/50 rounded-2xl p-4 text-center cursor-pointer bg-slate-950/60 transition-all flex flex-col items-center justify-center min-h-[160px] group"
                        >
                            {previewUrl ? (
                                <div className="space-y-2 flex flex-col items-center">
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="w-32 h-32 object-cover rounded-xl border border-white/10 shadow-lg"
                                    />
                                    <div className="text-[11px] text-pink-400 font-mono font-medium">
                                        📁 {selectedFile?.name} ({(selectedFile?.size / 1024).toFixed(1)} KB)
                                    </div>
                                    <span className="text-[10px] text-slate-400 underline">Click or drop to replace</span>
                                </div>
                            ) : (
                                <div className="space-y-2 flex flex-col items-center py-4">
                                    <div className="w-12 h-12 rounded-2xl bg-pink-500/10 text-pink-400 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                        📷
                                    </div>
                                    <div className="text-xs font-semibold text-slate-200">
                                        Click to browse or drag & drop image
                                    </div>
                                    <span className="text-[10px] text-slate-500">
                                        Supports JPG, PNG, WEBP, GIF (form-data: <code className="text-pink-400">image (binary)</code>)
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Caption Input */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                            Caption (Text)
                        </label>
                        <textarea
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            rows={3}
                            required
                            placeholder="Write a caption for your post..."
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-pink-500 placeholder-slate-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold text-xs shadow-lg shadow-pink-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? '⏳ Uploading binary form-data to /users/posts/ ...' : '🚀 Publish Post'}
                    </button>
                </form>
            </div>
        </div>
    );
}
