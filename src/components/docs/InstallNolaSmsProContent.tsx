import React from 'react';
import type { DocPage } from '../../data/docsData';
import { InfoBox, WarningBox, SuccessBox } from '../Callouts';
import { DocSection, DocSectionHeading } from './layout';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, MapPin } from 'lucide-react';

interface Props {
  page: DocPage;
}

export const InstallNolaSmsProContent: React.FC<Props> = ({ page }) => {
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
      <DocSection id="install-key-objective">
        <InfoBox title="Key Objective">
          Authorize GoHighLevel to integrate with the NOLA platform so the app can send text messages and synchronize your contact database.
        </InfoBox>
      </DocSection>

      {/* Section B — Prerequisites */}
      <DocSection id="install-prerequisites">
        <DocSectionHeading>Prerequisites</DocSectionHeading>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-4 rounded-2xl border border-[#D7E7FA] bg-[#F8FBFF] p-5 dark:border-[#183354] dark:bg-[#0B1627] shadow-sm shadow-[#184B8F]/3 hover:border-[#4F8EF7] transition-all duration-300">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#E8F3FF] text-[#1F5AAE] dark:bg-[#102B4F] dark:text-[#72A8FF]">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-[14px] font-black text-[#0B2E63] dark:text-white uppercase tracking-wider mb-1">HighLevel Access</h4>
              <p className="text-[12.5px] leading-relaxed text-[#5D7596] dark:text-slate-400">
                Administrator-level access to your GoHighLevel Agency Account.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 rounded-2xl border border-[#D7E7FA] bg-[#F8FBFF] p-5 dark:border-[#183354] dark:bg-[#0B1627] shadow-sm shadow-[#184B8F]/3 hover:border-[#4F8EF7] transition-all duration-300">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#E8F3FF] text-[#1F5AAE] dark:bg-[#102B4F] dark:text-[#72A8FF]">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-[14px] font-black text-[#0B2E63] dark:text-white uppercase tracking-wider mb-1">Target Account</h4>
              <p className="text-[12.5px] leading-relaxed text-[#5D7596] dark:text-slate-400">
                The specific sub-account (location) name where the app should be installed.
              </p>
            </div>
          </div>
        </div>
      </DocSection>

      {/* Section C — Step-by-Step Installation */}
      <DocSection id="install-step-by-step">
        <DocSectionHeading>Step-by-Step Installation</DocSectionHeading>
        
        <div className="relative pl-6 border-l-2 border-[#D7E7FA] dark:border-[#183354] ml-4 space-y-8 my-6">
          {[
            {
              title: 'Log in to GoHighLevel',
              desc: 'Sign in to your GoHighLevel portal using your administrator credentials.'
            },
            {
              title: 'Select Agency View',
              desc: 'Click on the dropdown in the top-left corner and switch to the Agency View.'
            },
            {
              title: 'Open the Marketplace',
              desc: 'Navigate to the App Marketplace tab in the sidebar and search for "NOLA SMS Pro".'
            },
            {
              title: 'Click Install',
              desc: 'Select the NOLA SMS Pro app from the search results and click the "Install" button.'
            },
            {
              title: 'Select Sub-account',
              desc: 'Choose the designated sub-account or location where you want the app installed.'
            },
            {
              title: 'Authorize Permissions',
              desc: 'Review the requested permission scopes (contacts, messages, location details), then click "Allow & Install" to authorize the integration.'
            }
          ].map((step, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[35px] top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#1F5AAE] text-white dark:bg-[#72A8FF] dark:text-[#07111F] text-[10px] font-black shadow-md transition-all duration-200 group-hover:scale-110">
                {idx + 1}
              </div>
              <h4 className="text-[14.5px] font-bold text-[#0B2E63] dark:text-white leading-none mb-2 group-hover:text-[#1F5AAE] dark:group-hover:text-[#72A8FF] transition-colors">
                {step.title}
              </h4>
              <p className="text-[13.5px] leading-relaxed text-[#5D7596] dark:text-slate-400">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </DocSection>

      {/* Section D — Important Notice */}
      <DocSection id="install-important-notice">
        <WarningBox title="⚠️ IMPORTANT: Agency View Installation">
          Always start the installation from the Agency View. The HighLevel Marketplace is only accessible from the Agency View so that you can select and authorize the integration for your intended sub-accounts.
        </WarningBox>
      </DocSection>

      {/* Section E — Expected Outcome */}
      <DocSection id="install-expected-outcome">
        <SuccessBox title="Expected Outcome">
          After completing the installation steps, GoHighLevel will establish the connection and automatically redirect you to the account setup screen.
        </SuccessBox>
      </DocSection>

      {/* Section 7 — Closing + CTA */}
      <div className="border-t border-[#D7E7FA] pt-8 dark:border-[#183354]">
        <section aria-labelledby="closing-heading">
          <p className="text-[15px] font-medium leading-7 text-[#425B7D] dark:text-slate-300 max-w-[720px]">
            Ready to configure your profile? The next guide walks you through registering your owner profile — it takes less than 2 minutes.
          </p>

          {/* Next Page CTA */}
          <Link
            to="/docs/create-or-sign-in"
            id="install-next-cta"
            className="group mt-6 inline-flex items-center gap-3 rounded-2xl border border-[#4F8EF7]/30 bg-gradient-to-r from-[#1F5AAE] to-[#3B7FE0] px-6 py-4 text-white shadow-lg shadow-[#184B8F]/20 transition-all duration-200 hover:shadow-xl hover:shadow-[#184B8F]/30 hover:opacity-95"
          >
            <span className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#B8D8FF]">
                Next guide
              </span>
              <span className="mt-0.5 text-[15px] font-black leading-tight">
                Create or Sign In
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
