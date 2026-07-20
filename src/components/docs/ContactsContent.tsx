import React from 'react';
import type { DocPage } from '../../data/docsData';
import { DocSection } from './layout';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, UserPlus, RefreshCw, Store, AlertTriangle, Lightbulb, CheckCheck } from 'lucide-react';

interface Props { page: DocPage; }

const lookupSteps = [
  { n: 1, title: 'Open Contacts Menu', desc: 'Click Contacts from the left navigation.' },
  { n: 2, title: 'Search Contacts', desc: 'Use the search bar to find contacts by Name or Phone Number.' },
  { n: 3, title: 'Select Recipient', desc: 'Select a contact from results to view messaging details and status.' },
];

const addSteps = [
  { n: 1, title: 'Click Add Contact', desc: 'Initiate contact creation from the Contacts section.' },
  { n: 2, title: 'Enter Name & Email', desc: "Enter the contact's full name and email address." },
  { n: 3, title: 'Enter Phone Number', desc: 'Enter a valid Philippine mobile number using the format 09XXXXXXXXX.' },
  { n: 4, title: 'Save Contact', desc: 'Click Save to write the new contact to your synced CRM.' },
];

const validationRules = [
  { field: 'Phone format', rule: '09XXXXXXXXX', note: 'No country code prefix, no hyphens or spaces' },
  { field: 'Hyphens', rule: 'Not allowed', note: 'e.g. 0912-345-6789 will fail validation' },
  { field: 'Country code', rule: 'Not allowed', note: 'e.g. +639... will fail validation' },
  { field: 'Digits', rule: '11 digits required', note: 'Must start with 09' },
];

