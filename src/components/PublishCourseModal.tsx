/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { X, Sparkles, BookOpen, Plus, Trash2, Globe, Laptop, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Course, CourseImageType, Lesson } from '../types';

interface PublishCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (course: Course) => void;
}

export default function PublishCourseModal({ isOpen, onClose, onPublish }: PublishCourseModalProps) {
  const [title, setTitle] = useState('');
  const [instructor, setInstructor] = useState('أ. مازن علي');
  const [category, setCategory] = useState('البرمجة');
  const [duration, setDuration] = useState('15 ساعة');
  const [description, setDescription] = useState('');
  const [imageType, setImageType] = useState<CourseImageType>('code');
  const [lessonLabel, setLessonLabel] = useState('');
  const [lessons, setLessons] = useState<Omit<Lesson, 'id'>[]>([
    { title: 'الدرس الأول: مقدمة ومفاهيم أساسية', duration: '15 دقيقة', isCompleted: false },
    { title: 'الدرس الثاني: التطبيق العملي الأول', duration: '20 دقيقة', isCompleted: false },
  ]);

  if (!isOpen) return null;

  const handleAddLesson = () => {
    if (!lessonLabel.trim()) return;
    setLessons(prev => [
      ...prev,
      { title: lessonLabel.trim(), duration: '25 دقيقة', isCompleted: false }
    ]);
    setLessonLabel('');
  };

  const handleRemoveLesson = (index: number) => {
    setLessons(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newCourse: Course = {
      id: `published-${Date.now()}`,
      title: title.trim(),
      category,
      instructor: instructor.trim(),
      duration: duration.trim(),
      lessonsCount: lessons.length || 1,
      imageType,
      progress: 0,
      status: 'suggested', // It goes to suggested so student can enroll in it!
      description: description.trim(),
      lessons: lessons.map((l, i) => ({
        ...l,
        id: `pub-l-${Date.now()}-${i}`
      }))
    };

    onPublish(newCourse);
    
    // Reset state
    setTitle('');
    setLessons([
      { title: 'الدرس الأول: مقدمة ومفاهيم أساسية', duration: '15 دقيقة', isCompleted: false },
      { title: 'الدرس الثاني: التطبيق العملي الأول', duration: '20 دقيقة', isCompleted: false },
    ]);
    setDescription('');
    onClose();
  };

  const presets: { id: CourseImageType; label: string; icon: string }[] = [
    { id: 'code', label: 'حوسبة / برمجة', icon: '💻' },
    { id: 'palette', label: 'فنون وتصميم', icon: '🎨' },
    { id: 'english', label: 'لغات أجنبية', icon: '🇬🇧' },
    { id: 'physics', label: 'فيزياء وعلوم', icon: '🔬' },
    { id: 'math', label: 'رياضيات وحساب', icon: '📐' },
    { id: 'business', label: 'ريادة ومالية', icon: '📈' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-930/40 backdrop-blur-xs dir-rtl">
        {/* Backdrop trigger */}
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="relative bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 z-10 p-6 text-right max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-sky-50 flex items-center justify-center text-sky-600">
                <BookOpen className="w-5 h-5" />
              </div>
              <h2 className="font-sans font-bold text-slate-800 text-[16px]">نشر دورة جديدة 🚀</h2>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 hover:bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form container - Scrollable */}
          <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 space-y-4 pr-1 pl-1">
            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">اسم الدورة التعليمية *</label>
              <input 
                type="text" 
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="مثال: الواجهة البرمجية في رياكت"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-hidden focus:border-sky-500 focus:bg-white transition-all text-right"
              />
            </div>

            {/* Grid instructor, category */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">اسم المعلم / المعلمة *</label>
                <input 
                  type="text" 
                  required
                  value={instructor}
                  onChange={(e) => setInstructor(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-hidden focus:border-sky-500 focus:bg-white text-right"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">القسم / التصنيف *</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-hidden focus:border-sky-500 focus:bg-white text-right"
                >
                  <option value="البرمجة">البرمجة</option>
                  <option value="الفنون">الفنون</option>
                  <option value="اللغات">اللغات</option>
                  <option value="الرياضيات">الرياضيات</option>
                  <option value="الفيزياء">الفيزياء</option>
                  <option value="أعمال">أعمال</option>
                </select>
              </div>
            </div>

            {/* Preset Image Illustration Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">شعار أو غلاف الدورة (الرسم الفني الذكي) *</label>
              <div className="grid grid-cols-3 gap-2">
                {presets.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setImageType(p.id)}
                    className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${imageType === p.id ? 'border-sky-500 bg-sky-50/50 text-sky-800 font-bold' : 'border-slate-200 bg-slate-50 text-slate-600'}`}
                  >
                    <span className="block text-lg mb-0.5">{p.icon}</span>
                    <span className="text-[10px]">{p.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Grid Duration */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">المدة التقديرية للدورة *</label>
              <input 
                type="text" 
                required
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="مثال: 20 ساعة"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-hidden focus:border-sky-500 text-right"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">وصف موجز عن الدورة</label>
              <textarea 
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="سنتناول في هذه الدورة شرح أسرار ومفاهيم..."
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-hidden focus:border-sky-500 text-right leading-relaxed resize-none"
              />
            </div>

            {/* Syllabus Lessons list adding */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">محتويات ومنهج الدرس * ({lessons.length} محاضرات)</label>
              
              {/* input with Plus button */}
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={lessonLabel}
                  onChange={(e) => setLessonLabel(e.target.value)}
                  placeholder="مثال: أساسيات كوكيز الجلسة"
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-hidden focus:bg-white text-right"
                />
                <button
                  type="button"
                  onClick={handleAddLesson}
                  className="px-3.5 py-2 bg-slate-700 text-white rounded-xl text-xs font-bold hover:bg-slate-800 cursor-pointer active:scale-95 transition-all flex items-center justify-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة</span>
                </button>
              </div>

              {/* Added Lessons Queue */}
              <div className="mt-2 space-y-1.5 max-h-36 overflow-y-auto bg-slate-50 p-2 rounded-xl">
                {lessons.length === 0 ? (
                  <p className="text-[10px] text-slate-400 text-center py-4">لم تقم بإضافة دروس للمنهج حتى الآن. (دورة خالية)</p>
                ) : (
                  lessons.map((lesson, index) => (
                    <div key={index} className="flex items-center justify-between text-xs bg-white p-2 border border-slate-100 rounded-lg">
                      <span className="font-bold text-slate-700 text-[11px] truncate max-w-[80%]">
                        {index + 1}. {lesson.title}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveLesson(index)}
                        className="text-stone-400 hover:text-rose-500 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Submit banner */}
            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2 shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
              >
                إلغاء الأمر
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold hover:shadow-md transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 fill-white/10" />
                <span>نشر الدورة مباشرة ✨</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
