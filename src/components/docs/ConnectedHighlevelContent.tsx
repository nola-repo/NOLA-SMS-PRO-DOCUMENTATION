import React from 'react';
import type { DocPage } from '../../data/docsData';
import { DocSection } from './layout';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ShieldCheck, UserCheck, Wifi, WifiOff,
  Lightbulb, CheckCheck
} from 'lucide-react';

interface Props { page: DocPage; }

const statusItems = [
  {
    badge: 'API Connected',
    color: 'emerald',
    desc: 'Integration is active. Contacts are synced and SMS delivery is operational.',
    dot: 'bg-emerald-500',
    icon: <Wifi className="h-3.5 w-3.5 text-white" />,
  },
  {
    badge: 'Disconnected',
    color: 'rose',
    desc: 'Token expired or scope mismatch. Click "Connect API" inside settings to re-authorize.',
    dot: 'bg-rose-500',
    icon: <WifiOff className="h-3.5 w-3.5 text-white" />,
  },
];

const verifySteps = [
  { title: 'Open NOLA SMS Pro', desc: 'Access NOLA SMS Pro from your GoHighLevel sub-account left navigation sidebar.' },
  { title: 'Access settings panel', desc: 'Click Settings in the NOLA SMS Pro menu.' },
  { title: 'Confirm location mapping', desc: 'Scroll to the profile metadata block and verify that your Location Name and Location ID resolve correctly.' },
  { title: 'Open contacts lookup', desc: 'Navigate to the Contacts module in NOLA SMS Pro.' },
  { title: 'Verify database sync', desc: 'Ensure your customer contacts list populated automatically from your CRM directory.' },
  { title: 'Check connection indicator', desc: 'Return to Settings and verify that the API Connected badge shows green. Click Reconnect if status reads offline.' },
];

export const ConnectedHighlevelContent: React.FC<Props> = ({ page }) => {
  return (
    <div className="w-full space-y-12 pb-10">



      {/* INTRO */}
      <section id="connect-intro" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">What this guide covers</h2>
        <p className="text-[14.5px] leading-7 text-slate-700 dark:text-slate-300">
          Verify that NOLA SMS Pro is successfully connected to your GoHighLevel sub-account by confirming location identifiers and checking contact synchronization status.
        </p>
        <p className="text-[14.5px] leading-7 text-slate-700 dark:text-slate-300">
          The connection handshake relies on dynamic URL parameters passed securely by GoHighLevel when you open the iframe. This checks that the current sub-account location aligns with your registered NOLA profile and syncs data blocks seamlessly.
        </p>
      </section>

      {/* CONNECTION STATUS REFERENCE */}
      <section id="connect-status-reference" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Connection status indicators</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {statusItems.map((item) => (
            <div
              key={item.badge}
              className={`flex items-start gap-3 rounded-2xl border p-5 bg-white dark:bg-[#111827] shadow-sm ${
                item.color === 'emerald'
                  ? 'border-emerald-200'
                  : 'border-rose-200'
              }`}
            >
              <div className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${
                item.color === 'emerald' ? 'bg-emerald-500' : 'bg-rose-500'
              }`}>
                {item.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${item.dot}`} />
                  <span className={`text-[12px] font-black uppercase tracking-wider ${
                    item.color === 'emerald' ? 'text-emerald-800 dark:text-emerald-300' : 'text-rose-800 dark:text-rose-300'
                  }`}>{item.badge}</span>
                </div>
                <p className="text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PREREQUISITES */}
      <section id="connect-prerequisites" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Before you begin</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <ShieldCheck className="h-4 w-4" />, label: 'Marketplace Install', detail: 'Completed Marketplace installation from Agency View.' },
            { icon: <UserCheck className="h-4 w-4" />, label: 'Owner Profile Login', detail: 'Active owner account already created and signed in.' },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/30">
              <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100/50 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                {item.icon}
              </div>
              <div>
                <p className="text-[13.5px] font-black text-slate-900 dark:text-white">{item.label}</p>
                <p className="text-[12.5px] leading-relaxed text-slate-500 dark:text-slate-400 mt-0.5">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VERIFICATION STEPS */}
      <section id="connect-verification-steps" className="space-y-5">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Verification steps</h2>
        <div className="space-y-4">
          {verifySteps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800/80 dark:bg-[#111827] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-400 dark:hover:border-slate-600 hover:shadow-md group">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200 text-[11px] font-black border border-slate-300 dark:border-slate-700 mt-0.5">
                {idx + 1}
              </div>
              <div>
                <p className="text-[15px] font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{step.title}</p>
                <p className="mt-1 text-[13.5px] leading-relaxed text-slate-500 dark:text-slate-400">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DIAGNOSTIC TIP */}
      <section id="connect-diagnostic-tip">
        <div className="rounded-2xl border border-blue-200 dark:border-blue-900/40 border-l-4 border-l-blue-500 dark:border-l-blue-600 bg-gradient-to-br from-blue-50 to-sky-50/60 dark:from-[#060E1E] dark:to-[#0A1628] p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <Lightbulb className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-[13.5px] font-black text-blue-800 dark:text-blue-300 uppercase tracking-wide mb-1">Troubleshooting: missing location or contacts</p>
              <p className="text-[13.5px] leading-relaxed text-slate-700 dark:text-blue-200">
                If your Location ID displays as <code className="text-[12px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono text-slate-800 dark:text-slate-200">null</code>, or contacts fail to sync, verify your Custom Menu Link settings under GoHighLevel Settings. Ensure that <em>Pass contact/user info as query parameters</em> is checked so NOLA can map sub-account identifiers dynamically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SUCCESS OUTCOME */}
      <section id="connect-outcome">
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/40 px-5 py-4 dark:border-emerald-800/40 dark:bg-emerald-900/10">
          <CheckCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
          <div>
            <p className="text-[13.5px] font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-wide mb-0.5">Expected outcome</p>
            <p className="text-[13.5px] leading-relaxed text-emerald-700 dark:text-emerald-400 font-medium">
              Your location identity, owner profile, and GoHighLevel contact database are successfully synchronized and ready for standard messaging operations.
            </p>
          </div>
        </div>
      </section>


    </div>
  );
};
