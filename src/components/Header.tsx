/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Bell, Flame, Sparkles, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UserStats } from '../types';

interface HeaderProps {
  userStats: UserStats;
}

export default function Header({ userStats }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "مرحباً بك في أكاديمية النور! ✨", content: "تصفح الدورات الحالية وابدأ رحلتك التعليمية المتميزة اليوم.", unread: true, time: "الآن" },
    { id: 2, title: "رغبة مستمرة 🔥", content: "رائع! لقد حافظت على حضورك اليومي لمدة 5 أيام متتالية.", unread: true, time: "منذ ساعة" },
    { id: 3, title: "تحديث الدورة 🎨", content: "أضاف المدرب أ. مازن علي 3 دروس جديدة في دورة الجرافيك.", unread: false, time: "منذ أمس" }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  return (
    <header className="relative w-full bg-linear-to-b from-[#E7F6FE] to-[#F9FBFD] px-6 py-4 flex items-center justify-between border-b border-sky-100 dir-rtl">
      {/* Left Action / Profile & Notifications */}
      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <div className="relative">
          <button 
            id="notification-bell-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-10 h-10 flex items-center justify-center bg-white rounded-full text-slate-600 shadow-sm hover:shadow-md transition-all border border-sky-100 relative cursor-pointer active:scale-95"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full border border-white animate-pulse" />
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          <AnimatePresence>
            {showNotifications && (
              <>
                {/* Backdrop trigger */}
                <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="absolute left-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 text-right dir-rtl"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                    <h3 className="font-sans font-bold text-slate-800 text-sm">التنبيهات</h3>
                    {unreadCount > 0 && (
                      <button 
                        onClick={markAllRead} 
                        className="text-xs text-sky-600 hover:text-sky-800 font-medium"
                      >
                        قراءة الكل
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {notifications.map(notif => (
                      <div 
                        key={notif.id} 
                        className={`p-2.5 rounded-xl transition-all text-xs ${notif.unread ? 'bg-sky-50/50 border-r-4 border-sky-500' : 'bg-slate-50'}`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-slate-700">{notif.title}</span>
                          <span className="text-[10px] text-slate-400">{notif.time}</span>
                        </div>
                        <p className="text-slate-600 leading-relaxed">{notif.content}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Streak Flame Counter */}
        <div className="bg-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs border border-amber-100">
          <Flame className="w-5 h-5 text-amber-500 fill-amber-500 animate-bounce" />
          <span className="font-mono text-sm font-bold text-amber-600">{userStats.activeStreak} أيام</span>
        </div>
      </div>

      {/* Center/Right Noor Academy Title & Elegant Logo */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <h1 className="font-sans font-bold text-slate-800 text-[17px] tracking-tight leading-tight">Noor Academy</h1>
          <p className="font-sans font-medium text-sky-700 text-xs mt-0.5">أكاديمية النور</p>
        </div>
        
        {/* Noor Academy Logo SVG container matching image (feather icon with open book/blue flame) */}
        <div className="w-11 h-11 bg-white rounded-full shadow-xs border border-sky-100 flex items-center justify-center p-1.5">
          <svg viewBox="0 0 40 40" className="w-full h-full text-sky-600" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Elegant Open Book */}
            <path d="M7 26C12 26 19 28 19 32V14C19 10 12 8 7 8V26Z" fill="#7DD3FC" stroke="#0284C7" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M31 26C26 26 19 28 19 32V14C19 10 26 8 31 8V26Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" strokeLinejoin="round" />
            
            {/* Feather Pen rising from the book with glowing flame represent Light/Noor */}
            <path d="M19 8C19 8 16.5 16 16.5 22C16.5 23.5 17.5 25 19 25C20.5 25 21.5 23.5 21.5 22C21.5 16 19 8 19 8Z" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1" />
            <line x1="19" y1="12" x2="19" y2="23" stroke="#B45309" strokeWidth="1" />
            
            {/* Sparkles of light / search of knowledge */}
            <circle cx="10" cy="11" r="1.5" fill="#38BDF8" className="animate-ping" />
            <circle cx="28" cy="12" r="1" fill="#FBBF24" />
          </svg>
        </div>
      </div>
    </header>
  );
}
