import React from 'react';
import { ImageIcon, Monitor, CheckCircle2, Clock3, XCircle, ArrowRight, ShieldCheck } from 'lucide-react';

interface ScreenshotPlaceholderProps {
  figure?: number;
  caption: string;
  note?: string;
  filename?: string;
  alt?: string;
  height?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'Application Preview' | 'Step Preview' | 'Feature Preview' | 'Result Preview';
  mode?: 'large' | 'medium' | 'comparison';
}

const heightMap: Record<NonNullable<ScreenshotPlaceholderProps['height']>, string> = {
  sm: 'min-h-[250px]',
  md: 'min-h-[340px]',
  lg: 'min-h-[430px]',
  xl: 'min-h-[520px]',
};

const ratioMap: Record<NonNullable<ScreenshotPlaceholderProps['mode']>, string> = {
  large: 'aspect-[16/9]',
  medium: 'aspect-[4/3]',
  comparison: 'min-h-[320px]',
};

const statusCards = [
  { label: 'Approved', icon: <CheckCircle2 className="h-4 w-4" />, className: 'text-emerald-600 bg-emerald-50 border-emerald-100 dark:bg-emerald-950/25 dark:border-emerald-900/40' },
  { label: 'Pending', icon: <Clock3 className="h-4 w-4" />, className: 'text-amber-600 bg-amber-50 border-amber-100 dark:bg-amber-950/25 dark:border-amber-900/40' },
  { label: 'Rejected', icon: <XCircle className="h-4 w-4" />, className: 'text-rose-600 bg-rose-50 border-rose-100 dark:bg-rose-950/25 dark:border-rose-900/40' },
];

/* NEW: Educational Mockup Sub-components */

// 1. Mobile Format Validation
const ContactFormatMockup: React.FC = () => (
  <div className="flex h-full flex-col p-4 sm:p-5 justify-center gap-4">
    <h4 className="text-[13px] font-black text-[#0F172A] dark:text-white uppercase tracking-wider">Philippine Number Formatting Check</h4>
    <div className="space-y-2">
      <div className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50/30 p-2.5 dark:border-red-950/20 dark:bg-red-950/5">
        <span className="font-mono text-xs text-red-700 dark:text-red-400 font-bold">+63 917 123 4567</span>
        <span className="text-[11px] font-semibold text-red-600 flex items-center gap-1"><XCircle className="h-3 w-3" /> Avoid country codes</span>
      </div>
      <div className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50/30 p-2.5 dark:border-red-950/20 dark:bg-red-950/5">
        <span className="font-mono text-xs text-red-700 dark:text-red-400 font-bold">0917-123-4567</span>
        <span className="text-[11px] font-semibold text-red-600 flex items-center gap-1"><XCircle className="h-3 w-3" /> Avoid hyphens/spaces</span>
      </div>
      <div className="flex items-center justify-between rounded-lg border border-emerald-250 bg-emerald-50/30 p-2.5 dark:border-emerald-950/20 dark:bg-emerald-950/5">
        <span className="font-mono text-xs text-emerald-800 dark:text-emerald-450 font-black">09171234567</span>
        <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Valid local format (11-digits)</span>
      </div>
    </div>
  </div>
);

