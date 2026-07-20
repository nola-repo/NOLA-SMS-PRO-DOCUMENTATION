import React from 'react';
import type { DocPage } from '../../data/docsData';
import { DocSection } from './layout';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Clock, Check, X, CheckCheck } from 'lucide-react';

interface Props { page: DocPage; }

const statusLifecycle = [
  { stage: 'Default', label: 'NOLASMSPro', desc: 'Pre-approved. Available immediately for all accounts.', color: 'emerald', available: true },
  { stage: 'Pending', label: 'Under Review', desc: 'Carrier verification in progress. Not yet selectable.', color: 'amber', available: false },
  { stage: 'Approved', label: 'Active', desc: 'Carrier approved. Appears in Sender ID dropdown.', color: 'blue', available: true },
  { stage: 'Rejected', label: 'Declined', desc: 'Carrier declined. Submit a new request with corrected details.', color: 'rose', available: false },
];

const formatRules = [
  { rule: 'Max length', value: '11 characters', note: 'Strict carrier limit — no exceptions' },
  { rule: 'Allowed characters', value: 'A–Z, 0–9', note: 'Alphanumeric only — no symbols or spaces' },
  { rule: 'Case sensitivity', value: 'Case preserved', note: 'Displayed exactly as submitted' },
  { rule: 'Spaces', value: 'Not allowed', note: 'Carriers reject names containing spaces' },
];

const steps = [
  { title: 'Open Sender IDs Menu', desc: 'Open Sender IDs from the left navigation.' },
  { title: 'Review System Default', desc: 'Review the default sender identity NOLASMSPro, which is immediately available.' },
  { title: 'Request Custom ID', desc: 'Click Request Custom Sender ID to submit a branded name (up to 11 alphanumeric characters).' },
  { title: 'Enter Verification Details', desc: 'Enter your Brand Name, Registered Business Name, and upload required verification documents.' },
  { title: 'Submit for Carrier Review', desc: 'Click Submit Request to send your application.' },
  { title: 'Monitor Request Status', desc: 'Track the request status — Pending, Approved, or Rejected — from the Sender IDs panel.' },
];

export const SenderIdsContent: React.FC<Props> = ({ page }) => {
  return (
    <div className="w-full space-y-12 pb-10">



      {/* STATUS LIFECYCLE STRIP */}
      <section id="sender-ids-lifecycle" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Sender ID status lifecycle</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statusLifecycle.map((item) => {
            const colorMap: Record<string, { bg: string; badge: string; text: string }> = {
              emerald: { bg: 'border-emerald-200 bg-[#E8F3FF]/10 dark:border-emerald-900/30 dark:bg-emerald-950/5', badge: 'bg-emerald-500', text: 'text-emerald-800 dark:text-emerald-300' },
              amber: { bg: 'border-amber-200 bg-[#E8F3FF]/10 dark:border-amber-900/30 dark:bg-amber-950/5', badge: 'bg-amber-400', text: 'text-amber-800 dark:text-amber-300' },
              blue: { bg: 'border-blue-200 bg-[#E8F3FF]/10 dark:border-blue-900/30 dark:bg-blue-950/5', badge: 'bg-blue-500', text: 'text-blue-800 dark:text-blue-300' },
              rose: { bg: 'border-rose-200 bg-[#E8F3FF]/10 dark:border-rose-900/30 dark:bg-rose-950/5', badge: 'bg-rose-500', text: 'text-rose-800 dark:text-rose-300' },
            };
            const c = colorMap[item.color];
            return (
              <div key={item.stage} className={`rounded-2xl border p-4 flex flex-col justify-between ${c.bg}`}>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[11px] font-black uppercase tracking-wider ${c.text}`}>{item.stage}</span>
                    <div className="flex items-center gap-1.5">
                      <span className={`h-2.5 w-2.5 rounded-full ${c.badge}`} />
                      {item.available
                        ? <Check className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400" />
                        : <X className="h-4.5 w-4.5 text-rose-500 dark:text-rose-400" />}
                    </div>
                  </div>
                  <p className={`text-[13.5px] font-black mb-1 ${c.text}`}>{item.label}</p>
                  <p className="text-[12.5px] leading-relaxed text-slate-500 dark:text-slate-400">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-2 text-[12.5px] text-slate-500 dark:text-slate-400 flex flex-wrap gap-x-4 gap-y-1">
          <span><Check className="inline h-3.5 w-3.5 text-emerald-500 mr-1" />Available in composer dropdown</span>
          <span><X className="inline h-3.5 w-3.5 text-rose-500 mr-1" />Not available for sending</span>
        </p>
      </section>

      {/* PREREQUISITE */}
      <section id="sender-ids-prerequisite">
        <div className="rounded-2xl border border-blue-200 dark:border-blue-900/40 border-l-4 border-l-blue-500 dark:border-l-blue-600 bg-gradient-to-br from-blue-50 to-sky-50/60 dark:from-[#060E1E] dark:to-[#0A1628] p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[13.5px] font-black text-slate-900 dark:text-white">Registration documentation required</p>
              <p className="text-[13.5px] leading-relaxed text-slate-700 dark:text-blue-200 mt-1">
                Active business registration details and supporting documents (SEC/DTI, BIR Certificate, or trademark authorization papers) matching your requested brand name must be uploaded on submission.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* REQUEST STEPS */}
      <section id="sender-ids-request-steps" className="space-y-5">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Request workflow</h2>
        <div className="space-y-4">
          {steps.map((step, idx) => (
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

      {/* FORMAT RULES TABLE */}
      <section id="sender-ids-format-rules" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Sender ID format rules</h2>
        <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-[#111827] border-b border-slate-200 dark:border-slate-800">
                {['Rule', 'Value', 'Note'].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-[11px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {formatRules.map((row, idx) => (
                <tr key={row.rule} className={`border-b border-slate-100 dark:border-slate-900/50 ${idx % 2 === 0 ? 'bg-white dark:bg-[#0c1220]/20' : 'bg-slate-50/20 dark:bg-slate-900/20'}`}>
                  <td className="px-5 py-3.5 text-[13.5px] font-bold text-slate-900 dark:text-white">{row.rule}</td>
                  <td className="px-5 py-3.5 text-[13px] font-mono font-semibold text-blue-600 dark:text-blue-400">{row.value}</td>
                  <td className="px-5 py-3.5 text-[12.5px] text-slate-500 dark:text-slate-400">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex items-start gap-2.5">
          <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" />
          <p className="text-[13.5px] leading-relaxed text-slate-500 dark:text-slate-400">
            Carrier review typically takes <strong>5–7 business days</strong> depending on participating network provider queues.
          </p>
        </div>
      </section>

      {/* SUCCESS */}
      <section id="sender-ids-outcome">
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/40 px-5 py-4 dark:border-emerald-800/40 dark:bg-emerald-900/10">
          <CheckCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
          <p className="text-[13.5px] leading-relaxed text-emerald-700 dark:text-emerald-400 font-medium">
            Once approved, your custom Sender ID becomes available as a selectable identity when composing outbound SMS messages.
          </p>
        </div>
      </section>


    </div>
  );
};
