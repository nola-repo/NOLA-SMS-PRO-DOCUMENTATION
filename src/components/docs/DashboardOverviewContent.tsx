import React from 'react';
import type { DocPage } from '../../data/docsData';
import { InfoBox, SuccessBox } from '../Callouts';
import { DocSection, DocSectionHeading } from './layout';
import { Link } from 'react-router-dom';
import {
  Home,
  Users,
  Send,
  FolderOpen,
  History,
  Settings,
  Gift,
  CreditCard,
  RefreshCw,
  FileText,
  ShieldCheck,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface Props {
  page: DocPage;
}

export const DashboardOverviewContent: React.FC<Props> = ({ page }) => {
  return (
    <div className="w-full space-y-10">
      {/* HEADER METADATA */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#D7E7FA] pb-4 dark:border-[#183354]">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-[#E8F3FF] px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-[#1F5AAE] dark:bg-[#102B4F] dark:text-[#9AC3FF]">
          {page.readingTime}
        </span>
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          {page.section} {page.subsection ? `> ${page.subsection}` : ''}
        </span>
      </div>

      {/* Section A — Key Objective */}
      <DocSection id="dashboard-key-objective">
        <InfoBox title="Key Objective">
          Understand the layout of your workspace, monitor essential operational alerts, and navigate each menu panel to run your messaging campaigns.
        </InfoBox>
      </DocSection>

      {/* Section B — Prerequisites */}
      <DocSection id="dashboard-prerequisites">
        <DocSectionHeading>Prerequisites</DocSectionHeading>
        <div className="rounded-2xl border border-[#BCD7F5] bg-[#E8F3FF]/30 p-5 dark:border-[#1F3D68] dark:bg-[#102B4F]/20 flex items-start gap-4 max-w-[640px]">
          <CheckCircle2 className="h-5 w-5 text-[#1F5AAE] dark:text-[#72A8FF] flex-shrink-0 mt-0.5" />
          <p className="text-[13.5px] leading-relaxed text-[#123C76] dark:text-blue-100 font-medium">
            Successfully completed the Marketplace installation and connected your GoHighLevel account.
          </p>
        </div>
      </DocSection>

      {/* Section C — Must-Know Dashboard Highlights */}
      <DocSection id="dashboard-highlights">
        <DocSectionHeading>Must-Know Dashboard Highlights</DocSectionHeading>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: 10 Free Trial Credits */}
          <div className="premium-card flex flex-col justify-between">
            <div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
                <Gift className="h-5 w-5" />
              </div>
              <h3 className="text-[15px] font-black text-[#071A33] dark:text-white uppercase tracking-wider mb-2">
                10 Free Trial Credits
              </h3>
              <p className="text-[13px] leading-relaxed text-[#5D7596] dark:text-slate-400">
                Upon completing registration, every new account receives 10 free trial credits to test the platform before purchasing additional SMS credits.
              </p>
            </div>
          </div>

          {/* Card 2: Active SMS Credit Balance */}
          <div className="premium-card flex flex-col justify-between">
            <div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                <CreditCard className="h-5 w-5" />
              </div>
              <h3 className="text-[15px] font-black text-[#071A33] dark:text-white uppercase tracking-wider mb-2">
                Active SMS Balance
              </h3>
              <p className="text-[13px] leading-relaxed text-[#5D7596] dark:text-slate-400">
                Your available SMS credits are displayed on the Home dashboard. Outbound messaging is automatically blocked when your balance reaches zero.
              </p>
            </div>
          </div>

          {/* Card 3: Real-time GHL Sync */}
          <div className="premium-card flex flex-col justify-between">
            <div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-455">
                <RefreshCw className="h-5 w-5" />
              </div>
              <h3 className="text-[15px] font-black text-[#071A33] dark:text-white uppercase tracking-wider mb-2">
                Real-time GHL Sync
              </h3>
              <p className="text-[13px] leading-relaxed text-[#5D7596] dark:text-slate-400">
                Contacts managed in GoHighLevel are synchronized automatically with NOLA SMS Pro. Manual imports or CSV uploads are not required.
              </p>
            </div>
          </div>

          {/* Card 4: Segment Length Constraints */}
          <div className="premium-card flex flex-col justify-between sm:col-span-2 lg:col-span-1">
            <div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400">
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="text-[15px] font-black text-[#071A33] dark:text-white uppercase tracking-wider mb-2">
                Length Constraints
              </h3>
              <p className="text-[13px] leading-relaxed text-[#5D7596] dark:text-slate-400">
                A standard SMS contains up to 160 characters. Messages containing special characters (such as emojis) or exceeding this limit may be split into multiple message segments, consuming additional SMS credits.
              </p>
            </div>
          </div>

          {/* Card 5: Sending Identity */}
          <div className="premium-card flex flex-col justify-between sm:col-span-2 lg:col-span-2">
            <div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-[15px] font-black text-[#071A33] dark:text-white uppercase tracking-wider mb-2">
                Sending Identity
              </h3>
              <p className="text-[13px] leading-relaxed text-[#5D7596] dark:text-slate-400">
                Messages are sent using the default sender identity <code>NOLASMSPro</code> unless an approved custom Sender ID has been configured for your account.
              </p>
            </div>
          </div>
        </div>
      </DocSection>

      {/* Section D — Menu Functionality Breakdown */}
      <DocSection id="menu-breakdown">
        <DocSectionHeading>Menu Functionality Breakdown</DocSectionHeading>
        <div className="space-y-6">
          {[
            {
              title: 'Home',
              icon: Home,
              color: 'text-blue-500 bg-blue-500/10 dark:bg-blue-500/20',
              badge: '🏠 Home',
              items: [
                'View your current SMS credit balance, including remaining trial credits.',
                'Monitor daily and monthly messaging statistics.',
                'Review low-credit alerts.',
                'Access quick actions to compose messages or purchase additional credits.'
              ]
            },
            {
              title: 'Contacts',
              icon: Users,
              color: 'text-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/20',
              badge: '👥 Contacts',
              items: [
                'Browse, search, and filter synchronized GoHighLevel contacts.',
                'Create new contacts using valid Philippine mobile numbers (09XXXXXXXXX).',
                'Open individual conversations directly from the contact list.'
              ]
            },
            {
              title: 'Compose SMS',
              icon: Send,
              color: 'text-purple-500 bg-purple-500/10 dark:bg-purple-500/20',
              badge: '📝 Compose SMS',
              items: [
                'Select one or multiple recipients.',
                'Choose the default or approved Sender ID.',
                'Write SMS messages with live character and credit estimation.',
                'Insert reusable message templates.'
              ]
            },
            {
              title: 'Templates',
              icon: FolderOpen,
              color: 'text-amber-500 bg-amber-500/10 dark:bg-amber-500/20',
              badge: '🗂️ Templates',
              items: [
                'Create and manage reusable SMS templates.',
                'Organize templates into folders or categories.',
                'Review formatting before sending.'
              ]
            },
            {
              title: 'Message History',
              icon: History,
              color: 'text-indigo-500 bg-indigo-500/10 dark:bg-indigo-500/20',
              badge: '📊 Message History',
              items: [
                'Review outbound SMS history.',
                'Monitor delivery statuses such as Sending, Sent, and Failed.',
                'Inspect delivery errors and message costs.',
                'Audit SMS credit usage.'
              ]
            },
            {
              title: 'Settings',
              icon: Settings,
              color: 'text-slate-500 bg-slate-500/10 dark:bg-slate-500/20',
              badge: '⚙️ Settings',
              items: [
                'Manage your account profile.',
                'Request additional Sender IDs.',
                'Configure notification preferences, including low-credit alerts.',
                'Purchase SMS credit packages.'
              ]
            }
          ].map((menu, idx) => {
            const Icon = menu.icon;
            return (
              <div key={idx} className="rounded-2xl border border-[#D7E7FA] bg-[#F8FBFF] p-6 dark:border-[#183354] dark:bg-[#0B1627] hover:border-[#4F8EF7] dark:hover:border-[#72A8FF] transition-all duration-300 shadow-sm shadow-[#184B8F]/3">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${menu.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-[#1F5AAE] dark:text-[#72A8FF]">
                      Navigation Tab
                    </span>
                    <h4 className="text-[16px] font-black text-[#0B2E63] dark:text-white leading-tight mt-0.5">
                      {menu.badge}
                    </h4>
                  </div>
                </div>
                <ul className="space-y-2.5">
                  {menu.items.map((item, subIdx) => (
                    <li key={subIdx} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-[#425B7D] dark:text-slate-350 font-medium">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#1F5AAE] dark:bg-[#72A8FF]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </DocSection>

      {/* Section E — Expected Outcome */}
      <DocSection id="dashboard-expected-outcome">
        <SuccessBox title="Expected Outcome">
          With a clear understanding of the dashboard highlights and menu functionalities, you can confidently manage contacts, templates, SMS credits, and outbound messaging from the NOLA SMS Pro workspace.
        </SuccessBox>
      </DocSection>

      {/* Section 7 — Closing + CTA */}
      <div className="border-t border-[#D7E7FA] pt-8 dark:border-[#183354]">
        <section aria-labelledby="closing-heading">
          <p className="text-[15px] font-medium leading-7 text-[#425B7D] dark:text-slate-300 max-w-[720px]">
            Ready to send your first message? The next guide maps out a step-by-step workflow to help you compose and dispatch your first text segment.
          </p>

          {/* Next Page CTA */}
          <Link
            to="/docs/send-your-first-sms"
            id="dashboard-next-cta"
            className="group mt-6 inline-flex items-center gap-3 rounded-2xl border border-[#4F8EF7]/30 bg-gradient-to-r from-[#1F5AAE] to-[#3B7FE0] px-6 py-4 text-white shadow-lg shadow-[#184B8F]/20 transition-all duration-200 hover:shadow-xl hover:shadow-[#184B8F]/30 hover:opacity-95"
          >
            <span className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#B8D8FF]">
                Next guide
              </span>
              <span className="mt-0.5 text-[15px] font-black leading-tight">
                Send Your First SMS
              </span>
            </span>
            <ArrowRight className="h-5 w-5 flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
          </Link>

          {/* Version note */}
          <p className="mt-6 text-[12px] text-[#7B93B1] dark:text-slate-500 leading-relaxed">
            This documentation reflects NOLA SMS Pro version 1.0. If your app looks
            different, visit{' '}
            <Link
              to="/docs/support-help"
              className="font-semibold text-[#1F5AAE] underline underline-offset-2 dark:text-[#72A8FF]"
            >
              Support &amp; Help
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
};
