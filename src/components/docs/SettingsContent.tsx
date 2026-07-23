import React, { useState, useEffect } from 'react';
import type { DocPage } from '../../data/docsData';
import {
  User,
  Link2,
  Bell,
  Settings,
  AlertTriangle,
  Lightbulb,
  CheckCheck,
  Maximize2,
  X,
  Monitor,
  ShieldCheck,
  CreditCard,
} from 'lucide-react';

import SettingsAccountImg from '../../assets/Dashboard Overview/Settings - Account.png';
import SettingsSenderIdImg from '../../assets/Dashboard Overview/Settings - Sender ID.png';
import SettingsNotificationImg from '../../assets/Dashboard Overview/Settings - Notification.png';
import SettingsCreditsImg from '../../assets/Dashboard Overview/Settings - Credits.png';

interface Props {
  page: DocPage;
}

/* ─── Image Lightbox ───────────────────────────────────── */
interface LightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
}

const ImageLightbox: React.FC<LightboxProps> = ({ src, alt, onClose }) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-6xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 flex items-center gap-1.5 text-white/80 hover:text-white text-[12px] font-semibold transition-colors"
        >
          <X className="h-4 w-4" />
          Close
        </button>
        <div className="overflow-hidden rounded-xl border border-white/10 shadow-2xl">
          <img
            src={src}
            alt={alt}
            className="w-full h-auto block max-h-[85vh] object-contain object-top"
          />
        </div>
      </div>
    </div>
  );
};

