import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import type { DocPage } from '../data/docsData';
import { docsData } from '../data/docsData';
import { WelcomeContent } from './docs/WelcomeContent';
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
import { AutomationContent } from './docs/AutomationContent';
import { GhlConversationContent } from './docs/GhlConversationContent';
import { FeaturePageContent } from './docs/FeaturePageContent';
import { Pagination } from './Pagination';
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
  CheckCircle2,
  Compass,
} from 'lucide-react';

interface Props {
  page: DocPage;
}

const pageIconMap = {
  overview: Compass,
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
  automation: Send,
  'ghl-conversation': MessageSquare,
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
  const isWelcomeHeader = page.id === 'overview';
  const isWhatIsHeader = page.id === 'what-is-nola-sms-pro';
  const isHowWorksHeader = page.id === 'how-nola-sms-pro-works';
  const isCoreFeaturesHeader = page.id === 'core-features';

  const renderOverviewBadges = ({
    primary,
    primaryIcon,
    secondary,
    secondaryIcon,
  }: {
    primary: string;
    primaryIcon: React.ReactNode;
    secondary: string;
    secondaryIcon: React.ReactNode;
  }) => (
    <div className="mb-5 flex flex-wrap items-center gap-2.5">
      <span className="inline-flex min-h-7 items-center gap-1.5 rounded-full border border-white/55 bg-white/75 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[#0B2E63] shadow-sm shadow-blue-900/5 backdrop-blur-md dark:border-white/10 dark:bg-white/10 dark:text-blue-100">
        {primaryIcon}
        {primary}
      </span>
      <span className="inline-flex min-h-7 items-center gap-1.5 rounded-full border border-emerald-200/70 bg-emerald-50/80 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-emerald-800 shadow-sm shadow-emerald-900/5 backdrop-blur-md dark:border-emerald-300/15 dark:bg-emerald-400/10 dark:text-emerald-100">
        {secondaryIcon}
        {secondary}
      </span>
    </div>
  );
  // Helper to render overview-style hero banners without background images
  const renderOverviewBanner = ({
    badge1,
    badge1Icon,
    badge2,
    badge2Icon,
    headline,
    headlineAccent,
    subtext,
    id,
  }: {
    badge1: string;
    badge1Icon: React.ReactNode;
    badge2: string;
    badge2Icon: React.ReactNode;
    headline: string;
    headlineAccent?: string;
    subtext: string;
    id: string;
  }) => (
    <header id={id} className="mb-8">
      <div
        className="relative overflow-hidden rounded-[20px] min-h-[160px] bg-gradient-to-br from-[#bae6fd] via-[#93c5fd] to-[#3b82f6] dark:from-[#0F172A] dark:to-[#1E293B]"
      >
        {/* Soft background glow decoration */}
        <div className="absolute top-[-50%] right-[-10%] h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-[80px] dark:bg-blue-500/10" />
        <div className="absolute bottom-[-50%] left-[-10%] h-[300px] w-[300px] rounded-full bg-emerald-500/5 blur-[80px] dark:bg-emerald-500/5" />

        <div className="relative z-10 flex h-full flex-col justify-center px-8 py-8 sm:px-10 sm:py-10">
          {renderOverviewBadges({
            primary: badge1,
            primaryIcon: badge1Icon,
            secondary: badge2,
            secondaryIcon: badge2Icon,
          })}
          <h1 className="text-[26px] font-black leading-[1.1] tracking-tight text-[#0a1e3d] dark:text-white sm:text-[32px]">
            {headline} {headlineAccent && <span className="text-blue-800 dark:text-blue-300">{headlineAccent}</span>}
          </h1>
          <p className="mt-3 max-w-[760px] text-[13px] font-semibold leading-6 text-[#1e3a5f] dark:text-slate-200 sm:text-[13.5px]">
            {subtext}
          </p>
        </div>
      </div>
    </header>
  );

  if (isWelcomeHeader) {
    return (
      <header id="about-heading" className="mb-8">
        <div
          className="relative overflow-hidden rounded-[20px] min-h-[280px] lg:min-h-[320px]"
          style={{
            backgroundImage: 'url(/hero-banner.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center right',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Desktop theme-adaptive overlay: rich deep blue in light mode */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#bae6fd] via-[#93c5fd]/95 to-transparent dark:from-[#0a1223] dark:via-[#0a1223]/95 dark:to-transparent" />

          {/* Mobile theme-adaptive overlay: rich deep blue in light mode */}
          <div className="pointer-events-none absolute inset-0 lg:hidden bg-gradient-to-b from-[#bae6fd]/30 to-[#93c5fd]/90 dark:from-transparent dark:to-[#0a1223]/95" />

          <div className="relative z-10 flex h-full flex-col justify-center px-8 py-10 sm:px-10 sm:py-12 lg:max-w-[55%] lg:py-16 xl:max-w-[50%]">
            {renderOverviewBadges({
              primary: 'Overview',
              primaryIcon: <Compass className="h-3 w-3" />,
              secondary: 'HighLevel native',
              secondaryIcon: <CheckCircle2 className="h-3 w-3" />,
            })}
            <h1 className="text-[26px] font-black leading-[1.1] tracking-tight text-[#0a1e3d] dark:text-white sm:text-[32px]">
              Welcome to <span className="text-blue-800 dark:text-blue-200">NOLA SMS Pro</span>
            </h1>
            <p className="mt-5 max-w-[420px] text-[13px] font-semibold leading-7 text-[#1e3a5f] dark:text-slate-200 sm:text-[14px]">
              Install the app, connect your HighLevel sub-account, send your first SMS, and track delivery — all from one embedded workspace.
            </p>
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
                className="inline-flex items-center gap-2 rounded-lg border border-blue-200/60 bg-white/90 px-5 py-2.5 text-[13px] font-bold text-blue-700 backdrop-blur-sm transition-all hover:bg-blue-50/80 active:scale-[0.97] dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/18 dark:hover:border-white/30"
              >
                What is NOLA SMS Pro?
              </Link>
            </div>
          </div>
        </div>
      </header>
    );
  }

  if (isWhatIsHeader) {
    return renderOverviewBanner({
      id: 'what-is-nola-sms-pro-what-is-this',
      badge1: 'Intro',
      badge1Icon: <BookOpen className="h-3 w-3" />,
      badge2: 'HighLevel Native',
      badge2Icon: <CheckCircle2 className="h-3 w-3" />,
      headline: 'What is',
      headlineAccent: 'NOLA SMS Pro?',
      subtext: 'A native SMS platform embedded directly inside your HighLevel sub-account — contacts, compose, templates, sender IDs, credits, and message logs all in one workspace.',
    });
  }

  if (isHowWorksHeader) {
    return renderOverviewBanner({
      id: 'how-nola-sms-pro-works-what-is-this',
      badge1: 'Under the Hood',
      badge1Icon: <Wrench className="h-3 w-3" />,
      badge2: 'PH Carrier Gateway',
      badge2Icon: <CheckCircle2 className="h-3 w-3" />,
      headline: 'How NOLA SMS Pro',
      headlineAccent: 'Works',
      subtext: 'Your message travels from the Compose panel through a Semaphore carrier gateway, is validated, credit-deducted, and delivered directly to Globe, Smart, or DITO subscribers in the Philippines.',
    });
  }

  if (isCoreFeaturesHeader) {
    return renderOverviewBanner({
      id: 'core-features-what-is-this',
      badge1: 'Feature Map',
      badge1Icon: <LayoutDashboard className="h-3 w-3" />,
      badge2: '6 Modules',
      badge2Icon: <CheckCircle2 className="h-3 w-3" />,
      headline: 'Core',
      headlineAccent: 'Features',
      subtext: 'Six focused modules — Contacts, Compose, Templates, Sender IDs, Credits Wallet, and Message History — give you complete control over your Philippine SMS outreach from within HighLevel.',
    });
  }

  // ── Per-page banner config for every section page ──────────────────────────
  const pageBannerMap: Record<string, {
    badge1: string; badge1Icon: React.ReactNode;
    badge2: string; badge2Icon: React.ReactNode;
    headline: string; headlineAccent?: string; subtext: string;
  }> = {
    'install-nola-sms-pro': {
      badge1: 'Setup Guide', badge1Icon: <Store className="h-3 w-3" />,
      badge2: 'GHL Marketplace', badge2Icon: <CheckCircle2 className="h-3 w-3" />,
      headline: 'Install', headlineAccent: 'NOLA SMS Pro',
      subtext: 'Add NOLA SMS Pro from the HighLevel Marketplace, authorize your sub-account, and get your SMS workspace running in minutes.',
    },
    'create-or-sign-in': {
      badge1: 'Account Access', badge1Icon: <UserPlus className="h-3 w-3" />,
      badge2: 'Owner Profile', badge2Icon: <CheckCircle2 className="h-3 w-3" />,
      headline: 'Create Account or', headlineAccent: 'Sign In',
      subtext: 'Register a new owner admin profile or authenticate with your existing credentials to unlock billing, credit settings, and dashboard access.',
    },
    'connect-highlevel': {
      badge1: 'Integration', badge1Icon: <ArrowRightLeft className="h-3 w-3" />,
      badge2: 'Live API Sync', badge2Icon: <CheckCircle2 className="h-3 w-3" />,
      headline: 'Connect to', headlineAccent: 'HighLevel',
      subtext: 'Authorize your GoHighLevel sub-account through the Marketplace OAuth handshake to sync contacts, templates, and conversation logs in real-time.',
    },
    'dashboard-overview': {
      badge1: 'Control Room', badge1Icon: <LayoutDashboard className="h-3 w-3" />,
      badge2: '5 Panel Zones', badge2Icon: <CheckCircle2 className="h-3 w-3" />,
      headline: 'Dashboard', headlineAccent: 'Overview',
      subtext: 'Explore every panel of your SMS command center — contacts, compose, templates, history, and account settings — all in a single embedded workspace.',
    },
    'send-your-first-sms': {
      badge1: 'Getting Started', badge1Icon: <Send className="h-3 w-3" />,
      badge2: 'Test Flight', badge2Icon: <CheckCircle2 className="h-3 w-3" />,
      headline: 'Send Your', headlineAccent: 'First SMS',
      subtext: 'Complete a live test dispatch to verify credit debiting, carrier routing, and HighLevel sync — so you are confident before running any real campaigns.',
    },
    contacts: {
      badge1: 'Messaging', badge1Icon: <Users className="h-3 w-3" />,
      badge2: 'GHL Synced', badge2Icon: <CheckCircle2 className="h-3 w-3" />,
      headline: 'Contacts', headlineAccent: 'Directory',
      subtext: 'Browse, search, and select HighLevel contacts synced in real-time. Instantly launch a message from any contact record without switching tabs.',
    },
    'compose-sms': {
      badge1: 'Messaging', badge1Icon: <MessageSquare className="h-3 w-3" />,
      badge2: 'Live Credit Meter', badge2Icon: <CheckCircle2 className="h-3 w-3" />,
      headline: 'Compose', headlineAccent: 'SMS',
      subtext: 'Draft, preview, and dispatch outbound SMS with a live character counter and credit cost estimate — before you ever tap send.',
    },
    'message-templates': {
      badge1: 'Messaging', badge1Icon: <FileText className="h-3 w-3" />,
      badge2: 'Reusable Copy', badge2Icon: <CheckCircle2 className="h-3 w-3" />,
      headline: 'Message', headlineAccent: 'Templates',
      subtext: 'Store and organize approved message copy in reusable template folders — load them instantly inside the Compose panel for fast, consistent outreach.',
    },
    'sender-ids': {
      badge1: 'Messaging', badge1Icon: <ShieldCheck className="h-3 w-3" />,
      badge2: 'PH Carrier Reg.', badge2Icon: <CheckCircle2 className="h-3 w-3" />,
      headline: 'Sender', headlineAccent: 'IDs',
      subtext: 'Register a branded alphanumeric sender identity with Philippine telco carriers so your messages arrive as a trusted business name instead of a random number.',
    },
    'message-history': {
      badge1: 'Messaging', badge1Icon: <History className="h-3 w-3" />,
      badge2: 'Live Status Sync', badge2Icon: <CheckCircle2 className="h-3 w-3" />,
      headline: 'Message', headlineAccent: 'History',
      subtext: 'Review your full outbound message log with carrier delivery statuses, credit costs, and error codes — all updated automatically in the background.',
    },
    automation: {
      badge1: 'Workflow', badge1Icon: <Send className="h-3 w-3" />,
      badge2: 'GHL Actions', badge2Icon: <CheckCircle2 className="h-3 w-3" />,
      headline: 'Workflow', headlineAccent: 'Automation',
      subtext: 'Trigger outbound SMS automatically when contacts enter a GoHighLevel workflow step — no manual typing, instant response times for every campaign event.',
    },
    'ghl-conversation': {
      badge1: 'Workflow', badge1Icon: <MessageSquare className="h-3 w-3" />,
      badge2: 'Native Sync', badge2Icon: <CheckCircle2 className="h-3 w-3" />,
      headline: 'GHL', headlineAccent: 'Conversation',
      subtext: 'Every SMS sent through NOLA SMS Pro is pushed back to the native GoHighLevel Conversations tab so your team sees one unified client timeline.',
    },
    'sms-credits': {
      badge1: 'Account', badge1Icon: <CreditCard className="h-3 w-3" />,
      badge2: 'Billing Wallet', badge2Icon: <CheckCircle2 className="h-3 w-3" />,
      headline: 'SMS', headlineAccent: 'Credits',
      subtext: 'Monitor your credit balance, review ledger history, and top up your wallet with a credit package so campaigns never stop mid-send.',
    },
    settings: {
      badge1: 'Account', badge1Icon: <Settings className="h-3 w-3" />,
      badge2: 'Admin Config', badge2Icon: <CheckCircle2 className="h-3 w-3" />,
      headline: 'Account', headlineAccent: 'Settings',
      subtext: 'Update your admin profile, verify your connected HighLevel location tokens, and configure credit alert thresholds to keep your workspace secure.',
    },
    troubleshooting: {
      badge1: 'Support', badge1Icon: <Wrench className="h-3 w-3" />,
      badge2: 'Quick Fixes', badge2Icon: <CheckCircle2 className="h-3 w-3" />,
      headline: 'Trouble', headlineAccent: 'shooting',
      subtext: 'Diagnose and resolve the most common setup, billing, and message delivery issues — step-by-step resolution paths for every known error state.',
    },
    'support-help': {
      badge1: 'Support', badge1Icon: <HelpCircle className="h-3 w-3" />,
      badge2: 'Ticket Queue', badge2Icon: <CheckCircle2 className="h-3 w-3" />,
      headline: 'Support', headlineAccent: '& Help',
      subtext: 'Submit a support ticket directly to the engineering team and track its resolution status — for billing, Sender ID, delivery, or integration issues.',
    },
    faq: {
      badge1: 'Support', badge1Icon: <HelpCircle className="h-3 w-3" />,
      badge2: 'Self-Service', badge2Icon: <CheckCircle2 className="h-3 w-3" />,
      headline: 'Frequently Asked', headlineAccent: 'Questions',
      subtext: 'Quick reference answers to the most common questions about character billing, Sender ID timelines, reply limits, and multi-location setups.',
    },
  };

  const bannerConfig = pageBannerMap[page.id];

  if (bannerConfig) {
    return renderOverviewBanner({
      id: `${page.id}-header`,
      ...bannerConfig,
    });
  }

  // Final fallback (should not normally be reached)
  return renderOverviewBanner({
    id: `${page.id}-header`,
    badge1: page.section,
    badge1Icon: <Icon className="h-3 w-3" />,
    badge2: page.readingTime,
    badge2Icon: <CheckCircle2 className="h-3 w-3" />,
    headline: page.title,
    subtext: page.description,
  });
};
const contentMap: Record<string, React.FC<{ page: DocPage }>> = {
  'install-nola-sms-pro': InstallNolaSmsProContent,
  'create-or-sign-in': CreateOrSignInContent,
  'connect-highlevel': ConnectedHighlevelContent,
  'dashboard-overview': DashboardOverviewContent,
  'send-your-first-sms': SendFirstSMSContent,
  contacts: ContactsContent,
  'compose-sms': ComposeSmsContent,
  'message-templates': MessageTemplatesContent,
  'sender-ids': SenderIdsContent,
  'message-history': MessageHistoryContent,
  'sms-credits': SmsCreditsContent,
  settings: SettingsContent,
  troubleshooting: TroubleshootingContent,
  'support-help': SupportHelpContent,
  faq: FAQContent,
  automation: AutomationContent,
  'ghl-conversation': GhlConversationContent,
};

export const DocPageRenderer: React.FC<Props> = ({ page }) => {
  const location = useLocation();
  const activeId = location.pathname.split('/docs/')[1] || 'overview';

  const headerPage = getHeaderPage(activeId, page);
  const isWelcome = activeId === 'overview';
  const ContentComponent = contentMap[activeId];

  return (
    <div className="mx-auto w-full max-w-[980px] pb-16" aria-label={`Documentation guide focused on ${page.title}`}>
      <StickyPageHeader page={headerPage} />

      <div className="pt-6">
        {isWelcome ? (
          <WelcomeContent />
        ) : ContentComponent ? (
          <ContentComponent page={page} />
        ) : (
          <FeaturePageContent page={page} />
        )}
        <Pagination currentId={page.id} />
      </div>
    </div>
  );
};
