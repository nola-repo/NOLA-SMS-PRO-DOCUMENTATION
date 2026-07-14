import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  q: string;
  a: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="overflow-hidden rounded-lg border border-[#E2E8F0] bg-white dark:border-[#1E293B] dark:bg-[#020617]">
      {items.map((item, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div key={idx}>
            <button
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              className={`flex w-full items-center justify-between gap-4 border-b border-[#E2E8F0] px-5 py-4 text-left transition-colors last:border-b-0 dark:border-[#1E293B]
                ${isOpen
                  ? 'bg-[#F1F5F9] dark:bg-[#1E293B]'
                  : 'bg-white hover:bg-[#F8FAFC] dark:bg-[#020617] dark:hover:bg-[#111827]'
                }`}
            >
              <span className="text-[14px] font-medium text-slate-800 dark:text-slate-200 leading-snug">
                {item.q}
              </span>
              <ChevronDown
                className={`h-4 w-4 flex-shrink-0 text-slate-400 transition-transform duration-200
                  ${isOpen ? 'rotate-180 text-[#334155] dark:text-[#475569]' : ''}`}
              />
            </button>
            {isOpen && (
              <div className="border-b border-[#E2E8F0] bg-[#F8FAFC] px-5 pb-4 pt-2 dark:border-[#1E293B] dark:bg-[#111827]">
                <p className="text-[14px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.a}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
