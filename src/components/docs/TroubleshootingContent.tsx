import React from 'react';
import type { DocPage } from '../../data/docsData';
import { DocSection } from './layout';
import { Link } from 'react-router-dom';
import { ArrowRight, Wrench, AlertCircle, RefreshCw, Smartphone, HelpCircle, CheckCheck } from 'lucide-react';

interface Props {
  page: DocPage;
}

const troubleshootingCards = [
  {
    title: 'Location Not Detected (Null)',
    reason: 'Pass contact parameters toggle is disabled in GoHighLevel settings.',
    solution: [
      'Navigate to GoHighLevel Agency View → Settings → Custom Menu Links.',
      'Locate the NOLA SMS Pro custom link entry.',
      'Enable "Pass contact/user info as query parameters" and save.',
      'Reload the NOLA SMS Pro dashboard from your sub-account sidebar.'
    ],
    icon: <AlertCircle className="h-5 w-5 text-rose-500" />,
    headerBg: 'bg-rose-50/40 dark:bg-rose-950/10 border-b border-rose-100 dark:border-rose-900/30',
  },
  {
    title: 'Message Delivery Failures',
    reason: 'Depleted credit wallet, incorrect Philippine format, or keyword spam block.',
    solution: [
      'Open Message History and select the failed message to read carrier feedback.',
      'Verify your SMS credits wallet has a non-zero balance.',
      'Format recipient mobile number strictly to 11 digits: 09XXXXXXXXX.',
      'Avoid single-word test messages ("test", "hello") that trigger spam flags.'
    ],
    icon: <Smartphone className="h-5 w-5 text-amber-500" />,
    headerBg: 'bg-amber-50/40 dark:bg-amber-950/10 border-b border-amber-100 dark:border-amber-900/30',
  },
  {
    title: 'Expired Access Token / Reconnect Prompts',
    reason: 'GoHighLevel authentication token has expired or credentials changed.',
    solution: [
      'Click the "Reconnect GHL API" action button inside NOLA SMS Pro.',
      'Sign in with your GoHighLevel administrator credentials when prompted.',
      'Select the correct sub-account location and re-authorize permissions.'
    ],
    icon: <RefreshCw className="h-5 w-5 text-blue-500" />,
    headerBg: 'bg-blue-50/40 dark:bg-blue-950/10 border-b border-blue-100 dark:border-blue-900/30',
  }
];

export const TroubleshootingContent: React.FC<Props> = ({ page }) => {
  return (
    <div className="w-full space-y-12 pb-10">



      {/* INTRO */}
      <section id="troubleshooting-intro" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Self-service diagnostics</h2>
        <p className="text-[14.5px] leading-7 text-slate-700 dark:text-slate-300">
          Having trouble? Use these problem-and-solution cards to resolve the most common integration, setup, and messaging issues before escalating to support.
        </p>
      </section>

      {/* PREREQUISITES */}
      <section id="troubleshooting-prerequisites">
        <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/30">
          <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100/50 dark:border-slate-800 text-slate-600 dark:text-slate-400">
            <Wrench className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[13.5px] font-black text-slate-900 dark:text-white">Session access</p>
            <p className="text-[12.5px] leading-relaxed text-slate-500 dark:text-slate-400 mt-0.5">
              An active NOLA SMS Pro dashboard session or administrative access to the GoHighLevel portal is required to apply corrections.
            </p>
          </div>
        </div>
      </section>

      {/* PROBLEM-SOLUTION CARDS */}
      <section id="troubleshooting-cards" className="space-y-5">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Common issues &amp; resolutions</h2>
        <div className="space-y-6">
          {troubleshootingCards.map((card, idx) => (
            <div key={idx} className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#111827] overflow-hidden shadow-sm">
              <div className={`flex items-center gap-3 px-5 py-4 ${card.headerBg}`}>
                <div className="flex-shrink-0">{card.icon}</div>
                <div>
                  <h4 className="text-[14.5px] font-black text-slate-900 dark:text-white leading-tight">{card.title}</h4>
                  <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-0.5">
                    <strong>Cause:</strong> {card.reason}
                  </p>
                </div>
              </div>
              <div className="px-5 py-5 space-y-3">
                {card.solution.map((step, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-3">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 text-[10px] font-black mt-0.5">
                      {sIdx + 1}
                    </span>
                    <p className="text-[13px] leading-relaxed text-slate-600 dark:text-slate-300">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* QUICK DIAGNOSTICS CHECKLIST */}
      <section id="quick-diagnostics-checklist">
        <div className="rounded-2xl border border-blue-200 dark:border-blue-900/40 border-l-4 border-l-blue-500 dark:border-l-blue-600 bg-gradient-to-br from-blue-50 to-sky-50/60 dark:from-[#060E1E] dark:to-[#0A1628] p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <HelpCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-[13.5px] font-black text-blue-800 dark:text-blue-300 uppercase tracking-wide mb-3">Quick diagnostics checklist</p>
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
          <p className="text-[13.5px] leading-relaxed text-emerald-700 dark:text-emerald-400 font-medium">
            Applying these diagnostics resolves communication barriers, restores sync mechanisms, and resumes outbound SMS delivery services.
          </p>
        </div>
      </section>


    </div>
  );
};
