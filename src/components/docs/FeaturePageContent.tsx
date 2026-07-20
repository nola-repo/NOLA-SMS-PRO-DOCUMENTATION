import React from 'react';
import type { DocPage, DocStep, ScreenshotPlan } from '../../data/docsData';

import { Accordion } from '../Accordion';
import { InteractiveChecklist } from '../InteractiveChecklist';
import { TicketForm } from '../TicketForm';
import { ScreenshotPlaceholder } from '../ScreenshotPlaceholder';
import {
  DocSection,
  BeforeAfterComparison,
  WorkflowTimeline,
  DashboardCallouts,
  AlternatingSection,
  FeatureCard,
  ComparisonTable
} from './layout';
import { IllustrationFrame } from './IllustrationFrame';
import { RelatedPages } from './RelatedPages';
import * as LucideIcons from 'lucide-react';
import { AlertTriangle, Check, Sparkles, ArrowRight, AlertCircle, Users, FileText, ShieldCheck, CreditCard, History, Send } from 'lucide-react';
import { Link } from 'react-router-dom';


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

  const renderStepsList = (steps: string[] | DocStep[] | undefined) => {
    if (!steps) return null;
    const firstStep = steps[0];
    const isRichSteps = firstStep && typeof firstStep === 'object';

    if (isRichSteps) {
      const richSteps = steps as DocStep[];
      return (
        <div className="space-y-7">
          {richSteps.map((step, idx) => {
            const IconComponent = (step.iconName && (step.iconName in LucideIcons)
              ? LucideIcons[step.iconName as keyof typeof LucideIcons]
              : LucideIcons.BookOpen) as React.ComponentType<{ className?: string }>;
            return (
              <div key={idx} className="flex gap-4 items-start">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/50">
                  <IconComponent className="h-5 w-5 text-blue-500" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-bold text-slate-900 dark:text-white text-[15px]">{step.title}</h3>
                    {step.badge && (
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${step.badgeColor || 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'}`}>
                        {step.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[13.5px] leading-6 text-slate-600 dark:text-slate-400 mb-2.5">{step.desc}</p>
                  {step.details && step.details.length > 0 && (
                    <ul className="space-y-1">
                      {step.details.map((d, i) => (
                        <li key={i} className="flex items-start gap-2 text-[13px] text-slate-500 dark:text-slate-400 font-medium">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300 dark:bg-slate-600" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    const stringSteps = steps as string[];
    return (
      <div className="space-y-3">
        {stringSteps?.map((step, index) => (
          <div
            key={step}
            className="flex gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-5 dark:border-[#1E293B] dark:bg-[#111827] shadow-sm shadow-[#0F172A]/3 transition-colors hover:border-[#475569]"
          >
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-xl bg-[#F1F5F9] text-[12px] font-black text-[#334155] dark:bg-[#1E293B] dark:text-[#E2E8F0]">
              {index + 1}
            </span>
            <p className="text-[13.5px] leading-6 text-[#475569] dark:text-slate-300 font-medium">{step}</p>
          </div>
        ))}
      </div>
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
      const stepsData = (page.steps as string[]).map((step) => ({
        title: step.split(': ')[0] || 'Pipeline Node',
        desc: step.split(': ')[1] || step,
      }));
      return <WorkflowTimeline steps={stepsData} />;
    }

    // Install NOLA SMS Pro: Alternating Image/Text Sections Layout
    if (page.id === 'install-nola-sms-pro' && page.steps && page.screenshots) {
      const stepsData = (page.steps as string[]).map((step, idx) => ({
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
      const calloutsData = (page.steps as string[]).map((step) => ({
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
            {renderStepsList(page.steps)}
          </div>
        </div>
      );
    }

    // GHL Conversation: Sync Comparison Table & Steps
    if (page.id === 'ghl-conversation') {
      return (
        <div className="space-y-6">
          <ComparisonTable
            title="Data Synchronization Systems"
            traditionalTitle="Manual Tracking"
            nolaTitle="Native Real-time Sync"
            traditionalItems={[
              'Outbox history only exists in the sending app.',
              'Need to copy/paste text bodies into client profiles.',
              'Support agents send duplicate replies due to tab blindspots.',
            ]}
            nolaItems={[
              'Background worker pushes sent items to HighLevel within seconds.',
              'Messages automatically append to the active contact timeline.',
              'All agents see the exact customer thread, maintaining alignment.',
            ]}
          />
          <div className="mt-6 border-t border-[#E2E8F0] pt-6 dark:border-[#1E293B]">
            <h4 className="text-[13px] font-black text-[#0F172A] dark:text-white uppercase tracking-wider mb-4">Sync Verification Steps</h4>
            {renderStepsList(page.steps)}
          </div>
        </div>
      );
    }

    // Default Fallback to renderStepsList helper
    return renderStepsList(page.steps);
  };


  // ── Section Page: Intro-style structured layout ──────────────────────────
  const renderSectionPageContent = () => {
    const accentColors = [
      'border-blue-400',
      'border-emerald-400',
      'border-amber-400',
      'border-purple-400',
      'border-rose-400',
      'border-teal-400',
    ];

    return (
      <div className="space-y-12 text-slate-700 dark:text-slate-300">

        {/* ── Reading time chip ── */}
        <div className="flex flex-wrap items-center gap-2.5 border-b border-slate-200/70 pb-5 dark:border-slate-800/70">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {page.readingTime}
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {page.section}{page.subsection ? ` › ${page.subsection}` : ''}
          </span>
        </div>

        {/* ── 1. Overview ── */}
        <DocSection id={`${page.id}-overview`}>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Overview</h2>
          <p className="text-[14.5px] leading-7 mb-5">{page.purpose}</p>

          {/* Screenshot / illustration if available */}
          {primaryScreenshot && (
            <div className="mb-5">
              <ScreenshotPlaceholder
                caption={primaryScreenshot.caption}
                alt={primaryScreenshot.alt}
                filename={primaryScreenshot.filename}
                variant="Application Preview"
                mode={getScreenshotMode(page, primaryScreenshot, 0)}
                height="md"
              />
            </div>
          )}
          {!primaryScreenshot && (
            <div className="mb-5">
              <IllustrationFrame type="desktop" title={page.title} caption={page.description} />
            </div>
          )}

          {/* Purpose callout */}
          <div className="flex items-start gap-3 rounded-2xl border-l-4 border-slate-400 bg-white px-5 py-4 shadow-sm dark:border-slate-500 dark:bg-[#111827]">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-slate-500 dark:text-slate-400" />
            <p className="text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-300 font-medium">
              {page.whyItMatters}
            </p>
          </div>
        </DocSection>

        {/* ── 2. Prerequisites ── */}
        {page.prerequisites && page.prerequisites.length > 0 && (
          <DocSection id={`${page.id}-prereqs`}>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Before You Begin</h2>
            <p className="text-[14px] leading-7 mb-5 text-slate-600 dark:text-slate-400">
              Make sure the following requirements are in place before starting this guide.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {page.prerequisites.map((prereq, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 dark:border-slate-800 dark:bg-slate-900/30"
                >
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                    <Check className="h-3 w-3" />
                  </div>
                  <span className="text-[13px] font-semibold leading-relaxed text-slate-800 dark:text-slate-200">{prereq}</span>
                </div>
              ))}
            </div>
          </DocSection>
        )}

        {/* ── 3. How to use it (Steps) ── */}
        {((page.steps && page.steps.length > 0) || page.hasFirstSMSChecklist || (page.screenshots && page.screenshots.length > 1)) && (
          <DocSection id={`${page.id}-steps`}>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Step-by-Step Guide</h2>
            <p className="text-[14px] leading-7 mb-6 text-slate-600 dark:text-slate-400">
              Follow these steps to set up and use this feature correctly.
            </p>
            {renderHowDoIUseIt()}

            {/* Interactive checklist widget */}
            {page.hasFirstSMSChecklist && (
              <div className="mt-8">
                <InteractiveChecklist />
              </div>
            )}
          </DocSection>
        )}

        {/* ── 4. What to Expect After ── */}
        {page.expectAfter && (
          <DocSection id={`${page.id}-outcome`}>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Expected Outcome</h2>
            <div className="flex items-start gap-3.5 rounded-xl border border-emerald-200 bg-emerald-50/40 px-5 py-4 dark:border-emerald-800/40 dark:bg-emerald-900/10">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <p className="text-[13.5px] leading-relaxed text-emerald-800 dark:text-emerald-300 font-medium">
                {page.expectAfter}
              </p>
            </div>
          </DocSection>
        )}

        {/* ── 5. Tips, Notes, Warnings ── */}
        {((page.tips && page.tips.length > 0) || (page.notes && page.notes.length > 0) || (page.warnings && page.warnings.length > 0)) && (
          <DocSection id={`${page.id}-tips`}>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Best Practices & Reminders</h2>
            <div className="space-y-4">
              {page.tips && page.tips.length > 0 && (
                <div className="space-y-3">
                  {page.tips.map((tip, idx) => (
                    <div key={idx} className={`border-l-2 ${accentColors[idx % accentColors.length]} pl-4`}>
                      <p className="text-[13.5px] leading-6 text-slate-600 dark:text-slate-400">{tip}</p>
                    </div>
                  ))}
                </div>
              )}
              {page.notes && page.notes.length > 0 && (
                <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 px-5 py-4 dark:border-blue-700/50 dark:bg-blue-950/40">
                  <p className="text-[11px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">Note</p>
                  {page.notes.map((note, idx) => (
                    <p key={idx} className="text-[13px] leading-6 text-blue-800 dark:text-blue-200 font-semibold">{note}</p>
                  ))}
                </div>
              )}
              {page.warnings && page.warnings.length > 0 && (
                <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 dark:border-amber-700/50 dark:bg-amber-950/30">
                  <p className="text-[11px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">Warning</p>
                  {page.warnings.map((warn, idx) => (
                    <p key={idx} className="text-[13px] leading-6 text-amber-800 dark:text-amber-200 font-semibold">
                      {warn}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </DocSection>
        )}

        {/* ── 6. Common Issues ── */}
        {page.commonIssues && page.commonIssues.length > 0 && (
          <DocSection id={`${page.id}-issues`}>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Common Issues</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {page.commonIssues.map((issue, idx) => {
                const colonIdx = issue.indexOf(': ');
                const title = colonIdx > -1 ? issue.slice(0, colonIdx) : issue;
                const desc = colonIdx > -1 ? issue.slice(colonIdx + 2) : '';
                return (
                  <div key={idx} className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50/30 p-4 dark:border-amber-800/40 dark:bg-amber-900/10">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                    <div>
                      <p className="text-[13.5px] font-bold text-amber-900 dark:text-amber-200">{title}</p>
                      {desc && <p className="mt-1 text-[12.5px] leading-relaxed text-amber-700 dark:text-amber-300/70">{desc}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </DocSection>
        )}

        {/* ── 7. FAQ ── */}
        {page.faqs && page.faqs.length > 0 && (
          <DocSection id={`${page.id}-faq`}>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Frequently Asked Questions</h2>
            <Accordion items={page.faqs} />
          </DocSection>
        )}

        {/* ── 8. Ticket form ── */}
        {page.hasTicketForm && (
          <DocSection id={`${page.id}-ticket`}>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Submit a Support Ticket</h2>
            <TicketForm />
          </DocSection>
        )}

        {/* ── Next page CTA + Related ── */}
        <div className="border-t border-slate-200 pt-8 dark:border-slate-800">
          {page.nextPageCTA && (
            <DocSection id={`${page.id}-next`} className="!scroll-mt-0 mb-6">
              <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400 mb-3">Next Step</p>
              <Link
                to={`/docs/${page.nextPageCTA.id}`}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50/70 to-white/10 px-6 py-5 transition-all hover:border-slate-400 hover:shadow-lg hover:shadow-slate-900/10 dark:border-slate-700 dark:from-slate-800/40 dark:to-slate-900 dark:hover:border-slate-500"
              >
                <div>
                  <p className="text-[16px] font-black text-slate-900 dark:text-white">{page.nextPageCTA.title}</p>
                  <p className="mt-1 text-[13px] text-slate-500 dark:text-slate-400">{page.nextPageCTA.desc}</p>
                </div>
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-800 text-white transition-transform group-hover:translate-x-0.5 dark:bg-slate-200 dark:text-slate-900">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </DocSection>
          )}
          <RelatedPages relatedPages={page.relatedPages} currentId={page.id} />
        </div>

      </div>
    );
  };

  const isOverviewPage = page.id === 'what-is-nola-sms-pro' || page.id === 'how-nola-sms-pro-works' || page.id === 'core-features';

  if (isOverviewPage) {
    return (

      <div className="space-y-12">

        {/* ─── WHAT IS NOLA SMS PRO ─── */}
        {page.id === 'what-is-nola-sms-pro' && (
          <div className="space-y-10 text-slate-700 dark:text-slate-300">

            <DocSection id="what-is-overview">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Unified Philippine SMS Platform</h2>
              <p className="text-[14.5px] leading-7 mb-4">
                NOLA SMS Pro is a native communication portal embedded directly inside your GoHighLevel sub-account. It is purpose-built for businesses that need to reach Philippine mobile subscribers across Globe, Smart, and DITO networks — without ever leaving the CRM dashboard.
              </p>
              <p className="text-[14.5px] leading-7 mb-4">
                Instead of toggling between a third-party SMS tool and your CRM, NOLA SMS Pro puts everything in one place: your contacts, message history, templates, sender identity, and billing credits — all available from a single sidebar entry in HighLevel.
              </p>
              <p className="text-[14.5px] leading-7">
                The platform is built on top of a robust dual-gateway backend design, supporting both <strong>Semaphore</strong> (the primary domestic aggregator) and <strong>UniSMS</strong> (the secondary API gateway). This dual configuration ensures high delivery rates, local priority routing, and automatic failover handling.
              </p>
            </DocSection>

            <DocSection id="what-is-value">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-5">Why Teams Use NOLA SMS Pro</h2>

              <p className="text-[14.5px] leading-7 mb-6">
                Traditional SMS workflows require exporting a contact list, importing it into a separate messaging tool, sending, then reconciling delivery reports back into the CRM. NOLA SMS Pro eliminates every step of that cycle.
              </p>

              <div className="space-y-5">
                <div className="border-l-2 border-blue-400 pl-4">
                  <h3 className="font-bold text-slate-900 dark:text-white text-[15px] mb-1">No More Tab Switching</h3>
                  <p className="text-[13.5px] leading-6 text-slate-600 dark:text-slate-400">
                    Agents stay in GoHighLevel. Contacts are pulled in real time from the same database powering your pipelines, automations, and conversations — no exports, no stale lists.
                  </p>
                </div>
                <div className="border-l-2 border-emerald-400 pl-4">
                  <h3 className="font-bold text-slate-900 dark:text-white text-[15px] mb-1">Branded Sender Identity</h3>
                  <p className="text-[13.5px] leading-6 text-slate-600 dark:text-slate-400">
                    Register a custom Sender ID — your brand name or campaign alias — so recipients see <code className="text-[12px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono">YOURBRAND</code> instead of a random mobile number. This boosts open rates and reduces spam filtering.
                  </p>
                </div>
                <div className="border-l-2 border-amber-400 pl-4">
                  <h3 className="font-bold text-slate-900 dark:text-white text-[15px] mb-1">Localized Credit Billing</h3>
                  <p className="text-[13.5px] leading-6 text-slate-600 dark:text-slate-400">
                    Credits are denominated per SMS segment. One credit = one 160-character message to a Philippine number. Your sub-account has its own credit wallet that your agency can top up anytime, keeping billing predictable and usage transparent.
                  </p>
                </div>
                <div className="border-l-2 border-purple-400 pl-4">
                  <h3 className="font-bold text-slate-900 dark:text-white text-[15px] mb-1">Template Library for Consistency</h3>
                  <p className="text-[13.5px] leading-6 text-slate-600 dark:text-slate-400">
                    Marketing and support teams can store pre-approved message blocks — promotions, appointment reminders, payment confirmations — and load them into the compose window in one click. Every agent sends the same accurate message.
                  </p>
                </div>
                <div className="border-l-2 border-rose-400 pl-4">
                  <h3 className="font-bold text-slate-900 dark:text-white text-[15px] mb-1">Full Delivery Audit Trail</h3>
                  <p className="text-[13.5px] leading-6 text-slate-600 dark:text-slate-400">
                    Every dispatched message is logged with a carrier status code: <strong>Sending</strong>, <strong>Sent</strong>, or <strong>Failed</strong>. Message History lets you drill down by date, recipient, or sender to audit campaign performance.
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 dark:border-amber-800/40 dark:bg-amber-900/10">
                <p className="text-[13px] font-semibold text-amber-800 dark:text-amber-300">
                  <strong>Who is this for?</strong> — NOLA SMS Pro is designed for GoHighLevel agencies and sub-account operators managing Philippine customer bases: real estate teams, clinics, lending companies, logistics operations, and e-commerce stores that rely on SMS for last-mile communication.
                </p>
              </div>
            </DocSection>

            <DocSection id="what-is-carriers">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Supported Networks & Delivery Reach</h2>
              <p className="text-[14.5px] leading-7 mb-5">
                Messages sent through NOLA SMS Pro are routed via Semaphore or UniSMS to all Philippine mobile carriers. As of the current release, delivery is supported for:
              </p>
              <div className="grid gap-4 sm:grid-cols-3 mb-6">
                {[
                  { name: 'Globe Telecom', note: 'Includes TM (Touch Mobile) prepaid subscribers', color: 'border-blue-200 dark:border-blue-800/40 bg-blue-50 dark:bg-blue-900/10' },
                  { name: 'Smart Communications', note: 'Includes TNT (Talk N Text) and Sun Cellular', color: 'border-emerald-200 dark:border-emerald-800/40 bg-emerald-50 dark:bg-emerald-900/10' },
                  { name: 'DITO Telecommunity', note: 'Third major carrier, growing national coverage', color: 'border-purple-200 dark:border-purple-800/40 bg-purple-50 dark:bg-purple-900/10' },
                ].map((carrier) => (
                  <div key={carrier.name} className={`rounded-xl border p-4 ${carrier.color}`}>
                    <p className="font-bold text-slate-900 dark:text-white text-[14px] mb-1">{carrier.name}</p>
                    <p className="text-[12.5px] text-slate-500 dark:text-slate-400 leading-5">{carrier.note}</p>
                  </div>
                ))}
              </div>
              <p className="text-[13.5px] leading-6 text-slate-600 dark:text-slate-400">
                All recipient numbers must follow the Philippine 11-digit mobile format: <code className="text-[12px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono">09XXXXXXXXX</code>. Numbers with international country codes (+63) are normalized automatically by our backend formatter.
              </p>
            </DocSection>

          </div>
        )}

        {/* ─── HOW NOLA SMS PRO WORKS ─── */}
        {page.id === 'how-nola-sms-pro-works' && (
          <div className="space-y-10 text-slate-700 dark:text-slate-300">

            <DocSection id="how-it-works-gateway">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Gateway Architecture & Providers</h2>
              <p className="text-[14.5px] leading-7 mb-4">
                At its core, NOLA SMS Pro bridges your CRM workspace directly to Philippine telco networks. The platform relies on a dual-provider model using two API gateways:
              </p>

              <div className="grid gap-6 sm:grid-cols-2 mb-6">
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-2 bg-slate-50/50 dark:bg-slate-900/30">
                  <h3 className="font-bold text-[15px] text-slate-900 dark:text-white">Semaphore Gateway</h3>
                  <p className="text-[13px] leading-6 text-slate-600 dark:text-slate-400">
                    Acts as the primary carrier aggregator for standard local routing. Highly optimized for domestic Philippine traffic, delivering messages at high speeds to Globe and Smart.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-2 bg-slate-50/50 dark:bg-slate-900/30">
                  <h3 className="font-bold text-[15px] text-slate-900 dark:text-white">UniSMS Gateway</h3>
                  <p className="text-[13px] leading-6 text-slate-600 dark:text-slate-400">
                    Acts as the secondary API gateway. Used as the automated failover backup route, for dedicated custom Sender IDs, or when subaccounts explicitly configure UniSMS custom API keys.
                  </p>
                </div>
              </div>

              <p className="text-[14.5px] leading-7 mb-4">
                The active provider is managed via the backend configuration under Firestore's admin settings. It supports three routing strategies:
              </p>

              <ul className="list-disc pl-5 space-y-2.5 text-[14px] leading-6 mb-6">
                <li><strong>Semaphore-only:</strong> Routes all standard messages through Semaphore.</li>
                <li><strong>UniSMS-only:</strong> Directs all messages to UniSMS.</li>
                <li><strong>Auto-Failover:</strong> Primary routing is attempted via Semaphore. If Semaphore returns a network timeout, an HTTP 5xx server error, or a cURL error, the backend automatically logs the incident and fails over to UniSMS to ensure message delivery.</li>
              </ul>

              <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 px-5 py-4 dark:border-blue-800/40 dark:bg-blue-900/10">
                <p className="text-[13px] leading-6 text-blue-800 dark:text-blue-300">
                  <strong>Important:</strong> NOLA SMS Pro requires an active credit balance before any message is dispatched. The system checks your wallet on every send. If credits fall to zero, messages will fail until the account is topped up.
                </p>
              </div>
            </DocSection>

            <DocSection id="how-it-works-rules">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Credits, Segments & Formatting Rules</h2>
              <p className="text-[14.5px] leading-7 mb-5">
                SMS credits are consumed per message segment. Understanding how segments work prevents unexpected credit deductions when sending longer or templated messages.
              </p>

              <div className="space-y-4 mb-6">
                <div className="border-l-2 border-blue-400 pl-4">
                  <h3 className="font-bold text-slate-900 dark:text-white text-[14px] mb-1">Standard GSM-7 Messages</h3>
                  <p className="text-[13.5px] leading-6 text-slate-600 dark:text-slate-400">
                    A message using only standard Latin characters (letters, numbers, basic punctuation) is encoded in GSM-7. Each segment holds up to <strong>160 characters</strong>. A 200-character message uses 2 credits.
                  </p>
                </div>
                <div className="border-l-2 border-emerald-400 pl-4">
                  <h3 className="font-bold text-slate-900 dark:text-white text-[14px] mb-1">Unicode / Special Characters</h3>
                  <p className="text-[13.5px] leading-6 text-slate-600 dark:text-slate-400">
                    Messages containing emoji, accented characters, or non-Latin scripts switch to Unicode encoding. Unicode segments hold only <strong>70 characters</strong> each. Avoid emoji in high-volume campaigns to minimize credit usage.
                  </p>
                </div>
                <div className="border-l-2 border-amber-400 pl-4">
                  <h3 className="font-bold text-slate-900 dark:text-white text-[14px] mb-1">Recipient Number Format</h3>
                  <p className="text-[13.5px] leading-6 text-slate-600 dark:text-slate-400">
                    Only Philippine mobile numbers in 11-digit format starting with <code className="text-[12px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono">09</code> are accepted (e.g. <code className="text-[12px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono">09171234567</code>). Mobile formats using country code <code className="text-[12px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono">+63</code> or <code className="text-[12px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono">639</code> are normalized automatically on the backend.
                  </p>
                </div>
                <div className="border-l-2 border-purple-400 pl-4">
                  <h3 className="font-bold text-slate-900 dark:text-white text-[14px] mb-1">UniSMS Spam Protection Filter</h3>
                  <p className="text-[13.5px] leading-6 text-slate-600 dark:text-slate-400">
                    To prevent carrier blocks and spam penalty flags, our backend contains strict pre-flight validation rules. Generic test phrases (such as <code className="text-[12px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono">test</code>, <code className="text-[12px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono">sms test</code>, or <code className="text-[12px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono">NOLA SMS test</code>) are rejected <strong>before the provider call</strong> with <code className="text-[12px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono">error=unisms_likely_spam</code>.
                  </p>
                </div>
                <div className="border-l-2 border-rose-400 pl-4">
                  <h3 className="font-bold text-slate-900 dark:text-white text-[14px] mb-1">Credit Deduction Timing</h3>
                  <p className="text-[13.5px] leading-6 text-slate-600 dark:text-slate-400">
                    Credits are reserved and deducted at the moment of dispatch — before carrier confirmation. If the carrier returns a failed status, credits are not automatically refunded.
                  </p>
                </div>
              </div>
            </DocSection>

            <DocSection id="how-it-works-flow">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-5">End-to-End Message Flow</h2>
              <p className="text-[14.5px] leading-7 mb-6">
                From the moment you click <strong>Send</strong> in the Compose panel to the moment a status appears in Message History, here is what happens behind the scenes:
              </p>

              <div className="space-y-0">
                {[
                  {
                    step: 1,
                    title: 'Contact Selection & Real-Time Resolution',
                    desc: 'You search and select a recipient. NOLA SMS Pro pulls details from the live HighLevel database. If a location-level sync error occurs, contacts are rendered using a local cache with a non-blocking stale warning.',
                    color: 'bg-blue-500',
                  },
                  {
                    step: 2,
                    title: 'Message Composition & Character Check',
                    desc: 'You type your message or load a Template. The Compose panel shows a live character counter and segment count. Pre-flight checks ensure no UniSMS generic spam phrases are included.',
                    color: 'bg-indigo-500',
                  },
                  {
                    step: 3,
                    title: 'Sender ID Selection',
                    desc: 'You choose from your approved custom Sender IDs or the default NOLASMSPro mask. Custom Sender IDs cannot be set as default; they are selected explicitly per message.',
                    color: 'bg-violet-500',
                  },
                  {
                    step: 4,
                    title: 'Credit Wallet Gate',
                    desc: 'The backend verifies your credit balance. If credits are insufficient, the send is blocked immediately. If the API check fails, the last good balance is preserved rather than resetting to zero.',
                    color: 'bg-purple-500',
                  },
                  {
                    step: 5,
                    title: 'Gateway Provider Routing',
                    desc: 'The backend parses the active configuration. If a custom subaccount API key starts with "sk_", the message goes to UniSMS. If auto-failover is active and Semaphore fails, the backend logs the incident in Firestore and routes the message through UniSMS.',
                    color: 'bg-fuchsia-500',
                  },
                  {
                    step: 6,
                    title: 'Delivery Receipt & History Log',
                    desc: 'The carrier returns status receipts. The backend logs the result to Message History with the exact status mapping: Sending (queued for transmission), Sent (delivered to carrier), or Failed.',
                    color: 'bg-rose-500',
                  },
                ].map((item, idx, arr) => (
                  <div key={idx} className="flex gap-4 items-stretch">
                    <div className="flex flex-col items-center">
                      <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white text-[12px] font-bold ${item.color}`}>
                        {item.step}
                      </div>
                      {idx < arr.length - 1 && (
                        <div className="w-px flex-1 bg-slate-200 dark:bg-slate-700 my-1" />
                      )}
                    </div>
                    <div className="pb-6 min-w-0">
                      <h4 className="font-bold text-slate-900 dark:text-white text-[14px] mt-0.5 mb-1">{item.title}</h4>
                      <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-6">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </DocSection>

          </div>
        )}

        {/* ─── CORE FEATURES ─── */}
        {page.id === 'core-features' && (
          <div className="space-y-10 text-slate-700 dark:text-slate-300">

            <DocSection id="core-features-modules">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3">Six Functional Modules</h2>
              <p className="text-[14.5px] leading-7 mb-7">
                NOLA SMS Pro is organized into six distinct modules, each accessible from the app's navigation panel. Every module serves a specific operational role — from managing who you contact, to tracking what was sent and whether it arrived.
              </p>

              <div className="space-y-7">
                {[
                  {
                    icon: <Users className="h-5 w-5 text-blue-500" />,
                    title: 'Contacts',
                    badge: 'LOOKUP & SEARCH',
                    badgeColor: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
                    desc: 'Provides a live search interface over your GoHighLevel contact database. You can look up any subscriber by name or number, view profile details, and select them as a recipient.',
                    details: [
                      'Real-time search pulls from your HighLevel sub-account location.',
                      'Displays contact name, mobile number, and associated tags from the CRM.',
                      'Contact data is read-only (edits are made in GHL and synchronized here).',
                      'Render stale contacts with a warning badge if the API/sync is offline; list is not erased.',
                    ],
                  },
                  {
                    icon: <Send className="h-5 w-5 text-purple-500" />,
                    title: 'Compose SMS',
                    badge: 'SEND MESSAGES',
                    badgeColor: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
                    desc: 'The panel where outbound messages are composed and sent. Features a segment indicator, template selector, and Sender ID dropdown.',
                    details: [
                      'Live character count with automatic segment calculation.',
                      'Load templates directly into the compose body with one click.',
                      'Select default (NOLASMSPro) or approved custom Sender IDs.',
                      'Pre-flight check blocks sending generic spam phrases.',
                    ],
                  },
                  {
                    icon: <FileText className="h-5 w-5 text-emerald-500" />,
                    title: 'Message Templates',
                    badge: 'REUSABLE COPY',
                    badgeColor: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
                    desc: 'Templates lets your team create, store, and manage pre-written message blueprints. Useful for appointment reminders, payment follow-ups, and promotional announcements.',
                    details: [
                      'Create templates with a name and body text.',
                      'Templates are available to all authorized agents in your sub-account.',
                      'Edit or delete templates at any time — changes apply immediately.',
                    ],
                  },
                  {
                    icon: <ShieldCheck className="h-5 w-5 text-amber-500" />,
                    title: 'Sender IDs',
                    badge: 'BRAND IDENTITY',
                    badgeColor: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400',
                    desc: 'Sender IDs allow your brand name to appear as the sender on Philippine mobile devices instead of a raw phone number. Custom ID registration is required under local NTC rules.',
                    details: [
                      'Submit custom Sender ID requests (alphanumeric, 3-11 characters).',
                      'Track approval states: Pending, Approved, or Rejected.',
                      'Once approved, custom Sender IDs become selectable in the dropdown.',
                      'Default sender NOLASMSPro is active immediately after installation (cannot set a custom ID as default).',
                    ],
                  },
                  {
                    icon: <CreditCard className="h-5 w-5 text-teal-500" />,
                    title: 'SMS Credits',
                    badge: 'BILLING WALLET',
                    badgeColor: 'bg-teal-50 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400',
                    desc: 'The Credits module is your billing dashboard. It shows your current balance, deduction history, and transaction logs.',
                    details: [
                      'View real-time credit balance on the dashboard home banner.',
                      'Deductions transaction log shows date, recipient, and segment counts.',
                      'Failed credit updates preserve the last known good balance (never resets to zero).',
                      'Disable refuels and billing transactions unless the client lifecycle is ready.',
                    ],
                  },
                  {
                    icon: <History className="h-5 w-5 text-rose-500" />,
                    title: 'Message History',
                    badge: 'DELIVERY LOGS',
                    badgeColor: 'bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400',
                    desc: 'Message History is the audit trail of every outbound SMS dispatched from your sub-account. Shows recipient, sender ID, message body, timestamp, and status.',
                    details: [
                      'Filter by date range, recipient number, or delivery status.',
                      'Exact status mappings: Sending (queued for dispatch), Sent (accepted by carrier/delivered), and Failed (rejected/error).',
                      'Provider failures are kept visible to easily audit undelivered messages.',
                    ],
                  },
                ].map((module, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/50">
                      {module.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-bold text-slate-900 dark:text-white text-[15px]">{module.title}</h3>
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${module.badgeColor}`}>{module.badge}</span>
                      </div>
                      <p className="text-[13.5px] leading-6 text-slate-600 dark:text-slate-400 mb-2.5">{module.desc}</p>
                      <ul className="space-y-1">
                        {module.details.map((d, i) => (
                          <li key={i} className="flex items-start gap-2 text-[13px] text-slate-500 dark:text-slate-400">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300 dark:bg-slate-600" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </DocSection>

            <DocSection id="core-features-settings">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Settings & Account Configuration</h2>
              <p className="text-[14.5px] leading-7 mb-5">
                The Settings module is the administrative control panel for your NOLA SMS Pro workspace. It is organized into three sections: your admin profile, workspace location configuration, and notification preferences.
              </p>

              <div className="space-y-5">
                <div className="border-l-2 border-blue-400 pl-4">
                  <h3 className="font-bold text-slate-900 dark:text-white text-[14.5px] mb-1">Admin Profile</h3>
                  <p className="text-[13.5px] leading-6 text-slate-600 dark:text-slate-400">
                    Update your full name and email address. Password changes use a secure OTP sent to your registered email — no current password required. Profile data is specific to your account login and does not affect HighLevel credentials.
                  </p>
                </div>
                <div className="border-l-2 border-emerald-400 pl-4">
                  <h3 className="font-bold text-slate-900 dark:text-white text-[14.5px] mb-1">Workspace Location</h3>
                  <p className="text-[13.5px] leading-6 text-slate-600 dark:text-slate-400">
                    Your HighLevel sub-account location ID is displayed here. You can copy it for reference or trigger a manual contact sync if the Contacts module shows stale data. Each sub-account installation has exactly one location linked.
                  </p>
                </div>
                <div className="border-l-2 border-amber-400 pl-4">
                  <h3 className="font-bold text-slate-900 dark:text-white text-[14.5px] mb-1">Notification Preferences</h3>
                  <p className="text-[13.5px] leading-6 text-slate-600 dark:text-slate-400">
                    Configure email alerts for key platform events: low credit balance warnings (set your own threshold), weekly usage summaries, and delivery failure notifications for campaigns above a configurable failure rate. All alerts go to your profile email.
                  </p>
                </div>
              </div>
            </DocSection>

          </div>
        )}

      </div>
    );
  }

  // Route: welcome page renders nothing here (WelcomeContent handles it in DocPageRenderer)
  if (page.id === 'overview') return null;

  // Route: all section pages use the intro-style structured layout
  return renderSectionPageContent();
};
