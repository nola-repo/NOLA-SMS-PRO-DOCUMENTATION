import React from 'react';
import type { DocPage } from '../../data/docsData';
import { InfoBox, TipBox, WarningBox, SuccessBox } from '../Callouts';
import { DocSection, DocSectionHeading } from './layout';
import { Link } from 'react-router-dom';
import { ArrowRight, Settings } from 'lucide-react';

interface Props {
  page: DocPage;
}

export const SettingsContent: React.FC<Props> = ({ page }) => {
  return (
    <div className="w-full space-y-10">
      {/* HEADER METADATA */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#D7E7FA] pb-4 dark:border-[#183354]">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-[#E8F3FF] px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-[#1F5AAE] dark:bg-[#102B4F] dark:text-[#9AC3FF]">
          {page.readingTime}
        </span>
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          {page.section} {page.subsection ? `> ${page.subsection}` : ''}
        </span>
      </div>

      {/* Section A — Key Objective */}
      <DocSection id="settings-key-objective">
        <InfoBox title="Key Objective">
          Manage your administrator profile, verify connected GoHighLevel integrations, configure low-credit notifications, and manage Sender ID requests.
        </InfoBox>
      </DocSection>

      {/* Section B — Prerequisites */}
      <DocSection id="settings-prerequisites">
        <DocSectionHeading>Prerequisites</DocSectionHeading>
        <div className="rounded-2xl border border-[#D7E7FA] bg-[#F8FBFF] p-5 dark:border-[#183354] dark:bg-[#0B1627] flex items-start gap-4 max-w-[680px] shadow-sm shadow-[#184B8F]/3 hover:border-[#4F8EF7] transition-all duration-300">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#E8F3FF] text-[#1F5AAE] dark:bg-[#102B4F] dark:text-[#72A8FF]">
            <Settings className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-[14px] font-black text-[#0B2E63] dark:text-white uppercase tracking-wider mb-1">Admin Access</h4>
            <p className="text-[12.5px] leading-relaxed text-[#5D7596] dark:text-slate-400">
              Administrator access mapped to the active GoHighLevel location is required.
            </p>
          </div>
        </div>
      </DocSection>

      {/* Section C — Step-by-Step Profile Management */}
      <DocSection id="profile-management-stepper">
        <DocSectionHeading>Step-by-Step Profile Management</DocSectionHeading>
        
        <div className="relative pl-6 border-l-2 border-[#D7E7FA] dark:border-[#183354] ml-4 space-y-8 my-6">
          {[
            {
              title: 'Open Settings Panel',
              desc: 'Open Settings from the left navigation.'
            },
            {
              title: 'Update Administrator Metadata',
              desc: 'Under Profile Settings, update your display name, business email, or contact phone number.'
            },
            {
              title: 'Save Profile Changes',
              desc: 'Click Save Changes.'
            }
          ].map((step, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[35px] top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#1F5AAE] text-white dark:bg-[#72A8FF] dark:text-[#07111F] text-[10px] font-black shadow-md transition-all duration-200 group-hover:scale-110">
                {idx + 1}
              </div>
              <h4 className="text-[14.5px] font-bold text-[#0B2E63] dark:text-white leading-none mb-2 group-hover:text-[#1F5AAE] dark:group-hover:text-[#72A8FF] transition-colors">
                {step.title}
              </h4>
              <p className="text-[13.5px] leading-relaxed text-[#5D7596] dark:text-slate-400">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </DocSection>

      {/* Section D — Step-by-Step Integration Check */}
      <DocSection id="integration-check-stepper">
        <DocSectionHeading>Step-by-Step Integration Check</DocSectionHeading>
        
        <div className="relative pl-6 border-l-2 border-[#D7E7FA] dark:border-[#183354] ml-4 space-y-8 my-6">
          {[
            {
              title: 'Open Connected Location',
              desc: 'Open the Connected Location tab.'
            },
            {
              title: 'Verify Location Identifiers',
              desc: 'Verify that the displayed Location Name and Location ID match your GoHighLevel sub-account.'
            },
            {
              title: 'Confirm Company Integrity',
              desc: 'Confirm that the connected company identity matches your parent agency.'
            }
          ].map((step, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[35px] top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#1F5AAE] text-white dark:bg-[#72A8FF] dark:text-[#07111F] text-[10px] font-black shadow-md transition-all duration-200 group-hover:scale-110">
                {idx + 1}
              </div>
              <h4 className="text-[14.5px] font-bold text-[#0B2E63] dark:text-white leading-none mb-2 group-hover:text-[#1F5AAE] dark:group-hover:text-[#72A8FF] transition-colors">
                {step.title}
              </h4>
              <p className="text-[13.5px] leading-relaxed text-[#5D7596] dark:text-slate-400">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </DocSection>

      {/* Section E — Step-by-Step Notification Configuration */}
      <DocSection id="notification-configuration-stepper">
        <DocSectionHeading>Step-by-Step Notification Configuration</DocSectionHeading>
        
        <div className="relative pl-6 border-l-2 border-[#D7E7FA] dark:border-[#183354] ml-4 space-y-8 my-6">
          {[
            {
              title: 'Open Notifications Tab',
              desc: 'Open Notification Preferences.'
            },
            {
              title: 'Enable Alerts Routing',
              desc: 'Enable email or SMS notifications for low-credit alerts.'
            },
            {
              title: 'Configure Notification Threshold',
              desc: 'Configure your preferred alert threshold (for example, notify me when credits fall below 50).'
            },
            {
              title: 'Commit Alert Settings',
              desc: 'Click Save Alert Settings.'
            }
          ].map((step, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[35px] top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#1F5AAE] text-white dark:bg-[#72A8FF] dark:text-[#07111F] text-[10px] font-black shadow-md transition-all duration-200 group-hover:scale-110">
                {idx + 1}
              </div>
              <h4 className="text-[14.5px] font-bold text-[#0B2E63] dark:text-white leading-none mb-2 group-hover:text-[#1F5AAE] dark:group-hover:text-[#72A8FF] transition-colors">
                {step.title}
              </h4>
              <p className="text-[13.5px] leading-relaxed text-[#5D7596] dark:text-slate-400">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </DocSection>

      {/* Section F — Important Warning */}
      <DocSection id="settings-location-warning">
        <WarningBox title="⚠️ WARNING: Verify Connected Locations">
          If the Location Name or Location ID shown in Settings does not match the active GoHighLevel sub-account you are working in, do not send SMS messages. Stop immediately, capture a screenshot of the mismatch, and contact support before continuing.
        </WarningBox>
      </DocSection>

      {/* Section G — Best Practices */}
      <DocSection id="settings-best-practices">
        <DocSectionHeading>Alert Settings Best Practices</DocSectionHeading>
        <div className="grid gap-4 md:grid-cols-2">
          <TipBox title="💡 Dynamic Threshold Alert Values">
            Set your low-credit threshold alert value high enough (e.g. 50-100 credits) to give your agency administrators sufficient time to purchase additional credit packages before outbound SMS queues are blocked.
          </TipBox>
          <TipBox title="💡 Sync Recovery Actions">
            If you change administrators or update credentials inside your GoHighLevel sub-account settings, navigate to the Connected Location page tab and trigger a manual API sync update to restore connections.
          </TipBox>
        </div>
      </DocSection>

      {/* Section H — Expected Outcome */}
      <DocSection id="settings-expected-outcome">
        <SuccessBox title="Expected Outcome">
          Your administrator profile, integration settings, and notification preferences are successfully updated, and your active GoHighLevel connection is verified.
        </SuccessBox>
      </DocSection>

      {/* Section I — Closing + CTA */}
      <div className="border-t border-[#D7E7FA] pt-8 dark:border-[#183354]">
        <section aria-labelledby="closing-heading">
          <p className="text-[15px] font-medium leading-7 text-[#425B7D] dark:text-slate-300 max-w-[720px]">
            Facing installation issues or delivery errors? The next guide will walk you through troubleshooting steps.
          </p>

          {/* Next Page CTA */}
          <Link
            to="/docs/troubleshooting"
            id="settings-next-cta"
            className="group mt-6 inline-flex items-center gap-3 rounded-2xl border border-[#4F8EF7]/30 bg-gradient-to-r from-[#1F5AAE] to-[#3B7FE0] px-6 py-4 text-white shadow-lg shadow-[#184B8F]/20 transition-all duration-200 hover:shadow-xl hover:shadow-[#184B8F]/30 hover:opacity-95"
          >
            <span className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#B8D8FF]">
                Next guide
              </span>
              <span className="mt-0.5 text-[15px] font-black leading-tight">
                Troubleshooting
              </span>
            </span>
            <ArrowRight className="h-5 w-5 flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
          </Link>

          {/* Version note */}
          <p className="mt-6 text-[12px] text-[#7B93B1] dark:text-slate-500 leading-relaxed">
            This documentation reflects NOLA SMS Pro version 1.0. If your app looks
            different, visit{' '}
            <Link
              to="/docs/support-help"
              className="font-semibold text-[#1F5AAE] underline underline-offset-2 dark:text-[#72A8FF]"
            >
              Support &amp; Help
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
};
