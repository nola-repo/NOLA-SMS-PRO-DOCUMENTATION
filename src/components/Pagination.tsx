import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getNextAndPrevPages, sidebarStructure, docsData } from '../data/docsData';

interface PaginationProps {
  currentId: string;
  isMergedSection?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({ currentId, isMergedSection }) => {
  let prevLink: { id: string; title: string } | null = null;
  let nextLink: { id: string; title: string } | null = null;

  const currentSectionIndex = sidebarStructure.findIndex(sec => sec.items.some(item => item.id === currentId));
  const currentSection = sidebarStructure[currentSectionIndex];

  if (isMergedSection && currentSection) {
    if (currentSectionIndex > 0) {
      const prevSection = sidebarStructure[currentSectionIndex - 1];
      const prevItem = prevSection.items[prevSection.items.length - 1];
      prevLink = { id: prevItem.id, title: prevSection.title };
    }
    if (currentSectionIndex < sidebarStructure.length - 1) {
      const nextSection = sidebarStructure[currentSectionIndex + 1];
      const nextItem = nextSection.items[0];
      nextLink = { id: nextItem.id, title: nextSection.title };
    }
  } else {
    const { prev, next } = getNextAndPrevPages(currentId);
    prevLink = prev;
    nextLink = next;
  }

  if (!prevLink && !nextLink) return null;

  // Retrieve descriptions
  const prevPage = prevLink ? docsData.find(p => p.id === prevLink!.id) : null;
  const nextPage = nextLink ? docsData.find(p => p.id === nextLink!.id) : null;

  return (
    <nav className="mt-12 grid gap-4 border-t border-slate-200 pt-8 dark:border-slate-800 sm:grid-cols-2" aria-label="Previous and next documentation pages">
      {prevLink ? (
        <Link
          to={`/docs/${prevLink.id}`}
          className="group flex flex-col justify-center rounded-2xl border border-slate-200 bg-[#FBFDFF]/80 p-5 transition-all duration-300 hover:border-[#334155]/35 hover:bg-[#F1F5F9]/30 dark:border-slate-800 dark:bg-[#020617]/30 dark:hover:border-[#CBD5E1]/40 dark:hover:bg-[#1E293B]/10 shadow-sm"
        >
          <div className="flex items-center gap-1.5 font-black text-slate-800 dark:text-white mb-2 text-sm">
            <ArrowLeft className="h-4 w-4 text-[#334155] dark:text-[#CBD5E1] transition-transform group-hover:-translate-x-0.5" />
            <span>{prevLink.title}</span>
          </div>
          {prevPage?.description && (
            <p className="text-xs text-slate-450 dark:text-slate-400 leading-relaxed font-semibold">
              {prevPage.description}
            </p>
          )}
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}

      {nextLink ? (
        <Link
          to={`/docs/${nextLink.id}`}
          className="group flex flex-col justify-center rounded-2xl border border-slate-200 bg-[#FBFDFF]/80 p-5 transition-all duration-300 hover:border-[#334155]/35 hover:bg-[#F1F5F9]/30 dark:border-slate-800 dark:bg-[#020617]/30 dark:hover:border-[#CBD5E1]/40 dark:hover:bg-[#1E293B]/10 shadow-sm"
        >
          <div className="flex items-center justify-between font-black text-slate-800 dark:text-white mb-2 text-sm">
            <span>{nextLink.title}</span>
            <ArrowRight className="h-4 w-4 text-[#334155] dark:text-[#CBD5E1] transition-transform group-hover:translate-x-0.5" />
          </div>
          {nextPage?.description && (
            <p className="text-xs text-slate-450 dark:text-slate-400 leading-relaxed font-semibold">
              {nextPage.description}
            </p>
          )}
        </Link>
      ) : null}
    </nav>
  );
};
