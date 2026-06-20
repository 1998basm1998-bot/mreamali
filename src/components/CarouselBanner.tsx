import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const bannerImages = [
  "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=1200&auto=format&fit=crop", // Physics / atoms
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop", // Web dev / code
  "https://images.unsplash.com/photo-1626808642875-0aa545482dfb?q=80&w=1200&auto=format&fit=crop", // Graphic design
  "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1200&auto=format&fit=crop"  // Math
];

export default function CarouselBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
    }, 5000); // 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-sm" style={{ aspectRatio: '2.35/1' }}>
      <AnimatePresence initial={false}>
        <motion.img
          key={currentIndex}
          src={bannerImages[currentIndex]}
          alt="Banner promotional"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ x: '-100%' }} // Entering from left (sliding to right)
          animate={{ x: 0 }}
          exit={{ x: '100%' }} // Exiting to right
          transition={{ type: 'tween', ease: 'easeInOut', duration: 0.8 }}
        />
      </AnimatePresence>
      
      {/* Pagination dots */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
        {bannerImages.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
