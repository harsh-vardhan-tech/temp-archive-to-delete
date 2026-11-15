import React from 'react';
import { Check, X } from 'lucide-react';

export default function PasswordStrength({ password = '' }) {
  const criteria = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'One uppercase letter (A-Z)', met: /[A-Z]/.test(password) },
    { label: 'One lowercase letter (a-z)', met: /[a-z]/.test(password) },
    { label: 'One number (0-9)', met: /[0-9]/.test(password) },
    { label: 'One special symbol (!@#$%^&*)', met: /[^A-Za-z0-9]/.test(password) },
  ];

  const metCount = criteria.filter((c) => c.met).length;

  const getStrengthMeta = () => {
    if (metCount === 0) return { label: 'Enter password', color: 'bg-slate-700', text: 'text-slate-400' };
    if (metCount <= 2) return { label: 'Weak', color: 'bg-rose-500', text: 'text-rose-400' };
    if (metCount <= 3) return { label: 'Fair', color: 'bg-amber-500', text: 'text-amber-400' };
    if (metCount <= 4) return { label: 'Good', color: 'bg-blue-500', text: 'text-blue-400' };
    return { label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-400' };
  };

  const strength = getStrengthMeta();

  if (!password) return null;

  return (
    <div className="space-y-2.5 rounded-xl border border-slate-800/80 bg-slate-900/40 p-3.5 backdrop-blur-xs text-left animate-in fade-in slide-in-from-top-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-400 font-medium">Password Strength:</span>
        <span className={`font-semibold ${strength.text}`}>{strength.label}</span>
      </div>

      {/* Segmented Strength Bar */}
      <div className="grid grid-cols-5 gap-1.5 h-1.5">
        {[1, 2, 3, 4, 5].map((index) => (
          <div
            key={index}
            className={`h-full rounded-full transition-all duration-300 ${
              index <= metCount ? strength.color : 'bg-slate-800'
            }`}
          />
        ))}
      </div>

      {/* Criteria Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
        {criteria.map((item, idx) => (
          <div key={idx} className="flex items-center gap-1.5 text-xs">
            {item.met ? (
              <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            ) : (
              <X className="h-3.5 w-3.5 text-slate-500 shrink-0" />
            )}
            <span className={item.met ? 'text-slate-300' : 'text-slate-500'}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
