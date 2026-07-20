import React, { useEffect, useRef, useLayoutEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BookOpen, ChevronDown, ChevronRight, HelpCircle, X,
  MessageSquare, CreditCard, Rocket, Wrench, LayoutDashboard,
  ShieldCheck, History, Settings, Compass, Info, Workflow, Zap,
  Send, Store, UserPlus, ArrowRightLeft, Users, FileText
} from 'lucide-react';
import { sidebarStructure } from '../data/docsData';

interface SidebarProps {
  isOpenOnMobile: boolean;
  onCloseMobile: () => void;
}

const SECTION_ICONS: Record<string, React.ReactNode> = {
  OVERVIEW: <BookOpen className="h-4 w-4 shrink-0" />,
  SETUP: <Rocket className="h-4 w-4 shrink-0" />,
  MESSAGING: <MessageSquare className="h-4 w-4 shrink-0" />,
  WORKFLOW: <Workflow className="h-4 w-4 shrink-0" />,
  ACCOUNT: <CreditCard className="h-4 w-4 shrink-0" />,
  SUPPORT: <HelpCircle className="h-4 w-4 shrink-0" />,
};

const SUB_PAGE_ICONS: Record<string, React.ReactNode> = {
  overview: <Compass className="h-3.5 w-3.5 shrink-0" />,
  'what-is-nola-sms-pro': <Info className="h-3.5 w-3.5 shrink-0" />,
  'how-nola-sms-pro-works': <Wrench className="h-3.5 w-3.5 shrink-0" />,
  'core-features': <LayoutDashboard className="h-3.5 w-3.5 shrink-0" />,
  'send-your-first-sms': <Send className="h-3.5 w-3.5 shrink-0" />,
  'install-nola-sms-pro': <Store className="h-3.5 w-3.5 shrink-0" />,
  'create-or-sign-in': <UserPlus className="h-3.5 w-3.5 shrink-0" />,
  'connect-highlevel': <ArrowRightLeft className="h-3.5 w-3.5 shrink-0" />,
  'dashboard-overview': <LayoutDashboard className="h-3.5 w-3.5 shrink-0" />,
  contacts: <Users className="h-3.5 w-3.5 shrink-0" />,
  'compose-sms': <MessageSquare className="h-3.5 w-3.5 shrink-0" />,
  'message-templates': <FileText className="h-3.5 w-3.5 shrink-0" />,
  'sender-ids': <ShieldCheck className="h-3.5 w-3.5 shrink-0" />,
  'message-history': <History className="h-3.5 w-3.5 shrink-0" />,
  'sms-credits': <CreditCard className="h-3.5 w-3.5 shrink-0" />,
  settings: <Settings className="h-3.5 w-3.5 shrink-0" />,
  troubleshooting: <Wrench className="h-3.5 w-3.5 shrink-0" />,
  'support-help': <HelpCircle className="h-3.5 w-3.5 shrink-0" />,
  faq: <HelpCircle className="h-3.5 w-3.5 shrink-0" />,
  automation: <Zap className="h-3.5 w-3.5 shrink-0" />,
  'ghl-conversation': <ArrowRightLeft className="h-3.5 w-3.5 shrink-0" />,
};

const getFigmaHeader = (title: string) => {
  switch (title) {
    case 'OVERVIEW': return 'Intro';
    case 'SETUP': return 'Getting started';
    case 'MESSAGING': return 'Messaging';
    case 'WORKFLOW': return 'Workflow';
    case 'ACCOUNT': return 'Account';
    case 'SUPPORT': return 'Support';
    default: return title;
  }
};

