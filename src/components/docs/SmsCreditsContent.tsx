import React, { useState, useEffect } from 'react';
import type { DocPage } from '../../data/docsData';
import {
  UserCheck,
  TrendingUp,
  ShoppingCart,
  History,
  AlertTriangle,
  CheckCheck,
  Maximize2,
  X,
  Monitor,
  CreditCard,
} from 'lucide-react';

import SettingsCreditsImg from '../../assets/Dashboard Overview/Settings - Credits.png';

interface Props {
  page: DocPage;
}

/* ─── Image Lightbox ───────────────────────────────────── */
interface LightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
}

const ImageLightbox: React.FC<LightboxProps> = ({ src, alt, onClose }) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-6xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 flex items-center gap-1.5 text-white/80 hover:text-white text-[12px] font-semibold transition-colors"
        >
          <X className="h-4 w-4" />
          Close
        </button>
        <div className="overflow-hidden rounded-xl border border-white/10 shadow-2xl">
          <img
            src={src}
            alt={alt}
            className="w-full h-auto block max-h-[85vh] object-contain object-top"
          />
        </div>
      </div>
    </div>
  );
};

/* ─── ScreenFrame Component ────────────────────────────── */
interface ScreenFrameProps {
  src: string;
  alt: string;
  title: string;
  onOpenLightbox: (src: string) => void;
}

const ScreenFrame: React.FC<ScreenFrameProps> = ({ src, alt, title, onOpenLightbox }) => {
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
        <button
          onClick={() => onOpenLightbox(src)}
          className="flex items-center gap-1 text-[9px] font-black uppercase tracking-[0.12em] text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          aria-label="View full size"
        >
          <Maximize2 className="h-3 w-3" />
          Full size
        </button>
      </div>
      <button
        className="block w-full cursor-zoom-in focus:outline-none"
        onClick={() => onOpenLightbox(src)}
        aria-label={`View ${alt} full size`}
      >
        <img src={src} alt={alt} className="w-full h-auto block" />
      </button>
    </div>
  );
};

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

const creditPackages = [
  { credits: '10', label: 'Trial', highlight: false, note: 'Included at registration' },
  { credits: '500', label: 'Starter', highlight: false, note: 'Good for initial campaigns' },
  { credits: '1,100', label: 'Growth', highlight: true, note: 'Most popular package' },
  { credits: '2,750', label: 'Scale', highlight: false, note: 'High-volume messaging' },
  { credits: '6,000', label: 'Enterprise', highlight: false, note: 'Large campaign operations' },
];

