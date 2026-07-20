import React from 'react';
import type { DocPage } from '../../data/docsData';
import { DocSection } from './layout';
import { Link } from 'react-router-dom';
import { ArrowRight, History, Lightbulb, CheckCheck, Filter } from 'lucide-react';

interface Props { page: DocPage; }

const statusLegend = [
  {
    badge: 'Sending',
    dot: 'bg-amber-500',
    desc: 'Message queued and processing on carrier channels. Wait a few minutes before rechecking.',
  },
  {
    badge: 'Sent',
    dot: 'bg-blue-500',
    desc: 'Transmitted to the carrier network. Awaiting handset confirmation.',
  },
  {
    badge: 'Delivered',
    dot: 'bg-emerald-500',
    desc: 'Confirmed received on the recipient\'s physical handset.',
  },
  {
    badge: 'Failed',
    dot: 'bg-rose-500',
    desc: 'Delivery aborted by network rules. Open the entry to view the failure reason.',
  },
];

const auditSteps = [
  { title: 'Open Message History', desc: 'Open Message History from the left navigation.' },
  { title: 'Review Log Fields', desc: 'Check Recipient, Timestamp, Sender ID, and Delivery Status for each entry.' },
  { title: 'Identify Status States', desc: 'Use the legend above to interpret each status badge.' },
  { title: 'Inspect Delivery Failures', desc: 'Select any Failed message to review the reported failure reason (invalid number, insufficient credits, etc.).' },
];

const filterTips = [
  { label: 'Filter by Failed', desc: 'Regularly prune invalid or incorrectly formatted numbers from your CRM.' },
  { label: 'Filter by Sending', desc: 'If status is stuck, wait 5 minutes then refresh. If unchanged, contact support.' },
  { label: 'Sort by Timestamp', desc: 'Use timestamp sorting to quickly locate recent delivery activity.' },
];

export const MessageHistoryContent: React.FC<Props> = ({ page }) => {
  return (
    <div className="w-full space-y-12 pb-10">



      {/* STATUS LEGEND — FIRST */}
      <section id="history-status-legend" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Delivery status reference</h2>
        <p className="text-[14.5px] leading-7 text-slate-700 dark:text-slate-300">Every message in your history shows one of the following statuses:</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {statusLegend.map((item) => (
            <div key={item.badge} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#111827] shadow-sm flex items-start gap-3">
              <span className={`mt-1.5 h-2.5 w-2.5 rounded-full flex-shrink-0 ${item.dot}`} />
              <div>
                <p className="text-[13.5px] font-black text-slate-900 dark:text-white uppercase tracking-wider mb-1">{item.badge}</p>
                <p className="text-[12.5px] leading-relaxed text-slate-500 dark:text-slate-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-blue-200 dark:border-blue-900/40 border-l-4 border-l-blue-500 dark:border-l-blue-600 bg-gradient-to-br from-blue-50 to-sky-50/60 dark:from-[#060E1E] dark:to-[#0A1628] p-6 shadow-sm mt-4">
          <div className="flex items-start gap-2.5">
            <Lightbulb className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
            <p className="text-[13.5px] leading-relaxed text-slate-700 dark:text-blue-205">
              Status updates sync periodically from carrier gateways. If logs show a delay, wait 5 minutes before rechecking.
            </p>
          </div>
        </div>
      </section>

      {/* PREREQUISITE */}
      <section id="history-prerequisite">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/30">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100/50 dark:border-slate-800 text-slate-600 dark:text-slate-400">
              <History className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[13.5px] font-black text-slate-900 dark:text-white">Queued or sent outbound SMS messages</p>
              <p className="text-[12.5px] leading-relaxed text-slate-500 dark:text-slate-400 mt-0.5">Message History only displays entries for messages that have been dispatched from your account.</p>
            </div>
          </div>
        </div>
      </section>

      {/* AUDIT STEPS */}
      <section id="history-audit-steps" className="space-y-5">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Auditing your message logs</h2>
        <div className="space-y-4">
          {auditSteps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800/80 dark:bg-[#111827] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-400 dark:hover:border-slate-600 hover:shadow-md group">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200 text-[11px] font-black border border-slate-300 dark:border-slate-700 mt-0.5">
                {idx + 1}
              </div>
              <div>
                <p className="text-[15px] font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{step.title}</p>
                <p className="mt-1 text-[13.5px] leading-relaxed text-slate-500 dark:text-slate-400">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FILTER TIPS */}
      <section id="history-filter-tips" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Filter &amp; management tips</h2>
        <div className="space-y-3">
          {filterTips.map((tip) => (
            <div key={tip.label} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#111827]">
              <Filter className="mt-0.5 h-4.5 w-4.5 flex-shrink-0 text-slate-500 dark:text-slate-400" />
              <div>
                <p className="text-[13.5px] font-black text-slate-900 dark:text-white leading-tight">{tip.label}</p>
                <p className="text-[12.5px] leading-relaxed text-slate-500 dark:text-slate-400 mt-1">{tip.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SUCCESS */}
      <section id="history-outcome">
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/40 px-5 py-4 dark:border-emerald-800/40 dark:bg-emerald-900/10">
          <CheckCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
          <p className="text-[13.5px] leading-relaxed text-emerald-700 dark:text-emerald-400 font-medium">
            A complete audit trail is available for every outbound SMS — including delivery status, timestamps, and credit usage — allowing you to monitor message activity with confidence.
          </p>
        </div>
      </section>


    </div>
  );
};
