// src/types/course.ts

export interface Course {
    id: string;
    title: string;
    category: string;
    description?: string;
    instructor?: string;
    image?: string;
    status: 'not_started' | 'in_progress' | 'completed';
    progress: number; // 0-100
    duration?: string;
    bgColor?: string;
    level?: 'beginner' | 'intermediate' | 'advanced';
  }
  
  export interface CourseSection {
    id: string;
    courseId: string;
    title: string;
    order: number;
  }
  
  export interface CourseLesson {
    id: string;
    courseId: string;
    sectionId?: string;
    title: string;
    description?: string;
    content?: string;
    contentType: 'video' | 'text' | 'quiz' | 'assignment';
    duration?: number; // in minutes
    order: number;
    completed?: boolean;
  }
  
  export interface CourseReview {
    id: string;
    courseId: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    rating: number; // 1-5
    comment: string;
    createdAt: string;
  }
  
  export interface CourseEnrollment {
    id: string;
    userId: string;
    courseId: string;
    enrolledAt: string;
    status: 'active' | 'completed' | 'dropped';
    progress: number; // 0-100
    lastAccessedAt?: string;
  }
  
  export interface CourseProgress {
    courseId: string;
    userId: string;
    completedLessons: string[]; // Array of lesson IDs
    currentLessonId?: string;
    progress: number; // 0-100
    startedAt: string;
    lastAccessedAt: string;
    completedAt?: string;
  }