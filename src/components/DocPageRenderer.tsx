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
  ChevronRight,
  Lightbulb,
  ListChecks,
  Sparkles,
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
  if (page.id === 'welcome') return 'Learn NOLA SMS Pro';
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

const PageIntro: React.FC<{ page: DocPage }> = ({ page }) => (
  <header className={`${textWidth} mb-7`}>
    <h1 className="text-[36px] font-black leading-[1.08] text-[#071A33] dark:text-white sm:text-[44px] lg:text-[50px]">
      {page.title}
    </h1>

    <p className="mt-5 text-[18px] leading-8 text-[#425B7D] dark:text-slate-300">
      {page.description}
    </p>
  </header>
);

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

  return (
    <div className="w-full">
      <PageIntro page={page} />
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

  useEffect(() => {
    if (!activeId) return;

    const el = document.getElementById(activeId);
    if (el && (navType === 'PUSH' || navType === 'POP')) {
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
      <div className="w-full">
        {sidebarStructure.map((section) => (
          <div key={section.title}>
            {section.items.map((item) => {
              const subPage = docsData.find(p => p.id === item.id);
              if (!subPage) return null;

              return (
                <section
                  id={subPage.id}
                  key={subPage.id}
                  className="scroll-mt-24 border-b border-[#D7E7FA] py-12 first:pt-0 last:border-b-0 dark:border-[#183354] lg:scroll-mt-8"
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
