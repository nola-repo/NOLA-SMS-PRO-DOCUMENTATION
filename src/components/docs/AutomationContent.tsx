import React from 'react';
import type { DocPage } from '../../data/docsData';
import {
  Zap,
  Play,
  Variable,
  Lightbulb,
  CheckCheck,
  ArrowRight,
  Monitor,
  CheckCircle2,
  PlusCircle,
  MessageSquare,
  Send,
  ShieldCheck,
} from 'lucide-react';

interface Props {
  page: DocPage;
}

/* ─── Blank Screenshot Frame for Step Steps ─────────────── */
interface BlankScreenFrameProps {
  title: string;
}

const BlankScreenFrame: React.FC<BlankScreenFrameProps> = ({ title }) => {
  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070d18] shadow-sm w-full">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900 px-4 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="ml-2 text-[9px] font-black uppercase tracking-[0.12em] text-slate-400">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-1 text-[9px] font-black uppercase tracking-[0.12em] text-slate-400">
          <Monitor className="h-3 w-3" />
          Step Preview
        </div>
      </div>
      <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-[#0B132B] dark:to-[#070D18] flex flex-col items-center justify-center p-6 text-center">
        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-400 shadow-sm">
          <Monitor className="h-5 w-5 text-slate-400 dark:text-slate-500" />
        </div>
        <p className="text-[13px] font-bold text-slate-700 dark:text-slate-300">{title}</p>
        <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-0.5">
          Step Illustration
        </p>
      </div>
    </div>
  );
};

const variables = [
  { variable: '{{contact.phone}}', use: 'Recipient phone number — required for carrier delivery' },
  { variable: '{{contact.first_name}}', use: "Contact's first name for message personalization" },
  { variable: '{{contact.last_name}}', use: "Contact's last name" },
  { variable: '{{contact.email}}', use: "Contact's email address" },
  { variable: '{{appointment.time}}', use: 'Appointment start time for booking reminders' },
];

