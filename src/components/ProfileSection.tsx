/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Award, BookOpen, Clock, Flame, ShieldAlert, Sparkles, Trophy, Calendar } from 'lucide-react';
import { UserStats, Course } from '../types';

interface ProfileSectionProps {
  userStats: UserStats;
  courses: Course[];
}

export default function ProfileSection({ userStats, courses }: ProfileSectionProps) {
  const activeCoursesCount = courses.filter(c => c.status === 'active' && c.progress < 100).length;
  const completedCourses = courses.filter(c => c.progress === 100);

  // Simple study calendar logic (just grid of days)
  const daysOfWeek = [
    { name: 'الأحد', state: 'completed' },
    { name: 'الإثنين', state: 'completed' },
    { name: 'الثلاثاء', state: 'completed' },
    { name: 'الأربعاء', state: 'completed' },
    { name: 'الخميس', state: 'completed' },
    { name: 'الجمعة', state: 'waiting' },
    { name: 'السبت', state: 'waiting' },
  ];

  return (
    <div className="w-full space-y-6 dir-rtl text-right">
      {/* Student Badge Card */}
      <div className="bg-linear-to-l from-sky-600 to-sky-500 rounded-3xl p-6 text-white relative overflow-hidden shadow-lg">
        {/* Background decorative vector */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-12 -translate-y-12 blur-xl" />
        <div className="absolute bottom-0 right-0 w-44 h-44 bg-sky-300/10 rounded-full translate-x-16 translate-y-16 blur-2xl" />

        <div className="relative flex flex-col sm:flex-row items-center gap-4">
          <img 
            src={userStats.avatar} 
            alt={userStats.name} 
            className="w-16 h-16 rounded-full border-4 border-white/30 object-cover" 
            referrerPolicy="no-referrer"
          />
          <div className="text-center sm:text-right flex-1 space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 justify-center sm:justify-start">
              <h2 className="font-sans font-bold text-xl">مرحباً، {userStats.name}!</h2>
              <span className="inline-flex items-center gap-1 bg-amber-400 text-amber-950 font-bold px-2 py-0.5 rounded-full text-[10px] self-center">
                <Trophy className="w-3 h-3 text-amber-950 fill-amber-950" />
                {userStats.level}
              </span>
            </div>
            <p className="text-sky-100 text-xs">طالب شغوف مسجل في أكاديمية النور منذ يونيو 2026</p>
          </div>
        </div>
      </div>

      {/* learning statistics metric grids */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-xs flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-500 mb-2">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-slate-800 font-bold font-mono text-lg">{activeCoursesCount}</span>
          <span className="text-[10px] text-slate-400 font-bold mt-0.5">دورات مستمرة</span>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-xs flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 mb-2">
            <Award className="w-5 h-5" />
          </div>
          <span className="text-emerald-600 font-bold font-mono text-lg">{completedCourses.length}</span>
          <span className="text-[10px] text-slate-400 font-bold mt-0.5">دورات منجزة</span>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-xs flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 mb-2">
            <Clock className="w-5 h-5" />
          </div>
          <span className="text-amber-600 font-bold font-mono text-lg">{userStats.totalStudyHours} س</span>
          <span className="text-[10px] text-slate-400 font-bold mt-0.5">إجمالي ساعات الدراسة</span>
        </div>
      </div>

      {/* Gamified study calendars */}
      <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-50 pb-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-sky-500" />
            <h3 className="font-sans font-bold text-slate-800 text-sm">أجندة الحضور الأسبوعية</h3>
          </div>
          <span className="text-[10px] text-slate-400">سجل حضورك اليومي للحفاظ على السلسلة</span>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {daysOfWeek.map((day, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1.5">
              <span className="text-[10px] text-slate-400 font-bold">{day.name}</span>
              <div 
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  day.state === 'completed' 
                    ? 'bg-emerald-500 text-white shadow-xs' 
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {day.state === 'completed' ? '✓' : idx + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Earned Academic Certificates catalog */}
      <div className="bg-white p-5 rounded-3xl border border-slate-100 overflow-hidden shadow-xs space-y-4">
        <div className="flex items-center gap-1.5 border-b border-slate-50 pb-2">
          <Trophy className="w-5 h-5 text-amber-500 fill-amber-100" />
          <h3 className="font-sans font-bold text-slate-800 text-sm">شهادات الأكاديمية المصدرة</h3>
        </div>

        {completedCourses.length === 0 ? (
          <div className="py-6 text-center text-slate-400 space-y-1.5">
            <ShieldAlert className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-xs">لم تنجز أي دورة تعليمية بالكامل بعد.</p>
            <p className="text-[10px] text-slate-400">عند إتمام إحدى الدورات بنسبة 100% ستظهر شهادتك المعتمدة هنا!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {completedCourses.map((c) => (
              <div key={c.id} className="p-3.5 bg-linear-to-l from-indigo-50/50 to-sky-50/50 rounded-2xl border border-slate-100/80 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{c.title}</h4>
                  <p className="text-[9px] text-indigo-700 font-bold mt-1">المعلم: {c.instructor} • معتمدة برقم تسلسلي</p>
                </div>
                <button 
                  onClick={() => alert(`📜 شهادة معتمدة من أكاديمية النور باسم: مرام\nلدورة: "${c.title}"\nنشكرك على إخلاصك الأكاديمي!`)}
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold rounded-lg cursor-pointer transition-colors"
                >
                  تحميل الشهادة
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
