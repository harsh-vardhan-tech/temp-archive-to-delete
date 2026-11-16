import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Calendar, 
  Lock, 
  ArrowLeft, 
  CheckCircle2, 
  Edit3, 
  ShieldCheck, 
  FileText,
  AlertCircle
} from 'lucide-react';

export default function StepThree({
  formData,
  onBack,
  onSubmit,
  onEditStep,
  register,
  errors,
  isSubmitting = false,
}) {
  const [showPasswordMask, setShowPasswordMask] = useState(false);

  // Format the date of birth cleanly without timezone shift issues
  const formatDobDisplay = (dobString) => {
    if (!dobString) return 'Not provided';
    const parts = dobString.split('-').map(Number);
    if (parts.length !== 3 || parts.some(isNaN)) return dobString;
    const date = new Date(parts[0], parts[1] - 1, parts[2]);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formattedDob = formatDobDisplay(formData.dob);

  // Calculate age accurately
  const calculateAge = (dobString) => {
    if (!dobString) return null;
    const parts = dobString.split('-').map(Number);
    if (parts.length !== 3 || parts.some(isNaN)) return null;
    const birthDate = new Date(parts[0], parts[1] - 1, parts[2]);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const applicantAge = calculateAge(formData.dob);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      {/* View Header */}
      <div className="text-left border-b border-slate-800/80 pb-4">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-2">
          <FileText className="h-3.5 w-3.5" />
          <span>Step 3: Verification & Review</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Review & Finalize
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Confirm your data payload before submitting to the client-side compilation engine.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="space-y-4 text-left">
        {/* Section 1: Personal Info Card */}
        <div className="rounded-2xl border border-slate-800/90 bg-slate-900/60 p-4 backdrop-blur-md transition-all hover:border-slate-700">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                <User className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-semibold text-slate-200">
                Personal Profile
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onEditStep(1)}
              className="inline-flex items-center gap-1 text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
            >
              <Edit3 className="h-3 w-3" />
              <span>Edit</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 text-sm">
            <div>
              <p className="text-xs text-slate-400">Full Name</p>
              <p className="font-semibold text-slate-100">
                {formData.firstName} {formData.lastName}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Date of Birth</p>
              <p className="font-semibold text-slate-100">
                {formattedDob} {applicantAge ? `(${applicantAge} years old)` : ''}
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Account Details Card */}
        <div className="rounded-2xl border border-slate-800/90 bg-slate-900/60 p-4 backdrop-blur-md transition-all hover:border-slate-700">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-semibold text-slate-200">
                Authentication & Security
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onEditStep(2)}
              className="inline-flex items-center gap-1 text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors cursor-pointer"
            >
              <Edit3 className="h-3 w-3" />
              <span>Edit</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 text-sm">
            <div>
              <p className="text-xs text-slate-400">Account Email</p>
              <p className="font-semibold text-slate-100 font-mono text-xs sm:text-sm truncate">
                {formData.email}
              </p>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400">Password</p>
                <button
                  type="button"
                  onClick={() => setShowPasswordMask((prev) => !prev)}
                  className="text-[11px] text-indigo-400 hover:underline cursor-pointer"
                >
                  {showPasswordMask ? 'Mask' : 'Reveal'}
                </button>
              </div>
              <p className="font-mono text-xs sm:text-sm font-medium text-slate-200">
                {showPasswordMask
                  ? formData.password
                  : '•'.repeat(Math.max(formData.password?.length || 8, 8))}
              </p>
            </div>
          </div>
        </div>

        {/* Terms and Conditions Confirmation Checkbox */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              id="acceptTerms"
              {...(register ? register('acceptTerms') : {})}
              className="mt-1 h-4 w-4 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900"
            />
            <div className="text-xs text-slate-300 leading-relaxed">
              <span className="font-semibold text-white">
                Declaration & Consent:
              </span>{' '}
              I certify that all details submitted above are true and complete. I authorize the enterprise verification protocol to process this payload in compliance with SaaS onboarding data regulations.
            </div>
          </label>

          {errors?.acceptTerms && (
            <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-rose-400">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{errors.acceptTerms.message}</span>
            </p>
          )}
        </div>
      </div>

      {/* Navigation Triggers */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/60 px-5 py-3 text-sm font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-all cursor-pointer active:scale-98"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Account</span>
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-emerald-500 to-teal-500 px-7 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/25 transition-all hover:from-emerald-400 hover:to-teal-400 cursor-pointer active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="h-4 w-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              <span>Compiling Payload...</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="h-4 w-4" />
              <span>Submit Registration</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
