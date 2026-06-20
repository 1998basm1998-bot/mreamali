/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Course, Post, UserStats } from './types';

export const initialUserStats: UserStats = {
  name: "مرام",
  level: "مستكشف المعرفة",
  activeStreak: 5, // 5 days
  totalStudyHours: 42,
  completedCoursesCount: 3,
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
};

export const initialCourses: Course[] = [
  {
    id: "active-1",
    title: "أساسيات تصميم الجرافيك",
    category: "الفنون",
    instructor: "أ. مازن علي",
    duration: "20 ساعة",
    lessonsCount: 10,
    imageType: "palette",
    progress: 88,
    status: "active",
    description: "انضم إلى هذه الدورة المميزة لتتعلم أهم مبادئ التصميم الأكاديمية مثل نظرية الألوان، التباين، التوازن، وكيفية استخدام برامج التصميم الرائدة لإنشاء أعمال فنية ملفتة ومحترفة.",
    lessons: [
      { id: "l1-1", title: "مقدمة واحتياجات دورة الجرافيك", duration: "15 دقيقة", isCompleted: true },
      { id: "l1-2", title: "عناصر ومبادئ التصميم الأساسية", duration: "25 دقيقة", isCompleted: true },
      { id: "l1-3", title: "نظرية الألوان وكيف تختار نظاماً لونياً", duration: "35 دقيقة", isCompleted: true },
      { id: "l1-4", title: "الخطوط وأسرار اختيارها (Typography)", duration: "20 دقيقة", isCompleted: true },
      { id: "l1-5", title: "ميزان التصميم والمساحات السلبية", duration: "30 دقيقة", isCompleted: true },
      { id: "l1-6", title: "التطبيق العملي الأول: تصميم شعار", duration: "45 دقيقة", isCompleted: true },
      { id: "l1-7", title: "أساسيات تصميم الهوية البصرية المتكاملة", duration: "50 دقيقة", isCompleted: true },
      { id: "l1-8", title: "تحضير الملفات للطباعة والنشر الإلكتروني", duration: "30 دقيقة", isCompleted: true },
      { id: "l1-9", title: "بناء ملف أعمالك الاحترافي (Portfolio)", duration: "40 دقيقة", isCompleted: false },
      { id: "l1-10", title: "المشروع الختامي ونصائح لسوق العمل", duration: "60 دقيقة", isCompleted: false },
    ]
  },
  {
    id: "active-2",
    title: "اللغة الإنجليزية: المستوى المتوسط",
    category: "اللغات",
    instructor: "أ. سارة جون",
    duration: "20 ساعة",
    lessonsCount: 12,
    imageType: "english",
    progress: 40,
    status: "active",
    description: "هذه الدورة مصممة خصيصاً للطلاب الحاصلين على المستوى المبتدئ لتوسيع معارفهم اللغوية، واكتساب مفردات جديدة، وصقل مهارات الاستماع والمحادثة بطلاقة وثقة.",
    lessons: [
      { id: "l2-1", title: "مراجعة قواعد الأزمنة البسيطة", duration: "25 دقيقة", isCompleted: true },
      { id: "l2-2", title: "زمن المضارع المستمر والمستقبل القريب", duration: "30 دقيقة", isCompleted: true },
      { id: "l2-3", title: "المواقف الاجتماعية اليومية والترحاب", duration: "35 دقيقة", isCompleted: true },
      { id: "l2-4", title: "التعامل في السفر والفنادق والمطارات", duration: "40 دقيقة", isCompleted: true },
      { id: "l2-5", title: "الأشكال الشائعة للأفعال الشاذة والتعبيرات المجازية", duration: "28 دقيقة", isCompleted: true },
      { id: "l2-6", title: "صناعة الجرأة والحديث بطلاقة دون خوف", duration: "45 دقيقة", isCompleted: false },
      { id: "l2-7", title: "أساسيات الكتابة والبريد الإلكتروني الرسمي", duration: "35 دقيقة", isCompleted: false },
      { id: "l2-8", title: "مفردات بيئة العمل والمهام الوظيفية", duration: "40 دقيقة", isCompleted: false },
      { id: "l2-9", title: "الاستماع الإيجابي للمقاطع الإخبارية والبودكاست", duration: "50 دقيقة", isCompleted: false },
      { id: "l2-10", title: "الحديث عن الآمال والخطط المستقبلية", duration: "30 دقيقة", isCompleted: false },
      { id: "l2-11", title: "فن الإقناع والتعبير عن الآراء بوضوح", duration: "45 دقيقة", isCompleted: false },
      { id: "l2-12", title: "الاختبار الشامل للغة الإنجليزية والتقييم المحول", duration: "60 دقيقة", isCompleted: false },
    ]
  },
  {
    id: "active-3",
    title: "أساسيات الجافاسكريبت والمواقع التفاعلية",
    category: "البرمجة",
    instructor: "د. خالد فهد",
    duration: "25 ساعة",
    lessonsCount: 8,
    imageType: "code",
    progress: 25,
    status: "active",
    description: "ادخل عالم الويب من أوسع أبوابه بتعلم لغة جافاسكريبت البرمجية الأساسية. تعلم كيفية التحكم بصفحة الويب وبناء مواقع تفاعلية مع تفاعل كامل مع المستخدمين.",
    lessons: [
      { id: "l3-1", title: "مقدمة إلى لغة JavaScript وكيفية عملها في المتصفح", duration: "20 دقيقة", isCompleted: true },
      { id: "l3-2", title: "المتغيرات وأنواع البيانات الأساسية والعمليات الحسابية", duration: "30 دقيقة", isCompleted: true },
      { id: "l3-3", title: "الشروط والتحكم بمسار البرنامج (If/Else)", duration: "35 دقيقة", isCompleted: false },
      { id: "l3-4", title: "الدوال والوظائف (Functions & Scope)", duration: "40 دقيقة", isCompleted: false },
      { id: "l3-5", title: "المصفوفات والكائنات (Arrays & Objects)", duration: "45 دقيقة", isCompleted: false },
      { id: "l3-6", title: "التحكم في عناصر الويب (DOM Manipulation)", duration: "55 دقيقة", isCompleted: false },
      { id: "l3-7", title: "مفهوم برمجة الأحداث وتجاوب الأزرار والمدخلات", duration: "45 دقيقة", isCompleted: false },
      { id: "l3-8", title: "مشروع تطبيقي: بناء تطبيق إدارة المهام المتكامل", duration: "90 دقيقة", isCompleted: false },
    ]
  },
  {
    id: "suggested-1",
    title: "ريادة الأعمال وإطلاق المشاريع الناشئة",
    category: "أعمال",
    instructor: "أ. طارق محمود",
    duration: "15 ساعة",
    lessonsCount: 6,
    imageType: "business",
    progress: 0,
    status: "suggested",
    description: "اكتشف كيف تحول فكرتك العبقرية إلى مشروع تجاري ناجح ومستدام. نتعلم معاً دراسة الجدوى، أبحاث السوق، استراتيجيات التسويق، وبناء نموذج العمل التجاري.",
    lessons: [
      { id: "l4-1", title: "العقلية الريادية وفرص السوق الثمينة", duration: "30 دقيقة", isCompleted: false },
      { id: "l4-2", title: "بناء مخطط نموذج العمل التجاري (Business Model Canvas)", duration: "45 دقيقة", isCompleted: false },
      { id: "l4-3", title: "أبحاث السوق وفهم احتياجات العملاء الحقيقية", duration: "40 دقيقة", isCompleted: false },
      { id: "l4-4", title: "تطوير المنتج الأولي (MVP) وتجربته", duration: "50 دقيقة", isCompleted: false },
      { id: "l4-5", title: "أسس الإدارة المالية والتسعير وبناء الميزانيات", duration: "40 دقيقة", isCompleted: false },
      { id: "l4-6", title: "كيف تبهر المستثمرين وتعرض فكرة مشروعك بثقة", duration: "60 دقيقة", isCompleted: false },
    ]
  },
  {
    id: "suggested-2",
    title: "فيزياء المرحلة الثانوية ممتعة وسهلة",
    category: "الفيزياء",
    instructor: "أ. عصام جودة",
    duration: "30 ساعة",
    lessonsCount: 9,
    imageType: "physics",
    progress: 0,
    status: "suggested",
    description: "شرح مبسط وممتع لمنهج الفيزياء وتطبيقاتها الحياتية. سنغطي الميكانيكا، الكهرومغناطيسية، والضوء بطرق تفاعلية ومشوقة تضمن لك تذكر وتفوق كامل في الاختبارات.",
    lessons: [
      { id: "l5-1", title: "طرق القياس العلمي وأهم الوحدات الفيزيائية", duration: "25 دقيقة", isCompleted: false },
      { id: "l5-2", title: "الحركة في خط مستقيم وقوانين نيوتن الثلاثة للسرعة", duration: "40 دقيقة", isCompleted: false },
      { id: "l5-3", title: "القوة والجهد والكتلة وعجلة الجاذبية الأرضية", duration: "35 دقيقة", isCompleted: false },
      { id: "l5-4", title: "الطاقة الحركية وطاقة الوضع ومبدأ بقاء الطاقة", duration: "45 دقيقة", isCompleted: false },
      { id: "l5-5", title: "خصائص السوائل والضغط والطفو وقانون أرشميدس", duration: "40 دقيقة", isCompleted: false },
      { id: "l5-6", title: "الحرارة وفوانين الديناميكا الحرارية المبسطة", duration: "45 دقيقة", isCompleted: false },
      { id: "l5-7", title: "الكهرباء الاستاتيكية والتيار المتردد والمستمر", duration: "50 دقيقة", isCompleted: false },
      { id: "l5-8", title: "الضوء وخصائص الانعكاس والانكسار والعدسات", duration: "45 دقيقة", isCompleted: false },
      { id: "l5-9", title: "الفيزياء الحديثة والنظرية النسبية بنصائح بصرية", duration: "60 دقيقة", isCompleted: false },
    ]
  },
  {
    id: "suggested-3",
    title: "أساسيات الرياضيات والتحليل العددي",
    category: "الرياضيات",
    instructor: "أ. هدى عمر",
    duration: "18 ساعة",
    lessonsCount: 7,
    imageType: "math",
    progress: 0,
    status: "suggested",
    description: "احصل على قاعدة متينة وحجر أساس قوي في الرياضيات. ستتعلم الكسور، الجبر، المعادلات، وحل المسائل اللغوية بسهولة فائقة دون مخاوف الحفظ المكثف.",
    lessons: [
      { id: "l6-1", title: "فهم لغة الأرقام وأولويات العمليات الرياضية", duration: "20 دقيقة", isCompleted: false },
      { id: "l6-2", title: "الكسور الاعتيادية والعشرية والنسب المئوية والبدائل", duration: "30 دقيقة", isCompleted: false },
      { id: "l6-3", title: "مقدمة الجبر وحل المعادلات من الدرجة الأولى والثانية", duration: "40 دقيقة", isCompleted: false },
      { id: "l6-4", title: "حساب المثلثات وخصائص الزوايا الشهيرة في الهندسة", duration: "35 دقيقة", isCompleted: false },
      { id: "l6-5", title: "علم الهندسة وحساب المساحات والمحيط للأشكال الشائعة", duration: "45 دقيقة", isCompleted: false },
      { id: "l6-6", title: "الإحصاء والجدولة وكيفية قراءة وتحليل الرسوم البيانية", duration: "45 دقيقة", isCompleted: false },
      { id: "l6-7", title: "تدريبات وحل مسائل ذكاء متقدمة وطرق التفكير السريع", duration: "60 دقيقة", isCompleted: false },
    ]
  }
];

