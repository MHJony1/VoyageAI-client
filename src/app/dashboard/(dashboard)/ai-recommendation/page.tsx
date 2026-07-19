'use client';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Compass, Copy, Download, Printer, RefreshCw, Save } from 'lucide-react';
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
    z.number().positive('Budget must be positive')
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
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
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
  const { mutate: generateRecommendation, isPending } = useGenerateRecommendation();
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
    if (!result || !result.destinations || result.destinations.length === 0) return;

    const destination = result.destinations[0];
    const formData = watch();
    const estimatedCostNum = typeof destination.estimatedBudget === 'string'
      ? parseInt(destination.estimatedBudget.replace(/[^0-9]/g, ''), 10) || Number(formData.budget)
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
          error?.response?.data?.message || error?.message || 'Failed to save recommendation'
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
    pdf.text(`Budget: $${formData.budget} | Travel Style: ${formData.travelStyle}`, 20, yPosition);
    yPosition += 8;

    // Main Recommendations
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
        pdf.text(`Suggested Duration: ${dest.suggestedDuration}`, 25, yPosition);
        yPosition += 6;
      });

      yPosition += 4;
    }

    // Alternative Destinations
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

    // General Tips
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
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <Compass className="text-green-600" size={24} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">AI Recommendations</h1>
        </div>
        <p className="text-slate-600">Discover destinations tailored to your preferences</p>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Column */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-slate-900">Find Destinations</h2>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  label="Budget (USD)"
                  type="number"
                  placeholder="e.g., 5000"
                  {...register('budget')}
                  error={errors.budget?.message}
                  disabled={isPending}
                />

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
                  >
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

          <Card className="mt-6">
            <CardHeader>
              <h2 className="text-lg font-semibold text-slate-900">Tips</h2>
            </CardHeader>
            <CardBody>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Set your budget</li>
                <li>• Choose preferred season</li>
                <li>• Select travel style</li>
                <li>• Pick group type</li>
                <li>• Add your interests</li>
              </ul>
            </CardBody>
          </Card>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-2">
          {!result ? (
            <Card>
              <CardBody className="flex flex-col items-center justify-center py-16">
                <Compass className="w-12 h-12 text-slate-300 mb-4" />
                <p className="text-slate-500 text-center">
                  Fill in your preferences and click "Get Recommendations" to discover perfect destinations for you
                </p>
              </CardBody>
            </Card>
          ) : (
            <div className="space-y-4">
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopy}
                  className="gap-2"
                >
                  <Copy size={16} />
                  Copy
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handlePrint}
                  className="gap-2"
                >
                  <Printer size={16} />
                  Print
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleDownloadPDF}
                  className="gap-2"
                >
                  <Download size={16} />
                  PDF
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setResult(null)}
                  className="gap-2"
                >
                  <RefreshCw size={16} />
                  Regenerate
                </Button>
                <Button
                  size="sm"
                  onClick={handleSaveRecommendation}
                  isLoading={isSaving}
                  disabled={isSaving}
                  className="gap-2"
                >
                  <Save size={16} />
                  Save
                </Button>
              </div>

              {/* Recommended Destinations */}
              {result.destinations && result.destinations.length > 0 && (
                <Card>
                  <CardHeader>
                    <h3 className="font-semibold text-slate-900">Recommended Destinations</h3>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-4">
                      {result.destinations.map((dest, index) => (
                        <div
                          key={index}
                          className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <h4 className="font-semibold text-slate-900">
                            {index + 1}. {dest.name}, {dest.country}
                          </h4>
                          <p className="text-sm text-slate-600 mt-2">{dest.reason}</p>

                          <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
                            <div>
                              <span className="font-medium text-slate-700">Budget:</span>
                              <p className="text-slate-600">{dest.estimatedBudget}</p>
                            </div>
                            <div>
                              <span className="font-medium text-slate-700">Best Time:</span>
                              <p className="text-slate-600">{dest.bestTimeToVisit}</p>
                            </div>
                          </div>

                          <div className="mt-3">
                            <span className="font-medium text-slate-700 text-sm">Duration:</span>
                            <p className="text-slate-600 text-sm">{dest.suggestedDuration}</p>
                          </div>

                          {dest.mustVisitAttractions && dest.mustVisitAttractions.length > 0 && (
                            <div className="mt-3">
                              <span className="font-medium text-slate-700 text-sm">Must Visit Attractions:</span>
                              <ul className="mt-1 space-y-1">
                                {dest.mustVisitAttractions.map((attraction, i) => (
                                  <li key={i} className="text-sm text-slate-600 flex gap-2">
                                    <span className="text-green-600">•</span>
                                    <span>{attraction}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {dest.travelTips && dest.travelTips.length > 0 && (
                            <div className="mt-3">
                              <span className="font-medium text-slate-700 text-sm">Travel Tips:</span>
                              <ul className="mt-1 space-y-1">
                                {dest.travelTips.map((tip, i) => (
                                  <li key={i} className="text-sm text-slate-600 flex gap-2">
                                    <span className="text-blue-600">•</span>
                                    <span>{tip}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              )}

              {/* Alternative Destinations */}
              {result.alternatives && result.alternatives.length > 0 && (
                <Card>
                  <CardHeader>
                    <h3 className="font-semibold text-slate-900">Alternative Destinations</h3>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-3">
                      {result.alternatives.map((dest, index) => (
                        <div key={index} className="border-l-4 border-green-400 pl-4">
                          <h4 className="font-medium text-slate-900">
                            {dest.name}, {dest.country}
                          </h4>
                          <p className="text-sm text-slate-600 mt-1">{dest.reason}</p>
                          <div className="flex gap-6 mt-2 text-sm">
                            <div>
                              <span className="font-medium text-slate-700">Budget:</span>
                              <p className="text-slate-600">{dest.estimatedBudget}</p>
                            </div>
                            <div>
                              <span className="font-medium text-slate-700">Best Time:</span>
                              <p className="text-slate-600">{dest.bestTimeToVisit}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              )}

              {/* General Travel Tips */}
              {result.generalTips && result.generalTips.length > 0 && (
                <Card>
                  <CardHeader>
                    <h3 className="font-semibold text-slate-900">General Travel Tips</h3>
                  </CardHeader>
                  <CardBody>
                    <ul className="space-y-2">
                      {result.generalTips.map((tip, index) => (
                        <li key={index} className="flex gap-2 text-sm text-slate-700">
                          <span className="text-green-600 font-bold">•</span>
                          <span>{tip}</span>
                        </li>
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
