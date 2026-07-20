import React from 'react';
import type { DocPage } from '../../data/docsData';
import { DocSection } from './layout';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, CreditCard, ShieldCheck, AlertTriangle, CheckCheck } from 'lucide-react';

interface Props { page: DocPage; }

const composerFields = [
  { field: 'Recipients', desc: 'Search and select one or more contacts from your synced database.' },
  { field: 'Sender ID', desc: 'Choose NOLASMSPro (default) or an approved custom Sender ID.' },
  { field: 'Message body', desc: 'Write or paste your SMS content. Character counter shows live segment usage.' },
  { field: 'Templates', desc: 'Insert a previously saved template directly into the message editor.' },
  { field: 'Send button', desc: 'Click once to queue the message. Multi-click may cause duplicates.' },
];

const encodingTable = [
  { enc: 'GSM-7 (Standard)', limit: '160 chars', credits: '1 credit', examples: 'A–Z, 0–9, basic punctuation' },
  { enc: 'Unicode (Special)', limit: '70 chars', credits: '1 credit', examples: 'Emojis, accented letters, special symbols' },
  { enc: 'Multi-segment', limit: '> limit', credits: '1 per segment', examples: 'Longer messages split automatically' },
];

const steps = [
  { title: 'Open Compose SMS', desc: 'Select Compose SMS from the left navigation.' },
  { title: 'Select Recipients', desc: 'Search for and select one or more contacts as recipients.' },
  { title: 'Choose Sender ID', desc: 'Choose your sender identity from the available options.' },
  { title: 'Draft or Load Template', desc: 'Compose your SMS or insert a previously saved message template.' },
  { title: 'Review Segment Estimates', desc: 'Check the character counter and estimated SMS credit usage before sending.' },
  { title: 'Click Send Once', desc: 'Click Send once to queue the message for delivery.' },
];

export const ComposeSmsContent: React.FC<Props> = ({ page }) => {
  return (
    <div className="w-full space-y-12 pb-10">

      {/* COMPOSER FIELD REFERENCE */}
      <section id="compose-field-reference" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Composer field reference</h2>
        <p className="text-[14.5px] leading-7 text-slate-700 dark:text-slate-300">The Compose SMS panel has five key fields. Understand each before sending.</p>
        <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
          {composerFields.map((row, idx) => (
            <div
              key={row.field}
              className={`flex items-start gap-4 px-5 py-4 border-b last:border-b-0 border-slate-200 dark:border-slate-800 ${
                idx % 2 === 0 ? 'bg-white dark:bg-[#0c1220]/20' : 'bg-slate-50/20 dark:bg-slate-900/20'
              }`}
            >
              <span className="flex-shrink-0 w-[120px] text-[11px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider pt-0.5">{row.field}</span>
              <p className="text-[13.5px] leading-relaxed text-slate-500 dark:text-slate-400">{row.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PREREQUISITES */}
      <section id="compose-prerequisites" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Prerequisites</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { icon: <Users className="h-4 w-4" />, label: 'Synced Contacts', detail: 'Contact records must exist in your database.' },
            { icon: <CreditCard className="h-4 w-4" />, label: 'SMS Credits', detail: 'Sufficient credits to cover message segments.' },
            { icon: <ShieldCheck className="h-4 w-4" />, label: 'Sender Identity', detail: 'Active NOLASMSPro or approved custom Sender ID.' },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/30">
              <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100/50 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                {item.icon}
              </div>
              <div>
                <p className="text-[13.5px] font-black text-slate-900 dark:text-white">{item.label}</p>
                <p className="text-[12px] leading-relaxed text-slate-500 dark:text-slate-400 mt-0.5">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STEPS */}
      <section id="compose-steps" className="space-y-5">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Compose &amp; send</h2>
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

      {/* CHARACTER & ENCODING TABLE */}
      <section id="compose-encoding" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Character &amp; credit usage</h2>
        <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-[#111827] border-b border-slate-200 dark:border-slate-800">
                {['Encoding', 'Char Limit', 'Credits', 'When it applies'].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-[11px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {encodingTable.map((row, idx) => (
                <tr key={row.enc} className={`border-b border-slate-100 dark:border-slate-900/50 ${idx % 2 === 0 ? 'bg-white dark:bg-[#0c1220]/20' : 'bg-slate-50/20 dark:bg-slate-900/20'}`}>
                  <td className="px-5 py-3.5 text-[13.5px] font-bold text-slate-900 dark:text-white">{row.enc}</td>
                  <td className="px-5 py-3.5 text-[13px] font-mono font-semibold text-blue-600 dark:text-blue-400">{row.limit}</td>
                  <td className="px-5 py-3.5 text-[12.5px] text-slate-500 dark:text-slate-400">{row.credits}</td>
                  <td className="px-5 py-3.5 text-[12.5px] text-slate-500 dark:text-slate-400">{row.examples}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* DELIVERY WARNING */}
      <section id="compose-warning">
        <div className="flex items-start gap-3.5 rounded-xl border border-amber-200 bg-amber-50/40 px-5 py-4 dark:border-amber-900/40 dark:bg-amber-950/10">
          <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600 dark:text-amber-400" />
          <div>
            <p className="text-[13.5px] font-black text-amber-808 dark:text-amber-300 uppercase tracking-wide mb-1">Verify handset delivery</p>
            <p className="text-[13px] leading-relaxed text-amber-700 dark:text-amber-400 font-medium">
              Alphanumeric Sender IDs support one-way outbound messaging only. Recipients cannot reply. If a message status remains pending, do not click Send again — review your credit balance and check Message History first.
            </p>
          </div>
        </div>
      </section>

      {/* SUCCESS */}
      <section id="compose-outcome">
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/40 px-5 py-4 dark:border-emerald-800/40 dark:bg-emerald-900/10">
          <CheckCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
          <p className="text-[13.5px] leading-relaxed text-emerald-700 dark:text-emerald-400 font-medium">
            Outbound messages are successfully queued for delivery, SMS credits are deducted accordingly, and status logs can be monitored from Message History.
          </p>
        </div>
      </section>


    </div>
  );
};
