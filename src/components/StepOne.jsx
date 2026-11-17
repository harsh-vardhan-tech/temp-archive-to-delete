import React, { useMemo } from 'react';
import { User, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import FormField from './FormField';
import { stepOneSchema } from '../schemas/wizardSchema';

export default function StepOne({
  register,
  errors,
  watch,
  onNext,
}) {
  const firstName = watch('firstName') || '';
  const lastName = watch('lastName') || '';
  const dob = watch('dob') || '';

  const isStepValid = useMemo(() => {
    const result = stepOneSchema.safeParse({ firstName, lastName, dob });
    return result.success;
  }, [firstName, lastName, dob]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="text-left border-b border-slate-800/80 pb-4">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold mb-2">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Step 1: Personal Info</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Personal Information
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Enter your name and date of birth.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            id="firstName"
            name="firstName"
            label="First Name"
            placeholder="e.g. Alex"
            icon={User}
            register={register}
            error={errors.firstName}
            isValid={firstName.length >= 2 && !errors.firstName}
            helperText="Min. 2 characters"
          />

          <FormField
            id="lastName"
            name="lastName"
            label="Last Name"
            placeholder="e.g. Mercer"
            icon={User}
            register={register}
            error={errors.lastName}
            isValid={lastName.length >= 2 && !errors.lastName}
            helperText="Min. 2 characters"
          />
        </div>

        <FormField
          id="dob"
          name="dob"
          type="date"
          label="Date of Birth"
          icon={Calendar}
          register={register}
          error={errors.dob}
          isValid={Boolean(dob && !errors.dob)}
          helperText="Must be at least 18 years old"
        />
      </div>

      <div className="flex items-center justify-end pt-4 border-t border-slate-800/80">
        <button
          type="button"
          onClick={onNext}
          disabled={!isStepValid}
          className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-sm transition-all duration-200 ${
            isStepValid
              ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 cursor-pointer active:scale-98'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'
          }`}
        >
          <span>Continue to Account</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
