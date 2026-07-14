import React from 'react';
import type { DocPage } from '../../data/docsData';
import { InfoBox, WarningBox, SuccessBox } from '../Callouts';
import { DocSection, DocSectionHeading } from './layout';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Phone } from 'lucide-react';

interface Props {
  page: DocPage;
}

export const CreateOrSignInContent: React.FC<Props> = ({ page }) => {
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
      <DocSection id="create-signin-key-objective">
        <InfoBox title="Key Objective">
          Map each installed sub-account/location in GHL to a registered owner profile in NOLA SMS Pro to secure data and track credit balances.
        </InfoBox>
      </DocSection>

      {/* Section B — Prerequisites */}
      <DocSection id="create-signin-prerequisites">
        <DocSectionHeading>Prerequisites</DocSectionHeading>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-4 rounded-2xl border border-[#D7E7FA] bg-[#F8FBFF] p-5 dark:border-[#183354] dark:bg-[#0B1627] shadow-sm shadow-[#184B8F]/3 hover:border-[#4F8EF7] transition-all duration-300">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#E8F3FF] text-[#1F5AAE] dark:bg-[#102B4F] dark:text-[#72A8FF]">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-[14px] font-black text-[#0B2E63] dark:text-white uppercase tracking-wider mb-1">Business Email</h4>
              <p className="text-[12.5px] leading-relaxed text-[#5D7596] dark:text-slate-400">
                A valid business email address.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 rounded-2xl border border-[#D7E7FA] bg-[#F8FBFF] p-5 dark:border-[#183354] dark:bg-[#0B1627] shadow-sm shadow-[#184B8F]/3 hover:border-[#4F8EF7] transition-all duration-300">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#E8F3FF] text-[#1F5AAE] dark:bg-[#102B4F] dark:text-[#72A8FF]">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-[14px] font-black text-[#0B2E63] dark:text-white uppercase tracking-wider mb-1">Mobile Number</h4>
              <p className="text-[12.5px] leading-relaxed text-[#5D7596] dark:text-slate-400">
                A contact mobile number.
              </p>
            </div>
          </div>
        </div>
      </DocSection>

      {/* Section C — Step-by-Step Registration */}
      <DocSection id="step-by-step-registration">
        <DocSectionHeading>Step-by-Step Registration</DocSectionHeading>
        
        <div className="relative pl-6 border-l-2 border-[#D7E7FA] dark:border-[#183354] ml-4 space-y-8 my-6">
          {[
            {
              title: 'Enter Profile Details',
              desc: 'Once redirected to the registration page, enter your Full Name, Email Address, Phone Number, and Password.'
            },
            {
              title: 'Create Account',
              desc: 'Click Create Account to map your user account as the canonical owner of this location.'
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

      {/* Section D — Step-by-Step Sign In */}
      <DocSection id="step-by-step-sign-in">
        <DocSectionHeading>Step-by-Step Sign In</DocSectionHeading>
        
        <div className="relative pl-6 border-l-2 border-[#D7E7FA] dark:border-[#183354] ml-4 space-y-8 my-6">
          {[
            {
              title: 'Navigate to Sign In',
              desc: 'If NOLA SMS Pro was previously set up for this location, navigate to the Sign In screen.'
            },
            {
              title: 'Enter Credentials',
              desc: 'Enter the existing owner credentials and click Sign In.'
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

      {/* Section E — Important Notice */}
      <DocSection id="create-signin-important-notice">
        <WarningBox title="⚠️ WARNING: Do Not Create Duplicate Owners">
          If a location is already registered, always sign in with the original owner account. Creating a new account for an already registered location will be blocked to protect your credit history and settings.
        </WarningBox>
      </DocSection>

      {/* Section F — Expected Outcome */}
      <DocSection id="create-signin-expected-outcome">
        <SuccessBox title="Expected Outcome">
          Once you complete registration or sign in, your location mapping is verified and the setup wizard proceeds to the connection confirmation step.
        </SuccessBox>
      </DocSection>

      {/* Section 7 — Closing + CTA */}
      <div className="border-t border-[#D7E7FA] pt-8 dark:border-[#183354]">
        <section aria-labelledby="closing-heading">
          <p className="text-[15px] font-medium leading-7 text-[#425B7D] dark:text-slate-300 max-w-[720px]">
            Ready to confirm the connection? The next guide will show you how to confirm the integration status between HighLevel and NOLA SMS Pro.
          </p>

          {/* Next Page CTA */}
          <Link
            to="/docs/connect-highlevel"
            id="signin-next-cta"
            className="group mt-6 inline-flex items-center gap-3 rounded-2xl border border-[#4F8EF7]/30 bg-gradient-to-r from-[#1F5AAE] to-[#3B7FE0] px-6 py-4 text-white shadow-lg shadow-[#184B8F]/20 transition-all duration-200 hover:shadow-xl hover:shadow-[#184B8F]/30 hover:opacity-95"
          >
            <span className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#B8D8FF]">
                Next guide
              </span>
              <span className="mt-0.5 text-[15px] font-black leading-tight">
                Connect HighLevel
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
