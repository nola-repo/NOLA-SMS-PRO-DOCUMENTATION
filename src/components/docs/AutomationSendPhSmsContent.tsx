import React from 'react';
import type { DocPage } from '../../data/docsData';
import {
  Zap,
  Play,
  Variable,
  Lightbulb,
  CheckCheck,
  PlusCircle,
  MessageSquare,
  Send,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface Props {
  page: DocPage;
}

const variables = [
  { variable: '{{contact.phone}}', use: 'Philippine 11-digit mobile number (e.g. 09XXXXXXXXX)' },
  { variable: '{{contact.first_name}}', use: "Contact's first name for personalization" },
  { variable: '{{contact.last_name}}', use: "Contact's last name" },
  { variable: '{{contact.email}}', use: "Contact's email address" },
  { variable: '{{appointment.time}}', use: 'Appointment start time for booking reminders' },
];

export const AutomationSendPhSmsContent: React.FC<Props> = ({ page }) => {
  const steps = [
    {
      badge: 'Step 1',
      title: 'Create a New GHL Workflow',
      icon: PlusCircle,
      color: 'text-blue-500',
      desc: 'Log in to GoHighLevel, navigate to Automation in the left sidebar, and click "Create Workflow". Select "Start from scratch".',
      details: [
        'Opens the interactive GoHighLevel Workflow Builder.',
        'Name your workflow according to Philippine SMS campaign intent (e.g. PH Appointment Reminder).',
      ],
    },
    {
      badge: 'Step 2',
      title: 'Configure Workflow Trigger',
      icon: Zap,
      color: 'text-amber-500',
      desc: 'Click "Add New Workflow Trigger" and select your desired event (e.g., Customer Booked Appointment, Contact Tag Applied, Pipeline Stage Changed).',
      details: [
        'Defines when the automated Philippine text sequence should fire.',
        'Supports all standard GoHighLevel CRM triggers.',
      ],
    },
    {
      badge: 'Step 3',
      title: 'Add Send PH SMS Action Node',
      icon: Play,
      color: 'text-purple-500',
      desc: 'Click the "+" icon in the workflow builder. Search for "Send PH SMS" (or NOLA SMS Pro) in the actions menu and select it.',
      details: [
        'Inserts the NOLA SMS Pro Send PH SMS custom action step into your sequence.',
        'Connects GHL workflow parameters directly to domestic Philippine network outbox routing.',
      ],
    },
    {
      badge: 'Step 4',
      title: 'Select Sender ID & Map Variables',
      icon: ShieldCheck,
      color: 'text-teal-500',
      desc: 'In the custom action settings panel, select your approved custom Sender ID header and map the recipient phone to {{contact.phone}}.',
      details: [
        'Selects default mask NOLASMSPro or your approved custom brand header.',
        'Validates Philippine 11-digit mobile carrier prefixes (Globe, Smart, DITO).',
      ],
    },
    {
      badge: 'Step 5',
      title: 'Draft Message Copy & Publish',
      icon: Send,
      color: 'text-emerald-500',
      desc: 'Type your message text copy, review character segment limits, and toggle workflow status to Published.',
      details: [
        'Monitors standard GSM-7 character encoding (160 characters per credit segment).',
        'Logs dispatches in NOLA SMS Pro Message History and GHL Conversations.',
      ],
    },
  ];

  return (
    <div className="w-full space-y-12 pb-10">

      {/* INTRO */}
      <section id="automation-send-ph-sms-intro" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">What this guide covers</h2>
        <p className="text-[14.5px] leading-7 text-slate-700 dark:text-slate-300">
          The <strong>Send PH SMS</strong> action node routes text messages specifically through domestic Philippine mobile carriers (Globe, Smart, DITO). This allows you to apply approved custom Sender IDs, enforce local 11-digit mobile validation, and optimize delivery speeds.
        </p>
      </section>

      {/* FLOW DIAGRAM - SAME SIZE & FULL WIDTH CARDS */}
      <section id="automation-architecture" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Automation flow architecture</h2>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#111827] shadow-sm w-full">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 w-full">
            {[
              {
                icon: <Zap className="h-5 w-5 text-amber-500" />,
                step: 'Step 1',
                label: 'GHL Trigger',
                sub: 'Appointment, tag, stage',
              },
              {
                icon: <Play className="h-5 w-5 text-blue-500" />,
                step: 'Step 2',
                label: 'Send PH SMS Node',
                sub: 'NOLA PH workflow action',
              },
              {
                icon: <Variable className="h-5 w-5 text-purple-500" />,
                step: 'Step 3',
                label: 'Variable Resolve',
                sub: 'Sender ID & local phone',
              },
              {
                icon: <Send className="h-5 w-5 text-emerald-500" />,
                step: 'Step 4',
                label: 'SMS Sent',
                sub: 'PH Carrier dispatch',
                isSuccess: true,
              },
            ].map((node, idx) => (
              <div
                key={idx}
                className={`relative flex flex-col items-center justify-center gap-2 rounded-xl border p-5 text-center w-full min-h-[125px] transition-all ${
                  node.isSuccess
                    ? 'border-emerald-200 bg-emerald-50/40 dark:border-emerald-900/40 dark:bg-emerald-950/20'
                    : 'border-slate-200 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-900/50'
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                  {node.icon}
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    {node.step}
                  </span>
                  <p className="text-[13px] font-black text-slate-900 dark:text-white leading-tight mt-0.5">
                    {node.label}
                  </p>
                  <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1">
                    {node.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREREQUISITES */}
      <section id="automation-ph-prerequisites" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Before you begin</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              icon: <Zap className="h-5 w-5 text-amber-500" />,
              label: 'Workflow Permissions',
              detail: 'Administrator permissions to create workflows in your GoHighLevel sub-account.',
            },
            {
              icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
              label: 'Philippine Contact Numbers',
              detail: 'Recipient phone numbers formatted using Philippine carrier format (09XXXXXXXXX).',
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
      <section id="automation-ph-steps" className="space-y-5">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Workflow setup steps</h2>
        <div className="space-y-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#111827] hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 shadow-sm shadow-[#0F172A]/2 space-y-5"
              >
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
      <section id="automation-ph-variables" className="space-y-4">
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
      <section id="automation-ph-best-practices" className="space-y-3">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Automation best practices</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { tip: 'Always verify recipient numbers are in 09XXXXXXXXX local format to ensure Philippine telco carrier acceptance.' },
            { tip: 'Select approved custom Sender IDs in the node settings to maximize recipient open rates and brand trust.' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 rounded-2xl border border-blue-200 dark:border-blue-900/40 bg-gradient-to-br from-blue-50 to-sky-50/60 dark:from-[#060E1E] dark:to-[#0A1628] px-5 py-4 shadow-sm">
              <Lightbulb className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
              <p className="text-[13.5px] leading-relaxed text-slate-700 dark:text-blue-200">{item.tip}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SUCCESS */}
      <section id="automation-ph-outcome">
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/40 px-5 py-4 dark:border-emerald-800/40 dark:bg-emerald-900/10">
          <CheckCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
          <div>
            <p className="text-[13.5px] font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-wide mb-0.5">Expected outcome</p>
            <p className="text-[13.5px] leading-relaxed text-emerald-700 dark:text-emerald-400 font-medium">
              When the workflow trigger event occurs, NOLA SMS Pro executes the Send PH SMS custom action node, applies your Sender ID mask, debits credits, and dispatches the text to local networks.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
