import React from 'react';
import type { DocPage } from '../../data/docsData';
import { InfoBox, TipBox, SuccessBox } from '../Callouts';
import { DocSection, DocSectionHeading } from './layout';
import { Link } from 'react-router-dom';
import { ArrowRight, History } from 'lucide-react';

interface Props {
  page: DocPage;
}

export const MessageHistoryContent: React.FC<Props> = ({ page }) => {
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
      <DocSection id="history-key-objective">
        <InfoBox title="Key Objective">
          Audit and track the status of all sent messages, including delivery logs, timestamps, and error details.
        </InfoBox>
      </DocSection>

      {/* Section B — Prerequisites */}
      <DocSection id="history-prerequisites">
        <DocSectionHeading>Prerequisites</DocSectionHeading>
        <div className="rounded-2xl border border-[#D7E7FA] bg-[#F8FBFF] p-5 dark:border-[#183354] dark:bg-[#0B1627] flex items-start gap-4 max-w-[680px] shadow-sm shadow-[#184B8F]/3 hover:border-[#4F8EF7] transition-all duration-300">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#E8F3FF] text-[#1F5AAE] dark:bg-[#102B4F] dark:text-[#72A8FF]">
            <History className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-[14px] font-black text-[#0B2E63] dark:text-white uppercase tracking-wider mb-1">Sent SMS History</h4>
            <p className="text-[12.5px] leading-relaxed text-[#5D7596] dark:text-slate-400">
              Queued or previously sent outbound SMS messages.
            </p>
          </div>
        </div>
      </DocSection>

      {/* Section C — Step-by-Step Message Auditing */}
      <DocSection id="message-auditing-stepper">
        <DocSectionHeading>Step-by-Step Message Auditing</DocSectionHeading>
        
        <div className="relative pl-6 border-l-2 border-[#D7E7FA] dark:border-[#183354] ml-4 space-y-8 my-6">
          {[
            {
              title: 'Open Message History',
              desc: 'Open Message History from the left navigation.'
            },
            {
              title: 'Review Log Fields',
              desc: 'Review the message log, including the Recipient, Timestamp, Sender ID, and Delivery Status.'
            },
            {
              title: 'Check Status Column States',
              desc: (
                <div className="space-y-1 mt-1">
                  <p className="font-semibold text-slate-700 dark:text-slate-350">Identify status code columns:</p>
                  <ul className="list-none pl-0 space-y-1">
                    <li className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                      <span>Sending — Message queued and processing on carrier channels.</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                      <span>Sent / Delivered — Transmission successfully processed by the carrier.</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                      <span>Failed — Delivery aborted by network rules.</span>
                    </li>
                  </ul>
                </div>
              )
            },
            {
              title: 'Inspect Delivery Failures',
              desc: 'Select any Failed message to review the reported failure reason, such as an invalid mobile number or insufficient SMS credits.'
            }
          ].map((step, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[35px] top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#1F5AAE] text-white dark:bg-[#72A8FF] dark:text-[#07111F] text-[10px] font-black shadow-md transition-all duration-200 group-hover:scale-110">
                {idx + 1}
              </div>
              <h4 className="text-[14.5px] font-bold text-[#0B2E63] dark:text-white leading-none mb-2 group-hover:text-[#1F5AAE] dark:group-hover:text-[#72A8FF] transition-colors">
                {step.title}
              </h4>
              <div className="text-[13.5px] leading-relaxed text-[#5D7596] dark:text-slate-400">
                {typeof step.desc === 'string' ? <p>{step.desc}</p> : step.desc}
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      {/* Section D — Troubleshooting Tip */}
      <DocSection id="history-stuck-tip">
        <TipBox title="💡 TIP: Stuck Status Resolution">
          If a message remains in the Sending status for several minutes, refresh the page and check the log again. If the status still does not change, capture a screenshot of the affected log entry and contact support with the recipient's mobile number and the message timestamp.
        </TipBox>
      </DocSection>

      {/* Section E — Additional Best Practices */}
      <DocSection id="history-best-practices">
        <DocSectionHeading>Message History Best Practices</DocSectionHeading>
        <div className="grid gap-4 md:grid-cols-2">
          <TipBox title="💡 Status Inbound Updates">
            Outbound gateways sync message status updates periodically. If you notice a delay in updating logs, wait 5 minutes for carrier logs to synchronize status updates completely.
          </TipBox>
          <TipBox title="💡 Failures Cleanup">
            Filter history logs by "Failed" regularly. This allows your team to easily isolate and prune inactive or formatted incorrectly mobile numbers from your CRM list.
          </TipBox>
        </div>
      </DocSection>

      {/* Section F — Expected Outcome */}
      <DocSection id="history-expected-outcome">
        <SuccessBox title="Expected Outcome">
          A complete audit trail is available for every outbound SMS, including delivery status, timestamps, and SMS credit usage, allowing you to monitor message activity with confidence.
        </SuccessBox>
      </DocSection>

      {/* Section G — Closing + CTA */}
      <div className="border-t border-[#D7E7FA] pt-8 dark:border-[#183354]">
        <section aria-labelledby="closing-heading">
          <p className="text-[15px] font-medium leading-7 text-[#425B7D] dark:text-slate-300 max-w-[720px]">
            Ready to learn about credit refills and SMS segments? The next section will cover account wallet configuration and SMS credits management.
          </p>

          {/* Next Page CTA */}
          <Link
            to="/docs/sms-credits"
            id="history-next-cta"
            className="group mt-6 inline-flex items-center gap-3 rounded-2xl border border-[#4F8EF7]/30 bg-gradient-to-r from-[#1F5AAE] to-[#3B7FE0] px-6 py-4 text-white shadow-lg shadow-[#184B8F]/20 transition-all duration-200 hover:shadow-xl hover:shadow-[#184B8F]/30 hover:opacity-95"
          >
            <span className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#B8D8FF]">
                Next guide
              </span>
              <span className="mt-0.5 text-[15px] font-black leading-tight">
                SMS Credits
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
