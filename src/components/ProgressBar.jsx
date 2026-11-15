import React from 'react';
import { User, ShieldCheck, FileCheck2, Check } from 'lucide-react';

export default function ProgressBar({ currentStep, totalSteps = 3, onStepClick }) {
  const steps = [
    { number: 1, title: 'Personal Info', subtitle: 'Name & Birthdate', icon: User },
    { number: 2, title: 'Account Details', subtitle: 'Email & Security', icon: ShieldCheck },
    { number: 3, title: 'Review & Submit', subtitle: 'Confirm & Finalize', icon: FileCheck2 },
  ];

  // Calculate percentage: Step 1 = 33%, Step 2 = 66%, Step 3 = 100%
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full space-y-4">
      {/* Top Meta info */}
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400">
        <span className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
          <span>Step {currentStep} of {totalSteps}</span>
        </span>
        <span className="text-indigo-400 font-mono text-sm">{progressPercent}% Completed</span>
      </div>

      {/* Visual Progress Bar */}
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-800/80">
        <div
          className="h-full rounded-full bg-linear-to-r from-indigo-500 via-purple-500 to-emerald-400 transition-all duration-500 ease-out shadow-lg shadow-indigo-500/50"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Step Indicators / Breadcrumbs */}
      <div className="grid grid-cols-3 gap-2 pt-2">
        {steps.map((step) => {
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;
          const isClickable = step.number < currentStep && onStepClick;
          const Icon = step.icon;

          return (
            <button
              key={step.number}
              type="button"
              disabled={!isClickable}
              onClick={() => isClickable && onStepClick(step.number)}
              className={`group flex items-center gap-2.5 rounded-xl border p-2.5 text-left transition-all duration-200 ${
                isCurrent
                  ? 'border-indigo-500/80 bg-indigo-950/30 text-white shadow-md shadow-indigo-500/10'
                  : isCompleted
                  ? 'border-emerald-500/40 bg-emerald-950/20 text-slate-300 hover:border-emerald-400/60 cursor-pointer'
                  : 'border-slate-800 bg-slate-900/40 text-slate-500 cursor-not-allowed opacity-60'
              }`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-bold text-xs transition-colors ${
                  isCurrent
                    ? 'bg-indigo-600 text-white ring-2 ring-indigo-400/50'
                    : isCompleted
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
              </div>

              <div className="hidden sm:block overflow-hidden">
                <p className={`text-xs font-semibold truncate ${isCurrent ? 'text-indigo-200' : 'text-slate-200'}`}>
                  {step.title}
                </p>
                <p className="text-[10px] text-slate-400 truncate">
                  {step.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
