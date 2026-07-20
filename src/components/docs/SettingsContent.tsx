import React from 'react';
import type { DocPage } from '../../data/docsData';
import { DocSection } from './layout';
import { Link } from 'react-router-dom';
import { ArrowRight, User, Link2, Bell, Settings, AlertTriangle, Lightbulb, CheckCheck } from 'lucide-react';

interface Props { page: DocPage; }

const settingsTabs = [
  {
    icon: <User className="h-4 w-4" />,
    tab: 'Profile Settings',
    desc: 'Update display name, business email, and contact phone number.',
  },
  {
    icon: <Link2 className="h-4 w-4" />,
    tab: 'Connected Location',
    desc: 'Verify Location Name and Location ID match your active HighLevel sub-account.',
  },
  {
    icon: <Bell className="h-4 w-4" />,
    tab: 'Notification Preferences',
    desc: 'Set low-credit alert thresholds and enable email or SMS notifications.',
  },
];

const profileSteps = [
  { n: 1, title: 'Open Settings Panel', desc: 'Open Settings from the left navigation.' },
  { n: 2, title: 'Update Administrator Metadata', desc: 'Under Profile Settings, update your display name, email, or phone.' },
  { n: 3, title: 'Save Changes', desc: 'Click Save Changes to apply the update.' },
];

const integrationSteps = [
  { n: 1, title: 'Open Connected Location', desc: 'Open the Connected Location tab within Settings.' },
  { n: 2, title: 'Verify Location Identifiers', desc: 'Confirm Location Name and Location ID match your GoHighLevel sub-account.' },
  { n: 3, title: 'Confirm Company Integrity', desc: 'Verify the connected company identity matches your parent agency.' },
];

const notificationSteps = [
  { n: 1, title: 'Open Notification Preferences', desc: 'Navigate to the Notification Preferences tab.' },
  { n: 2, title: 'Enable Alert Routing', desc: 'Enable email or SMS notifications for low-credit alerts.' },
  { n: 3, title: 'Set Threshold', desc: 'Configure your alert threshold (e.g. notify when credits fall below 50).' },
  { n: 4, title: 'Save Alert Settings', desc: 'Click Save Alert Settings to confirm.' },
];

