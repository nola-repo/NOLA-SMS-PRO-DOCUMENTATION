import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import type { DocPage } from '../data/docsData';
import { docsData, sidebarStructure } from '../data/docsData';
import { WelcomeContent } from './docs/WelcomeContent';
import { FeaturePageContent } from './docs/FeaturePageContent';
import { Pagination } from './Pagination';
import { InstallNolaSmsProContent } from './docs/InstallNolaSmsProContent';
import { CreateOrSignInContent } from './docs/CreateOrSignInContent';
import { ConnectedHighlevelContent } from './docs/ConnectedHighlevelContent';
import { DashboardOverviewContent } from './docs/DashboardOverviewContent';
import { SendFirstSMSContent } from './docs/SendFirstSMSContent';
import { ContactsContent } from './docs/ContactsContent';
import { ComposeSmsContent } from './docs/ComposeSmsContent';
import { MessageTemplatesContent } from './docs/MessageTemplatesContent';
import { SenderIdsContent } from './docs/SenderIdsContent';
import { MessageHistoryContent } from './docs/MessageHistoryContent';
import { SmsCreditsContent } from './docs/SmsCreditsContent';
import { SettingsContent } from './docs/SettingsContent';
import { TroubleshootingContent } from './docs/TroubleshootingContent';
import { SupportHelpContent } from './docs/SupportHelpContent';
import { FAQContent } from './docs/FAQContent';
import {
  ArrowUpRight,
  BookOpen,
  CreditCard,
  FileText,
  HelpCircle,
  History,
  LayoutDashboard,
  MessageSquare,
  Rocket,
  Send,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Store,
  UserPlus,
  Users,
  Wrench,
  ArrowRightLeft,
  CheckCircle2,
  Compass,
} from 'lucide-react';

interface Props {
  page: DocPage;
}

const pageIconMap = {
  welcome: BookOpen,
  'what-is-nola-sms-pro': BookOpen,
  'how-nola-sms-pro-works': Wrench,
  'core-features': LayoutDashboard,
  'send-your-first-sms': Send,
  'install-nola-sms-pro': Store,
  'create-or-sign-in': UserPlus,
  'connect-highlevel': ArrowRightLeft,
  'dashboard-overview': LayoutDashboard,
  contacts: Users,
  'compose-sms': MessageSquare,
  'message-templates': FileText,
  'sender-ids': ShieldCheck,
  'message-history': History,
  'sms-credits': CreditCard,
  settings: Settings,
  troubleshooting: Wrench,
  'support-help': HelpCircle,
  faq: HelpCircle,
} satisfies Record<string, React.ComponentType<{ className?: string }>>;

function getPageIcon(page: DocPage) {
  if (pageIconMap[page.id as keyof typeof pageIconMap]) {
    return pageIconMap[page.id as keyof typeof pageIconMap];
  }
  if (page.section === 'SUPPORT') return ShieldAlert;
  if (page.section === 'SETUP') return Rocket;
  if (page.section === 'MESSAGING') return MessageSquare;
  return BookOpen;
}

function getHeaderPage(activeId: string, fallback: DocPage): DocPage {
  return docsData.find((item) => item.id === activeId) ?? fallback;
}