/* ─── Interactive Settings Tab Viewer ──────────────────── */
const SettingsTabViewer: React.FC<{ onOpenLightbox: (src: string) => void }> = ({ onOpenLightbox }) => {
  const tabs = [
    { key: 'account', label: 'Account', img: SettingsAccountImg, desc: 'Profile details and GoHighLevel sub-account location connection.' },
    { key: 'sender-id', label: 'Sender IDs', img: SettingsSenderIdImg, desc: 'Manage your active, pending, and approved Sender ID brand masks.' },
    { key: 'notifications', label: 'Notifications', img: SettingsNotificationImg, desc: 'Set up low balance alerts and notification email thresholds.' },
    { key: 'credits', label: 'Credits', img: SettingsCreditsImg, desc: 'Check credit balance, select top-up packages, and review transaction history.' },
  ];

  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50">
        {tabs.map((tab, idx) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(idx)}
            className={`px-3.5 py-1.5 rounded-lg text-[12px] font-black tracking-wide transition-all ${
              idx === activeTab
                ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070d18] shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900 px-4 py-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-400" />
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="ml-2 text-[9px] font-black uppercase tracking-[0.12em] text-slate-400">
              Settings &gt; {tabs[activeTab].label}
            </span>
          </div>
          <button
            onClick={() => onOpenLightbox(tabs[activeTab].img)}
            className="flex items-center gap-1 text-[9px] font-black uppercase tracking-[0.12em] text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            aria-label="View full size"
          >
            <Maximize2 className="h-3 w-3" />
            Full size
          </button>
        </div>
        <button
          className="block w-full cursor-zoom-in focus:outline-none"
          onClick={() => onOpenLightbox(tabs[activeTab].img)}
          aria-label={`View Settings - ${tabs[activeTab].label} full size`}
        >
          <img src={tabs[activeTab].img} alt={`Settings - ${tabs[activeTab].label}`} className="w-full h-auto block" />
        </button>
      </div>
      <p className="text-[12.5px] italic text-slate-500 dark:text-slate-400 text-center leading-relaxed">
        {tabs[activeTab].desc}
      </p>
    </div>
  );
};

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

const settingsTabsInfo = [
  {
    icon: <User className="h-4 w-4" />,
    tab: 'Account Profile',
    desc: 'Update display name, business email, and contact phone number.',
  },
  {
    icon: <Link2 className="h-4 w-4" />,
    tab: 'Connected Location',
    desc: 'Verify Location Name and Location ID match your active HighLevel sub-account.',
  },
  {
    icon: <Bell className="h-4 w-4" />,
    tab: 'Notifications',
    desc: 'Set low-credit alert thresholds and enable email or SMS notifications.',
  },
];

export const SettingsContent: React.FC<Props> = ({ page }) => {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const profileSteps = [
    {
      badge: 'Step 1',
      title: 'Open Settings Panel',
      icon: Settings,
      color: 'text-slate-500',
      desc: 'Open Settings from the NOLA SMS Pro navigation sidebar.',
      details: [
        'Navigates to the core configuration console.',
        'Displays active tabs: Account, Sender IDs, Notifications, and Credits.',
      ],
    },
    {
      badge: 'Step 2',
      title: 'Update Profile Details',
      icon: User,
      color: 'text-blue-500',
      desc: 'Under the Account tab, update your Full Name, Email Address, or Contact Mobile Number.',
      details: [
        'Email address is used for low-credit and Sender ID status alerts.',
        'Click Save Changes to apply updates immediately.',
      ],
    },
  ];

  const integrationSteps = [
    {
      badge: 'Step 1',
      title: 'Open Connected Location',
      icon: Link2,
      color: 'text-emerald-500',
      desc: 'Verify that your active Location Name and Location ID match your GoHighLevel sub-account.',
      details: [
        'Displays active location integration identifiers.',
        'Confirms API Connected status badge.',
      ],
    },
    {
      badge: 'Step 2',
      title: 'Manual Re-connection',
      icon: ShieldCheck,
      color: 'text-purple-500',
      desc: 'If the connection badge displays Disconnected, click Connect API to re-authorize HighLevel OAuth access.',
      details: [
        'Re-authenticates location access tokens.',
        'Restores real-time contact sync and outbox routing.',
      ],
    },
  ];

  const notificationSteps = [
    {
      badge: 'Step 1',
      title: 'Configure Low Balance Alerts',
      icon: Bell,
      color: 'text-amber-500',
      desc: 'Open Notifications tab, set your credit threshold trigger level, and enable email notifications.',
      details: [
        'Triggers automated alerts when credit balance falls below threshold (e.g., 50 credits).',
        'Prevents unexpected messaging pause when credit balance exhausts.',
      ],
    },
  ];

  return (
    <div className="w-full space-y-12 pb-10">

      {/* INTRO */}
      <section id="settings-intro" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">What this guide covers</h2>
        <p className="text-[14.5px] leading-7 text-slate-700 dark:text-slate-300">
          Manage your owner profile, verify GoHighLevel location connections, configure low-credit alerts, and manage custom Sender IDs from the Settings console.
        </p>
      </section>

      {/* INTERACTIVE TAB SCREENSHOT VIEWER */}
      <section id="settings-tabs-viewer" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Interactive settings tab preview</h2>
        <SettingsTabViewer onOpenLightbox={(src) => setLightboxSrc(src)} />
      </section>

      {/* OVERVIEW CARDS */}
      <section id="settings-overview" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Settings categories overview</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {settingsTabsInfo.map((tab) => (
            <div key={tab.tab} className="premium-card flex flex-col h-full">
              <div>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                  {tab.icon}
                </div>
                <h3 className="text-[13.5px] font-black text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                  {tab.tab}
                </h3>
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
            <p className="text-[12.5px] leading-relaxed text-slate-500 dark:text-slate-400 mt-0.5">
              Administrator access mapped to the active GoHighLevel sub-account location is required to edit these settings.
            </p>
          </div>
        </div>
      </section>

      {/* PROFILE WORKFLOW */}
      <section id="settings-profile-workflow" className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400">
            <User className="h-4 w-4" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Profile configuration steps</h2>
        </div>
        <div className="space-y-8">
          {profileSteps.map((step, idx) => {
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

      {/* INTEGRATION WORKFLOW */}
      <section id="settings-integration-workflow" className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400">
            <Link2 className="h-4 w-4" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Integration verification steps</h2>
        </div>
        <div className="space-y-8">
          {integrationSteps.map((step, idx) => {
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

      {/* NOTIFICATION WORKFLOW */}
      <section id="settings-notification-workflow" className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400">
            <Bell className="h-4 w-4" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Notification preferences steps</h2>
        </div>
        <div className="space-y-8">
          {notificationSteps.map((step, idx) => {
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

      {/* CRITICAL WARNING */}
      <section id="settings-location-warning">
        <div className="rounded-2xl border border-rose-200 bg-rose-50/40 px-5 py-4 dark:border-rose-900/30 dark:bg-rose-950/10">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-rose-600 dark:text-rose-400" />
            <div>
              <p className="text-[13.5px] font-black text-rose-800 dark:text-rose-300 uppercase tracking-wide mb-1">
                Critical: Verify connected locations
              </p>
              <p className="text-[13px] leading-relaxed text-rose-700 dark:text-rose-400 font-medium">
                If the Location Name or Location ID shown in Settings does not match your active GoHighLevel sub-account, <strong>do not send SMS messages</strong>. Stop immediately and contact support to resolve the location binding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONFIGURATION TIPS */}
      <section id="settings-tips" className="space-y-3">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Configuration tips</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { tip: 'Set your alert threshold at 50–100 credits to give your team enough time to top up before outbox queues pause.' },
            { tip: 'If you update credentials in your GHL sub-account, trigger a manual API re-connect from the Connected Location tab.' },
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

      {/* Lightbox Modal */}
      {lightboxSrc && (
        <ImageLightbox
          src={lightboxSrc}
          alt="Full size screenshot"
          onClose={() => setLightboxSrc(null)}
        />
      )}

    </div>
  );
};
