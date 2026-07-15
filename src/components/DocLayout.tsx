import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { DocSearch } from './DocSearch';
import { type DocPage } from '../data/docsData';
import {
  Menu, Sun, Moon, Search, ChevronRight,
  ArrowUp, LifeBuoy
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface DocLayoutProps {
  children: React.ReactNode;
  page: DocPage;
}


export const DocLayout: React.FC<DocLayoutProps> = ({ children, page }) => {
  const { theme, toggleTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeHeading, setActiveHeading] = useState('');

  // Global Ctrl+K and custom event listeners
  useEffect(() => {
    const handleOpenSearch = () => setIsSearchOpen(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('open-nola-search', handleOpenSearch);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('open-nola-search', handleOpenSearch);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Generate Table of Contents items dynamically based on page fields
  const tocItems: { id: string; label: string }[] = [];
  if (page.id === 'welcome') {
    tocItems.push({ id: 'about-heading', label: 'About' });
    tocItems.push({ id: 'what-you-can-do-heading', label: 'What You Can Do' });
    tocItems.push({ id: 'quick-start-heading', label: 'Fastest Path' });
    tocItems.push({ id: 'browse-heading', label: 'Browse by Topic' });
    tocItems.push({ id: 'before-start-heading', label: 'Before You Start' });
  } else {
    if (page.purpose) tocItems.push({ id: `${page.id}-what-is-this`, label: 'Overview & Goal' });
    if (page.whyItMatters) tocItems.push({ id: `${page.id}-why-is-it-important`, label: 'Value & Impact' });
    if (page.prerequisites && page.prerequisites.length > 0) tocItems.push({ id: `${page.id}-prerequisites`, label: 'Pre-flight Checklist' });
    if (page.steps && page.steps.length > 0) tocItems.push({ id: `${page.id}-how-do-i-use-it`, label: 'Step-by-Step' });
    if (page.expectAfter) tocItems.push({ id: `${page.id}-expect-after`, label: 'Next State & Outcome' });

    const hasFaqOrTips = (page.tips && page.tips.length > 0) ||
      (page.warnings && page.warnings.length > 0) ||
      (page.notes && page.notes.length > 0) ||
      (page.commonIssues && page.commonIssues.length > 0) ||
      (page.faqs && page.faqs.length > 0) ||
      page.hasTicketForm;
    if (hasFaqOrTips) {
      tocItems.push({ id: `${page.id}-faq-and-tips`, label: 'Troubleshooting & Advice' });
    }
  }

  // ScrollSpy observer
  useEffect(() => {
    const headings = tocItems.map(item => document.getElementById(item.id));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -60% 0px', threshold: 0.1 }
    );

    headings.forEach((heading) => {
      if (heading) observer.observe(heading);
    });

    return () => {
      headings.forEach((heading) => {
        if (heading) observer.unobserve(heading);
      });
    };
  }, [tocItems, page.id]);



  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] transition-colors duration-200 dark:bg-[#020617] dark:text-slate-100 flex flex-col">

      {/* â”€â”€ TOP NAV BAR (Figma Style) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <header className="sticky top-0 z-40 w-full bg-white dark:bg-[#020617] border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Left: Brand Logo & version */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link to="/docs/welcome" className="flex items-center gap-2">
              <img src="/logo.png" alt="NOLA Logo" className="h-8 w-8 object-contain rounded-lg" />
              <span className="text-[16px] font-black text-[#0F172A] dark:text-white tracking-tight">
                NOLA SMS <span className="text-[#334155] dark:text-[#CBD5E1]">Pro</span>
              </span>
            </Link>
            <span className="hidden sm:inline-flex px-2 py-0.5 text-[10px] font-bold bg-[#F1F5F9] dark:bg-[#1E293B] text-[#334155] dark:text-[#CBD5E1] rounded-full">
              v1.0.0
            </span>
          </div>

          {/* Center: Search pill */}
          <div className="flex-1 max-w-lg hidden md:block">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#111827] text-left text-sm text-slate-400 dark:text-slate-500 hover:border-[#334155]/40 dark:hover:border-[#CBD5E1]/40 transition-all shadow-sm"
            >
              <Search className="h-4 w-4 text-[#334155] dark:text-[#CBD5E1]" />
              <span className="flex-1">Search docs, guides, api references...</span>
              <kbd className="h-5 inline-flex items-center gap-0.5 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-2 font-mono text-[9px] font-medium text-slate-400">
                Ctrl K
              </kbd>
            </button>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={toggleTheme}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-900 dark:border-slate-800 dark:bg-[#020617] dark:text-slate-400 dark:hover:border-slate-700 dark:hover:text-slate-100"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* ── SUB-HEADER ROW (Figma style) ────────────────────── */}
      <div className="sticky top-16 z-30 w-full border-b border-slate-200/80 bg-white/88 px-4 py-2.5 text-xs shadow-sm shadow-slate-200/40 backdrop-blur-xl transition-colors duration-200 dark:border-slate-800/80 dark:bg-[#020617]/88 dark:shadow-none">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-2.5">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:text-slate-900 dark:border-slate-800 dark:bg-[#020617] dark:text-slate-400 dark:hover:text-slate-100 lg:hidden"
              aria-label="Open navigation"
            >
              <Menu className="h-4 w-4" />
            </button>

            <nav className="flex min-w-0 items-center gap-1.5 overflow-hidden rounded-full border border-slate-200 bg-white px-2.5 py-1.5 font-semibold text-slate-500 dark:border-slate-800 dark:bg-[#111827] dark:text-slate-400">
              <span className="hidden sm:inline">Docs</span>
              <ChevronRight className="hidden h-3 w-3 flex-shrink-0 text-slate-300 dark:text-slate-600 sm:block" />
              <span className="hidden sm:inline capitalize">{page.section.toLowerCase()}</span>
              {page.subsection && (
                <>
                  <ChevronRight className="hidden h-3 w-3 flex-shrink-0 text-slate-300 dark:text-slate-600 sm:block" />
                  <span className="hidden sm:inline">{page.subsection}</span>
                </>
              )}
              <ChevronRight className="h-3 w-3 flex-shrink-0 text-slate-300 dark:text-slate-600" />
              <span className="truncate text-slate-900 dark:text-slate-100">{page.title}</span>
            </nav>
          </div>

          <div className="flex flex-shrink-0 items-center gap-2">
            <a
              href="#/docs/support-help"
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 font-bold text-slate-600 transition-colors hover:text-slate-955 dark:border-slate-800 dark:bg-[#111827] dark:text-slate-300 dark:hover:text-white"
            >
              <LifeBuoy className="h-3.5 w-3.5" />
              <span>Support</span>
            </a>
          </div>
        </div>
      </div>

      <div className="flex-1 flex w-full max-w-[1600px] mx-auto min-h-0">

        {/* Column 1: Left Sidebar */}
        <Sidebar
          isOpenOnMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Column 2: Main Document Pane */}
        <main className="flex-1 min-w-0 px-4 md:px-8 py-6 overflow-y-auto scroll-smooth">
          {children}
        </main>

        {/* Column 3: Right Sidebar (On this page) */}
        {tocItems.length > 0 && (
          <aside className="w-[250px] shrink-0 sticky top-[7.25rem] h-[calc(100vh-7.25rem)] overflow-y-auto hidden xl:block border-l border-slate-200 dark:border-slate-800 py-6 pl-5 text-xs text-slate-500 dark:text-slate-400">
            {/* Heading */}
            <h4 className="font-black text-[#0F172A] dark:text-white uppercase tracking-wider mb-4 text-[10px]">
              On this page
            </h4>

            {/* List */}
            <ul className="space-y-3.5 relative border-l border-slate-100 dark:border-slate-800/60 ml-1.5 pl-3">
              {tocItems.map((item) => {
                const isActive = activeHeading === item.id;
                return (
                  <li key={item.id} className="relative">
                    {isActive && (
                      <span className="absolute -left-[16px] top-[2px] h-[14px] w-1 rounded-r-md bg-[#334155] dark:bg-[#CBD5E1]" />
                    )}
                    <a
                      href={`#${item.id}`}
                      className={`block font-semibold transition-colors leading-relaxed ${isActive
                          ? 'text-[#334155] dark:text-[#CBD5E1] font-bold'
                          : 'hover:text-slate-800 dark:hover:text-slate-200'
                        }`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Back to top */}
            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800/60">
              <button
                onClick={scrollToTop}
                className="flex items-center gap-1.5 font-bold hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
              >
                <ArrowUp className="h-3.5 w-3.5" />
                <span>Back to top</span>
              </button>
            </div>
          </aside>
        )}
      </div>

      {/* Global Search Modal */}
      <DocSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};
