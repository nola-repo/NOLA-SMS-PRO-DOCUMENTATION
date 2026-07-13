import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useNavigationType } from 'react-router-dom';
import type { DocPage, ScreenshotPlan } from '../data/docsData';
import { docsData, sidebarStructure } from '../data/docsData';
import { TipBox, InfoBox, WarningBox } from './Callouts';
import { Accordion } from './Accordion';
import { InteractiveChecklist } from './InteractiveChecklist';
import { ScreenshotPlaceholder } from './ScreenshotPlaceholder';
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  ChevronRight,
  CreditCard,
  FileText,
  HelpCircle,
  History,
  LayoutDashboard,
  Lightbulb,
  ListChecks,
  MessageSquare,
  Send,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Store,
  UserPlus,
  Users,
  Wrench,
  X,
} from 'lucide-react';

const textWidth = 'w-full';
const panelWidth = 'w-full';

interface Props {
  page: DocPage;
}

type ScreenshotMode = 'large' | 'medium' | 'comparison';
type LessonKind = 'step' | 'issue' | 'faq';

interface Lesson {
  id: string;
  number: number;
  kind: LessonKind;
  title: string;
  description: string;
  body: string;
  category: string;
  estimatedTime: string;
  difficulty: string;
  required: boolean;
  screenshot?: ScreenshotPlan;
}

function getScreenshotMode(page: DocPage, screenshot: ScreenshotPlan, index: number): ScreenshotMode {
  const text = `${page.id} ${screenshot.caption} ${screenshot.alt}`.toLowerCase();

  if (page.id === 'sender-id' && (text.includes('status') || index === 2)) return 'comparison';
  if (text.includes('history') || text.includes('dashboard') || text.includes('contacts list') || text.includes('credits-history')) return 'large';
  if (text.includes('form') || text.includes('settings') || text.includes('account') || text.includes('sender')) return 'medium';
  return index === 0 ? 'large' : 'medium';
}

function getJourneyTitle(page: DocPage) {
  if (page.id === 'welcome') return 'Product Overview';
  if (page.section === 'Getting Started') return 'Complete Setup Journey';
  if (page.section === 'Using NOLA SMS Pro') return 'Product Walkthrough';
  if (page.section === 'Troubleshooting') return 'Troubleshooting Path';
  if (page.section === 'FAQ') return 'Quick Answer Library';
  if (page.section === 'Support') return 'Support Readiness';
  return 'Your Learning Journey';
}

function getDifficulty(page: DocPage, index: number, kind: LessonKind) {
  if (kind === 'issue') return 'Diagnostic';
  if (kind === 'faq') return 'Quick read';
  if (page.section === 'Getting Started' || index < 2) return 'Beginner';
  if (page.section === 'Troubleshooting') return 'Diagnostic';
  return 'Guided';
}

function cleanSentence(text: string) {
  return text.trim().replace(/\.$/, '');
}

function createStepTitle(step: string) {
  const cleaned = cleanSentence(step);
  const colonIndex = cleaned.indexOf(': ');
  if (colonIndex > 0 && colonIndex < 44) return cleaned.slice(0, colonIndex);

  const words = cleaned.split(/\s+/);
  if (words.length <= 6) return cleaned;
  return words.slice(0, 6).join(' ');
}

function createStepDescription(step: string) {
  const cleaned = cleanSentence(step);
  const words = cleaned.split(/\s+/);
  if (words.length <= 10) return step;
  return `${words.slice(0, 18).join(' ')}${words.length > 18 ? '...' : ''}`;
}

function getLessons(page: DocPage): Lesson[] {
  const source =
    page.commonIssues?.map((issue) => {
      const colonIndex = issue.indexOf(': ');
      return {
        kind: 'issue' as const,
        title: colonIndex > -1 ? issue.slice(0, colonIndex) : createStepTitle(issue),
        body: colonIndex > -1 ? issue.slice(colonIndex + 2) : issue,
      };
    }) ??
    page.steps?.map((step) => ({ kind: 'step' as const, title: createStepTitle(step), body: step })) ??
    page.faqs?.map((faq) => ({ kind: 'faq' as const, title: faq.q, body: faq.a })) ??
    [];

  const totalMinutes = Math.max(1, Number.parseInt(page.readingTime, 10) || source.length || 1);
  const perLessonMinutes = Math.max(1, Math.ceil(totalMinutes / Math.max(source.length, 1)));

  return source.map((item, index) => ({
    id: `${page.id}-lesson-${index + 1}`,
    number: index + 1,
    kind: item.kind,
    title: item.title,
    description: item.kind === 'step' ? createStepDescription(item.body) : item.body,
    body: item.body,
    category: page.subsection ?? page.section,
    estimatedTime: `${perLessonMinutes} min`,
    difficulty: getDifficulty(page, index, item.kind),
    required: item.kind !== 'faq',
    screenshot: page.screenshots?.[Math.min(page.screenshots.length - 1, Math.floor(index / Math.max(1, Math.ceil(source.length / Math.max(page.screenshots?.length ?? 1, 1)))))]
  }));
}

const SectionHeading: React.FC<{ children: React.ReactNode; eyebrow?: string }> = ({ children, eyebrow }) => (
  <div className="mb-4 mt-9 first:mt-0">
    {eyebrow && (
      <p className="mb-2 text-[11px] font-black uppercase tracking-[0.16em] text-[#1F5AAE] dark:text-[#72A8FF]">
        {eyebrow}
      </p>
    )}
    <h2 className="text-[22px] font-black leading-tight text-[#0B2E63] dark:text-white md:text-[26px]">
      {children}
    </h2>
  </div>
);

