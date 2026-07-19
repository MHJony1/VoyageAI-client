'use client';

import { AlertTriangle } from 'lucide-react';
import Modal from './Modal';
import Button from './Button';

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: React.ReactNode;
  /** Highlighted details of the item being acted on (name, meta, etc.) */
  itemDetails?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
  variant?: 'danger' | 'primary';
  /** Show the "This action cannot be undone" warning. Defaults to true. */
  irreversible?: boolean;
}

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  itemDetails,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  isLoading = false,
  variant = 'danger',
  irreversible = true,
}: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={isLoading ? () => {} : onClose} size="sm" hideCloseButton>
      <div className="flex flex-col items-center text-center">
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${
            variant === 'danger' ? 'bg-red-100' : 'bg-sky-100'
          }`}
        >
          <AlertTriangle
            size={28}
            className={variant === 'danger' ? 'text-red-600' : 'text-sky-600'}
          />
        </div>

        <h2 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h2>
        <div className="text-sm text-slate-600 mt-2 leading-relaxed">{message}</div>

        {itemDetails && (
          <div className="w-full mt-4 bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-sm text-slate-700">
            {itemDetails}
          </div>
        )}

        {irreversible && (
          <p className="text-xs font-medium text-red-500 mt-4">
            This action cannot be undone.
          </p>
        )}

        <div className="flex gap-3 w-full mt-6">
          <Button
            variant="outline"
            fullWidth
            onClick={onClose}
            disabled={isLoading}
            className="border-slate-200 text-slate-700 hover:bg-slate-50 border"
          >
            {cancelLabel}
          </Button>
          <Button
            variant={variant === 'danger' ? 'danger' : 'primary'}
            fullWidth
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
