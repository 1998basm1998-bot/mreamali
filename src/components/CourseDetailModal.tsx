/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X, CheckCircle, Play, Sparkles, GraduationCap, Clock, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Course } from '../types';
import CourseImage from './CourseImage';

interface CourseDetailModalProps {
  course: Course | null;
  onClose: () => void;
  onToggleLesson: (courseId: string, lessonId: string) => void;
}

export default function CourseDetailModal({ course, onClose, onToggleLesson }: CourseDetailModalProps) {
  if (!course) return null;

  const completedCount = course.lessons.filter(l => l.isCompleted).length;
  const totalLessons = course.lessons.length;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs dir-rtl">
        {/* Backdrop clickable trigger */}
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          className="relative bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 z-10 flex flex-col max-h-[85vh]"
        >
          {/* Header Banner Image */}
          <div className="relative h-44 w-full shrink-0">
            <CourseImage type={course.imageType} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-slate-950/25 to-transparent" />
            
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 bg-white/95 backdrop-blur-xs rounded-full flex items-center justify-center text-slate-700 shadow-md hover:bg-slate-100 cursor-pointer active:scale-90 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title / Info Overlap */}
            <div className="absolute bottom-4 right-4 left-4 text-white text-right">
              <span className="px-2.5 py-1 bg-sky-500 rounded-full text-[10px] font-bold">
                {course.category}
              </span>
              <h2 className="font-sans font-bold text-lg mt-1.5 drop-shadow-md leading-tight">
                {course.title}
              </h2>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="p-5 overflow-y-auto space-y-6 text-right">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
                <Clock className="w-5 h-5 text-sky-500 mb-1" />
                <span className="text-[10px] text-slate-400 font-bold">مدة الدورة</span>
                <span className="text-xs text-slate-700 font-bold font-mono mt-0.5">{course.duration}</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
                <GraduationCap className="w-5 h-5 text-pink-500 mb-1" />
                <span className="text-[10px] text-slate-400 font-bold">المعلم</span>
                <span className="text-xs text-slate-700 font-bold mt-0.5 truncate max-w-full">{course.instructor}</span>
              </div>

              <div className="bg-slate-55 p-3 rounded-2xl border border-slate-100 flex flex-col items-center text-center bg-teal-50/50">
                <Award className="w-5 h-5 text-emerald-600 mb-1" />
                <span className="text-[10px] text-slate-400 font-bold">التقدم</span>
                <span className="text-xs text-emerald-700 font-bold font-mono mt-0.5">
                  {completedCount}/{totalLessons} درس
                </span>
              </div>
            </div>

            {/* Course Description */}
            <div>
              <h3 className="font-sans font-bold text-slate-800 text-sm mb-1.5">حول الدورة</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {course.description || "لا يوجد وصف مدخل لهذه الدورة حالياً. انضم وتابع الدروس لرفد مستوياتك العلمية."}
              </p>
            </div>

            {/* Progress Meter bar */}
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="font-bold text-slate-700">معدل الإنجاز الكلي</span>
                <span className="font-bold font-mono text-emerald-600">{course.progress}%</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden relative">
                <div 
                  className="h-full bg-linear-to-r from-emerald-400 to-emerald-500 transition-all duration-300"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              {course.progress === 100 && (
                <div className="mt-2.5 p-3 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-2 text-xs text-emerald-700 font-semibold">
                  <Sparkles className="w-5 h-5 text-emerald-500 fill-emerald-100 shrink-0" />
                  <span>تهانينا الحارة! لقد أتممت جميع محاضرات هذه الدورة بنجاح وحصلت على الشهادة! 🎓</span>
                </div>
              )}
            </div>

            {/* Lesson Syllabus List */}
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-1.5">
                <h3 className="font-sans font-bold text-slate-800 text-sm">مفردات المنهج الدراسي</h3>
                <span className="text-[11px] text-slate-400">انقر لتسجيل الحضور والإنجاز</span>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {course.lessons.map((lesson, idx) => (
                  <button
                    key={lesson.id}
                    onClick={() => onToggleLesson(course.id, lesson.id)}
                    className={`w-full p-3 rounded-2xl border text-right transition-all flex items-center justify-between group active:scale-99 cursor-pointer ${lesson.isCompleted ? 'bg-emerald-50/40 border-emerald-100 hover:bg-emerald-50' : 'bg-slate-50/70 border-slate-100 hover:bg-slate-100'}`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${lesson.isCompleted ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
                        {idx + 1}
                      </div>
                      <div className="text-right">
                        <p className={`text-xs font-bold transition-all ${lesson.isCompleted ? 'text-emerald-800 line-through' : 'text-slate-700 group-hover:text-sky-600'}`}>
                          {lesson.title}
                        </p>
                        <span className="text-[10px] text-slate-400 font-mono">{lesson.duration}</span>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center">
                      {lesson.isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-emerald-500 fill-emerald-100" />
                      ) : (
                        <Play className="w-4 h-4 text-slate-400 group-hover:text-sky-500 transition-colors" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Call to Action */}
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-2 shrink-0 justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 transition-colors text-slate-700 font-bold text-xs rounded-xl active:scale-95 cursor-pointer"
            >
              إغلاق النافذة
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
