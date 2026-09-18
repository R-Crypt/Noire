import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  images: { src: string; label?: string }[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export function Lightbox({ images, initialIndex, isOpen, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  // Keyboard navigation
  useState(() => {
    const handler = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  if (!isOpen) return null;

  const current = images[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[500] bg-black/96 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={onClose}
          role="dialog"
          aria-label="Image lightbox"
          aria-modal="true"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X size={22} strokeWidth={1.5} />
          </button>

          {/* Counter */}
          <div className="absolute top-6 left-6 label-sm text-white/50">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Label */}
          {current.label && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 label-sm text-white/50">
              {current.label}
            </div>
          )}

          {/* Image */}
          <motion.div
            key={currentIndex}
            className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={current.src}
              alt={current.label || 'Lookbook image'}
              className="max-w-full max-h-[88vh] object-contain"
            />
          </motion.div>

          {/* Navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-2"
                aria-label="Previous image"
              >
                <ChevronLeft size={28} strokeWidth={1.5} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-2"
                aria-label="Next image"
              >
                <ChevronRight size={28} strokeWidth={1.5} />
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