const pageIconMap = {
  welcome: BookOpen,
  'marketplace-install': Store,
  'account-access': UserPlus,
  'dashboard-overview': LayoutDashboard,
  'first-sms-checklist': Send,
  contacts: Users,
  templates: FileText,
  'sender-id': ShieldCheck,
  'sms-credits': CreditCard,
  'message-history': History,
  settings: Settings,
  troubleshooting: Wrench,
  faq: HelpCircle,
} satisfies Record<string, React.ComponentType<{ className?: string }>>;

function getPageIcon(page: DocPage) {
  if (pageIconMap[page.id as keyof typeof pageIconMap]) {
    return pageIconMap[page.id as keyof typeof pageIconMap];
  }

  if (page.section === 'Troubleshooting') return ShieldAlert;
  if (page.section === 'FAQ') return HelpCircle;
  if (page.section === 'Using NOLA SMS Pro') return MessageSquare;
  return BookOpen;
}

const StickyPageHeader: React.FC<{ page: DocPage }> = ({ page }) => {
  const Icon = getPageIcon(page);

  return (
    <header className={`${textWidth} sticky top-[65px] z-20 mb-6 lg:top-0 -mx-4 sm:-mx-7 lg:-mx-10 w-[calc(100%+2rem)] sm:w-[calc(100%+3.5rem)] lg:w-[calc(100%+5rem)]`}>
      <div className="relative isolate overflow-hidden rounded-b-[34px] border border-[#4F8EF7]/35 px-5 py-6 text-white shadow-xl shadow-[#184B8F]/18 dark:border-[#72A8FF]/25 dark:shadow-[#020817]/30 sm:px-8 sm:py-7 lg:px-10 w-full box-border">
        {/* Smooth gradient background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#4F8EF7] via-[#3B7FE0] to-[#1F5AAE]" />
        
        {/* Subtle top highlight for depth */}
        <div className="absolute inset-x-0 top-0 -z-10 h-12 bg-gradient-to-b from-white/15 to-transparent" />
        
        {/* Subtle bottom shadow for depth */}
        <div className="absolute inset-x-0 bottom-0 -z-10 h-16 bg-gradient-to-t from-[#0b3a8a]/30 to-transparent" />

        <div className="max-w-[900px]">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border border-white/30 bg-white/14 text-white shadow-lg shadow-[#07111F]/10 backdrop-blur-sm sm:h-16 sm:w-16">
              <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
            </div>

            <div className="min-w-0">
              <h1 className="max-w-[760px] text-[28px] font-black leading-[1.05] text-white sm:text-[34px] lg:text-[38px]">
                {page.title}
              </h1>
            </div>
          </div>

          <p className="mt-2 max-w-[780px] text-[14px] font-medium leading-6 text-[#E8F3FF] sm:ml-[88px] sm:text-[15px]">
            {page.description}
          </p>
        </div>
      </div>
    </header>
  );
};

const welcomeFeatureNote = 'You do not need to download a separate desktop or mobile app.';

interface WelcomeFeature {
  title: string;
  description: string;
  docId: string;
  filename: string;
  alt: string;
}

const welcomeFeatures: WelcomeFeature[] = [
  {
    title: 'HighLevel Contacts',
    description: 'Use contacts from the connected HighLevel sub-account when choosing SMS recipients.',
    docId: 'contacts',
    filename: '/images/docs/contacts-list.png',
    alt: 'Contacts list inside NOLA SMS Pro.'
  },
  {
    title: 'SMS Templates',
    description: 'Save reusable message wording and insert templates when composing customer texts.',
    docId: 'templates',
    filename: '/images/docs/templates-list.png',
    alt: 'Templates list inside NOLA SMS Pro.'
  },
  {
    title: 'Sender IDs',
    description: 'Send with the default NOLASMSPro sender or request an approved custom Sender ID.',
    docId: 'sender-id',
    filename: '/images/docs/sender-id-default.png',
    alt: 'Sender ID screen showing NOLASMSPro as the default sender.'
  },
  {
    title: 'SMS Credits',
    description: 'Check your balance, request more credits, and review recent credit activity.',
    docId: 'sms-credits',
    filename: '/images/docs/credits-balance.png',
    alt: 'SMS credit balance inside NOLA SMS Pro.'
  },
  {
    title: 'Message History',
    description: 'Track each message after sending with clear Sending, Sent, and Failed statuses.',
    docId: 'message-history',
    filename: '/images/docs/message-history-list.png',
    alt: 'Message History list showing message statuses.'
  },
  {
    title: 'Settings',
    description: 'Review profile details, connected location, notifications, Sender IDs, and credits.',
    docId: 'settings',
    filename: '/images/docs/settings-profile.png',
    alt: 'Profile settings in NOLA SMS Pro.'
  },
  {
    title: 'Dashboard Activity',
    description: 'See SMS credits, recent activity, alerts, and shortcuts from the dashboard home.',
    docId: 'dashboard-overview',
    filename: '/images/docs/dashboard-overview-home.png',
    alt: 'NOLA SMS Pro dashboard home showing credits, activity, alerts, and navigation.'
  },
  {
    title: 'SMS Compose',
    description: 'Send individual or bulk SMS from inside the connected HighLevel location.',
    docId: 'first-sms-checklist',
    filename: '/images/docs/compose-first-sms.png',
    alt: 'Compose screen with one SMS message ready to send.'
  }
];

const FeatureImagePlaceholder: React.FC<{ title: string; alt: string; filename: string; withOverlay?: boolean }> = ({
  title,
  alt,
  filename,
  withOverlay = false,
}) => (
  <div
    className="relative flex min-h-[260px] flex-1 overflow-hidden rounded-lg border border-[#D7E7FA] bg-[#E8F3FF] dark:border-[#183354] dark:bg-[#0B1627]"
    role="img"
    aria-label={alt}
    data-screenshot-src={filename}
  >
    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(248,251,255,0.95),rgba(232,243,255,0.72))] dark:bg-[linear-gradient(135deg,rgba(7,17,31,0.98),rgba(16,43,79,0.72))]" />
    <div className="relative flex h-full w-full flex-col p-3">
      <div className="flex h-6 items-center gap-1 border-b border-[#D7E7FA] bg-white/72 px-2.5 dark:border-[#183354] dark:bg-[#07111F]/72">
        <span className="h-2 w-2 rounded-full bg-rose-300" />
        <span className="h-2 w-2 rounded-full bg-amber-300" />
        <span className="h-2 w-2 rounded-full bg-emerald-300" />
        <span className="ml-1.5 h-2 w-24 rounded bg-[#CFE2F7] dark:bg-[#1B2E4A]" />
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[60px_1fr] border-x border-b border-[#D7E7FA] bg-white/84 dark:border-[#183354] dark:bg-[#07111F]/84">
        <div className="border-r border-[#D7E7FA] bg-[#F4F9FF] p-2.5 dark:border-[#183354] dark:bg-[#0B1627]">
          <div className="mb-3 h-2.5 w-8 rounded bg-[#1F5AAE]/20 dark:bg-[#72A8FF]/25" />
          <div className="space-y-1.5">
            <div className="h-1.5 rounded bg-[#CFE2F7] dark:bg-[#1B2E4A]" />
            <div className="h-1.5 rounded bg-[#CFE2F7] dark:bg-[#1B2E4A]" />
            <div className="h-4 rounded bg-[#1F5AAE]/15 ring-1 ring-[#9BC4F5]/70 dark:bg-[#102B4F] dark:ring-[#315C8F]" />
            <div className="h-1.5 rounded bg-[#CFE2F7] dark:bg-[#1B2E4A]" />
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-2.5 p-3">
          <div>
            <div className="h-2.5 w-28 rounded bg-[#9CB5D4] dark:bg-[#315C8F]" />
            <div className="mt-1.5 h-1.5 w-44 max-w-full rounded bg-[#CFE2F7] dark:bg-[#1B2E4A]" />
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <div className="h-12 border border-[#D7E7FA] bg-[#F8FBFF] p-2.5 dark:border-[#183354] dark:bg-[#07111F]">
              <div className="h-1.5 w-10 rounded bg-[#CFE2F7] dark:bg-[#1B2E4A]" />
              <div className="mt-2 h-3 w-16 rounded bg-[#1F5AAE]/20 dark:bg-[#72A8FF]/20" />
            </div>
            <div className="h-12 border border-[#D7E7FA] bg-[#F8FBFF] p-2.5 dark:border-[#183354] dark:bg-[#07111F]">
              <div className="h-1.5 w-8 rounded bg-[#CFE2F7] dark:bg-[#1B2E4A]" />
              <div className="mt-2 h-3 w-12 rounded bg-emerald-300/50 dark:bg-emerald-500/25" />
            </div>
          </div>
          <div className="flex min-h-0 flex-1 items-center justify-center border border-dashed border-[#4F8EF7]/55 bg-[#E8F3FF]/75 px-3 text-center dark:bg-[#102B4F]/55">
            <div>
              <p className="text-[12px] font-black text-[#0B2E63] dark:text-slate-100">
                {title}
              </p>
              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6681A4] dark:text-slate-500">
                Screenshot placeholder
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    {withOverlay && (
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#07111F]/0 opacity-0 backdrop-blur-0 transition-all duration-200 group-hover:bg-[#07111F]/38 group-hover:opacity-100 group-hover:backdrop-blur-[2px] group-focus-visible:bg-[#07111F]/38 group-focus-visible:opacity-100 group-focus-visible:backdrop-blur-[2px]">
        <span className="inline-flex rounded-lg border border-white/35 bg-white/95 px-3 py-1.5 text-[12px] font-black text-[#0B2E63] shadow-lg shadow-[#07111F]/18 dark:bg-[#07111F]/92 dark:text-[#9AC3FF]">
          View Details
        </span>
      </div>
    )}
  </div>
);

