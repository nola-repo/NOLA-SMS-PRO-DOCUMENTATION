import React from 'react';
import { ArrowRight, Check, X } from 'lucide-react';

export const DocSection: React.FC<{
  id: string;
  children: React.ReactNode;
  className?: string;
}> = ({ id, children, className = '' }) => (
  <section
    id={id}
    className={`doc-section scroll-mt-[304px] lg:scroll-mt-[190px] ${className}`}
  >
    {children}
  </section>
);

export const DocSectionHeading: React.FC<{
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
}> = ({ eyebrow, children, className = '' }) => (
  <div className={`mb-6 ${className}`}>
    {eyebrow && (
      <p className="doc-eyebrow">{eyebrow}</p>
    )}
    <h2 className="doc-section-title">{children}</h2>
  </div>
);

export const DocBody: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <p className={`doc-body ${className}`}>{children}</p>
);

export const SplitLayout: React.FC<{
  children: React.ReactNode;
  visual: React.ReactNode;
  reverse?: boolean;
  className?: string;
}> = ({ children, visual, reverse = false, className = '' }) => (
  <div
    className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-12 ${reverse ? 'lg:[&>*:first-child]:order-2' : ''} ${className}`}
  >
    <div className="min-w-0">{children}</div>
    <div className="min-w-0">{visual}</div>
  </div>
);

export const HighlightPills: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="mt-5 flex flex-wrap gap-2">
    {items.map((item) => (
      <li
        key={item}
        className="badge-accent"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#334155] dark:bg-[#CBD5E1]" />
        {item}
      </li>
    ))}
  </ul>
);

export const StatGrid: React.FC<{
  items: { label: string; value: string }[];
}> = ({ items }) => (
  <dl className="mt-6 grid gap-3 sm:grid-cols-2">
    {items.map((item) => (
      <div
        key={item.label}
        className="rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 dark:border-[#1E293B] dark:bg-[#111827] shadow-sm shadow-[#0F172A]/3"
      >
        <dt className="doc-eyebrow !mb-0.5">{item.label}</dt>
        <dd className="text-[14px] font-bold text-[#0F172A] dark:text-white">
          {item.value}
        </dd>
      </div>
    ))}
  </dl>
);

export const InlineCallout: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <div className="mt-6 rounded-xl border-l-4 border-[#334155] bg-gradient-to-r from-[#F1F5F9]/70 to-white/10 px-5 py-4 dark:border-[#CBD5E1] dark:from-[#1E293B]/40 shadow-sm shadow-[#0F172A]/3">
    <p className="doc-eyebrow !mb-1.5">{title}</p>
    <p className="doc-body !mb-0 !leading-relaxed text-[13.5px]">{children}</p>
  </div>
);

/* NEW: Reusable Feature Card Component */
export const FeatureCard: React.FC<{
  title: string;
  description: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  ctaText?: string;
}> = ({ title, description, icon, onClick, ctaText = 'Preview' }) => {
  const CardWrapper = onClick ? 'button' : 'div';
  return (
    <CardWrapper
      {...(onClick ? { type: 'button', onClick } : {})}
      className={`text-left premium-card group flex flex-col h-full w-full ${onClick ? 'cursor-pointer' : ''}`}
    >
      {icon && (
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#F1F5F9] text-[#334155] transition-colors group-hover:bg-[#334155] group-hover:text-white dark:bg-[#1E293B] dark:text-[#CBD5E1] dark:group-hover:bg-[#CBD5E1] dark:group-hover:text-[#020617]">
          {icon}
        </div>
      )}
      <h3 className="text-[15px] font-black text-[#0F172A] group-hover:text-[#334155] dark:text-white dark:group-hover:text-[#CBD5E1]">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-[13px] leading-5 text-[#475569] dark:text-slate-350">
        {description}
      </p>
      {onClick && (
        <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-[0.12em] text-[#334155] dark:text-[#CBD5E1]">
          {ctaText} <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </span>
      )}
    </CardWrapper>
  );
};

/* NEW: Reusable Interactive Comparison Table */
export const ComparisonTable: React.FC<{
  title: string;
  traditionalTitle: string;
  nolaTitle: string;
  traditionalItems: string[];
  nolaItems: string[];
}> = ({ title, traditionalTitle, nolaTitle, traditionalItems, nolaItems }) => (
  <div className="my-6">
    {title && <h3 className="mb-4 text-[14px] font-black text-[#0F172A] dark:text-white uppercase tracking-wider">{title}</h3>}
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-2xl border border-rose-100 bg-rose-50/20 p-5 dark:border-rose-950/20 dark:bg-rose-950/5">
        <h4 className="mb-3 text-[13px] font-black text-rose-700 dark:text-rose-455 uppercase tracking-wider flex items-center gap-2">
          <X className="h-4 w-4" /> {traditionalTitle}
        </h4>
        <ul className="space-y-2.5">
          {traditionalItems.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-[13px] leading-5 text-slate-600 dark:text-slate-400">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-rose-400 dark:bg-rose-600" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-emerald-150 bg-emerald-50/20 p-5 dark:border-emerald-950/25 dark:bg-emerald-950/5 shadow-sm shadow-[#334155]/3">
        <h4 className="mb-3 text-[13px] font-black text-emerald-700 dark:text-emerald-450 uppercase tracking-wider flex items-center gap-2">
          <Check className="h-4 w-4" /> {nolaTitle}
        </h4>
        <ul className="space-y-2.5">
          {nolaItems.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-[13px] leading-5 text-slate-800 dark:text-slate-300">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

/* NEW: Workflow Flowchart / Diagram Block */
export const WorkflowDiagram: React.FC<{
  steps: { title: string; desc: string }[];
}> = ({ steps }) => (
  <div className="my-6">
    <div className="relative">
      <div className="absolute left-[15px] top-0 hidden h-full w-0.5 bg-[#E2E8F0] dark:bg-[#1E293B] lg:block" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((step, index) => (
          <div key={step.title} className="relative rounded-xl border border-[#E2E8F0] bg-white p-4 dark:border-[#1E293B] dark:bg-[#111827] shadow-sm shadow-[#0F172A]/3 transition-colors hover:border-[#475569]">
            <span className="mb-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#334155] text-[10px] font-black text-white dark:bg-[#CBD5E1] dark:text-[#020617]">
              {index + 1}
            </span>
            <h4 className="text-[13px] font-black text-[#0F172A] dark:text-white">{step.title}</h4>
            <p className="mt-1 text-[12px] leading-5 text-[#64748B] dark:text-slate-400">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* NEW: Before vs After Comparison Panel */
export const BeforeAfterComparison: React.FC<{
  beforeTitle: string;
  beforeDesc: string;
  afterTitle: string;
  afterDesc: string;
}> = ({ beforeTitle, beforeDesc, afterTitle, afterDesc }) => (
  <div className="grid gap-6 md:grid-cols-2 my-6">
    <div className="rounded-2xl border border-rose-100 bg-rose-50/10 p-5 dark:border-rose-955/20 dark:bg-rose-950/5">
      <h4 className="text-[13px] font-black text-rose-700 dark:text-rose-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
        <X className="h-4 w-4" /> {beforeTitle}
      </h4>
      <p className="text-[13px] leading-relaxed text-[#64748B] dark:text-slate-400">{beforeDesc}</p>
    </div>
    <div className="rounded-2xl border border-emerald-250 bg-emerald-50/10 p-5 dark:border-emerald-950/20 dark:bg-emerald-950/5">
      <h4 className="text-[13px] font-black text-emerald-700 dark:text-emerald-450 uppercase tracking-wider mb-2 flex items-center gap-1.5">
        <Check className="h-4 w-4" /> {afterTitle}
      </h4>
      <p className="text-[13px] leading-relaxed text-slate-800 dark:text-slate-300">{afterDesc}</p>
    </div>
  </div>
);

/* NEW: Workflow Timeline Layout */
export const WorkflowTimeline: React.FC<{
  steps: { title: string; desc: string }[];
}> = ({ steps }) => (
  <div className="relative my-8 pl-6 border-l-2 border-slate-100 dark:border-slate-900/40 ml-4 space-y-8">
    {steps.map((step, idx) => (
      <div key={idx} className="relative">
        <div className="absolute -left-[35px] top-0 flex h-6 w-6 items-center justify-center rounded-full bg-[#334155] text-white dark:bg-[#CBD5E1] dark:text-[#020617] text-[10px] font-black shadow-md">
          {idx + 1}
        </div>
        <h4 className="text-[14px] font-black text-[#0F172A] dark:text-white leading-none mb-1.5">{step.title}</h4>
        <p className="text-[12.5px] leading-relaxed text-[#64748B] dark:text-slate-400">{step.desc}</p>
      </div>
    ))}
  </div>
);

/* NEW: Dashboard Screenshot Callout Layout */
export const DashboardCallouts: React.FC<{
  mockup: React.ReactNode;
  callouts: { title: string; desc: string }[];
}> = ({ mockup, callouts }) => (
  <div className="grid gap-8 lg:grid-cols-12 my-6 items-start">
    <div className="lg:col-span-7">
      {mockup}
    </div>
    <div className="lg:col-span-5 space-y-4">
      {callouts.map((item, idx) => (
        <div key={idx} className="flex gap-3 rounded-xl border border-[#E2E8F0] bg-white p-4 dark:border-[#1E293B] dark:bg-[#111827] shadow-sm shadow-[#0F172A]/2">
          <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-[#F1F5F9] text-[11px] font-black text-[#334155] dark:bg-[#1E293B] dark:text-[#E2E8F0]">
            {idx + 1}
          </span>
          <div>
            <h4 className="text-[13px] font-black text-[#0F172A] dark:text-white mb-0.5">{item.title}</h4>
            <p className="text-[12px] leading-relaxed text-[#64748B] dark:text-slate-400">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* NEW: Alternating Image/Text Step List Layout */
export const AlternatingSection: React.FC<{
  steps: { title: string; desc: string; mockup: React.ReactNode }[];
}> = ({ steps }) => (
  <div className="space-y-12 my-8">
    {steps.map((step, idx) => {
      const isEven = idx % 2 === 0;
      return (
        <div key={idx} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className={isEven ? 'lg:order-1' : 'lg:order-2'}>
            <div className="flex gap-4">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-xl bg-[#F1F5F9] text-[12px] font-black text-[#334155] dark:bg-[#1E293B] dark:text-[#E2E8F0] border border-[#CBD5E1] dark:border-slate-900/50">
                {idx + 1}
              </span>
              <div>
                <h4 className="text-[15px] font-black text-[#0F172A] dark:text-white mb-2">{step.title}</h4>
                <p className="text-[13.5px] leading-relaxed text-[#475569] dark:text-slate-350">{step.desc}</p>
              </div>
            </div>
          </div>
          <div className={isEven ? 'lg:order-2' : 'lg:order-1'}>
            {step.mockup}
          </div>
        </div>
      );
    })}
  </div>
);

/* NEW: Benefits Grid Cards Layout */
export const BenefitsGrid: React.FC<{
  benefits: { title: string; desc: string; highlight?: boolean }[];
}> = ({ benefits }) => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 my-6">
    {benefits.map((item, idx) => (
      <div key={idx} className={`rounded-2xl border p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 ${
        item.highlight 
          ? 'border-slate-200 bg-gradient-to-br from-slate-50 to-white dark:border-slate-900/40 dark:from-[#1E293B]/30 dark:to-[#111827]' 
          : 'border-[#E2E8F0] bg-white dark:border-[#1E293B] dark:bg-[#111827]'
      }`}>
        <h4 className="text-[14px] font-black text-[#0F172A] dark:text-white mb-1.5 uppercase tracking-wider">{item.title}</h4>
        <p className="text-[12.5px] leading-relaxed text-[#64748B] dark:text-slate-450">{item.desc}</p>
      </div>
    ))}
  </div>
);
