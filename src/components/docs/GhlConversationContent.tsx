import React, { useState, useEffect } from 'react';
import type { DocPage } from '../../data/docsData';
import {
  MessageSquare,
  RefreshCw,
  X,
  Check,
  CheckCheck,
  Lightbulb,
  Maximize2,
  Monitor,
  Send,
  Users,
} from 'lucide-react';

import DirectBulkImg from '../../assets/Dashboard Overview/Direct & Bulk Messages.png';
import GhlTimelineImg from '../../assets/GHL Conversation/GoHighLevel Conversations Timeline.png';

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

export const GhlConversationContent: React.FC<Props> = ({ page }) => {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const syncSteps = [
    {
      badge: 'Step 1',
      title: 'Send a Message',
      icon: Send,
      color: 'text-blue-500',
      desc: 'Compose and dispatch a text segment using NOLA SMS Pro outbox.',
      details: [
        'Dispatch an outbound text message to a contact in your synced directory.',
        'Verifies initial carrier handoff.',
      ],
    },
    {
      badge: 'Step 2',
      title: 'Open Conversations Tab',
      icon: MessageSquare,
      color: 'text-purple-500',
      desc: 'In the left sidebar of your GoHighLevel dashboard, select the Conversations tab.',
      details: [
        'Navigates to HighLevel native multi-channel conversations inbox.',
        'Access active conversation streams.',
      ],
    },
    {
      badge: 'Step 3',
      title: 'Locate Recipient Profile',
      icon: Users,
      color: 'text-amber-500',
      desc: 'Search for the test recipient contact name in the active chat list.',
      details: [
        'Select the contact thread to view detailed history.',
        'Confirms bi-directional contact binding.',
      ],
    },
    {
      badge: 'Step 4',
      title: 'Confirm Timeline Appends',
      icon: CheckCheck,
      color: 'text-emerald-500',
      desc: 'Confirm the SMS content is appended as an outbound record with active status receipts.',
      details: [
        'Sent messages log within seconds.',
        'Status indicators verify successful carrier routing.',
      ],
    },
  ];

  return (
    <div className="w-full space-y-12 pb-10">

      {/* INTRO */}
      <section id="ghl-conversation-intro" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">What this guide covers</h2>
        <p className="text-[14.5px] leading-7 text-slate-700 dark:text-slate-300">
          Synchronize outbound SMS messages automatically with GoHighLevel's native conversations timeline to preserve complete audit trails across your team.
        </p>
        <p className="text-[14.5px] leading-7 text-slate-700 dark:text-slate-300">
          Eliminates tab fatigue and double-entry, giving support and sales agents a single source of truth inside HighLevel CRM.
        </p>
      </section>

      {/* SCREENSHOT OVERVIEW */}
      <section id="ghl-conversation-screenshot" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">GHL conversation sync feed</h2>
        <ScreenFrame
          src={GhlTimelineImg}
          alt="GHL Conversation Timeline Sync"
          title="GoHighLevel Conversations Timeline"
          onOpenLightbox={(src) => setLightboxSrc(src)}
        />
      </section>

      {/* COMPARISON */}
      <section id="ghl-conversation-comparison" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Manual tracking vs. native real-time sync</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-rose-200 bg-rose-50/20 p-5 dark:border-rose-900/20 dark:bg-rose-950/5">
            <h4 className="mb-3 text-[12px] font-black text-rose-700 dark:text-rose-400 uppercase tracking-wider flex items-center gap-2">
              <X className="h-4 w-4" /> Without native sync
            </h4>
            <ul className="space-y-2.5">
              {[
                'Outbox history only exists in the sending app — no team visibility.',
                'Copy/paste message bodies into client profiles manually after every send.',
                'Support agents send duplicate replies due to tab blindspots.',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-[13px] leading-5 text-slate-600 dark:text-slate-400">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-rose-400 dark:bg-rose-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/20 p-5 dark:border-emerald-900/20 dark:bg-emerald-950/5 shadow-sm">
            <h4 className="mb-3 text-[12px] font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <Check className="h-4 w-4" /> With NOLA SMS Pro sync
            </h4>
            <ul className="space-y-2.5">
              {[
                'Background worker pushes sent messages to HighLevel within seconds.',
                'Messages automatically append to the active contact conversation timeline.',
                'All agents see the exact customer thread — no duplicates, no blindspots.',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-[13px] leading-5 text-slate-800 dark:text-slate-300">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PREREQUISITES */}
      <section id="ghl-conversation-prerequisites" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Before you begin</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              icon: <MessageSquare className="h-5 w-5 text-blue-500" />,
              label: 'GHL Scopes Consent',
              detail: 'Marketplace authorization permissions must include conversation write and read access.',
            },
            {
              icon: <RefreshCw className="h-5 w-5 text-emerald-500" />,
              label: 'Active Location API',
              detail: 'An active location API connection is required for background synchronization.',
            },
          ].map((item) => (
            <div key={item.label} className="premium-card flex flex-col justify-between h-full">
              <div>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                  {item.icon}
                </div>
                <h3 className="text-[15px] font-black text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                  {item.label}
                </h3>
                <p className="text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SYNC VERIFICATION STEPS */}
      <section id="ghl-conversation-sync-steps" className="space-y-5">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Verification steps</h2>
        <div className="space-y-8">
          {syncSteps.map((step, idx) => {
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

      {/* HEALTH TIPS */}
      <section id="ghl-conversation-health" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Sync health tips</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { title: 'Deduplication', tip: 'NOLA SMS Pro applies a unique message ID deduplication index to avoid duplicate logs when re-sending a failed message.' },
            { title: 'Sync Latency', tip: 'Most timelines update within 2–5 seconds. If logs do not appear, verify your location connection status in Settings.' },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3 rounded-2xl border border-blue-200 dark:border-blue-900/40 bg-gradient-to-br from-blue-50 to-sky-50/60 dark:from-[#060E1E] dark:to-[#0A1628] px-5 py-4 shadow-sm">
              <Lightbulb className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-[13.5px] font-black text-blue-900 dark:text-white mb-0.5">{item.title}</p>
                <p className="text-[13px] leading-relaxed text-slate-700 dark:text-blue-200">{item.tip}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SUCCESS */}
      <section id="ghl-conversation-outcome">
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/40 px-5 py-4 dark:border-emerald-800/40 dark:bg-emerald-900/10">
          <CheckCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
          <div>
            <p className="text-[13.5px] font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-wide mb-0.5">Expected outcome</p>
            <p className="text-[13.5px] leading-relaxed text-emerald-700 dark:text-emerald-400 font-medium">
              All outgoing text logs synchronize immediately to the central HighLevel outbox, providing your sales and support teams with a single source of truth.
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
