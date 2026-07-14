import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Zap, MessageSquare, CreditCard, Settings,
  ShieldCheck, Search, CheckCircle, Star
} from 'lucide-react';

interface HomeProps {
  onSearchClick: () => void;
}

const quickLinks = [
  {
    icon: <Zap className="h-5 w-5 text-[#334155]" />,
    title: 'Install NOLA SMS Pro',
    desc: 'Connect the correct HighLevel location.',
    href: '/docs/marketplace-install',
  },
  {
    icon: <MessageSquare className="h-5 w-5 text-violet-500" />,
    title: 'Send Your First SMS',
    desc: 'Check credits, sender, contact, and status.',
    href: '/docs/first-sms-checklist',
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-emerald-500" />,
    title: 'Sender ID',
    desc: 'Request a custom brand name for your texts.',
    href: '/docs/sender-id',
  },
  {
    icon: <CreditCard className="h-5 w-5 text-amber-500" />,
    title: 'SMS Credits',
    desc: 'Check your balance and request a refill.',
    href: '/docs/sms-credits',
  },
  {
    icon: <Settings className="h-5 w-5 text-slate-500" />,
    title: 'Settings',
    desc: 'Review profile, notifications, and location.',
    href: '/docs/settings',
  },
  {
    icon: <CheckCircle className="h-5 w-5 text-[#475569]" />,
    title: 'Troubleshooting',
    desc: 'Fix common issues with login, sending, and credits.',
    href: '/docs/troubleshooting',
  },
];

const popularArticles = [
  { title: 'Install NOLA SMS Pro from HighLevel', href: '/docs/marketplace-install' },
  { title: 'Send your first SMS', href: '/docs/first-sms-checklist' },
  { title: 'Use the default NOLASMSPro sender', href: '/docs/sender-id' },
  { title: 'Check Message History after sending', href: '/docs/message-history' },
];

export const Home: React.FC<HomeProps> = ({ onSearchClick }) => {
  return (
    <div className="space-y-14">

      {/* Hero */}
      <section className="pt-4">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#334155] dark:text-[#475569] uppercase tracking-wider mb-5">
          <Star className="h-3.5 w-3.5 fill-current opacity-70" />
          <span>NOLA SMS Pro · User Knowledge Base</span>
        </div>

        <h1 className="text-[32px] md:text-[44px] font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight mb-5">
          Everything you need to{' '}
          <br className="hidden sm:block" />
          <span className="text-[#334155] dark:text-[#475569]">use NOLA SMS Pro.</span>
        </h1>

        <p className="text-[16px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl mb-8">
          Step-by-step guides for sending messages, managing contacts, requesting Sender IDs,
          and keeping your SMS credits topped up - all without technical knowledge.
        </p>

        {/* CTA row */}
        <div className="flex flex-wrap gap-3">
          <Link
            to="/docs/marketplace-install"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#334155] hover:bg-[#1E293B] text-white text-[13px] font-semibold rounded-lg transition-colors shadow-sm"
          >
            Get started <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            onClick={onSearchClick}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-[#475569]/40 text-[13px] font-semibold rounded-lg transition-colors"
          >
            <Search className="h-4 w-4" />
            Search docs
          </button>
        </div>
      </section>

      {/* Quick links grid */}
      <section>
        <h2 className="text-[13px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">
          Browse by Topic
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickLinks.map((card) => (
            <Link
              key={card.href}
              to={card.href}
              className="group flex items-start gap-3.5 p-4 rounded-xl border border-slate-100 dark:border-slate-800/60 hover:border-[#475569]/30 dark:hover:border-[#475569]/25 hover:bg-[#F1F5F9]/10 dark:hover:bg-[#334155]/5 bg-white dark:bg-slate-900/30 transition-all duration-150"
            >
              <div className="mt-0.5 flex-shrink-0 w-9 h-9 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-center">
                {card.icon}
              </div>
              <div className="min-w-0">
                <p className="text-[14px] font-semibold text-slate-800 dark:text-slate-200 group-hover:text-[#334155] dark:group-hover:text-[#475569] transition-colors leading-snug">
                  {card.title}
                </p>
                <p className="text-[12px] text-slate-400 dark:text-slate-500 leading-snug mt-0.5">
                  {card.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular articles */}
      <section>
        <h2 className="text-[13px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">
          Popular Articles
        </h2>
        <div className="divide-y divide-slate-100 dark:divide-slate-800/60 border border-slate-100 dark:border-slate-800/60 rounded-xl overflow-hidden bg-white dark:bg-slate-900/30">
          {popularArticles.map((article) => (
            <Link
              key={article.href}
              to={article.href}
              className="group flex items-center justify-between px-4 py-3.5 hover:bg-[#F1F5F9]/10 dark:hover:bg-[#334155]/5 transition-colors"
            >
              <span className="text-[14px] font-medium text-slate-700 dark:text-slate-300 group-hover:text-[#334155] dark:group-hover:text-[#475569] transition-colors">
                {article.title}
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600 group-hover:text-[#475569] flex-shrink-0 ml-3 group-hover:translate-x-0.5 transition-all" />
            </Link>
          ))}
        </div>
      </section>

      {/* Support CTA */}
      <section className="flex items-start gap-4 p-5 rounded-xl border border-slate-100 dark:border-slate-800/60 bg-slate-50/60 dark:bg-slate-900/30">
        <div className="w-9 h-9 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center flex-shrink-0">
          <MessageSquare className="h-4.5 w-4.5 text-[#334155] dark:text-[#475569]" />
        </div>
        <div>
          <p className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">
            Can't find what you're looking for?
          </p>
          <p className="text-[13px] text-slate-500 dark:text-slate-400 mt-0.5">
            Submit a support ticket and the NOLA team will get back to you.
          </p>
          <a
            href="mailto:support@nolasmspro.com"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#334155] dark:text-[#475569] mt-2 hover:underline"
          >
            Email Support <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>

    </div>
  );
};
