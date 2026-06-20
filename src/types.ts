/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isCompleted: boolean;
}

export type CourseImageType = 'palette' | 'english' | 'code' | 'physics' | 'math' | 'business';

export interface Course {
  id: string;
  title: string;
  category: string;
  instructor: string;
  duration: string;
  lessonsCount: number;
  imageType: CourseImageType;
  progress: number; // 0 to 100
  status: 'active' | 'suggested' | 'completed';
  description: string;
  lessons: Lesson[];
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  createdAt: string;
}

export interface Post {
  id: string;
  author: string;
  avatar: string;
  role: string;
  content: string;
  likes: number;
  likedByUser?: boolean;
  comments: Comment[];
  createdAt: string;
}

export interface UserStats {
  name: string;
  level: string;
  activeStreak: number;
  totalStudyHours: number;
  completedCoursesCount: number;
  avatar: string;
}
