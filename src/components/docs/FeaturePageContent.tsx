import React from 'react';
import type { DocPage, ScreenshotPlan } from '../../data/docsData';
import { InfoBox, WarningBox, TipBox } from '../Callouts';
import { Accordion } from '../Accordion';
import { InteractiveChecklist } from '../InteractiveChecklist';
import { TicketForm } from '../TicketForm';
import { ScreenshotPlaceholder } from '../ScreenshotPlaceholder';
import {
  DocSection,
  DocSectionHeading,
  SplitLayout,
  BeforeAfterComparison,
  WorkflowTimeline,
  DashboardCallouts,
  AlternatingSection,
  BenefitsGrid,
  FeatureCard
} from './layout';
import { IllustrationFrame } from './IllustrationFrame';
import { RelatedPages } from './RelatedPages';
import { AlertTriangle, Check, Sparkles, ArrowRight, AlertCircle, Users, FileText, ShieldCheck, CreditCard, History, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  IntegrationFlow,
  ModuleEcosystem,
  ProblemsSolved,
  TargetPersonas
} from './VisualComponents';

type ScreenshotMode = 'large' | 'medium' | 'comparison';

function getScreenshotMode(page: DocPage, screenshot: ScreenshotPlan, index: number): ScreenshotMode {
  const text = `${page.id} ${screenshot.caption} ${screenshot.alt}`.toLowerCase();
  if (page.id === 'sender-ids' && (text.includes('status') || index === 2)) return 'comparison';
  if (text.includes('history') || text.includes('dashboard') || text.includes('contacts list') || text.includes('credits-history')) return 'large';
  if (text.includes('form') || text.includes('settings') || text.includes('account') || text.includes('sender')) return 'medium';
  return index === 0 ? 'large' : 'medium';
}

interface FeaturePageContentProps {
  page: DocPage;
}

