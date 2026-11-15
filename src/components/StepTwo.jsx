import React, { useState, useMemo } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';
import FormField from './FormField';
import PasswordStrength from './PasswordStrength';
import { stepTwoSchema } from '../schemas/wizardSchema';

export default function StepTwo({
  register,
  errors,
  watch,
  onNext,
  onBack,
}) {
  // UX State: Show/Hide Password toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Watch fields in real-time
  const email = watch('email') || '';
  const password = watch('password') || '';
  const confirmPassword = watch('confirmPassword') || '';

  // Synchronous real-time validation for conditional button disabling
  const isStepValid = useMemo(() => {
    const result = stepTwoSchema.safeParse({
      email,
      password,
      confirmPassword,
    });
    return result.success;
  }, [email, password, confirmPassword]);

  // Derived match state for visual feedback
  const passwordsMatch = Boolean(
    password &&
    confirmPassword &&
    password === confirmPassword &&
    password.length >= 8
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      {/* View Header */}
      <div className="text-left border-b border-slate-800/80 pb-4">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-semibold mb-2">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Step 2: Security & Credentials</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Account Details
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Establish your enterprise authentication credentials with rigorous security standards.
        </p>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        {/* Email Field with real-time error check */}
        <FormField
          id="email"
          name="email"
          type="email"
          label="Corporate Email Address"
          placeholder="name@company.com"
          icon={Mail}
          register={register}
          error={errors.email}
          isValid={Boolean(email.includes('@') && !errors.email && email.length >= 5)}
          helperText="Requires '@' and valid domain"
        />

        {/* Primary Password with Show/Hide toggle */}
        <div className="space-y-2">
          <FormField
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            label="Master Password"
            placeholder="Enter minimum 8 characters"
            icon={Lock}
            register={register}
            error={errors.password}
            isValid={Boolean(password.length >= 8 && !errors.password)}
            helperText="Minimum 8 characters"
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-slate-400 hover:text-slate-200 focus:outline-hidden p-1 transition-colors cursor-pointer"
                title={showPassword ? 'Hide password' : 'Show password'}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            }
          />

          {/* Real-time Password Strength and Criteria breakdown */}
          <PasswordStrength password={password} />
        </div>

        {/* Confirm Password with Show/Hide toggle */}
        <FormField
          id="confirmPassword"
          name="confirmPassword"
          type={showConfirmPassword ? 'text' : 'password'}
          label="Confirm Master Password"
          placeholder="Re-enter master password"
          icon={Lock}
          register={register}
          error={errors.confirmPassword}
          isValid={passwordsMatch}
          helperText="Must match master password"
          rightElement={
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="text-slate-400 hover:text-slate-200 focus:outline-hidden p-1 transition-colors cursor-pointer"
              title={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
              aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          }
        />
      </div>

      {/* Navigation Triggers */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/60 px-5 py-3 text-sm font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-all cursor-pointer active:scale-98"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Personal</span>
        </button>

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
          <span>Review Submission</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
