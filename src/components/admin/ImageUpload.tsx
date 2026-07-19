'use client';

import { useCallback, useRef, useState } from 'react';
import { Upload, X, Loader2, ImagePlus, RefreshCw } from 'lucide-react';
import Image from 'next/image';
import { uploadImage } from '@/services/upload.service';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_SIZE_MB = 10;

const validateFile = (file: File): string | null => {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    return `"${file.name}" is not a supported image type`;
  }
  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    return `"${file.name}" exceeds ${MAX_SIZE_MB}MB`;
  }
  return null;
};

/* ------------------------ Single image (thumbnail) -------------------- */
export function ImageUploadField({
  label,
  required,
  value,
  onChange,
  error,
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (url: string) => void;
  error?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);

  const handleFile = useCallback(
    async (file: File) => {
      const validationError = validateFile(file);
      if (validationError) {
        toast.error(validationError);
        return;
      }
      setUploading(true);
      try {
        const url = await uploadImage(file);
        onChange(url);
        toast.success('Thumbnail uploaded');
      } catch (e) {
        toast.error((e as Error)?.message || 'Upload failed');
      } finally {
        setUploading(false);
      }
    },
    [onChange]
  );

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-slate-900 mb-2">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      {value ? (
        <div className="relative w-full h-44 rounded-xl overflow-hidden border border-slate-200 group">
          <Image src={value} alt="Thumbnail preview" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white/90 backdrop-blur text-slate-700 rounded-lg hover:bg-white transition-colors disabled:opacity-50"
            >
              <RefreshCw size={12} />
              Change
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              disabled={uploading}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-red-500/90 backdrop-blur text-white rounded-lg hover:bg-red-500 transition-colors disabled:opacity-50"
            >
              <X size={12} />
              Remove
            </button>
          </div>
          {uploading && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
              <Loader2 size={24} className="text-indigo-600 animate-spin" />
            </div>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          disabled={uploading}
          className={cn(
            'w-full h-44 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors',
            dragging
              ? 'border-indigo-500 bg-indigo-50/60'
              : error
                ? 'border-red-300 bg-red-50/30 hover:border-red-400'
                : 'border-slate-200 bg-slate-50/60 hover:border-indigo-400 hover:bg-indigo-50/40',
            'disabled:opacity-60'
          )}
        >
          {uploading ? (
            <>
              <Loader2 size={24} className="text-indigo-600 animate-spin" />
              <span className="text-sm text-slate-500">Uploading to ImgBB...</span>
            </>
          ) : (
            <>
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <ImagePlus size={20} className="text-white" />
              </div>
              <span className="text-sm font-medium text-slate-700">
                {dragging ? 'Drop image here' : 'Drag & drop or click to upload'}
              </span>
              <span className="text-xs text-slate-400">
                JPG, PNG, WEBP or GIF — up to {MAX_SIZE_MB}MB
              </span>
            </>
          )}
        </button>
      )}

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(',')}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = '';
        }}
      />
    </div>
  );
}

/* --------------------------- Gallery (multi) -------------------------- */
export function GalleryUploadField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string[];
  onChange: (urls: string[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadingCount, setUploadingCount] = useState(0);
  const [dragging, setDragging] = useState(false);

  const handleFiles = useCallback(
    async (files: File[]) => {
      const valid: File[] = [];
      for (const file of files) {
        const validationError = validateFile(file);
        if (validationError) {
          toast.error(validationError);
        } else {
          valid.push(file);
        }
      }
      if (!valid.length) return;

      setUploadingCount(valid.length);
      const uploaded: string[] = [];
      try {
        for (const file of valid) {
          uploaded.push(await uploadImage(file));
          setUploadingCount((c) => Math.max(c - 1, 0));
        }
        toast.success(
          uploaded.length === 1
            ? 'Image added to gallery'
            : `${uploaded.length} images added to gallery`
        );
      } catch (e) {
        toast.error((e as Error)?.message || 'Upload failed');
      } finally {
        setUploadingCount(0);
        if (uploaded.length) onChange([...value, ...uploaded]);
      }
    },
    [onChange, value]
  );

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files?.length) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const uploading = uploadingCount > 0;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium text-slate-900">{label}</label>
        {value.length > 0 && (
          <span className="text-xs font-medium text-slate-400">
            {value.length} image{value.length > 1 ? 's' : ''}
          </span>
        )}
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={cn(
          'rounded-xl border-2 border-dashed p-3 transition-colors',
          dragging
            ? 'border-indigo-500 bg-indigo-50/60'
            : 'border-slate-200 bg-slate-50/40'
        )}
      >
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {value.map((url, i) => (
            <div
              key={`${url}-${i}`}
              className="relative aspect-square rounded-lg overflow-hidden border border-slate-200 group"
            >
              <Image src={url} alt={`Gallery image ${i + 1}`} fill className="object-cover" />
              <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/30 transition-colors" />
              <button
                type="button"
                aria-label={`Remove gallery image ${i + 1}`}
                onClick={() => onChange(value.filter((_, idx) => idx !== i))}
                className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-600"
              >
                <X size={13} />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className={cn(
              'aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-1 text-slate-400 transition-colors',
              'border-slate-200 bg-white hover:border-indigo-400 hover:text-indigo-500',
              'disabled:opacity-60'
            )}
          >
            {uploading ? (
              <>
                <Loader2 size={18} className="animate-spin text-indigo-500" />
                <span className="text-[10px] font-medium text-indigo-500">
                  {uploadingCount} left
                </span>
              </>
            ) : (
              <>
                <Upload size={18} />
                <span className="text-[10px] font-medium">Add</span>
              </>
            )}
          </button>
        </div>

        {value.length === 0 && !uploading && (
          <p className="mt-2 text-center text-xs text-slate-400">
            Drag & drop multiple images here, or use the Add tile
          </p>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(',')}
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.length) handleFiles(Array.from(e.target.files));
          e.target.value = '';
        }}
      />
    </div>
  );
}