export const FeaturePageContent: React.FC<FeaturePageContentProps> = ({ page }) => {
  const primaryScreenshot = page.screenshots?.[0];

  // 1. Render Overview (Question 1: What is this?)
  const renderWhatIsThis = () => {
    // Welcome page: Clean full-width product preview (no hero text, no eyebrow, no purpose callout)
    if (page.id === 'welcome') {
      return (
        <div className="w-full">
          {primaryScreenshot ? (
            <ScreenshotPlaceholder
              caption={primaryScreenshot.caption}
              alt={primaryScreenshot.alt}
              filename={primaryScreenshot.filename}
              variant="Application Preview"
              mode="large"
              height="md"
            />
          ) : (
            <IllustrationFrame type="desktop" title="NOLA SMS Pro" />
          )}
        </div>
      );
    }

    // Default Overview Presentation
    return (
      <SplitLayout
        visual={
          primaryScreenshot ? (
            <ScreenshotPlaceholder
              caption={primaryScreenshot.caption}
              alt={primaryScreenshot.alt}
              filename={primaryScreenshot.filename}
              variant="Application Preview"
              mode={getScreenshotMode(page, primaryScreenshot, 0)}
              height="md"
            />
          ) : (
            <IllustrationFrame
              type="desktop"
              title={page.title}
              caption={page.description}
            />
          )
        }
      >
        <div className="flex items-start gap-3 rounded-2xl border-l-4 border-[#334155] bg-white px-5 py-4 shadow-sm shadow-[#0F172A]/3 dark:border-[#CBD5E1] dark:bg-[#111827]">
          <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#334155] dark:text-[#CBD5E1]" />
          <div>
            <p className="text-[13.5px] leading-relaxed text-[#475569] dark:text-slate-355 font-medium">
              {page.purpose}
            </p>
          </div>
        </div>
      </SplitLayout>
    );
  };

  // 4. Render execution steps (Question 4: How do I use it?)
  const renderHowDoIUseIt = () => {
    // Core Features page: Feature Card Grid Layout
    if (page.id === 'core-features') {
      const coreModules = [
        { icon: <Users className="h-5 w-5" />, title: 'Contacts Lookup', desc: 'Natively search and edit customer records mapping your HighLevel database.', docId: 'contacts' },
        { icon: <Send className="h-5 w-5" />, title: 'Compose Console', desc: 'Type customized texts, verify credit counts, and send branded SMS.', docId: 'compose-sms' },
        { icon: <FileText className="h-5 w-5" />, title: 'Templates Directory', desc: 'Organize reusable, pre-written standard message layouts.', docId: 'message-templates' },
        { icon: <ShieldCheck className="h-5 w-5" />, title: 'Sender ID Masking', desc: 'Submit and track custom brand headers registered with carriers.', docId: 'sender-ids' },
        { icon: <CreditCard className="h-5 w-5" />, title: 'Credits Wallet', desc: 'Check credit balances, refill packages, and logs transaction history.', docId: 'sms-credits' },
        { icon: <History className="h-5 w-5" />, title: 'Message History Log', desc: 'Inspect receipt states and carrier-level delivery codes.', docId: 'message-history' },
      ];
      return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coreModules.map((module) => (
            <FeatureCard
              key={module.title}
              icon={module.icon}
              title={module.title}
              description={module.desc}
              ctaText="Go to guide"
              onClick={() => {
                window.location.hash = `/docs/${module.docId}`;
              }}
            />
          ))}
        </div>
      );
    }

    // How NOLA SMS Pro Works: Workflow Timeline Layout
    if (page.id === 'how-nola-sms-pro-works' && page.steps) {
      const stepsData = page.steps.map((step) => ({
        title: step.split(': ')[0] || 'Pipeline Node',
        desc: step.split(': ')[1] || step,
      }));
      return <WorkflowTimeline steps={stepsData} />;
    }

    // Install NOLA SMS Pro: Alternating Image/Text Sections Layout
    if (page.id === 'install-nola-sms-pro' && page.steps && page.screenshots) {
      const stepsData = page.steps.map((step, idx) => ({
        title: `Step ${idx + 1}: ${step.split(': ')[0] || 'Configuration'}`,
        desc: step.split(': ')[1] || step,
        mockup: page.screenshots?.[idx] ? (
          <ScreenshotPlaceholder
            caption={page.screenshots[idx].caption}
            alt={page.screenshots[idx].alt}
            filename={page.screenshots[idx].filename}
            variant="Step Preview"
            mode="medium"
            height="sm"
          />
        ) : (
          <IllustrationFrame type="desktop" title="HighLevel Marketplace" />
        )
      }));
      return <AlternatingSection steps={stepsData} />;
    }

    // Message History: Alternating Image/Text Sections Layout
    if (page.id === 'message-history' && page.steps && page.screenshots) {
      const stepsData = page.steps.map((step, idx) => ({
        title: step.split(': ')[0] || 'Audit Step',
        desc: step.split(': ')[1] || step,
        mockup: page.screenshots?.[idx] ? (
          <ScreenshotPlaceholder
            caption={page.screenshots[idx].caption}
            alt={page.screenshots[idx].alt}
            filename={page.screenshots[idx].filename}
            variant="Step Preview"
            mode="medium"
            height="sm"
          />
        ) : (
          <IllustrationFrame type="desktop" title="Message Audits" />
        )
      }));
      return <AlternatingSection steps={stepsData} />;
    }

    // Create or Sign In: Side-by-Side Comparison Layout
    if (page.id === 'create-or-sign-in') {
      return (
        <div className="space-y-6">
          <BeforeAfterComparison
            beforeTitle="Workspace Creation (New Administrator Signup)"
            beforeDesc="Register your administrative owner profile. Enter your name, corporate email address, and a secure password to establish account billing and credit notifications."
            afterTitle="Workspace Authentication (Existing Profile Login)"
            afterDesc="For sub-accounts already registered, bypass signup. Log in using your existing admin owner credentials to restore location mapping and credit request pipelines."
          />
          <div className="mt-6 bg-[#F8FAFC] p-5 rounded-2xl dark:bg-[#111827] border border-[#CBD5E1] dark:border-slate-900/30">
            <h4 className="text-[13px] font-black text-[#0F172A] dark:text-white uppercase tracking-wider mb-2">Dynamic Session Resumption</h4>
            <p className="text-[13.5px] leading-relaxed text-[#64748B] dark:text-slate-400">
              NOLA SMS Pro checks active cookies on subsequent launches. Authorized owners will bypass the login credentials verification entirely and load the main command panel directly.
            </p>
          </div>
        </div>
      );
    }

    // Settings: Side-by-Side Comparison Layout
    if (page.id === 'settings') {
      return (
        <div className="space-y-6">
          <BeforeAfterComparison
            beforeTitle="Profile Config Management"
            beforeDesc="Modify password details, update login emails, and manage administrator metadata under the Settings profile tab."
            afterTitle="Connected Location Mapping"
            afterDesc="Verify sub-account mapping, audit scopes permissions, and review location connectivity state to ensure active synchronization."
          />
          {page.screenshots?.[0] && (
            <div className="flex justify-center my-4 max-w-[650px] mx-auto">
              <ScreenshotPlaceholder
                caption={page.screenshots[0].caption}
                alt={page.screenshots[0].alt}
                filename={page.screenshots[0].filename}
                variant="Feature Preview"
                mode="medium"
                height="sm"
              />
            </div>
          )}
        </div>
      );
    }

    // Connect HighLevel: Illustration followed by Explanation Layout
    if (page.id === 'connect-highlevel') {
      return (
        <div className="space-y-6">
          {page.screenshots?.[0] && (
            <div className="flex justify-center my-4 max-w-[680px] mx-auto">
              <ScreenshotPlaceholder
                caption={page.screenshots[0].caption}
                alt={page.screenshots[0].alt}
                filename={page.screenshots[0].filename}
                variant="Feature Preview"
                mode="medium"
                height="sm"
              />
            </div>
          )}
          <div className="bg-[#F8FAFC] border border-[#CBD5E1] p-5 rounded-2xl dark:bg-[#111827] dark:border-slate-900/30">
            <h4 className="text-[13px] font-black text-[#0F172A] dark:text-white uppercase tracking-wider mb-3">Compliance Sync Explanation</h4>
            <p className="text-[13.5px] leading-relaxed text-[#475569] dark:text-slate-300 font-medium">
              A persistent oauth background handshake keeps contacts lists, CRM templates, and outbox logs updated. Reconnection alerts trigger only if sub-account credentials or permissions values decrease.
            </p>
          </div>
        </div>
      );
    }

    // Dashboard Overview: Dashboard Screenshot with Callouts Layout
    if (page.id === 'dashboard-overview' && page.steps && page.screenshots) {
      const calloutsData = page.steps.map((step) => ({
        title: step.split(': ')[0] || 'Panel',
        desc: step.split(': ')[1] || step,
      }));
      return (
        <DashboardCallouts
          mockup={
            <ScreenshotPlaceholder
              caption={page.screenshots[0]?.caption || 'NOLA Dashboard Command Room'}
              alt={page.screenshots[0]?.alt || 'Dashboard Panel'}
              filename={page.screenshots[0]?.filename || '/images/docs/dashboard-overview-home.png'}
              variant="Feature Preview"
              mode="large"
              height="md"
            />
          }
          callouts={calloutsData}
        />
      );
    }

    // Sender IDs: Before vs After Comparison Layout
    if (page.id === 'sender-ids') {
      return (
        <div className="space-y-6">
          <BeforeAfterComparison
            beforeTitle="Before: Anonymous Numbers"
            beforeDesc="Outgoing texts display a random gateway phone number, causing Philippine mobile subscribers to overlook alert notifications or report spam locks."
            afterTitle="After: Branded custom Sender ID"
            afterDesc="Texts show your legally approved brand name mask (e.g. BRANDNAME) on lockscreens, boosting customer trust and delivery open rates."
          />
          <div className="mt-6 border-t border-[#E2E8F0] pt-6 dark:border-[#1E293B]">
            <h4 className="text-[13px] font-black text-[#0F172A] dark:text-white uppercase tracking-wider mb-4">Registration Submission Steps</h4>
            <div className="space-y-3">
              {page.steps?.slice(1).map((step, idx) => (
                <div key={idx} className="flex gap-4 rounded-xl border border-[#E2E8F0] bg-white p-4 dark:border-[#1E293B] dark:bg-[#111827] shadow-sm">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-[#F1F5F9] text-[11px] font-black text-[#334155] dark:bg-[#1E293B] dark:text-[#E2E8F0]">
                    {idx + 1}
                  </span>
                  <p className="text-[13px] leading-relaxed text-[#64748B] dark:text-slate-400">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // SMS Credits: Benefits Grid Layout
    if (page.id === 'sms-credits') {
      const benefitsData = [
        { title: 'Balance Checks', desc: 'Monitor active credits directly from the Home command panel banner.', highlight: true },
        { title: 'Refill Request Billing', desc: 'Request credit allocations from your parent agency to keep outbox fueled.' },
        { title: 'Segment Deduction Rules', desc: 'Tracks character segments (160 characters for a standard local SMS credit).', highlight: true },
        { title: 'Low-Credit Alerts', desc: 'Configure threshold notification warnings under notifications settings.' },
        { title: 'Checkout Package Topups', desc: 'Submit checkout requests using active payment packages.' },
        { title: 'Deduction History Ledger', desc: 'Inspect chronological ledger lists mapping credits used to campaigns.', highlight: true },
      ];
      return <BenefitsGrid benefits={benefitsData} />;
    }

    // Default Chronological Numbered Steps Layout
    return (
      <div className="space-y-3">
        {page.steps?.map((step, index) => (
          <div
            key={step}
            className="flex gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-5 dark:border-[#1E293B] dark:bg-[#111827] shadow-sm shadow-[#0F172A]/3 transition-colors hover:border-[#475569]"
          >
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-xl bg-[#F1F5F9] text-[12px] font-black text-[#334155] dark:bg-[#1E293B] dark:text-[#E2E8F0]">
              {index + 1}
            </span>
            <p className="text-[13.5px] leading-6 text-[#475569] dark:text-slate-350">{step}</p>
          </div>
        ))}
      </div>
    );
  };

  // 6. Render Tips, Warnings, FAQs (Question 6: Common questions or tips)
  const renderTipsAndCommonQuestions = () => {
    // Contacts and Notifications: Best Practices Checklist Layout
    if ((page.id === 'contacts' || page.id === 'notifications') && (page.tips || page.warnings)) {
      const checklistItems = [
        ...(page.tips || []),
        ...(page.warnings || []),
        ...(page.notes || []),
      ];
      return (
        <div className="space-y-3">
          {checklistItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3.5 rounded-xl border border-slate-150 bg-slate-50/5 p-4 dark:border-slate-900/30 dark:bg-[#111827] shadow-sm">
              <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 dark:bg-slate-950/40 dark:text-slate-400">
                <Check className="h-3 w-3" />
              </div>
              <p className="text-[13px] leading-relaxed text-[#475569] dark:text-slate-300 font-semibold">{item}</p>
            </div>
          ))}
        </div>
      );
    }

    // Default Accordion/Box combinations
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          {page.tips?.map((tip, idx) => (
            <TipBox key={`tip-${idx}`} title="Best Practice Guideline">{tip}</TipBox>
          ))}
          {page.notes?.map((note, idx) => (
            <InfoBox key={`note-${idx}`} title="Operational Reminder">{note}</InfoBox>
          ))}
          {page.warnings?.map((warn, idx) => (
            <WarningBox key={`warning-${idx}`} title="Compliance Warning">{warn}</WarningBox>
          ))}
        </div>

        {/* Common issues lists */}
        {page.commonIssues && page.commonIssues.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2">
            {page.commonIssues.map((issue) => {
              const colonIdx = issue.indexOf(': ');
              const title = colonIdx > -1 ? issue.slice(0, colonIdx) : issue;
              const desc = colonIdx > -1 ? issue.slice(colonIdx + 2) : '';
              return (
                <div
                  key={issue}
                  className="flex gap-3 rounded-2xl border border-amber-250 bg-amber-50/20 p-4 dark:border-amber-900/35 dark:bg-amber-950/10 shadow-sm"
                >
                  <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600 dark:text-amber-400" />
                  <div>
                    <p className="text-[13.5px] font-black text-[#442B05] dark:text-amber-100">{title}</p>
                    {desc && (
                      <p className="mt-1 text-[12.5px] leading-relaxed text-[#6A5431] dark:text-amber-200/70">{desc}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* FAQ dropdown items */}
        {page.faqs && page.faqs.length > 0 && (
          <div className="mt-6">
            <Accordion items={page.faqs} />
          </div>
        )}

        {/* Support ticket submission form */}
        {page.hasTicketForm && (
          <div className="mt-6 border-t border-[#E2E8F0] pt-6 dark:border-[#1E293B]">
            <TicketForm />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-12">
      
      {/* HEADER METADATA — hidden on Welcome, shown on all other pages */}
      {page.id !== 'welcome' && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] pb-4 dark:border-[#1E293B]">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-[#F1F5F9] px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-[#334155] dark:bg-[#1E293B] dark:text-[#E2E8F0]">
            {page.readingTime}
          </span>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            {page.section} {page.subsection ? `> ${page.subsection}` : ''}
          </span>
        </div>
      )}

      {/* 1. WHAT IS THIS? */}
      <DocSection id={`${page.id}-what-is-this`}>
        {page.id !== 'welcome' && (
          <DocSectionHeading eyebrow="1. What is this?">Overview & Goal</DocSectionHeading>
        )}
        {renderWhatIsThis()}

        {/* Dynamic visual guides explaining "what this is" under INTRODUCTION */}
        {page.hasProblemsSolved && (
          <div className="mt-6">
            <h4 className="text-[11px] font-black text-[#334155] dark:text-[#CBD5E1] uppercase tracking-[0.14em] mb-3">Core Operational Painpoints Solved</h4>
            <ProblemsSolved />
          </div>
        )}
        {page.hasTargetPersonas && (
          <div className="mt-6">
            <h4 className="text-[11px] font-black text-[#334155] dark:text-[#CBD5E1] uppercase tracking-[0.14em] mb-3">Target Operators</h4>
            <TargetPersonas />
          </div>
        )}
        {page.hasIntegrationFlow && (
          <div className="mt-6">
            <IntegrationFlow />
          </div>
        )}
        {page.hasModuleEcosystem && (
          <div className="mt-6">
            <ModuleEcosystem />
          </div>
        )}
      </DocSection>

      {/* 2. WHY IS IT IMPORTANT? */}
      {page.whyItMatters && (
        <DocSection id={`${page.id}-why-is-it-important`}>
          <DocSectionHeading eyebrow="2. Why is it important?">Value & Impact</DocSectionHeading>
          <div className="rounded-2xl border border-slate-200/50 bg-[#F8FAFC] p-5 dark:border-slate-900/25 dark:bg-[#111827] shadow-sm shadow-[#0F172A]/2">
            <p className="text-[14px] leading-7 text-[#0F172A] dark:text-slate-200 font-semibold">
              {page.whyItMatters}
            </p>
          </div>
        </DocSection>
      )}

      {/* 3. WHAT DO I NEED BEFORE I BEGIN? */}
      {page.prerequisites && page.prerequisites.length > 0 && (
        <DocSection id={`${page.id}-prerequisites`}>
          <DocSectionHeading eyebrow="3. What do I need before I begin?">Pre-flight Checklist</DocSectionHeading>
          <div className="grid gap-3 sm:grid-cols-2">
            {page.prerequisites.map((prereq) => (
              <div
                key={prereq}
                className="flex items-start gap-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3.5 dark:border-[#1E293B] dark:bg-[#111827] shadow-sm shadow-[#0F172A]/2"
              >
                <div className="mt-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-slate-100 text-slate-600 dark:bg-slate-950/40 dark:text-slate-450">
                  <Check className="h-3 w-3" />
                </div>
                <span className="text-[13px] font-semibold leading-relaxed text-[#0F172A] dark:text-white">
                  {prereq}
                </span>
              </div>
            ))}
          </div>
        </DocSection>
      )}

      {/* 4. HOW DO I USE IT? */}
      {((page.steps && page.steps.length > 0) || page.hasFirstSMSChecklist || (page.screenshots && page.screenshots.length > 1)) && (
        <DocSection id={`${page.id}-how-do-i-use-it`}>
          <DocSectionHeading eyebrow="4. How do I use it?">Step-by-Step Instructions</DocSectionHeading>
          {renderHowDoIUseIt()}
        </DocSection>
      )}

      {/* 5. WHAT SHOULD I EXPECT AFTERWARDS? */}
      {page.expectAfter && (
        <DocSection id={`${page.id}-expect-after`}>
          <DocSectionHeading eyebrow="5. What should I expect afterwards?">Next State & Outcome</DocSectionHeading>
          <div className="flex gap-3.5 rounded-2xl border border-emerald-150 bg-emerald-50/10 p-5 dark:border-emerald-950/20 dark:bg-emerald-950/5 shadow-sm">
            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-450" />
            <div>
              <p className="text-[13.5px] leading-relaxed text-[#2E6B4E] dark:text-emerald-300 font-medium">
                {page.expectAfter}
              </p>
            </div>
          </div>
        </DocSection>
      )}

      {/* PRACTICE CHECKLIST */}
      {page.hasFirstSMSChecklist && (
        <DocSection id={`${page.id}-practice`}>
          <DocSectionHeading eyebrow="Interactive Practice">Complete your first-send checks</DocSectionHeading>
          <InteractiveChecklist />
        </DocSection>
      )}

      {/* 6. COMMON QUESTIONS OR TIPS */}
      {((page.tips && page.tips.length > 0) || 
        (page.notes && page.notes.length > 0) || 
        (page.warnings && page.warnings.length > 0) || 
        (page.commonIssues && page.commonIssues.length > 0) || 
        (page.faqs && page.faqs.length > 0) ||
        page.hasTicketForm) && (
        <DocSection id={`${page.id}-faq-and-tips`}>
          <DocSectionHeading eyebrow="6. Common questions & tips">Troubleshooting & Advice</DocSectionHeading>
          {renderTipsAndCommonQuestions()}
        </DocSection>
      )}

      {/* 7. WHERE SHOULD I GO NEXT? */}
      <div className="border-t border-[#E2E8F0] pt-8 dark:border-[#1E293B]">
        {page.nextPageCTA ? (
          <DocSection id={`${page.id}-next-step`} className="!scroll-mt-0">
            <p className="doc-eyebrow mb-3">7. Where should I go next?</p>
            <Link
              to={`/docs/${page.nextPageCTA.id}`}
              className="group flex items-center justify-between gap-4 rounded-2xl border border-[#CBD5E1] bg-gradient-to-r from-[#F1F5F9]/70 to-white/10 px-6 py-5 transition-all hover:border-[#475569] hover:shadow-lg hover:shadow-[#0F172A]/10 dark:border-[#475569] dark:from-[#1E293B]/40 dark:to-[#111827] dark:hover:border-[#CBD5E1]"
            >
              <div>
                <p className="text-[16px] font-black text-[#0F172A] dark:text-white">
                  {page.nextPageCTA.title}
                </p>
                <p className="mt-1 text-[13px] text-[#64748B] dark:text-slate-400">
                  {page.nextPageCTA.desc}
                </p>
              </div>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#334155] text-white transition-transform group-hover:translate-x-0.5 dark:bg-[#CBD5E1] dark:text-[#020617]">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </DocSection>
        ) : null}

        <RelatedPages relatedPages={page.relatedPages} currentId={page.id} />
      </div>

    </div>
  );
};