export const AutomationContent: React.FC<Props> = ({ page }) => {
  const steps = [
    {
      badge: 'Step 1',
      title: 'Create a New GHL Workflow',
      icon: PlusCircle,
      color: 'text-blue-500',
      desc: 'Log in to GoHighLevel, navigate to Automation in the left sidebar, and click "Create Workflow". Select "Start from scratch".',
      details: [
        'Opens the interactive GoHighLevel Workflow Builder.',
        'Name your workflow according to campaign intent (e.g. Appointment Reminder SMS).',
      ],
    },
    {
      badge: 'Step 2',
      title: 'Configure Workflow Trigger',
      icon: Zap,
      color: 'text-amber-500',
      desc: 'Click "Add New Workflow Trigger" and select your desired event (e.g., Customer Booked Appointment, Contact Tag Applied, Pipeline Stage Changed).',
      details: [
        'Defines when the automated text sequence should fire.',
        'Supports all standard GoHighLevel CRM triggers.',
      ],
    },
    {
      badge: 'Step 3',
      title: 'Add NOLA SMS Action Node',
      icon: Play,
      color: 'text-purple-500',
      desc: 'Click the "+" icon in the workflow builder. Search for "NOLA SMS Pro" in the actions menu and select it.',
      details: [
        'Inserts the NOLA SMS Pro custom action step into your sequence.',
        'Connects GHL workflow parameters directly to NOLA outbox routing.',
      ],
    },
    {
      badge: 'Step 4',
      title: 'Map Recipient & Identity',
      icon: ShieldCheck,
      color: 'text-teal-500',
      desc: 'In the custom action settings panel, map the recipient phone to {{contact.phone}} and select your approved Sender ID.',
      details: [
        'Selects default mask NOLASMSPro or an approved custom Sender ID.',
        'Enforces local Philippine 11-digit mobile validation.',
      ],
    },
    {
      badge: 'Step 5',
      title: 'Draft Message Payload',
      icon: MessageSquare,
      color: 'text-indigo-500',
      desc: 'Type your message text copy. Insert contact personalization placeholders dynamically (e.g., {{contact.first_name}}). Click Save.',
      details: [
        'Placeholders auto-resolve to recipient data upon trigger execution.',
        'Calculates credit segment consumption rules.',
      ],
    },
    {
      badge: 'Step 6',
      title: 'Publish and Test',
      icon: Send,
      color: 'text-emerald-500',
      desc: 'Toggle workflow status from Draft to Publish in the top bar. Run a test contact through your trigger steps to verify delivery.',
      details: [
        'Activates live automated SMS dispatch.',
        'Logs dispatches in NOLA SMS Pro Message History and GHL Conversations.',
      ],
    },
  ];

  return (
    <div className="w-full space-y-12 pb-10">

      {/* INTRO */}
      <section id="automation-intro" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">What this guide covers</h2>
        <p className="text-[14.5px] leading-7 text-slate-700 dark:text-slate-300">
          NOLA SMS Pro integrates natively as a custom action node inside GoHighLevel Workflow Builder. When a trigger fires, NOLA resolves contact variables, applies your selected Sender ID, debits credits, and dispatches the text automatically.
        </p>
      </section>

      {/* FLOW DIAGRAM */}
      <section id="automation-architecture" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Automation flow architecture</h2>
        <div className="flex items-center gap-2 flex-wrap rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#111827] shadow-sm overflow-x-auto">
          {[
            { icon: <Zap className="h-4 w-4" />, label: 'GHL Trigger', sub: 'Appointment, tag, stage' },
            { arrow: true },
            { icon: <Play className="h-4 w-4" />, label: 'NOLA Action Node', sub: 'Custom workflow action' },
            { arrow: true },
            { icon: <Variable className="h-4 w-4" />, label: 'Variable Resolve', sub: 'Contact fields, Sender ID' },
            { arrow: true },
            { emoji: '📨', label: 'SMS Delivered', sub: 'Carrier dispatch' },
          ].map((node, idx) => {
            if ('arrow' in node) {
              return <ArrowRight key={idx} className="h-4 w-4 text-slate-400 dark:text-slate-600 flex-shrink-0" />;
            }
            return (
              <div
                key={idx}
                className="flex flex-col items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/30 px-4 py-3 min-w-[110px] text-center"
              >
                <div className="text-slate-600 dark:text-slate-400">
                  {'icon' in node ? node.icon : <span className="text-[18px]">{node.emoji}</span>}
                </div>
                <p className="text-[11px] font-black text-slate-900 dark:text-white leading-tight">{node.label}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-500">{node.sub}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* PREREQUISITES */}
      <section id="automation-prerequisites" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Before you begin</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              icon: <Zap className="h-5 w-5 text-amber-500" />,
              label: 'Workflow Access',
              detail: 'Administrator permissions to create and publish automation workflows in your GoHighLevel sub-account.',
            },
            {
              icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
              label: 'Active SMS Credits',
              detail: 'Verified first-flight test send and available SMS credits in your NOLA SMS Pro wallet.',
            },
          ].map((item) => (
            <div key={item.label} className="premium-card flex flex-col justify-between h-full">
              <div>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                  {item.icon}
                </div>
                <h3 className="text-[15px] font-black text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                  {item.label}
                </h3>
                <p className="text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WORKFLOW SETUP STEPS */}
      <section id="automation-steps" className="space-y-5">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Workflow setup steps</h2>
        <div className="space-y-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#111827] hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 shadow-sm shadow-[#0F172A]/2 space-y-5"
              >
                <div className="w-full">
                  <BlankScreenFrame title={`${step.badge} — ${step.title}`} />
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/50">
                    <Icon className={`h-5 w-5 ${step.color}`} />
                  </div>
                  <h4 className="text-[16px] font-black text-slate-900 dark:text-white leading-tight">
                    {step.title}
                  </h4>
                </div>
                <p className="text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-400 font-medium pl-1">
                  {step.desc}
                </p>
                <ul className="space-y-2 pl-1 border-t border-slate-100 dark:border-slate-800/60 pt-4">
                  {step.details.map((detail, subIdx) => (
                    <li key={subIdx} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-slate-600 dark:text-slate-400">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-400 dark:bg-slate-600" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* CONTACT VARIABLES TABLE */}
      <section id="automation-variables" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Contact variable reference</h2>
        <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-[#111827] border-b border-slate-200 dark:border-slate-800">
                <th className="px-5 py-3.5 text-[11px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider">Variable</th>
                <th className="px-5 py-3.5 text-[11px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider">Use</th>
              </tr>
            </thead>
            <tbody>
              {variables.map((row, idx) => (
                <tr key={row.variable} className={`border-b border-slate-100 dark:border-slate-900/50 ${idx % 2 === 0 ? 'bg-white dark:bg-[#0c1220]/20' : 'bg-slate-50/20 dark:bg-slate-900/20'}`}>
                  <td className="px-5 py-3.5 font-mono text-[12.5px] font-semibold text-blue-600 dark:text-blue-400">{row.variable}</td>
                  <td className="px-5 py-3.5 text-[13px] text-slate-500 dark:text-slate-400">{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* BEST PRACTICES */}
      <section id="automation-best-practices" className="space-y-3">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Automation best practices</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { tip: 'Avoid sending identical bulk triggers to large lists simultaneously without consulting credit volume limits to prevent gateway spikes.' },
            { tip: 'Test custom field formats (appointment dates, billing links) in GHL before publishing to ensure blank values do not break SMS layouts.' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 rounded-2xl border border-blue-200 dark:border-blue-900/40 bg-gradient-to-br from-blue-50 to-sky-50/60 dark:from-[#060E1E] dark:to-[#0A1628] px-5 py-4 shadow-sm">
              <Lightbulb className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
              <p className="text-[13.5px] leading-relaxed text-slate-700 dark:text-blue-200">{item.tip}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SUCCESS */}
      <section id="automation-outcome">
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/40 px-5 py-4 dark:border-emerald-800/40 dark:bg-emerald-900/10">
          <CheckCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
          <div>
            <p className="text-[13.5px] font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-wide mb-0.5">Expected outcome</p>
            <p className="text-[13.5px] leading-relaxed text-emerald-700 dark:text-emerald-400 font-medium">
              When the workflow trigger event occurs, NOLA SMS Pro executes the custom action node, formats text variables, debits credits, and dispatches the SMS automatically.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
