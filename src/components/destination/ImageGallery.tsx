'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  destinationName: string;
}

function getPlaceholder(idx: number): string {
  return `https://placehold.co/600x400?text=Image${idx + 1}`;
}

export default function ImageGallery({ images, destinationName }: ImageGalleryProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [imageError, setImageError] = useState<Set<number>>(new Set());

  if (!images || images.length === 0) return null;

  const validImages = images.slice(0, 8);

  return (
    <>
      <div className="space-y-4">
        <h2 className="text-h3 font-bold text-slate-900">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {validImages.map((img, idx) => (
            <motion.button
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              whileHover={{ scale: 1.05 }}
              className="relative h-40 rounded-xl overflow-hidden bg-slate-200 group"
            >
              <Image
                src={imageError.has(idx) ? getPlaceholder(idx) : img}
                alt={`${destinationName} ${idx + 1}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform"
                onError={() => setImageError((s) => new Set([...s, idx]))}
              />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedIdx !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/80"
              onClick={() => setSelectedIdx(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="relative w-full max-w-4xl">
                <Image
                  src={imageError.has(selectedIdx) ? getPlaceholder(selectedIdx) : validImages[selectedIdx]}
                  alt={`${destinationName} ${selectedIdx + 1}`}
                  width={800}
                  height={600}
                  className="w-full rounded-lg"
                  onError={() => setImageError((s) => new Set([...s, selectedIdx]))}
                />
                <button
                  onClick={() => setSelectedIdx(null)}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                >
                  <X size={24} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
