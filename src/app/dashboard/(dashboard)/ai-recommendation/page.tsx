'use client';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Compass,
  Copy,
  Download,
  Printer,
  RefreshCw,
  Save,
  Sparkles,
  Crown,
  Globe,
  Heart,
  Star,
  MapPin,
  DollarSign,
} from 'lucide-react';
import { toast } from 'sonner';
import Button from '@/components/Button';
import Card, { CardBody, CardHeader } from '@/components/Card';
import Select from '@/components/Select';
import MultiSelect from '@/components/MultiSelect';
import Input from '@/components/Input';
import { useGenerateRecommendation } from '@/hooks/useGenerateRecommendation';
import { useSaveTrip } from '@/hooks/useSaveTrip';
import { RecommendationResponse } from '@/services/ai.service';
import { useState } from 'react';
import jsPDF from 'jspdf';

const recommendationSchema = z.object({
  budget: z.preprocess(
    (val) => (typeof val === 'string' ? Number(val) : val),
    z.number().positive('Budget must be positive'),
  ),
  preferredSeason: z.string().min(1, 'Season required'),
  travelStyle: z.string().min(1, 'Travel style required'),
  groupType: z.string().min(1, 'Group type required'),
  interests: z.array(z.string()).min(1, 'At least one interest required'),
});

type RecommendationFormData = z.infer<typeof recommendationSchema>;

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
  { value: 'luxury', label: 'Luxury ✨' },
  { value: 'budget', label: 'Budget 💰' },
  { value: 'moderate', label: 'Moderate ⚖️' },
  { value: 'backpacker', label: 'Backpacker 🎒' },
  { value: 'adventure', label: 'Adventure 🧗' },
];

const GROUP_TYPES = [
  { value: 'solo', label: 'Solo 🧑' },
  { value: 'couple', label: 'Couple 💑' },
  { value: 'family', label: 'Family 👨‍👩‍👧‍👦' },
  { value: 'friends', label: 'Friends 👫' },
  { value: 'group', label: 'Group 👥' },
];

const SEASONS = [
  { value: 'spring', label: 'Spring 🌸' },
  { value: 'summer', label: 'Summer ☀️' },
  { value: 'fall', label: 'Fall 🍂' },
  { value: 'winter', label: 'Winter ❄️' },
];

