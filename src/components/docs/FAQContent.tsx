import React from 'react';
import type { DocPage } from '../../data/docsData';
import { InfoBox, SuccessBox } from '../Callouts';
import { DocSection, DocSectionHeading } from './layout';
import { Accordion } from '../Accordion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface Props {
  page: DocPage;
}

export const FAQContent: React.FC<Props> = ({ page }) => {
  const faqItems = [
    {
      q: 'How do character limits and SMS credit deductions work?',
      a: 'A standard SMS contains up to 160 characters. Messages containing emojis, special characters, or non-standard characters reduce the available character count per segment. When a message exceeds the supported limit, it is automatically split into multiple SMS segments, consuming additional SMS credits for each recipient.'
    },
    {
      q: 'Can recipients reply to my messages?',
      a: 'NOLA SMS Pro sends messages using alphanumeric sender identities such as NOLASMSPro or approved custom Sender IDs. Because these sender identities support one-way outbound messaging, recipients cannot reply directly. To verify delivery, confirm that the SMS was received on the recipient\'s mobile device.'
    },
    {
      q: 'How long does Custom Sender ID approval take?',
      a: 'Custom Sender IDs require approval from participating telecommunications providers. The standard review process typically takes 5–7 business days, depending on carrier verification.'
    },
    {
      q: 'Can I set up multiple GoHighLevel sub-accounts?',
      a: 'Yes. NOLA SMS Pro supports multiple GoHighLevel locations. Each sub-account must be installed separately through the GoHighLevel Marketplace and configured independently.'
    },
    {
      q: 'How do trial SMS credits work?',
      a: 'Each newly registered location receives 10 free trial SMS credits. These credits can be used for initial testing. After the trial credits are exhausted, additional SMS credits must be purchased before sending more messages.'
    }
  ];

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
      <DocSection id="faq-key-objective">
        <InfoBox title="Key Objective">
          Quickly find answers to common questions about SMS credits, messaging limitations, Sender IDs, and platform usage.
        </InfoBox>
      </DocSection>

      {/* Section B — Accordion FAQ */}
      <DocSection id="faq-accordion-section">
        <DocSectionHeading>Frequently Asked Questions</DocSectionHeading>
        <div className="my-6">
          <Accordion items={faqItems} />
        </div>
      </DocSection>

      {/* Section C — Need More Help? */}
      <DocSection id="faq-need-more-help">
        <SuccessBox title="💡 Need More Help?">
          Still have questions? If your issue is not covered here, visit the Support & Help page to submit a support ticket and receive assistance from the NOLA SMS Pro team.
        </SuccessBox>
      </DocSection>

      {/* Section D — Closing + CTA */}
      <div className="border-t border-[#D7E7FA] pt-8 dark:border-[#183354]">
        <section aria-labelledby="closing-heading">
          <p className="text-[15px] font-medium leading-7 text-[#425B7D] dark:text-slate-300 max-w-[720px]">
            Need to open a support ticket? Click the link below to submit a help request ticket to our development team.
          </p>

          {/* Next Page CTA */}
          <Link
            to="/docs/support-help"
            id="faq-next-cta"
            className="group mt-6 inline-flex items-center gap-3 rounded-2xl border border-[#4F8EF7]/30 bg-gradient-to-r from-[#1F5AAE] to-[#3B7FE0] px-6 py-4 text-white shadow-lg shadow-[#184B8F]/20 transition-all duration-200 hover:shadow-xl hover:shadow-[#184B8F]/30 hover:opacity-95"
          >
            <span className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#B8D8FF]">
                Next guide
              </span>
              <span className="mt-0.5 text-[15px] font-black leading-tight">
                Support &amp; Help
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
