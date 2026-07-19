'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  hideCloseButton?: boolean;
}

const sizeStyles = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
};

export default function Modal({
  open,
  onClose,
  title,
  description,
  children,
  size = 'md',
  hideCloseButton = false,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 12 }}
            transition={{ type: 'spring', duration: 0.35, bounce: 0.15 }}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              'bg-white rounded-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-slate-900/20',
              sizeStyles[size]
            )}
          >
            {(title || !hideCloseButton) && (
              <div className="flex items-start justify-between px-6 pt-6 pb-0">
                <div>
                  {title && (
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h2>
                  )}
                  {description && (
                    <p className="text-sm text-slate-500 mt-1">{description}</p>
                  )}
                </div>
                {!hideCloseButton && (
                  <button
                    onClick={onClose}
                    aria-label="Close"
                    className="p-1.5 -mr-1.5 -mt-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            )}
            <div className="px-6 pb-6 pt-4">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
