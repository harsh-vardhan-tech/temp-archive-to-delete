import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ProgressBar from './ProgressBar';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import SuccessView from './SuccessView';
import {
  masterRegistrationSchema,
  stepOneSchema,
  stepTwoSchema,
  defaultFormValues,
} from '../schemas/wizardSchema';
import { Wand2, Layers, Cpu, Code2, ShieldCheck } from 'lucide-react';

export default function RegistrationWizard() {
  // Step Navigation State (Step 1, Step 2, Step 3, Step 4 = Success)
  const [step, setStep] = useState(1);
  const [submittedData, setSubmittedData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Master Form State lifted to Parent (Phase 3 Enterprise Architecture)
  // mode: 'onChange' triggers real-time validation on every keystroke
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(masterRegistrationSchema),
    defaultValues: defaultFormValues,
    mode: 'onChange',
  });

  // Watch full form values to pass to Step 3 Review & summary
  const currentFormData = watch();

  // Navigation Logic: Next Handler with per-step schema validation
  const handleNext = async () => {
    let isValid = false;

    if (step === 1) {
      // Trigger validation exclusively for Step 1 fields
      isValid = await trigger(['firstName', 'lastName', 'dob']);
    } else if (step === 2) {
      // Trigger validation exclusively for Step 2 fields
      isValid = await trigger(['email', 'password', 'confirmPassword']);
    }

    if (isValid) {
      setStep((prev) => Math.min(prev + 1, 3));
    }
  };

  // Navigation Logic: Back Handler (Preserves state in Parent)
  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  // Direct Jump for Step 3 Review "Edit" buttons
  const handleEditStep = (targetStep) => {
    setStep(targetStep);
  };

  // Final Submission Handler (Mandatory P0 & P3 Requirement)
  const onFinalSubmit = async (data) => {
    setIsSubmitting(true);

    // Simulate enterprise payload packaging
    setTimeout(() => {
      // Mandatory Deliverable: console.log() the finalized data object
      console.log('====================================================');
      console.log('🚀 FINALIZED REGISTRATION PAYLOAD (Sprint 7 MVP):');
      console.log(JSON.stringify(data, null, 2));
      console.log('Raw Payload Object:', data);
      console.log('====================================================');

      setSubmittedData(data);
      setIsSubmitting(false);
      setStep(4); // Trigger "Success" UI state
    }, 600);
  };

  // Reset Wizard to Initial State
  const handleReset = () => {
    reset(defaultFormValues);
    setSubmittedData(null);
    setStep(1);
  };

  // Demo Fast-Fill Utility (Ideal for 3-minute QA video recording)
  const handleFastFill = () => {
    setValue('firstName', 'Alex', { shouldValidate: true });
    setValue('lastName', 'Mercer', { shouldValidate: true });
    setValue('dob', '1998-05-14', { shouldValidate: true });
    setValue('email', 'alex.mercer@fintech-enterprise.io', { shouldValidate: true });
    setValue('password', 'SecurePass!2026', { shouldValidate: true });
    setValue('confirmPassword', 'SecurePass!2026', { shouldValidate: true });
    setValue('acceptTerms', true, { shouldValidate: true });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Enterprise Card Container */}
      <div className="relative rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl">
        {/* Subtle background glow effect */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-indigo-600/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-purple-600/15 blur-3xl" />

        {/* Top Header / Progress Indicator (Active during Steps 1-3) */}
        {step <= 3 && (
          <div className="mb-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                  <Wand2 className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="text-base font-bold text-white tracking-tight">
                    Registration Wizard
                  </h1>
                  <p className="text-xs text-slate-400">
                    SaaS Onboarding & Client Acquisition
                  </p>
                </div>
              </div>

              {/* Fast-Fill Demo Button */}
              <button
                type="button"
                onClick={handleFastFill}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-2.5 py-1.5 text-[11px] font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
                title="Populate valid demo data for quick QA testing"
              >
                <Cpu className="h-3.5 w-3.5 text-indigo-400" />
                <span>Fill Demo Data</span>
              </button>
            </div>

            {/* Dynamic Progress Indicator */}
            <ProgressBar
              currentStep={step}
              totalSteps={3}
              onStepClick={handleEditStep}
            />
          </div>
        )}

        {/* Form Body - Unified Form Wrapper with Conditional Step Rendering */}
        <form onSubmit={handleSubmit(onFinalSubmit)} noValidate>
          {/* Step 1: Personal Info */}
          {step === 1 && (
            <StepOne
              register={register}
              errors={errors}
              watch={watch}
              onNext={handleNext}
              isFirstStep={true}
            />
          )}

          {/* Step 2: Account Details */}
          {step === 2 && (
            <StepTwo
              register={register}
              errors={errors}
              watch={watch}
              trigger={trigger}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {/* Step 3: Review & Submit */}
          {step === 3 && (
            <StepThree
              formData={currentFormData}
              onBack={handleBack}
              onSubmit={handleSubmit(onFinalSubmit)}
              onEditStep={handleEditStep}
              register={register}
              errors={errors}
              isSubmitting={isSubmitting}
            />
          )}

          {/* Step 4: Success View (Post-Submission) */}
          {step === 4 && (
            <SuccessView
              payload={submittedData}
              onReset={handleReset}
            />
          )}
        </form>
      </div>

      {/* Architecture Highlights Footer */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <Layers className="h-3.5 w-3.5 text-indigo-400" />
          <span>React Hook Form State Lifting</span>
        </span>
        <span>•</span>
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-purple-400" />
          <span>Zod Schema Validation</span>
        </span>
        <span>•</span>
        <span className="flex items-center gap-1.5">
          <Code2 className="h-3.5 w-3.5 text-emerald-400" />
          <span>Real-time Regex Guardrails</span>
        </span>
      </div>
    </div>
  );
}
