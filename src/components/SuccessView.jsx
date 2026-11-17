import React, { useEffect, useState } from 'react';
import { 
  CheckCircle2, 
  RotateCcw, 
  Terminal, 
  Copy, 
  Check, 
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SuccessView({ payload, onReset }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }
  }, []);

  const handleCopyPayload = () => {
    if (payload) {
      navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6 text-center animate-in zoom-in-95 duration-500">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-linear-to-tr from-emerald-500 to-teal-400 text-slate-950 shadow-xl shadow-emerald-500/30">
        <CheckCircle2 className="h-10 w-10 stroke-[2.5]" />
      </div>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Completed</span>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-white">
          Registration Successful!
        </h2>
        <p className="max-w-md mx-auto text-sm text-slate-400">
          User data has been captured, validated, and logged to the console.
        </p>
      </div>

      <div className="mx-auto max-w-xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 text-left shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-emerald-400" />
            <span className="text-xs font-mono font-medium text-slate-300">
              Submitted Payload
            </span>
          </div>

          <button
            type="button"
            onClick={handleCopyPayload}
            className="flex items-center gap-1 rounded-md bg-slate-800/80 px-2 py-1 text-[11px] font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Copy JSON</span>
              </>
            )}
          </button>
        </div>

        <pre className="max-h-64 overflow-y-auto p-4 text-xs font-mono text-emerald-400 leading-relaxed scrollbar-thin">
          {JSON.stringify(payload, null, 2)}
        </pre>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 hover:text-white transition-all cursor-pointer shadow-md"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Register Another User</span>
        </button>
      </div>
    </div>
  );
}
