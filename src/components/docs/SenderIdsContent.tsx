import React, { useState, useEffect } from 'react';
import type { DocPage } from '../../data/docsData';
import {
  ShieldCheck,
  Clock,
  Check,
  X,
  CheckCheck,
  Maximize2,
  Settings,
  Shield,
  PlusCircle,
  Type,
  FileText,
  MessageSquare,
  Send,
  HelpCircle,
} from 'lucide-react';

// Import screenshot images for step-by-step workflow
import OpenSettingsPanelImg from '../../assets/Sender IDs/Open Settings Panel.png';
import ReviewSystemDefaultImg from '../../assets/Sender IDs/Review System Default.png';
import ClickAddSenderNameImg from '../../assets/Sender IDs/Click Add Sender Name.png';
import EnterRequestedSenderNameImg from '../../assets/Sender IDs/Enter Requested Sender Name.png';
import ProvideBusinessPurposeImg from '../../assets/Sender IDs/Provide Business Purpose.png';
import AddSampleMessageImg from '../../assets/Sender IDs/Add a Sample Message.png';
import SubmitForCarrierReviewImg from '../../assets/Sender IDs/Submit for Carrier Review.png';

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
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 flex items-center gap-1.5 text-white/80 hover:text-white text-[12px] font-semibold transition-colors"
        >
          <X className="h-4 w-4" />
          Close
        </button>
        {/* Image */}
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

/* ─── Standard Screenshot Card Frame ───────────────────── */
interface ScreenFrameProps {
  src: string;
  alt: string;
  title: string;
  onOpenLightbox: (src: string) => void;
}

const ScreenFrame: React.FC<ScreenFrameProps> = ({ src, alt, title, onOpenLightbox }) => {
  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070d18] shadow-sm w-full">
      {/* Browser Chrome Header */}
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

      {/* Screenshot — clickable */}
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

const statusLifecycle = [
  {
    stage: 'Default',
    label: 'NOLASMSPro',
    desc: 'Pre-approved system mask. Available immediately for all accounts.',
    color: 'emerald',
    available: true,
  },
  {
    stage: 'Pending',
    label: 'Under Review',
    desc: 'Carrier verification in progress. Not yet selectable in composer.',
    color: 'amber',
    available: false,
  },
  {
    stage: 'Approved',
    label: 'Active',
    desc: 'Carrier approved. Appears in Sender ID selection dropdown.',
    color: 'blue',
    available: true,
  },
  {
    stage: 'Rejected',
    label: 'Declined',
    desc: 'Carrier declined. Submit a new request with corrected details.',
    color: 'rose',
    available: false,
  },
];

const formatRules = [
  { rule: 'Max length', value: '11 characters', note: 'Strict carrier limit — no exceptions' },
  { rule: 'Allowed characters', value: 'A–Z, 0–9', note: 'Alphanumeric only — no symbols or spaces' },
  { rule: 'Case sensitivity', value: 'Case preserved', note: 'Displayed on handsets exactly as submitted' },
  { rule: 'Spaces', value: 'Not allowed', note: 'Carriers reject names containing spaces' },
];

