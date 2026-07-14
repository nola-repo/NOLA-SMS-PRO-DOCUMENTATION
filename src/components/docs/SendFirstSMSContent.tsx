import React from 'react';
import type { DocPage } from '../../data/docsData';
import { InfoBox, WarningBox, SuccessBox } from '../Callouts';
import { DocSection, DocSectionHeading } from './layout';
import { Link } from 'react-router-dom';
import { ArrowRight, CreditCard, Smartphone } from 'lucide-react';

interface Props {
  page: DocPage;
}

export const SendFirstSMSContent: React.FC<Props> = ({ page }) => {
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
      <DocSection id="send-key-objective">
        <InfoBox title="Key Objective">
          Verify that you can successfully send an SMS and confirm that it is received on the recipient's mobile device.
        </InfoBox>
      </DocSection>

      {/* Section B — Prerequisites */}
      <DocSection id="send-prerequisites">
        <DocSectionHeading>Prerequisites</DocSectionHeading>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-4 rounded-2xl border border-[#D7E7FA] bg-[#F8FBFF] p-5 dark:border-[#183354] dark:bg-[#0B1627] shadow-sm shadow-[#184B8F]/3 hover:border-[#4F8EF7] transition-all duration-300">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#E8F3FF] text-[#1F5AAE] dark:bg-[#102B4F] dark:text-[#72A8FF]">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-[14px] font-black text-[#0B2E63] dark:text-white uppercase tracking-wider mb-1">SMS Credits</h4>
              <p className="text-[12.5px] leading-relaxed text-[#5D7596] dark:text-slate-400">
                Available SMS credits (new accounts receive 10 free trial credits upon registration).
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 rounded-2xl border border-[#D7E7FA] bg-[#F8FBFF] p-5 dark:border-[#183354] dark:bg-[#0B1627] shadow-sm shadow-[#184B8F]/3 hover:border-[#4F8EF7] transition-all duration-300">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#E8F3FF] text-[#1F5AAE] dark:bg-[#102B4F] dark:text-[#72A8FF]">
              <Smartphone className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-[14px] font-black text-[#0B2E63] dark:text-white uppercase tracking-wider mb-1">Test Contact</h4>
              <p className="text-[12.5px] leading-relaxed text-[#5D7596] dark:text-slate-400">
                A test contact with a valid Philippine mobile number formatted as 09XXXXXXXXX.
              </p>
            </div>
          </div>
        </div>
      </DocSection>

      {/* Section C — Step-by-Step Messaging */}
      <DocSection id="step-by-step-messaging">
        <DocSectionHeading>Step-by-Step Messaging</DocSectionHeading>
        
        <div className="relative pl-6 border-l-2 border-[#D7E7FA] dark:border-[#183354] ml-4 space-y-8 my-6">
          {[
            {
              title: 'Add a Test Contact',
              desc: 'Navigate to Contacts and select Add Contact. Save a test contact using your own mobile number.'
            },
            {
              title: 'Open Composer',
              desc: 'Open Compose SMS.'
            },
            {
              title: 'Select Recipient',
              desc: 'Select your test contact as the recipient.'
            },
            {
              title: 'Choose Sender ID',
              desc: 'Choose the default sender identity NOLASMSPro.'
            },
            {
              title: 'Draft Message Copy',
              desc: 'Compose a natural message, for example: "Hi, this is a delivery test from NOLA SMS Pro. No reply is required."'
            },
            {
              title: 'Review SMS Segments',
              desc: 'Review the character count before sending (1 standard SMS = 160 characters).'
            },
            {
              title: 'Dispatch Text Message',
              desc: 'Click Send once.'
            },
            {
              title: 'Verify Physical Delivery',
              desc: 'Verify that the SMS arrives on your physical mobile handset.'
            },
            {
              title: 'Audit Message Logs',
              desc: 'Open Message History and confirm the message status displays Sent or Delivered.'
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

      {/* Section D — Important Info */}
      <DocSection id="send-important-notice">
        <InfoBox title="📢 One-Way Outbound Messaging">
          Alphanumeric sender identities, including the default NOLASMSPro and approved custom Sender IDs, support one-way outbound messaging only. Recipients cannot reply directly to these messages. Successful verification is confirmed when the SMS is received on the recipient's mobile device.
        </InfoBox>
      </DocSection>

      {/* Section E — Warning Callout */}
      <DocSection id="send-warning-callout">
        <WarningBox title="⚠️ Avoid Generic Test Keywords">
          Avoid sending messages containing only generic words such as "test", "sms", or "hello". Carrier spam filters may block repetitive or low-quality content. Always send a natural, complete sentence during testing. If delivery fails, do not repeatedly click Send. Instead, verify your SMS credit balance and contact support with a screenshot if assistance is required.
        </WarningBox>
      </DocSection>

      {/* Section F — Expected Outcome */}
      <DocSection id="send-expected-outcome">
        <SuccessBox title="Expected Outcome">
          Once your test SMS is successfully received and the message status shows Delivered, your setup is complete and you are ready to begin normal messaging operations.
        </SuccessBox>
      </DocSection>

      {/* Section 7 — Closing + CTA */}
      <div className="border-t border-[#D7E7FA] pt-8 dark:border-[#183354]">
        <section aria-labelledby="closing-heading">
          <p className="text-[15px] font-medium leading-7 text-[#425B7D] dark:text-slate-300 max-w-[720px]">
            Ready to explore CRM contact controls? The next guide will show you how to search and manage contact records synchronized directly from HighLevel.
          </p>

          {/* Next Page CTA */}
          <Link
            to="/docs/contacts"
            id="send-next-cta"
            className="group mt-6 inline-flex items-center gap-3 rounded-2xl border border-[#4F8EF7]/30 bg-gradient-to-r from-[#1F5AAE] to-[#3B7FE0] px-6 py-4 text-white shadow-lg shadow-[#184B8F]/20 transition-all duration-200 hover:shadow-xl hover:shadow-[#184B8F]/30 hover:opacity-95"
          >
            <span className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#B8D8FF]">
                Next guide
              </span>
              <span className="mt-0.5 text-[15px] font-black leading-tight">
                Contacts
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
