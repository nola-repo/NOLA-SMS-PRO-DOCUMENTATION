import React from 'react';
import type { DocPage } from '../../data/docsData';
import { DocSection } from './layout';
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
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface Props {
  page: DocPage;
}

export const DashboardOverviewContent: React.FC<Props> = ({ page }) => {
  return (
    <div className="w-full space-y-12 pb-10">


      {/* INTRO */}
      <section id="dashboard-key-objective" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">What this guide covers</h2>
        <p className="text-[14.5px] leading-7 text-slate-700 dark:text-slate-300">
          Understand the layout of your workspace, monitor essential operational alerts, and navigate each menu panel to run your messaging campaigns.
        </p>
        <p className="text-[14.5px] leading-7 text-slate-700 dark:text-slate-300">
          The dashboard acts as your central command center, offering immediate visibility into your remaining credit balances, outbound SMS volume statistics, and active Sender ID masks, ensuring you can manage day-to-day operations at a glance.
        </p>
      </section>

      {/* PREREQUISITES */}
      <section id="dashboard-prerequisites" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Prerequisites</h2>
        <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/30 max-w-[640px]">
          <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/50 text-slate-600 dark:text-slate-400">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[13.5px] font-semibold leading-relaxed text-slate-800 dark:text-slate-200 mt-1">
              Successfully completed the Marketplace installation and connected your GoHighLevel account.
            </p>
          </div>
        </div>
      </section>

      {/* MUST-KNOW HIGHLIGHTS */}
      <section id="dashboard-highlights" className="space-y-6">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Must-know workspace features</h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: 10 Free Trial Credits */}
          <div className="premium-card flex flex-col justify-between h-full">
            <div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                <Gift className="h-5 w-5 text-amber-500" />
              </div>
              <h3 className="text-[15px] font-black text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                10 Free Trial Credits
              </h3>
              <p className="text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">
                Upon completing registration, every new location receives 10 free trial credits to test the platform outbox and confirm delivery status.
              </p>
            </div>
          </div>

          {/* Card 2: Active SMS Credit Balance */}
          <div className="premium-card flex flex-col justify-between h-full">
            <div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                <CreditCard className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="text-[15px] font-black text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                Active SMS Balance
              </h3>
              <p className="text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">
                Your available SMS credits are displayed on the Home dashboard. Outbound messaging is automatically blocked when your balance reaches zero.
              </p>
            </div>
          </div>

          {/* Card 3: Real-time GHL Sync */}
          <div className="premium-card flex flex-col justify-between h-full">
            <div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                <RefreshCw className="h-5 w-5 text-emerald-500" />
              </div>
              <h3 className="text-[15px] font-black text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                Real-time GHL Sync
              </h3>
              <p className="text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">
                Contacts managed in GoHighLevel are synchronized automatically with NOLA SMS Pro. Manual CSV exports are not required.
              </p>
            </div>
          </div>

          {/* Card 4: Segment Length Constraints */}
          <div className="premium-card flex flex-col justify-between h-full sm:col-span-1">
            <div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                <FileText className="h-5 w-5 text-purple-500" />
              </div>
              <h3 className="text-[15px] font-black text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                Length Constraints
              </h3>
              <p className="text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">
                A standard SMS contains up to 160 characters. Special characters (such as emojis) switch encoding to Unicode, reducing segments to 70 characters.
              </p>
            </div>
          </div>

          {/* Card 5: Sending Identity */}
          <div className="premium-card flex flex-col justify-between h-full sm:col-span-2">
            <div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                <ShieldCheck className="h-5 w-5 text-teal-500" />
              </div>
              <h3 className="text-[15px] font-black text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                Sending Identity
              </h3>
              <p className="text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">
                Messages are sent using the default sender identity <code className="text-[12px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono">NOLASMSPro</code> unless an approved custom Sender ID has been configured and selected explicitly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MENU BREAKDOWN */}
      <section id="menu-breakdown" className="space-y-6">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Menu functionality breakdown</h2>
        <div className="space-y-6">
          {[
            {
              title: 'Home',
              icon: Home,
              color: 'text-blue-500',
              badge: 'Home Dashboard',
              items: [
                'View your current SMS credit balance, including remaining trial credits.',
                'Monitor daily and monthly messaging statistics and outbox volumes.',
                'Review low-credit threshold warnings.',
                'Access quick actions to compose messages or request top-up packages.'
              ]
            },
            {
              title: 'Contacts',
              icon: Users,
              color: 'text-emerald-500',
              badge: 'Contacts Directory',
              items: [
                'Browse, search, and filter synchronized GoHighLevel contacts in real-time.',
                'Create new contacts using valid 11-digit Philippine mobile numbers.',
                'Launch individual outbox conversations directly from contact rows.'
              ]
            },
            {
              title: 'Compose SMS',
              icon: Send,
              color: 'text-purple-500',
              badge: 'Message Outbox',
              items: [
                'Select recipients and search contacts dynamically.',
                'Choose default or approved brand Sender ID masks.',
                'Write text copy with live segment estimates and pre-flight compliance checks.',
                'Load pre-saved template layout copies instantly.'
              ]
            },
            {
              title: 'Templates',
              icon: FolderOpen,
              color: 'text-amber-500',
              badge: 'Message Templates',
              items: [
                'Create, organize, and manage reusable standard SMS layouts.',
                'Store templates with descriptive naming tags for your support and sales teams.',
                'Use dynamic merge values like first name that resolve automatically on dispatch.'
              ]
            },
            {
              title: 'Message History',
              icon: History,
              color: 'text-indigo-500',
              badge: 'Outbox Logs Ledger',
              items: [
                'Audit chronological log outputs for all text campaigns.',
                'Monitor carrier statuses (Sending, Sent, and Failed) dynamically.',
                'Inspect exact provider-level error codes and credit costs.'
              ]
            },
            {
              title: 'Settings',
              icon: Settings,
              color: 'text-slate-500',
              badge: 'Account & Settings',
              items: [
                'Configure profile names, emails, and passwords with secure OTP codes.',
                'Verify active GoHighLevel sub-account location ID configurations.',
                'Configure low-credit threshold limits and alert emails.'
              ]
            }
          ].map((menu, idx) => {
            const Icon = menu.icon;
            return (
              <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#111827] hover:border-slate-400 dark:hover:border-slate-600 transition-all duration-300 shadow-sm shadow-[#0F172A]/2">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/50">
                    <Icon className={`h-5 w-5 ${menu.color}`} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">
                      Sidebar Panel
                    </span>
                    <h4 className="text-[16px] font-black text-slate-900 dark:text-white leading-tight mt-0.5">
                      {menu.badge}
                    </h4>
                  </div>
                </div>
                <ul className="space-y-2.5">
                  {menu.items.map((item, subIdx) => (
                    <li key={subIdx} className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-400 font-medium">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-400 dark:bg-slate-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* SUCCESS OUTCOME */}
      <section id="dashboard-expected-outcome">
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/40 px-5 py-4 dark:border-emerald-800/40 dark:bg-emerald-900/10">
          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
          <div>
            <p className="text-[13.5px] font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-wide mb-0.5">Expected Outcome</p>
            <p className="text-[13.5px] leading-relaxed text-emerald-700 dark:text-emerald-400 font-medium">
              With a clear understanding of the dashboard highlights and menu functionalities, you can confidently manage contacts, templates, SMS credits, and outbound messaging from the NOLA SMS Pro workspace.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
