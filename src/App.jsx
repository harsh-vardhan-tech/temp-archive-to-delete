import React, { useState } from 'react';
import RegistrationWizard from './components/RegistrationWizard';
import { 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  X, 
  Terminal, 
  ExternalLink, 
  FileCode2,
  Video,
  Layers,
  ShieldCheck,
  Check
} from 'lucide-react';

export default function App() {
  const [showQAGuide, setShowQAGuide] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-linear-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white shadow-md shadow-indigo-500/20">
              P
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base tracking-tight text-white">
                  ProDesk IT
                </span>
                <span className="hidden sm:inline-block rounded-md bg-indigo-500/10 px-2 py-0.5 text-[11px] font-semibold text-indigo-400 border border-indigo-500/20">
                  Sprint 07
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Phase 3: Core Engineering • The Registration Wizard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setShowQAGuide(true)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700/80 bg-slate-900/60 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-all cursor-pointer"
            >
              <HelpCircle className="h-4 w-4 text-indigo-400" />
              <span>QA & Grading Guide</span>
            </button>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>P0 + P1 + P2 Complete</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col justify-center items-center">
        {/* Banner Announcement */}
        <div className="w-full max-w-2xl mb-6">
          <div className="flex items-center justify-between rounded-2xl border border-indigo-900/40 bg-linear-to-r from-indigo-950/40 via-purple-950/20 to-slate-900/40 p-4 text-xs text-indigo-300">
            <div className="flex items-center gap-2.5">
              <Sparkles className="h-4 w-4 text-indigo-400 shrink-0" />
              <span>
                <strong className="text-white">Enterprise Form Architecture:</strong> Implemented via React Hook Form + Zod with state lifted to Parent.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowQAGuide(true)}
              className="underline hover:text-white ml-2 shrink-0 cursor-pointer"
            >
              Checklist
            </button>
          </div>
        </div>

        {/* Multi-Step Registration Wizard */}
        <RegistrationWizard />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            © {new Date().getFullYear()} ProDesk IT Internship Works • Registration Wizard Deliverable
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>POC: Mr. Nakul (8851407750)</span>
            <span>•</span>
            <span>info@prodesk.in</span>
          </div>
        </div>
      </footer>

      {/* QA & Video Recording Guide Modal */}
      {showQAGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 text-left shadow-2xl scrollbar-thin">
            <button
              type="button"
              onClick={() => setShowQAGuide(false)}
              className="absolute top-5 right-5 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-indigo-400">
                <Video className="h-5 w-5" />
                <h3 className="text-lg font-bold text-white">
                  Sprint 07 QA & Demo Recording Guide
                </h3>
              </div>
              <p className="text-xs text-slate-300">
                Use this checklist to ensure 100% compliance during your 3-minute video recording and mentor audit.
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-emerald-400">Phase 1: Base MVP & State Architecture (P0)</span>
                    <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-400 font-bold">100%</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-300">
                    <li className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span><strong>UI Segmentation:</strong> 3 distinct conditional views (Step 1, Step 2, Step 3) + Success view.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span><strong>State Lifting:</strong> Master payload lifted to Parent. Data in Step 1 persists after visiting Step 2 and clicking "Back".</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span><strong>Console Payload:</strong> On submit, <code>console.log()</code> outputs the finalized object and activates the Success UI.</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-purple-400">Phase 2: Client-Side Validation & UX (P1)</span>
                    <span className="rounded bg-purple-500/10 px-2 py-0.5 text-[10px] text-purple-400 font-bold">100%</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-300">
                    <li className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span><strong>Real-time Regex:</strong> Dynamic red error string when email lacks '@' or invalid format.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span><strong>Password Rules:</strong> Minimum 8 chars with multi-tier strength indicator.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span><strong>Confirm Match:</strong> Dynamic validation ensuring exact match with primary password.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span><strong>Conditional Disabling:</strong> "Next" button remains disabled until all local fields validate.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span><strong>Show/Hide Password:</strong> Eyeball toggle changes <code>type="password"</code> to <code>type="text"</code>.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span><strong>Progress Indicator:</strong> Dynamic progress bar showing "Step X of 3" and percentage.</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-indigo-400">Phase 3: Enterprise Form Architecture (P2)</span>
                    <span className="rounded bg-indigo-500/10 px-2 py-0.5 text-[10px] text-indigo-400 font-bold">100%</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-300">
                    <li className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span><strong>React Hook Form:</strong> Uncontrolled performant state eliminating unnecessary tree re-renders.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span><strong>Zod Schema:</strong> Strict type validation using <code>@hookform/resolvers/zod</code>.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span><strong>Prompts.md:</strong> Included in repository documenting AI engineering sessions.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowQAGuide(false)}
                  className="rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors cursor-pointer"
                >
                  Got It, Close Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
