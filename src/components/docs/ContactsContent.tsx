import React from 'react';
import type { DocPage } from '../../data/docsData';
import { InfoBox, TipBox, WarningBox, SuccessBox } from '../Callouts';
import { DocSection, DocSectionHeading } from './layout';
import { Link } from 'react-router-dom';
import { ArrowRight, Store, RefreshCw } from 'lucide-react';

interface Props {
  page: DocPage;
}

export const ContactsContent: React.FC<Props> = ({ page }) => {
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
      <DocSection id="contacts-key-objective">
        <InfoBox title="Key Objective">
          Find and manage customer contacts synchronized directly from your GoHighLevel sub-account database.
        </InfoBox>
      </DocSection>

      {/* Section B — Prerequisites */}
      <DocSection id="contacts-prerequisites">
        <DocSectionHeading>Prerequisites</DocSectionHeading>
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Item 1: Marketplace Installation */}
          <div className="flex items-start gap-4 rounded-2xl border border-[#D7E7FA] bg-[#F8FBFF] p-5 dark:border-[#183354] dark:bg-[#0B1627] shadow-sm shadow-[#184B8F]/3 hover:border-[#4F8EF7] transition-all duration-300">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#E8F3FF] text-[#1F5AAE] dark:bg-[#102B4F] dark:text-[#72A8FF]">
              <Store className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-[14px] font-black text-[#0B2E63] dark:text-white uppercase tracking-wider mb-1">Marketplace Install</h4>
              <p className="text-[12.5px] leading-relaxed text-[#5D7596] dark:text-slate-400">
                Successful Marketplace installation and authorization of the NOLA SMS Pro application in your sub-account.
              </p>
            </div>
          </div>
          
          {/* Item 2: Active integration */}
          <div className="flex items-start gap-4 rounded-2xl border border-[#D7E7FA] bg-[#F8FBFF] p-5 dark:border-[#183354] dark:bg-[#0B1627] shadow-sm shadow-[#184B8F]/3 hover:border-[#4F8EF7] transition-all duration-300">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#E8F3FF] text-[#1F5AAE] dark:bg-[#102B4F] dark:text-[#72A8FF]">
              <RefreshCw className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-[14px] font-black text-[#0B2E63] dark:text-white uppercase tracking-wider mb-1">Active Integration</h4>
              <p className="text-[12.5px] leading-relaxed text-[#5D7596] dark:text-slate-400">
                An active GoHighLevel sub-account connection with real-time bi-directional database synchronization enabled.
              </p>
            </div>
          </div>
        </div>
      </DocSection>

      {/* Section C — Step-by-Step Contact Look-up */}
      <DocSection id="contact-lookup-stepper">
        <DocSectionHeading>Step-by-Step Contact Look-up</DocSectionHeading>
        
        <div className="relative pl-6 border-l-2 border-[#D7E7FA] dark:border-[#183354] ml-4 space-y-8 my-6">
          {[
            {
              title: 'Open Contacts Menu',
              desc: 'Click the Contacts menu from the left navigation.'
            },
            {
              title: 'Search Contacts Database',
              desc: 'Use the search bar to find contacts by Name or Phone Number.'
            },
            {
              title: 'Select Recipient Details',
              desc: 'Select a contact from the results to view its messaging details and status.'
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

      {/* Section D — Step-by-Step Adding a New Contact */}
      <DocSection id="add-contact-stepper">
        <DocSectionHeading>Step-by-Step Adding a New Contact</DocSectionHeading>
        
        <div className="relative pl-6 border-l-2 border-[#D7E7FA] dark:border-[#183354] ml-4 space-y-8 my-6">
          {[
            {
              title: 'Initiate Contact Creation',
              desc: 'Click Add Contact.'
            },
            {
              title: 'Enter Basic Info',
              desc: "Enter the contact's Name and Email Address."
            },
            {
              title: 'Format Phone Number',
              desc: 'Enter a valid Philippine mobile number using the format 09XXXXXXXXX.'
            },
            {
              title: 'Save to Synced CRM',
              desc: 'Click Save.'
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

      {/* Section E — Best Practices & Validation warnings */}
      <DocSection id="contacts-best-practices">
        <DocSectionHeading>Best Practices & Validation Rules</DocSectionHeading>
        <div className="grid gap-4 md:grid-cols-2">
          <TipBox title="💡 Background Synchronization">
            Contacts are synced automatically in the background using the active location ID. Delete or modify a contact inside GoHighLevel to see updates synced to your NOLA contact index.
          </TipBox>
          <WarningBox title="⚠️ Validation Scopes">
            Ensure the GHL marketplace scopes include <code>contacts.readonly</code> for real-time contact retrieval. Numbers with invalid formatting (e.g. including hyphens or country codes) might fail validation rules.
          </WarningBox>
        </div>
      </DocSection>

      {/* Section F — Expected Outcome */}
      <DocSection id="contacts-expected-outcome">
        <SuccessBox title="Expected Outcome">
          Synchronized contacts are immediately available for searching, viewing, and selecting when composing new SMS messages.
        </SuccessBox>
      </DocSection>

      {/* Section G — Closing + CTA */}
      <div className="border-t border-[#D7E7FA] pt-8 dark:border-[#183354]">
        <section aria-labelledby="closing-heading">
          <p className="text-[15px] font-medium leading-7 text-[#425B7D] dark:text-slate-350 max-w-[720px]">
            Once your contacts database is synced, you are ready to compose, customize, and transmit outbound messages. The next guide will walk you through the Compose SMS panel features.
          </p>

          {/* Next Page CTA */}
          <Link
            to="/docs/compose-sms"
            id="contacts-next-cta"
            className="group mt-6 inline-flex items-center gap-3 rounded-2xl border border-[#4F8EF7]/30 bg-gradient-to-r from-[#1F5AAE] to-[#3B7FE0] px-6 py-4 text-white shadow-lg shadow-[#184B8F]/20 transition-all duration-200 hover:shadow-xl hover:shadow-[#184B8F]/30 hover:opacity-95"
          >
            <span className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#B8D8FF]">
                Next guide
              </span>
              <span className="mt-0.5 text-[15px] font-black leading-tight">
                Compose SMS
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
