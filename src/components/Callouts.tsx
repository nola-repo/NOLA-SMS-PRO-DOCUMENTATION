import React from 'react';
import { Lightbulb, Info, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

interface CalloutProps {
  children: React.ReactNode;
  title?: string;
}

// Figma Style: Full border, large rounded corners (rounded-2xl), generous padding (p-5)
const base = 'my-6 flex gap-4 border rounded-2xl p-5 text-sm leading-relaxed transition-all shadow-sm';

export const TipBox: React.FC<CalloutProps> = ({ children, title = 'Tip' }) => (
  <div className={`${base} border-emerald-200 bg-emerald-50/20 text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-950/10 dark:text-emerald-250`}>
    <Lightbulb className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
    <div className="min-w-0">
      <span className="font-black block mb-1 text-emerald-700 dark:text-emerald-350 uppercase tracking-wider text-[11px]">{title}</span>
      <div className="font-medium">{children}</div>
    </div>
  </div>
);

export const InfoBox: React.FC<CalloutProps> = ({ children, title = 'Note' }) => (
  <div className={`${base} border-slate-200 bg-[#F8FAFC]/80 text-[#0F172A] dark:border-slate-900/40 dark:bg-[#1E293B]/15 dark:text-slate-200`}>
    <Info className="h-5 w-5 text-[#334155] dark:text-[#CBD5E1] flex-shrink-0 mt-0.5" />
    <div className="min-w-0">
      <span className="font-black block mb-1 text-[#334155] dark:text-slate-300 uppercase tracking-wider text-[11px]">{title}</span>
      <div className="font-medium">{children}</div>
    </div>
  </div>
);

export const WarningBox: React.FC<CalloutProps> = ({ children, title = 'Warning' }) => (
  <div className={`${base} border-amber-250 bg-amber-50/20 text-amber-800 dark:border-amber-900/35 dark:bg-amber-955/5 dark:text-amber-250`}>
    <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
    <div className="min-w-0">
      <span className="font-black block mb-1 text-amber-700 dark:text-amber-350 uppercase tracking-wider text-[11px]">{title}</span>
      <div className="font-medium">{children}</div>
    </div>
  </div>
);

export const SuccessBox: React.FC<CalloutProps> = ({ children, title = 'Success' }) => (
  <div className={`${base} border-emerald-200 bg-emerald-50/20 text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-950/10 dark:text-emerald-250`}>
    <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-450 flex-shrink-0 mt-0.5" />
    <div className="min-w-0">
      <span className="font-black block mb-1 text-emerald-700 dark:text-emerald-350 uppercase tracking-wider text-[11px]">{title}</span>
      <div className="font-medium">{children}</div>
    </div>
  </div>
);

export const ErrorBox: React.FC<CalloutProps> = ({ children, title = 'Error' }) => (
  <div className={`${base} border-red-200 bg-red-50/15 text-red-800 dark:border-red-950/25 dark:bg-red-950/5 dark:text-red-250`}>
    <XCircle className="h-5 w-5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
    <div className="min-w-0">
      <span className="font-black block mb-1 text-red-700 dark:text-red-350 uppercase tracking-wider text-[11px]">{title}</span>
      <div className="font-medium">{children}</div>
    </div>
  </div>
);
