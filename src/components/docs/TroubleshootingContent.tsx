import React from 'react';
import type { DocPage } from '../../data/docsData';
import {
  Wrench,
  AlertCircle,
  RefreshCw,
  Smartphone,
  HelpCircle,
  CheckCheck,
  Monitor,
  CheckCircle2,
  ShieldAlert,
} from 'lucide-react';

interface Props {
  page: DocPage;
}

/* ─── Blank Screenshot Frame for Step Steps ─────────────── */
interface BlankScreenFrameProps {
  title: string;
}

const BlankScreenFrame: React.FC<BlankScreenFrameProps> = ({ title }) => {
  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070d18] shadow-sm w-full">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900 px-4 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="ml-2 text-[9px] font-black uppercase tracking-[0.12em] text-slate-400">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-1 text-[9px] font-black uppercase tracking-[0.12em] text-slate-400">
          <Monitor className="h-3 w-3" />
          Step Preview
        </div>
      </div>
      <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-[#0B132B] dark:to-[#070D18] flex flex-col items-center justify-center p-6 text-center">
        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-400 shadow-sm">
          <Monitor className="h-5 w-5 text-slate-400 dark:text-slate-500" />
        </div>
        <p className="text-[13px] font-bold text-slate-700 dark:text-slate-300">{title}</p>
        <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-0.5">
          Step Illustration
        </p>
      </div>
    </div>
  );
};

export const TroubleshootingContent: React.FC<Props> = ({ page }) => {
  const troubleshootingCards = [
    {
      title: 'Location Not Detected (Null)',
      icon: AlertCircle,
      color: 'text-rose-500',
      badge: 'Diagnostic 1',
      cause: 'The "Pass contact/user info as query parameters" setting is disabled in GoHighLevel Custom Menu Links.',
      desc: 'Follow these steps to restore location ID detection:',
      solutionSteps: [
        'Navigate to GoHighLevel Agency View → Settings → Custom Menu Links.',
        'Locate the NOLA SMS Pro custom link entry in the links index.',
        'Enable "Pass contact/user info as query parameters" and click Save.',
        'Reload the NOLA SMS Pro dashboard from your sub-account sidebar.',
      ],
    },
    {
      title: 'Message Delivery Failures',
      icon: Smartphone,
      color: 'text-amber-500',
      badge: 'Diagnostic 2',
      cause: 'Depleted credit balance, invalid Philippine mobile formatting, or single-word keyword spam block.',
      desc: 'Follow these resolution steps:',
      solutionSteps: [
        'Open Message History and click the failed message to inspect exact carrier error feedback.',
        'Verify your SMS credits balance is greater than zero.',
        'Format recipient mobile numbers strictly to 11 digits (09XXXXXXXXX).',
        'Avoid sending single-word test messages ("test", "hello") that trigger carrier spam filters.',
      ],
    },
    {
      title: 'Expired Access Token / Reconnect Prompts',
      icon: RefreshCw,
      color: 'text-blue-500',
      badge: 'Diagnostic 3',
      cause: 'The GoHighLevel OAuth access token has expired or agency credentials changed.',
      desc: 'Follow these re-authorization steps:',
      solutionSteps: [
        'Click the "Connect API" or "Reconnect" action button inside NOLA SMS Pro Settings.',
        'Sign in with your GoHighLevel administrator credentials when prompted.',
        'Select your target sub-account location and re-authorize permissions.',
      ],
    },
  ];

  return (
    <div className="w-full space-y-12 pb-10">

      {/* INTRO */}
      <section id="troubleshooting-intro" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">What this guide covers</h2>
        <p className="text-[14.5px] leading-7 text-slate-700 dark:text-slate-300">
          Having trouble? Use these self-service diagnostic cards to resolve the most common integration, setup, and messaging issues before escalating to support.
        </p>
      </section>

      {/* PREREQUISITE */}
      <section id="troubleshooting-prerequisites">
        <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/30">
          <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100/50 dark:border-slate-800 text-slate-600 dark:text-slate-400">
            <Wrench className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[13.5px] font-black text-slate-900 dark:text-white">Administrative session access</p>
            <p className="text-[12.5px] leading-relaxed text-slate-500 dark:text-slate-400 mt-0.5">
              An active NOLA SMS Pro dashboard session or administrative access to the GoHighLevel portal is required to apply corrections.
            </p>
          </div>
        </div>
      </section>

      {/* TROUBLESHOOTING STEP CARDS */}
      <section id="troubleshooting-cards" className="space-y-5">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Common issues &amp; resolution steps</h2>
        <div className="space-y-8">
          {troubleshootingCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#111827] hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 shadow-sm shadow-[#0F172A]/2 space-y-5"
              >
                <div className="w-full">
                  <BlankScreenFrame title={`${card.badge} — ${card.title}`} />
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/50">
                    <Icon className={`h-5 w-5 ${card.color}`} />
                  </div>
                  <div>
                    <h4 className="text-[16px] font-black text-slate-900 dark:text-white leading-tight">
                      {card.title}
                    </h4>
                    <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                      <strong>Cause:</strong> {card.cause}
                    </p>
                  </div>
                </div>
                <p className="text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-400 font-medium pl-1">
                  {card.desc}
                </p>
                <ul className="space-y-2 pl-1 border-t border-slate-100 dark:border-slate-800/60 pt-4">
                  {card.solutionSteps.map((stepText, subIdx) => (
                    <li key={subIdx} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-slate-600 dark:text-slate-400">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-400 dark:bg-slate-600" />
                      <span>{stepText}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* QUICK DIAGNOSTICS CHECKLIST */}
      <section id="quick-diagnostics-checklist">
        <div className="rounded-2xl border border-blue-200 dark:border-blue-900/40 border-l-4 border-l-blue-500 dark:border-l-blue-600 bg-gradient-to-br from-blue-50 to-sky-50/60 dark:from-[#060E1E] dark:to-[#0A1628] p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <HelpCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-[13.5px] font-black text-blue-800 dark:text-blue-300 uppercase tracking-wide mb-3">
                Quick diagnostics checklist
              </p>
              <ul className="space-y-2 text-[13px] text-slate-700 dark:text-blue-200">
                {[
                  'Are your SMS credits above 0?',
                  'Does the recipient number start with 09 and have exactly 11 digits?',
                  'Is the connection status in Settings showing "API Connected"?',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500 dark:bg-blue-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* EXPECTED OUTCOME */}
      <section id="troubleshooting-expected-outcome">
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/40 px-5 py-4 dark:border-emerald-800/40 dark:bg-emerald-900/10">
          <CheckCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
          <div>
            <p className="text-[13.5px] font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-wide mb-0.5">Expected outcome</p>
            <p className="text-[13.5px] leading-relaxed text-emerald-700 dark:text-emerald-400 font-medium">
              Applying these diagnostics resolves communication barriers, restores sync mechanisms, and resumes outbound SMS delivery services.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
