import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import type { RelatedPage } from '../../data/docsData';
import { sidebarStructure } from '../../data/docsData';

interface RelatedPagesProps {
  relatedPages?: RelatedPage[];
  currentId: string;
}

function getNextPageId(currentId: string): { id: string; title: string } | null {
  const allItems = sidebarStructure.flatMap((section) => section.items);
  const currentIndex = allItems.findIndex((item) => item.id === currentId);
  if (currentIndex === -1 || currentIndex >= allItems.length - 1) return null;
  return allItems[currentIndex + 1];
}

export const RelatedPages: React.FC<RelatedPagesProps> = ({ relatedPages, currentId }) => {
  const nextPage = getNextPageId(currentId);

  if ((!relatedPages || relatedPages.length === 0) && !nextPage) return null;

  return (
    <div className="mt-12 space-y-6">
      {relatedPages && relatedPages.length > 0 && (
        <section>
          <p className="doc-eyebrow mb-4">Related</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {relatedPages.map((page) => (
              <Link
                key={page.id}
                to={`/docs/${page.id}`}
                className="group flex items-center justify-between gap-3 rounded-xl border border-[#E2E8F0] bg-white px-5 py-4 transition-all hover:border-[#475569] hover:shadow-md hover:shadow-[#0F172A]/8 dark:border-[#1E293B] dark:bg-[#111827] dark:hover:border-[#CBD5E1]"
              >
                <span className="text-[14px] font-bold text-[#0F172A] group-hover:text-[#334155] dark:text-white dark:group-hover:text-[#CBD5E1]">
                  {page.title}
                </span>
                <ChevronRight className="h-4 w-4 flex-shrink-0 text-[#94A3B8] transition-transform group-hover:translate-x-0.5 group-hover:text-[#334155] dark:group-hover:text-[#CBD5E1]" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {nextPage && (
        <Link
          to={`/docs/${nextPage.id}`}
          className="group flex items-center justify-between gap-4 rounded-2xl border border-[#CBD5E1] bg-gradient-to-r from-[#F1F5F9]/80 to-white px-6 py-5 transition-all hover:border-[#475569] hover:shadow-lg hover:shadow-[#0F172A]/10 dark:border-[#475569] dark:from-[#1E293B]/40 dark:to-[#111827] dark:hover:border-[#CBD5E1]"
        >
          <div>
            <p className="doc-eyebrow mb-1">Continue reading</p>
            <p className="text-[16px] font-black text-[#0F172A] dark:text-white">
              {nextPage.title}
            </p>
          </div>
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#334155] text-white transition-transform group-hover:translate-x-0.5 dark:bg-[#CBD5E1] dark:text-[#020617]">
            <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
      )}
    </div>
  );
};
