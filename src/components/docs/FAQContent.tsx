import React from 'react';
import type { DocPage } from '../../data/docsData';
import { DocSection } from './layout';
import { Link } from 'react-router-dom';
import { HelpCircle, MessageSquare, CreditCard, Wrench, CheckCheck } from 'lucide-react';

interface Props {
  page: DocPage;
}

const faqGroups = [
  {
    title: 'Credits & Billing',
    icon: <CreditCard className="h-4 w-4" />,
    questions: [
      {
        q: 'How do character limits and SMS credit deductions work?',
        a: 'A standard SMS contains up to 160 characters. Messages containing emojis, special characters, or non-standard characters reduce the limit to 70 characters per segment. When a message exceeds the supported limit, it is split into multiple segments, consuming one credit per segment for each recipient.'
      },
      {
        q: 'How do trial SMS credits work?',
        a: 'Each newly registered location receives 10 free trial SMS credits to perform initial sending tests. After the trial credits are exhausted, additional SMS credit packages must be purchased before sending more messages.'
      }
    ]
  },
  {
    title: 'Messaging & Delivery',
    icon: <MessageSquare className="h-4 w-4" />,
    questions: [
      {
        q: 'Can recipients reply to my messages?',
        a: 'NOLA SMS Pro sends messages using alphanumeric sender identities (such as NOLASMSPro or approved custom Sender IDs). Because these sender identities support outbound messaging only, recipients cannot reply directly. To verify delivery, check the delivery confirmation status in Message History.'
      },
      {
        q: 'How long does Custom Sender ID approval take?',
        a: 'Custom Sender IDs require approval from telecom providers. The review process typically takes 5–7 business days depending on carrier verification.'
      }
    ]
  },
  {
    title: 'Setup & Configuration',
    icon: <Wrench className="h-4 w-4" />,
    questions: [
      {
        q: 'Can I set up multiple GoHighLevel sub-accounts?',
        a: 'Yes. NOLA SMS Pro supports multiple GoHighLevel locations. Each sub-account must be installed separately through the GoHighLevel App Marketplace and configured independently.'
      },
      {
        q: 'Why are contacts not syncing to my dashboard?',
        a: 'Ensure you have enabled the "Pass contact/user info as query parameters" toggle inside GoHighLevel Custom Menu Link settings. Mismatches prevent NOLA SMS Pro from identifying the sub-account context.'
      }
    ]
  }
];

export const FAQContent: React.FC<Props> = ({ page }) => {
  return (
    <div className="w-full space-y-12 pb-10">



      {/* INTRO */}
      <section id="faq-intro" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Common questions & answers</h2>
        <p className="text-[14.5px] leading-7 text-slate-700 dark:text-slate-300">
          Quickly find answers to common questions about SMS segments, credits, billing, sender identities, and platform configuration.
        </p>
      </section>

      {/* TOPIC GROUPS WITH INLINE Q&A */}
      <section id="faq-topic-groups">
        <div className="space-y-10">
          {faqGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-4">
              <div className="flex items-center gap-2.5 border-b border-slate-200 pb-3 dark:border-slate-800">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                  {group.icon}
                </div>
                <h3 className="text-[16px] font-black text-slate-900 dark:text-white uppercase tracking-wider">
                  {group.title}
                </h3>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {group.questions.map((qna, qIdx) => (
                  <div key={qIdx} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#111827] shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-start gap-2.5 mb-3">
                        <HelpCircle className="h-4 w-4 flex-shrink-0 text-slate-500 dark:text-slate-400 mt-0.5" />
                        <h4 className="text-[13.5px] font-black text-slate-900 dark:text-white leading-relaxed">
                          {qna.q}
                        </h4>
                      </div>
                      <p className="text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">
                        {qna.a}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEED MORE HELP */}
      <section id="faq-need-more-help">
        <div className="rounded-2xl border border-blue-200 dark:border-blue-900/40 border-l-4 border-l-blue-500 dark:border-l-blue-600 bg-gradient-to-br from-blue-50 to-sky-50/60 dark:from-[#060E1E] dark:to-[#0A1628] p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <HelpCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-[13.5px] font-black text-blue-800 dark:text-blue-300 uppercase tracking-wide mb-1">Need more help?</p>
              <p className="text-[13.5px] leading-relaxed text-slate-700 dark:text-blue-200">
                Still have questions? If your issue is not covered here, visit the{' '}
                <Link to="/docs/support-help" className="font-bold underline underline-offset-2 text-blue-700 dark:text-blue-300">Support &amp; Help</Link>{' '}
                page to submit a support ticket directly to our engineers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EXPECTED OUTCOME */}
      <section id="faq-expected-outcome">
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/40 px-5 py-4 dark:border-emerald-800/40 dark:bg-emerald-900/10">
          <CheckCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
          <p className="text-[13.5px] leading-relaxed text-emerald-700 dark:text-emerald-400 font-medium">
            Having an aligned understanding of billing rules and technical constraints prevents campaign delivery disruptions.
          </p>
        </div>
      </section>


    </div>
  );
};
