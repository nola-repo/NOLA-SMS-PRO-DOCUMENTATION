import React, { useState, useEffect } from 'react';
import type { DocPage } from '../../data/docsData';
import {
  Edit3,
  BookOpen,
  Tag,
  FolderOpen,
  AlertTriangle,
  CheckCheck,
  Smartphone,
  Maximize2,
  X,
  Monitor,
  Send,
} from 'lucide-react';

import MessageTemplatesImg from '../../assets/Dashboard Overview/Message Templates.png';

// ─── Asset Imports for Templates Workflows ────────────────────────────────────
import OpenTemplatesPanelImg from '../../assets/Message Templates/Open Templates Panel.png';
import ClickAddTemplateImg from '../../assets/Message Templates/Click Add Template.png';
import SetNameCategoryImg from '../../assets/Message Templates/Set Name & Category.png';
import InsertVariableTagsImg from '../../assets/Message Templates/Insert Variable Tags.png';
import SaveDeployImg from '../../assets/Message Templates/Save & Deploy.png';
import ClickQuickSendIconImg from '../../assets/Message Templates/Click Quick Send Icon.png';
import SelectRecipientVerifyImg from '../../assets/Message Templates/Select Recipient & Verify.png';

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

const bestPractices = [
  {
    icon: <Tag className="h-5 w-5 text-amber-500" />,
    title: 'Placeholders & Interpolation',
    desc: 'Use standard merge tags ({{contact.name}}, {{contact.first_name}}, {{contact.email}}, {{contact.phone}}, {{company.name}}) to populate CRM customer data dynamically on dispatch.',
  },
  {
    icon: <FolderOpen className="h-5 w-5 text-blue-500" />,
    title: 'Category Filters & Live Preview',
    desc: 'Sort templates by context (General, Appointments, Transactional, Marketing) and preview handset formatting in real-time via the built-in phone simulator.',
  },
  {
    icon: <BookOpen className="h-5 w-5 text-emerald-500" />,
    title: '12 Pre-built Blueprints',
    desc: 'Leverage 12 pre-loaded templates for appointment reminders, welcome messages, order confirmations, review requests, and promotional offers for instant dispatch.',
  },
];

