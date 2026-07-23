import React from 'react';
import type { DocPage } from '../../data/docsData';
import {
  HelpCircle,
  Phone,
  CreditCard,
  Shield,
  FileCheck,
  CheckCheck,
  Monitor,
  PlusCircle,
  UploadCloud,
  Send,
  ListFilter,
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

const ticketCategories = [
  {
    icon: <CreditCard className="h-5 w-5 text-amber-500" />,
    label: 'Credits & Billing',
    desc: 'Top-up issues, transaction errors, credit package questions, or receipts.',
  },
  {
    icon: <Shield className="h-5 w-5 text-blue-500" />,
    label: 'Sender ID Requests',
    desc: 'Registration documents verification status, rejection inquiries, or changes.',
  },
  {
    icon: <Phone className="h-5 w-5 text-rose-500" />,
    label: 'Message Delivery',
    desc: 'Queued or blocked messages, high latency, carrier rejection codes.',
  },
  {
    icon: <HelpCircle className="h-5 w-5 text-purple-500" />,
    label: 'Application Setup',
    desc: 'Integration failures, Marketplace issues, administrator permissions.',
  },
];

export const SupportHelpContent: React.FC<Props> = ({ page }) => {
  const submitSteps = [
    {
      badge: 'Step 1',
      title: 'Open Support Console',
      icon: HelpCircle,
      color: 'text-blue-500',
      desc: 'Select Support & Help from the NOLA SMS Pro left navigation sidebar.',
      details: [
        'Opens your support ticket dashboard.',
        'View existing open and resolved ticket history.',
      ],
    },
    {
      badge: 'Step 2',
      title: 'Initiate Request & Pick Category',
      icon: PlusCircle,
      color: 'text-purple-500',
      desc: 'Click "Create Support Ticket" and select one of the four categories (Billing, Sender IDs, Delivery, or Setup).',
      details: [
        'Categorization ensures immediate routing to specialized support engineers.',
        'Prepares required data fields for submission.',
      ],
    },
    {
      badge: 'Step 3',
      title: 'Draft Issue & Attach Diagnostics',
      icon: UploadCloud,
      color: 'text-amber-500',
      desc: 'Write a detailed explanation of the issue you are facing and attach a screenshot showing error codes.',
      details: [
        'Include recipient phone numbers, timestamps, and error responses.',
        'Screenshots help engineers diagnose carrier latency quickly.',
      ],
    },
    {
      badge: 'Step 4',
      title: 'Submit Ticket',
      icon: Send,
      color: 'text-emerald-500',
      desc: 'Click Submit Ticket. The request is immediately logged in the support system and assigned a tracking ID.',
      details: [
        'Track updates in real-time on your support dashboard.',
        'Updates and developer comments trigger email notifications.',
      ],
    },
  ];

  const trackingSteps = [
    {
      badge: 'Step 1',
      title: 'Review Ticket Logs',
      icon: ListFilter,
      color: 'text-teal-500',
      desc: 'Check the list of Active and Resolved support tickets.',
      details: [
        'Filter tickets by open vs resolved status.',
        'Click any ticket reference number to read replies and developer comments.',
      ],
    },
  ];

  return (
    <div className="w-full space-y-12 pb-10">

      {/* INTRO */}
      <section id="support-intro" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">What this guide covers</h2>
        <p className="text-[14.5px] leading-7 text-slate-700 dark:text-slate-300">
          Submit support tickets to resolve billing, Sender ID, setup, or SMS delivery issues, and monitor resolutions from your central dashboard.
        </p>
      </section>

      {/* PREREQUISITE */}
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

      {/* TICKET CATEGORIES */}
      <section id="support-categories" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Ticket categories</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {ticketCategories.map((cat, idx) => (
            <div key={idx} className="premium-card flex flex-col justify-between h-full">
              <div>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                  {cat.icon}
                </div>
                <h3 className="text-[14px] font-black text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                  {cat.label}
                </h3>
                <p className="text-[12.5px] leading-relaxed text-slate-500 dark:text-slate-400">{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SUBMISSION WORKFLOW */}
      <section id="support-submit-steps" className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400">
            <HelpCircle className="h-4 w-4" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Submitting a ticket steps</h2>
        </div>
        <div className="space-y-8">
          {submitSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#111827] hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 shadow-sm shadow-[#0F172A]/2 space-y-5"
              >
                <div className="w-full">
                  <BlankScreenFrame title={`${step.badge} — ${step.title}`} />
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/50">
                    <Icon className={`h-5 w-5 ${step.color}`} />
                  </div>
                  <h4 className="text-[16px] font-black text-slate-900 dark:text-white leading-tight">
                    {step.title}
                  </h4>
                </div>
                <p className="text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-400 font-medium pl-1">
                  {step.desc}
                </p>
                <ul className="space-y-2 pl-1 border-t border-slate-100 dark:border-slate-800/60 pt-4">
                  {step.details.map((detail, subIdx) => (
                    <li key={subIdx} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-slate-600 dark:text-slate-400">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-400 dark:bg-slate-600" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* TRACKING WORKFLOW */}
      <section id="support-tracking-steps" className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-800 text-teal-600 dark:text-teal-400">
            <ListFilter className="h-4 w-4" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Tracking ticket progress steps</h2>
        </div>
        <div className="space-y-8">
          {trackingSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#111827] hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 shadow-sm shadow-[#0F172A]/2 space-y-5"
              >
                <div className="w-full">
                  <BlankScreenFrame title={`${step.badge} — ${step.title}`} />
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/50">
                    <Icon className={`h-5 w-5 ${step.color}`} />
                  </div>
                  <h4 className="text-[16px] font-black text-slate-900 dark:text-white leading-tight">
                    {step.title}
                  </h4>
                </div>
                <p className="text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-400 font-medium pl-1">
                  {step.desc}
                </p>
                <ul className="space-y-2 pl-1 border-t border-slate-100 dark:border-slate-800/60 pt-4">
                  {step.details.map((detail, subIdx) => (
                    <li key={subIdx} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-slate-600 dark:text-slate-400">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-400 dark:bg-slate-600" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* REQUIRED DETAILS CHECKLIST */}
      <section id="support-required-checklist">
        <div className="rounded-2xl border border-amber-200 bg-amber-50/40 px-5 py-5 dark:border-amber-900/40 dark:bg-amber-950/10">
          <div className="flex items-start gap-3">
            <FileCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600 dark:text-amber-400" />
            <div>
              <p className="text-[13.5px] font-black text-amber-800 dark:text-amber-300 uppercase tracking-wide mb-2">
                Required SMS delivery diagnostic details
              </p>
              <p className="text-[13px] leading-relaxed text-amber-700 dark:text-amber-400 mb-3">
                If reporting message delivery issues, include the following data points to help engineers diagnose carrier routing problems:
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

      {/* SUCCESS */}
      <section id="support-expected-outcome">
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/40 px-5 py-4 dark:border-emerald-800/40 dark:bg-emerald-900/10">
          <CheckCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
          <div>
            <p className="text-[13.5px] font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-wide mb-0.5">Expected outcome</p>
            <p className="text-[13.5px] leading-relaxed text-emerald-700 dark:text-emerald-400 font-medium">
              Tickets are routed to specialized support teams immediately. Status updates and developer comments are displayed in real-time in your support tickets history.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
