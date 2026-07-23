import React from 'react';
import type { DocPage } from '../../data/docsData';
import {
  Shield,
  MapPin,
  AlertTriangle,
  Store,
  LogIn,
  Package,
  MousePointerClick,
  CheckCheck,
  Monitor,
  CheckCircle2,
} from 'lucide-react';
import { IllustrationFrame } from './IllustrationFrame';

interface Props {
  page: DocPage;
}

/* ─── Blank Screenshot Frame for Step Steps ─────────────── */
interface BlankScreenFrameProps {
  title: string;
}

const BlankScreenFrame: React.FC<BlankScreenFrameProps> = ({ title }) => {
  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070d18] shadow-sm w-full">
      {/* Browser Chrome Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900 px-4 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="ml-2 text-[9px] font-black uppercase tracking-[0.12em] text-slate-400">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-1 text-[9px] font-black uppercase tracking-[0.12em] text-slate-400">
          <Monitor className="h-3 w-3" />
          Step Preview
        </div>
      </div>

      {/* Blank Screenshot Frame Container */}
      <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-[#0B132B] dark:to-[#070D18] flex flex-col items-center justify-center p-6 text-center">
        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-400 shadow-sm">
          <Monitor className="h-5 w-5 text-slate-400 dark:text-slate-500" />
        </div>
        <p className="text-[13px] font-bold text-slate-700 dark:text-slate-300">{title}</p>
        <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-0.5">
          Step Illustration
        </p>
      </div>
    </div>
  );
};

