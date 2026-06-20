/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { ThumbsUp, MessageSquare, Send, Sparkles, UserCheck } from 'lucide-react';
import { Post, Comment } from '../types';

interface CommunitySectionProps {
  posts: Post[];
  onAddPost: (content: string) => void;
  onLikePost: (postId: string) => void;
  onAddComment: (postId: string, commentContent: string) => void;
}

export default function CommunitySection({ posts, onAddPost, onLikePost, onAddComment }: CommunitySectionProps) {
  const [newPostContent, setNewPostContent] = useState('');
  const [commentInputs, setCommentInputs] = useState<{ [postId: string]: string }>({});

  const handlePostSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;
    onAddPost(newPostContent);
    setNewPostContent('');
  };

  const handleCommentSubmit = (postId: string) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;
    onAddComment(postId, text);
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  return (
    <div className="w-full space-y-6 dir-rtl text-right">
      {/* Title & Badge */}
      <div className="flex items-center justify-between border-b border-sky-100 pb-3">
        <div>
          <h2 className="font-sans font-bold text-slate-800 text-[16px]">مجتمع أكاديمية النور 👋</h2>
          <p className="text-[11px] text-slate-400 font-medium">تواصل مع زملائك الطلاب، اطرح سؤالاً، أو شارك إنجازاً علمياً!</p>
        </div>
        <span className="px-3 py-1 bg-sky-50 text-sky-700 rounded-full text-xs font-bold font-mono">
          {posts.length} منشورات
        </span>
      </div>

      {/* Write a New Post Container */}
      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-xs">
        <form onSubmit={handlePostSubmit} className="space-y-3">
          <textarea
            rows={2}
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="اكتب شيئاً للمجتمع... (طرح سؤال، أو نشر إنجازك اليومي! 🌟)"
            className="w-full p-3.5 bg-slate-50 border border-slate-150 rounded-2xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-sky-500 focus:bg-white transition-all text-right resize-none"
          />
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              منشورك يظهر لجميع المعلمين والطلاب المسجلين.
            </span>
            <button
              type="submit"
              disabled={!newPostContent.trim()}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span>انشر الآن</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>

      {/* Feed Posts */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs space-y-4">
            {/* Post Author info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src={post.avatar} 
                  alt={post.author} 
                  className="w-10 h-10 rounded-full border-2 border-sky-100 object-cover" 
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-800 leading-tight">{post.author}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                    <span className="bg-sky-50 text-sky-700 px-1.5 py-0.5 rounded-sm font-semibold">{post.role}</span>
                    <span>•</span>
                    <span>{post.createdAt}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Post text */}
            <p className="text-xs text-slate-700 leading-relaxed font-normal whitespace-pre-line">
              {post.content}
            </p>

            {/* Actions (Likes, Replies badge) */}
            <div className="flex items-center gap-4 pt-3 border-t border-slate-50 text-slate-500 text-xs">
              <button 
                onClick={() => onLikePost(post.id)}
                className={`flex items-center gap-1.5 font-bold transition-all p-1 hover:text-sky-600 cursor-pointer active:scale-90 ${post.likedByUser ? 'text-sky-600' : 'text-slate-500'}`}
              >
                <ThumbsUp className={`w-4 h-4 ${post.likedByUser ? 'fill-sky-100' : ''}`} />
                <span>أعجبني ({post.likes})</span>
              </button>

              <div className="flex items-center gap-1.5 p-1">
                <MessageSquare className="w-4 h-4 text-emerald-500" />
                <span>الردود ({post.comments.length})</span>
              </div>
            </div>

            {/* Comments Thread */}
            <div className="bg-slate-50/70 p-3 rounded-2xl space-y-3">
              {post.comments.map((comment) => (
                <div key={comment.id} className="flex gap-2.5 items-start text-xs border-b border-slate-100/60 pb-2.5 last:border-0 last:pb-0">
                  <img 
                    src={comment.avatar} 
                    alt={comment.author} 
                    className="w-7 h-7 rounded-full object-cover mt-0.5 shrink-0 border border-slate-200" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-bold text-slate-800 text-[11px]">{comment.author}</span>
                      <span className="text-[9px] text-slate-400">{comment.createdAt}</span>
                    </div>
                    <p className="text-slate-600 leading-normal">{comment.content}</p>
                  </div>
                </div>
              ))}

              {/* Add Comment input form */}
              <div className="flex gap-2.5 mt-3 pt-3 border-t border-slate-100/50">
                <input
                  type="text"
                  value={commentInputs[post.id] || ''}
                  onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                  placeholder="اكتب رداً على هذا المنشور..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCommentSubmit(post.id);
                  }}
                  className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-sky-500 text-right"
                />
                <button
                  type="button"
                  onClick={() => handleCommentSubmit(post.id)}
                  className="w-8 h-8 rounded-xl bg-sky-50 hover:bg-sky-100 flex items-center justify-center text-sky-600 transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
