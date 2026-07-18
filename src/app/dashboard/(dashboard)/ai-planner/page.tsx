'use client';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Wand2, Copy, Download, Printer, RefreshCw, Save } from 'lucide-react';
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
  budget: z.preprocess((val) => (typeof val === 'string' ? Number(val) : val), z.number().positive('Budget must be positive')),
  numberOfDays: z.preprocess((val) => (typeof val === 'string' ? Number(val) : val), z.number().min(1, 'At least 1 day').max(30, 'Max 30 days')),
  travelStyle: z.string().min(1, 'Travel style required'),
  groupType: z.string().optional(),
  preferredSeason: z.string().optional(),
  interests: z.array(z.string()).min(1, 'At least one interest required'),
});

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
      destinationId: formData.destination,
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
      onError: (error) => {
        toast.error(error.message || 'Failed to save trip');
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
    pdf.text(`Budget: $${formData.budget} | Days: ${formData.numberOfDays}`, 20, yPosition);
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
      pdf.text(`Accommodation: $${result.budget.accommodation || 0}`, 25, yPosition);
      yPosition += 5;
      pdf.text(`Food: $${result.budget.food || 0}`, 25, yPosition);
      yPosition += 5;
      pdf.text(`Activities: $${result.budget.activities || 0}`, 25, yPosition);
      yPosition += 5;
      pdf.text(`Transportation: $${result.budget.transportation || 0}`, 25, yPosition);
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
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Wand2 className="text-blue-600" size={24} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">AI Trip Planner</h1>
        </div>
        <p className="text-slate-600">Let AI help you create the perfect travel itinerary</p>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Column */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-slate-900">Plan Your Trip</h2>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  label="Destination"
                  placeholder="e.g., Paris, France"
                  {...register('destination')}
                  error={errors.destination?.message}
                  disabled={isPending}
                />

                <Input
                  label="Budget (USD)"
                  type="number"
                  placeholder="e.g., 5000"
                  {...register('budget')}
                  error={errors.budget?.message}
                  disabled={isPending}
                />

                <Input
                  label="Number of Days"
                  type="number"
                  min="1"
                  max="30"
                  placeholder="e.g., 7"
                  {...register('numberOfDays')}
                  error={errors.numberOfDays?.message}
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
                  >
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

          <Card className="mt-6">
            <CardHeader>
              <h2 className="text-lg font-semibold text-slate-900">Tips</h2>
            </CardHeader>
            <CardBody>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Tell us your budget</li>
                <li>• Specify duration</li>
                <li>• Share your interests</li>
                <li>• Get custom itinerary</li>
                <li>• Save for later</li>
              </ul>
            </CardBody>
          </Card>
        </div>

        {/* Preview Column */}
        <div className="lg:col-span-2">
          {!result ? (
            <Card>
              <CardBody className="flex flex-col items-center justify-center py-16">
                <Wand2 className="w-12 h-12 text-slate-300 mb-4" />
                <p className="text-slate-500 text-center">
                  Fill in the form and click "Generate Plan" to see your personalized trip itinerary
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
                  onClick={handleSaveTrip}
                  isLoading={isSaving}
                  disabled={isSaving}
                  className="gap-2"
                >
                  <Save size={16} />
                  Save Trip
                </Button>
              </div>

              {/* Overview */}
              <Card>
                <CardHeader>
                  <h3 className="font-semibold text-slate-900">Trip Overview</h3>
                </CardHeader>
                <CardBody>
                  <p className="text-sm text-slate-700 leading-relaxed">{result.overview}</p>
                </CardBody>
              </Card>

              {/* Budget Breakdown */}
              {result.budget && (
                <Card>
                  <CardHeader>
                    <h3 className="font-semibold text-slate-900">Budget Breakdown</h3>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Accommodation:</span>
                        <span className="font-medium">${result.budget.accommodation || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Food:</span>
                        <span className="font-medium">${result.budget.food || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Activities:</span>
                        <span className="font-medium">${result.budget.activities || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Transportation:</span>
                        <span className="font-medium">${result.budget.transportation || 0}</span>
                      </div>
                      <div className="flex justify-between border-t border-slate-200 pt-2 mt-2">
                        <span className="font-semibold text-slate-900">Total:</span>
                        <span className="font-bold text-blue-600">${result.budget.total || 0}</span>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              )}

              {/* Itinerary */}
              {result.itinerary && result.itinerary.length > 0 && (
                <Card>
                  <CardHeader>
                    <h3 className="font-semibold text-slate-900">Day-wise Itinerary</h3>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-4">
                      {result.itinerary.map((day, index) => (
                        <div key={index} className="border-l-4 border-blue-400 pl-4">
                          <h4 className="font-medium text-slate-900">
                            Day {day.day || index + 1}: {day.title}
                          </h4>
                          {day.activities && day.activities.length > 0 && (
                            <ul className="mt-2 space-y-1 text-sm text-slate-600">
                              {day.activities.map((activity, i) => (
                                <li key={i}>• {activity}</li>
                              ))}
                            </ul>
                          )}
                          {day.meals && (
                            <p className="mt-1 text-sm text-slate-600">
                              <span className="font-medium">Meals:</span> {day.meals}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              )}

              {/* Hotels */}
              {result.hotels && result.hotels.length > 0 && (
                <Card>
                  <CardHeader>
                    <h3 className="font-semibold text-slate-900">Hotel Suggestions</h3>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-3">
                      {result.hotels.map((hotel, index) => (
                        <div key={index} className="border border-slate-200 rounded p-3">
                          <h4 className="font-medium text-slate-900">{hotel.name}</h4>
                          <p className="text-sm text-slate-600">{hotel.type}</p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-sm font-medium text-slate-700">
                              {hotel.pricePerNight}
                            </span>
                            <span className="text-sm text-yellow-600">★ {hotel.rating}/5</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              )}

              {/* Transportation */}
              {result.transportation && result.transportation.length > 0 && (
                <Card>
                  <CardHeader>
                    <h3 className="font-semibold text-slate-900">Transportation</h3>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-3">
                      {result.transportation.map((transport, index) => (
                        <div key={index} className="border-l-4 border-green-400 pl-4">
                          <h4 className="font-medium text-slate-900">{transport.type}</h4>
                          <p className="text-sm text-slate-600">{transport.details}</p>
                          <p className="text-sm font-medium text-slate-900 mt-1">
                            Cost: {transport.estimatedCost}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              )}

              {/* Food */}
              {result.food && result.food.length > 0 && (
                <Card>
                  <CardHeader>
                    <h3 className="font-semibold text-slate-900">Food Recommendations</h3>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-3">
                      {result.food.map((food, index) => (
                        <div key={index} className="border border-slate-200 rounded p-3">
                          <h4 className="font-medium text-slate-900">{food.restaurant}</h4>
                          <p className="text-sm text-slate-600">{food.cuisine}</p>
                          <p className="text-sm text-slate-600 mt-1">{food.recommendation}</p>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              )}

              {/* Activities */}
              {result.activities && result.activities.length > 0 && (
                <Card>
                  <CardHeader>
                    <h3 className="font-semibold text-slate-900">Activities</h3>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-3">
                      {result.activities.map((activity, index) => (
                        <div key={index} className="border-l-4 border-purple-400 pl-4">
                          <h4 className="font-medium text-slate-900">{activity.activity}</h4>
                          <p className="text-sm text-slate-600 mt-1">{activity.description}</p>
                          <p className="text-sm text-slate-600 mt-1">
                            <span className="font-medium">Best time:</span> {activity.bestTime}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              )}

              {/* Tips */}
              {result.tips && result.tips.length > 0 && (
                <Card>
                  <CardHeader>
                    <h3 className="font-semibold text-slate-900">Travel Tips</h3>
                  </CardHeader>
                  <CardBody>
                    <ul className="space-y-2">
                      {result.tips.map((tip, index) => (
                        <li key={index} className="flex gap-2 text-sm text-slate-700">
                          <span className="text-blue-600 font-bold">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardBody>
                </Card>
              )}

              {/* Packing List */}
              {result.packing && result.packing.length > 0 && (
                <Card>
                  <CardHeader>
                    <h3 className="font-semibold text-slate-900">Packing List</h3>
                  </CardHeader>
                  <CardBody>
                    <div className="grid grid-cols-2 gap-2">
                      {result.packing.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-slate-700">
                          <input type="checkbox" className="w-4 h-4 rounded" />
                          <span>{item}</span>
                        </div>
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