export const MessageTemplatesContent: React.FC<Props> = ({ page }) => {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const createSteps = [
    {
      badge: 'Step 1',
      title: 'Open Templates Panel',
      icon: FolderOpen,
      color: 'text-amber-500',
      img: OpenTemplatesPanelImg,
      alt: 'Open Templates Panel',
      desc: 'Select Templates from the NOLA SMS Pro navigation sidebar menu.',
      details: [
        'Access your saved custom templates and system blueprints.',
        'Filter templates by category or search by keywords.',
      ],
    },
    {
      badge: 'Step 2',
      title: 'Click Add Template',
      icon: Edit3,
      color: 'text-blue-500',
      img: ClickAddTemplateImg,
      alt: 'Click Add Template',
      desc: 'Click the "+ Add Template" button to open the template creation designer modal.',
      details: [
        'Opens the standard layout configuration wizard.',
        'Prepares fields for name, category, and dynamic message copy.',
      ],
    },
    {
      badge: 'Step 3',
      title: 'Set Name & Category',
      icon: Tag,
      color: 'text-purple-500',
      img: SetNameCategoryImg,
      alt: 'Set Name & Category',
      desc: 'Enter a descriptive template title and assign a category (General, Appointments, Transactional, or Marketing).',
      details: [
        'Categorization simplifies filtering during quick outbox compose selection.',
        'Descriptive names help team members identify intent immediately.',
      ],
    },
    {
      badge: 'Step 4',
      title: 'Insert Variable Tags',
      icon: BookOpen,
      color: 'text-teal-500',
      img: InsertVariableTagsImg,
      alt: 'Insert Variable Tags',
      desc: 'Use the Variables helper to insert placeholders like {{contact.first_name}} or {{company.name}} into your copy.',
      details: [
        'Placeholders dynamically resolve to contact attributes upon dispatch.',
        'Prevents manual typing of customer names and details.',
      ],
    },
    {
      badge: 'Step 5',
      title: 'Save & Deploy',
      icon: CheckCheck,
      color: 'text-emerald-500',
      img: SaveDeployImg,
      alt: 'Save & Deploy',
      desc: 'Click Save Template. The entry is stored immediately and populated across your outbox dropdowns.',
      details: [
        'Saved templates become accessible in single and bulk compose modes.',
        'Updates propagate instantly to all sub-account operators.',
      ],
    },
  ];

  const quickSendSteps = [
    {
      badge: 'Step 1',
      title: 'Click Quick Send Icon',
      icon: Send,
      color: 'text-blue-600',
      img: ClickQuickSendIconImg,
      alt: 'Click Quick Send Icon',
      desc: 'Click the Send paper airplane icon next to any template row in your library.',
      details: [
        'Bypasses full outbox composer for fast single-contact dispatches.',
        'Opens recipient lookup overlay.',
      ],
    },
    {
      badge: 'Step 2',
      title: 'Select Recipient & Verify',
      icon: Smartphone,
      color: 'text-emerald-500',
      img: SelectRecipientVerifyImg,
      alt: 'Select Recipient & Verify',
      desc: 'Search for a recipient, inspect resolved variable text, and click Send to dispatch instantly.',
      details: [
        'Auto-fills contact variables before sending.',
        'Debits SMS credits and logs dispatch in message history.',
      ],
    },
  ];

  return (
    <div className="w-full space-y-12 pb-10">

      {/* INTRO */}
      <section id="templates-intro" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">What this guide covers</h2>
        <p className="text-[14.5px] leading-7 text-slate-700 dark:text-slate-300">
          Templates let you build and organize reusable text messages to standardise client interactions, maintain formatting compliance, and eliminate repetitive typing.
        </p>
        <p className="text-[14.5px] leading-7 text-slate-700 dark:text-slate-300">
          Incorporate dynamic merge fields like <code className="text-[12px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono">{'{{contact.first_name}}'}</code> that automatically resolve to CRM recipient details upon dispatch.
        </p>
      </section>

      {/* SCREENSHOT OVERVIEW */}
      <section id="templates-screenshot" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Templates workspace overview</h2>
        <ScreenFrame
          src={MessageTemplatesImg}
          alt="Message Templates Workspace"
          title="Templates Library"
          onOpenLightbox={(src) => setLightboxSrc(src)}
        />
      </section>

      {/* KEY CAPABILITIES */}
      <section id="templates-best-practices" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Key capabilities</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {bestPractices.map((item) => (
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

      {/* WORKFLOWS SECTION WITH CLEAR SEPARATIONS */}
      <section id="templates-workflows" className="space-y-12">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Template workflows</h2>

        {/* WORKFLOW A: CREATE A TEMPLATE */}
        <div id="templates-create-workflow" className="space-y-6">
          {/* Section Banner */}
          <div className="flex items-center gap-4 rounded-2xl border border-blue-200 dark:border-blue-900/50 bg-gradient-to-r from-blue-50 to-sky-50/60 dark:from-blue-950/30 dark:to-slate-900/40 px-5 py-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-800/50">
              <Edit3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <span className="inline-block text-[10px] font-black uppercase tracking-[0.15em] text-blue-500 dark:text-blue-400 mb-0.5">Workflow A</span>
              <h3 className="text-[17px] font-black text-slate-900 dark:text-white leading-tight">Create a template steps</h3>
            </div>
          </div>

          <div className="space-y-8">
            {createSteps.map((step, idx) => {
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
                      {step.badge}: {step.title}
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
        </div>

        {/* VISUAL DIVIDER */}
        <div className="flex items-center gap-4 py-2">
          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
          <span className="flex-shrink-0 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1 text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            or use
          </span>
          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
        </div>

        {/* WORKFLOW B: QUICK SEND */}
        <div id="templates-quicksend-workflow" className="space-y-6">
          {/* Section Banner */}
          <div className="flex items-center gap-4 rounded-2xl border border-purple-200 dark:border-purple-900/50 bg-gradient-to-r from-purple-50 to-indigo-50/60 dark:from-purple-950/30 dark:to-slate-900/40 px-5 py-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/40 border border-purple-200 dark:border-purple-800/50">
              <Send className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <span className="inline-block text-[10px] font-black uppercase tracking-[0.15em] text-purple-500 dark:text-purple-400 mb-0.5">Workflow B</span>
              <h3 className="text-[17px] font-black text-slate-900 dark:text-white leading-tight">Quick Send steps</h3>
            </div>
          </div>

          <div className="space-y-8">
            {quickSendSteps.map((step, idx) => {
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
                      {step.badge}: {step.title}
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
        </div>
      </section>

      {/* WARNING */}
      <section id="templates-warning">
        <div className="flex items-start gap-3.5 rounded-xl border border-amber-200 bg-amber-50/40 px-5 py-4 dark:border-amber-900/40 dark:bg-amber-950/10">
          <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600 dark:text-amber-400" />
          <div>
            <p className="text-[13.5px] font-black text-amber-800 dark:text-amber-300 uppercase tracking-wide mb-1">
              Formatting &amp; Copy Validation
            </p>
            <p className="text-[13px] leading-relaxed text-amber-700 dark:text-amber-400 font-medium">
              Templates should contain valid text copy and dynamic tags. Generic or blank content will fail verification checks. Keep placeholders aligned with synced HighLevel contact parameters.
            </p>
          </div>
        </div>
      </section>

      {/* SUCCESS */}
      <section id="templates-outcome">
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/40 px-5 py-4 dark:border-emerald-800/40 dark:bg-emerald-900/10">
          <CheckCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
          <div>
            <p className="text-[13.5px] font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-wide mb-0.5">Expected outcome</p>
            <p className="text-[13.5px] leading-relaxed text-emerald-700 dark:text-emerald-400 font-medium">
              Saved templates appear instantly in your compose outbox dropdown, allowing your team to dispatch consistent, personalized text messages across single and bulk outreach views.
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