export const InstallNolaSmsProContent: React.FC<Props> = ({ page }) => {
  const steps = [
    {
      icon: LogIn,
      color: 'text-blue-500',
      badge: 'Step 1',
      title: 'Log in to GoHighLevel',
      sub: 'Agency admin credentials',
      desc: 'Sign in to your GoHighLevel portal using your administrator credentials.',
      details: [
        'Ensure you are logged into the main Agency administrator profile.',
        'Sub-account user accounts cannot authorize Marketplace applications.',
      ],
    },
    {
      icon: Shield,
      color: 'text-purple-500',
      badge: 'Step 2',
      title: 'Select Agency View',
      sub: 'Top-left dropdown switch',
      desc: 'Click the sub-account selector dropdown in the top-left corner and switch to Agency View.',
      details: [
        'The App Marketplace tab is only accessible while in Agency View.',
        'If you are currently inside a location dashboard, click Switch to Agency View.',
      ],
    },
    {
      icon: Store,
      color: 'text-emerald-500',
      badge: 'Step 3',
      title: 'Open the Marketplace',
      sub: 'Sidebar → App Marketplace',
      desc: 'Navigate to the App Marketplace tab in the left sidebar menu and search for "NOLA SMS Pro".',
      details: [
        'Type "NOLA SMS Pro" in the search bar.',
        'Locate the official NOLA SMS Pro app tile in the search results list.',
      ],
    },
    {
      icon: Package,
      color: 'text-amber-500',
      badge: 'Step 4',
      title: 'Click Install',
      sub: 'Select app from search results',
      desc: 'Click on the NOLA SMS Pro app listing and select the "Install" button.',
      details: [
        'Review app details, developer verification, and platform description.',
        'Click Install to begin the location mapping wizard.',
      ],
    },
    {
      icon: MapPin,
      color: 'text-rose-500',
      badge: 'Step 5',
      title: 'Select Sub-account',
      sub: 'Choose target location',
      desc: 'Select the designated sub-account (location) where you want NOLA SMS Pro enabled.',
      details: [
        'Select the exact location name from the location drop-down list.',
        'NOLA SMS Pro integrates on a per-subaccount location basis.',
      ],
    },
    {
      icon: MousePointerClick,
      color: 'text-teal-500',
      badge: 'Step 6',
      title: 'Authorize Permissions',
      sub: 'Allow & Install scope consent',
      desc: 'Review the requested permission scopes — contacts, messages, and location details — then click "Allow & Install".',
      details: [
        'Grant scopes required for contact database sync and SMS outbox routing.',
        'Once authorized, GoHighLevel automatically redirects you to the NOLA setup wizard.',
      ],
    },
  ];

  return (
    <div className="w-full space-y-12 pb-10">

      {/* INTRO */}
      <section id="install-intro" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">What this guide covers</h2>
        <p className="text-[14.5px] leading-7 text-slate-700 dark:text-slate-300">
          Authorize GoHighLevel to integrate with the NOLA platform so the app can send text messages and synchronize your contact database. This process takes less than 3 minutes and only needs to be done once per sub-account.
        </p>
        <p className="text-[14.5px] leading-7 text-slate-700 dark:text-slate-300">
          Once installed, every contact imported into your GoHighLevel CRM becomes immediately available inside NOLA SMS Pro — no exports, no CSV uploads, and no manual syncing required.
        </p>
        <p className="text-[14.5px] leading-7 text-slate-700 dark:text-slate-300">
          The authorization handshake uses standard OAuth through the GoHighLevel Marketplace, granting NOLA SMS Pro only necessary scopes: contacts, messages, and location details.
        </p>
      </section>

      {/* PREREQUISITES */}
      <section id="install-prerequisites" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Before you begin</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              icon: <Shield className="h-5 w-5 text-blue-500" />,
              label: 'HighLevel Agency Access',
              detail: 'Administrator-level access to your GoHighLevel Agency Account',
            },
            {
              icon: <MapPin className="h-5 w-5 text-emerald-500" />,
              label: 'Target Sub-account',
              detail: 'The specific sub-account (location) name where the app should be installed',
            },
          ].map((item) => (
            <div key={item.label} className="premium-card flex flex-col justify-between h-full">
              <div>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                  {item.icon}
                </div>
                <h3 className="text-[15px] font-black text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                  {item.label}
                </h3>
                <p className="text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WARNING */}
      <section id="install-agency-warning">
        <div className="flex items-start gap-3.5 rounded-xl border border-amber-200 bg-amber-50/40 px-5 py-4 dark:border-amber-900/40 dark:bg-amber-950/10">
          <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600 dark:text-amber-400" />
          <div>
            <p className="text-[13.5px] font-black text-amber-800 dark:text-amber-300 uppercase tracking-wide mb-1">
              Switch to Agency View First
            </p>
            <p className="text-[13px] leading-relaxed text-amber-700 dark:text-amber-400 font-medium">
              The GoHighLevel App Marketplace is only accessible from <strong>Agency View</strong>. If you are currently inside a specific sub-account location, switch to Agency View before attempting to install NOLA SMS Pro.
            </p>
          </div>
        </div>
      </section>

      {/* STEP-BY-STEP INSTALLATION */}
      <section id="install-steps" className="space-y-5">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Installation steps</h2>
        <div className="space-y-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#111827] hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 shadow-sm shadow-[#0F172A]/2 space-y-5"
              >
                {/* Screenshot Frame / Placeholder */}
                <div className="w-full">
                  <BlankScreenFrame title={`${step.badge} — ${step.title}`} />
                </div>

                {/* Header: Icon + Title */}
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/50">
                    <Icon className={`h-5 w-5 ${step.color}`} />
                  </div>
                  <div>
                    <h4 className="text-[16px] font-black text-slate-900 dark:text-white leading-tight">
                      {step.title}
                    </h4>
                    <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      {step.sub}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-400 font-medium pl-1">
                  {step.desc}
                </p>

                {/* Bullet details */}
                <ul className="space-y-2 pl-1 border-t border-slate-100 dark:border-slate-800/60 pt-4">
                  {step.details.map((detail, subIdx) => (
                    <li key={subIdx} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-slate-600 dark:text-slate-400">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-400 dark:bg-slate-600" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* EXPECTED OUTCOME */}
      <section id="install-outcome">
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/40 px-5 py-4 dark:border-emerald-800/40 dark:bg-emerald-900/10">
          <CheckCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
          <div>
            <p className="text-[13.5px] font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-wide mb-0.5">Expected outcome</p>
            <p className="text-[13.5px] leading-relaxed text-emerald-700 dark:text-emerald-400 font-medium">
              After completing the installation steps, GoHighLevel establishes the OAuth connection and automatically redirects you to the NOLA SMS Pro setup &amp; registration screen.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