export default function AIRecommendationPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(recommendationSchema),
    defaultValues: {
      interests: [],
    },
  });

  const interests = watch('interests');
  const { mutate: generateRecommendation, isPending } =
    useGenerateRecommendation();
  const { mutate: saveTrip, isPending: isSaving } = useSaveTrip();

  const [result, setResult] = useState<RecommendationResponse | null>(null);

  const onSubmit = (data: RecommendationFormData) => {
    generateRecommendation(data, {
      onSuccess: (response) => {
        setResult(response);
        toast.success('Recommendations generated successfully!');
      },
      onError: (error) => {
        toast.error(error.message || 'Failed to generate recommendations');
      },
    });
  };

  const handleSaveRecommendation = () => {
    if (!result || !result.destinations || result.destinations.length === 0)
      return;

    const destination = result.destinations[0];
    const formData = watch();
    const estimatedCostNum =
      typeof destination.estimatedBudget === 'string'
        ? parseInt(destination.estimatedBudget.replace(/[^0-9]/g, ''), 10) ||
          Number(formData.budget)
        : Number(formData.budget);

    const payload = {
      destination: destination.name,
      days: 7,
      budget: Number(formData.budget),
      travelStyle: formData.travelStyle,
      interests: formData.interests,
      itinerary: JSON.stringify({ recommendedDestination: destination }),
      estimatedCost: estimatedCostNum,
      status: 'planned',
    };
    saveTrip(payload, {
      onSuccess: () => {
        toast.success('Recommendation saved successfully!');
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message ||
            error?.message ||
            'Failed to save recommendation',
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

    const pdf = new jsPDF();
    let yPosition = 20;

    pdf.setFontSize(16);
    pdf.text('AI Destination Recommendations', 20, yPosition);
    yPosition += 10;

    pdf.setFontSize(10);
    const formData = watch();
    pdf.text(
      `Budget: $${formData.budget} | Travel Style: ${formData.travelStyle}`,
      20,
      yPosition,
    );
    yPosition += 8;

    if (result.destinations && result.destinations.length > 0) {
      pdf.setFontSize(12);
      pdf.text('Recommended Destinations', 20, yPosition);
      yPosition += 6;

      result.destinations.forEach((dest, index) => {
        if (yPosition > 250) {
          pdf.addPage();
          yPosition = 20;
        }

        pdf.setFontSize(11);
        pdf.text(`${index + 1}. ${dest.name}, ${dest.country}`, 20, yPosition);
        yPosition += 5;

        pdf.setFontSize(9);
        pdf.text(`Reason: ${dest.reason}`, 25, yPosition);
        yPosition += 4;
        pdf.text(`Budget: ${dest.estimatedBudget}`, 25, yPosition);
        yPosition += 4;
        pdf.text(`Best Time: ${dest.bestTimeToVisit}`, 25, yPosition);
        yPosition += 4;
        pdf.text(
          `Suggested Duration: ${dest.suggestedDuration}`,
          25,
          yPosition,
        );
        yPosition += 6;
      });

      yPosition += 4;
    }

    if (result.alternatives && result.alternatives.length > 0) {
      if (yPosition > 250) {
        pdf.addPage();
        yPosition = 20;
      }

      pdf.setFontSize(12);
      pdf.text('Alternative Destinations', 20, yPosition);
      yPosition += 6;

      result.alternatives.forEach((dest) => {
        if (yPosition > 250) {
          pdf.addPage();
          yPosition = 20;
        }

        pdf.setFontSize(10);
        pdf.text(`• ${dest.name}, ${dest.country}`, 25, yPosition);
        yPosition += 5;
      });

      yPosition += 4;
    }

    if (result.generalTips && result.generalTips.length > 0) {
      if (yPosition > 250) {
        pdf.addPage();
        yPosition = 20;
      }

      pdf.setFontSize(12);
      pdf.text('General Travel Tips', 20, yPosition);
      yPosition += 6;

      result.generalTips.forEach((tip) => {
        if (yPosition > 250) {
          pdf.addPage();
          yPosition = 20;
        }

        pdf.setFontSize(9);
        const tipLines = pdf.splitTextToSize(`• ${tip}`, 170);
        pdf.text(tipLines, 25, yPosition);
        yPosition += tipLines.length * 4 + 2;
      });
    }

    pdf.save('ai-recommendations.pdf');
    toast.success('PDF downloaded!');
  };

  const generateResultText = (): string => {
    if (!result) return '';
    const formData = watch();
    let text = 'AI Destination Recommendations\n\n';
    text += `Budget: $${formData.budget}\n`;
    text += `Travel Style: ${formData.travelStyle}\n`;
    text += `Group Type: ${formData.groupType}\n`;
    text += `Preferred Season: ${formData.preferredSeason}\n\n`;

    if (result.destinations && result.destinations.length > 0) {
      text += 'RECOMMENDED DESTINATIONS\n';
      text += '========================\n\n';
      result.destinations.forEach((dest, index) => {
        text += `${index + 1}. ${dest.name}, ${dest.country}\n`;
        text += `   Reason: ${dest.reason}\n`;
        text += `   Budget: ${dest.estimatedBudget}\n`;
        text += `   Best Time: ${dest.bestTimeToVisit}\n`;
        text += `   Duration: ${dest.suggestedDuration}\n\n`;
      });
    }

    if (result.alternatives && result.alternatives.length > 0) {
      text += 'ALTERNATIVE DESTINATIONS\n';
      text += '========================\n';
      result.alternatives.forEach((dest) => {
        text += `• ${dest.name}, ${dest.country}\n`;
      });
      text += '\n';
    }

    if (result.generalTips && result.generalTips.length > 0) {
      text += 'GENERAL TRAVEL TIPS\n';
      text += '==================\n';
      result.generalTips.forEach((tip) => {
        text += `• ${tip}\n`;
      });
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
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl blur-xl opacity-30" />
            <div className="relative w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              AI Recommendations
            </h1>
            <p className="text-slate-500">
              Discover destinations tailored to your preferences
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
                <Compass className="w-5 h-5 text-emerald-600" />
                <h2 className="text-lg font-semibold text-slate-900">
                  Find Destinations
                </h2>
              </div>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

                <Select
                  label="Preferred Season"
                  options={SEASONS}
                  {...register('preferredSeason')}
                  error={errors.preferredSeason?.message}
                  disabled={isPending}
                />

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
                  error={errors.groupType?.message}
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
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:shadow-lg hover:shadow-emerald-600/25"
                  >
                    <Sparkles className="w-4 h-4" />
                    Get Recommendations
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

          {/* Tips Card */}
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
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    1
                  </span>
                  <span>Set your budget for accurate recommendations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    2
                  </span>
                  <span>Choose your preferred travel season</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    3
                  </span>
                  <span>Select travel style that matches your vibe</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    4
                  </span>
                  <span>Add your interests for personalized picks</span>
                </li>
              </ul>
            </CardBody>
          </Card>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-2">
          {!result ? (
            <Card className="border-slate-200/60 shadow-sm h-full">
              <CardBody className="flex flex-col items-center justify-center py-20">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-500/20 rounded-full blur-3xl" />
                  <div className="relative w-24 h-24 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl flex items-center justify-center">
                    <Compass className="w-12 h-12 text-emerald-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mt-6">
                  Ready to Explore
                </h3>
                <p className="text-slate-500 text-center max-w-md mt-2">
                  Fill in your preferences and click "Get Recommendations" to
                  discover perfect destinations for you
                </p>
              </CardBody>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-slate-200/60 shadow-sm sticky top-0 z-10">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopy}
                  className="gap-2 hover:bg-emerald-50"
                >
                  <Copy size={16} />
                  Copy
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handlePrint}
                  className="gap-2 hover:bg-emerald-50"
                >
                  <Printer size={16} />
                  Print
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleDownloadPDF}
                  className="gap-2 hover:bg-emerald-50"
                >
                  <Download size={16} />
                  PDF
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setResult(null)}
                  className="gap-2 hover:bg-emerald-50"
                >
                  <RefreshCw size={16} />
                  Regenerate
                </Button>
                <Button
                  size="sm"
                  onClick={handleSaveRecommendation}
                  isLoading={isSaving}
                  disabled={isSaving}
                  className="gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-lg hover:shadow-emerald-500/25"
                >
                  <Save size={16} />
                  Save
                </Button>
              </div>

              {/* Recommended Destinations */}
              {result.destinations && result.destinations.length > 0 && (
                <Card className="border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="border-b border-slate-200/60">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                      <h3 className="font-semibold text-slate-900">
                        Recommended Destinations
                      </h3>
                      <span className="ml-auto text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                        {result.destinations.length} matches
                      </span>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-4">
                      {result.destinations.map((dest, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border border-slate-200/60 rounded-xl p-5 hover:shadow-md hover:border-slate-300/80 transition-all"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-slate-900 text-lg">
                                {dest.name}
                              </h4>
                              <p className="text-sm text-slate-500 flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5" />
                                {dest.country}
                              </p>
                              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                                {dest.reason}
                              </p>

                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                                <div className="bg-slate-50/80 rounded-lg p-2 text-center">
                                  <p className="text-xs text-slate-400">
                                    Budget
                                  </p>
                                  <p className="text-sm font-semibold text-slate-700">
                                    {dest.estimatedBudget}
                                  </p>
                                </div>
                                <div className="bg-slate-50/80 rounded-lg p-2 text-center">
                                  <p className="text-xs text-slate-400">
                                    Best Time
                                  </p>
                                  <p className="text-sm font-semibold text-slate-700">
                                    {dest.bestTimeToVisit}
                                  </p>
                                </div>
                                <div className="bg-slate-50/80 rounded-lg p-2 text-center">
                                  <p className="text-xs text-slate-400">
                                    Duration
                                  </p>
                                  <p className="text-sm font-semibold text-slate-700">
                                    {dest.suggestedDuration}
                                  </p>
                                </div>
                                <div className="bg-slate-50/80 rounded-lg p-2 text-center">
                                  <p className="text-xs text-slate-400">
                                    Rating
                                  </p>
                                  <p className="text-sm font-semibold text-amber-600">
                                    ⭐ 4.8/5
                                  </p>
                                </div>
                              </div>

                              {dest.mustVisitAttractions &&
                                dest.mustVisitAttractions.length > 0 && (
                                  <div className="mt-3">
                                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                                      Must Visit Attractions
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-1.5">
                                      {dest.mustVisitAttractions.map(
                                        (attraction, i) => (
                                          <span
                                            key={i}
                                            className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100/50"
                                          >
                                            {attraction}
                                          </span>
                                        ),
                                      )}
                                    </div>
                                  </div>
                                )}

                              {dest.travelTips &&
                                dest.travelTips.length > 0 && (
                                  <div className="mt-3 bg-amber-50/50 rounded-lg p-3 border border-amber-100/30">
                                    <p className="text-xs font-medium text-amber-700 flex items-center gap-1">
                                      💡 Travel Tips
                                    </p>
                                    <ul className="mt-1 space-y-1">
                                      {dest.travelTips.map((tip, i) => (
                                        <li
                                          key={i}
                                          className="text-sm text-slate-600 flex gap-2"
                                        >
                                          <span className="text-amber-500">
                                            ▸
                                          </span>
                                          <span>{tip}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              )}

              {/* Alternative Destinations */}
              {result.alternatives && result.alternatives.length > 0 && (
                <Card className="border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="border-b border-slate-200/60">
                    <div className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-purple-600" />
                      <h3 className="font-semibold text-slate-900">
                        Alternative Destinations
                      </h3>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {result.alternatives.map((dest, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className="border border-slate-200/60 rounded-xl p-4 hover:shadow-md hover:border-purple-200/60 transition-all"
                        >
                          <h4 className="font-medium text-slate-900">
                            {dest.name}
                          </h4>
                          <p className="text-sm text-slate-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {dest.country}
                          </p>
                          <p className="text-sm text-slate-600 mt-2">
                            {dest.reason}
                          </p>
                          <div className="flex gap-3 mt-2 text-xs text-slate-500">
                            <span>💰 {dest.estimatedBudget}</span>
                            <span>⏰ {dest.bestTimeToVisit}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              )}

              {/* General Travel Tips */}
              {result.generalTips && result.generalTips.length > 0 && (
                <Card className="border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="border-b border-slate-200/60">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">💡</span>
                      <h3 className="font-semibold text-slate-900">
                        General Travel Tips
                      </h3>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <ul className="space-y-2">
                      {result.generalTips.map((tip, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex gap-2 text-sm text-slate-700 p-2 rounded-lg hover:bg-slate-50/50 transition-colors"
                        >
                          <span className="text-emerald-600 font-bold">✦</span>
                          <span>{tip}</span>
                        </motion.li>
                      ))}
                    </ul>
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
