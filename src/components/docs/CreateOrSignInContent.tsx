import React from 'react';
import type { DocPage } from '../../data/docsData';
import { DocSection } from './layout';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Phone, UserPlus, LogIn, AlertTriangle, CheckCheck } from 'lucide-react';

interface Props { page: DocPage; }

export const CreateOrSignInContent: React.FC<Props> = ({ page }) => {
  return (
    <div className="w-full space-y-12 pb-10">



      {/* DECISION SECTION */}
      <section id="create-signin-decision" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Select your setup path</h2>
        <p className="text-[14.5px] leading-7 text-slate-700 dark:text-slate-300">
          NOLA SMS Pro operates natively inside your GoHighLevel sub-account, but it requires a secure location-level administrator profile to manage billing structures, credit wallets, and custom Sender ID requests.
        </p>
        <p className="text-[14.5px] leading-7 text-slate-700 dark:text-slate-300">
          Depending on whether NOLA SMS Pro has been previously configured for your HighLevel sub-account location, select the appropriate option from the paths below to either set up a new owner profile or log in to an existing active account:
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/30">
            <UserPlus className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500" />
            <div>
              <p className="text-[14px] font-black text-slate-900 dark:text-white">First time on this location?</p>
              <p className="text-[12.5px] text-slate-500 dark:text-slate-400 mt-1">Follow the <strong>Create Account</strong> path to register the location owner.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/30">
            <LogIn className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
            <div>
              <p className="text-[14px] font-black text-slate-900 dark:text-white">Already configured?</p>
              <p className="text-[12.5px] text-slate-500 dark:text-slate-400 mt-1">Use the <strong>Sign In</strong> path to access existing credit balances and settings.</p>
            </div>
          </div>
        </div>
      </section>

      {/* DUPLICATE ACCOUNT WARNING */}
      <section id="create-signin-warning">
        <div className="flex items-start gap-3.5 rounded-xl border border-amber-200 bg-amber-50/40 px-5 py-4 dark:border-amber-900/40 dark:bg-amber-950/10">
          <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600 dark:text-amber-400" />
          <div>
            <p className="text-[13.5px] font-black text-amber-800 dark:text-amber-300 uppercase tracking-wide mb-1">Do not create duplicate owners</p>
            <p className="text-[13px] leading-relaxed text-amber-700 dark:text-amber-400 font-medium">
              If a location is already registered, always sign in with the original owner credentials. Registering a duplicate account for an already-registered location is blocked to preserve settings and billing logs.
            </p>
          </div>
        </div>
      </section>

      {/* TWO-COLUMN PATH LAYOUT */}
      <section id="create-signin-paths" className="space-y-6">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Registration &amp; Login workflows</h2>
        <div className="grid gap-6 lg:grid-cols-2">

          {/* PATH A — CREATE ACCOUNT */}
          <div className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#111827] overflow-hidden shadow-sm flex flex-col justify-between h-full">
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/50 text-blue-500">
                  <UserPlus className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[15px] font-black text-slate-900 dark:text-white">Create Account</p>
                  <p className="text-[11.5px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold">New location registration</p>
                </div>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800/80 pt-4 space-y-3">
                <p className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">Required Details</p>
                <div className="space-y-2">
                  {[
                    { icon: <Mail className="h-4 w-4" />, label: 'Valid business email address' },
                    { icon: <Phone className="h-4 w-4" />, label: 'Contact mobile number' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2 text.5 text-slate-500 dark:text-slate-400">
                      <span className="text-slate-400 dark:text-slate-600">{item.icon}</span>
                      <span className="text-[13px] font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800/80 pt-4 space-y-3">
                <p className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">Steps</p>
                {[
                  { n: 1, title: 'Fill form details', desc: 'Enter your Full Name, Email Address, Phone Number, and Password on the registration view.' },
                  { n: 2, title: 'Submit & Bind Location', desc: 'Click Create Account to map your user profile as the canonical owner of the active sub-account.' },
                ].map((step) => (
                  <div key={step.n} className="flex gap-3">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200 text-[10px] font-black mt-0.5">
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

          {/* PATH B — SIGN IN */}
          <div className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#111827] overflow-hidden shadow-sm flex flex-col justify-between h-full">
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/50 text-emerald-500">
                  <LogIn className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[15px] font-black text-slate-900 dark:text-white">Sign In</p>
                  <p className="text-[11.5px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold">Returning owner authentication</p>
                </div>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800/80 pt-4 space-y-3">
                <p className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">Required Details</p>
                <div className="space-y-2">
                  {[
                    { icon: <Mail className="h-4 w-4" />, label: 'Registered owner email address' },
                    { icon: <Phone className="h-4 w-4" />, label: 'Your active account password' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2 text.5 text-slate-500 dark:text-slate-400">
                      <span className="text-slate-400 dark:text-slate-600">{item.icon}</span>
                      <span className="text-[13px] font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800/80 pt-4 space-y-3">
                <p className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">Steps</p>
                {[
                  { n: 1, title: 'Navigate to login', desc: 'Click the "Sign In" link at the bottom of the registration workspace if you already have an account.' },
                  { n: 2, title: 'Input details & verify', desc: 'Enter the registered owner email and password, then click Sign In to resume your session.' },
                ].map((step) => (
                  <div key={step.n} className="flex gap-3">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200 text-[10px] font-black mt-0.5">
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

        </div>
      </section>

      {/* EXPECTED OUTCOME */}
      <section id="create-signin-outcome">
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/40 px-5 py-4 dark:border-emerald-800/40 dark:bg-emerald-900/10">
          <CheckCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
          <div>
            <p className="text-[13.5px] font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-wide mb-0.5">Expected outcome</p>
            <p className="text-[13.5px] leading-relaxed text-emerald-700 dark:text-emerald-400 font-medium">
              After logging in or completing registration, NOLA SMS Pro links your credentials to the active sub-account location ID and redirects you to the dashboard verification view.
            </p>
          </div>
        </div>
      </section>


    </div>
  );
};
