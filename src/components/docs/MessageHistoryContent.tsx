import React, { useState, useEffect } from 'react';
import type { DocPage } from '../../data/docsData';
import {
  History,
  Lightbulb,
  CheckCheck,
  Filter,
  MessageSquare,
  List,
  RefreshCw,
  Maximize2,
  X,
  Monitor,
  Search,
  CheckCircle2,
} from 'lucide-react';

import DirectBulkImg from '../../assets/Dashboard Overview/Direct & Bulk Messages.png';

// ─── Asset Imports for Message History ────────────────────────────────────────
import LocateConversationsImg from '../../assets/Message History/Locate Conversations.png';
import OpenThreadDetailsImg from '../../assets/Message History/Open Thread Details.png';
import CheckDeliveryReceiptsImg from '../../assets/Message History/Check Delivery Receipts.png';
import TroubleshootFailuresImg from '../../assets/Message History/Troubleshoot Failures.png';

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

const statusLegend = [
  {
    badge: 'Sending',
    dot: 'bg-amber-500',
    desc: 'Message is queued on the backend and currently being transmitted to carrier gateways.',
  },
  {
    badge: 'Sent',
    dot: 'bg-emerald-500',
    desc: 'Successfully dispatched through carrier gateways and delivered to recipient mobile handset.',
  },
  {
    badge: 'Failed',
    dot: 'bg-rose-500',
    desc: 'Delivery aborted. Click the message entry to view specific diagnostic error responses.',
  },
];

const auditTracks = [
  {
    icon: <MessageSquare className="h-5 w-5 text-blue-500" />,
    title: 'Direct Chat Outbox Timeline',
    desc: 'Select any contact in the sidebar. Outbound message bubbles appear chronologically in the chat feed timeline, labeled with active status tags.',
  },
  {
    icon: <List className="h-5 w-5 text-purple-500" />,
    title: 'Bulk Messages Feed',
    desc: 'Expand the Bulk Messages tree in the sidebar. Clicking any campaign loads its summary dashboard in the composer, detailing total, sent, failed, and skipped statistics.',
  },
  {
    icon: <RefreshCw className="h-5 w-5 text-emerald-500" />,
    title: 'Automated Status Sync',
    desc: 'Outbox logs sync status receipts automatically in the background. Direct chat feeds support pull-to-refresh to fetch updates instantly.',
  },
];

