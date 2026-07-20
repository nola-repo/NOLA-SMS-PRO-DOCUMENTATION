import React from 'react';
import type { DocPage } from '../../data/docsData';
import { DocSection } from './layout';
import { Link } from 'react-router-dom';
import { ArrowRight, Edit3, BookOpen, Tag, FolderOpen, AlertTriangle, CheckCheck } from 'lucide-react';

interface Props { page: DocPage; }

const createSteps = [
  { n: 1, title: 'Open Templates Panel', desc: 'Select Message Templates from the left navigation.' },
  { n: 2, title: 'Click Create Template', desc: 'Start a new template from the templates dashboard.' },
  { n: 3, title: 'Name & Categorize', desc: 'Enter a descriptive name and assign a category for easy organization.' },
  { n: 4, title: 'Write Content', desc: 'Write the message using clear, professional, and natural language.' },
  { n: 5, title: 'Save Template', desc: 'Click Save Template to store it in your library.' },
];

const useSteps = [
  { n: 1, title: 'Open Compose SMS', desc: 'Start composing a message from the Compose SMS panel.' },
  { n: 2, title: 'Open Templates Selector', desc: 'Click the Templates button inside the composer.' },
  { n: 3, title: 'Browse & Select', desc: 'Search or browse templates by category, then select to insert.' },
];

const bestPractices = [
  {
    icon: <Tag className="h-4 w-4" />,
    title: 'Personalization',
    desc: 'Use variables like {{contact.first_name}} to dynamically resolve contact data when the template loads in the composer.',
  },
  {
    icon: <FolderOpen className="h-4 w-4" />,
    title: 'Categorization',
    desc: 'Organize templates into folders by intent (Booking Confirmations, Support, Reminders) for fast discovery.',
  },
  {
    icon: <BookOpen className="h-4 w-4" />,
    title: 'Compliance',
    desc: 'Write natural, context-appropriate language. Avoid filler phrases that carrier spam filters flag as automated.',
  },
];

export const MessageTemplatesContent: React.FC<Props> = ({ page }) => {
  return (
    <div className="w-full space-y-12 pb-10">



      {/* INTRO */}
      <section id="templates-intro" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">What this guide covers</h2>
        <p className="text-[14.5px] leading-7 text-slate-700 dark:text-slate-300">
          Create, edit, and organize reusable message templates to streamline customer communications and reduce repetitive manual typing. Templates integrate directly into the Compose SMS panel.
        </p>
      </section>

      {/* TWO-TRACK: CREATE + USE */}
      <section id="templates-tracks" className="space-y-5">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Template workflows</h2>
        <div className="grid gap-6 lg:grid-cols-2">

          {/* CREATE TRACK */}
          <div className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#111827] overflow-hidden shadow-sm">
            <div className="flex items-center gap-2.5 bg-slate-50/50 border-b border-slate-200 px-5 py-4 dark:bg-slate-900/30 dark:border-slate-800">
              <Edit3 className="h-4 w-4 text-slate-500" />
              <p className="text-[13.5px] font-black text-slate-900 dark:text-white uppercase tracking-wider">Create a template</p>
            </div>
            <div className="p-5 space-y-4">
              {createSteps.map((step) => (
                <div key={step.n} className="flex gap-3">
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 text-[10px] font-black mt-0.5">
                    {step.n}
                  </span>
                  <div>
                    <p className="text-[13.5px] font-bold text-slate-900 dark:text-white leading-tight">{step.title}</p>
                    <p className="text-[12.5px] leading-relaxed text-slate-500 dark:text-slate-400 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* USE TRACK */}
          <div className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#111827] overflow-hidden shadow-sm">
            <div className="flex items-center gap-2.5 bg-slate-50/50 border-b border-slate-200 px-5 py-4 dark:bg-slate-900/30 dark:border-slate-800">
              <BookOpen className="h-4 w-4 text-slate-500" />
              <p className="text-[13.5px] font-black text-slate-900 dark:text-white uppercase tracking-wider">Use a template</p>
            </div>
            <div className="p-5 space-y-4">
              {useSteps.map((step) => (
                <div key={step.n} className="flex gap-3">
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 text-[10px] font-black mt-0.5">
                    {step.n}
                  </span>
                  <div>
                    <p className="text-[13.5px] font-bold text-slate-900 dark:text-white leading-tight">{step.title}</p>
                    <p className="text-[12.5px] leading-relaxed text-slate-500 dark:text-slate-400 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}

              <div className="flex items-start gap-3.5 rounded-xl border border-amber-200 bg-amber-50/40 px-4 py-3 dark:border-amber-900/40 dark:bg-amber-950/10 my-1">
                <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600 dark:text-amber-400" />
                <p className="text-[12.5px] leading-relaxed text-amber-800 dark:text-amber-300 font-semibold">
                  Avoid repetitive phrases like "test message". Carrier filters may block content that appears automated.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BEST PRACTICES CARDS */}
      <section id="templates-best-practices" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Best practices</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {bestPractices.map((item) => (
            <div key={item.title} className="premium-card flex flex-col justify-between h-full">
              <div>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                  {item.icon}
                </div>
                <h3 className="text-[14px] font-black text-slate-900 dark:text-white uppercase tracking-wider mb-2">{item.title}</h3>
                <p className="text-[12.5px] leading-relaxed text-slate-500 dark:text-slate-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SUCCESS */}
      <section id="templates-outcome">
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/40 px-5 py-4 dark:border-emerald-800/40 dark:bg-emerald-900/10">
          <CheckCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
          <p className="text-[13.5px] leading-relaxed text-emerald-700 dark:text-emerald-400 font-medium">
            Saved templates are immediately available from the template selector in Compose SMS, allowing messages to be drafted more efficiently and consistently.
          </p>
        </div>
      </section>


    </div>
  );
};
