import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  CreditCard,
  HelpCircle,
  History,
  MessageSquare,
  Rocket,
  Smartphone,
  Store,
  UserPlus,
  Send,
  Workflow,
} from 'lucide-react';

/* ─── Block 2 — What You Can Do ─────────────────────── */
const outcomes = [
  {
    icon: <MessageSquare className="h-6 w-6 text-blue-300 dark:text-blue-200" />,
    title: 'Send SMS from inside HighLevel',
    desc: 'Compose, send, and manage SMS conversations without leaving your HighLevel workspace.',
    illustration: (
      <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-6">
        {/* App header bar */}
        <rect x="20" y="16" width="360" height="32" rx="8" fill="#0C1E3A"/>
        <circle cx="40" cy="32" r="10" fill="#112952"/>
        <rect x="58" y="26" width="72" height="8" rx="4" fill="#1a3a60"/>
        <rect x="338" y="24" width="36" height="16" rx="6" fill="#2563EB"/>
        {/* Left bubble */}
        <rect x="20" y="66" width="168" height="40" rx="16" fill="#112952"/>
        <rect x="32" y="78" width="120" height="8" rx="4" fill="#1a3a60"/>
        <rect x="32" y="90" width="80" height="6" rx="3" fill="#1a3a60"/>
        {/* Right bubble (blue) */}
        <rect x="212" y="120" width="168" height="40" rx="16" fill="#1D4ED8"/>
        <rect x="224" y="132" width="110" height="8" rx="4" fill="#93C5FD"/>
        <rect x="224" y="144" width="72" height="6" rx="3" fill="#BFDBFE"/>
        {/* Left bubble 2 */}
        <rect x="20" y="174" width="140" height="32" rx="16" fill="#112952"/>
        <rect x="32" y="186" width="96" height="8" rx="4" fill="#1a3a60"/>
        {/* Input bar */}
        <rect x="20" y="218" width="284" height="20" rx="10" fill="#0C1E3A"/>
        <rect x="312" y="214" width="68" height="26" rx="10" fill="#1D4ED8"/>
        <rect x="324" y="223" width="44" height="8" rx="4" fill="white"/>
      </svg>
    ),
  },
  {
    icon: <Smartphone className="h-6 w-6 text-blue-300 dark:text-blue-200" />,
    title: 'Reach PH mobile numbers reliably',
    desc: 'Send SMS to customers across the Philippines with reliable local delivery.',
    illustration: (
      <div className="w-full h-full flex items-center justify-center gap-4 px-4 py-3">
        <img
          src="/welcome-ph-reliable.png"
          alt="Philippines archipelago map"
          className="h-full max-h-[170px] w-auto object-contain"
        />
        <div className="flex flex-col gap-3 flex-shrink-0">
          {[
            { w1: 72, w2: 48 },
            { w1: 64, w2: 42 },
            { w1: 56, w2: 36 },
          ].map((row, i) => (
            <div key={i} className="flex items-center gap-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-3 py-2 shadow-sm">
              <div className="h-7 w-7 flex-shrink-0 rounded-full bg-emerald-500 flex items-center justify-center">
                <svg viewBox="0 0 14 14" fill="none" className="h-3.5 w-3.5">
                  <path d="M2.5 7L5.5 10L11.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <div className="h-2 rounded-full bg-slate-300 dark:bg-slate-600" style={{ width: row.w1 }} />
                <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-700" style={{ width: row.w2 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    icon: <History className="h-6 w-6 text-blue-300 dark:text-blue-200" />,
    title: 'Keep every message on record',
    desc: 'Access message history, delivery status, and SMS credit activity whenever you need it.',
    illustration: (
      <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-6">
        {/* Table header */}
        <rect x="20" y="14" width="360" height="30" rx="8" fill="#0C1E3A"/>
        <rect x="32" y="23" width="56" height="10" rx="4" fill="#1a3a60"/>
        <rect x="164" y="23" width="48" height="10" rx="4" fill="#1a3a60"/>
        <rect x="296" y="23" width="60" height="10" rx="4" fill="#1a3a60"/>
        {/* Row 1 */}
        <rect x="20" y="52" width="360" height="42" rx="8" fill="#071426"/>
        <circle cx="44" cy="73" r="11" fill="#112952"/>
        <rect x="64" y="65" width="76" height="9" rx="4" fill="#1a3a60"/>
        <rect x="64" y="78" width="52" height="7" rx="3" fill="#0e2340"/>
        <rect x="164" y="69" width="60" height="8" rx="3" fill="#1a3a60"/>
        <rect x="296" y="66" width="72" height="14" rx="7" fill="#064E3B"/>
        <rect x="304" y="70" width="56" height="6" rx="3" fill="#10B981"/>
        {/* Row 2 */}
        <rect x="20" y="100" width="360" height="42" rx="8" fill="#060E1A"/>
        <circle cx="44" cy="121" r="11" fill="#0d2044"/>
        <rect x="64" y="113" width="84" height="9" rx="4" fill="#1a3a60"/>
        <rect x="64" y="126" width="60" height="7" rx="3" fill="#0e2340"/>
        <rect x="164" y="117" width="60" height="8" rx="3" fill="#1a3a60"/>
        <rect x="296" y="114" width="72" height="14" rx="7" fill="#064E3B"/>
        <rect x="304" y="118" width="56" height="6" rx="3" fill="#10B981"/>
        {/* Row 3 */}
        <rect x="20" y="148" width="360" height="42" rx="8" fill="#071426"/>
        <circle cx="44" cy="169" r="11" fill="#112952"/>
        <rect x="64" y="161" width="68" height="9" rx="4" fill="#1a3a60"/>
        <rect x="64" y="174" width="44" height="7" rx="3" fill="#0e2340"/>
        <rect x="164" y="165" width="60" height="8" rx="3" fill="#1a3a60"/>
        <rect x="296" y="162" width="72" height="14" rx="7" fill="#064E3B"/>
        <rect x="304" y="166" width="56" height="6" rx="3" fill="#10B981"/>
        {/* Footer */}
        <rect x="20" y="200" width="100" height="22" rx="8" fill="#0C1E3A"/>
        <rect x="28" y="207" width="84" height="8" rx="3" fill="#1a3a60"/>
        <rect x="296" y="200" width="84" height="22" rx="8" fill="#1D4ED8"/>
        <rect x="308" y="207" width="60" height="8" rx="3" fill="#93C5FD"/>
      </svg>
    ),
  },
];

/* ─── Fastest Path ───────────────────────────────────── */
const quickStart = [
  {
    icon: <Store className="h-5 w-5" />,
    title: 'Install the app',
    desc: 'Authorize NOLA SMS Pro from the HighLevel Marketplace and choose the correct sub-account.',
    href: '/docs/install-nola-sms-pro',
  },
  {
    icon: <UserPlus className="h-5 w-5" />,
    title: 'Set up the owner',
    desc: 'Create or sign in to the owner profile that controls credits, settings, and logs.',
    href: '/docs/create-or-sign-in',
  },
  {
    icon: <Send className="h-5 w-5" />,
    title: 'Send a test SMS',
    desc: 'Use a verified contact, check sender identity, and confirm the final delivery status.',
    href: '/docs/send-your-first-sms',
  },
];

/* ─── Browse by Topic ────────────────────────────────── */
const sections = [
  {
    icon: <BookOpen className="h-5 w-5" />,
    title: 'Overview',
    desc: 'Understand what NOLA SMS Pro is, how it works, and what each module does.',
    count: '4 guides',
    href: '/docs/what-is-nola-sms-pro',
  },
  {
    icon: <Rocket className="h-5 w-5" />,
    title: 'Setup',
    desc: 'Install the app, connect your HighLevel sub-account, and send your first test message.',
    count: '5 guides',
    href: '/docs/install-nola-sms-pro',
  },
  {
    icon: <MessageSquare className="h-5 w-5" />,
    title: 'Messaging',
    desc: 'Manage contacts, compose messages, use saved templates, and track delivery history.',
    count: '5 guides',
    href: '/docs/contacts',
  },
  {
    icon: <Workflow className="h-5 w-5" />,
    title: 'Workflow',
    desc: 'Integrate custom workflow sending actions and sync text conversation logs natively.',
    count: '2 guides',
    href: '/docs/automation',
  },
  {
    icon: <CreditCard className="h-5 w-5" />,
    title: 'Account',
    desc: 'Top up SMS credits, manage your profile, and configure sending defaults.',
    count: '2 guides',
    href: '/docs/sms-credits',
  },
  {
    icon: <HelpCircle className="h-5 w-5" />,
    title: 'Support',
    desc: 'Troubleshoot errors, open support tickets, and browse frequently asked questions.',
    count: '3 guides',
    href: '/docs/troubleshooting',
  },
];

/* ─── Stagger fade-in hook ───────────────────────────── */
function useStaggerVisible(count: number, delayMs = 100) {
  const [visible, setVisible] = useState<boolean[]>(new Array(count).fill(false));
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          for (let i = 0; i < count; i++) {
            setTimeout(() => {
              setVisible((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * delayMs);
          }
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [count, delayMs]);
  return { ref, visible };
}

/* ─── Component ─────────────────────────────────────── */
export const WelcomeContent: React.FC = () => {
  const { ref: sectionRef, visible } = useStaggerVisible(sections.length, 100);

  return (
    <div className="w-full space-y-12 pb-10">

      {/* ── BLOCK 1 — Opening (About) ───────────────────── */}
      <section id="about-heading" className="space-y-4">
        <div className="mb-4">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
            About NOLA SMS Pro
          </h2>
          <p className="text-[14.5px] leading-7 text-slate-600 dark:text-slate-400">
            Learn how this native integrations workspace connects your HighLevel location contacts to local PH carrier networks.
          </p>
        </div>
        <p className="text-[14.5px] leading-7 text-slate-700 dark:text-slate-300">
          NOLA SMS Pro is a native SMS messaging platform designed specifically for HighLevel users, enabling you to communicate with Philippine mobile numbers directly from within your sub-account. Instead of relying on third-party applications, exporting contact lists, or switching between multiple tools, you can manage your SMS campaigns, customer conversations, and messaging history in one centralized workspace. The platform integrates seamlessly with your existing HighLevel environment, making SMS communication a natural extension of your daily workflow.
        </p>
        <p className="text-[14.5px] leading-7 text-slate-700 dark:text-slate-300">
          This documentation is your complete guide to getting started and making the most of NOLA SMS Pro. Whether you're installing the application for the first time, configuring your account, sending your first SMS, managing contacts and templates, or troubleshooting common issues, you'll find step-by-step instructions and best practices throughout each section. If you're new to the platform, we recommend following the guides in order. If you're returning to complete a specific task, you can use the navigation menu to jump directly to the topic you need.
        </p>
      </section>

      {/* ── BLOCK 2 — What You Can Do ───────────────────── */}
      <section aria-labelledby="what-you-can-do-heading" className="space-y-8">
        <div>
          <h2
            id="what-you-can-do-heading"
            className="text-2xl font-black text-slate-900 dark:text-white mb-2"
          >
            What you can do
          </h2>
          <p className="text-[14.5px] leading-7 text-slate-600 dark:text-slate-400">
            A native tool suite engineered for reliable SMS messaging and location contact sync.
          </p>
        </div>

        <div className="space-y-16">
          {outcomes.map((item, idx) => {
            const isEven = idx % 2 === 0;

            const imgCol = (
              <div className="overflow-hidden rounded-2xl border border-blue-900/30 dark:border-blue-950/60 bg-[#060F1E] dark:bg-[#040C18] shadow-sm aspect-video w-full flex items-center justify-center">
                {item.illustration}
              </div>
            );
            const textCol = (
              <div className="space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-900/30 dark:bg-blue-950/50 text-blue-300 dark:text-blue-200 transition-all">
                  {item.icon}
                </div>
                <h4 className="text-[22px] font-black text-slate-900 dark:text-white leading-tight">
                  {item.title}
                </h4>
                <p className="text-[15px] leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
                  {item.desc}
                </p>
              </div>
            );
            return (
              <div key={item.title} className="grid gap-8 lg:grid-cols-2 items-center">
                {isEven ? (
                  <>
                    {imgCol}
                    {textCol}
                  </>
                ) : (
                  <>
                    <div className="lg:hidden">{imgCol}</div>
                    {textCol}
                    <div className="hidden lg:block">{imgCol}</div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── BLOCK 3 — Fastest Path ──────────────────────── */}
      <section aria-labelledby="quick-start-heading" className="space-y-5">
        <div>
          <h2
            id="quick-start-heading"
            className="text-2xl font-black text-slate-900 dark:text-white mb-2"
          >
            Fastest path to first message
          </h2>
          <p className="text-[14.5px] leading-7 text-slate-600 dark:text-slate-400">
            Follow this simple onboarding pathway to complete setup in under 5 minutes.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickStart.map((item, index) => (
            <Link
              key={item.title}
              to={item.href}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#111827] p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-400 dark:hover:border-slate-600 hover:shadow-md h-full"
            >
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100/50 dark:border-slate-800 text-slate-600 dark:text-slate-400 transition-colors group-hover:bg-slate-950 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-slate-950">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-black text-slate-400 dark:text-slate-600">
                    0{index + 1}
                  </span>
                </div>
                <h4 className="text-[16px] font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h4>
                <p className="mt-2 text-[14px] leading-relaxed text-slate-500 dark:text-slate-400">
                  {item.desc}
                </p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-slate-700 dark:text-slate-300">
                Open guide
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── BLOCK 4 — Browse by Topic ───────────────────── */}
      <section aria-labelledby="browse-heading" className="space-y-5">
        <div>
          <h2
            id="browse-heading"
            className="text-2xl font-black text-slate-900 dark:text-white mb-2"
          >
            Browse by topic
          </h2>
          <p className="text-[14.5px] leading-7 text-slate-600 dark:text-slate-400">
            Dive deep into module ecosystems, integration flows, and credits logs.
          </p>
        </div>

        <div
          ref={sectionRef}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {sections.map((sec, i) => (
            <Link
              key={sec.title}
              to={sec.href}
              style={{
                opacity: visible[i] ? 1 : 0,
                transform: visible[i] ? 'translateY(0)' : 'translateY(12px)',
                transition: `opacity 0.35s ease ${i * 100}ms, transform 0.35s ease ${i * 100}ms`,
              }}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#111827] p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-400 dark:hover:border-slate-600 hover:shadow-md h-full"
              aria-label={`Browse ${sec.title} — ${sec.count}`}
            >
              <div>
                {/* Icon + badge row */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100/50 dark:border-slate-800 text-slate-600 dark:text-slate-400 transition-colors group-hover:bg-slate-950 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-slate-950">
                    {sec.icon}
                  </div>
                  <span className="rounded-full border border-slate-200/80 bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                    {sec.count}
                  </span>
                </div>

                {/* Title & desc */}
                <h4 className="text-[16px] font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {sec.title}
                </h4>
                <p className="mt-2 text-[14px] leading-relaxed text-slate-500 dark:text-slate-400">
                  {sec.desc}
                </p>
              </div>

              {/* CTA */}
              <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-slate-700 dark:text-slate-300">
                Start reading
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── BLOCK 5 — Before You Start ──────────────────── */}
      <section aria-labelledby="before-start-heading" className="space-y-5">
        <div>
          <h2
            id="before-start-heading"
            className="text-2xl font-black text-slate-900 dark:text-white mb-2"
          >
            Before you start
          </h2>
          <p className="text-[14.5px] leading-7 text-slate-600 dark:text-slate-400">
            Ensure your GoHighLevel account configuration maps these baseline requirements.
          </p>
        </div>
        <div className="rounded-2xl border border-blue-200 dark:border-blue-900/40 border-l-4 border-l-blue-500 dark:border-l-blue-600 bg-gradient-to-br from-blue-50 to-sky-50/60 dark:from-[#060E1E] dark:to-[#0A1628] p-6 shadow-sm">
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
              <span className="text-[15px] font-semibold leading-relaxed text-slate-800 dark:text-blue-100">
                An active HighLevel account with sub-account administrator access.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
              <span className="text-[15px] font-semibold leading-relaxed text-slate-800 dark:text-blue-100">
                Permission to install third-party apps from the HighLevel Marketplace.
              </span>
            </li>
          </ul>
          <p className="mt-4 text-[13.5px] leading-relaxed text-slate-500 dark:text-blue-300/70 border-t border-blue-100 dark:border-blue-900/50 pt-4">
            If you do not have the above, ask your HighLevel agency owner to grant sub-account access before proceeding.
          </p>
        </div>
      </section>

      {/* ── BLOCK 6 — Closing ───────────────────────────── */}
      <section aria-labelledby="closing-heading">
        <p className="text-[16px] font-medium leading-8 text-[#475569] dark:text-slate-300 max-w-[720px]">
          Ready to set up? The next guide walks you through what NOLA SMS Pro is and the business benefits it delivers.
        </p>

        {/* Version note */}
        <p className="mt-6 text-[12px] text-[#94A3B8] dark:text-slate-500 leading-relaxed">
          This documentation reflects NOLA SMS Pro version 1.0. If your app looks
          different, visit{' '}
          <Link
            to="/docs/support-help"
            className="font-semibold text-[#334155] underline underline-offset-2 dark:text-[#CBD5E1]"
          >
            Support &amp; Help
          </Link>
          .
        </p>
      </section>
    </div>
  );
};
