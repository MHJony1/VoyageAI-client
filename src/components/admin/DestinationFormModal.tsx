'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Modal from '@/components/Modal';
import Input from '@/components/Input';
import Button from '@/components/Button';
import ToggleSwitch from '@/components/ToggleSwitch';
import { ImageUploadField, GalleryUploadField } from './ImageUpload';
import type { AdminDestination, DestinationFormValues } from '@/types/admin';

const schema = z.object({
  title: z.string().min(2, 'Title is required').max(100),
  country: z.string().min(2, 'Country is required').max(100),
  category: z.string().min(2, 'Category is required'),
  description: z.string().min(10, 'Description is too short'),
  location: z.string().min(2, 'Location is required'),
  thumbnail: z.string().url('Thumbnail image is required'),
  gallery: z.array(z.string().url()),
  rating: z.number().min(1).max(5),
  estimatedBudget: z.number().positive('Budget must be positive'),
  bestSeason: z.string().min(2, 'Season is required'),
  featured: z.boolean(),
  published: z.boolean(),
  duration: z.string().optional(),
  bestTimeDescription: z.string().optional(),
  highlightsText: z.string().optional(),
  includedText: z.string().optional(),
  excludedText: z.string().optional(),
  travelTipsText: z.string().optional(),
  weather: z.string().optional(),
  currency: z.string().optional(),
  language: z.string().optional(),
  mapUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
});

type FormSchema = z.infer<typeof schema>;

const toLines = (text?: string): string[] =>
  (text || '')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);

const fromLines = (arr?: string[]): string => (arr || []).join('\n');

interface Props {
  open: boolean;
  onClose: () => void;
  destination?: AdminDestination | null;
  onSubmit: (data: DestinationFormValues) => void;
  isSubmitting: boolean;
}

export default function DestinationFormModal({
  open,
  onClose,
  destination,
  onSubmit,
  isSubmitting,
}: Props) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      country: '',
      category: '',
      description: '',
      location: '',
      thumbnail: '',
      gallery: [],
      rating: 5,
      estimatedBudget: 1000,
      bestSeason: '',
      featured: false,
      published: true,
    },
  });

  useEffect(() => {
    if (open) {
      if (destination) {
        reset({
          title: destination.title,
          country: destination.country,
          category: destination.category,
          description: destination.description,
          location: destination.location,
          thumbnail: destination.thumbnail,
          gallery: destination.gallery || [],
          rating: destination.rating,
          estimatedBudget: destination.estimatedBudget,
          bestSeason: destination.bestSeason,
          featured: destination.featured,
          published: destination.published,
          duration: destination.duration || '',
          bestTimeDescription: destination.bestTimeDescription || '',
          highlightsText: fromLines(destination.highlights),
          includedText: fromLines(destination.included),
          excludedText: fromLines(destination.excluded),
          travelTipsText: fromLines(destination.travelTips),
          weather: destination.weather || '',
          currency: destination.currency || '',
          language: destination.language || '',
          mapUrl: destination.mapUrl || '',
        });
      } else {
        reset({
          title: '',
          country: '',
          category: '',
          description: '',
          location: '',
          thumbnail: '',
          gallery: [],
          rating: 5,
          estimatedBudget: 1000,
          bestSeason: '',
          featured: false,
          published: true,
          duration: '',
          bestTimeDescription: '',
          highlightsText: '',
          includedText: '',
          excludedText: '',
          travelTipsText: '',
          weather: '',
          currency: '',
          language: '',
          mapUrl: '',
        });
      }
    }
  }, [open, destination, reset]);

  const submit = (values: FormSchema) => {
    const payload: DestinationFormValues = {
      title: values.title,
      country: values.country,
      category: values.category,
      description: values.description,
      location: values.location,
      thumbnail: values.thumbnail,
      gallery: values.gallery,
      rating: values.rating,
      estimatedBudget: values.estimatedBudget,
      bestSeason: values.bestSeason,
      featured: values.featured,
      published: values.published,
      duration: values.duration || undefined,
      bestTimeDescription: values.bestTimeDescription || undefined,
      highlights: toLines(values.highlightsText),
      included: toLines(values.includedText),
      excluded: toLines(values.excludedText),
      travelTips: toLines(values.travelTipsText),
      weather: values.weather || undefined,
      currency: values.currency || undefined,
      language: values.language || undefined,
      mapUrl: values.mapUrl || undefined,
    };
    onSubmit(payload);
  };

  const textareaClass =
    'w-full px-4 py-2 text-sm border-2 border-slate-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors';

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={destination ? 'Edit Destination' : 'Create Destination'}
      size="lg"
    >
      <form onSubmit={handleSubmit(submit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Title" required {...register('title')} error={errors.title?.message} />
          <Input label="Country" required {...register('country')} error={errors.country?.message} />
          <Input label="Category" required {...register('category')} error={errors.category?.message} />
          <Input label="Location" required {...register('location')} error={errors.location?.message} />
          <Input
            label="Rating (1-5)"
            type="number"
            step="0.1"
            required
            {...register('rating', { valueAsNumber: true })}
            error={errors.rating?.message}
          />
          <Input
            label="Estimated Budget"
            type="number"
            required
            {...register('estimatedBudget', { valueAsNumber: true })}
            error={errors.estimatedBudget?.message}
          />
          <Input label="Best Season" required {...register('bestSeason')} error={errors.bestSeason?.message} />
          <Input label="Duration" {...register('duration')} error={errors.duration?.message} />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">
            Description<span className="text-red-500">*</span>
          </label>
          <textarea rows={3} className={textareaClass} {...register('description')} />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        <Controller
          control={control}
          name="thumbnail"
          render={({ field }) => (
            <div>
              <ImageUploadField label="Thumbnail *" value={field.value} onChange={field.onChange} />
              {errors.thumbnail && (
                <p className="mt-1 text-sm text-red-500">{errors.thumbnail.message}</p>
              )}
            </div>
          )}
        />

        <Controller
          control={control}
          name="gallery"
          render={({ field }) => (
            <GalleryUploadField label="Gallery" value={field.value} onChange={field.onChange} />
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">Highlights (one per line)</label>
            <textarea rows={3} className={textareaClass} {...register('highlightsText')} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">Travel Tips (one per line)</label>
            <textarea rows={3} className={textareaClass} {...register('travelTipsText')} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">Included (one per line)</label>
            <textarea rows={3} className={textareaClass} {...register('includedText')} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">Excluded (one per line)</label>
            <textarea rows={3} className={textareaClass} {...register('excludedText')} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Weather" {...register('weather')} />
          <Input label="Currency" {...register('currency')} />
          <Input label="Language" {...register('language')} />
          <Input label="Map URL" {...register('mapUrl')} error={errors.mapUrl?.message} />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">Best Time Description</label>
          <textarea rows={2} className={textareaClass} {...register('bestTimeDescription')} />
        </div>

        <div className="flex items-center gap-8 pt-2">
          <Controller
            control={control}
            name="featured"
            render={({ field }) => (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-700">Featured</span>
                <ToggleSwitch checked={field.value} onCheckedChange={field.onChange} />
              </div>
            )}
          />
          <Controller
            control={control}
            name="published"
            render={({ field }) => (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-700">Published</span>
                <ToggleSwitch checked={field.value} onCheckedChange={field.onChange} />
              </div>
            )}
          />
        </div>

        <div className="flex gap-3 pt-4 border-t border-slate-200">
          <Button type="button" variant="outline" fullWidth onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" fullWidth isLoading={isSubmitting}>
            {destination ? 'Save Changes' : 'Create'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
