/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Search, BookOpen, MessageSquare, User, Home, Plus, Sparkles, 
  RotateCcw, TrendingUp, BookmarkCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { Course, Post, UserStats } from './types';
import { initialCourses, initialPosts, initialUserStats } from './initialData';

import CarouselBanner from './components/CarouselBanner';
import Header from './components/Header';
import CourseCard from './components/CourseCard';
import CourseDetailModal from './components/CourseDetailModal';
import PublishCourseModal from './components/PublishCourseModal';
import CommunitySection from './components/CommunitySection';
import ProfileSection from './components/ProfileSection';

export default function App() {
  // 1. Core Persistent State
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('noor_academy_courses');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialCourses;
  });

  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('noor_academy_posts');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialPosts;
  });

  const [userStats, setUserStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('noor_academy_stats');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved); 
        // Force update name and avatar to latest from initialData
        return {
          ...parsed,
          name: initialUserStats.name,
          avatar: initialUserStats.avatar
        };
      } catch (e) { console.error(e); }
    }
    return initialUserStats;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('noor_academy_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('noor_academy_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('noor_academy_stats', JSON.stringify(userStats));
  }, [userStats]);

  // 2. UI & Filtering State
  const [activeTab, setActiveTab] = useState<'home' | 'courses' | 'forum' | 'profile'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Interactive Modal controllers
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [showPublishModal, setShowPublishModal] = useState(false);
  
  // Find currently focused course
  const activeSelectedCourse = courses.find(c => c.id === selectedCourseId) || null;

  // 3. User interactions handlers
  const handleEnrollInCourse = (courseId: string) => {
    setCourses(prevCourses => 
      prevCourses.map(course => {
        if (course.id === courseId) {
          // Switch stats to active & reset progress
          return {
            ...course,
            status: 'active',
            progress: 0,
            lessons: course.lessons.map(l => ({ ...l, isCompleted: false }))
          };
        }
        return course;
      })
    );
    
    // Push notification/alert
    const targetCourse = courses.find(c => c.id === courseId);
    if (targetCourse) {
      alert(`🎉 تم تسجيلك بنجاح في دورة "${targetCourse.title}"! تصفحها الآن في "دوراتي الحالية".`);
    }
  };

  const handleToggleLesson = (courseId: string, lessonId: string) => {
    setCourses(prevCourses => 
      prevCourses.map(course => {
        if (course.id === courseId) {
          const updatedLessons = course.lessons.map(lesson => 
            lesson.id === lessonId ? { ...lesson, isCompleted: !lesson.isCompleted } : lesson
          );
          
          // Re-calculate progress
          const completedCount = updatedLessons.filter(l => l.isCompleted).length;
          const totalCount = updatedLessons.length;
          const nextProgress = Math.round((completedCount / totalCount) * 100);

          return {
            ...course,
            progress: nextProgress,
            lessons: updatedLessons
          };
        }
        return course;
      })
    );
  };

  // Add a newly published course
  const handlePublishCourse = (newCourse: Course) => {
    setCourses(prev => [...prev, newCourse]);
    alert(`✨ رائع! تم نشر الدورة "${newCourse.title}" بنجاح في قسم المقترحات.`);
  };

  // Add post to forum
  const handleAddPost = (content: string) => {
    const newPost: Post = {
      id: `p-${Date.now()}`,
      author: userStats.name,
      avatar: userStats.avatar,
      role: "طالب أكاديمي",
      content,
      likes: 0,
      likedByUser: false,
      createdAt: "الآن",
      comments: []
    };
    setPosts(prev => [newPost, ...prev]);
  };

  // Like a post
  const handleLikePost = (postId: string) => {
    setPosts(prev => 
      prev.map(post => {
        if (post.id === postId) {
          const liked = !post.likedByUser;
          return {
            ...post,
            likedByUser: liked,
            likes: liked ? post.likes + 1 : post.likes - 1
          };
        }
        return post;
      })
    );
  };

  // Comment on post
  const handleAddComment = (postId: string, text: string) => {
    const newComment = {
      id: `c-${Date.now()}`,
      author: userStats.name,
      avatar: userStats.avatar,
      content: text,
      createdAt: "الآن"
    };

    setPosts(prev => 
      prev.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, newComment]
          };
        }
        return post;
      })
    );
  };

  // Reset demo
  const handleResetDemo = () => {
    if (confirm('هل تود إعادة تعيين الأكاديمية للدورة الترحيبية وتصفير التغييرات؟')) {
      localStorage.clear();
      setCourses(initialCourses);
      setPosts(initialPosts);
      setUserStats(initialUserStats);
      setActiveTab('home');
      setSelectedCategory(null);
      setSearchQuery('');
    }
  };

  // 4. Listing Filters
  const filteredCourses = courses.filter(course => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory ? (course.category === selectedCategory) : true;

    return matchesSearch && matchesCategory;
  });

  const activeMyCourses = filteredCourses.filter(c => c.status === 'active');
  const suggestedCourses = filteredCourses.filter(c => c.status === 'suggested');

  // Categories presets matching color design in image
  const categoriesList = [
    { name: 'الرياضيات', color: 'bg-[#E0F2FE]', textColor: 'text-sky-800', icon: '📐' },
    { name: 'البرمجة', color: 'bg-[#F3EBF9]', textColor: 'text-purple-800', icon: '💻' },
    { name: 'اللغات', color: 'bg-[#E6F4EA]', textColor: 'text-emerald-800', icon: '🇬🇧' },
    { name: 'الفنون', color: 'bg-[#FDF2E9]', textColor: 'text-amber-850', icon: '🎨' },
    { name: 'الفيزياء', color: 'bg-[#F1F5F9]', textColor: 'text-slate-800', icon: '🔬' },
    { name: 'أعمال', color: 'bg-[#E2F0ED]', textColor: 'text-teal-800', icon: '📊' }
  ];

  // Core Render of Tab contents inside the application Frame
  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-6">
            {/* Greeting */}
            <div className="px-1 text-right dir-rtl">
              <h2 className="font-sans font-extrabold text-slate-800 text-[20px] tracking-tight">مرحباً، {userStats.name}!</h2>
              <p className="text-slate-500 text-xs mt-1">جاهز لرحلة علمية ملهمة اليوم؟ إليك أهم مستجداتك!</p>
            </div>

            {/* Search Input Bar (Matches Image style) */}
            <div className="relative shadow-xs rounded-2xl bg-white border border-slate-100 flex items-center px-3 py-2 text-right dir-rtl">
              <Search className="w-4 h-4 text-slate-400 absolute left-3" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="البحث عن دورات..."
                className="w-full pl-8 pr-1 font-sans text-xs font-semibold text-slate-700 bg-transparent border-none focus:outline-hidden text-right placeholder-slate-400"
              />
            </div>

            {/* Main Carousel Banner */}
            <CarouselBanner />

            {/* Categories القسم "الأقسام" */}
            <div className="space-y-2 text-right dir-rtl">
              <h3 className="font-sans font-extrabold text-slate-850 text-sm">الأقسام</h3>
              <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-thin">
                {/* Reset category filter */}
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                    selectedCategory === null 
                      ? 'bg-slate-800 text-white shadow-xs' 
                      : 'bg-white border border-slate-100 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  الكل
                </button>
                {categoriesList.map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`px-3 py-2 rounded-2xl text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
                      selectedCategory === cat.name 
                        ? 'bg-slate-800 text-white ring-2 ring-slate-800/10' 
                        : `${cat.color} ${cat.textColor} hover:brightness-97`
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* My Current Courses "دوراتي الحالية" Section */}
            <div className="space-y-3 text-right dir-rtl">
              <div className="flex items-center justify-between">
                <h3 className="font-sans font-extrabold text-slate-850 text-sm">دوراتي الحالية</h3>
                <span className="text-[10px] text-slate-400 font-bold">{activeMyCourses.length} دورات</span>
              </div>
              
              {activeMyCourses.length === 0 ? (
                <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl text-center text-slate-450 text-xs">
                  <BookmarkCheck className="w-8 h-8 text-slate-300 mx-auto mb-1.5" />
                  <p>لا توجد دورات قيد الدراسة حالياً.</p>
                  <p className="text-[10px] text-slate-450 mt-1">اختر من الدورات المقترحة بالأسفل وابدأ التعلم الآن!</p>
                </div>
              ) : (
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin snap-x">
                  {activeMyCourses.map(course => (
                    <div key={course.id} className="snap-start">
                      <CourseCard 
                        course={course} 
                        onClick={() => setSelectedCourseId(course.id)} 
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Suggested Courses "دورات مقترحة لك" */}
            <div className="space-y-3 text-right dir-rtl pb-6">
              <div className="flex items-center justify-between">
                <h3 className="font-sans font-extrabold text-slate-850 text-sm">دورات مقترحة لك</h3>
                <span className="text-[11px] text-slate-400">تابع مسعاك التعليمي</span>
              </div>

              {suggestedCourses.length === 0 ? (
                <div className="p-6 text-center text-slate-400 text-xs bg-slate-50 rounded-2xl">
                  لا توجد اقتراحات مطابقة لبحثك في هذا القسم.
                </div>
              ) : (
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin snap-x">
                  {suggestedCourses.map(course => (
                    <div key={course.id} className="snap-start">
                      <CourseCard 
                        course={course} 
                        onClick={() => setSelectedCourseId(course.id)}
                        onEnroll={() => handleEnrollInCourse(course.id)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 'courses':
        return (
          <div className="space-y-5 text-right dir-rtl">
            <div className="border-b border-sky-100 pb-3">
              <h2 className="font-sans font-bold text-slate-800 text-[16px]">دوراتي التعليمية 📚</h2>
              <p className="text-[11px] text-slate-400 font-medium">متابعة كافة البرامج المنهجية المسجل بها ومستويات تقدمك.</p>
            </div>

            {/* Grid display profile courses */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {courses.filter(c => c.status === 'active').map(c => (
                <div key={c.id} className="w-full flex">
                  {/* Full width custom horizontal adapt of card */}
                  <div 
                    onClick={() => setSelectedCourseId(c.id)}
                    className="bg-white rounded-3xl p-4 border border-slate-150 w-full flex gap-3.5 items-center cursor-pointer hover:shadow-md transition-all text-right duration-200"
                  >
                    <div className="w-16 h-16 rounded-2xl shrink-0 overflow-hidden">
                      <CourseCard course={c} onClick={() => {}} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full">{c.category}</span>
                      <h4 className="text-xs font-bold text-slate-800 mt-1 truncate">{c.title}</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">مع {c.instructor}</p>
                      
                      {/* simple micro progress horizontal */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full" style={{ width: `${c.progress}%` }} />
                        </div>
                        <span className="font-mono text-[9px] text-slate-500">{c.progress}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {courses.filter(c => c.status === 'active').length === 0 && (
                <div className="col-span-full py-8 text-center text-slate-500 text-xs">
                  لا توجد دورات مسجلة حالياً لدراستها.
                </div>
              )}
            </div>
          </div>
        );

      case 'forum':
        return (
          <CommunitySection 
            posts={posts} 
            onAddPost={handleAddPost} 
            onLikePost={handleLikePost} 
            onAddComment={handleAddComment} 
          />
        );

      case 'profile':
        return (
          <ProfileSection 
            userStats={userStats} 
            courses={courses} 
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans antialiased text-slate-800">
      
      {/* 6. MAIN RESPONSIVE WEB APPLICATION PORT */}
      <div className="w-full h-full flex-1 flex flex-col bg-white overflow-hidden">
        
        {/* Header */}
        <Header userStats={userStats} />

        {/* Outer Split Layout */}
        <div className="flex-1 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-slate-100">
          
          {/* Right Sidebar - visible on MD screens and above */}
          <aside className="hidden md:flex md:flex-col w-64 bg-slate-50/50 p-5 shrink-0 border-l border-slate-100 select-none dir-rtl text-right justify-between">
            <div className="space-y-4">
              <span className="text-[10px] text-slate-400 font-extrabold block px-2 uppercase tracking-wide">أقسام الأكاديمية</span>
              
              <nav className="space-y-1.5">
                <button 
                  onClick={() => setActiveTab('home')}
                  className={`w-full px-4 py-3 rounded-2xl text-xs font-extrabold flex items-center gap-2.5 transition-all text-right cursor-pointer ${activeTab === 'home' ? 'bg-slate-850 text-white shadow-xs' : 'text-slate-650 hover:bg-slate-100'}`}
                >
                  <Home className={`w-4 h-4 ${activeTab === 'home' ? 'stroke-[2.5px]' : ''}`} />
                  <span>الرئيسية (الاكتشاف)</span>
                </button>

                <button 
                  onClick={() => setActiveTab('courses')}
                  className={`w-full px-4 py-3 rounded-2xl text-xs font-extrabold flex items-center gap-2.5 transition-all text-right cursor-pointer ${activeTab === 'courses' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-650 hover:bg-slate-100'}`}
                >
                  <BookOpen className={`w-4 h-4 ${activeTab === 'courses' ? 'stroke-[2.5px]' : ''}`} />
                  <span>برامجي التعليمية</span>
                </button>

                <button 
                  onClick={() => setActiveTab('forum')}
                  className={`w-full px-4 py-3 rounded-2xl text-xs font-extrabold flex items-center gap-2.5 transition-all text-right cursor-pointer ${activeTab === 'forum' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-650 hover:bg-slate-100'}`}
                >
                  <MessageSquare className={`w-4 h-4 ${activeTab === 'forum' ? 'stroke-[2.5px]' : ''}`} />
                  <span>منتدى نقاش الطلاب</span>
                </button>

                <button 
                  onClick={() => setActiveTab('profile')}
                  className={`w-full px-4 py-3 rounded-2xl text-xs font-extrabold flex items-center gap-2.5 transition-all text-right cursor-pointer ${activeTab === 'profile' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-650 hover:bg-slate-100'}`}
                >
                  <User className={`w-4 h-4 ${activeTab === 'profile' ? 'stroke-[2.5px]' : ''}`} />
                  <span>صفحتي الشخصية</span>
                </button>
              </nav>
            </div>

            <div className="pt-4 mt-6 border-t border-slate-100 text-slate-500 space-y-2 dir-rtl text-right">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-700">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                <span>مستوى مجهود اليوم</span>
              </div>
              <p className="text-[10px] text-slate-450 leading-relaxed">تابع في دراستك اليومية لتصل لمرتبة 'أستاذ فخري' بالأكاديمية!</p>
            </div>
          </aside>

          {/* Main Space Content Panel */}
          <main className="flex-1 p-4 sm:p-6 md:p-8 min-h-[500px] pb-24 md:pb-8 dir-rtl">
            {renderTabContent()}
          </main>

        </div>

        {/* Mobile Fixed Safe Bottom Nav Bar - visible only on mobile screens (< md) */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-100 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] px-4 flex justify-between items-center shadow-[0_-8px_30px_-15px_rgba(0,0,0,0.15)] z-45 dir-rtl rounded-t-3xl">
          {[
            { id: 'home', label: 'الرئيسية', icon: Home, color: 'text-blue-600', fill: 'bg-blue-50' },
            { id: 'courses', label: 'دوراتي', icon: BookOpen, color: 'text-emerald-600', fill: 'bg-emerald-50' },
            { id: 'forum', label: 'المجتمع', icon: MessageSquare, color: 'text-fuchsia-600', fill: 'bg-fuchsia-50' },
            { id: 'profile', label: 'بروفايلي', icon: User, color: 'text-amber-600', fill: 'bg-amber-50' }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            
            return (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative flex flex-col items-center justify-center w-[72px] h-[60px] transition-all duration-300 cursor-pointer outline-none tap-highlight-transparent ${isActive ? tab.color : 'text-slate-400'}`}
                style={{
                  transform: isActive ? 'translateY(-6px)' : 'translateY(0)',
                }}
              >
                {/* Animated Golden Frame Background for active state */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabGoldFrame"
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-200 via-yellow-400 to-orange-400 p-[2px] shadow-[0_8px_16px_-6px_rgba(250,204,21,0.5)] z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <div className={`w-full h-full rounded-xl ${tab.fill} bg-opacity-90 shadow-inner flex items-center justify-center`}></div>
                  </motion.div>
                )}
                
                <div className="relative z-10 flex flex-col items-center gap-1">
                  <Icon className={`w-6 h-6 transition-all duration-300 ${isActive ? 'stroke-[2.5px] drop-shadow-md scale-110' : 'stroke-[1.8px] hover:text-slate-500 scale-100'}`} />
                  <span className={`text-[10px] transition-all duration-300 ${isActive ? 'font-black drop-shadow-sm' : 'font-semibold'}`}>
                    {tab.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Custom footer - visible on md screens and above */}
        <footer className="hidden md:block bg-slate-50 py-3.5 px-6 border-t border-slate-100 text-center text-[11px] text-slate-400 font-medium dir-rtl">
          أكاديمية النور الأكاديمية • جميع الحقوق محفوظة لعام 2026. تطبيق تعليمي شامل.
        </footer>
      </div>

      {/* 7. ALL APPLICATION MODALS */}
      
      {/* Syllabus lesson tracker modal */}
      <CourseDetailModal 
        course={activeSelectedCourse}
        onClose={() => setSelectedCourseId(null)}
        onToggleLesson={handleToggleLesson}
      />

      {/* Publisher course manager modal */}
      <PublishCourseModal 
        isOpen={showPublishModal}
        onClose={() => setShowPublishModal(false)}
        onPublish={handlePublishCourse}
      />

      <div className="mt-8 text-center text-slate-400 text-xs font-medium max-w-lg mx-auto leading-relaxed select-none">
        <p className="flex items-center justify-center gap-1">
          <span>صنع بحب لأجل</span>
          <span className="font-bold text-sky-700">Noor Academy</span>
          <span>• اضغط على الدروس بداخل الدورة لتحديث نسبة تقدمك تلقائياً!</span>
        </p>
      </div>

    </div>
  );
}
