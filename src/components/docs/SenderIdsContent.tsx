import React from 'react';
import type { DocPage } from '../../data/docsData';
import { InfoBox, TipBox, WarningBox, SuccessBox } from '../Callouts';
import { DocSection, DocSectionHeading } from './layout';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';

interface Props {
  page: DocPage;
}

export const SenderIdsContent: React.FC<Props> = ({ page }) => {
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
      <DocSection id="sender-ids-key-objective">
        <InfoBox title="Key Objective">
          Request and manage alphanumeric Sender IDs to strengthen brand recognition when customers receive your SMS messages.
        </InfoBox>
      </DocSection>

      {/* Section B — Prerequisites */}
      <DocSection id="sender-ids-prerequisites">
        <DocSectionHeading>Prerequisites</DocSectionHeading>
        <div className="rounded-2xl border border-[#D7E7FA] bg-[#F8FBFF] p-5 dark:border-[#183354] dark:bg-[#0B1627] flex items-start gap-4 max-w-[680px] shadow-sm shadow-[#184B8F]/3 hover:border-[#4F8EF7] transition-all duration-300">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#E8F3FF] text-[#1F5AAE] dark:bg-[#102B4F] dark:text-[#72A8FF]">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-[14px] font-black text-[#0B2E63] dark:text-white uppercase tracking-wider mb-1">Registration Details</h4>
            <p className="text-[12.5px] leading-relaxed text-[#5D7596] dark:text-slate-400">
              Active business registration details and supporting documents for Sender ID verification.
            </p>
          </div>
        </div>
      </DocSection>

      {/* Section C — Step-by-Step Submitting a Custom Sender ID Request */}
      <DocSection id="sender-id-request-stepper">
        <DocSectionHeading>Step-by-Step Submitting a Custom Sender ID Request</DocSectionHeading>
        
        <div className="relative pl-6 border-l-2 border-[#D7E7FA] dark:border-[#183354] ml-4 space-y-8 my-6">
          {[
            {
              title: 'Open Sender IDs Menu',
              desc: 'Open Sender IDs from the left navigation.'
            },
            {
              title: 'Review System Default',
              desc: 'Review the default sender identity NOLASMSPro, which is immediately available for use.'
            },
            {
              title: 'Request Custom ID',
              desc: 'Click Request Custom Sender ID to request a branded sender name of up to 11 alphanumeric characters.'
            },
            {
              title: 'Enter Verification Details',
              desc: 'Enter your Brand Name, Registered Business Name, and upload any required verification documents.'
            },
            {
              title: 'Submit for Carrier Review',
              desc: 'Click Submit Request.'
            },
            {
              title: 'Monitor Request Status',
              desc: 'Monitor the request status to see whether it is Pending, Approved, or Rejected.'
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

      {/* Section D — Important Warning */}
      <DocSection id="sender-ids-approval-workflow">
        <WarningBox title="⚠️ IMPORTANT: Carrier Approval Workflow">
          Custom Sender IDs require approval from participating telecommunications networks before they can be used. Only Approved Sender IDs appear in the sender selection dropdown on the Compose SMS page. Sender IDs with a status of Pending or Rejected are unavailable for message delivery.
        </WarningBox>
      </DocSection>

      {/* Section E — Verification Guidelines */}
      <DocSection id="sender-ids-best-practices">
        <DocSectionHeading>Registration & Formatting Guidelines</DocSectionHeading>
        <div className="grid gap-4 md:grid-cols-2">
          <TipBox title="💡 Mask Character Rules">
            Custom Sender IDs are restricted to a maximum of 11 characters. They must be alphanumeric (letters A-Z and numbers 0-9). Special characters, symbols, and spaces are generally not allowed by telecommunications networks.
          </TipBox>
          <TipBox title="💡 Registration Documentation">
            Carriers strictly regulate sender headers. Prepare valid government registration papers (e.g. SEC/DTI registration, BIR Certificate of Registration, or trademark papers) that match your requested brand mask.
          </TipBox>
        </div>
      </DocSection>

      {/* Section F — Expected Outcome */}
      <DocSection id="sender-ids-expected-outcome">
        <SuccessBox title="Expected Outcome">
          Your custom Sender ID request is submitted for carrier review. Once approved, it becomes available as a selectable sender identity when composing outbound SMS messages.
        </SuccessBox>
      </DocSection>

      {/* Section G — Closing + CTA */}
      <div className="border-t border-[#D7E7FA] pt-8 dark:border-[#183354]">
        <section aria-labelledby="closing-heading">
          <p className="text-[15px] font-medium leading-7 text-[#425B7D] dark:text-slate-300 max-w-[720px]">
            Once your Sender IDs are approved, you can verify transmission details and carrier response codes. The next guide will walk you through Message History.
          </p>

          {/* Next Page CTA */}
          <Link
            to="/docs/message-history"
            id="sender-ids-next-cta"
            className="group mt-6 inline-flex items-center gap-3 rounded-2xl border border-[#4F8EF7]/30 bg-gradient-to-r from-[#1F5AAE] to-[#3B7FE0] px-6 py-4 text-white shadow-lg shadow-[#184B8F]/20 transition-all duration-200 hover:shadow-xl hover:shadow-[#184B8F]/30 hover:opacity-95"
          >
            <span className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#B8D8FF]">
                Next guide
              </span>
              <span className="mt-0.5 text-[15px] font-black leading-tight">
                Message History
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
