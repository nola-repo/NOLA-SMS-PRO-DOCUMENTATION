import React from 'react';
import type { DocPage } from '../../data/docsData';
import { Link } from 'react-router-dom';
import {
  HelpCircle,
  MessageSquare,
  CreditCard,
  Wrench,
  CheckCheck,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface Props {
  page: DocPage;
}

const faqGroups = [
  {
    title: 'Credits & Billing',
    icon: <CreditCard className="h-5 w-5 text-amber-500" />,
    questions: [
      {
        q: 'How do character limits and SMS credit deductions work?',
        a: 'A standard GSM-7 SMS contains up to 160 characters. Messages containing emojis, accented letters, or special characters convert to Unicode, reducing the limit to 70 characters per segment. Exceeding character limits splits the message into multiple segments, consuming one credit per segment for each recipient.',
      },
      {
        q: 'How do free trial SMS credits work?',
        a: 'Each newly registered location receives 10 free trial SMS credits to test sending and confirm carrier delivery. Once trial credits exhaust, additional SMS credit packages can be purchased directly under Settings > Credits.',
      },
      {
        q: 'Are credits refunded if message delivery fails?',
        a: 'Yes. SMS credits are debited only upon successful carrier gateway handoffs. If a dispatch fails or is rejected by network filters, your balance is automatically refunded and logged in transaction history.',
      },
    ],
  },
  {
    title: 'Messaging & Delivery',
    icon: <MessageSquare className="h-5 w-5 text-blue-500" />,
    questions: [
      {
        q: 'Can recipients reply to my messages?',
        a: 'NOLA SMS Pro dispatches messages using alphanumeric sender identities (such as NOLASMSPro or approved custom Sender IDs). Because alphanumeric masks support outbound routing only, recipients cannot reply directly. Check physical handset delivery or message history status tags.',
      },
      {
        q: 'How long does Custom Sender ID approval take?',
        a: 'Custom Sender IDs require carrier verification from Philippine networks (Globe, Smart, DITO). The review process typically takes 2–5 business days, and status updates are sent via email.',
      },
      {
        q: 'What phone format should I use for contacts?',
        a: 'Use local 11-digit Philippine mobile formatting (e.g. 09XXXXXXXXX). The system validates local prefixes automatically upon contact creation and CSV import.',
      },
    ],
  },
  {
    title: 'Setup & Integration',
    icon: <Wrench className="h-5 w-5 text-emerald-500" />,
    questions: [
      {
        q: 'Can I set up multiple GoHighLevel sub-accounts?',
        a: 'Yes. NOLA SMS Pro supports multiple GoHighLevel sub-accounts. Each location installs the app independently via the GoHighLevel App Marketplace and registers its canonical owner profile.',
      },
      {
        q: 'Why are contacts or location details showing as null?',
        a: 'Ensure you have enabled "Pass contact/user info as query parameters" inside GoHighLevel Agency View -> Settings -> Custom Menu Links. This allows NOLA SMS Pro to parse location parameters dynamically.',
      },
    ],
  },
];

export const FAQContent: React.FC<Props> = ({ page }) => {
  return (
    <div className="w-full space-y-12 pb-10">

      {/* INTRO */}
      <section id="faq-intro" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">What this guide covers</h2>
        <p className="text-[14.5px] leading-7 text-slate-700 dark:text-slate-300">
          Find instant answers to common questions regarding SMS character segment limits, trial credits, sender identities, workflow automation, and GoHighLevel integration settings.
        </p>
      </section>

      {/* TOPIC GROUPS WITH INLINE Q&A */}
      <section id="faq-topic-groups">
        <div className="space-y-10">
          {faqGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-5">
              <div className="flex items-center gap-3 border-b border-slate-200 pb-3 dark:border-slate-800">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                  {group.icon}
                </div>
                <h3 className="text-[17px] font-black text-slate-900 dark:text-white uppercase tracking-wider">
                  {group.title}
                </h3>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {group.questions.map((qna, qIdx) => (
                  <div
                    key={qIdx}
                    className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#111827] shadow-sm flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200"
                  >
                    <div>
                      <div className="flex items-start gap-2.5 mb-3">
                        <HelpCircle className="h-4.5 w-4.5 flex-shrink-0 text-blue-500 mt-0.5" />
                        <h4 className="text-[14.5px] font-black text-slate-900 dark:text-white leading-snug">
                          {qna.q}
                        </h4>
                      </div>
                      <p className="text-[13px] leading-relaxed text-slate-600 dark:text-slate-400 pl-7">
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
              <p className="text-[13.5px] font-black text-blue-800 dark:text-blue-300 uppercase tracking-wide mb-1">
                Need more help?
              </p>
              <p className="text-[13.5px] leading-relaxed text-slate-700 dark:text-blue-200">
                Still have questions? If your question is not answered here, visit our{' '}
                <Link to="/docs/support-help" className="font-bold underline underline-offset-2 text-blue-700 dark:text-blue-300">
                  Support &amp; Help
                </Link>{' '}
                page to submit a support ticket directly to our development team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EXPECTED OUTCOME */}
      <section id="faq-expected-outcome">
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/40 px-5 py-4 dark:border-emerald-800/40 dark:bg-emerald-900/10">
          <CheckCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
          <div>
            <p className="text-[13.5px] font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-wide mb-0.5">Expected outcome</p>
            <p className="text-[13.5px] leading-relaxed text-emerald-700 dark:text-emerald-400 font-medium">
              Having an aligned understanding of billing rules and technical constraints prevents campaign delivery disruptions and accelerates onboarding.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