// 2. Contacts List Mockup
const ContactsListMockup: React.FC = () => (
  <div className="flex h-full flex-col p-4 sm:p-5">
    <div className="flex justify-between items-center mb-3">
      <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">CRM Sync Contacts Database</span>
      <div className="h-5 w-32 rounded bg-[#F1F5F9] dark:bg-[#1E293B] text-[9px] text-[#334155] dark:text-[#CBD5E1] flex items-center justify-center font-bold">Search contacts...</div>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left text-[11px]">
        <thead>
          <tr className="border-b border-slate-100 text-slate-400 dark:border-slate-800">
            <th className="pb-1.5 font-extrabold uppercase tracking-wider">Contact Name</th>
            <th className="pb-1.5 font-extrabold uppercase tracking-wider">Mobile Number</th>
            <th className="pb-1.5 font-extrabold uppercase tracking-wider">CRM State</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100/50 dark:divide-slate-800/50 text-[#475569] dark:text-slate-300">
          <tr>
            <td className="py-1.5 font-bold">Maria Santos</td>
            <td className="py-1.5 font-mono">09171234567</td>
            <td className="py-1.5"><span className="rounded bg-emerald-50 text-emerald-650 px-1.5 py-0.5 text-[9px] font-bold dark:bg-emerald-950/20">Synced ✅</span></td>
          </tr>
          <tr>
            <td className="py-1.5 font-bold">Juan Dela Cruz</td>
            <td className="py-1.5 font-mono">09187654321</td>
            <td className="py-1.5"><span className="rounded bg-emerald-50 text-emerald-650 px-1.5 py-0.5 text-[9px] font-bold dark:bg-emerald-950/20">Synced ✅</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

// 3. Template Variables Interpolation
const TemplateInterpolationMockup: React.FC = () => (
  <div className="grid h-full gap-4 p-4 sm:p-5 sm:grid-cols-2 justify-center items-center">
    <div className="rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-900/30 dark:bg-slate-900">
      <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-2">Draft Template Input</span>
      <div className="rounded border border-[#E2E8F0] p-2.5 font-mono text-[11.5px] text-[#475569] dark:border-[#334155] dark:bg-[#020617] min-h-[72px]">
        Hello <span className="text-[#334155] dark:text-[#CBD5E1] font-bold">{"{{contact.first_name}}"}</span>, your appointment is set for <span className="text-[#334155] dark:text-[#CBD5E1] font-bold">{"{{appointment.time}}"}</span>.
      </div>
    </div>
    <div className="flex flex-col items-center justify-center">
      <div className="w-8 h-8 rounded-full bg-[#F1F5F9] dark:bg-[#1E293B] flex items-center justify-center text-[#334155] dark:text-[#CBD5E1] mb-2 font-black">
        <ArrowRight className="h-4 w-4" />
      </div>
      <div className="rounded-xl border border-emerald-200 bg-white p-3.5 dark:border-emerald-900/30 dark:bg-slate-900 w-full">
        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider block mb-2">Dynamic Outgoing Result</span>
        <div className="rounded border border-[#E2E8F0] p-2.5 font-mono text-[11.5px] text-slate-800 dark:border-[#334155] dark:bg-[#020617] min-h-[72px] bg-slate-50/50">
          Hello <span className="text-emerald-700 font-bold dark:text-emerald-450">Maria</span>, your appointment is set for <span className="text-emerald-700 font-bold dark:text-emerald-450">Tuesday at 3 PM</span>.
        </div>
      </div>
    </div>
  </div>
);

// 4. Templates List Mockup
const TemplatesListMockup: React.FC = () => (
  <div className="flex h-full flex-col p-4 sm:p-5">
    <div className="flex justify-between items-center mb-3">
      <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Saved Message Templates</span>
      <div className="h-5 w-24 rounded bg-slate-500 text-white text-[9px] flex items-center justify-center font-bold cursor-pointer">+ New Template</div>
    </div>
    <div className="grid gap-3 grid-cols-2">
      <div className="rounded-lg border border-[#E2E8F0] p-3 dark:border-slate-850 bg-white dark:bg-slate-905">
        <h5 className="text-[12px] font-black text-[#0F172A] dark:text-white">Booking Confirm</h5>
        <p className="text-[10.5px] leading-relaxed text-[#64748B] dark:text-slate-400 mt-1 truncate">"Your appointment is set for Tuesday..."</p>
      </div>
      <div className="rounded-lg border border-[#E2E8F0] p-3 dark:border-slate-850 bg-white dark:bg-slate-905">
        <h5 className="text-[12px] font-black text-[#0F172A] dark:text-white">Payment Reminder</h5>
        <p className="text-[10.5px] leading-relaxed text-[#64748B] dark:text-slate-400 mt-1 truncate">"A friendly reminder that your balance..."</p>
      </div>
    </div>
  </div>
);

// 5. Sender ID Trust Comparison
const SenderTrustMockup: React.FC = () => (
  <div className="grid h-full gap-4 p-4 sm:p-5 sm:grid-cols-2 justify-center items-center">
    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#111827] flex flex-col items-center">
      <span className="text-[10px] font-black text-rose-650 uppercase tracking-wider mb-3">Unbranded SMS Outbox</span>
      <div className="w-[180px] rounded-3xl border-4 border-slate-350 p-2.5 dark:border-slate-700 bg-slate-50 dark:bg-[#020617]">
        <div className="mb-2 text-center text-[10px] font-black text-slate-450">+63 917 987 6543</div>
        <div className="rounded-2xl bg-white p-2.5 text-[11px] leading-relaxed text-[#475569] dark:bg-[#1E293B] dark:text-slate-350 shadow-sm">
          Please confirm your checkout with NOLA SMS Pro.
        </div>
      </div>
      <p className="mt-3 text-[11px] text-center text-slate-400 font-medium">Anonymous numbers raise spam flags and decrease open rates.</p>
    </div>
    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-900/35 dark:bg-[#111827] flex flex-col items-center shadow-sm shadow-[#334155]/3">
      <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider mb-3 flex items-center gap-1">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Branded SMS Outbox
      </span>
      <div className="w-[180px] rounded-3xl border-4 border-[#CBD5E1] p-2.5 dark:border-slate-700 bg-slate-50 dark:bg-[#020617]">
        <div className="mb-2 text-center text-[10px] font-black text-[#334155] dark:text-[#CBD5E1]">NOLASMSPro</div>
        <div className="rounded-2xl bg-[#F1F5F9] p-2.5 text-[11px] leading-relaxed text-[#0F172A] dark:bg-[#1E293B] dark:text-[#E2E8F0] shadow-sm">
          Please confirm your checkout with NOLA SMS Pro.
        </div>
      </div>
      <p className="mt-3 text-[11px] text-center text-slate-400 font-medium">Branded headers build trust and drive higher click rates.</p>
    </div>
  </div>
);

// 6. Sender ID Registry List
const SenderIdListMockup: React.FC = () => (
  <div className="flex h-full flex-col p-4 sm:p-5">
    <div className="flex justify-between items-center mb-3">
      <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Sender ID Registry</span>
      <span className="text-[10px] text-slate-400 font-bold">Standard Mask: NOLASMSPro</span>
    </div>
    <div className="space-y-2">
      <div className="flex justify-between items-center rounded-lg border border-slate-100 p-2.5 bg-white dark:border-slate-800 dark:bg-slate-905">
        <span className="text-xs font-black text-[#0F172A] dark:text-white">NOLASMSPro</span>
        <span className="rounded bg-slate-50 text-slate-650 px-1.5 py-0.5 text-[9px] font-black dark:bg-[#1E293B] dark:text-[#CBD5E1]">System Default</span>
      </div>
      <div className="flex justify-between items-center rounded-lg border border-slate-100 p-2.5 bg-white dark:border-slate-800 dark:bg-slate-905 shadow-sm shadow-[#334155]/3">
        <span className="text-xs font-black text-[#0F172A] dark:text-white">STORENAME</span>
        <span className="rounded bg-emerald-50 text-emerald-650 px-1.5 py-0.5 text-[9px] font-black dark:bg-emerald-950/20">Approved ✅</span>
      </div>
      <div className="flex justify-between items-center rounded-lg border border-slate-100 p-2.5 bg-white dark:border-slate-800 dark:bg-slate-905">
        <span className="text-xs font-black text-[#0F172A] dark:text-white">MYAGENCY</span>
        <span className="rounded bg-amber-50 text-amber-650 px-1.5 py-0.5 text-[9px] font-black dark:bg-amber-955/10">Pending 🕒</span>
      </div>
    </div>
  </div>
);

// 7. SMS Credit Calculation (GSM vs Unicode)
const CreditDeductionMockup: React.FC = () => (
  <div className="flex h-full flex-col p-4 sm:p-5 justify-center gap-4">
    <h4 className="text-[13px] font-black text-[#0F172A] dark:text-white uppercase tracking-wider">Credit Deduction Estimator</h4>
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-xl border border-[#E2E8F0] bg-white p-3 dark:border-[#1F2937] dark:bg-slate-900 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-black text-[#334155] dark:text-[#CBD5E1] uppercase tracking-wider">GSM Standard</span>
          <span className="rounded bg-[#F1F5F9] px-1.5 py-0.5 text-[9px] font-black text-[#334155] dark:bg-[#1E293B]">1 Credit</span>
        </div>
        <p className="text-xs font-mono text-[#64748B] leading-relaxed mb-2 dark:text-slate-400">"Your booking #123 is confirmed."</p>
        <span className="text-[9.5px] text-slate-400 font-bold block">31 characters • Standard GSM characters</span>
      </div>
      <div className="rounded-xl border border-amber-200 bg-amber-50/5 p-3 dark:border-amber-900/35 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-black text-amber-600 uppercase tracking-wider">Unicode Special</span>
          <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[9px] font-black text-amber-800 dark:bg-amber-950/20">2 Credits</span>
        </div>
        <p className="text-xs font-mono text-amber-700 leading-relaxed mb-2 dark:text-amber-400">"Your booking #123 is confirmed! 🕒"</p>
        <span className="text-[9.5px] text-amber-650 font-bold block">33 characters • 🕒 emoji shifts limit to Unicode</span>
      </div>
    </div>
  </div>
);

// 8. Message History List Mockup
const MessageHistoryListMockup: React.FC = () => (
  <div className="flex h-full flex-col p-4 sm:p-5">
    <div className="flex justify-between items-center mb-3">
      <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Real-time Outbound History Logs</span>
      <span className="text-[9px] rounded bg-[#F1F5F9] px-1.5 py-0.5 text-[#334155] dark:bg-[#1E293B] dark:text-[#CBD5E1] font-bold">Today</span>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left text-[11px]">
        <thead>
          <tr className="border-b border-slate-100 text-slate-400 dark:border-slate-800">
            <th className="pb-1.5 font-extrabold uppercase tracking-wider">Receiver</th>
            <th className="pb-1.5 font-extrabold uppercase tracking-wider">Sender</th>
            <th className="pb-1.5 font-extrabold uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100/50 dark:divide-slate-800/50 text-[#475569] dark:text-slate-300">
          <tr>
            <td className="py-1.5 font-mono">09171234567</td>
            <td className="py-1.5 font-bold">STORENAME</td>
            <td className="py-1.5"><span className="rounded bg-emerald-50 text-emerald-600 px-1.5 py-0.5 text-[9px] font-black dark:bg-emerald-950/20">Sent ✅</span></td>
          </tr>
          <tr>
            <td className="py-1.5 font-mono">09187654321</td>
            <td className="py-1.5 font-bold">NOLASMSPro</td>
            <td className="py-1.5"><span className="rounded bg-slate-550/10 text-slate-650 px-1.5 py-0.5 text-[9px] font-black dark:bg-[#1E293B] dark:text-[#CBD5E1]">Sending 🕒</span></td>
          </tr>
          <tr>
            <td className="py-1.5 font-mono">09223334444</td>
            <td className="py-1.5 font-bold">STORENAME</td>
            <td className="py-1.5"><span className="rounded bg-rose-50 text-rose-600 px-1.5 py-0.5 text-[9px] font-black dark:bg-rose-950/20">Failed ❌</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const AppMockup: React.FC<{ mode: NonNullable<ScreenshotPlaceholderProps['mode']>; filename?: string }> = ({ mode, filename = '' }) => {
  // Direct educational mock routing based on placeholders filenames
  if (filename.includes('contacts-add-contact')) {
    return <ContactFormatMockup />;
  }
  if (filename.includes('contacts-list')) {
    return <ContactsListMockup />;
  }
  if (filename.includes('templates-create-template')) {
    return <TemplateInterpolationMockup />;
  }
  if (filename.includes('templates-list')) {
    return <TemplatesListMockup />;
  }
  if (filename.includes('sender-id-default')) {
    return <SenderIdListMockup />;
  }
  if (filename.includes('sender-id') && (filename.includes('comparison') || filename.includes('statuses'))) {
    return <SenderTrustMockup />;
  }
  if (filename.includes('credits-history') || filename.includes('credits-balance') || filename.includes('credits-balance.png')) {
    return <CreditDeductionMockup />;
  }
  if (filename.includes('message-history-list') || filename.includes('message-history')) {
    return <MessageHistoryListMockup />;
  }

  if (mode === 'comparison') {
    return (
      <div className="grid h-full gap-3 p-3 sm:grid-cols-3 sm:p-4">
        {statusCards.map((card) => (
          <div key={card.label} className={`flex min-h-[170px] flex-col rounded-lg border p-4 ${card.className}`}>
            <div className="mb-4 flex items-center gap-2 text-sm font-bold">
              {card.icon}
              {card.label}
            </div>
            <div className="space-y-2">
              <div className="h-2.5 rounded bg-current opacity-20" />
              <div className="h-2.5 w-4/5 rounded bg-current opacity-15" />
              <div className="h-2.5 w-3/5 rounded bg-current opacity-15" />
            </div>
            <div className="mt-auto rounded-md border border-current/15 bg-white/65 px-3 py-2 text-[11px] font-semibold dark:bg-slate-950/35">
              Sender ID state
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid min-h-0 flex-1 grid-cols-[64px_1fr] sm:grid-cols-[108px_1fr]">
      <div className="border-r border-[#E2E8F0] bg-[#F8FAFC] p-2 sm:p-3 dark:border-[#1E293B] dark:bg-[#111827]">
        <div className="mb-4 h-3 w-12 rounded bg-[#334155]/25 dark:bg-[#CBD5E1]/25" />
        <div className="space-y-2">
          <div className="h-2 rounded bg-[#CFE2F7] dark:bg-[#1F2937]" />
          <div className="h-2 rounded bg-[#CFE2F7] dark:bg-[#1F2937]" />
          <div className="h-7 rounded bg-[#334155]/14 ring-1 ring-[#CBD5E1]/70 dark:bg-[#1E293B] dark:ring-[#475569]" />
          <div className="h-2 rounded bg-[#CFE2F7] dark:bg-[#1F2937]" />
          <div className="hidden h-2 rounded bg-[#CFE2F7] sm:block dark:bg-[#1F2937]" />
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-3 p-3 sm:p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="h-3 w-36 rounded bg-[#9CB5D4] dark:bg-[#475569]" />
            <div className="mt-2 h-2 w-56 max-w-full rounded bg-[#CFE2F7] dark:bg-[#1F2937]" />
          </div>
          <div className="h-8 w-16 flex-shrink-0 rounded-md bg-[#334155] dark:bg-[#CBD5E1] sm:w-24" />
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-3 dark:border-[#1E293B] dark:bg-[#020617]">
            <div className="h-2 w-12 rounded bg-[#CFE2F7] dark:bg-[#1F2937]" />
            <div className="mt-3 h-4 w-20 rounded bg-[#334155]/20 dark:bg-[#CBD5E1]/20" />
          </div>
          <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-3 dark:border-[#1E293B] dark:bg-[#020617]">
            <div className="h-2 w-10 rounded bg-[#CFE2F7] dark:bg-[#1F2937]" />
            <div className="mt-3 h-4 w-16 rounded bg-emerald-300/50 dark:bg-emerald-500/25" />
          </div>
          <div className="hidden rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-3 sm:block dark:border-[#1E293B] dark:bg-[#020617]">
            <div className="h-2 w-14 rounded bg-[#CFE2F7] dark:bg-[#1F2937]" />
            <div className="mt-3 h-4 w-20 rounded bg-amber-300/50 dark:bg-amber-500/25" />
          </div>
        </div>

        <div className="min-h-0 flex-1 rounded-lg border border-dashed border-[#475569]/55 bg-[#F1F5F9]/80 p-4 dark:bg-[#1E293B]/55">
          <div className="flex h-full min-h-28 flex-col items-center justify-center text-center">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#9CB5D4] shadow-sm dark:bg-[#020617] dark:text-[#475569]">
              <ImageIcon className="h-5 w-5" />
            </div>
            <p className="text-sm font-black text-[#0F172A] dark:text-slate-100">
              Interactive Preview Loading
            </p>
            <p className="mt-1 max-w-sm text-xs leading-relaxed text-[#64748B] dark:text-slate-400">
              A high-fidelity layout representing this operational component will load below.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ScreenshotPlaceholder: React.FC<ScreenshotPlaceholderProps> = ({
  figure,
  caption,
  note,
  alt,
  height = 'md',
  variant = 'Application Preview',
  mode = 'large',
  filename = '',
}) => {
  return (
    <figure
      className="group overflow-hidden rounded-2xl border border-[#CBD5E1] bg-white shadow-sm shadow-[#0F172A]/8 dark:border-[#334155] dark:bg-[#020617] dark:shadow-none"
      role="img"
      aria-label={alt ?? caption}
    >
      <div className="flex items-center justify-between gap-3 border-b border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 dark:border-[#1E293B] dark:bg-[#111827]">
        <div className="flex min-w-0 items-center gap-2">
          <Monitor className="h-4 w-4 flex-shrink-0 text-[#334155] dark:text-[#CBD5E1]" />
          <span className="truncate text-[10px] font-black uppercase tracking-[0.16em] text-[#475569] dark:text-slate-400">
            Educational Concept Mockup
          </span>
        </div>
        <div className="flex flex-shrink-0 items-center gap-2">
          <span className="hidden text-[9px] font-black uppercase tracking-[0.16em] text-[#94A3B8] dark:text-slate-500 sm:inline">
            {variant}
          </span>
          {figure !== undefined && (
            <span className="rounded-md bg-[#F1F5F9] px-2 py-1 text-[9px] font-black uppercase tracking-wider text-[#334155] dark:bg-[#1E293B] dark:text-[#E2E8F0]">
              Fig {figure}
            </span>
          )}
        </div>
      </div>

      <div className={`screenshot-frame flex ${heightMap[height]} ${ratioMap[mode]} p-4 sm:p-5`}>
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(232,243,255,0.95),rgba(255,255,255,0.55))] dark:bg-[linear-gradient(135deg,rgba(7,17,31,0.96),rgba(16,43,79,0.5))]" />
        <div className="relative mx-auto flex h-full w-full max-w-[1280px] flex-col overflow-hidden rounded-xl border border-white/85 bg-white shadow-lg shadow-[#0F172A]/12 dark:border-[#334155] dark:bg-[#020617] dark:shadow-none">
          <div className="flex h-8 flex-shrink-0 items-center gap-1.5 border-b border-[#E2E8F0] bg-[#F8FAFC] px-3 dark:border-[#1E293B] dark:bg-[#111827]">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
            <span className="ml-2 h-3 w-28 rounded bg-[#CFE2F7] dark:bg-[#1F2937]" />
          </div>
          <AppMockup mode={mode} filename={filename} />
        </div>
      </div>

      <figcaption className="border-t border-[#E2E8F0] px-4 py-3 dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#020617]/50">
        <p className="text-[13px] font-semibold leading-snug text-[#475569] dark:text-slate-300">
          {caption}
        </p>
        {note && (
          <p className="mt-1 text-[11px] text-[#94A3B8] dark:text-slate-500">
            {note}
          </p>
        )}
      </figcaption>
    </figure>
  );
};
