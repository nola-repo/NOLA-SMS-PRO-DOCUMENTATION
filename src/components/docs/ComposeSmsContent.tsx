import React from 'react';
import type { DocPage } from '../../data/docsData';
import { InfoBox, TipBox, WarningBox, SuccessBox } from '../Callouts';
import { DocSection, DocSectionHeading } from './layout';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, CreditCard, ShieldCheck } from 'lucide-react';

interface Props {
  page: DocPage;
}

export const ComposeSmsContent: React.FC<Props> = ({ page }) => {
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
      <DocSection id="compose-key-objective">
        <InfoBox title="Key Objective">
          Personalize, draft, and send SMS messages to selected contact recipients.
        </InfoBox>
      </DocSection>

      {/* Section B — Prerequisites */}
      <DocSection id="compose-prerequisites">
        <DocSectionHeading>Prerequisites</DocSectionHeading>
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Item 1: Synced contacts */}
          <div className="flex items-start gap-4 rounded-2xl border border-[#D7E7FA] bg-[#F8FBFF] p-5 dark:border-[#183354] dark:bg-[#0B1627] shadow-sm shadow-[#184B8F]/3 hover:border-[#4F8EF7] transition-all duration-300">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#E8F3FF] text-[#1F5AAE] dark:bg-[#102B4F] dark:text-[#72A8FF]">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-[13px] font-black text-[#0B2E63] dark:text-white uppercase tracking-wider mb-1">Synced Contacts</h4>
              <p className="text-[12px] leading-relaxed text-[#5D7596] dark:text-slate-400">
                Synced contact records must exist in your database.
              </p>
            </div>
          </div>
          
          {/* Item 2: SMS Credits */}
          <div className="flex items-start gap-4 rounded-2xl border border-[#D7E7FA] bg-[#F8FBFF] p-5 dark:border-[#183354] dark:bg-[#0B1627] shadow-sm shadow-[#184B8F]/3 hover:border-[#4F8EF7] transition-all duration-300">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#E8F3FF] text-[#1F5AAE] dark:bg-[#102B4F] dark:text-[#72A8FF]">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-[13px] font-black text-[#0B2E63] dark:text-white uppercase tracking-wider mb-1">Available Credits</h4>
              <p className="text-[12px] leading-relaxed text-[#5D7596] dark:text-slate-400">
                Available SMS credits to cover message segments.
              </p>
            </div>
          </div>

          {/* Item 3: Active Sender Identity */}
          <div className="flex items-start gap-4 rounded-2xl border border-[#D7E7FA] bg-[#F8FBFF] p-5 dark:border-[#183354] dark:bg-[#0B1627] shadow-sm shadow-[#184B8F]/3 hover:border-[#4F8EF7] transition-all duration-300">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#E8F3FF] text-[#1F5AAE] dark:bg-[#102B4F] dark:text-[#72A8FF]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-[13px] font-black text-[#0B2E63] dark:text-white uppercase tracking-wider mb-1">Sender Identity</h4>
              <p className="text-[12px] leading-relaxed text-[#5D7596] dark:text-slate-400">
                An active sender identity (NOLASMSPro or custom mask).
              </p>
            </div>
          </div>
        </div>
      </DocSection>

      {/* Section C — Step-by-Step Composing and Sending */}
      <DocSection id="compose-sending-stepper">
        <DocSectionHeading>Step-by-Step Composing and Sending</DocSectionHeading>
        
        <div className="relative pl-6 border-l-2 border-[#D7E7FA] dark:border-[#183354] ml-4 space-y-8 my-6">
          {[
            {
              title: 'Open Compose Menu',
              desc: 'Select Compose SMS from the left navigation.'
            },
            {
              title: 'Select Recipients',
              desc: 'Search for and select one or more contacts as recipients.'
            },
            {
              title: 'Choose Sender ID',
              desc: 'Choose your sender identity from the available options (default NOLASMSPro or an approved custom Sender ID).'
            },
            {
              title: 'Draft or Load Template',
              desc: 'Compose your SMS or insert a previously saved message template.'
            },
            {
              title: 'Review Segment Estimates',
              desc: 'Review the character count (1 standard SMS = 160 characters) and the estimated SMS credit usage.'
            },
            {
              title: 'Dispatch Outbox Queue',
              desc: 'Click Send once to queue the message for delivery.'
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

      {/* Section D — Warning Box */}
      <DocSection id="compose-handset-warning">
        <WarningBox title="⚠️ WARNING: Verify Handset Delivery">
          Alphanumeric sender identities, including NOLASMSPro and approved custom Sender IDs, support one-way outbound messaging only. Recipients cannot reply directly to these messages. Always verify successful delivery using a physical mobile handset. If a message fails, do not repeatedly click Send. Instead, review your SMS credit balance and Message History before attempting to send again.
        </WarningBox>
      </DocSection>

      {/* Section E — Additional Best Practices */}
      <DocSection id="compose-best-practices">
        <DocSectionHeading>Best Practices & Estimation Tips</DocSectionHeading>
        <div className="grid gap-4 md:grid-cols-2">
          <TipBox title="💡 Characters & Multi-Segments">
            A standard message segment allows up to 160 characters. Exceeding this limit will trigger multi-segment splits, which debit additional credits. Keep an eye on the character counter.
          </TipBox>
          <TipBox title="💡 Special Characters Spills">
            Using special characters or emojis shifts the character encoding to Unicode, which limits standard segment sizes to 70 characters. Avoid non-GSM characters where possible to save credits.
          </TipBox>
        </div>
      </DocSection>

      {/* Section F — Expected Outcome */}
      <DocSection id="compose-expected-outcome">
        <SuccessBox title="Expected Outcome">
          Your outbound messages are queued for delivery, SMS credits are deducted accordingly, and transmission status can be monitored from Message History.
        </SuccessBox>
      </DocSection>

      {/* Section G — Closing + CTA */}
      <div className="border-t border-[#D7E7FA] pt-8 dark:border-[#183354]">
        <section aria-labelledby="closing-heading">
          <p className="text-[15px] font-medium leading-7 text-[#425B7D] dark:text-slate-300 max-w-[720px]">
            Once you know how to compose custom text messages, you can store frequently sent copywriting in templates. The next guide will walk you through the Message Templates directory.
          </p>

          {/* Next Page CTA */}
          <Link
            to="/docs/message-templates"
            id="compose-next-cta"
            className="group mt-6 inline-flex items-center gap-3 rounded-2xl border border-[#4F8EF7]/30 bg-gradient-to-r from-[#1F5AAE] to-[#3B7FE0] px-6 py-4 text-white shadow-lg shadow-[#184B8F]/20 transition-all duration-200 hover:shadow-xl hover:shadow-[#184B8F]/30 hover:opacity-95"
          >
            <span className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#B8D8FF]">
                Next guide
              </span>
              <span className="mt-0.5 text-[15px] font-black leading-tight">
                Message Templates
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
