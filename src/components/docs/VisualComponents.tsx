import React from 'react';
import {
  Smartphone,
  ArrowRightLeft,
  Terminal
} from 'lucide-react';

export const IntegrationFlow: React.FC = () => (
  <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 dark:border-[#1E293B] dark:bg-[#111827] flex flex-col items-center justify-center gap-4 text-center">
    <div className="flex flex-wrap items-center justify-center gap-3 w-full">
      <div className="rounded-xl border border-[#CBD5E1] bg-white px-4 py-3 dark:border-[#334155] dark:bg-[#020617] text-xs font-bold text-[#0F172A] dark:text-white shadow-sm flex flex-col items-center gap-1.5 min-w-[125px]">
        <Smartphone className="h-4 w-4 text-[#334155] dark:text-[#CBD5E1]" />
        <span>HighLevel CRM</span>
        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Sub-Account</span>
      </div>
      <ArrowRightLeft className="h-4 w-4 text-[#94A3B8]" />
      <div className="rounded-xl border border-slate-400 bg-slate-50/50 px-5 py-4 dark:border-slate-900/40 dark:bg-slate-950/20 text-sm font-black text-[#334155] dark:text-[#CBD5E1] shadow-md shadow-slate-500/5 flex flex-col items-center gap-2 min-w-[170px]">
        <div className="w-8 h-8 rounded-lg bg-[#334155] flex items-center justify-center text-white font-extrabold text-[12px] dark:bg-[#CBD5E1] dark:text-[#020617]">
          N
        </div>
        <span>NOLA SMS Pro</span>
        <span className="text-[10px] text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider">Embedded App</span>
      </div>
      <ArrowRightLeft className="h-4 w-4 text-[#94A3B8]" />
      <div className="rounded-xl border border-emerald-300 bg-white px-4 py-3 dark:border-emerald-900/35 dark:bg-[#020617] text-xs font-bold text-[#0F172A] dark:text-white shadow-sm flex flex-col items-center gap-1.5 min-w-[125px]">
        <Terminal className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        <span>Carriers (SMS)</span>
        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Carrier Gateway</span>
      </div>
    </div>
    <p className="text-[12px] text-[#64748B] dark:text-slate-400 max-w-md leading-relaxed mt-2">
      Direct connection maps your CRM contacts, registers custom Sender IDs, and debits credits, synchronizing outbound message status logs inside your sub-account.
    </p>
  </div>
);

export const ModuleEcosystem: React.FC = () => (
  <div className="rounded-2xl border border-slate-200/50 bg-[#F8FAFC] p-6 dark:border-slate-900/25 dark:bg-[#111827] flex flex-col justify-center gap-4 text-center">
    <span className="text-[10px] font-black text-[#334155] dark:text-[#CBD5E1] uppercase tracking-widest block">Module Ecosystem Map</span>
    <div className="grid gap-3 grid-cols-2 md:grid-cols-5 text-[11px] font-bold text-slate-800 dark:text-slate-200">
      <div className="rounded-xl bg-white border border-[#E2E8F0] p-3 dark:bg-[#020617] dark:border-slate-800 flex flex-col items-center gap-1.5 shadow-sm">
        <span className="text-[#334155] dark:text-[#CBD5E1]">1. Contacts</span>
        <span className="text-[9px] text-slate-400 dark:text-slate-500 font-medium font-mono">Audience Source</span>
      </div>
      <div className="rounded-xl bg-white border border-[#E2E8F0] p-3 dark:bg-[#020617] dark:border-slate-800 flex flex-col items-center gap-1.5 shadow-sm">
        <span className="text-[#334155] dark:text-[#CBD5E1]">2. Templates</span>
        <span className="text-[9px] text-slate-400 dark:text-slate-500 font-medium font-mono">Consistent Copy</span>
      </div>
      <div className="rounded-xl bg-white border border-[#E2E8F0] p-3 dark:bg-[#020617] dark:border-slate-800 flex flex-col items-center gap-1.5 shadow-sm">
        <span className="text-[#334155] dark:text-[#CBD5E1]">3. Sender IDs</span>
        <span className="text-[9px] text-slate-400 dark:text-slate-500 font-medium font-mono">Branded Mask</span>
      </div>
      <div className="rounded-xl bg-white border border-[#E2E8F0] p-3 dark:bg-[#020617] dark:border-slate-800 flex flex-col items-center gap-1.5 shadow-sm">
        <span className="text-[#334155] dark:text-[#CBD5E1]">4. SMS Credits</span>
        <span className="text-[9px] text-slate-400 dark:text-slate-500 font-medium font-mono">Gateway Fuel</span>
      </div>
      <div className="rounded-xl bg-white border border-[#E2E8F0] p-3 dark:bg-[#020617] dark:border-slate-800 flex flex-col items-center gap-1.5 shadow-sm col-span-2 md:col-span-1">
        <span className="text-[#334155] dark:text-[#CBD5E1]">5. History</span>
        <span className="text-[9px] text-slate-400 dark:text-slate-500 font-medium font-mono">Real-time Logs</span>
      </div>
    </div>
    <p className="text-[11.5px] text-[#64748B] dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
      Contacts provide local keys &rarr; Templates apply copy layouts &rarr; Senders mask outgoing blocks &rarr; Credits settle carrier routing &rarr; History logs the final receipt records.
    </p>
  </div>
);

export const ProblemsSolved: React.FC = () => (
  <div className="grid gap-3 sm:grid-cols-3 my-4">
    <div className="rounded-xl border border-red-100 bg-red-50/5 p-4 dark:border-red-950/20 dark:bg-red-950/5">
      <h4 className="text-[12px] font-black text-red-700 dark:text-red-400 uppercase tracking-wider mb-1.5">Tab Fatigue</h4>
      <p className="text-[12px] leading-5 text-[#64748B] dark:text-slate-400">Eliminates switching between CRM databases, contact spreadsheets, and separate SMS billing portals.</p>
    </div>
    <div className="rounded-xl border border-red-100 bg-red-50/5 p-4 dark:border-red-950/20 dark:bg-red-950/5">
      <h4 className="text-[12px] font-black text-red-700 dark:text-red-400 uppercase tracking-wider mb-1.5">Carrier Rejections</h4>
      <p className="text-[12px] leading-5 text-[#64748B] dark:text-slate-400">Halts address blocks by enforcing compliant local 11-digit prefixes (`09xxxxxxxx`) natively on CRM sync.</p>
    </div>
    <div className="rounded-xl border border-red-100 bg-red-50/5 p-4 dark:border-red-950/20 dark:bg-red-950/5">
      <h4 className="text-[12px] font-black text-red-700 dark:text-red-400 uppercase tracking-wider mb-1.5">Anonymity Blocks</h4>
      <p className="text-[12px] leading-5 text-[#64748B] dark:text-slate-400">Replaces suspicious random number masks with verified, carrier-registered Sender IDs that customers trust.</p>
    </div>
  </div>
);

export const TargetPersonas: React.FC = () => (
  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mt-4 mb-4">
    {[
      { role: 'Agencies', desc: 'Deploy secure, local communication spaces across customer sub-accounts.' },
      { role: 'Support Desks', desc: 'Reply to client inquiries instantly directly next to CRM conversation threads.' },
      { role: 'Marketing Ops', desc: 'Schedule consistent promotional announcements using template copies.' },
      { role: 'Sales Teams', desc: 'Accelerate follow-ups with inline contact validation and credit balance indicators.' },
    ].map((item) => (
      <div key={item.role} className="rounded-xl border border-[#E2E8F0] bg-white p-4 dark:border-[#1E293B] dark:bg-[#111827] shadow-sm shadow-[#0F172A]/2">
        <h4 className="text-[13px] font-black text-[#0F172A] dark:text-white mb-1">{item.role}</h4>
        <p className="text-[12px] leading-5 text-[#64748B] dark:text-slate-400">{item.desc}</p>
      </div>
    ))}
  </div>
);
