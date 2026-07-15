import React from 'react';
import type { DocPage } from '../../data/docsData';
import { InfoBox, TipBox, WarningBox, SuccessBox } from '../Callouts';
import { DocSection, DocSectionHeading } from './layout';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText } from 'lucide-react';

interface Props {
  page: DocPage;
}

export const MessageTemplatesContent: React.FC<Props> = ({ page }) => {
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
      <DocSection id="templates-key-objective">
        <InfoBox title="Key Objective">
          Create, edit, and organize reusable message templates to streamline customer communications and reduce repetitive manual typing.
        </InfoBox>
      </DocSection>

      {/* Section B — Prerequisites */}
      <DocSection id="templates-prerequisites">
        <DocSectionHeading>Prerequisites</DocSectionHeading>
        <div className="rounded-2xl border border-[#D7E7FA] bg-[#F8FBFF] p-5 dark:border-[#183354] dark:bg-[#0B1627] flex items-start gap-4 max-w-[680px] shadow-sm shadow-[#184B8F]/3 hover:border-[#4F8EF7] transition-all duration-300">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#E8F3FF] text-[#1F5AAE] dark:bg-[#102B4F] dark:text-[#72A8FF]">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-[14px] font-black text-[#0B2E63] dark:text-white uppercase tracking-wider mb-1">Compliance Check</h4>
            <p className="text-[12.5px] leading-relaxed text-[#5D7596] dark:text-slate-400">
              Message templates should follow carrier compliance guidelines and use clear, natural language.
            </p>
          </div>
        </div>
      </DocSection>

      {/* Section C — Step-by-Step Template Creation */}
      <DocSection id="template-creation-stepper">
        <DocSectionHeading>Step-by-Step Template Creation</DocSectionHeading>
        
        <div className="relative pl-6 border-l-2 border-[#D7E7FA] dark:border-[#183354] ml-4 space-y-8 my-6">
          {[
            {
              title: 'Open Templates Panel',
              desc: 'Open Message Templates from the left navigation.'
            },
            {
              title: 'Create New Template',
              desc: 'Click Create Template.'
            },
            {
              title: 'Provide Naming & Category',
              desc: 'Enter a descriptive template name and choose a category.'
            },
            {
              title: 'Write Content Copy',
              desc: 'Write the message using clear, professional, and natural language.'
            },
            {
              title: 'Save Content Snippet',
              desc: 'Click Save Template.'
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

      {/* Section D — Step-by-Step Template Use */}
      <DocSection id="template-usage-stepper">
        <DocSectionHeading>Step-by-Step Template Use</DocSectionHeading>
        
        <div className="relative pl-6 border-l-2 border-[#D7E7FA] dark:border-[#183354] ml-4 space-y-8 my-6">
          {[
            {
              title: 'Open Selector in Composer',
              desc: 'While composing an SMS, open the Templates selector.'
            },
            {
              title: 'Browse & Query Templates',
              desc: 'Search for or browse your saved templates by category.'
            },
            {
              title: 'Insert Template Content',
              desc: 'Select a template to automatically insert its content into the message editor.'
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

      {/* Section E — Important Warning */}
      <DocSection id="templates-spam-warning">
        <WarningBox title="⚠️ IMPORTANT: Avoid Repetitive Spam Trigger Words">
          Use clear, natural, and meaningful language when creating templates. Avoid repetitive or generic phrases such as "test message" or "test SMS", as carrier spam filters may block messages that appear automated or repetitive.
        </WarningBox>
      </DocSection>

      {/* Section F — Best Practices */}
      <DocSection id="templates-best-practices">
        <DocSectionHeading>Template Best Practices</DocSectionHeading>
        <div className="grid gap-4 md:grid-cols-2">
          <TipBox title="💡 Dynamic CRM Placeholders">
            Make use of personalization variables (such as <code>{"{{contact.first_name}}"}</code>) when drafting templates. These fields will be resolved dynamically when loaded in the SMS composer, ensuring outbound personal touch.
          </TipBox>
          <TipBox title="💡 Folder Categorization">
            Organize templates into folders based on feature intent (e.g., Booking Confirmations, Support Followups, Refill Reminders) to help agents quickly discover the correct copywriting block.
          </TipBox>
        </div>
      </DocSection>

      {/* Section H — Expected Outcome */}
      <DocSection id="templates-expected-outcome">
        <SuccessBox title="Expected Outcome">
          Saved templates are immediately available from the template selector in Compose SMS, allowing messages to be drafted more efficiently and consistently.
        </SuccessBox>
      </DocSection>

      {/* Section I — Closing + CTA */}
      <div className="border-t border-[#D7E7FA] pt-8 dark:border-[#183354]">
        <section aria-labelledby="closing-heading">
          <p className="text-[15px] font-medium leading-7 text-[#425B7D] dark:text-slate-300 max-w-[720px]">
            Once you have set up message templates, you can explore sender masks to represent your business branding. The next guide will walk you through Sender IDs.
          </p>

          {/* Next Page CTA */}
          <Link
            to="/docs/sender-ids"
            id="templates-next-cta"
            className="group mt-6 inline-flex items-center gap-3 rounded-2xl border border-[#4F8EF7]/30 bg-gradient-to-r from-[#1F5AAE] to-[#3B7FE0] px-6 py-4 text-white shadow-lg shadow-[#184B8F]/20 transition-all duration-200 hover:shadow-xl hover:shadow-[#184B8F]/30 hover:opacity-95"
          >
            <span className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#B8D8FF]">
                Next guide
              </span>
              <span className="mt-0.5 text-[15px] font-black leading-tight">
                Sender IDs
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
