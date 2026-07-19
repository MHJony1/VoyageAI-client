'use client';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Wand2,
  Copy,
  Download,
  Printer,
  RefreshCw,
  Save,
  Sparkles,
  Crown,
  Compass,
  Calendar,
  DollarSign,
  Clock,
  MapPin,
  Heart,
} from 'lucide-react';
import { toast } from 'sonner';
import Button from '@/components/Button';
import Card, { CardBody, CardHeader } from '@/components/Card';
import Input from '@/components/Input';
import Select from '@/components/Select';
import MultiSelect from '@/components/MultiSelect';
import { useGenerateTripPlan } from '@/hooks/useGenerateTripPlan';
import { useSaveTrip } from '@/hooks/useSaveTrip';
import { TripPlanResponse } from '@/services/ai.service';
import { useState } from 'react';
import jsPDF from 'jspdf';

const tripPlanSchema = z.object({
  destination: z.string().min(2, 'Destination required'),
  budget: z.preprocess(
    (val) => (typeof val === 'string' ? Number(val) : val),
    z.number().positive('Budget must be positive'),
  ),
  numberOfDays: z.preprocess(
    (val) => (typeof val === 'string' ? Number(val) : val),
    z.number().min(1, 'At least 1 day').max(30, 'Max 30 days'),
  ),
  travelStyle: z.string().min(1, 'Travel style required'),
  groupType: z.string().optional(),
  preferredSeason: z.string().optional(),
  interests: z.array(z.string()).min(1, 'At least one interest required'),
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const INTERESTS_OPTIONS = [
  { value: 'adventure', label: 'Adventure' },
  { value: 'beach', label: 'Beach' },
  { value: 'culture', label: 'Culture' },
  { value: 'food', label: 'Food' },
  { value: 'hiking', label: 'Hiking' },
  { value: 'history', label: 'History' },
  { value: 'nightlife', label: 'Nightlife' },
  { value: 'nature', label: 'Nature' },
  { value: 'photography', label: 'Photography' },
  { value: 'relaxation', label: 'Relaxation' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'wildlife', label: 'Wildlife' },
];

const TRAVEL_STYLES = [
  { value: 'luxury', label: 'Luxury' },
  { value: 'budget', label: 'Budget' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'backpacker', label: 'Backpacker' },
  { value: 'adventure', label: 'Adventure' },
];

const GROUP_TYPES = [
  { value: 'solo', label: 'Solo' },
  { value: 'couple', label: 'Couple' },
  { value: 'family', label: 'Family' },
  { value: 'friends', label: 'Friends' },
  { value: 'group', label: 'Group' },
];

const SEASONS = [
  { value: 'spring', label: 'Spring' },
  { value: 'summer', label: 'Summer' },
  { value: 'fall', label: 'Fall' },
  { value: 'winter', label: 'Winter' },
];

export default function AIPlannerPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(tripPlanSchema),
    defaultValues: {
      interests: [],
    },
  });

  const interests = watch('interests');
  const { mutate: generatePlan, isPending } = useGenerateTripPlan();
  const { mutate: saveTrip, isPending: isSaving } = useSaveTrip();

  const [result, setResult] = useState<TripPlanResponse | null>(null);

  const onSubmit = (data: any) => {
    const payload = {
      destination: data.destination,
      budget: Number(data.budget),
      numberOfDays: Number(data.numberOfDays),
      travelStyle: data.travelStyle,
      interests: data.interests,
      groupType: data.groupType,
      preferredSeason: data.preferredSeason,
    };
    generatePlan(payload, {
      onSuccess: (response) => {
        setResult(response);
        toast.success('Trip plan generated successfully!');
      },
      onError: (error) => {
        toast.error(error.message || 'Failed to generate trip plan');
      },
    });
  };

  const handleSaveTrip = () => {
    if (!result) return;

    const formData = watch();
    const payload = {
      destination: formData.destination,
      days: Number(formData.numberOfDays),
      budget: Number(formData.budget),
      travelStyle: formData.travelStyle,
      interests: formData.interests,
      itinerary: JSON.stringify(result.itinerary),
      estimatedCost: result.budget?.total || Number(formData.budget),
      status: 'planned',
    };
    saveTrip(payload, {
      onSuccess: () => {
        toast.success('Trip saved successfully!');
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message ||
            error?.message ||
            'Failed to save trip',
        );
      },
    });
  };

  const handleCopy = () => {
    const text = generateResultText();
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    if (!result) return;

    const formData = watch();
    const pdf = new jsPDF();
    let yPosition = 20;

    pdf.setFontSize(16);
    pdf.text(`Trip Plan: ${formData.destination}`, 20, yPosition);
    yPosition += 10;

    pdf.setFontSize(10);
    pdf.text(
      `Budget: $${formData.budget} | Days: ${formData.numberOfDays}`,
      20,
      yPosition,
    );
    yPosition += 8;

    pdf.setFontSize(12);
    pdf.text('Overview', 20, yPosition);
    yPosition += 6;

    pdf.setFontSize(10);
    const overviewLines = pdf.splitTextToSize(result.overview || '', 170);
    pdf.text(overviewLines, 20, yPosition);
    yPosition += overviewLines.length * 4 + 6;

    if (yPosition > 250) {
      pdf.addPage();
      yPosition = 20;
    }

    pdf.setFontSize(12);
    pdf.text('Budget Breakdown', 20, yPosition);
    yPosition += 6;

    pdf.setFontSize(10);
    if (result.budget) {
      pdf.text(
        `Accommodation: $${result.budget.accommodation || 0}`,
        25,
        yPosition,
      );
      yPosition += 5;
      pdf.text(`Food: $${result.budget.food || 0}`, 25, yPosition);
      yPosition += 5;
      pdf.text(`Activities: $${result.budget.activities || 0}`, 25, yPosition);
      yPosition += 5;
      pdf.text(
        `Transportation: $${result.budget.transportation || 0}`,
        25,
        yPosition,
      );
      yPosition += 5;
      pdf.text(`TOTAL: $${result.budget.total || 0}`, 25, yPosition);
      yPosition += 8;
    }

    pdf.save(`trip-plan-${formData.destination}.pdf`);
    toast.success('PDF downloaded!');
  };

  const generateResultText = (): string => {
    if (!result) return '';
    const formData = watch();
    let text = `Trip Plan: ${formData.destination}\n\n`;
    text += `Budget: $${formData.budget}\n`;
    text += `Duration: ${formData.numberOfDays} days\n`;
    text += `Travel Style: ${formData.travelStyle}\n\n`;
    text += `Overview:\n${result.overview}\n\n`;

    if (result.budget) {
      text += `Budget Breakdown:\n`;
      text += `- Accommodation: $${result.budget.accommodation}\n`;
      text += `- Food: $${result.budget.food}\n`;
      text += `- Activities: $${result.budget.activities}\n`;
      text += `- Transportation: $${result.budget.transportation}\n`;
      text += `- Total: $${result.budget.total}\n\n`;
    }

    return text;
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-4 md:p-6 max-w-7xl mx-auto"
    >
      {/* Premium Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur-xl opacity-30" />
            <div className="relative w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              AI Trip Planner
            </h1>
            <p className="text-slate-500">
              Let AI create your perfect travel itinerary
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2 bg-gradient-to-r from-amber-400/20 to-orange-400/20 px-4 py-2 rounded-full border border-amber-200/30">
            <Crown className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-medium text-amber-700">
              Premium Feature
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Form Column */}
        <div className="lg:col-span-1">
          <Card className="border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="border-b border-slate-200/60">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-slate-900">
                  Plan Your Trip
                </h2>
              </div>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="relative">
                  <Input
                    label="Destination"
                    placeholder="e.g., Paris, France"
                    icon={<MapPin className="w-4 h-4 text-slate-400" />}
                    {...register('destination')}
                    error={errors.destination?.message}
                    disabled={isPending}
                    className="pl-10"
                  />
                </div>

                <div className="relative">
                  <Input
                    label="Budget (USD)"
                    type="number"
                    placeholder="e.g., 5000"
                    icon={<DollarSign className="w-4 h-4 text-slate-400" />}
                    {...register('budget')}
                    error={errors.budget?.message}
                    disabled={isPending}
                    className="pl-10"
                  />
                </div>

                <div className="relative">
                  <Input
                    label="Number of Days"
                    type="number"
                    min="1"
                    max="30"
                    placeholder="e.g., 7"
                    icon={<Clock className="w-4 h-4 text-slate-400" />}
                    {...register('numberOfDays')}
                    error={errors.numberOfDays?.message}
                    disabled={isPending}
                    className="pl-10"
                  />
                </div>

                <Select
                  label="Travel Style"
                  options={TRAVEL_STYLES}
                  {...register('travelStyle')}
                  error={errors.travelStyle?.message}
                  disabled={isPending}
                />

                <Select
                  label="Group Type"
                  options={GROUP_TYPES}
                  {...register('groupType')}
                  disabled={isPending}
                />

                <Select
                  label="Preferred Season"
                  options={SEASONS}
                  {...register('preferredSeason')}
                  disabled={isPending}
                />

                <MultiSelect
                  label="Interests"
                  options={INTERESTS_OPTIONS}
                  value={interests}
                  onChange={(value) => setValue('interests', value)}
                  error={errors.interests?.message}
                />

                <div className="flex gap-2 pt-4">
                  <Button
                    type="submit"
                    fullWidth
                    isLoading={isPending}
                    disabled={isPending}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-600/25"
                  >
                    <Sparkles className="w-4 h-4" />
                    Generate Plan
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      reset();
                      setResult(null);
                    }}
                    disabled={isPending}
                  >
                    Reset
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>

          {/* Tips Card - Premium */}
          <Card className="mt-6 border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="border-b border-slate-200/60">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500" />
                <h2 className="text-lg font-semibold text-slate-900">
                  Pro Tips
                </h2>
              </div>
            </CardHeader>
            <CardBody>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    1
                  </span>
                  <span>Tell us your budget for accurate planning</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    2
                  </span>
                  <span>Specify duration for detailed day-wise itinerary</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    3
                  </span>
                  <span>
                    Share your interests for personalized recommendations
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    4
                  </span>
                  <span>Save your trip plan for future reference</span>
                </li>
              </ul>
            </CardBody>
          </Card>
        </div>

        {/* Preview Column */}
        <div className="lg:col-span-2">
          {!result ? (
            <Card className="border-slate-200/60 shadow-sm h-full">
              <CardBody className="flex flex-col items-center justify-center py-20">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full blur-3xl" />
                  <div className="relative w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center">
                    <Wand2 className="w-12 h-12 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mt-6">
                  Ready to Plan
                </h3>
                <p className="text-slate-500 text-center max-w-md mt-2">
                  Fill in the form and click "Generate Plan" to see your
                  personalized trip itinerary
                </p>
              </CardBody>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Action Buttons - Premium */}
              <div className="flex flex-wrap gap-2 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-slate-200/60 shadow-sm sticky top-0 z-10">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopy}
                  className="gap-2 hover:bg-blue-50"
                >
                  <Copy size={16} />
                  Copy
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handlePrint}
                  className="gap-2 hover:bg-blue-50"
                >
                  <Printer size={16} />
                  Print
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleDownloadPDF}
                  className="gap-2 hover:bg-blue-50"
                >
                  <Download size={16} />
                  PDF
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setResult(null)}
                  className="gap-2 hover:bg-blue-50"
                >
                  <RefreshCw size={16} />
                  Regenerate
                </Button>
                <Button
                  size="sm"
                  onClick={handleSaveTrip}
                  isLoading={isSaving}
                  disabled={isSaving}
                  className="gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-lg hover:shadow-emerald-500/25"
                >
                  <Save size={16} />
                  Save Trip
                </Button>
              </div>

              {/* Overview */}
              <Card className="border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="border-b border-slate-200/60">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-slate-900">
                      Trip Overview
                    </h3>
                  </div>
                </CardHeader>
                <CardBody>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {result.overview}
                  </p>
                </CardBody>
              </Card>

              {/* Budget Breakdown - Premium */}
              {result.budget && (
                <Card className="border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="border-b border-slate-200/60">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-emerald-600" />
                      <h3 className="font-semibold text-slate-900">
                        Budget Breakdown
                      </h3>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-3 text-sm">
                      {Object.entries(result.budget).map(([key, value]) => {
                        if (key === 'total') return null;
                        const icons: Record<string, string> = {
                          accommodation: '🏨',
                          food: '🍽️',
                          activities: '🎯',
                          transportation: '🚗',
                        };
                        return (
                          <div
                            key={key}
                            className="flex justify-between items-center p-2 rounded-lg bg-slate-50/80"
                          >
                            <span className="text-slate-600 capitalize flex items-center gap-2">
                              <span>{icons[key] || '💰'}</span>
                              {key}
                            </span>
                            <span className="font-medium text-slate-900">
                              ${value || 0}
                            </span>
                          </div>
                        );
                      })}
                      <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100/50 mt-2">
                        <span className="font-semibold text-slate-900 flex items-center gap-2">
                          <span>💎</span> Total
                        </span>
                        <span className="font-bold text-blue-600 text-lg">
                          ${result.budget.total || 0}
                        </span>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              )}

              {/* Itinerary - Premium */}
              {result.itinerary && result.itinerary.length > 0 && (
                <Card className="border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="border-b border-slate-200/60">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-purple-600" />
                      <h3 className="font-semibold text-slate-900">
                        Day-wise Itinerary
                      </h3>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-4">
                      {result.itinerary.map((day, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-l-4 border-blue-400 pl-4 hover:bg-slate-50/50 p-3 rounded-r-xl transition-colors"
                        >
                          <h4 className="font-medium text-slate-900 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                              {day.day || index + 1}
                            </span>
                            Day {day.day || index + 1}: {day.title}
                          </h4>
                          {day.activities && day.activities.length > 0 && (
                            <ul className="mt-2 space-y-1 text-sm text-slate-600">
                              {day.activities.map((activity, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-blue-400 mt-1">▸</span>
                                  <span>{activity}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                          {day.meals && (
                            <p className="mt-2 text-sm text-slate-600 bg-amber-50/50 p-2 rounded-lg border border-amber-100/30">
                              <span className="font-medium text-amber-700">
                                🍽️ Meals:
                              </span>{' '}
                              {typeof day.meals === 'string'
                                ? day.meals
                                : Object.entries(day.meals)
                                    .filter(([, v]) => v)
                                    .map(([k, v]) => `${k}: ${v}`)
                                    .join(' • ')}
                            </p>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              )}

              {/* Hotels - Premium */}
              {result.hotels && result.hotels.length > 0 && (
                <Card className="border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="border-b border-slate-200/60">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🏨</span>
                      <h3 className="font-semibold text-slate-900">
                        Hotel Suggestions
                      </h3>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {result.hotels.map((hotel, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className="border border-slate-200/60 rounded-xl p-4 hover:shadow-md transition-all hover:border-slate-300/80"
                        >
                          <h4 className="font-medium text-slate-900">
                            {hotel.name}
                          </h4>
                          <p className="text-sm text-slate-500">{hotel.type}</p>
                          <div className="flex justify-between items-center mt-3">
                            <span className="text-sm font-semibold text-slate-900">
                              {hotel.pricePerNight}
                            </span>
                            <span className="flex items-center gap-1 text-sm text-amber-600">
                              <span>⭐</span> {hotel.rating}/5
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              )}

              {/* Transportation */}
              {result.transportation && result.transportation.length > 0 && (
                <Card className="border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="border-b border-slate-200/60">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🚗</span>
                      <h3 className="font-semibold text-slate-900">
                        Transportation
                      </h3>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-3">
                      {result.transportation.map((transport, index) => (
                        <div
                          key={index}
                          className="border-l-4 border-emerald-400 pl-4 p-2 hover:bg-slate-50/50 rounded-r-xl transition-colors"
                        >
                          <h4 className="font-medium text-slate-900">
                            {transport.type}
                          </h4>
                          <p className="text-sm text-slate-600">
                            {transport.details}
                          </p>
                          <p className="text-sm font-medium text-slate-900 mt-1">
                            💰 Cost: {transport.estimatedCost}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              )}

              {/* Food Recommendations */}
              {result.food && result.food.length > 0 && (
                <Card className="border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="border-b border-slate-200/60">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🍽️</span>
                      <h3 className="font-semibold text-slate-900">
                        Food Recommendations
                      </h3>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-3">
                      {result.food.map((food, index) => (
                        <div
                          key={index}
                          className="border border-slate-200/60 rounded-xl p-4 hover:shadow-md transition-all"
                        >
                          <h4 className="font-medium text-slate-900">
                            {food.restaurant}
                          </h4>
                          <p className="text-sm text-slate-500">
                            {food.cuisine}
                          </p>
                          <p className="text-sm text-slate-600 mt-2 p-2 bg-amber-50/50 rounded-lg border border-amber-100/30">
                            💡 {food.recommendation}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              )}

              {/* Activities */}
              {result.activities && result.activities.length > 0 && (
                <Card className="border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="border-b border-slate-200/60">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🎯</span>
                      <h3 className="font-semibold text-slate-900">
                        Activities
                      </h3>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-3">
                      {result.activities.map((activity, index) => (
                        <div
                          key={index}
                          className="border-l-4 border-purple-400 pl-4 p-2 hover:bg-slate-50/50 rounded-r-xl transition-colors"
                        >
                          <h4 className="font-medium text-slate-900">
                            {activity.activity}
                          </h4>
                          <p className="text-sm text-slate-600 mt-1">
                            {activity.description}
                          </p>
                          <p className="text-sm text-slate-500 mt-1">
                            <span className="font-medium">⏰ Best time:</span>{' '}
                            {activity.bestTime}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              )}

              {/* Tips */}
              {result.tips && result.tips.length > 0 && (
                <Card className="border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="border-b border-slate-200/60">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">💡</span>
                      <h3 className="font-semibold text-slate-900">
                        Travel Tips
                      </h3>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <ul className="space-y-2">
                      {result.tips.map((tip, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex gap-2 text-sm text-slate-700 p-2 rounded-lg hover:bg-slate-50/50 transition-colors"
                        >
                          <span className="text-blue-600 font-bold">✦</span>
                          <span>{tip}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardBody>
                </Card>
              )}

              {/* Packing List */}
              {result.packing && result.packing.length > 0 && (
                <Card className="border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="border-b border-slate-200/60">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🧳</span>
                      <h3 className="font-semibold text-slate-900">
                        Packing List
                      </h3>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {result.packing.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.02 }}
                          className="flex items-center gap-2 text-sm text-slate-700 p-2 rounded-lg hover:bg-slate-50/50 transition-colors"
                        >
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span>{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
