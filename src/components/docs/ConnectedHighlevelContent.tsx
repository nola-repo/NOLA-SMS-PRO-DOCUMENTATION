import React from 'react';
import type { DocPage } from '../../data/docsData';
import {
  ShieldCheck,
  UserCheck,
  Wifi,
  WifiOff,
  Lightbulb,
  CheckCheck,
  Monitor,
  Settings,
  Users,
  RefreshCw,
  LayoutGrid,
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
      {/* Browser Chrome Header */}
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

      {/* Blank Screenshot Frame Container */}
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

const statusItems = [
  {
    badge: 'API Connected',
    color: 'emerald',
    desc: 'Integration is active. Contacts are synced and SMS delivery is fully operational.',
    dot: 'bg-emerald-500',
    icon: <Wifi className="h-4 w-4 text-white" />,
  },
  {
    badge: 'Disconnected',
    color: 'rose',
    desc: 'Token expired or scope mismatch. Click "Connect API" inside settings to re-authorize.',
    dot: 'bg-rose-500',
    icon: <WifiOff className="h-4 w-4 text-white" />,
  },
];

export const ConnectedHighlevelContent: React.FC<Props> = ({ page }) => {
  const verifySteps = [
    {
      icon: LayoutGrid,
      color: 'text-blue-500',
      badge: 'Step 1',
      title: 'Open NOLA SMS Pro',
      desc: 'Access NOLA SMS Pro from your GoHighLevel sub-account left navigation sidebar.',
      details: [
        'Open your target location inside GoHighLevel.',
        'Click the NOLA SMS Pro item in the custom menu link sidebar.',
      ],
    },
    {
      icon: Settings,
      color: 'text-slate-500',
      badge: 'Step 2',
      title: 'Access Settings Panel',
      desc: 'Click Settings in the NOLA SMS Pro navigation menu.',
      details: [
        'Loads account metadata, profile information, and connection parameters.',
        'View sub-account location binding status.',
      ],
    },
    {
      icon: ShieldCheck,
      color: 'text-emerald-500',
      badge: 'Step 3',
      title: 'Confirm Location Mapping',
      desc: 'Scroll to the profile metadata section and verify that your Location Name and Location ID resolve correctly.',
      details: [
        'Checks that the iframe parameters align with your active GHL location ID.',
        'Confirms that billing and credits are assigned to the correct location.',
      ],
    },
    {
      icon: Users,
      color: 'text-purple-500',
      badge: 'Step 4',
      title: 'Open Contacts Lookup',
      desc: 'Navigate to the Contacts module in NOLA SMS Pro.',
      details: [
        'Initiates a background query to verify bi-directional database synchronization.',
        'Confirms that contact search works in real-time.',
      ],
    },
    {
      icon: RefreshCw,
      color: 'text-amber-500',
      badge: 'Step 5',
      title: 'Verify Database Sync',
      desc: 'Ensure your customer contacts list populated automatically from your GoHighLevel CRM directory.',
      details: [
        'Confirm customer records, phone numbers, and CRM tags are displayed.',
        'Requires zero manual CSV imports or data exports.',
      ],
    },
    {
      icon: Wifi,
      color: 'text-teal-500',
      badge: 'Step 6',
      title: 'Check Connection Indicator',
      desc: 'Return to Settings and verify that the API status displays "API Connected". Click Reconnect if status shows offline.',
      details: [
        'A green "API Connected" badge confirms operational access tokens.',
        'If disconnected, click "Connect API" to re-authorize HighLevel OAuth access.',
      ],
    },
  ];

  return (
    <div className="w-full space-y-12 pb-10">

      {/* INTRO */}
      <section id="connect-intro" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">What this guide covers</h2>
        <p className="text-[14.5px] leading-7 text-slate-700 dark:text-slate-300">
          Verify that NOLA SMS Pro is successfully connected to your GoHighLevel sub-account by confirming location identifiers and checking contact synchronization status.
        </p>
        <p className="text-[14.5px] leading-7 text-slate-700 dark:text-slate-300">
          The connection handshake relies on dynamic URL parameters passed securely by GoHighLevel when you open the iframe. This checks that the current sub-account location aligns with your registered NOLA profile.
        </p>
      </section>

      {/* CONNECTION STATUS INDICATORS */}
      <section id="connect-status-reference" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Connection status indicators</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {statusItems.map((item) => (
            <div
              key={item.badge}
              className={`flex items-start gap-3 rounded-2xl border p-5 bg-white dark:bg-[#111827] shadow-sm ${
                item.color === 'emerald' ? 'border-emerald-200 dark:border-emerald-900/40' : 'border-rose-200 dark:border-rose-900/40'
              }`}
            >
              <div
                className={`mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-xl ${
                  item.color === 'emerald' ? 'bg-emerald-500' : 'bg-rose-500'
                }`}
              >
                {item.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${item.dot}`} />
                  <span
                    className={`text-[12px] font-black uppercase tracking-wider ${
                      item.color === 'emerald' ? 'text-emerald-800 dark:text-emerald-300' : 'text-rose-800 dark:text-rose-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>
                <p className="text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PREREQUISITES */}
      <section id="connect-prerequisites" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Before you begin</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              icon: <ShieldCheck className="h-5 w-5 text-blue-500" />,
              label: 'Marketplace Installation',
              detail: 'Completed Marketplace installation from Agency View.',
            },
            {
              icon: <UserCheck className="h-5 w-5 text-emerald-500" />,
              label: 'Owner Account Login',
              detail: 'Active owner account already created and signed in.',
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

      {/* VERIFICATION STEPS WITH SCREENSHOT FRAMES */}
      <section id="connect-verification-steps" className="space-y-5">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Verification steps</h2>
        <div className="space-y-8">
          {verifySteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#111827] hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 shadow-sm shadow-[#0F172A]/2 space-y-5"
              >
                {/* Screenshot Frame / Placeholder */}
                <div className="w-full">
                  <BlankScreenFrame title={`${step.badge} — ${step.title}`} />
                </div>

                {/* Header: Icon + Title */}
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/50">
                    <Icon className={`h-5 w-5 ${step.color}`} />
                  </div>
                  <h4 className="text-[16px] font-black text-slate-900 dark:text-white leading-tight">
                    {step.title}
                  </h4>
                </div>

                {/* Description */}
                <p className="text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-400 font-medium pl-1">
                  {step.desc}
                </p>

                {/* Bullet details */}
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

      {/* DIAGNOSTIC TIP */}
      <section id="connect-diagnostic-tip">
        <div className="rounded-2xl border border-blue-200 dark:border-blue-900/40 border-l-4 border-l-blue-500 dark:border-l-blue-600 bg-gradient-to-br from-blue-50 to-sky-50/60 dark:from-[#060E1E] dark:to-[#0A1628] p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <Lightbulb className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-[13.5px] font-black text-blue-800 dark:text-blue-300 uppercase tracking-wide mb-1">
                Troubleshooting: missing location or contacts
              </p>
              <p className="text-[13.5px] leading-relaxed text-slate-700 dark:text-blue-200">
                If your Location ID displays as <code className="text-[12px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono text-slate-800 dark:text-slate-200">null</code>, or contacts fail to sync, check your Custom Menu Link configuration under GoHighLevel Settings. Ensure that <em>Pass contact/user info as query parameters</em> is enabled so NOLA can parse location identifiers dynamically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SUCCESS OUTCOME */}
      <section id="connect-outcome">
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/40 px-5 py-4 dark:border-emerald-800/40 dark:bg-emerald-900/10">
          <CheckCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
          <div>
            <p className="text-[13.5px] font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-wide mb-0.5">Expected outcome</p>
            <p className="text-[13.5px] leading-relaxed text-emerald-700 dark:text-emerald-400 font-medium">
              Your location identity, owner profile, and GoHighLevel contact database are successfully synchronized and ready for standard messaging operations.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
