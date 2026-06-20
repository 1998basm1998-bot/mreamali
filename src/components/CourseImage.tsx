/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CourseImageType } from '../types';

interface CourseImageProps {
  type: CourseImageType;
  className?: string;
}

export default function CourseImage({ type, className = "w-full h-full" }: CourseImageProps) {
  const getImageUrl = () => {
    switch (type) {
      case 'palette':
        return "https://images.unsplash.com/photo-1626808642875-0aa545482dfb?q=80&w=800&auto=format&fit=crop"; // Graphic design
      case 'english':
        return "https://images.unsplash.com/photo-1546410531-b4ceceb4081b?q=80&w=800&auto=format&fit=crop"; // Dictionary/English
      case 'code':
        return "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop"; // Web dev
      case 'physics':
        return "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=800&auto=format&fit=crop"; // Physics / atoms
      case 'math':
        return "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=800&auto=format&fit=crop"; // Math and numbers
      case 'business':
        return "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"; // Business graph
      default:
        return "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop"; // Default education
    }
  };

  return (
    <div className={`relative flex items-center justify-center bg-slate-100 rounded-2xl overflow-hidden ${className}`}>
      <img 
        src={getImageUrl()} 
        alt={type} 
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
