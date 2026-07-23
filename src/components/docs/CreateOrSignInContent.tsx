import React from 'react';
import type { DocPage } from '../../data/docsData';
import {
  UserPlus,
  LogIn,
  Mail,
  Phone,
  Lock,
  AlertTriangle,
  CheckCheck,
  Monitor,
  ShieldCheck,
  Key,
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

export const CreateOrSignInContent: React.FC<Props> = ({ page }) => {
  const createAccountSteps = [
    {
      icon: UserPlus,
      color: 'text-blue-500',
      badge: 'Create Step 1',
      title: 'Fill Owner Profile Details',
      desc: 'Enter your Full Name, Business Email Address, Contact Mobile Number, and secure Password on the registration form.',
      details: [
        'Use the official location administrator email address.',
        'Password must be at least 8 characters long.',
      ],
    },
    {
      icon: ShieldCheck,
      color: 'text-emerald-500',
      badge: 'Create Step 2',
      title: 'Submit & Bind Location',
      desc: 'Click "Create Account" to map your owner profile as the canonical administrator of the active sub-account location.',
      details: [
        'Links your credentials to the GoHighLevel location ID dynamically.',
        'Initializes your wallet with 10 free trial SMS credits.',
      ],
    },
  ];

  const signInSteps = [
    {
      icon: LogIn,
      color: 'text-purple-500',
      badge: 'Sign In Step 1',
      title: 'Navigate to Sign In',
      desc: 'Click the "Sign In" link at the bottom of the registration view if your location was previously configured.',
      details: [
        'Switches the view from registration to returning owner authentication.',
        'Preserves existing location mappings and historical credit records.',
      ],
    },
    {
      icon: Key,
      color: 'text-amber-500',
      badge: 'Sign In Step 2',
      title: 'Authenticate Credentials',
      desc: 'Enter your registered owner email address and password, then click "Sign In" to resume your workspace session.',
      details: [
        'Verifies location ownership token and logs into your dashboard.',
        'Loads active credit balance, Sender IDs, and contact indexes.',
      ],
    },
  ];

  return (
    <div className="w-full space-y-12 pb-10">

      {/* INTRO */}
      <section id="create-signin-intro" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">What this guide covers</h2>
        <p className="text-[14.5px] leading-7 text-slate-700 dark:text-slate-300">
          NOLA SMS Pro operates natively inside your GoHighLevel sub-account, but requires a secure location-level administrator profile to manage credit wallets, billing details, and custom Sender ID requests.
        </p>
        <p className="text-[14.5px] leading-7 text-slate-700 dark:text-slate-300">
          Depending on whether NOLA SMS Pro has been previously configured for your HighLevel sub-account location, choose either to register a new owner profile or sign in with existing owner credentials.
        </p>
      </section>

      {/* DECISION SETUP PATHS */}
      <section id="create-signin-decision" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Select your setup path</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/30">
            <UserPlus className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500" />
            <div>
              <p className="text-[14px] font-black text-slate-900 dark:text-white">First time on this location?</p>
              <p className="text-[12.5px] text-slate-500 dark:text-slate-400 mt-1">
                Follow the <strong>Create Account</strong> path to register the location owner profile and claim 10 trial credits.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/30">
            <LogIn className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
            <div>
              <p className="text-[14px] font-black text-slate-900 dark:text-white">Already configured?</p>
              <p className="text-[12.5px] text-slate-500 dark:text-slate-400 mt-1">
                Use the <strong>Sign In</strong> path to access existing credit balances, settings, and Sender IDs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DUPLICATE ACCOUNT WARNING */}
      <section id="create-signin-warning">
        <div className="flex items-start gap-3.5 rounded-xl border border-amber-200 bg-amber-50/40 px-5 py-4 dark:border-amber-900/40 dark:bg-amber-950/10">
          <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600 dark:text-amber-400" />
          <div>
            <p className="text-[13.5px] font-black text-amber-800 dark:text-amber-300 uppercase tracking-wide mb-1">
              Do not create duplicate accounts
            </p>
            <p className="text-[13px] leading-relaxed text-amber-700 dark:text-amber-400 font-medium">
              If a location is already registered, always sign in with the original owner credentials. Registering a duplicate account for an already-registered location is blocked to preserve credit balances and historical logs.
            </p>
          </div>
        </div>
      </section>

      {/* PATH A: CREATE ACCOUNT STEPS */}
      <section id="create-account-workflow" className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400">
            <UserPlus className="h-4 w-4" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Path A: Create Account steps</h2>
        </div>
        <div className="space-y-8">
          {createAccountSteps.map((step, idx) => {
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

      {/* PATH B: SIGN IN STEPS */}
      <section id="sign-in-workflow" className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400">
            <LogIn className="h-4 w-4" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Path B: Sign In steps</h2>
        </div>
        <div className="space-y-8">
          {signInSteps.map((step, idx) => {
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

      {/* EXPECTED OUTCOME */}
      <section id="create-signin-outcome">
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/40 px-5 py-4 dark:border-emerald-800/40 dark:bg-emerald-900/10">
          <CheckCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
          <div>
            <p className="text-[13.5px] font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-wide mb-0.5">Expected outcome</p>
            <p className="text-[13.5px] leading-relaxed text-emerald-700 dark:text-emerald-400 font-medium">
              After logging in or completing registration, NOLA SMS Pro binds your user profile to the active sub-account location ID and redirects you to the dashboard verification screen.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