const StickyPageHeader: React.FC<{ page: DocPage }> = ({ page }) => {
  const Icon = getPageIcon(page);
  const isWelcomeHeader = page.id === 'welcome';

  if (isWelcomeHeader) {
    return (
      <header id="about-heading" className="mb-8">
        {/* Full-bleed hero banner — image covers the entire card */}
        <div
          className="relative overflow-hidden rounded-[20px] min-h-[280px] lg:min-h-[320px]"
          style={{
            backgroundImage: 'url(/hero-banner.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center right',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Left-side gradient overlay so text stays legible */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, rgba(10,18,35,0.92) 0%, rgba(10,18,35,0.80) 38%, rgba(10,18,35,0.30) 65%, transparent 100%)',
            }}
          />
          {/* Bottom fade on mobile so content doesn't clash with the image */}
          <div
            className="pointer-events-none absolute inset-0 lg:hidden"
            style={{
              background: 'linear-gradient(180deg, rgba(10,18,35,0.60) 0%, rgba(10,18,35,0.92) 100%)',
            }}
          />

          {/* Content — left-aligned text only, the phone is IN the image */}
          <div className="relative z-10 flex h-full flex-col justify-center px-8 py-10 sm:px-10 sm:py-12 lg:max-w-[55%] lg:py-16 xl:max-w-[50%]">
            {/* Badges */}
            <div className="mb-6 flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/30 bg-blue-500/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-blue-300 backdrop-blur-sm">
                <Compass className="h-3 w-3" />
                Start here
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3 py-1 text-[11px] font-bold text-emerald-300 backdrop-blur-sm">
                <CheckCircle2 className="h-3 w-3" />
                HighLevel native
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-[28px] font-black leading-[1.06] tracking-tight text-white sm:text-[36px] lg:text-[40px] xl:text-[44px]">
              Get started with<br />
              <span className="text-blue-200">NOLA SMS Pro</span>
            </h1>

            {/* Subtext */}
            <p className="mt-5 max-w-[420px] text-[13px] font-medium leading-7 text-slate-300 sm:text-[14px]">
              Install the app, connect your HighLevel sub-account, send your first SMS, and track delivery — all from one embedded workspace.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/docs/install-nola-sms-pro"
                className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-[13px] font-bold text-white shadow-xl transition-all hover:brightness-110 active:scale-[0.97]"
                style={{ background: 'linear-gradient(135deg, #1a6fcc, #1252a3)' }}
              >
                <Rocket className="h-3.5 w-3.5" />
                Quick start
              </Link>
              <Link
                to="/docs/what-is-nola-sms-pro"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-5 py-2.5 text-[13px] font-bold text-white backdrop-blur-sm transition-all hover:bg-white/18 hover:border-white/30 active:scale-[0.97]"
              >
                Overview
              </Link>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="mb-7">
      <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm shadow-slate-200/60 dark:border-slate-800 dark:bg-[#111827] dark:shadow-none">
        <div className="grid gap-0 lg:grid-cols-[1fr_260px]">
          <div className="px-5 py-6 sm:px-7 sm:py-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 text-[#334155] dark:border-[#334155] dark:bg-[#1E293B] dark:text-[#CBD5E1]">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#334155] dark:text-[#CBD5E1]">
                  {page.section}
                </p>
                {page.subsection && (
                  <p className="mt-1 truncate text-[12px] font-semibold text-slate-400 dark:text-slate-500">
                    {page.subsection}
                  </p>
                )}
              </div>
            </div>
            <h1 className="max-w-[780px] text-[30px] font-black leading-[1.05] tracking-tight text-[#0F172A] sm:text-[38px] dark:text-white">
              {page.title}
            </h1>
            <p className="mt-4 max-w-[760px] text-[14px] font-medium leading-7 text-[#475569] sm:text-[15px] dark:text-slate-350">
              {page.description}
            </p>
          </div>

          <div className="hidden border-l border-slate-100 bg-[#F8FAFC] p-5 dark:border-slate-800 dark:bg-[#020617] lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="mb-4 h-28 overflow-hidden rounded-2xl border border-white bg-white shadow-sm dark:border-slate-800 dark:bg-[#111827]">
                <img
                  src="/illustration.jpg"
                  alt=""
                  className="h-full w-full object-cover opacity-90"
                />
              </div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                Reading path
              </p>
              <p className="mt-2 text-[13px] font-semibold leading-5 text-[#475569] dark:text-slate-300">
                Use the section list to move through setup, messaging, account, and support guides without leaving this page shell.
              </p>
            </div>
            <a
              href="#"
              className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-black text-[#334155] transition-colors hover:text-[#1E293B] dark:text-[#CBD5E1]"
            >
              Top of guide
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
export const DocPageRenderer: React.FC<Props> = ({ page }) => {
  const location = useLocation();
  const activeId = location.pathname.split('/docs/')[1] || 'welcome';

  const headerPage = getHeaderPage(activeId, page);
  const isWelcome = activeId === 'welcome';
  const isInstallPage = activeId === 'install-nola-sms-pro';
  const isCreateOrSignInPage = activeId === 'create-or-sign-in';
  const isConnectedHighlevelPage = activeId === 'connect-highlevel';
  const isDashboardOverviewPage = activeId === 'dashboard-overview';
  const isSendFirstSMSPage = activeId === 'send-your-first-sms';
  const isContactsPage = activeId === 'contacts';
  const isComposeSmsPage = activeId === 'compose-sms';
  const isMessageTemplatesPage = activeId === 'message-templates';
  const isSenderIdsPage = activeId === 'sender-ids';
  const isMessageHistoryPage = activeId === 'message-history';
  const isSmsCreditsPage = activeId === 'sms-credits';
  const isSettingsPage = activeId === 'settings';
  const isTroubleshootingPage = activeId === 'troubleshooting';
  const isSupportHelpPage = activeId === 'support-help';
  const isFaqPage = activeId === 'faq';
  
  
  
  // Resolve current active section to determine whether to render tabs
  const activeSection = sidebarStructure.find((sec) =>
    sec.items.some((item) => item.id === activeId)
  );
  const showTabs = activeSection && !isWelcome && (activeSection.title === 'OVERVIEW' || activeSection.title === 'MESSAGING');
  
  // Non-overview/messaging pages in SETUP, ACCOUNT, SUPPORT that don't have contents populated yet
  const isBlankPage = !showTabs && !isInstallPage && !isCreateOrSignInPage && !isConnectedHighlevelPage && !isDashboardOverviewPage && !isSendFirstSMSPage && !isSmsCreditsPage && !isSettingsPage && !isTroubleshootingPage && !isSupportHelpPage && !isFaqPage && ['SETUP', 'ACCOUNT', 'SUPPORT'].includes(page.section);

  return (
    <div className="mx-auto w-full max-w-[980px] pb-16" aria-label={`Documentation guide focused on ${page.title}`}>
      <StickyPageHeader page={headerPage} />
      
      {showTabs && activeSection ? (
        <div className="space-y-6">
          {/* Custom Tabs Navigation List */}
          <div className="sticky top-[7.25rem] z-20 mb-7 flex gap-1 overflow-x-auto rounded-xl border border-slate-200 bg-white/92 p-1.5 shadow-sm shadow-slate-200/50 backdrop-blur-xl dark:border-slate-800 dark:bg-[#020617]/92 dark:shadow-none">
            {activeSection.items.map((item) => {
              const isActive = item.id === activeId;
              return (
                <Link
                  key={item.id}
                  to={`/docs/${item.id}`}
                  className={`min-w-fit px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-sm dark:bg-slate-800 dark:text-white font-bold'
                      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>

          {/* Tab Content Panel */}
          <div>
            {isWelcome ? (
              <WelcomeContent />
            ) : isContactsPage ? (
              <ContactsContent page={page} />
            ) : isComposeSmsPage ? (
              <ComposeSmsContent page={page} />
            ) : isMessageTemplatesPage ? (
              <MessageTemplatesContent page={page} />
            ) : isSenderIdsPage ? (
              <SenderIdsContent page={page} />
            ) : isMessageHistoryPage ? (
              <MessageHistoryContent page={page} />
            ) : (
              <FeaturePageContent page={page} />
            )}
            <Pagination currentId={page.id} />
          </div>
        </div>
      ) : isInstallPage ? (
        <div className="pt-6">
          <InstallNolaSmsProContent page={page} />
        </div>
      ) : isCreateOrSignInPage ? (
        <div className="pt-6">
          <CreateOrSignInContent page={page} />
        </div>
      ) : isConnectedHighlevelPage ? (
        <div className="pt-6">
          <ConnectedHighlevelContent page={page} />
        </div>
      ) : isDashboardOverviewPage ? (
        <div className="pt-6">
          <DashboardOverviewContent page={page} />
        </div>
      ) : isSendFirstSMSPage ? (
        <div className="pt-6">
          <SendFirstSMSContent page={page} />
        </div>
      ) : isSmsCreditsPage ? (
        <div className="pt-6">
          <SmsCreditsContent page={page} />
        </div>
      ) : isSettingsPage ? (
        <div className="pt-6">
          <SettingsContent page={page} />
        </div>
      ) : isTroubleshootingPage ? (
        <div className="pt-6">
          <TroubleshootingContent page={page} />
        </div>
      ) : isSupportHelpPage ? (
        <div className="pt-6">
          <SupportHelpContent page={page} />
        </div>
      ) : isFaqPage ? (
        <div className="pt-6">
          <FAQContent page={page} />
        </div>
      ) : isBlankPage ? (
        null
      ) : (
        <div className="pt-6">
          {isWelcome ? (
            <WelcomeContent />
          ) : isContactsPage ? (
            <ContactsContent page={page} />
          ) : isComposeSmsPage ? (
            <ComposeSmsContent page={page} />
          ) : isMessageTemplatesPage ? (
            <MessageTemplatesContent page={page} />
          ) : isSenderIdsPage ? (
            <SenderIdsContent page={page} />
          ) : isMessageHistoryPage ? (
            <MessageHistoryContent page={page} />
          ) : isSmsCreditsPage ? (
            <SmsCreditsContent page={page} />
          ) : isSettingsPage ? (
            <SettingsContent page={page} />
          ) : isTroubleshootingPage ? (
            <TroubleshootingContent page={page} />
          ) : isSupportHelpPage ? (
            <SupportHelpContent page={page} />
          ) : isFaqPage ? (
            <FAQContent page={page} />
          ) : (
            <FeaturePageContent page={page} />
          )}
          <Pagination currentId={page.id} />
        </div>
      )}
    </div>
  );
};
