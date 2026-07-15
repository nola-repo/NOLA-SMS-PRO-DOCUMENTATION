import React from 'react';
import type { DocPage } from '../../data/docsData';
import { InfoBox, WarningBox, SuccessBox } from '../Callouts';
import { DocSection, DocSectionHeading } from './layout';
import { Link } from 'react-router-dom';
import { ArrowRight, UserCheck } from 'lucide-react';

interface Props {
  page: DocPage;
}

export const SmsCreditsContent: React.FC<Props> = ({ page }) => {
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
      <DocSection id="credits-key-objective">
        <InfoBox title="Key Objective">
          Monitor your available SMS credits, review credit transaction history, and purchase additional credit packages when needed.
        </InfoBox>
      </DocSection>

      {/* Section B — Prerequisites */}
      <DocSection id="credits-prerequisites">
        <DocSectionHeading>Prerequisites</DocSectionHeading>
        <div className="rounded-2xl border border-[#D7E7FA] bg-[#F8FBFF] p-5 dark:border-[#183354] dark:bg-[#0B1627] flex items-start gap-4 max-w-[680px] shadow-sm shadow-[#184B8F]/3 hover:border-[#4F8EF7] transition-all duration-300">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#E8F3FF] text-[#1F5AAE] dark:bg-[#102B4F] dark:text-[#72A8FF]">
            <UserCheck className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-[14px] font-black text-[#0B2E63] dark:text-white uppercase tracking-wider mb-1">Owner Account</h4>
            <p className="text-[12.5px] leading-relaxed text-[#5D7596] dark:text-slate-400">
              Active owner account login is required to access billing and credits settings.
            </p>
          </div>
        </div>
      </DocSection>

      {/* Section C — Step-by-Step Credit Monitoring */}
      <DocSection id="credit-monitoring-stepper">
        <DocSectionHeading>Step-by-Step Credit Monitoring</DocSectionHeading>
        
        <div className="relative pl-6 border-l-2 border-[#D7E7FA] dark:border-[#183354] ml-4 space-y-8 my-6">
          {[
            {
              title: 'Open Credits Menu',
              desc: 'Open SMS Credits from the left navigation.'
            },
            {
              title: 'Review Balance Card',
              desc: 'Review the main balance card to see your total available credits, including any remaining free trial credits.'
            },
            {
              title: 'Analyze Usage Charts',
              desc: 'View the usage charts to monitor SMS credit consumption for Today, This Week, and This Month.'
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

      {/* Section D — Step-by-Step Purchasing Credits */}
      <DocSection id="purchasing-credits-stepper">
        <DocSectionHeading>Step-by-Step Purchasing Credits</DocSectionHeading>
        
        <div className="relative pl-6 border-l-2 border-[#D7E7FA] dark:border-[#183354] ml-4 space-y-8 my-6">
          {[
            {
              title: 'Navigate to Purchase Area',
              desc: 'Navigate to the purchase section within SMS Credits.'
            },
            {
              title: 'Select Credit Package',
              desc: 'Select one of the available credit packages (for example: 10, 500, 1,100, 2,750, or 6,000 credits).'
            },
            {
              title: 'Open Secure Checkout',
              desc: 'Click Checkout to open the secure payment gateway.'
            },
            {
              title: 'Complete Authentication & Payment',
              desc: 'Complete the payment process and wait to be redirected back to NOLA SMS Pro.'
            },
            {
              title: 'Verify Wallet Balance',
              desc: 'Verify that your updated SMS credit balance is reflected on the dashboard.'
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

      {/* Section E — Step-by-Step Auditing Transactions */}
      <DocSection id="auditing-transactions-stepper">
        <DocSectionHeading>Step-by-Step Auditing Transactions</DocSectionHeading>
        
        <div className="relative pl-6 border-l-2 border-[#D7E7FA] dark:border-[#183354] ml-4 space-y-8 my-6">
          {[
            {
              title: 'Scroll to History Ledger',
              desc: 'Scroll to the Credit History section.'
            },
            {
              title: 'Review Audit Details',
              desc: 'Review each transaction, including the Timestamp, Credit Adjustment, Reference, and Description (such as a package purchase or SMS credit deduction).'
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

      {/* Section F — Important Callout */}
      <DocSection id="credits-consumption-warning">
        <WarningBox title="⚠️ IMPORTANT: Credit Consumption Rule">
          A standard SMS containing up to 160 characters consumes 1 SMS credit. Messages that include emojis, special characters, or exceed the standard character limit may be divided into multiple SMS segments, consuming additional credits for each recipient.
        </WarningBox>
      </DocSection>

      {/* Section G — Expected Outcome */}
      <DocSection id="credits-expected-outcome">
        <SuccessBox title="Expected Outcome">
          Your SMS credit balance accurately reflects purchases and usage, ensuring uninterrupted outbound messaging.
        </SuccessBox>
      </DocSection>

      {/* Section H — Closing + CTA */}
      <div className="border-t border-[#D7E7FA] pt-8 dark:border-[#183354]">
        <section aria-labelledby="closing-heading">
          <p className="text-[15px] font-medium leading-7 text-[#425B7D] dark:text-slate-300 max-w-[720px]">
            Ready to configure low-credit alerts or notification settings? The next guide will walk you through settings panel rules.
          </p>

          {/* Next Page CTA */}
          <Link
            to="/docs/settings"
            id="credits-next-cta"
            className="group mt-6 inline-flex items-center gap-3 rounded-2xl border border-[#4F8EF7]/30 bg-gradient-to-r from-[#1F5AAE] to-[#3B7FE0] px-6 py-4 text-white shadow-lg shadow-[#184B8F]/20 transition-all duration-200 hover:shadow-xl hover:shadow-[#184B8F]/30 hover:opacity-95"
          >
            <span className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#B8D8FF]">
                Next guide
              </span>
              <span className="mt-0.5 text-[15px] font-black leading-tight">
                Settings
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
