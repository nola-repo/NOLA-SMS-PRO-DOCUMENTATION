import React from 'react';
import { useLocation } from 'react-router-dom';
import type { DocPage } from '../data/docsData';
import { docsData } from '../data/docsData';
import { WelcomeContent } from './docs/WelcomeContent';
import {
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
    <header className="sticky top-[65px] z-20 -mx-4 mb-6 w-[calc(100%+2rem)] sm:-mx-7 sm:w-[calc(100%+3.5rem)] lg:top-0 lg:-mx-10 lg:w-[calc(100%+5rem)]">
      <div className="relative isolate box-border w-full overflow-hidden rounded-b-[34px] border border-[#4F8EF7]/35 px-5 py-6 text-white shadow-xl shadow-[#184B8F]/18 dark:border-[#72A8FF]/25 dark:shadow-[#020817]/30 sm:px-8 sm:py-7 lg:px-10">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#4F8EF7] via-[#3B7FE0] to-[#1F5AAE]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-12 bg-gradient-to-b from-white/15 to-transparent" />
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

export const DocPageRenderer: React.FC<Props> = ({ page }) => {
  const location = useLocation();
  const activeId = location.pathname.split('/docs/')[1] || 'welcome';

  const headerPage = getHeaderPage(activeId, page);
  const isWelcome = activeId === 'welcome';

  return (
    <div className="w-full pb-16" aria-label={`Documentation guide focused on ${page.title}`}>
      <StickyPageHeader page={headerPage} />
      {isWelcome ? (
        <div className="pt-6">
          <WelcomeContent />
        </div>
      ) : (
        /* Page content intentionally blank — ready for authoring */
        null
      )}
    </div>
  );
};