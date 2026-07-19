'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  MapPin,
  Images,
  ListChecks,
  Info,
  Eye,
  Star,
  Loader2,
} from 'lucide-react';
import Modal from '@/components/Modal';
import Input from '@/components/Input';
import Button from '@/components/Button';
import ToggleSwitch from '@/components/ToggleSwitch';
import SearchableSelect from './SearchableSelect';
import StarRatingInput from './StarRatingInput';
import BudgetInput from './BudgetInput';
import { ImageUploadField, GalleryUploadField } from './ImageUpload';
import {
  POPULAR_COUNTRIES,
  DESTINATION_CATEGORIES,
  SEASONS,
  CURRENCIES,
} from '@/constants';
import type { AdminDestination, DestinationFormValues } from '@/types/admin';

const schema = z.object({
  title: z.string().min(2, 'Title is required').max(100),
  country: z.string().min(2, 'Country is required').max(100),
  category: z.string().min(2, 'Category is required'),
  description: z.string().min(10, 'Description is too short'),
  location: z.string().min(2, 'Location is required'),
  thumbnail: z.string().url('Thumbnail image is required'),
  gallery: z.array(z.string().url()),
  rating: z.number().min(1, 'Rating is required').max(5),
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

const emptyValues: FormSchema = {
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
};

const toLines = (text?: string): string[] =>
  (text || '')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);

const fromLines = (arr?: string[]): string => (arr || []).join('\n');

/* --------------------------- Section wrapper -------------------------- */
function FormSection({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3 bg-slate-50/80 border-b border-slate-200">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-sm shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900 leading-tight">{title}</h3>
          {description && <p className="text-xs text-slate-500">{description}</p>}
        </div>
      </div>
      <div className="p-4 space-y-4">{children}</div>
    </section>
  );
}

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
    defaultValues: emptyValues,
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
        reset(emptyValues);
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
    'w-full px-4 py-2 text-sm border-2 border-slate-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors placeholder-slate-400';

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={destination ? 'Edit Destination' : 'Add New Destination'}
      description={
        destination
          ? 'Update the destination details below'
          : 'Fill in the details to create a new destination'
      }
      size="xl"
    >
      <form onSubmit={handleSubmit(submit)} className="space-y-5">
        {/* ------------------------- Basic Info ------------------------- */}
        <FormSection
          icon={<MapPin size={15} />}
          title="Basic Information"
          description="Name, location and description of the destination"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Input
                label="Title"
                required
                placeholder="e.g. Santorini Sunset Escape"
                {...register('title')}
                error={errors.title?.message}
              />
            </div>
            <Controller
              control={control}
              name="country"
              render={({ field }) => (
                <SearchableSelect
                  label="Country"
                  required
                  placeholder="Select a country"
                  options={POPULAR_COUNTRIES}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.country?.message}
                  allowCustom
                />
              )}
            />
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <SearchableSelect
                  label="Category"
                  required
                  placeholder="Select a category"
                  options={DESTINATION_CATEGORIES}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.category?.message}
                  allowCustom
                />
              )}
            />
            <div className="sm:col-span-2">
              <Input
                label="Location"
                required
                placeholder="e.g. Santorini, Cyclades Islands"
                {...register('location')}
                error={errors.location?.message}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Description<span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              placeholder="Describe what makes this destination special..."
              className={textareaClass}
              {...register('description')}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>
        </FormSection>

        {/* --------------------------- Media --------------------------- */}
        <FormSection
          icon={<Images size={15} />}
          title="Media"
          description="Thumbnail and gallery images (hosted on ImgBB)"
        >
          <Controller
            control={control}
            name="thumbnail"
            render={({ field }) => (
              <ImageUploadField
                label="Thumbnail"
                required
                value={field.value}
                onChange={field.onChange}
                error={errors.thumbnail?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="gallery"
            render={({ field }) => (
              <GalleryUploadField
                label="Gallery"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </FormSection>

        {/* ----------------------- Trip Details ------------------------ */}
        <FormSection
          icon={<Star size={15} />}
          title="Trip Details"
          description="Rating, budget and best time to visit"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Controller
              control={control}
              name="rating"
              render={({ field }) => (
                <StarRatingInput
                  label="Rating"
                  required
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.rating?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="estimatedBudget"
              render={({ field }) => (
                <BudgetInput
                  label="Estimated Budget"
                  required
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.estimatedBudget?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="bestSeason"
              render={({ field }) => (
                <SearchableSelect
                  label="Best Season"
                  required
                  placeholder="Select a season"
                  options={SEASONS}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.bestSeason?.message}
                  allowCustom
                />
              )}
            />
            <Input
              label="Duration"
              placeholder="e.g. 5-7 days"
              {...register('duration')}
              error={errors.duration?.message}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Best Time Description
            </label>
            <textarea
              rows={2}
              placeholder="When and why is this the best time to visit?"
              className={textareaClass}
              {...register('bestTimeDescription')}
            />
          </div>
        </FormSection>

        {/* ------------------------ Trip Content ----------------------- */}
        <FormSection
          icon={<ListChecks size={15} />}
          title="Trip Content"
          description="Highlights, inclusions and tips — one item per line"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Highlights
              </label>
              <textarea
                rows={3}
                placeholder={'Sunset cruise\nVolcano hike'}
                className={textareaClass}
                {...register('highlightsText')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Travel Tips
              </label>
              <textarea
                rows={3}
                placeholder={'Book ferries early\nCarry sunscreen'}
                className={textareaClass}
                {...register('travelTipsText')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Included
              </label>
              <textarea
                rows={3}
                placeholder={'Hotel accommodation\nAirport transfers'}
                className={textareaClass}
                {...register('includedText')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Excluded
              </label>
              <textarea
                rows={3}
                placeholder={'International flights\nTravel insurance'}
                className={textareaClass}
                {...register('excludedText')}
              />
            </div>
          </div>
        </FormSection>

        {/* ---------------------- Additional Info ----------------------- */}
        <FormSection
          icon={<Info size={15} />}
          title="Additional Information"
          description="Optional practical details for travelers"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Weather"
              placeholder="e.g. Mediterranean, mild winters"
              {...register('weather')}
            />
            <Controller
              control={control}
              name="currency"
              render={({ field }) => (
                <SearchableSelect
                  label="Currency"
                  placeholder="Select a currency"
                  options={CURRENCIES}
                  value={field.value || ''}
                  onChange={field.onChange}
                  allowCustom
                />
              )}
            />
            <Input
              label="Language"
              placeholder="e.g. Greek, English"
              {...register('language')}
            />
            <Input
              label="Map URL"
              placeholder="https://maps.google.com/..."
              {...register('mapUrl')}
              error={errors.mapUrl?.message}
            />
          </div>
        </FormSection>

        {/* ------------------------- Visibility ------------------------- */}
        <FormSection
          icon={<Eye size={15} />}
          title="Visibility"
          description="Control where this destination appears"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Controller
              control={control}
              name="featured"
              render={({ field }) => (
                <div
                  className={
                    'flex items-center justify-between gap-3 p-3.5 rounded-xl border-2 transition-colors ' +
                    (field.value
                      ? 'border-indigo-200 bg-indigo-50/60'
                      : 'border-slate-200 bg-white')
                  }
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900">Featured</p>
                    <p className="text-xs text-slate-500">Show on the home page spotlight</p>
                  </div>
                  <ToggleSwitch checked={field.value} onCheckedChange={field.onChange} />
                </div>
              )}
            />
            <Controller
              control={control}
              name="published"
              render={({ field }) => (
                <div
                  className={
                    'flex items-center justify-between gap-3 p-3.5 rounded-xl border-2 transition-colors ' +
                    (field.value
                      ? 'border-emerald-200 bg-emerald-50/60'
                      : 'border-slate-200 bg-white')
                  }
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900">Published</p>
                    <p className="text-xs text-slate-500">Visible to users in Explore</p>
                  </div>
                  <ToggleSwitch checked={field.value} onCheckedChange={field.onChange} />
                </div>
              )}
            />
          </div>
        </FormSection>

        {/* --------------------------- Actions -------------------------- */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-slate-200 sticky bottom-0 bg-white pb-1">
          <Button
            type="button"
            variant="outline"
            fullWidth
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" fullWidth disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                {destination ? 'Saving...' : 'Creating...'}
              </span>
            ) : destination ? (
              'Save Changes'
            ) : (
              'Create Destination'
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
