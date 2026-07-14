import React from 'react';
import { CreditCard, MapPin, MessageSquare, ShieldCheck, Download, UserRound, History, ArrowRight } from 'lucide-react';
import { ScreenshotPlaceholder } from './ScreenshotPlaceholder';
import { defaultSmsReminder } from '../data/docsData';
import { InfoBox } from './Callouts';

const onboarding = [
  {
    icon: <BookIcon />,
    title: 'Welcome',
    text: 'Start with the product basics and where NOLA SMS Pro appears inside HighLevel.'
  },
  {
    icon: <Download className="h-4 w-4" />,
    title: 'Installation',
    text: 'Install from the Marketplace and choose the correct sub-account/location.'
  },
  {
    icon: <UserRound className="h-4 w-4" />,
    title: 'Account Setup',
    text: 'Create the owner account or sign in if the location is already registered.'
  },
  {
    icon: <MessageSquare className="h-4 w-4" />,
    title: 'First SMS',
    text: 'Confirm credits, sender, recipient, and message wording before sending.'
  },
  {
    icon: <History className="h-4 w-4" />,
    title: 'Message History',
    text: 'Check whether each message is Sending, Sent, or Failed.'
  },
  {
    icon: <ArrowRight className="h-4 w-4" />,
    title: 'Next Steps',
    text: 'Manage contacts, templates, Sender IDs, credits, and settings.'
  }
];

const checks = [
  {
    icon: <MapPin className="h-4 w-4" />,
    title: 'Correct Location',
    text: 'The connected location should match the HighLevel sub-account where you installed the app.'
  },
  {
    icon: <CreditCard className="h-4 w-4" />,
    title: 'SMS Credits',
    text: 'Messages only send when credits are available.'
  },
  {
    icon: <ShieldCheck className="h-4 w-4" />,
    title: 'Sender ID',
    text: 'Use NOLASMSPro first. Custom Sender IDs must be approved before they appear in Compose.'
  },
  {
    icon: <MessageSquare className="h-4 w-4" />,
    title: 'Message History',
    text: 'After sending, check whether the message is Sending, Sent, or Failed.'
  }
];

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M5 5.5C5 4.67 5.67 4 6.5 4H20v15H6.5A1.5 1.5 0 0 1 5 17.5v-12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M5 17.5C5 16.67 5.67 16 6.5 16H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export const WelcomePresentation: React.FC = () => {
  return (
    <div className="w-full space-y-7 pb-2">
      <header className="max-w-[760px]">
        <div className="mb-3 text-[12px] font-medium text-slate-400 dark:text-slate-500">
          Docs / Welcome
        </div>
        <h1 className="text-[32px] font-black leading-tight tracking-tight text-slate-950 dark:text-white md:text-[42px]">
          Welcome to NOLA SMS Pro
        </h1>
        <p className="mt-4 text-[16px] leading-7 text-slate-600 dark:text-slate-400">
          NOLA SMS Pro runs inside your HighLevel sub-account after installation. Use these guides to install the app, confirm setup, send your first SMS, and check the message status.
        </p>
      </header>

      <div className="max-w-[860px] space-y-6">
        <section>
          <h2 className="mb-3 text-[20px] font-bold leading-tight text-slate-900 dark:text-white">
            Onboarding Journey
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {onboarding.map((step) => (
              <div key={step.title} className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950/20">
                <div className="mb-2 flex items-center gap-2 text-[#334155] dark:text-[#475569]">
                  {step.icon}
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">{step.title}</h3>
                </div>
                <p className="text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="max-w-[960px]">
        <ScreenshotPlaceholder
          figure={1}
          caption="NOLA SMS Pro runs inside your HighLevel sub-account after installation."
          alt="NOLA SMS Pro opened inside the HighLevel sub-account menu."
          filename="/images/docs/welcome-nola-inside-highlevel.png"
          variant="Application Preview"
          mode="large"
          height="lg"
        />
      </div>

      <div className="max-w-[760px] space-y-6">
        <InfoBox>{defaultSmsReminder}</InfoBox>

        <section>
          <h2 className="mb-3 text-[20px] font-bold leading-tight text-slate-900 dark:text-white">
            Before You Send
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {checks.map((check) => (
              <div key={check.title} className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950/20">
                <div className="flex items-center gap-2 text-[#334155] dark:text-[#475569]">
                  {check.icon}
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    {check.title}
                  </h3>
                </div>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {check.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
