import React from 'react';
import type { DocPage } from '../../data/docsData';
import { DocSection } from './layout';
import { Link } from 'react-router-dom';
import {
  ArrowRight, CreditCard, Smartphone, CheckCircle2,
  AlertTriangle, CheckCheck
} from 'lucide-react';

interface Props { page: DocPage; }

const steps = [
  { title: 'Add a Test Contact', desc: 'Navigate to Contacts and select Add Contact. Save a test contact using your own mobile number.' },
  { title: 'Open Compose SMS', desc: 'Open Compose SMS from the left navigation.' },
  { title: 'Select Recipient', desc: 'Search for and select your test contact as the recipient.' },
  { title: 'Choose Sender ID', desc: 'Choose the default sender identity NOLASMSPro from the dropdown.' },
  { title: 'Draft a Natural Message', desc: 'Compose a full sentence, for example: "Hi, this is a delivery test from NOLA SMS Pro. No reply is required."' },
  { title: 'Review Character Count', desc: 'Check the character counter before sending. 1 standard SMS = 160 characters.' },
  { title: 'Click Send Once', desc: 'Dispatch the message. Do not click Send multiple times.' },
  { title: 'Verify Physical Delivery', desc: 'Confirm the SMS arrives on your physical mobile handset.' },
  { title: 'Audit Message History', desc: 'Open Message History and confirm the message status shows Sent or Delivered.' },
];

const deliveryStatuses = [
  { label: 'Sending', color: 'amber', dot: 'bg-amber-500', desc: 'Queued and processing on carrier channels.' },
  { label: 'Sent', color: 'blue', dot: 'bg-blue-500', desc: 'Transmitted to the carrier network.' },
  { label: 'Delivered', color: 'emerald', dot: 'bg-emerald-500', desc: 'Confirmed received on the recipient\'s handset.' },
  { label: 'Failed', color: 'rose', dot: 'bg-rose-500', desc: 'Delivery aborted. Check credits and number format.' },
];

export const SendFirstSMSContent: React.FC<Props> = ({ page }) => {
  return (
    <div className="w-full space-y-12 pb-10">



      {/* PRE-FLIGHT CHECKLIST */}
      <section id="send-preflight" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Pre-flight checklist</h2>
        <p className="text-[14.5px] leading-7 text-slate-700 dark:text-slate-300">
          Before launching campaign-level outreach, we recommend dispatching a single test SMS to a mobile device you control. This allows you to verify credits debiting, carrier aggregator speed, and GoHighLevel's native conversations sync under real conditions.
        </p>
        <p className="text-[14.5px] leading-7 text-slate-700 dark:text-slate-300">
          Please confirm that you have completed all of the following prerequisites before proceeding with your first test flight:
        </p>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/30 space-y-3">
          {[
            { icon: <CreditCard className="h-4 w-4" />, label: 'Available SMS credits', sub: 'New accounts receive 10 free trial credits upon registration' },
            { icon: <Smartphone className="h-4 w-4" />, label: 'Test contact with valid PH number', sub: 'Format: 09XXXXXXXXX — use your own number for testing' },
            { icon: <CheckCircle2 className="h-4 w-4" />, label: 'Active HighLevel connection', sub: 'API Connected badge visible in Settings' },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-3">
              <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                {item.icon}
              </div>
              <div>
                <p className="text-[14px] font-bold text-slate-900 dark:text-white leading-tight">{item.label}</p>
                <p className="text-[12.5px] text-slate-500 dark:text-slate-400 mt-0.5">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* OUTBOUND WARNING */}
      <section id="send-oneway-note">
        <div className="rounded-2xl border border-blue-200 dark:border-blue-900/40 border-l-4 border-l-blue-500 dark:border-l-blue-600 bg-gradient-to-br from-blue-50 to-sky-50/60 dark:from-[#060E1E] dark:to-[#0A1628] p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 text-blue-600 dark:text-blue-400 font-bold text-[15px] flex-shrink-0">ℹ</span>
            <p className="text-[13.5px] leading-relaxed text-slate-700 dark:text-blue-200">
              <strong>One-way messaging:</strong> Alphanumeric Sender IDs like NOLASMSPro support outbound routing only. Recipients cannot reply. Verify physical delivery directly by checking your handset.
            </p>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section id="send-steps" className="space-y-5">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Sending steps</h2>
        <div className="space-y-4">
          {steps.map((step, idx) => (
            <React.Fragment key={idx}>
              {/* Character reference after step 6 */}
              {idx === 6 && (
                <div className="rounded-2xl border border-slate-200 bg-slate-50/30 p-5 dark:border-slate-800 dark:bg-slate-900/10 my-1 space-y-3">
                  <p className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">Character segment reference</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { enc: 'GSM (Standard Latin)', chars: '160 chars = 1 credit', note: 'Letters, numbers, basic punctuation' },
                      { enc: 'Unicode (Emoji/Accented)', chars: '70 chars = 1 credit', note: 'Emojis reduce maximum segment limit' },
                    ].map((row) => (
                      <div key={row.enc} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#111827] shadow-sm">
                        <p className="text-[13.5px] font-black text-slate-900 dark:text-white leading-tight">{row.enc}</p>
                        <p className="text-[13px] font-bold text-blue-600 dark:text-blue-400 mt-1">{row.chars}</p>
                        <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-0.5">{row.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800/80 dark:bg-[#111827] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-400 dark:hover:border-slate-600 hover:shadow-md group">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200 text-[11px] font-black border border-slate-300 dark:border-slate-700 mt-0.5">
                  {idx + 1}
                </div>
                <div>
                  <p className="text-[15px] font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{step.title}</p>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-slate-500 dark:text-slate-400">{step.desc}</p>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* SPAM WARNING */}
      <section id="send-spam-warning">
        <div className="flex items-start gap-3.5 rounded-xl border border-amber-200 bg-amber-50/40 px-5 py-4 dark:border-amber-900/40 dark:bg-amber-950/10">
          <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600 dark:text-amber-400" />
          <div>
            <p className="text-[13.5px] font-black text-amber-800 dark:text-amber-300 uppercase tracking-wide mb-1">Avoid generic test keywords</p>
            <p className="text-[13px] leading-relaxed text-amber-700 dark:text-amber-400 font-medium">
              Carrier spam filters may block messages containing only "test", "sms", or "hello". Always send a natural, complete sentence. If delivery fails, do not click Send repeatedly — verify your credit balance and check connection settings.
            </p>
          </div>
        </div>
      </section>

      {/* DELIVERY STATUS LEGEND */}
      <section id="send-status-legend" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Delivery status legend</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {deliveryStatuses.map((status) => (
            <div key={status.label} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#111827]">
              <span className={`mt-1.5 h-2.5 w-2.5 rounded-full flex-shrink-0 ${status.dot}`} />
              <div>
                <p className="text-[13.5px] font-black text-slate-900 dark:text-white leading-tight">{status.label}</p>
                <p className="text-[12.5px] text-slate-500 dark:text-slate-400 mt-0.5">{status.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SUCCESS */}
      <section id="send-outcome">
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/40 px-5 py-4 dark:border-emerald-800/40 dark:bg-emerald-900/10">
          <CheckCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
          <div>
            <p className="text-[13.5px] font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-wide mb-0.5">Expected outcome</p>
            <p className="text-[13.5px] leading-relaxed text-emerald-700 dark:text-emerald-400 font-medium">
              Once your test SMS is received and Message History shows Delivered, your setup is complete and you're ready for normal messaging operations.
            </p>
          </div>
        </div>
      </section>


    </div>
  );
};
