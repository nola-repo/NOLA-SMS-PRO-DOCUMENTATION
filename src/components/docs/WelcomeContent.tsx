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
} from 'lucide-react';
import illustrationImg from '../../assets/illustration.png';

/* ─── Block 2 — What You Can Do ─────────────────────── */
const outcomes = [
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: 'Send SMS from inside HighLevel',
    desc: 'Messages dispatch directly from the same workspace your contacts live in — no tab switching, no exports.',
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: 'Reach PH mobile numbers reliably',
    desc: 'Globe, Smart, and DITO are covered by local carrier routing for fast, compliant delivery at local rates.',
  },
  {
    icon: <History className="h-6 w-6" />,
    title: 'Keep every message on record',
    desc: 'Delivery logs, credit usage, and full message history are tracked and visible from one place — always.',
  },
];

/* ─── Block 3 — Browse by Topic ─────────────────────── */
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

      {/* ── BLOCK 1 — Opening ───────────────────────────── */}
      <section className="grid gap-8 lg:grid-cols-12 items-center">
        {/* Body Text */}
        <div className="lg:col-span-7 space-y-4 text-[15px] font-medium leading-7 text-[#425B7D] dark:text-slate-300">
          <p>
            NOLA SMS Pro is a native SMS platform built directly inside your HighLevel
            sub-account. It lets you send text messages to Philippine mobile numbers without leaving your CRM, without exporting
            contact lists, and without switching tools.
          </p>
          <p>
            This documentation covers everything from initial setup to daily messaging
            operations. Start from the beginning, or jump to the section you need.
          </p>
        </div>
        {/* Illustration Image */}
        <div className="lg:col-span-5 flex justify-center">
          <img
            src={illustrationImg}
            alt="Welcome to NOLA SMS Pro Illustration"
            className="w-full max-w-[480px] lg:max-w-none rounded-2xl border border-[#BCD7F5] bg-white p-1.5 shadow-md shadow-[#184B8F]/8 dark:border-[#1F3D68] dark:bg-[#0B1627]"
          />
        </div>
      </section>

      {/* ── BLOCK 2 — What You Can Do ───────────────────── */}
      <section aria-labelledby="what-you-can-do-heading">
        <h3
          id="what-you-can-do-heading"
          className="text-[11px] font-black uppercase tracking-[0.18em] text-[#1F5AAE] dark:text-[#72A8FF] mb-5"
        >
          What you can do
        </h3>
        <div className="grid gap-5 sm:grid-cols-3">
          {outcomes.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-[#D7E7FA] bg-white p-6 shadow-sm shadow-[#184B8F]/4 dark:border-[#183354] dark:bg-[#0B1627]"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F3FF] text-[#1F5AAE] dark:bg-[#102B4F] dark:text-[#72A8FF]">
                {item.icon}
              </div>
              <h4 className="text-[15px] font-black text-[#071A33] dark:text-white leading-snug">
                {item.title}
              </h4>
              <p className="mt-2 text-[13px] leading-[1.65] text-[#5D7596] dark:text-slate-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BLOCK 3 — Browse by Topic ───────────────────── */}
      <section aria-labelledby="browse-heading">
        <p
          id="browse-heading"
          className="text-[11px] font-black uppercase tracking-[0.18em] text-[#1F5AAE] dark:text-[#72A8FF] mb-5"
        >
          Browse by topic
        </p>
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
              className="group flex flex-col rounded-2xl border border-[#D7E7FA] bg-white p-5 shadow-sm shadow-[#184B8F]/4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#4F8EF7] hover:shadow-md hover:shadow-[#184B8F]/10 dark:border-[#183354] dark:bg-[#0B1627] dark:hover:border-[#72A8FF]"
              aria-label={`Browse ${sec.title} — ${sec.count}`}
            >
              {/* Icon + badge row */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F3FF] text-[#1F5AAE] transition-colors group-hover:bg-[#1F5AAE] group-hover:text-white dark:bg-[#102B4F] dark:text-[#72A8FF] dark:group-hover:bg-[#72A8FF] dark:group-hover:text-[#07111F]">
                  {sec.icon}
                </div>
                <span className="rounded-full border border-[#BCD7F5] bg-[#F4F9FF] px-2.5 py-1 text-[11px] font-bold text-[#5D7596] dark:border-[#1F3D68] dark:bg-[#0B1627] dark:text-slate-400">
                  {sec.count}
                </span>
              </div>

              {/* Title & desc */}
              <h4 className="text-[15px] font-black leading-tight text-[#071A33] group-hover:text-[#1F5AAE] dark:text-white dark:group-hover:text-[#72A8FF]">
                {sec.title}
              </h4>
              <p className="mt-2 flex-1 text-[13px] leading-[1.65] text-[#5D7596] dark:text-slate-400">
                {sec.desc}
              </p>

              {/* CTA */}
              <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-[#1F5AAE] dark:text-[#72A8FF]">
                Start reading
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── BLOCK 4 — Before You Start ──────────────────── */}
      <section aria-labelledby="before-start-heading">
        <p
          id="before-start-heading"
          className="text-[11px] font-black uppercase tracking-[0.18em] text-[#1F5AAE] dark:text-[#72A8FF] mb-4"
        >
          Before you start
        </p>
        <div className="rounded-2xl border border-[#BCD7F5] border-l-4 border-l-[#1F5AAE] bg-gradient-to-r from-[#E8F3FF]/60 to-white p-6 shadow-sm shadow-[#184B8F]/4 dark:border-[#1F3D68] dark:border-l-[#72A8FF] dark:from-[#102B4F]/35 dark:to-[#07111F]">
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
              <span className="text-[14px] font-medium leading-relaxed text-[#0B2E63] dark:text-slate-200">
                An active HighLevel account with sub-account administrator access.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
              <span className="text-[14px] font-medium leading-relaxed text-[#0B2E63] dark:text-slate-200">
                Permission to install third-party apps from the HighLevel Marketplace.
              </span>
            </li>
          </ul>
          <p className="mt-4 text-[12.5px] leading-relaxed text-[#5D7596] dark:text-slate-400 border-t border-[#D7E7FA] pt-4 dark:border-[#183354]">
            If you do not have the above, ask your HighLevel agency owner to grant
            sub-account access before proceeding.
          </p>
        </div>
      </section>

      {/* ── BLOCK 5 — Closing + CTA ─────────────────────── */}
      <section aria-labelledby="closing-heading">
        <p className="text-[15px] font-medium leading-7 text-[#425B7D] dark:text-slate-300 max-w-[720px]">
          Ready to set up? The next guide walks you through installing NOLA SMS Pro
          from the HighLevel Marketplace — it takes less than 5 minutes.
        </p>

        {/* Next Page CTA */}
        <Link
          to="/docs/what-is-nola-sms-pro"
          id="welcome-next-cta"
          className="group mt-6 inline-flex items-center gap-3 rounded-2xl border border-[#4F8EF7]/30 bg-gradient-to-r from-[#1F5AAE] to-[#3B7FE0] px-6 py-4 text-white shadow-lg shadow-[#184B8F]/20 transition-all duration-200 hover:shadow-xl hover:shadow-[#184B8F]/30 hover:opacity-95"
        >
          <span className="flex flex-col">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#B8D8FF]">
              Next guide
            </span>
            <span className="mt-0.5 text-[15px] font-black leading-tight">
              What is NOLA SMS Pro?
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
  );
};

