/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Clock, BookOpen, GraduationCap, ChevronLeft } from 'lucide-react';
import { Course } from '../types';
import CourseImage from './CourseImage';

interface CourseCardProps {
  course: Course;
  onClick: () => void;
  onEnroll?: () => void;
}

export default function CourseCard({ course, onClick, onEnroll }: CourseCardProps) {
  const isSuggested = course.status === 'suggested';

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer group active:scale-98 text-right dir-rtl w-[205px] shrink-0 relative overflow-hidden"
    >
      {/* Course image/illustration banner */}
      <div className="w-full h-28 mb-3 rounded-2xl overflow-hidden relative group-hover:scale-102 transition-transform duration-300">
        <CourseImage type={course.imageType} className="w-full h-full object-cover" />
        <span className="absolute top-2 right-2 px-2.5 py-1 bg-white/90 backdrop-blur-xs rounded-full text-[10px] font-bold text-sky-800 shadow-xs">
          {course.category}
        </span>
      </div>

      {/* Course Title */}
      <div className="flex-1">
        <h3 className="font-sans font-bold text-slate-800 text-sm leading-snug group-hover:text-sky-600 transition-colors line-clamp-2 h-10">
          {course.title}
        </h3>
        
        {/* Instructor */}
        <p className="text-[11px] text-slate-500 font-medium mt-1.5 flex items-center gap-1">
          <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
          <span>المعلم: {course.instructor}</span>
        </p>

        {/* Duration / Stats */}
        <div className="flex items-center gap-3 mt-2 text-[10px] font-semibold text-slate-600">
          <span className="flex items-center gap-1 bg-slate-50 px-1.5 py-0.5 rounded-md">
            <Clock className="w-3 h-3 text-sky-500" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1 bg-slate-50 px-1.5 py-0.5 rounded-md">
            <BookOpen className="w-3 h-3 text-teal-500" />
            {course.lessonsCount} دروس
          </span>
        </div>
      </div>

      {/* Progress or Enroll Button */}
      <div className="mt-4 pt-3 border-t border-slate-50">
        {!isSuggested ? (
          <div>
            {/* Progress Bar */}
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 mb-1.5">
              <span className={`px-2 py-0.5 rounded-md text-[9px] ${course.progress === 100 ? 'bg-emerald-50 text-emerald-600' : 'bg-sky-50 text-sky-600'}`}>
                {course.progress === 100 ? 'مكتمل ✅' : 'مستمر'}
              </span>
              <span className="font-mono text-slate-800">{course.progress}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${course.progress === 100 ? 'bg-emerald-500' : 'bg-emerald-500/80'}`} 
                style={{ width: `${course.progress}%` }} 
              />
            </div>
          </div>
        ) : (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              if (onEnroll) onEnroll();
            }}
            className="w-full py-2 bg-linear-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white rounded-xl text-xs font-bold shadow-xs hover:shadow-md active:scale-95 transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>ابدأ التعلم الآن</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