export const ContactsContent: React.FC<Props> = ({ page }) => {
  return (
    <div className="w-full space-y-12 pb-10">



      {/* FEATURE OVERVIEW */}
      <section id="contacts-overview" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Contacts module overview</h2>
        <p className="text-[14.5px] leading-7 text-slate-700 dark:text-slate-300">
          The Contacts panel displays a real-time list of customer records synced directly from your HighLevel sub-account location. This allows you to select recipients instantly without manual database exports.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: <RefreshCw className="h-5 w-5" />, label: 'Auto-sync', desc: 'Contacts sync automatically from your active HighLevel location.' },
            { icon: <Search className="h-5 w-5" />, label: 'Searchable', desc: 'Find any contact by name or phone number instantly.' },
            { icon: <UserPlus className="h-5 w-5" />, label: 'Addable', desc: 'Create new contacts directly and sync back to your CRM.' },
          ].map((cap) => (
            <div key={cap.label} className="premium-card flex flex-col justify-between h-full">
              <div>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/50 text-slate-600 dark:text-slate-400">
                  {cap.icon}
                </div>
                <h3 className="text-[14px] font-black text-slate-900 dark:text-white uppercase tracking-wider mb-1.5">{cap.label}</h3>
                <p className="text-[12.5px] leading-relaxed text-slate-500 dark:text-slate-400">{cap.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PREREQUISITES */}
      <section id="contacts-prerequisites" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Prerequisites</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <Store className="h-4 w-4" />, label: 'Marketplace Install', detail: 'Successful installation and authorization of the NOLA SMS Pro app.' },
            { icon: <RefreshCw className="h-4 w-4" />, label: 'Active Integration', detail: 'Active HighLevel sub-account with API Connected status in Settings.' },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/30">
              <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100/50 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                {item.icon}
              </div>
              <div>
                <p className="text-[13.5px] font-black text-slate-900 dark:text-white">{item.label}</p>
                <p className="text-[12.5px] leading-relaxed text-slate-500 dark:text-slate-400 mt-0.5">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TWO-TRACK WORKFLOWS */}
      <section id="contacts-workflows" className="space-y-5">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Contact workflows</h2>
        <div className="grid gap-6 lg:grid-cols-2">

          {/* LOOK UP */}
          <div className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#111827] overflow-hidden">
            <div className="flex items-center gap-2.5 bg-slate-50/50 border-b border-slate-200 px-5 py-4 dark:bg-slate-900/30 dark:border-slate-800">
              <Search className="h-4 w-4 text-slate-500" />
              <p className="text-[13.5px] font-black text-slate-900 dark:text-white uppercase tracking-wider">Look up a contact</p>
            </div>
            <div className="p-5 space-y-4">
              {lookupSteps.map((step) => (
                <div key={step.n} className="flex gap-3">
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 text-[10px] font-black mt-0.5">
                    {step.n}
                  </span>
                  <div>
                    <p className="text-[13.5px] font-bold text-slate-900 dark:text-white leading-tight">{step.title}</p>
                    <p className="text-[12.5px] leading-relaxed text-slate-500 dark:text-slate-400 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ADD NEW */}
          <div className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#111827] overflow-hidden">
            <div className="flex items-center gap-2.5 bg-slate-50/50 border-b border-slate-200 px-5 py-4 dark:bg-slate-900/30 dark:border-slate-800">
              <UserPlus className="h-4 w-4 text-slate-500" />
              <p className="text-[13.5px] font-black text-slate-900 dark:text-white uppercase tracking-wider">Add a new contact</p>
            </div>
            <div className="p-5 space-y-4">
              {addSteps.map((step) => (
                <div key={step.n} className="flex gap-3">
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 text-[10px] font-black mt-0.5">
                    {step.n}
                  </span>
                  <div>
                    <p className="text-[13.5px] font-bold text-slate-900 dark:text-white leading-tight">{step.title}</p>
                    <p className="text-[12.5px] leading-relaxed text-slate-500 dark:text-slate-400 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VALIDATION REFERENCE TABLE */}
      <section id="contacts-validation" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Phone number validation rules</h2>
        <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-[#111827] border-b border-slate-200 dark:border-slate-800">
                <th className="px-5 py-3.5 text-[11px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider">Field</th>
                <th className="px-5 py-3.5 text-[11px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider">Rule</th>
                <th className="px-5 py-3.5 text-[11px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider hidden sm:table-cell">Note</th>
              </tr>
            </thead>
            <tbody>
              {validationRules.map((row, idx) => (
                <tr key={row.field} className={`border-b border-slate-100 dark:border-slate-900/50 ${idx % 2 === 0 ? 'bg-white dark:bg-[#0c1220]/20' : 'bg-slate-50/20 dark:bg-slate-900/20'}`}>
                  <td className="px-5 py-3.5 text-[13.5px] font-bold text-slate-900 dark:text-white">{row.field}</td>
                  <td className="px-5 py-3.5 text-[13px] font-mono font-semibold text-blue-600 dark:text-blue-400">{row.rule}</td>
                  <td className="px-5 py-3.5 text-[12.5px] text-slate-500 dark:text-slate-400 hidden sm:table-cell">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-2xl border border-blue-200 dark:border-blue-900/40 border-l-4 border-l-blue-500 dark:border-l-blue-600 bg-gradient-to-br from-blue-50 to-sky-50/60 dark:from-[#060E1E] dark:to-[#0A1628] p-6 shadow-sm space-y-3 mt-4">
          <div className="flex items-start gap-2.5">
            <Lightbulb className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
            <p className="text-[13.5px] leading-relaxed text-slate-700 dark:text-blue-205">
              Contacts sync automatically using the active location ID. Modify a contact in GoHighLevel and the update will reflect in NOLA SMS Pro within seconds.
            </p>
          </div>
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" />
            <p className="text-[13.5px] leading-relaxed text-slate-700 dark:text-blue-205">
              Ensure GHL Marketplace scopes include <code className="text-[12px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono text-slate-800 dark:text-slate-200">contacts.readonly</code> for real-time contact retrieval.
            </p>
          </div>
        </div>
      </section>

      {/* SUCCESS */}
      <section id="contacts-outcome">
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/40 px-5 py-4 dark:border-emerald-800/40 dark:bg-emerald-900/10">
          <CheckCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
          <p className="text-[13.5px] leading-relaxed text-emerald-700 dark:text-emerald-400 font-medium">
            Synchronized contacts are immediately available for searching, viewing, and selecting when composing new SMS messages.
          </p>
        </div>
      </section>


    </div>
  );
};
