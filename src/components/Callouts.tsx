import React from 'react';
import { Lightbulb, Info, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

interface CalloutProps {
  children: React.ReactNode;
  title?: string;
}

// Figma Style: Full border, large rounded corners (rounded-2xl), generous padding (p-5)
const base = 'my-6 flex gap-4 border rounded-2xl p-5 text-sm leading-relaxed transition-all shadow-sm';

export const TipBox: React.FC<CalloutProps> = ({ children, title = 'Tip' }) => (
  <div className={`${base} border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800/50 dark:bg-emerald-950/30 dark:text-emerald-200`}>
    <Lightbulb className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
    <div className="min-w-0">
      <span className="font-black block mb-1 text-emerald-700 dark:text-emerald-300 uppercase tracking-wider text-[11px]">{title}</span>
      <div className="font-medium">{children}</div>
    </div>
  </div>
);

export const InfoBox: React.FC<CalloutProps> = ({ children, title = 'Note' }) => (
  <div className={`${base} border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-700/50 dark:bg-blue-950/40 dark:text-blue-200`}>
    <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
    <div className="min-w-0">
      <span className="font-black block mb-1 text-blue-700 dark:text-blue-300 uppercase tracking-wider text-[11px]">{title}</span>
      <div className="font-medium">{children}</div>
    </div>
  </div>
);

export const WarningBox: React.FC<CalloutProps> = ({ children, title = 'Warning' }) => (
  <div className={`${base} border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-700/50 dark:bg-amber-950/30 dark:text-amber-200`}>
    <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
    <div className="min-w-0">
      <span className="font-black block mb-1 text-amber-700 dark:text-amber-300 uppercase tracking-wider text-[11px]">{title}</span>
      <div className="font-medium">{children}</div>
    </div>
  </div>
);

export const SuccessBox: React.FC<CalloutProps> = ({ children, title = 'Success' }) => (
  <div className={`${base} border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800/50 dark:bg-emerald-950/30 dark:text-emerald-200`}>
    <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
    <div className="min-w-0">
      <span className="font-black block mb-1 text-emerald-700 dark:text-emerald-300 uppercase tracking-wider text-[11px]">{title}</span>
      <div className="font-medium">{children}</div>
    </div>
  </div>
);

export const ErrorBox: React.FC<CalloutProps> = ({ children, title = 'Error' }) => (
  <div className={`${base} border-red-200 bg-red-50 text-red-900 dark:border-red-800/50 dark:bg-red-950/30 dark:text-red-200`}>
    <XCircle className="h-5 w-5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
    <div className="min-w-0">
      <span className="font-black block mb-1 text-red-700 dark:text-red-300 uppercase tracking-wider text-[11px]">{title}</span>
      <div className="font-medium">{children}</div>
    </div>
  </div>
);
