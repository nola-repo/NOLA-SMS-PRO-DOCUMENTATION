import React, { useState, useEffect, useMemo, useRef } from 'react';
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

const customPageTocItems: Record<string, { id: string; label: string }[]> = {
  'install-nola-sms-pro': [
    { id: 'install-intro', label: 'What This Covers' },
    { id: 'install-prerequisites', label: 'Before You Begin' },
    { id: 'install-steps', label: 'Installation Steps' },
    { id: 'install-outcome', label: 'Expected Outcome' },
  ],
  'create-or-sign-in': [
    { id: 'create-signin-decision', label: 'New or Returning?' },
    { id: 'create-signin-warning', label: 'Important Note' },
    { id: 'create-signin-paths', label: 'Choose Your Path' },
    { id: 'create-signin-outcome', label: 'Expected Outcome' },
  ],
  'connect-highlevel': [
    { id: 'connect-intro', label: 'What This Covers' },
    { id: 'connect-status-reference', label: 'Status Indicators' },
    { id: 'connect-prerequisites', label: 'Before You Begin' },
    { id: 'connect-verification-steps', label: 'Verification Steps' },
    { id: 'connect-diagnostic-tip', label: 'Troubleshooting' },
    { id: 'connect-outcome', label: 'Expected Outcome' },
  ],
  'dashboard-overview': [
    { id: 'dashboard-key-objective', label: 'Overview' },
    { id: 'dashboard-prerequisites', label: 'Prerequisites' },
    { id: 'dashboard-highlights', label: 'Key Features' },
    { id: 'menu-breakdown', label: 'Menu Breakdown' },
    { id: 'dashboard-expected-outcome', label: 'Expected Outcome' },
  ],
  'send-your-first-sms': [
    { id: 'send-preflight', label: 'Pre-flight Checklist' },
    { id: 'send-oneway-note', label: 'One-way Messaging' },
    { id: 'send-steps', label: 'Sending Steps' },
    { id: 'send-spam-warning', label: 'Spam Warning' },
    { id: 'send-status-legend', label: 'Delivery Status' },
    { id: 'send-outcome', label: 'Expected Outcome' },
  ],
  contacts: [
    { id: 'contacts-overview', label: 'Module Overview' },
    { id: 'contacts-prerequisites', label: 'Prerequisites' },
    { id: 'contacts-workflows', label: 'Workflows' },
    { id: 'contacts-validation', label: 'Phone Validation' },
    { id: 'contacts-outcome', label: 'Expected Outcome' },
  ],
  'compose-sms': [
    { id: 'compose-field-reference', label: 'Field Reference' },
    { id: 'compose-prerequisites', label: 'Prerequisites' },
    { id: 'compose-steps', label: 'Compose & Send' },
    { id: 'compose-encoding', label: 'Character & Credits' },
    { id: 'compose-warning', label: 'Delivery Warning' },
    { id: 'compose-outcome', label: 'Expected Outcome' },
  ],
  'message-templates': [
    { id: 'templates-intro', label: 'Overview' },
    { id: 'templates-tracks', label: 'Workflows' },
    { id: 'templates-best-practices', label: 'Best Practices' },
    { id: 'templates-outcome', label: 'Expected Outcome' },
  ],
  'sender-ids': [
    { id: 'sender-ids-lifecycle', label: 'Status Lifecycle' },
    { id: 'sender-ids-prerequisite', label: 'Prerequisites' },
    { id: 'sender-ids-request-steps', label: 'Request Workflow' },
    { id: 'sender-ids-format-rules', label: 'Format Rules' },
    { id: 'sender-ids-outcome', label: 'Expected Outcome' },
  ],
  'message-history': [
    { id: 'history-status-legend', label: 'Delivery Status' },
    { id: 'history-prerequisite', label: 'Prerequisites' },
    { id: 'history-audit-steps', label: 'Audit Steps' },
    { id: 'history-filter-tips', label: 'Filter Tips' },
    { id: 'history-outcome', label: 'Expected Outcome' },
  ],
  automation: [
    { id: 'automation-architecture', label: 'How It Works' },
    { id: 'automation-prerequisites', label: 'Prerequisites' },
    { id: 'automation-steps', label: 'Setup Steps' },
    { id: 'automation-variables', label: 'Variable Reference' },
    { id: 'automation-best-practices', label: 'Best Practices' },
    { id: 'automation-outcome', label: 'Expected Outcome' },
  ],
  'ghl-conversation': [
    { id: 'ghl-conversation-intro', label: 'Overview' },
    { id: 'ghl-conversation-comparison', label: 'Manual vs. Sync' },
    { id: 'ghl-conversation-prerequisites', label: 'Prerequisites' },
    { id: 'ghl-conversation-sync-steps', label: 'Verify Sync' },
    { id: 'ghl-conversation-health', label: 'Health Tips' },
    { id: 'ghl-conversation-outcome', label: 'Expected Outcome' },
  ],
  'sms-credits': [
    { id: 'credits-packages', label: 'Credit Packages' },
    { id: 'credits-prerequisite', label: 'Prerequisites' },
    { id: 'credits-workflows', label: 'Workflows' },
    { id: 'credits-consumption-rule', label: 'Consumption Rule' },
    { id: 'credits-outcome', label: 'Expected Outcome' },
  ],
  settings: [
    { id: 'settings-overview', label: 'Panel Overview' },
    { id: 'settings-prerequisite', label: 'Prerequisites' },
    { id: 'settings-workflows', label: 'Workflows' },
    { id: 'settings-location-warning', label: 'Critical Warning' },
    { id: 'settings-tips', label: 'Tips' },
    { id: 'settings-outcome', label: 'Expected Outcome' },
  ],
  troubleshooting: [
    { id: 'troubleshooting-intro', label: 'Self-Service Diagnostics' },
    { id: 'troubleshooting-prerequisites', label: 'Prerequisites' },
    { id: 'troubleshooting-cards', label: 'Common Issues' },
    { id: 'quick-diagnostics-checklist', label: 'Quick Checklist' },
    { id: 'troubleshooting-expected-outcome', label: 'Expected Outcome' },
  ],
  'support-help': [
    { id: 'support-intro', label: 'Overview' },
    { id: 'support-prerequisites', label: 'Prerequisites' },
    { id: 'support-categories', label: 'Ticket Categories' },
    { id: 'support-submit-steps', label: 'Submitting a Ticket' },
    { id: 'support-required-checklist', label: 'Required Details' },
    { id: 'support-tracking-steps', label: 'Track Progress' },
    { id: 'support-expected-outcome', label: 'Expected Outcome' },
  ],
  faq: [
    { id: 'faq-intro', label: 'Overview' },
    { id: 'faq-topic-groups', label: 'All Questions' },
    { id: 'faq-need-more-help', label: 'Need More Help?' },
    { id: 'faq-expected-outcome', label: 'Expected Outcome' },
  ],
};

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

  // Generate Table of Contents items — memoised so the array reference is stable
  const tocItems = useMemo<{ id: string; label: string }[]>(() => {
    const items: { id: string; label: string }[] = [];
    if (page.id === 'overview') {
      items.push({ id: 'about-heading', label: 'About' });
      items.push({ id: 'what-you-can-do-heading', label: 'What You Can Do' });
      items.push({ id: 'quick-start-heading', label: 'Fastest Path' });
      items.push({ id: 'browse-heading', label: 'Browse by Topic' });
      items.push({ id: 'before-start-heading', label: 'Before You Start' });
    } else if (page.id === 'what-is-nola-sms-pro') {
      items.push({ id: 'what-is-overview', label: 'Overview' });
      items.push({ id: 'what-is-value', label: 'Key Business Value' });
      items.push({ id: 'what-is-carriers', label: 'Supported Carriers' });
    } else if (page.id === 'how-nola-sms-pro-works') {
      items.push({ id: 'how-it-works-gateway', label: 'Gateway Architecture' });
      items.push({ id: 'how-it-works-rules', label: 'Credits & Formatting' });
      items.push({ id: 'how-it-works-flow', label: 'Message Flow' });
    } else if (page.id === 'core-features') {
      items.push({ id: 'core-features-modules', label: 'Functional Modules' });
      items.push({ id: 'core-features-settings', label: 'Settings & Profiles' });
    } else if (customPageTocItems[page.id]) {
      items.push(...customPageTocItems[page.id]);
    } else {
      if (page.purpose) items.push({ id: `${page.id}-what-is-this`, label: 'Overview & Goal' });
      if (page.whyItMatters) items.push({ id: `${page.id}-why-is-it-important`, label: 'Value & Impact' });
      if (page.prerequisites && page.prerequisites.length > 0) items.push({ id: `${page.id}-prerequisites`, label: 'Pre-flight Checklist' });
      if (page.steps && page.steps.length > 0) items.push({ id: `${page.id}-how-do-i-use-it`, label: 'Step-by-Step' });
      if (page.expectAfter) items.push({ id: `${page.id}-expect-after`, label: 'Next State & Outcome' });
    }
    return items;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page.id]);

  // Keep a ref so scroll handler always reads the latest tocItems without re-registering
  const tocItemsRef = useRef(tocItems);
  useEffect(() => {
    tocItemsRef.current = tocItems;
  }, [tocItems]);

  const mainRef = React.useRef<HTMLDivElement>(null);



  // ScrollSpy — registers once per page navigation, reads tocItems via ref (no stale closure)
  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    // Reset scroll & active heading when navigating to a new page
    main.scrollTop = 0;
    setActiveHeading('');

    const handleScroll = () => {
      const items = tocItemsRef.current;
      const headings = items
        .map(item => ({ id: item.id, element: document.getElementById(item.id) }))
        .filter((h): h is { id: string; element: HTMLElement } => h.element !== null);

      if (headings.length === 0) return;

      // At the very top → first item
      if (main.scrollTop <= 10) {
        setActiveHeading(headings[0].id);
        return;
      }

      // At the very bottom → last item
      const isAtBottom = main.scrollHeight - main.scrollTop - main.clientHeight <= 10;
      if (isAtBottom) {
        setActiveHeading(headings[headings.length - 1].id);
        return;
      }

      const mainRect = main.getBoundingClientRect();
      // The "trigger line" is 96px from the top of the scroll container
      const triggerLine = mainRect.top + 96;
      let currentActive = headings[0].id;

      for (const heading of headings) {
        const rect = heading.element.getBoundingClientRect();
        if (rect.top <= triggerLine) {
          currentActive = heading.id;
        } else {
          break;
        }
      }

      setActiveHeading(currentActive);
    };

    main.addEventListener('scroll', handleScroll, { passive: true });

    // Fire after DOM has settled (React has finished rendering page content)
    const t1 = setTimeout(handleScroll, 50);
    const t2 = setTimeout(handleScroll, 300);

    return () => {
      main.removeEventListener('scroll', handleScroll);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  // Only re-register when the page actually changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page.id]);

  const handleTocClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const main = mainRef.current;
    if (!main) return;

    // Welcome first TOC item → scroll to very top
    if (page.id === 'overview' && id === 'about-heading') {
      main.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveHeading(id);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      // Calculate offset relative to main's scrollable area
      const mainRect = main.getBoundingClientRect();
      const elemRect = element.getBoundingClientRect();
      const scrollOffset = elemRect.top - mainRect.top + main.scrollTop - 24;
      main.scrollTo({ top: scrollOffset, behavior: 'smooth' });
      setActiveHeading(id);
      window.history.pushState(null, '', `#${id}`);
    }
  };

  const scrollToTop = () => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const breadcrumbSectionLabel = page.id === 'overview'
    ? null
    : page.section === 'OVERVIEW'
      ? 'Intro'
      : page.section === 'SETUP'
        ? 'Getting started'
        : page.section === 'WORKFLOW'
          ? 'Workflow'
          : page.section.charAt(0) + page.section.slice(1).toLowerCase();
  return (
    <div className="h-screen overflow-hidden bg-[#F8FAFC] text-[#0F172A] transition-colors duration-200 dark:bg-[#020617] dark:text-slate-100 flex flex-col">

      {/* â”€â”€ TOP NAV BAR (Figma Style) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <header className="sticky top-0 z-40 w-full bg-white dark:bg-[#020617] border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Left: Brand Logo & version */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link to="/docs/overview" className="flex items-center gap-2">
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

            {/* Mobile search icon — visible below md breakpoint */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:text-slate-900 dark:border-slate-800 dark:bg-[#020617] dark:text-slate-400 dark:hover:text-slate-100 md:hidden"
              aria-label="Search documentation"
            >
              <Search className="h-4 w-4" />
            </button>

            <nav className="flex min-w-0 items-center gap-1.5 overflow-hidden rounded-full border border-slate-200 bg-white px-2.5 py-1.5 font-semibold text-slate-500 dark:border-slate-800 dark:bg-[#111827] dark:text-slate-400">
              <span className="hidden sm:inline">Docs</span>
              <ChevronRight className="hidden h-3 w-3 flex-shrink-0 text-slate-300 dark:text-slate-600 sm:block" />
              {breadcrumbSectionLabel && (
                <>
                  <span className="hidden sm:inline">{breadcrumbSectionLabel}</span>
                  {page.subsection && (
                    <>
                      <ChevronRight className="hidden h-3 w-3 flex-shrink-0 text-slate-300 dark:text-slate-600 sm:block" />
                      <span className="hidden sm:inline">{page.subsection}</span>
                    </>
                  )}
                  <ChevronRight className="h-3 w-3 flex-shrink-0 text-slate-300 dark:text-slate-600" />
                </>
              )}
              <span className="truncate text-slate-900 dark:text-slate-100">{page.title}</span>
            </nav>
          </div>

          <div className="flex flex-shrink-0 items-center gap-2">
            <Link
              to="/docs/support-help"
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 font-bold text-slate-600 transition-colors hover:text-slate-900 dark:border-slate-800 dark:bg-[#111827] dark:text-slate-300 dark:hover:text-white"
            >
              <LifeBuoy className="h-3.5 w-3.5" />
              <span>Support</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex-1 flex w-full max-w-[1600px] mx-auto overflow-hidden">

        {/* Column 1: Left Sidebar */}
        <Sidebar
          isOpenOnMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Column 2: Main Document Pane */}
        <main ref={mainRef} className="flex-1 min-w-0 px-4 md:px-8 py-6 overflow-y-auto scroll-smooth">
          {children}
        </main>

        {/* Column 3: Right Sidebar (On this page) */}
        {tocItems.length > 0 && (
          <aside className="w-[250px] shrink-0 h-full overflow-y-auto hidden xl:flex flex-col border-l border-slate-200 dark:border-slate-800 py-6 pl-5 text-xs text-slate-500 dark:text-slate-400">
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
                      onClick={(e) => handleTocClick(e, item.id)}
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