export const MessageHistoryContent: React.FC<Props> = ({ page }) => {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const auditSteps = [
    {
      badge: 'Step 1',
      title: 'Locate Conversations',
      icon: Search,
      color: 'text-blue-500',
      img: LocateConversationsImg,
      alt: 'Locate Conversations',
      desc: 'Use the left sidebar search or expand the Direct/Bulk Message sections to locate past messaging logs.',
      details: [
        'Search by contact name, mobile number, or campaign title.',
        'View conversation previews showing last message timestamps.',
      ],
    },
    {
      badge: 'Step 2',
      title: 'Open Thread Details',
      icon: MessageSquare,
      color: 'text-purple-500',
      img: OpenThreadDetailsImg,
      alt: 'Open Thread Details',
      desc: 'Click the contact name or bulk campaign row to load logs inside the active outbox pane.',
      details: [
        'Displays full message copy, timestamp, and active status tags.',
        'Renders Sender ID mask used for dispatch.',
      ],
    },
    {
      badge: 'Step 3',
      title: 'Check Delivery Receipts',
      icon: CheckCircle2,
      color: 'text-emerald-500',
      img: CheckDeliveryReceiptsImg,
      alt: 'Check Delivery Receipts',
      desc: 'Observe the color-coded status badges next to message logs (Sending, Sent, or Failed).',
      details: [
        'Sent status (green badge) confirms carrier dispatch and handset delivery.',
        'Confirms credit segment charges.',
      ],
    },
    {
      badge: 'Step 4',
      title: 'Troubleshoot Failures',
      icon: Filter,
      color: 'text-rose-500',
      img: TroubleshootFailuresImg,
      alt: 'Troubleshoot Failures',
      desc: 'For undelivered rows, click the message bubble to open the diagnostic window displaying error responses.',
      details: [
        'Exposes carrier error codes (e.g. invalid phone format, credit zero balance).',
        'Helps clean invalid contact numbers from CRM databases.',
      ],
    },
  ];

  return (
    <div className="w-full space-y-12 pb-10">

      {/* INTRO */}
      <section id="history-intro" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">What this guide covers</h2>
        <p className="text-[14.5px] leading-7 text-slate-700 dark:text-slate-300">
          NOLA SMS Pro logs all outbound text campaigns. Rather than hosting history on a detached logs page, message status history is integrated directly inside your active chat timelines and bulk campaign feeds.
        </p>
        <p className="text-[14.5px] leading-7 text-slate-700 dark:text-slate-300">
          Monitor delivery receipts, review credit segment costs, and inspect carrier error codes directly next to contact CRM files.
        </p>
      </section>

      {/* SCREENSHOT OVERVIEW */}
      <section id="history-screenshot" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Outbox &amp; conversations feed</h2>
        <ScreenFrame
          src={DirectBulkImg}
          alt="Direct and Bulk Messages Outbox Feed"
          title="Messages — Direct & Bulk Feed"
          onOpenLightbox={(src) => setLightboxSrc(src)}
        />
      </section>

      {/* HOW HISTORY IS LOGGED */}
      <section id="history-audit-tracks" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">How history is logged</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {auditTracks.map((item) => (
            <div key={item.title} className="premium-card flex flex-col justify-between h-full">
              <div>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                  {item.icon}
                </div>
                <h3 className="text-[14px] font-black text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                  {item.title}
                </h3>
                <p className="text-[12.5px] leading-relaxed text-slate-500 dark:text-slate-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STATUS LEGEND */}
      <section id="history-status-legend" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Delivery status reference</h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 w-full">
          {statusLegend.map((item) => (
            <div key={item.badge} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#111827] shadow-sm flex items-start gap-3">
              <span className={`mt-1.5 h-2.5 w-2.5 rounded-full flex-shrink-0 ${item.dot}`} />
              <div>
                <p className="text-[13.5px] font-black text-slate-900 dark:text-white uppercase tracking-wider mb-1">
                  {item.badge}
                </p>
                <p className="text-[12.5px] leading-relaxed text-slate-500 dark:text-slate-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AUDIT WORKFLOW STEPS */}
      <section id="history-audit-steps" className="space-y-5">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Auditing past campaigns steps</h2>
        <div className="space-y-8">
          {auditSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#111827] hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 shadow-sm shadow-[#0F172A]/2 space-y-5"
              >
                <div className="w-full">
                  <ScreenFrame
                    src={step.img}
                    alt={step.alt}
                    title={`${step.badge} — ${step.title}`}
                    onOpenLightbox={(src) => setLightboxSrc(src)}
                  />
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

      {/* CACHING TIP */}
      <section id="history-cache-tip">
        <div className="rounded-2xl border border-blue-200 dark:border-blue-900/40 border-l-4 border-l-blue-500 dark:border-l-blue-600 bg-gradient-to-br from-blue-50 to-sky-50/60 dark:from-[#060E1E] dark:to-[#0A1628] p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <Lightbulb className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-[13.5px] font-black text-blue-800 dark:text-blue-300 uppercase tracking-wide mb-1">
                Background Status Refresh
              </p>
              <p className="text-[13.5px] leading-relaxed text-slate-700 dark:text-blue-200">
                Historical logs cache locally for fast offline browsing. A background status worker queries carrier gateways every few minutes to update pending/queued statuses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SUCCESS */}
      <section id="history-outcome">
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/40 px-5 py-4 dark:border-emerald-800/40 dark:bg-emerald-900/10">
          <CheckCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
          <div>
            <p className="text-[13.5px] font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-wide mb-0.5">Expected outcome</p>
            <p className="text-[13.5px] leading-relaxed text-emerald-700 dark:text-emerald-400 font-medium">
              Operators can audit all outbox logs from within GHL synced direct chat panels or bulk message groups, ensuring complete visibility over delivery receipts and billing transparency.
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
