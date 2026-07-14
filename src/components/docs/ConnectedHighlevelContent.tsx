import React from 'react';
import type { DocPage } from '../../data/docsData';
import { InfoBox, TipBox, SuccessBox } from '../Callouts';
import { DocSection, DocSectionHeading } from './layout';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';

interface Props {
  page: DocPage;
}

export const ConnectedHighlevelContent: React.FC<Props> = ({ page }) => {
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
      <DocSection id="connect-key-objective">
        <InfoBox title="Key Objective">
          Verify that NOLA SMS Pro is successfully connected to your GoHighLevel sub-account by confirming location identifiers and contact synchronization.
        </InfoBox>
      </DocSection>

      {/* Section B — Prerequisites */}
      <DocSection id="connect-prerequisites">
        <DocSectionHeading>Prerequisites</DocSectionHeading>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-4 rounded-2xl border border-[#D7E7FA] bg-[#F8FBFF] p-5 dark:border-[#183354] dark:bg-[#0B1627] shadow-sm shadow-[#184B8F]/3 hover:border-[#4F8EF7] transition-all duration-300">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#E8F3FF] text-[#1F5AAE] dark:bg-[#102B4F] dark:text-[#72A8FF]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-[14px] font-black text-[#0B2E63] dark:text-white uppercase tracking-wider mb-1">Marketplace Install</h4>
              <p className="text-[12.5px] leading-relaxed text-[#5D7596] dark:text-slate-400">
                Completed Marketplace installation.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 rounded-2xl border border-[#D7E7FA] bg-[#F8FBFF] p-5 dark:border-[#183354] dark:bg-[#0B1627] shadow-sm shadow-[#184B8F]/3 hover:border-[#4F8EF7] transition-all duration-300">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#E8F3FF] text-[#1F5AAE] dark:bg-[#102B4F] dark:text-[#72A8FF]">
              <UserCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-[14px] font-black text-[#0B2E63] dark:text-white uppercase tracking-wider mb-1">Owner Login</h4>
              <p className="text-[12.5px] leading-relaxed text-[#5D7596] dark:text-slate-400">
                Active owner profile login.
              </p>
            </div>
          </div>
        </div>
      </DocSection>

      {/* Section C — Step-by-Step Connection Verification */}
      <DocSection id="step-by-step-connection-verification">
        <DocSectionHeading>Step-by-Step Connection Verification</DocSectionHeading>
        
        <div className="relative pl-6 border-l-2 border-[#D7E7FA] dark:border-[#183354] ml-4 space-y-8 my-6">
          {[
            {
              title: 'Open NOLA SMS Pro',
              desc: 'Open NOLA SMS Pro from your GoHighLevel left navigation sidebar.'
            },
            {
              title: 'Access Settings',
              desc: 'Click Settings in the NOLA SMS Pro menu.'
            },
            {
              title: 'Confirm Location Identifiers',
              desc: 'Scroll to the profile details and confirm the correct Location Name and Location ID are displayed.'
            },
            {
              title: 'Open Contacts Menu',
              desc: 'Navigate to the Contacts section in NOLA SMS Pro.'
            },
            {
              title: 'Verify Contacts Sync',
              desc: 'Verify that customer contacts from your GoHighLevel sub-account have been successfully synchronized.'
            },
            {
              title: 'Confirm API Connection Status',
              desc: 'Return to Settings and confirm the connection badge displays API Connected. If it shows Disconnected, click Connect API to re-authorize the integration.'
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

      {/* Section D — Troubleshooting Tip */}
      <DocSection id="connect-troubleshooting-tip">
        <TipBox title="💡 TIP: Troubleshooting Missing Location or Contacts">
          If the Location Name or Location ID displays as null, or contacts are not loading, open GoHighLevel Agency View → Settings → Custom Menu Links, locate the NOLA SMS Pro menu link, and verify that <em>Pass contact/user info as query parameters</em> is enabled.
        </TipBox>
      </DocSection>

      {/* Section E — Expected Outcome */}
      <DocSection id="connect-expected-outcome">
        <SuccessBox title="Expected Outcome">
          Your location identity, owner profile, and GoHighLevel contact database are successfully synchronized and ready for standard messaging operations.
        </SuccessBox>
      </DocSection>

      {/* Section 7 — Closing + CTA */}
      <div className="border-t border-[#D7E7FA] pt-8 dark:border-[#183354]">
        <section aria-labelledby="closing-heading">
          <p className="text-[15px] font-medium leading-7 text-[#425B7D] dark:text-slate-300 max-w-[720px]">
            Ready to explore your new SMS command center? The next guide will walk you through the primary tabs and control modules of the NOLA SMS Pro dashboard.
          </p>

          {/* Next Page CTA */}
          <Link
            to="/docs/dashboard-overview"
            id="connect-next-cta"
            className="group mt-6 inline-flex items-center gap-3 rounded-2xl border border-[#4F8EF7]/30 bg-gradient-to-r from-[#1F5AAE] to-[#3B7FE0] px-6 py-4 text-white shadow-lg shadow-[#184B8F]/20 transition-all duration-200 hover:shadow-xl hover:shadow-[#184B8F]/30 hover:opacity-95"
          >
            <span className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#B8D8FF]">
                Next guide
              </span>
              <span className="mt-0.5 text-[15px] font-black leading-tight">
                Dashboard Overview
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
