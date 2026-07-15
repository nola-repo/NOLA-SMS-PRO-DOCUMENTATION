import React from 'react';
import type { DocPage } from '../../data/docsData';
import { InfoBox, SuccessBox } from '../Callouts';
import { DocSection, DocSectionHeading } from './layout';
import { Link } from 'react-router-dom';
import { ArrowRight, HelpCircle } from 'lucide-react';

interface Props {
  page: DocPage;
}

export const SupportHelpContent: React.FC<Props> = ({ page }) => {
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
      <DocSection id="support-key-objective">
        <InfoBox title="Key Objective">
          Create support tickets to report billing, Sender ID, application setup, or SMS delivery issues, and monitor the progress of your existing requests.
        </InfoBox>
      </DocSection>

      {/* Section B — Prerequisites */}
      <DocSection id="support-prerequisites">
        <DocSectionHeading>Prerequisites</DocSectionHeading>
        <div className="rounded-2xl border border-[#D7E7FA] bg-[#F8FBFF] p-5 dark:border-[#183354] dark:bg-[#0B1627] flex items-start gap-4 max-w-[680px] shadow-sm shadow-[#184B8F]/3 hover:border-[#4F8EF7] transition-all duration-300">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#E8F3FF] text-[#1F5AAE] dark:bg-[#102B4F] dark:text-[#72A8FF]">
            <HelpCircle className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-[14px] font-black text-[#0B2E63] dark:text-white uppercase tracking-wider mb-1">Owner Login</h4>
            <p className="text-[12.5px] leading-relaxed text-[#5D7596] dark:text-slate-400">
              Active owner account login is required to submit support requests.
            </p>
          </div>
        </div>
      </DocSection>

      {/* Section C — Step-by-Step Ticket Submission */}
      <DocSection id="ticket-submission-stepper">
        <DocSectionHeading>Step-by-Step Ticket Submission</DocSectionHeading>
        
        <div className="relative pl-6 border-l-2 border-[#D7E7FA] dark:border-[#183354] ml-4 space-y-8 my-6">
          {[
            {
              title: 'Open Support Console',
              desc: 'Open Support & Help from the left navigation.'
            },
            {
              title: 'Initiate Ticket Request',
              desc: 'Click Create Support Ticket.'
            },
            {
              title: 'Select Ticket Category',
              desc: 'Select the appropriate category, such as Credits & Billing, Sender ID, Message Delivery, or Application Setup.'
            },
            {
              title: 'Draft Issue Description',
              desc: 'Enter a detailed description of the issue.'
            },
            {
              title: 'Upload Diagnostics Screen',
              desc: 'Attach a screenshot of the error or affected screen, when applicable.'
            },
            {
              title: 'Submit Ticket Request',
              desc: 'Click Submit Ticket.'
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

      {/* Section D — Important Details callout */}
      <DocSection id="support-details-critical">
        <InfoBox title="📋 CRITICAL: SMS Issue Details Required">
          <div className="space-y-1 mt-1 text-[13.5px] text-[#0F172A] dark:text-slate-200 font-semibold leading-relaxed">
            <p>When reporting an SMS delivery issue, include the following information to help the support team investigate more efficiently:</p>
            <ul className="list-disc pl-5 mt-1.5 space-y-1 font-medium text-slate-700 dark:text-slate-350">
              <li>Recipient mobile phone number.</li>
              <li>Approximate date and time the SMS was sent.</li>
              <li>The error code or failure reason shown in Message History.</li>
            </ul>
          </div>
        </InfoBox>
      </DocSection>

      {/* Section E — Step-by-Step Ticket Tracking */}
      <DocSection id="ticket-tracking-stepper">
        <DocSectionHeading>Step-by-Step Ticket Tracking</DocSectionHeading>
        
        <div className="relative pl-6 border-l-2 border-[#D7E7FA] dark:border-[#183354] ml-4 space-y-8 my-6">
          {[
            {
              title: 'Review Ticket Logs',
              desc: 'Review your list of Active and Resolved support tickets.'
            },
            {
              title: 'Access Status Updates',
              desc: 'Select a ticket reference number to view status updates, comments, and responses from the support team.'
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

      {/* Section F — Expected Outcome */}
      <DocSection id="support-expected-outcome">
        <SuccessBox title="Expected Outcome">
          Your support request is successfully submitted and tracked within the system, allowing administrators to review, investigate, and respond to your issue.
        </SuccessBox>
      </DocSection>

      {/* Section G — Closing + CTA */}
      <div className="border-t border-[#D7E7FA] pt-8 dark:border-[#183354]">
        <section aria-labelledby="closing-heading">
          <p className="text-[15px] font-medium leading-7 text-[#425B7D] dark:text-slate-300 max-w-[720px]">
            Looking for quick answers to common questions about SMS segments, billing, or integrations? The next guide will walk you through the FAQ section.
          </p>

          {/* Next Page CTA */}
          <Link
            to="/docs/faq"
            id="support-next-cta"
            className="group mt-6 inline-flex items-center gap-3 rounded-2xl border border-[#4F8EF7]/30 bg-gradient-to-r from-[#1F5AAE] to-[#3B7FE0] px-6 py-4 text-white shadow-lg shadow-[#184B8F]/20 transition-all duration-200 hover:shadow-xl hover:shadow-[#184B8F]/30 hover:opacity-95"
          >
            <span className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#B8D8FF]">
                Next guide
              </span>
              <span className="mt-0.5 text-[15px] font-black leading-tight">
                FAQ
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