const WelcomeFeatureCard: React.FC<WelcomeFeature & { onOpen: () => void }> = ({
  title,
  description,
  filename,
  alt,
  onOpen,
}) => (
  <button
    type="button"
    onClick={onOpen}
    className="group flex min-h-[340px] flex-col rounded-lg border border-[#D7E7FA] bg-white p-3 text-left shadow-sm shadow-[#184B8F]/6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#9BC4F5] hover:shadow-xl hover:shadow-[#184B8F]/12 focus:outline-none focus:ring-2 focus:ring-[#4F8EF7] focus:ring-offset-2 focus:ring-offset-[#F7FAFE] dark:border-[#183354] dark:bg-[#0B1627] dark:shadow-none dark:hover:border-[#315C8F] dark:focus:ring-offset-[#07111F]"
  >
    <div className="mb-3 min-h-[60px]">
      <h3 className="text-[16px] font-black leading-snug text-[#071A33] dark:text-white">
        {title}
      </h3>
      <p className="mt-1.5 text-[13px] leading-5 text-[#425B7D] dark:text-slate-300">
        {description}
      </p>
    </div>

    <FeatureImagePlaceholder title={title} alt={alt} filename={filename} withOverlay />
  </button>
);

const WelcomeFeatureModal: React.FC<{
  activeFeature: WelcomeFeature | null;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}> = ({ activeFeature, onClose, onPrevious, onNext }) => {
  useEffect(() => {
    if (!activeFeature) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeFeature, onClose]);

  if (!activeFeature) return null;

  const featurePage = docsData.find((item) => item.id === activeFeature.docId);
  const screenshot = featurePage?.screenshots?.[0] ?? {
    filename: activeFeature.filename,
    alt: activeFeature.alt,
    caption: activeFeature.description,
  };
  const notesAndTips = [
    ...(featurePage?.tips ?? []),
    ...(featurePage?.notes ?? []),
    ...(featurePage?.warnings ?? []),
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#07111F]/62 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-feature-modal-title"
    >
      <button type="button" className="absolute inset-0 cursor-default" onClick={onClose} aria-label="Close feature details" />

      <article className="relative z-10 flex h-[92vh] w-full max-w-[980px] flex-col overflow-hidden rounded-lg border border-[#D7E7FA] bg-[#F8FBFF] shadow-2xl shadow-[#07111F]/35 dark:border-[#183354] dark:bg-[#07111F]">
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[820px]">
            <p className="mb-2 text-[11px] font-black uppercase tracking-[0.16em] text-[#1F5AAE] dark:text-[#72A8FF]">
              Feature Details
            </p>
            <h2 id="welcome-feature-modal-title" className="text-[30px] font-black leading-tight text-[#071A33] dark:text-white md:text-[38px]">
              {activeFeature.title}
            </h2>
            <p className="mt-4 text-[16px] leading-7 text-[#425B7D] dark:text-slate-300">
              {featurePage?.purpose ?? activeFeature.description}
            </p>

            <div className="mt-7">
              <ScreenshotPlaceholder
                caption={screenshot.caption}
                alt={screenshot.alt}
                filename={screenshot.filename}
                variant="Feature Preview"
                mode={getScreenshotMode(featurePage ?? docsData[0], screenshot, 0)}
                height="lg"
              />
            </div>

            {featurePage?.steps && featurePage.steps.length > 0 && (
              <section className="mt-8">
                <h3 className="mb-4 text-[20px] font-black leading-tight text-[#0B2E63] dark:text-white">
                  Step-by-step instructions
                </h3>
                <ol className="space-y-3">
                  {featurePage.steps.map((step, index) => (
                    <li key={step} className="flex gap-3 rounded-lg border border-[#D7E7FA] bg-white p-4 dark:border-[#183354] dark:bg-[#0B1627]">
                      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#E8F3FF] text-xs font-black text-[#1F5AAE] dark:bg-[#102B4F] dark:text-[#9AC3FF]">
                        {index + 1}
                      </span>
                      <p className="text-[14px] leading-7 text-[#425B7D] dark:text-slate-300">
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {notesAndTips.length > 0 && (
              <section className="mt-8 rounded-lg border border-[#D7E7FA] bg-white p-5 dark:border-[#183354] dark:bg-[#0B1627]">
                <div className="mb-3 flex items-center gap-2 text-[#1F5AAE] dark:text-[#72A8FF]">
                  <Lightbulb className="h-4 w-4" />
                  <h3 className="text-[12px] font-black uppercase tracking-[0.16em]">Notes and tips</h3>
                </div>
                <div className="space-y-2 text-[13px] leading-6 text-[#425B7D] dark:text-slate-300">
                  {notesAndTips.map((note, index) => (
                    <p key={`${activeFeature.docId}-note-${index}`}>{note}</p>
                  ))}
                  <p>{welcomeFeatureNote}</p>
                </div>
              </section>
            )}
          </div>
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-[#D7E7FA] bg-white px-5 py-4 dark:border-[#183354] dark:bg-[#0B1627] sm:px-8">
          <button
            type="button"
            onClick={onPrevious}
            className="inline-flex items-center gap-2 rounded-lg border border-[#BCD7F5] bg-[#F8FBFF] px-4 py-2 text-[13px] font-black text-[#1F5AAE] transition-colors hover:border-[#4F8EF7] hover:bg-[#E8F3FF] dark:border-[#1F3D68] dark:bg-[#07111F] dark:text-[#72A8FF] dark:hover:border-[#72A8FF] dark:hover:bg-[#102B4F]"
          >
            Previous
          </button>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-lg border border-[#D7E7FA] bg-white px-4 py-2 text-[13px] font-black text-[#526A8B] transition-colors hover:border-[#9BC4F5] hover:text-[#0B2E63] dark:border-[#1F3D68] dark:bg-[#07111F] dark:text-slate-300 dark:hover:border-[#72A8FF] dark:hover:text-white"
            >
              Close
            </button>
            <button
              type="button"
              onClick={onNext}
              className="inline-flex items-center gap-2 rounded-lg bg-[#1F5AAE] px-4 py-2 text-[13px] font-black text-white transition-colors hover:bg-[#174D99] dark:bg-[#72A8FF] dark:text-[#07111F] dark:hover:bg-[#9AC3FF]"
            >
              Next
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </footer>
      </article>
    </div>
  );
};

const WelcomeIntroduction: React.FC = () => {
  return (
    <>
      {/* Welcome Section (anchor for sidebar nav) */}
      <section id="welcome" className={`${panelWidth} scroll-mt-[304px] lg:scroll-mt-[190px]`} />
      
      {/* Overview Section */}
      <section id="welcome-overview" className={`${panelWidth} mb-8 scroll-mt-[304px] lg:scroll-mt-[190px]`}>
        <div className="max-w-[920px]">
          <SectionHeading eyebrow="Quick Start">Overview</SectionHeading>
          <p className="text-[15px] leading-7 text-[#425B7D] dark:text-slate-300">
            NOLA SMS Pro brings SMS sending, HighLevel contacts, reusable templates, Sender IDs, credit tracking, message history, and account settings into your connected HighLevel sub-account.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="welcome-about" className={`${panelWidth} mb-8 scroll-mt-[304px] lg:scroll-mt-[190px]`}>
        <div className="max-w-[920px]">
          <SectionHeading eyebrow="Product">About NOLA SMS Pro</SectionHeading>
          <p className="text-[15px] leading-7 text-[#425B7D] dark:text-slate-300">
            NOLA SMS Pro is a dedicated SMS messaging solution that integrates directly with your HighLevel sub-account, simplifying sending and tracking without leaving the platform.
          </p>
        </div>
      </section>

      {/* Why Use section that transitions into feature cards */}
      <section id="welcome-why" className={`${panelWidth} scroll-mt-[304px] lg:scroll-mt-[190px]`}>
        <div className="max-w-[920px]">
          <SectionHeading eyebrow="Benefits">Why Use NOLA SMS Pro?</SectionHeading>
          <p className="text-[15px] leading-7 text-[#425B7D] dark:text-slate-300 mb-6">
            Explore the key features that make NOLA SMS Pro the perfect SMS solution for your HighLevel workflow:
          </p>
        </div>
      </section>
    </>
  );
};

const WelcomeProductOverview: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeFeature = activeIndex === null ? null : welcomeFeatures[activeIndex];

  const goPrevious = () => {
    setActiveIndex((current) => {
      if (current === null) return welcomeFeatures.length - 1;
      return current === 0 ? welcomeFeatures.length - 1 : current - 1;
    });
  };

  const goNext = () => {
    setActiveIndex((current) => {
      if (current === null) return 0;
      return current === welcomeFeatures.length - 1 ? 0 : current + 1;
    });
  };

  return (
    <section className={`${panelWidth} mb-8`}>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {welcomeFeatures.map((feature, index) => (
          <WelcomeFeatureCard
            key={feature.title}
            {...feature}
            onOpen={() => setActiveIndex(index)}
          />
        ))}
      </div>

      <WelcomeFeatureModal
        activeFeature={activeFeature}
        onClose={() => setActiveIndex(null)}
        onPrevious={goPrevious}
        onNext={goNext}
      />
    </section>
  );
};

const QuickContext: React.FC<{ page: DocPage }> = ({ page }) => {
  if (!page.purpose) return null;

  return (
    <section className={`${panelWidth} mb-8`}>
      <div className="border-l-4 border-[#1F5AAE] bg-white px-5 py-4 shadow-sm shadow-[#184B8F]/5 dark:border-[#72A8FF] dark:bg-[#0B1627]">
        <div className="mb-2 flex items-center gap-2 text-[#1F5AAE] dark:text-[#72A8FF]">
          <Sparkles className="h-4 w-4" />
          <span className="text-[11px] font-black uppercase tracking-[0.16em]">What this guide covers</span>
        </div>
        <p className="text-[15px] leading-7 text-[#425B7D] dark:text-slate-300">
          {page.purpose}
        </p>
      </div>
    </section>
  );
};

// JourneySummary removed — the stat bar (lessons/time/required) is no longer shown.

const LearningCard: React.FC<{
  lesson: Lesson;
  featured: boolean;
  onOpen: (lesson: Lesson) => void;
}> = ({ lesson, onOpen }) => {
  // Rotating gradient palettes for the visual left panel
  const palettes = [
    { from: '#1a4fc4', to: '#0ea5e9', accent: '#7dd3fc' },
    { from: '#0f766e', to: '#06b6d4', accent: '#67e8f9' },
    { from: '#4f46e5', to: '#818cf8', accent: '#c7d2fe' },
    { from: '#0369a1', to: '#38bdf8', accent: '#bae6fd' },
    { from: '#065f46', to: '#10b981', accent: '#6ee7b7' },
    { from: '#7c3aed', to: '#a78bfa', accent: '#ddd6fe' },
  ];
  const palette = palettes[(lesson.number - 1) % palettes.length];

  return (
    <button
      type="button"
      onClick={() => onOpen(lesson)}
      className="group relative flex w-full overflow-hidden rounded-2xl border border-[#D7E7FA] bg-white text-left shadow-sm shadow-[#184B8F]/6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#4F8EF7] hover:shadow-xl hover:shadow-[#184B8F]/14 focus:outline-none focus:ring-2 focus:ring-[#4F8EF7] focus:ring-offset-2 focus:ring-offset-[#F7FAFE] dark:border-[#1B3157] dark:bg-[#0B1627] dark:shadow-none dark:hover:border-[#72A8FF] dark:focus:ring-offset-[#07111F]"
    >
      {/* Left visual panel */}
      <div
        className="relative flex w-[30%] shrink-0 flex-col items-center justify-center overflow-hidden p-6 min-h-[140px]"
        style={{ background: `linear-gradient(135deg, ${palette.from} 0%, ${palette.to} 100%)` }}
      >
        {/* Decorative grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(${palette.accent} 1px, transparent 1px), linear-gradient(90deg, ${palette.accent} 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
        {/* Glowing circle blob */}
        <div
          className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full opacity-30 blur-2xl"
          style={{ background: palette.accent }}
        />
        {/* Step number badge */}
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-[24px] font-black text-white shadow-lg ring-2 ring-white/25 backdrop-blur-sm">
          {lesson.number}
        </div>
      </div>

      {/* Right content panel */}
      <div className="flex min-w-0 flex-1 flex-col justify-between p-5 min-h-[140px]">
        <h3 className="line-clamp-3 text-[15px] font-bold leading-relaxed text-[#071A33] transition-colors group-hover:text-[#1F5AAE] dark:text-white dark:group-hover:text-[#72A8FF]">
          {lesson.body}
        </h3>
        <div className="flex justify-end mt-2">
          <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-[0.12em] text-[#1F5AAE] group-hover:text-[#0b4ea2] dark:text-[#72A8FF] dark:group-hover:text-[#9ac3ff] transition-colors">
            View details
            <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </button>
  );
};

const LessonModal: React.FC<{
  page: DocPage;
  lesson: Lesson | null;
  lessons: Lesson[];
  onClose: () => void;
  onSelectLesson: (lesson: Lesson) => void;
}> = ({ page, lesson, lessons, onClose, onSelectLesson }) => {
  useEffect(() => {
    if (!lesson) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [lesson, onClose]);

  if (!lesson) return null;

  const relatedLessons = lessons
    .filter((item) => item.id !== lesson.id)
    .slice(Math.max(0, lesson.number - 2), Math.max(0, lesson.number - 2) + 3);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#07111F]/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${lesson.id}-title`}
    >
      <button type="button" className="absolute inset-0 cursor-default" onClick={onClose} aria-label="Close step" />
      <div className="relative z-10 flex h-[92vh] w-full max-w-[1100px] flex-col overflow-hidden rounded-2xl border border-[#D7E7FA] bg-[#F8FBFF] shadow-2xl shadow-[#07111F]/35 dark:border-[#183354] dark:bg-[#07111F]">

        {/* Modal header */}
        <div className="flex items-start justify-between gap-4 border-b border-[#D7E7FA] bg-white px-7 py-5 dark:border-[#183354] dark:bg-[#0B1627]">
          <div className="min-w-0">
            <p className="mb-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-[#1F5AAE] dark:text-[#72A8FF]">
              {getJourneyTitle(page)} / Step {lesson.number}
            </p>
            <h2 id={`${lesson.id}-title`} className="text-[28px] font-black leading-tight text-[#071A33] dark:text-white">
              {lesson.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-[#D7E7FA] bg-white text-[#6681A4] transition-colors hover:border-[#4F8EF7] hover:text-[#1F5AAE] dark:border-[#1F3D68] dark:bg-[#07111F] dark:text-slate-400 dark:hover:text-[#72A8FF]"
            aria-label="Close step"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Two-column body */}
        <div className="min-h-0 flex-1 overflow-hidden">
          <div className="flex h-full">

            {/* Left column: step details */}
            <div className="w-[45%] shrink-0 overflow-y-auto border-r border-[#D7E7FA] px-7 py-6 dark:border-[#183354]">
              <div className="mb-5 flex flex-wrap gap-2">
                <span className="rounded-md bg-[#E8F3FF] px-2.5 py-1 text-[11px] font-black text-[#0B4EA2] dark:bg-[#102B4F] dark:text-[#9AC3FF]">{lesson.estimatedTime}</span>
                <span className="rounded-md bg-white px-2.5 py-1 text-[11px] font-black text-[#526A8B] ring-1 ring-[#D7E7FA] dark:bg-[#0B1627] dark:text-slate-400 dark:ring-[#183354]">{lesson.difficulty}</span>
                <span className="rounded-md bg-white px-2.5 py-1 text-[11px] font-black text-[#526A8B] ring-1 ring-[#D7E7FA] dark:bg-[#0B1627] dark:text-slate-400 dark:ring-[#183354]">{lesson.required ? 'Required' : 'Optional'}</span>
              </div>

              <p className="text-[15px] leading-7 text-[#425B7D] dark:text-slate-300">
                {lesson.description}
              </p>

              <div className="mt-6 rounded-xl border border-[#D7E7FA] bg-white p-5 dark:border-[#183354] dark:bg-[#0B1627]">
                <div className="mb-4 flex items-center gap-2 text-[#1F5AAE] dark:text-[#72A8FF]">
                  <ListChecks className="h-4 w-4" />
                  <h3 className="text-[12px] font-black uppercase tracking-[0.16em]">Instructions</h3>
                </div>
                <ol className="space-y-3">
                  <li className="flex gap-3">
                    <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#E8F3FF] text-xs font-black text-[#1F5AAE] dark:bg-[#102B4F] dark:text-[#9AC3FF]">
                      {lesson.number}
                    </span>
                    <p className="text-[14px] leading-7 text-[#425B7D] dark:text-slate-300">{lesson.body}</p>
                  </li>
                </ol>
              </div>

              {(page.tips || page.notes || page.warnings) && (
                <div className="mt-5 rounded-xl border border-[#D7E7FA] bg-white p-5 dark:border-[#183354] dark:bg-[#0B1627]">
                  <div className="mb-3 flex items-center gap-2 text-[#1F5AAE] dark:text-[#72A8FF]">
                    <Lightbulb className="h-4 w-4" />
                    <h3 className="text-[12px] font-black uppercase tracking-[0.16em]">Tips</h3>
                  </div>
                  <div className="space-y-2 text-[13px] leading-6 text-[#425B7D] dark:text-slate-300">
                    {page.tips?.map((tip, index) => <p key={`tip-${index}`}>{tip}</p>)}
                    {page.notes?.map((note, index) => <p key={`note-${index}`}>{note}</p>)}
                    {page.warnings?.map((warning, index) => (
                      <p key={`warning-${index}`} className="text-amber-700 dark:text-amber-200">{warning}</p>
                    ))}
                  </div>
                </div>
              )}

              {relatedLessons.length > 0 && (
                <div className="mt-5">
                  <h3 className="mb-3 text-[12px] font-black uppercase tracking-[0.16em] text-[#7B93B1] dark:text-slate-500">
                    Related steps
                  </h3>
                  <div className="grid gap-2">
                    {relatedLessons.map((related) => (
                      <button
                        type="button"
                        key={related.id}
                        onClick={() => onSelectLesson(related)}
                        className="flex items-center justify-between gap-3 rounded-lg border border-[#D7E7FA] bg-white px-4 py-3 text-left transition-colors hover:border-[#4F8EF7] hover:text-[#1F5AAE] dark:border-[#183354] dark:bg-[#0B1627] dark:hover:border-[#72A8FF] dark:hover:text-[#72A8FF]"
                      >
                        <span className="text-sm font-bold text-[#0B2E63] dark:text-slate-100">{related.title}</span>
                        <ArrowRight className="h-4 w-4 flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right column: what you should see */}
            <div className="flex-1 overflow-y-auto px-7 py-6">
              <div className="mb-4 flex items-center gap-2 text-[#1F5AAE] dark:text-[#72A8FF]">
                <Sparkles className="h-4 w-4" />
                <h3 className="text-[12px] font-black uppercase tracking-[0.16em]">What you should see</h3>
              </div>
              {lesson.screenshot ? (
                <ScreenshotPlaceholder
                  figure={lesson.number}
                  caption={lesson.screenshot.caption}
                  alt={lesson.screenshot.alt}
                  filename={lesson.screenshot.filename}
                  variant="Step Preview"
                  mode={getScreenshotMode(page, lesson.screenshot, lesson.number - 1)}
                  height="lg"
                />
              ) : page.screenshots && page.screenshots.length > 0 ? (
                <div className="space-y-6">
                  {page.screenshots.map((sc, idx) => (
                    <ScreenshotPlaceholder
                      key={sc.filename}
                      figure={idx + 1}
                      caption={sc.caption}
                      alt={sc.alt}
                      filename={sc.filename}
                      variant="Step Preview"
                      mode={getScreenshotMode(page, sc, idx)}
                      height="lg"
                    />
                  ))}
                </div>
              ) : (
                <div className="flex h-64 items-center justify-center rounded-xl border-2 border-dashed border-[#D7E7FA] bg-white dark:border-[#183354] dark:bg-[#0B1627]">
                  <p className="text-[13px] text-[#7B93B1] dark:text-slate-500">No preview available for this step.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LearningJourney: React.FC<{ page: DocPage; lessons: Lesson[] }> = ({ page, lessons }) => {
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  if (lessons.length === 0) return null;

  return (
    <section className={`${panelWidth} mb-10`}>
      <SectionHeading>{getJourneyTitle(page)}</SectionHeading>
      <div className="grid gap-4 md:grid-cols-2">
        {lessons.map((lesson, index) => (
          <LearningCard
            key={lesson.id}
            lesson={lesson}
            featured={index === 0 && lessons.length >= 6}
            onOpen={setActiveLesson}
          />
        ))}
      </div>
      <LessonModal
        page={page}
        lesson={activeLesson}
        lessons={lessons}
        onClose={() => setActiveLesson(null)}
        onSelectLesson={setActiveLesson}
      />
    </section>
  );
};

// ApplicationPreviewGallery removed — screenshots are now embedded inside each step modal's "What you should see" right panel.

const PracticeWorkspace: React.FC<{ page: DocPage }> = ({ page }) => {
  if (!page.hasFirstSMSChecklist) return null;

  return (
    <section className={`${panelWidth} mb-10`}>
      <SectionHeading>Complete your first-send checks</SectionHeading>
      <InteractiveChecklist />
    </section>
  );
};

const CommonIssues: React.FC<{ page: DocPage }> = ({ page }) => {
  if (!page.commonIssues || page.commonIssues.length === 0) return null;

  return (
    <section className={`${panelWidth} mb-10`}>
      <SectionHeading>Common issues</SectionHeading>
      <div className="grid gap-3 md:grid-cols-2">
        {page.commonIssues.map((issue, idx) => {
          const colonIdx = issue.indexOf(': ');
          const title = colonIdx > -1 ? issue.slice(0, colonIdx) : issue;
          const desc = colonIdx > -1 ? issue.slice(colonIdx + 2) : '';
          return (
            <div key={idx} className="flex gap-3 border border-amber-200 bg-amber-50/75 p-4 dark:border-amber-900/35 dark:bg-amber-950/18">
              <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600 dark:text-amber-400" />
              <div>
                <p className="text-[14px] font-black text-[#442B05] dark:text-amber-100">{title}</p>
                {desc && <p className="mt-1 text-[13px] leading-6 text-[#6A5431] dark:text-amber-100/75">{desc}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const NotesAndWarnings: React.FC<{ page: DocPage }> = ({ page }) => {
  if (!page.tips && !page.notes && !page.warnings) return null;

  return (
    <section className={`${panelWidth} mb-10`}>
      <SectionHeading>Tips and guardrails</SectionHeading>
      <div className="grid gap-4 lg:grid-cols-2">
        {page.tips?.map((tip, idx) => (
          <TipBox key={`tip-${idx}`}>{tip}</TipBox>
        ))}
        {page.notes?.map((note, idx) => (
          <InfoBox key={`note-${idx}`}>{note}</InfoBox>
        ))}
        {page.warnings?.map((warn, idx) => (
          <WarningBox key={`warning-${idx}`}>{warn}</WarningBox>
        ))}
      </div>
    </section>
  );
};

// RelatedPages component removed because pagination/next pages links are unnecessary in single-page scrolling layout.

const FAQSection: React.FC<{ page: DocPage }> = ({ page }) => {
  if (!page.faqs || page.faqs.length === 0) return null;

  return (
    <section className={`${panelWidth} mb-10`}>
      <SectionHeading>Frequently asked questions</SectionHeading>
      <Accordion items={page.faqs} />
    </section>
  );
};

const PageContent: React.FC<{ page: DocPage }> = ({ page }) => {
  const lessons = useMemo(() => getLessons(page), [page]);

  if (['welcome', 'welcome-overview', 'welcome-about', 'welcome-why'].includes(page.id)) {
    return (
      <div className="w-full">
        <WelcomeIntroduction />
        <WelcomeProductOverview />
      </div>
    );
  }

  return (
    <div className="w-full">
      <QuickContext page={page} />
      <LearningJourney page={page} lessons={lessons} />
      <PracticeWorkspace page={page} />
      <CommonIssues page={page} />
      <FAQSection page={page} />
      <NotesAndWarnings page={page} />
    </div>
  );
};

export const DocPageRenderer: React.FC<Props> = ({ page }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const navType = useNavigationType();
  const activeId = location.pathname.split('/docs/')[1] || page.id;
  const isScrollingFromClickRef = useRef(false);
  const activePage = docsData.find((item) => item.id === activeId) ?? page;

  useEffect(() => {
    if (!activeId) return;

    let el = document.getElementById(activeId);
    // If we're on an intro sub-item, we want to stay on the welcome page and scroll to that section
    if (['welcome-overview', 'welcome-about', 'welcome-why'].includes(activeId)) {
      if (el && (navType === 'PUSH' || navType === 'POP')) {
        isScrollingFromClickRef.current = true;
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });

        const timer = setTimeout(() => {
          isScrollingFromClickRef.current = false;
        }, 1000);
        return () => clearTimeout(timer);
      }
    } else if (el && (navType === 'PUSH' || navType === 'POP')) {
      isScrollingFromClickRef.current = true;
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });

      const timer = setTimeout(() => {
        isScrollingFromClickRef.current = false;
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [activeId, navType]);

  useEffect(() => {
    const sections = sidebarStructure
      .flatMap(sec => sec.items)
      .map(item => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      if (isScrollingFromClickRef.current) return;

      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

      if (visible?.target.id && visible.target.id !== activeId) {
        navigate(`/docs/${visible.target.id}`, { replace: true });
      }
    }, {
      root: null,
      rootMargin: '-12% 0px -68% 0px',
      threshold: 0,
    });

    sections.forEach(el => observer.observe(el));

    return () => {
      sections.forEach(el => observer.unobserve(el));
    };
  }, [activeId, navigate]);

  return (
    <div className="w-full pb-16" aria-label={`Documentation guide focused on ${page.title}`}>
      <StickyPageHeader page={activePage} />
      <div className="w-full">
        {sidebarStructure.map((section) => (
          <div key={section.title}>
            {section.items.map((item) => {
              // For INTRODUCTION section, only render the welcome page content once
              if (section.title === 'INTRODUCTION') {
                if (item.id === 'welcome') {
                  const subPage = docsData.find(p => p.id === item.id);
                  if (!subPage) return null;
                  return (
                    <section
                      id={subPage.id}
                      key={subPage.id}
                      className="scroll-mt-[304px] border-b border-[#D7E7FA] py-12 first:pt-0 last:border-b-0 dark:border-[#183354] lg:scroll-mt-[190px]"
                    >
                      <PageContent page={subPage} />
                    </section>
                  );
                }
                return null;
              }

              const subPage = docsData.find(p => p.id === item.id);
              if (!subPage) return null;

              return (
                <section
                  id={subPage.id}
                  key={subPage.id}
                  className="scroll-mt-[304px] border-b border-[#D7E7FA] py-12 first:pt-0 last:border-b-0 dark:border-[#183354] lg:scroll-mt-[190px]"
                >
                  <PageContent page={subPage} />
                </section>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
