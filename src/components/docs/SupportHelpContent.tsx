import React from 'react';
import type { DocPage } from '../../data/docsData';
import { DocSection } from './layout';
import { Link } from 'react-router-dom';
import { ArrowRight, HelpCircle, Phone, CreditCard, Shield, FileCheck, CheckCheck } from 'lucide-react';

interface Props {
  page: DocPage;
}

const ticketCategories = [
  {
    icon: <CreditCard className="h-4 w-4" />,
    label: 'Credits & Billing',
    desc: 'Top-up issues, transaction errors, credit package questions, or receipts.'
  },
  {
    icon: <Shield className="h-4 w-4" />,
    label: 'Sender ID requests',
    desc: 'Registration documents verification status, rejection inquiries, or changes.'
  },
  {
    icon: <Phone className="h-4 w-4" />,
    label: 'Message Delivery',
    desc: 'Queued or blocked messages, high latency, carrier rejection codes.'
  },
  {
    icon: <HelpCircle className="h-4 w-4" />,
    label: 'Application Setup',
    desc: 'Integration failures, Marketplace issues, administrator permissions.'
  }
];

const submitSteps = [
  { title: 'Open Support Console', desc: 'Select Support & Help from the left navigation.' },
  { title: 'Initiate Request', desc: 'Click the Create Support Ticket action button.' },
  { title: 'Select Ticket Category', desc: 'Choose one of the four categories described above.' },
  { title: 'Draft Issue Description', desc: 'Write a detailed explanation of the issue you are facing.' },
  { title: 'Upload Diagnostics Screen', desc: 'Attach a screenshot showing error codes or failure states.' },
  { title: 'Submit Request', desc: 'Click Submit Ticket. The request is immediately logged in the support dashboard.' }
];

const trackingSteps = [
  { title: 'Review Ticket Logs', desc: 'Check the list of Active and Resolved support tickets.' },
  { title: 'Access Status Updates', desc: 'Select any ticket reference number to read replies and developer comments.' }
];

export const SupportHelpContent: React.FC<Props> = ({ page }) => {
  return (
    <div className="w-full space-y-12 pb-10">



      {/* INTRO */}
      <section id="support-intro" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Developer &amp; billing support</h2>
        <p className="text-[14.5px] leading-7 text-slate-700 dark:text-slate-300">
          Submit support tickets to resolve billing, Sender ID, setup, or SMS delivery issues, and monitor resolutions from your central dashboard.
        </p>
      </section>

      {/* PREREQUISITES */}
      <section id="support-prerequisites">
        <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/30">
          <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100/50 dark:border-slate-800 text-slate-600 dark:text-slate-400">
            <Shield className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[13.5px] font-black text-slate-900 dark:text-white">Owner credentials required</p>
            <p className="text-[12.5px] leading-relaxed text-slate-500 dark:text-slate-400 mt-0.5">
              Only registered owner accounts can create and monitor support tickets. Verify you are logged in as owner before requesting billing modifications.
            </p>
          </div>
        </div>
      </section>

      {/* TICKET CATEGORY CARDS */}
      <section id="support-categories" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Ticket categories</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {ticketCategories.map((cat, idx) => (
            <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#111827] flex gap-3 shadow-sm">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                {cat.icon}
              </div>
              <div>
                <h4 className="text-[13.5px] font-black text-slate-900 dark:text-white uppercase tracking-wider">{cat.label}</h4>
                <p className="text-[12px] leading-relaxed text-slate-500 dark:text-slate-400 mt-1">{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SUBMISSION STEPS */}
      <section id="support-submit-steps" className="space-y-5">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Submitting a ticket</h2>
        <div className="space-y-4">
          {submitSteps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800/80 dark:bg-[#111827] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-400 dark:hover:border-slate-600 hover:shadow-md group">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200 text-[11px] font-black border border-slate-200 dark:border-slate-700 mt-0.5">
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

      {/* REQUIRED INFORMATION PANEL */}
      <section id="support-required-checklist">
        <div className="rounded-2xl border border-amber-200 bg-amber-50/40 px-5 py-5 dark:border-amber-900/40 dark:bg-amber-950/10">
          <div className="flex items-start gap-3">
            <FileCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600 dark:text-amber-400" />
            <div>
              <p className="text-[13.5px] font-black text-amber-800 dark:text-amber-300 uppercase tracking-wide mb-2">Required SMS delivery details</p>
              <p className="text-[13px] leading-relaxed text-amber-700 dark:text-amber-400 mb-3">
                If reporting message delivery issues, include the following data points to help engineers diagnose routing problems:
              </p>
              <ul className="space-y-2 text-[13px] text-amber-800 dark:text-amber-300 font-medium">
                {[
                  'Recipient mobile phone numbers.',
                  'Approximate date and time the SMS was dispatched.',
                  'Error code or failure reason shown in Message History.',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500 dark:bg-amber-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TICKET TRACKING */}
      <section id="support-tracking-steps" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Tracking ticket progress</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {trackingSteps.map((step, idx) => (
            <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#111827] shadow-sm">
              <div className="flex items-center gap-2.5 mb-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 text-[10px] font-black">
                  {idx + 1}
                </span>
                <h4 className="text-[13.5px] font-black text-slate-900 dark:text-white uppercase tracking-wider">{step.title}</h4>
              </div>
              <p className="text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EXPECTED OUTCOME */}
      <section id="support-expected-outcome">
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/40 px-5 py-4 dark:border-emerald-800/40 dark:bg-emerald-900/10">
          <CheckCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
          <p className="text-[13.5px] leading-relaxed text-emerald-700 dark:text-emerald-400 font-medium">
            Tickets are routed to specialized support teams immediately. Updates are displayed in real-time in your support tickets history.
          </p>
        </div>
      </section>


    </div>
  );
};