export const SmsCreditsContent: React.FC<Props> = ({ page }) => {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const monitorSteps = [
    {
      badge: 'Step 1',
      title: 'Open SMS Credits',
      icon: CreditCard,
      color: 'text-blue-500',
      desc: 'Open SMS Credits from the NOLA SMS Pro left navigation menu.',
      details: [
        'Access your central SMS wallet overview.',
        'View live credit balance statistics.',
      ],
    },
    {
      badge: 'Step 2',
      title: 'Review Balance & Usage',
      icon: TrendingUp,
      color: 'text-emerald-500',
      desc: 'Analyze SMS credit consumption for Today, This Week, and This Month.',
      details: [
        'Includes remaining trial credits and paid credits.',
        'Outbound texts pause automatically if credit balance reaches zero.',
      ],
    },
  ];

  const purchaseSteps = [
    {
      badge: 'Step 1',
      title: 'Select Credit Package',
      icon: ShoppingCart,
      color: 'text-amber-500',
      desc: 'Scroll to the top-up section and choose one of the available credit packages.',
      details: [
        'Select package based on monthly campaign volume.',
        'Offers volume rate discounts on larger tiers.',
      ],
    },
    {
      badge: 'Step 2',
      title: 'Complete Payment & Verify',
      icon: CheckCheck,
      color: 'text-purple-500',
      desc: 'Click Checkout to open the secure payment portal. Complete payment and verify updated balance.',
      details: [
        'Secure checkout processes transactions instantly.',
        'Credits reflect in your wallet upon payment confirmation.',
      ],
    },
  ];

  const auditSteps = [
    {
      badge: 'Step 1',
      title: 'Scroll to Credit History',
      icon: History,
      color: 'text-teal-500',
      desc: 'Scroll to the Credit History section below the balance card.',
      details: [
        'Lists all credit debits, refunds, and top-up transactions.',
        'Review timestamps, reference IDs, and segment charges.',
      ],
    },
  ];

  return (
    <div className="w-full space-y-12 pb-10">

      {/* INTRO */}
      <section id="credits-intro" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">What this guide covers</h2>
        <p className="text-[14.5px] leading-7 text-slate-700 dark:text-slate-300">
          SMS credits fuel your outbound text messaging outbox. Monitor your available wallet balance, select top-up packages, and audit full transaction history.
        </p>
      </section>

      {/* SCREENSHOT OVERVIEW */}
      <section id="credits-screenshot" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">SMS credits workspace</h2>
        <ScreenFrame
          src={SettingsCreditsImg}
          alt="Settings - SMS Credits Balance & Transactions"
          title="SMS Credits Dashboard"
          onOpenLightbox={(src) => setLightboxSrc(src)}
        />
      </section>

      {/* CREDIT PACKAGES */}
      <section id="credits-packages" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Credit packages</h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {creditPackages.map((pkg) => (
            <div
              key={pkg.credits}
              className={`flex-shrink-0 rounded-2xl border px-5 py-4 min-w-[120px] text-center transition-all ${
                pkg.highlight
                  ? 'border-blue-300 bg-gradient-to-b from-blue-50 to-slate-50 dark:border-blue-800/60 dark:from-blue-950/20 dark:to-slate-900 ring-1 ring-blue-200 dark:ring-blue-900/40 shadow-sm'
                  : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-[#111827]'
              }`}
            >
              <p
                className={`text-[22px] font-black leading-none mb-1 ${
                  pkg.highlight ? 'text-blue-700 dark:text-blue-400' : 'text-slate-900 dark:text-white'
                }`}
              >
                {pkg.credits}
              </p>
              <p className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                {pkg.label}
              </p>
              {pkg.highlight && (
                <span className="inline-block rounded-full bg-blue-600 px-2 py-0.5 text-[9px] font-black text-white uppercase tracking-wide mb-1">
                  Popular
                </span>
              )}
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">{pkg.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PREREQUISITE */}
      <section id="credits-prerequisite">
        <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/30">
          <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100/50 dark:border-slate-800 text-slate-600 dark:text-slate-400">
            <UserCheck className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[13.5px] font-black text-slate-900 dark:text-white">Owner login required</p>
            <p className="text-[12.5px] leading-relaxed text-slate-500 dark:text-slate-400 mt-0.5">
              Active owner account login is required to purchase credit top-ups and access billing transactions.
            </p>
          </div>
        </div>
      </section>

      {/* MONITOR BALANCE WORKFLOW */}
      <section id="credits-monitor-workflow" className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400">
            <TrendingUp className="h-4 w-4" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Monitor balance steps</h2>
        </div>
        <div className="space-y-8">
          {monitorSteps.map((step, idx) => {
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

      {/* PURCHASE CREDITS WORKFLOW */}
      <section id="credits-purchase-workflow" className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400">
            <ShoppingCart className="h-4 w-4" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Purchase credits steps</h2>
        </div>
        <div className="space-y-8">
          {purchaseSteps.map((step, idx) => {
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

      {/* AUDIT WORKFLOW */}
      <section id="credits-audit-workflow" className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-800 text-teal-600 dark:text-teal-400">
            <History className="h-4 w-4" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Audit transactions steps</h2>
        </div>
        <div className="space-y-8">
          {auditSteps.map((step, idx) => {
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

      {/* CONSUMPTION RULE */}
      <section id="credits-consumption-rule">
        <div className="rounded-2xl border border-amber-200 bg-amber-50/40 px-5 py-4 dark:border-amber-900/40 dark:bg-amber-950/10">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600 dark:text-amber-400" />
            <div className="w-full">
              <p className="text-[13.5px] font-black text-amber-800 dark:text-amber-300 uppercase tracking-wide mb-3">
                Credit consumption rules
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-white/70 border border-amber-100 px-4 py-3 dark:bg-amber-950/20 dark:border-amber-900/20">
                  <p className="text-[11px] font-black text-amber-700 dark:text-amber-300 uppercase tracking-wide mb-1">Standard GSM-7</p>
                  <p className="text-[14px] font-black text-amber-900 dark:text-amber-200">
                    Up to 160 chars = <span className="text-blue-600 dark:text-blue-400">1 credit</span>
                  </p>
                </div>
                <div className="rounded-xl bg-white/70 border border-amber-100 px-4 py-3 dark:bg-amber-950/20 dark:border-amber-900/20">
                  <p className="text-[11px] font-black text-amber-700 dark:text-amber-300 uppercase tracking-wide mb-1">Unicode / Emojis</p>
                  <p className="text-[14px] font-black text-amber-900 dark:text-amber-200">
                    Up to 70 chars = <span className="text-blue-600 dark:text-blue-400">1 credit</span>
                  </p>
                </div>
              </div>
              <p className="text-[12.5px] mt-3 text-amber-700 dark:text-amber-400 leading-relaxed">
                Emojis, special characters, and long messages split into multiple segments — consuming extra credits per recipient. Failed messages are automatically refunded to your wallet balance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SUCCESS */}
      <section id="credits-outcome">
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/40 px-5 py-4 dark:border-emerald-800/40 dark:bg-emerald-900/10">
          <CheckCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
          <div>
            <p className="text-[13.5px] font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-wide mb-0.5">Expected outcome</p>
            <p className="text-[13.5px] leading-relaxed text-emerald-700 dark:text-emerald-400 font-medium">
              Your SMS credit balance accurately reflects purchases and usage, ensuring uninterrupted outbound messaging across your GoHighLevel workspace.
            </p>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxSrc && (
        <ImageLightbox
          src={lightboxSrc}
          alt="Full size screenshot"
          onClose={() => setLightboxSrc(null)}
        />
      )}

    </div>
  );
};