export const Sidebar: React.FC<SidebarProps> = ({ isOpenOnMobile, onCloseMobile }) => {
  const location = useLocation();
  const activeId = location.pathname.split('/docs/')[1] || 'overview';

  // Persist scroll position across re-renders using a module-level ref
  // (not inside SidebarContent component to avoid remount issues)
  const navScrollRef = useRef<HTMLDivElement>(null);
  const savedScrollTop = useRef<number>(0);
  const activeItemRef = useRef<HTMLAnchorElement>(null);

  // Track collapse/expand states for folders
  const [collapsed, setCollapsed] = React.useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    sidebarStructure.forEach((section) => {
      const hasActive = section.items.some((item) => item.id === activeId);
      if (!hasActive) {
        initial[section.title] = true;
      }
    });
    return initial;
  });

  const toggle = (title: string) => {
    setCollapsed((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  // Auto-expand the section containing the active item
  useEffect(() => {
    sidebarStructure.forEach((section) => {
      const hasActive = section.items.some((item) => item.id === activeId);
      if (hasActive && collapsed[section.title]) {
        setCollapsed((prev) => ({ ...prev, [section.title]: false }));
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  // Restore saved scroll position synchronously before paint (prevents flash)
  useLayoutEffect(() => {
    if (navScrollRef.current) {
      navScrollRef.current.scrollTop = savedScrollTop.current;
    }
  });

  // After route change: scroll the active item into view within the sidebar
  // without jumping to top — block:'nearest' only moves if item is off-screen
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (activeItemRef.current && navScrollRef.current) {
        const container = navScrollRef.current;
        const item = activeItemRef.current;
        const containerRect = container.getBoundingClientRect();
        const itemRect = item.getBoundingClientRect();

        // Only scroll if item is outside the visible area of the container
        if (itemRect.top < containerRect.top || itemRect.bottom > containerRect.bottom) {
          item.scrollIntoView({ block: 'nearest', behavior: 'instant' });
          // Save the new scroll position
          savedScrollTop.current = container.scrollTop;
        }
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [activeId]);

  // Build the nav items JSX inline (not as an inner component) to prevent remounting
  const navItems = (
    <div
      ref={navScrollRef}
      onScroll={(e) => {
        // Continuously save scroll position as user scrolls
        savedScrollTop.current = (e.currentTarget as HTMLDivElement).scrollTop;
      }}
      className="flex-1 overflow-y-auto px-3 py-4 space-y-4"
    >
      <div className="space-y-2">
        <Link
          ref={activeId === 'overview' ? activeItemRef : undefined}
          to="/docs/overview"
          onClick={onCloseMobile}
          className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-black transition-all ${
            activeId === 'overview'
              ? 'bg-[#F1F5F9] text-[#334155] shadow-sm dark:bg-[#1E293B] dark:text-[#CBD5E1]'
              : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800/30 dark:hover:text-white'
          }`}
        >
          <span className={activeId === 'overview' ? 'text-[#334155] dark:text-[#CBD5E1]' : 'text-slate-400 dark:text-slate-500'}>
            <Compass className="h-4 w-4 shrink-0" />
          </span>
          <span>Overview</span>
        </Link>
      </div>

      {/* Collapsible Section Folders */}
      <div className="space-y-5">
        {sidebarStructure.map((section) => {
          const isCollapsed = collapsed[section.title] ?? false;
          const hasActive = section.items.some((item) => item.id === activeId);

          return (
            <div key={section.title} className="space-y-1.5">
              <button
                onClick={() => toggle(section.title)}
                className={`flex w-full items-center justify-between px-3 py-1 text-left transition-colors font-bold text-xs uppercase tracking-wider ${
                  hasActive
                    ? 'text-[#0F172A] dark:text-slate-200'
                    : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className={hasActive ? 'text-[#334155] dark:text-[#CBD5E1]' : 'text-slate-400 dark:text-slate-500'}>
                    {SECTION_ICONS[section.title]}
                  </span>
                  <span>{getFigmaHeader(section.title)}</span>
                </span>
                {isCollapsed ? (
                  <ChevronRight className="h-3 w-3 text-slate-400" />
                ) : (
                  <ChevronDown className="h-3 w-3 text-slate-400" />
                )}
              </button>

              {!isCollapsed && (
                <div className="pl-3.5 space-y-1 border-l border-slate-100 dark:border-slate-800/80 ml-5">
                  {section.items.map((item) => {
                    const isActive = item.id === activeId;
                    return (
                      <Link
                        key={item.id}
                        ref={isActive ? activeItemRef : undefined}
                        to={`/docs/${item.id}`}
                        onClick={onCloseMobile}
                        className={`relative flex items-center gap-2 px-3.5 py-2 text-xs font-semibold leading-relaxed transition-all rounded-full ${
                          isActive
                            ? 'bg-[#F1F5F9] dark:bg-[#1E293B] text-[#334155] dark:text-[#CBD5E1] font-bold'
                            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/40 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/20'
                        }`}
                      >
                        <span className="opacity-75">{SUB_PAGE_ICONS[item.id] || <BookOpen className="h-3.5 w-3.5 shrink-0" />}</span>
                        <span>{item.title}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="h-full w-[292px] flex-shrink-0 hidden lg:flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#020617] z-10 transition-colors duration-200">
        {navItems}
      </aside>

      {/* Mobile sidebar */}
      {isOpenOnMobile && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <button
            className="absolute inset-0 bg-[#020617]/60 backdrop-blur-sm"
            onClick={onCloseMobile}
          />
          <div className="relative z-50 h-full w-[292px] max-w-[85vw] shadow-2xl bg-white dark:bg-[#020617] border-r border-slate-200 dark:border-slate-800 animate-slide-in flex flex-col">
            {/* Mobile-only header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex-shrink-0">
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="Logo" className="h-7 w-7 object-contain rounded" />
                <span className="font-black text-[#0F172A] dark:text-white text-sm">NOLA SMS Pro</span>
              </div>
              <button
                onClick={onCloseMobile}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {/* Shared nav items — separate scroll container for mobile */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
              <div className="space-y-2">
                <Link
                  to="/docs/overview"
                  onClick={onCloseMobile}
                  className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-black transition-all ${
                    activeId === 'overview'
                      ? 'bg-[#F1F5F9] text-[#334155] shadow-sm dark:bg-[#1E293B] dark:text-[#CBD5E1]'
                      : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800/30 dark:hover:text-white'
                  }`}
                >
                  <span className={activeId === 'overview' ? 'text-[#334155] dark:text-[#CBD5E1]' : 'text-slate-400 dark:text-slate-500'}>
                    <Compass className="h-4 w-4 shrink-0" />
                  </span>
                  <span>Overview</span>
                </Link>
              </div>
              <div className="space-y-5">
                {sidebarStructure.map((section) => {
                  const isCollapsed = collapsed[section.title] ?? false;
                  const hasActive = section.items.some((item) => item.id === activeId);
                  return (
                    <div key={section.title} className="space-y-1.5">
                      <button
                        onClick={() => toggle(section.title)}
                        className={`flex w-full items-center justify-between px-3 py-1 text-left transition-colors font-bold text-xs uppercase tracking-wider ${
                          hasActive
                            ? 'text-[#0F172A] dark:text-slate-200'
                            : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className={hasActive ? 'text-[#334155] dark:text-[#CBD5E1]' : 'text-slate-400 dark:text-slate-500'}>
                            {SECTION_ICONS[section.title]}
                          </span>
                          <span>{getFigmaHeader(section.title)}</span>
                        </span>
                        {isCollapsed ? (
                          <ChevronRight className="h-3 w-3 text-slate-400" />
                        ) : (
                          <ChevronDown className="h-3 w-3 text-slate-400" />
                        )}
                      </button>
                      {!isCollapsed && (
                        <div className="pl-3.5 space-y-1 border-l border-slate-100 dark:border-slate-800/80 ml-5">
                          {section.items.map((item) => {
                            const isActive = item.id === activeId;
                            return (
                              <Link
                                key={item.id}
                                to={`/docs/${item.id}`}
                                onClick={onCloseMobile}
                                className={`relative flex items-center gap-2 px-3.5 py-2 text-xs font-semibold leading-relaxed transition-all rounded-full ${
                                  isActive
                                    ? 'bg-[#F1F5F9] dark:bg-[#1E293B] text-[#334155] dark:text-[#CBD5E1] font-bold'
                                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/40 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/20'
                                }`}
                              >
                                <span className="opacity-75">{SUB_PAGE_ICONS[item.id] || <BookOpen className="h-3.5 w-3.5 shrink-0" />}</span>
                                <span>{item.title}</span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
