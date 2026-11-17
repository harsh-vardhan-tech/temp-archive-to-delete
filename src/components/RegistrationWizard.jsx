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
  defaultFormValues,
} from '../schemas/wizardSchema';
import { Wand2, Layers, Cpu, Code2, ShieldCheck } from 'lucide-react';

export default function RegistrationWizard() {
  const [step, setStep] = useState(1);
  const [submittedData, setSubmittedData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const currentFormData = watch();

  const handleNext = async () => {
    let isValid = false;

    if (step === 1) {
      isValid = await trigger(['firstName', 'lastName', 'dob']);
    } else if (step === 2) {
      isValid = await trigger(['email', 'password', 'confirmPassword']);
    }

    if (isValid) {
      setStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleEditStep = (targetStep) => {
    setStep(targetStep);
  };

  const onFinalSubmit = async (data) => {
    setIsSubmitting(true);

    setTimeout(() => {
      console.log('Final Registration Data:', data);
      setSubmittedData(data);
      setIsSubmitting(false);
      setStep(4);
    }, 500);
  };

  const handleReset = () => {
    reset(defaultFormValues);
    setSubmittedData(null);
    setStep(1);
  };

  const handleFastFill = () => {
    setValue('firstName', 'Alex', { shouldValidate: true });
    setValue('lastName', 'Mercer', { shouldValidate: true });
    setValue('dob', '1998-05-14', { shouldValidate: true });
    setValue('email', 'alex.mercer@gmail.com', { shouldValidate: true });
    setValue('password', 'Pass123456', { shouldValidate: true });
    setValue('confirmPassword', 'Pass123456', { shouldValidate: true });
    setValue('acceptTerms', true, { shouldValidate: true });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl">
        <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-indigo-600/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-purple-600/15 blur-3xl" />

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
                    User Onboarding Flow
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleFastFill}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-2.5 py-1.5 text-[11px] font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
              >
                <Cpu className="h-3.5 w-3.5 text-indigo-400" />
                <span>Fill Demo Data</span>
              </button>
            </div>

            <ProgressBar
              currentStep={step}
              totalSteps={3}
              onStepClick={handleEditStep}
            />
          </div>
        )}

        <form onSubmit={handleSubmit(onFinalSubmit)} noValidate>
          {step === 1 && (
            <StepOne
              register={register}
              errors={errors}
              watch={watch}
              onNext={handleNext}
              isFirstStep={true}
            />
          )}

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

          {step === 4 && (
            <SuccessView
              payload={submittedData}
              onReset={handleReset}
            />
          )}
        </form>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <Layers className="h-3.5 w-3.5 text-indigo-400" />
          <span>React Hook Form</span>
        </span>
        <span>•</span>
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-purple-400" />
          <span>Zod Validation</span>
        </span>
        <span>•</span>
        <span className="flex items-center gap-1.5">
          <Code2 className="h-3.5 w-3.5 text-emerald-400" />
          <span>State Lifting</span>
        </span>
      </div>
    </div>
  );
}
