'use client';

import { useState,  useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  destinationName: string;
}

function getPlaceholder(idx: number): string {
  return `https://placehold.co/600x400?text=Image${idx + 1}`;
}

export default function ImageGallery({
  images,
  destinationName,
}: ImageGalleryProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [imageError, setImageError] = useState<Set<number>>(new Set());
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  const validImages = images.slice(0, 8);

  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (selectedIdx !== null) {
      if (isLeftSwipe && selectedIdx < validImages.length - 1) {
        setSelectedIdx(selectedIdx + 1);
      } else if (isRightSwipe && selectedIdx > 0) {
        setSelectedIdx(selectedIdx - 1);
      }
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIdx === null) return;

      if (e.key === 'ArrowRight' && selectedIdx < validImages.length - 1) {
        setSelectedIdx(selectedIdx + 1);
      } else if (e.key === 'ArrowLeft' && selectedIdx > 0) {
        setSelectedIdx(selectedIdx - 1);
      } else if (e.key === 'Escape') {
        setSelectedIdx(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIdx, validImages.length]);

  const goToPrevious = () => {
    if (selectedIdx !== null && selectedIdx > 0) {
      setSelectedIdx(selectedIdx - 1);
    }
  };

  const goToNext = () => {
    if (selectedIdx !== null && selectedIdx < validImages.length - 1) {
      setSelectedIdx(selectedIdx + 1);
    }
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
          <h2 className="text-2xl font-bold text-slate-900">Gallery</h2>
          <span className="text-sm text-slate-400 ml-auto">
            {validImages.length} photos
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {validImages.map((img, idx) => (
            <motion.button
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="relative h-48 rounded-xl overflow-hidden bg-slate-200 group shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <Image
                src={imageError.has(idx) ? getPlaceholder(idx) : img}
                alt={`${destinationName} ${idx + 1}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                onError={() => setImageError((s) => new Set([...s, idx]))}
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <Maximize2 className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110" />
              </div>
              {idx === 0 && (
                <div className="absolute top-2 left-2 bg-blue-600/80 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-lg border border-white/10">
                  Featured
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox with Swipe */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
              onClick={() => setSelectedIdx(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Image Counter */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                {selectedIdx + 1} / {validImages.length}
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedIdx(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 border border-white/10 hover:scale-110"
              >
                <X size={24} />
              </button>

              {/* Navigation Buttons */}
              {selectedIdx > 0 && (
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 border border-white/10 hover:scale-110"
                >
                  <ChevronLeft size={28} />
                </button>
              )}

              {selectedIdx < validImages.length - 1 && (
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 border border-white/10 hover:scale-110"
                >
                  <ChevronRight size={28} />
                </button>
              )}

              {/* Main Image */}
              <div className="relative w-full max-w-5xl max-h-[85vh] flex items-center justify-center">
                <Image
                  src={
                    imageError.has(selectedIdx)
                      ? getPlaceholder(selectedIdx)
                      : validImages[selectedIdx]
                  }
                  alt={`${destinationName} ${selectedIdx + 1}`}
                  width={1200}
                  height={800}
                  className="w-full h-auto max-h-[85vh] object-contain rounded-2xl"
                  onError={() =>
                    setImageError((s) => new Set([...s, selectedIdx]))
                  }
                  priority
                />
              </div>

              {/* Swipe Indicator */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5">
                {validImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedIdx(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === selectedIdx
                        ? 'w-8 bg-white'
                        : 'w-1.5 bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>

              {/* Swipe Hint */}
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-white/30 text-xs font-medium animate-pulse">
                ← Swipe to navigate →
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
