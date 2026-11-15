import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export default function FormField({
  label,
  id,
  type = 'text',
  placeholder,
  register,
  name,
  error,
  isValid,
  helperText,
  icon: Icon,
  rightElement,
  disabled = false,
  ...rest
}) {
  const hasError = Boolean(error);
  const showValid = Boolean(isValid && !hasError);

  return (
    <div className="space-y-1.5 text-left">
      <div className="flex items-center justify-between">
        <label
          htmlFor={id || name}
          className="block text-sm font-semibold tracking-wide text-slate-200"
        >
          {label}
        </label>
        {helperText && !hasError && (
          <span className="text-xs text-slate-400">{helperText}</span>
        )}
      </div>

      <div className="relative rounded-xl shadow-xs transition-all duration-200">
        {Icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
            <Icon className="h-5 w-5" />
          </div>
        )}

        <input
          id={id || name}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          {...(register ? register(name) : {})}
          aria-invalid={hasError ? 'true' : 'false'}
          className={`w-full rounded-xl border bg-slate-900/80 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 backdrop-blur-md transition-all duration-200 focus:outline-hidden ${
            Icon ? 'pl-11' : ''
          } ${rightElement || hasError || showValid ? 'pr-11' : ''} ${
            hasError
              ? 'border-rose-500/80 bg-rose-950/20 text-rose-100 focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20'
              : showValid
              ? 'border-emerald-500/60 bg-emerald-950/10 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20'
              : 'border-slate-700/80 hover:border-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/25'
          }`}
          {...rest}
        />

        {/* Right action element (e.g. eye toggle) */}
        {rightElement ? (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {rightElement}
          </div>
        ) : hasError ? (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-rose-400">
            <AlertCircle className="h-5 w-5" />
          </div>
        ) : showValid ? (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-emerald-400">
            <CheckCircle2 className="h-5 w-5" />
          </div>
        ) : null}
      </div>

      {/* Real-time Dynamic Error Message */}
      {hasError && (
        <p className="flex items-center gap-1.5 text-xs font-medium text-rose-400 transition-all duration-150 animate-in fade-in slide-in-from-top-1">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>{error.message || String(error)}</span>
        </p>
      )}
    </div>
  );
}
