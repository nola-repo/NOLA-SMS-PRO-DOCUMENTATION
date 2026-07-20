import React from 'react';
import type { DocPage } from '../../data/docsData';
import { DocSection } from './layout';
import {
  Shield, MapPin, AlertTriangle,
  Store, LogIn, Package, MousePointerClick, CheckCheck
} from 'lucide-react';

interface Props { page: DocPage; }

const steps = [
  {
    icon: <LogIn className="h-4 w-4" />,
    title: 'Log in to GoHighLevel',
    sub: 'Agency admin credentials',
    desc: 'Sign in to your GoHighLevel portal using your administrator credentials.',
  },
  {
    icon: <Shield className="h-4 w-4" />,
    title: 'Select Agency View',
    sub: 'Top-left dropdown',
    desc: 'Click the dropdown in the top-left corner and switch to the Agency View.',
  },
  {
    icon: <Store className="h-4 w-4" />,
    title: 'Open the Marketplace',
    sub: 'Sidebar → App Marketplace',
    desc: 'Navigate to the App Marketplace tab in the sidebar and search for "NOLA SMS Pro".',
  },
  {
    icon: <Package className="h-4 w-4" />,
    title: 'Click Install',
    sub: 'Select the app from results',
    desc: 'Select the NOLA SMS Pro app from the search results and click the "Install" button.',
  },
  {
    icon: <MapPin className="h-4 w-4" />,
    title: 'Select Sub-account',
    sub: 'Choose your target location',
    desc: 'Choose the designated sub-account (location) where you want the app installed.',
  },
  {
    icon: <MousePointerClick className="h-4 w-4" />,
    title: 'Authorize Permissions',
    sub: 'Allow & Install',
    desc: 'Review the requested permission scopes — contacts, messages, and location details — then click "Allow & Install" to complete the authorization.',
  },
];

export const InstallNolaSmsProContent: React.FC<Props> = ({ page }) => {
  return (
    <div className="w-full space-y-12 pb-10">

      {/* RICH INTRO */}
      <section id="install-intro" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">What this guide covers</h2>
        <p className="text-[14.5px] leading-7 text-slate-700 dark:text-slate-300">
          Authorize GoHighLevel to integrate with the NOLA platform so the app can send text messages and synchronize your contact database. This process takes less than 3 minutes and only needs to be done once per sub-account.
        </p>
        <p className="text-[14.5px] leading-7 text-slate-700 dark:text-slate-300">
          Once installed, every contact imported into your GoHighLevel CRM becomes immediately available inside NOLA SMS Pro — no exports, no CSV uploads, no manual syncing required.
        </p>
        <p className="text-[14.5px] leading-7 text-slate-700 dark:text-slate-300">
          The authorization handshake uses a standard OAuth flow through the GoHighLevel Marketplace, granting NOLA SMS Pro only the scopes it needs: contacts, messages, and location details. You can revoke access at any time from the Marketplace settings.
        </p>
      </section>

      {/* PREREQUISITES */}
      <section id="install-prerequisites" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Before you begin</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <Shield className="h-4 w-4" />, label: 'HighLevel Access', detail: 'Administrator-level access to your GoHighLevel Agency Account' },
            { icon: <MapPin className="h-4 w-4" />, label: 'Target Sub-account', detail: 'The specific sub-account (location) name where the app should be installed' },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/30">
              <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100/50 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                {item.icon}
              </div>
              <div>
                <p className="text-[13.5px] font-black text-slate-900 dark:text-white">{item.label}</p>
                <p className="text-[12.5px] leading-relaxed text-slate-500 dark:text-slate-400 mt-0.5">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STEP-BY-STEP INSTALLATION */}
      <section id="install-steps" className="space-y-5">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Installation steps</h2>

        <div className="space-y-4">
          {steps.map((step, idx) => (
            <React.Fragment key={idx}>
              {/* Inject warning between steps 1 and 2 */}
              {idx === 1 && (
                <div className="flex items-start gap-3.5 rounded-xl border border-amber-200 bg-amber-50/40 px-5 py-4 dark:border-amber-900/40 dark:bg-amber-950/10 my-1">
                  <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600 dark:text-amber-400" />
                  <p className="text-[13px] leading-relaxed text-amber-800 dark:text-amber-300 font-semibold">
                    The Marketplace is only accessible from <strong>Agency View</strong>. Always switch before proceeding.
                  </p>
                </div>
              )}
              <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800/80 dark:bg-[#111827] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-400 dark:hover:border-slate-600 hover:shadow-md group">
                {/* Step number */}
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200 text-[11px] font-black border border-slate-300 dark:border-slate-700 mt-0.5">
                  {idx + 1}
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 flex-wrap mb-1">
                    <span className="text-[15px] font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{step.title}</span>
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-bold text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 uppercase tracking-wide">{step.sub}</span>
                  </div>
                  <p className="text-[13.5px] leading-relaxed text-slate-500 dark:text-slate-400">{step.desc}</p>
                </div>
                {/* Icon */}
                <div className="flex-shrink-0 text-slate-400 dark:text-slate-600 mt-0.5 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                  {step.icon}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* SUCCESS STRIP */}
      <section id="install-outcome">
        <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50/40 px-5 py-4 dark:border-emerald-800/40 dark:bg-emerald-900/10">
          <CheckCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
          <div>
            <p className="text-[13.5px] font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-wide mb-0.5">Expected outcome</p>
            <p className="text-[13.5px] leading-relaxed text-emerald-700 dark:text-emerald-400 font-medium">
              After completing installation, GoHighLevel establishes the connection and automatically redirects you to the account setup screen.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