export const SettingsContent: React.FC<Props> = ({ page }) => {
  return (
    <div className="w-full space-y-12 pb-10">



      {/* SETTINGS SECTIONS OVERVIEW */}
      <section id="settings-overview" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Settings panel overview</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {settingsTabs.map((tab) => (
            <div key={tab.tab} className="premium-card flex flex-col h-full">
              <div>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                  {tab.icon}
                </div>
                <h3 className="text-[13.5px] font-black text-slate-900 dark:text-white uppercase tracking-wider mb-2">{tab.tab}</h3>
                <p className="text-[12.5px] leading-relaxed text-slate-500 dark:text-slate-400">{tab.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PREREQUISITE */}
      <section id="settings-prerequisite">
        <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/30">
          <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100/50 dark:border-slate-800 text-slate-600 dark:text-slate-400">
            <Settings className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[13.5px] font-black text-slate-900 dark:text-white">Admin access required</p>
            <p className="text-[12.5px] leading-relaxed text-slate-500 dark:text-slate-400 mt-0.5">Administrator access mapped to the active GoHighLevel location is required to edit these settings.</p>
          </div>
        </div>
      </section>

      {/* THREE SIDE-BY-SIDE WORKFLOWS */}
      <section id="settings-workflows" className="space-y-5">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Configuration workflows</h2>
        <div className="grid gap-6 lg:grid-cols-3">

          {/* PROFILE */}
          <div className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#111827] overflow-hidden shadow-sm">
            <div className="flex items-center gap-2.5 bg-slate-50/50 border-b border-slate-200 px-5 py-4 dark:bg-slate-900/30 dark:border-slate-800">
              <User className="h-3.5 w-3.5 text-slate-500" />
              <p className="text-[12.5px] font-black text-slate-900 dark:text-white uppercase tracking-wider">Profile</p>
            </div>
            <div className="p-5 space-y-4">
              {profileSteps.map((step) => (
                <div key={step.n} className="flex gap-3">
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 text-[10px] font-black mt-0.5">
                    {step.n}
                  </span>
                  <div>
                    <p className="text-[13px] font-bold text-slate-900 dark:text-white leading-tight">{step.title}</p>
                    <p className="text-[12px] leading-relaxed text-slate-500 dark:text-slate-400 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* INTEGRATION */}
          <div className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#111827] overflow-hidden shadow-sm">
            <div className="flex items-center gap-2.5 bg-slate-50/50 border-b border-slate-200 px-5 py-4 dark:bg-slate-900/30 dark:border-slate-800">
              <Link2 className="h-3.5 w-3.5 text-slate-500" />
              <p className="text-[12.5px] font-black text-slate-900 dark:text-white uppercase tracking-wider">Integration</p>
            </div>
            <div className="p-5 space-y-4">
              {integrationSteps.map((step) => (
                <div key={step.n} className="flex gap-3">
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 text-[10px] font-black mt-0.5">
                    {step.n}
                  </span>
                  <div>
                    <p className="text-[13px] font-bold text-slate-900 dark:text-white leading-tight">{step.title}</p>
                    <p className="text-[12px] leading-relaxed text-slate-500 dark:text-slate-400 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* NOTIFICATIONS */}
          <div className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#111827] overflow-hidden shadow-sm">
            <div className="flex items-center gap-2.5 bg-slate-50/50 border-b border-slate-200 px-5 py-4 dark:bg-slate-900/30 dark:border-slate-800">
              <Bell className="h-3.5 w-3.5 text-slate-500" />
              <p className="text-[12.5px] font-black text-slate-900 dark:text-white uppercase tracking-wider">Notifications</p>
            </div>
            <div className="p-5 space-y-4">
              {notificationSteps.map((step) => (
                <div key={step.n} className="flex gap-3">
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 text-[10px] font-black mt-0.5">
                    {step.n}
                  </span>
                  <div>
                    <p className="text-[13px] font-bold text-slate-900 dark:text-white leading-tight">{step.title}</p>
                    <p className="text-[12px] leading-relaxed text-slate-500 dark:text-slate-400 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CRITICAL WARNING */}
      <section id="settings-location-warning">
        <div className="rounded-2xl border border-rose-200 bg-rose-50/40 px-5 py-4 dark:border-rose-900/30 dark:bg-rose-950/10">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-rose-600 dark:text-rose-400" />
            <div>
              <p className="text-[13.5px] font-black text-rose-800 dark:text-rose-300 uppercase tracking-wide mb-1">Critical: Verify connected locations</p>
              <p className="text-[13px] leading-relaxed text-rose-700 dark:text-rose-400 font-medium">
                If the Location Name or Location ID shown in Settings does not match your active GoHighLevel sub-account, <strong>do not send SMS messages</strong>. Stop immediately, capture a screenshot, and contact support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TIPS */}
      <section id="settings-tips" className="space-y-3">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Configuration tips</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { tip: 'Set alert threshold at 50–100 credits to give your team time to top up before messaging queues are blocked.' },
            { tip: 'If you update credentials in your GHL sub-account, trigger a manual API sync from the Connected Location tab.' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 rounded-2xl border border-blue-200 dark:border-blue-900/40 bg-gradient-to-br from-blue-50 to-sky-50/60 dark:from-[#060E1E] dark:to-[#0A1628] px-5 py-4 shadow-sm">
              <Lightbulb className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
              <p className="text-[13.5px] leading-relaxed text-slate-700 dark:text-blue-200">{item.tip}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SUCCESS */}
      <section id="settings-outcome">
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/40 px-5 py-4 dark:border-emerald-800/40 dark:bg-emerald-900/10">
          <CheckCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
          <p className="text-[13.5px] leading-relaxed text-emerald-700 dark:text-emerald-400 font-medium">
            Your administrator profile, integration settings, and notification preferences are successfully updated, and your active GoHighLevel connection is verified.
          </p>
        </div>
      </section>


    </div>
  );
};