export const SenderIdsContent: React.FC<Props> = ({ page }) => {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const openLightbox = (src: string) => setLightboxSrc(src);
  const closeLightbox = () => setLightboxSrc(null);

  const steps = [
    {
      title: 'Open Settings Panel',
      icon: Settings,
      color: 'text-slate-500',
      badge: 'Step 1',
      desc: 'From the NOLA SMS Pro navigation sidebar inside GoHighLevel, click Settings and select the Sender IDs tab.',
      details: [
        'Access your sender identity management workspace.',
        'View existing default masks and track active request statuses.',
      ],
      img: OpenSettingsPanelImg,
    },
    {
      title: 'Review System Default',
      icon: Shield,
      color: 'text-emerald-500',
      badge: 'Step 2',
      desc: 'Review the default pre-approved sender identity NOLASMSPro, which is active immediately for all new location accounts.',
      details: [
        'System default mask NOLASMSPro requires no prior carrier registration.',
        'Supports instant outbound text delivery right out of the box.',
      ],
      img: ReviewSystemDefaultImg,
    },
    {
      title: 'Click Add Sender Name',
      icon: PlusCircle,
      color: 'text-blue-500',
      badge: 'Step 3',
      desc: 'Click the "+ Add Sender Name" button to launch the custom Sender ID registration request modal.',
      details: [
        'Opens the step-by-step carrier submission form.',
        'Prepares your sub-account for custom alphanumeric brand header registration.',
      ],
      img: ClickAddSenderNameImg,
    },
    {
      title: 'Enter Requested Sender Name',
      icon: Type,
      color: 'text-purple-500',
      badge: 'Step 4',
      desc: 'Specify a name between 3 and 11 alphanumeric characters (letters and numbers only, no spaces or special symbols).',
      details: [
        'Strict 11-character limit enforced by Philippine mobile networks (Globe, Smart, DITO).',
        'Must closely match your business identity or registered trademark.',
      ],
      img: EnterRequestedSenderNameImg,
    },
    {
      title: 'Provide Business Purpose',
      icon: FileText,
      color: 'text-amber-500',
      badge: 'Step 5',
      desc: 'Briefly describe your intended operational use case (e.g., appointment reminders, promotional announcements, or transactional updates).',
      details: [
        'Helps network compliance teams verify legitimate business operations.',
        'Prevents registration rejections or spam filter blocks.',
      ],
      img: ProvideBusinessPurposeImg,
    },
    {
      title: 'Add a Sample Message',
      icon: MessageSquare,
      color: 'text-teal-500',
      badge: 'Step 6',
      desc: 'Enter a specific example of an SMS message your customers will receive using this branded Sender ID.',
      details: [
        'Example: "Hi John, your booking with NOLA Car Rental is confirmed for 2 PM. Reply STOP to opt out."',
        'Demonstrates clear copy formatting compliance to review auditors.',
      ],
      img: AddSampleMessageImg,
    },
    {
      title: 'Submit for Carrier Review',
      icon: Send,
      color: 'text-indigo-500',
      badge: 'Step 7',
      desc: 'Click Submit Request. Carrier verification takes 2–5 business days, and updates are sent via email.',
      details: [
        'Submits registration parameters to participating network review queues.',
        'Track pending status updates directly inside your Settings dashboard.',
      ],
      img: SubmitForCarrierReviewImg,
    },
  ];

  return (
    <div className="w-full space-y-12 pb-10">

      {/* INTRO */}
      <section id="sender-ids-intro" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">What this guide covers</h2>
        <p className="text-[14.5px] leading-7 text-slate-700 dark:text-slate-300">
          The Sender IDs module allows you to submit custom alphanumeric masks (up to 11 characters) that represent your business name to carriers, replacing generic gateway numbers.
        </p>
        <p className="text-[14.5px] leading-7 text-slate-700 dark:text-slate-300">
          Branded Sender IDs establish instant recipient trust, eliminate spam flags, and improve open rates for your SMS campaigns in the Philippines.
        </p>
      </section>

      {/* STATUS LIFECYCLE STRIP */}
      <section id="sender-ids-lifecycle" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Sender ID status lifecycle</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statusLifecycle.map((item) => {
            const colorMap: Record<string, { bg: string; badge: string; text: string }> = {
              emerald: {
                bg: 'border-emerald-200 bg-emerald-50/20 dark:border-emerald-900/40 dark:bg-emerald-950/10',
                badge: 'bg-emerald-500',
                text: 'text-emerald-800 dark:text-emerald-300',
              },
              amber: {
                bg: 'border-amber-200 bg-amber-50/20 dark:border-amber-900/40 dark:bg-amber-950/10',
                badge: 'bg-amber-400',
                text: 'text-amber-800 dark:text-amber-300',
              },
              blue: {
                bg: 'border-blue-200 bg-blue-50/20 dark:border-blue-900/40 dark:bg-blue-950/10',
                badge: 'bg-blue-500',
                text: 'text-blue-800 dark:text-blue-300',
              },
              rose: {
                bg: 'border-rose-200 bg-rose-50/20 dark:border-rose-900/40 dark:bg-rose-950/10',
                badge: 'bg-rose-500',
                text: 'text-rose-800 dark:text-rose-300',
              },
            };
            const c = colorMap[item.color];
            return (
              <div key={item.stage} className={`rounded-2xl border p-4 flex flex-col justify-between ${c.bg}`}>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[11px] font-black uppercase tracking-wider ${c.text}`}>{item.stage}</span>
                    <div className="flex items-center gap-1.5">
                      <span className={`h-2.5 w-2.5 rounded-full ${c.badge}`} />
                      {item.available ? (
                        <Check className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <X className="h-4.5 w-4.5 text-rose-500 dark:text-rose-400" />
                      )}
                    </div>
                  </div>
                  <p className={`text-[13.5px] font-black mb-1 ${c.text}`}>{item.label}</p>
                  <p className="text-[12.5px] leading-relaxed text-slate-500 dark:text-slate-400">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-2 text-[12.5px] text-slate-500 dark:text-slate-400 flex flex-wrap gap-x-4 gap-y-1">
          <span><Check className="inline h-3.5 w-3.5 text-emerald-500 mr-1" />Available in composer dropdown</span>
          <span><X className="inline h-3.5 w-3.5 text-rose-500 mr-1" />Not available for sending</span>
        </p>
      </section>

      {/* PREREQUISITE WARNING */}
      <section id="sender-ids-prerequisite">
        <div className="rounded-2xl border border-blue-200 dark:border-blue-900/40 border-l-4 border-l-blue-500 dark:border-l-blue-600 bg-gradient-to-br from-blue-50 to-sky-50/60 dark:from-[#060E1E] dark:to-[#0A1628] p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[13.5px] font-black text-slate-900 dark:text-white">Verification details required</p>
              <p className="text-[13.5px] leading-relaxed text-slate-700 dark:text-blue-250 mt-1">
                Your custom Sender Name must match your business identity or brand. Be prepared to provide supporting business details if requested by carrier review teams. The system automatically notifies you by email upon status updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* REQUEST STEPS WITH SCREENSHOT FRAMES */}
      <section id="sender-ids-request-steps" className="space-y-5">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Request workflow steps</h2>
        <div className="space-y-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#111827] hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 shadow-sm shadow-[#0F172A]/2 space-y-5"
              >
                {/* Screenshot on top */}
                <div className="w-full">
                  <ScreenFrame
                    src={step.img}
                    alt={step.title}
                    title={`${step.badge} — ${step.title}`}
                    onOpenLightbox={openLightbox}
                  />
                </div>

                {/* Header: Icon + Title */}
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/50">
                    <Icon className={`h-5 w-5 ${step.color}`} />
                  </div>
                  <h4 className="text-[16px] font-black text-slate-900 dark:text-white leading-tight">
                    {step.title}
                  </h4>
                </div>

                {/* Description */}
                <p className="text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-400 font-medium pl-1">
                  {step.desc}
                </p>

                {/* Bullet details */}
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

      {/* FORMAT RULES TABLE */}
      <section id="sender-ids-format-rules" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Sender ID format rules</h2>
        <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-[#111827] border-b border-slate-200 dark:border-slate-800">
                {['Rule', 'Value', 'Note'].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-[11px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {formatRules.map((row, idx) => (
                <tr key={row.rule} className={`border-b border-slate-100 dark:border-slate-900/50 ${idx % 2 === 0 ? 'bg-white dark:bg-[#0c1220]/20' : 'bg-slate-50/20 dark:bg-slate-900/20'}`}>
                  <td className="px-5 py-3.5 text-[13.5px] font-bold text-slate-900 dark:text-white">{row.rule}</td>
                  <td className="px-5 py-3.5 text-[13px] font-mono font-semibold text-blue-600 dark:text-blue-400">{row.value}</td>
                  <td className="px-5 py-3.5 text-[12.5px] text-slate-500 dark:text-slate-400">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex items-start gap-2.5">
          <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" />
          <p className="text-[13.5px] leading-relaxed text-slate-500 dark:text-slate-400">
            Carrier review typically takes <strong>2–5 business days</strong> depending on participating network provider queues.
          </p>
        </div>
      </section>

      {/* SUCCESS OUTCOME */}
      <section id="sender-ids-outcome">
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/40 px-5 py-4 dark:border-emerald-800/40 dark:bg-emerald-900/10">
          <CheckCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
          <div>
            <p className="text-[13.5px] font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-wide mb-0.5">Expected outcome</p>
            <p className="text-[13.5px] leading-relaxed text-emerald-700 dark:text-emerald-400 font-medium">
              Once approved by local networks, your custom Sender ID becomes available as a selectable identity in the Compose SMS panel.
            </p>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxSrc && (
        <ImageLightbox
          src={lightboxSrc}
          alt="Full size screenshot"
          onClose={closeLightbox}
        />
      )}

    </div>
  );
};