export const initialPosts: Post[] = [
  {
    id: "p-1",
    author: "مرام العتيبي",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    role: "طالبة فعالة",
    content: "يا جماعة، خلصت الحين 88% من دورة 'أساسيات تصميم الجرافيك'! الدورة فعلاً جداً قوية والمدرب أ.مازن بيبسط التفاصيل، خصوصاً بموضوع نظرية الألوان وكيف نختار ألوان متناسقة تناسب المشروع. أنصح جداً بالبدء فيها!",
    likes: 12,
    likedByUser: false,
    createdAt: "منذ ساعتين",
    comments: [
      {
        id: "c-1",
        author: "ريما العتيبي",
        avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=150",
        content: "ما شاء الله تبارك الله، بالتوفيق يا مرام! أنا لسه في الدرس الرابع وحاسة بحماس كبير أطبقه عالفوتوشوب.",
        createdAt: "منذ ساعة ونصف"
      },
      {
        id: "c-2",
        author: "حسين الشمري",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150",
        content: "بطلة يا غالية، عقبال الشهادة! هل في مشروع ختامي تقيمي تنصحين بالاهتمام فيه مبكراً؟",
        createdAt: "منذ ساعة"
      }
    ]
  },
  {
    id: "p-2",
    author: "وفاء الزهراني",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150",
    role: "طالبة متميزة",
    content: "سؤال بخصوص دورة 'اللغة الإنجليزية المستوى المتوسط' مع أستاذة سارة.. هل تتطلب الدورة أن أكون ملمة تامة بقواعد النحو الصعبة أم أنها تهتم أكثر بالمحادثة والاستماع والمصطلحات العملية اليومية؟",
    likes: 8,
    likedByUser: false,
    createdAt: "منذ 4 ساعات",
    comments: [
      {
        id: "c-3",
        author: "أ. سارة جون",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150",
        content: "أهلاً وسهلاً وفاء! الدورة تركز بشكل كبير على التطوير العملي للمهارات، المحادثة وبناء الجرأة اللفظية، مع توظيف قواعد سهلة ومبسطة كأداة للمساعدة وليس كعائق. لا تقلقي أبداً وانضمّي بحماس!",
        createdAt: "منذ ساعتين"
      },
      {
        id: "c-4",
        author: "نواف الحارثي",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
        content: "نفس تساؤلي والرد طمنّي جداً شكراً وفاء وشكراً أستاذة سارة.",
        createdAt: "منذ ساعة"
      }
    ]
  }
];
