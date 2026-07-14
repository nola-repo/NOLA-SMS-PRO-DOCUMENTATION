import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import type { DocPage } from '../data/docsData';
import { docsData, sidebarStructure } from '../data/docsData';
import { WelcomeContent } from './docs/WelcomeContent';
import { FeaturePageContent } from './docs/FeaturePageContent';
<<<<<<< HEAD
import { Pagination } from './Pagination';
=======
import { InstallNolaSmsProContent } from './docs/InstallNolaSmsProContent';
import { CreateOrSignInContent } from './docs/CreateOrSignInContent';
import { ConnectedHighlevelContent } from './docs/ConnectedHighlevelContent';
import { DashboardOverviewContent } from './docs/DashboardOverviewContent';
import { SendFirstSMSContent } from './docs/SendFirstSMSContent';
>>>>>>> bdcb8ae4d9dc9f9c27b19f230c66da6a27e977d7
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
<<<<<<< HEAD
  
  // Resolve current active section to determine whether to render tabs
  const activeSection = sidebarStructure.find((sec) =>
    sec.items.some((item) => item.id === activeId)
  );
  const showTabs = activeSection && (activeSection.title === 'OVERVIEW' || activeSection.title === 'MESSAGING');
  
  // Non-overview/messaging pages in SETUP, ACCOUNT, SUPPORT that don't have contents populated yet
  const isBlankPage = !showTabs && ['SETUP', 'ACCOUNT', 'SUPPORT'].includes(page.section);
=======
  const isInstallPage = activeId === 'install-nola-sms-pro';
  const isCreateOrSignInPage = activeId === 'create-or-sign-in';
  const isConnectedHighlevelPage = activeId === 'connect-highlevel';
  const isDashboardOverviewPage = activeId === 'dashboard-overview';
  const isSendFirstSMSPage = activeId === 'send-your-first-sms';
  const isBlankPage = !isInstallPage && !isCreateOrSignInPage && !isConnectedHighlevelPage && !isDashboardOverviewPage && !isSendFirstSMSPage && (['what-is-nola-sms-pro', 'how-nola-sms-pro-works', 'core-features'].includes(activeId) ||
    ['SETUP', 'MESSAGING', 'ACCOUNT', 'SUPPORT'].includes(page.section));
>>>>>>> bdcb8ae4d9dc9f9c27b19f230c66da6a27e977d7

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
      ) : isBlankPage ? (
        null
      ) : (
        <div className="pt-6">
          {isWelcome ? (
            <WelcomeContent />
          ) : (
            <FeaturePageContent page={page} />
          )}
          <Pagination currentId={page.id} />
        </div>
      )}
    </div>
  );
};
