import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { QuizStep } from "@/components/QuizStep";
import { Card, CardContent } from "@/components/ui/card";
import { useCreateLead, useTrackActivity } from "@/hooks/useLeads";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

const FindHome = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [quizData, setQuizData] = useState({
    budget: "",
    location: [],
    propertyType: "",
    timeline: "",
    purpose: "",
    contact: { name: "", email: "", phone: "" },
  });
  const navigate = useNavigate();
  const createLead = useCreateLead();
  const trackActivity = useTrackActivity();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const quizSteps = [
    {
      title: "What's Your Budget Range?",
      description: "Select your comfortable price range",
      type: "radio" as const,
      field: "budget",
      options: [
        { value: "50L-75L", label: "₹50L - ₹75L", points: 1 },
        { value: "75L-1Cr", label: "₹75L - ₹1Cr", points: 1 },
        { value: "1Cr-1.5Cr", label: "₹1Cr - ₹1.5Cr", points: 1 },
        { value: "1.5Cr-2Cr", label: "₹1.5Cr - ₹2Cr", points: 1 },
        { value: "2Cr+", label: "₹2Cr+", points: 1 },
      ],
    },
    {
      title: "Preferred Locations",
      description: "Select one or more areas you're interested in",
      type: "checkbox" as const,
      field: "location",
      options: [
        { value: "Kharadi", label: "Kharadi", points: 0 },
        { value: "Hinjewadi", label: "Hinjewadi", points: 0 },
        { value: "Wakad", label: "Wakad", points: 0 },
        { value: "Baner", label: "Baner", points: 0 },
        { value: "Viman Nagar", label: "Viman Nagar", points: 0 },
      ],
    },
    {
      title: "Property Type",
      description: "What type of property are you looking for?",
      type: "radio" as const,
      field: "propertyType",
      options: [
        { value: "apartment", label: "Apartment", points: 0 },
        { value: "villa", label: "Villa", points: 0 },
        { value: "townhouse", label: "Townhouse", points: 0 },
        { value: "commercial", label: "Commercial", points: 0 },
      ],
    },
    {
      title: "When Are You Planning to Buy?",
      description: "This helps us prioritize your search",
      type: "radio" as const,
      field: "timeline",
      options: [
        { value: "0-3months", label: "Within 3 months", points: 2 },
        { value: "3-6months", label: "3-6 months", points: 1 },
        { value: "6-12months", label: "6-12 months", points: 1 },
        { value: "12months+", label: "Just exploring", points: 0 },
      ],
    },
    {
      title: "Purpose of Purchase",
      description: "What will you use this property for?",
      type: "radio" as const,
      field: "purpose",
      options: [
        { value: "residential", label: "Self-residence", points: 0 },
        { value: "investment", label: "Investment", points: 0 },
        { value: "rental", label: "Rental income", points: 0 },
      ],
    },
    {
      title: "Your Contact Information",
      description: "We'll use this to send you personalized matches",
      type: "contact" as const,
      field: "contact",
    },
  ];

  const handleNext = async () => {
    if (currentStep < quizSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      await handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Calculate initial score
      let initialScore = 1; // Base quiz completion
      const budgetStep = quizSteps[0].options?.find(o => o.value === quizData.budget);
      const timelineStep = quizSteps[3].options?.find(o => o.value === quizData.timeline);
      
      if (budgetStep) initialScore += budgetStep.points || 0;
      if (timelineStep) initialScore += timelineStep.points || 0;

      // Parse budget for min/max
      let budgetMin = null;
      let budgetMax = null;
      if (quizData.budget) {
        const budgetMatch = quizData.budget.match(/(\d+(?:\.\d+)?)([LCr]+)-(\d+(?:\.\d+)?)([LCr]+)?/);
        if (budgetMatch) {
          const [, min, minUnit, max, maxUnit] = budgetMatch;
          budgetMin = parseFloat(min) * (minUnit.includes('Cr') ? 10000000 : 100000);
          budgetMax = max ? parseFloat(max) * ((maxUnit || minUnit).includes('Cr') ? 10000000 : 100000) : null;
        } else if (quizData.budget.includes('+')) {
          const match = quizData.budget.match(/(\d+(?:\.\d+)?)([LCr]+)/);
          if (match) {
            const [, min, unit] = match;
            budgetMin = parseFloat(min) * (unit.includes('Cr') ? 10000000 : 100000);
          }
        }
      }

      // Create lead
      const lead = await createLead.mutateAsync({
        name: quizData.contact.name,
        email: quizData.contact.email || null,
        phone: quizData.contact.phone || null,
        source: "quiz",
        status: "new",
        score: initialScore,
        budget_min: budgetMin,
        budget_max: budgetMax,
        location_preference: Array.isArray(quizData.location) ? quizData.location.join(", ") : quizData.location,
        property_type: quizData.propertyType,
        timeline: quizData.timeline,
        purpose: quizData.purpose,
      });

      // Track quiz submission
      await trackActivity.mutateAsync({
        lead_id: lead.id,
        type: "quiz_submit",
        points: 1,
        metadata: quizData,
      });

      toast({
        title: "Quiz Completed!",
        description: "Redirecting you to matched properties...",
      });

      // Redirect to projects page with filters
      setTimeout(() => {
        navigate("/projects");
      }, 1500);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast({
        title: "Error",
        description: "Failed to submit quiz. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentStepConfig = quizSteps[currentStep];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-20">
        <div
          className="relative h-80 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBanner})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50" />
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">
                Find Your Perfect Home
              </h1>
              <p className="text-xl text-white/90">
                Answer a few questions to discover properties that match your needs
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          {isSubmitting ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p className="text-lg text-muted-foreground">Processing your preferences...</p>
              </CardContent>
            </Card>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    {/* Progress */}
                    <div className="mb-6">
                      <div className="flex justify-between text-sm text-muted-foreground mb-2">
                        <span>Step {currentStep + 1} of {quizSteps.length}</span>
                        <span>{Math.round(((currentStep + 1) / quizSteps.length) * 100)}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-300"
                          style={{ width: `${((currentStep + 1) / quizSteps.length) * 100}%` }}
                        />
                      </div>
                    </div>

                    <QuizStep
                      title={currentStepConfig.title}
                      description={currentStepConfig.description}
                      type={currentStepConfig.type}
                      options={currentStepConfig.options}
                      value={quizData[currentStepConfig.field as keyof typeof quizData]}
                      onChange={(value) => setQuizData({ ...quizData, [currentStepConfig.field]: value })}
                      onNext={handleNext}
                      onBack={handleBack}
                      isFirst={currentStep === 0}
                      isLast={currentStep === quizSteps.length - 1}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FindHome;
