import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  Moon,
  Rocket,
  Search,
  Sun,
  X,
  MessageSquare,
  CreditCard,
} from 'lucide-react';
import { sidebarStructure } from '../data/docsData';
import { useTheme } from '../context/ThemeContext';

interface SidebarProps {
  onSearchClick: () => void;
  isOpenOnMobile: boolean;
  onCloseMobile: () => void;
}

const SECTION_ICONS: Record<string, React.ReactNode> = {
  OVERVIEW: <BookOpen className="h-4 w-4" />,
  SETUP: <Rocket className="h-4 w-4" />,
  MESSAGING: <MessageSquare className="h-4 w-4" />,
  ACCOUNT: <CreditCard className="h-4 w-4" />,
  SUPPORT: <HelpCircle className="h-4 w-4" />,
};

export const Sidebar: React.FC<SidebarProps> = ({ onSearchClick, isOpenOnMobile, onCloseMobile }) => {
  const location = useLocation();
  const activeId = location.pathname.split('/docs/')[1] || 'welcome';
  const { theme, toggleTheme } = useTheme();

  // Track collapse/expand states for multi-item sections
  const [collapsed, setCollapsed] = React.useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    sidebarStructure.forEach((section) => {
      const hasActive = section.items.some((item) => item.id === activeId);
      // Auto-collapse sections that don't have the active element on initial load
      if (!hasActive && section.items.length > 1 && section.title !== 'INTRODUCTION') {
        initial[section.title] = true;
      }
    });
    return initial;
  });

  const toggle = (title: string) => {
    setCollapsed((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  // Dynamically auto-expand a section when a sub-item becomes active (e.g. through scrollspy)
  useEffect(() => {
    sidebarStructure.forEach((section) => {
      const hasActive = section.items.some((item) => item.id === activeId);
      if (hasActive && collapsed[section.title]) {
        setCollapsed((prev) => ({ ...prev, [section.title]: false }));
      }
    });
  }, [activeId, collapsed]);

  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="flex h-full w-full flex-col border-r border-[#D7E7FA] bg-white dark:border-[#183354] dark:bg-[#07111F]">
      {/* Brand logo container */}
      <div className="flex min-h-[88px] flex-shrink-0 items-center gap-3 border-b border-[#D7E7FA] px-5 dark:border-[#183354]">
        <Link
          to="/docs/welcome"
          className="flex min-w-0 flex-1 items-center gap-3 transition-opacity hover:opacity-85"
          onClick={onCloseMobile}
        >
          <img src="/logo.png" alt="NOLA SMS Pro Logo" className="h-9 w-9 flex-shrink-0 object-contain rounded-lg" />
          <div className="min-w-0">
            <div className="text-[15px] font-black leading-tight text-[#0B2E63] dark:text-white">
              NOLA SMS <span className="text-[#1F5AAE] dark:text-[#72A8FF]">Pro</span>
            </div>
            <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6681A4] dark:text-slate-500">
              Documentation
            </div>
          </div>
        </Link>

        {mobile && (
          <button
            type="button"
            onClick={onCloseMobile}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#5D7596] transition-colors hover:bg-[#EFF6FF] hover:text-[#1F5AAE] dark:text-slate-400 dark:hover:bg-[#10243C] dark:hover:text-[#72A8FF]"
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Global Search shortcut bar */}
      <div className="flex-shrink-0 border-b border-[#D7E7FA] px-4 py-4 dark:border-[#183354]">
        <button
          type="button"
          onClick={onSearchClick}
          className="flex w-full items-center gap-2 rounded-xl border border-[#BCD7F5] bg-[#F4F9FF] px-3.5 py-2.5 text-left text-sm text-[#5D7596] transition-all hover:border-[#4F8EF7] hover:bg-white hover:text-[#0B2E63] hover:shadow-sm hover:shadow-[#184B8F]/5 dark:border-[#1F3D68] dark:bg-[#0B1627] dark:text-slate-400 dark:hover:border-[#4F8EF7] dark:hover:text-slate-100 dark:hover:shadow-none"
        >
          <Search className="h-4 w-4 flex-shrink-0 text-[#1F5AAE] dark:text-[#72A8FF]" />
          <span className="min-w-0 flex-1 truncate">Search documentation</span>
          <kbd className="hidden sm:inline-flex h-5 items-center gap-0.5 rounded border border-[#BCD7F5] bg-white px-1.5 font-mono text-[10px] font-medium text-slate-400 dark:border-slate-800 dark:bg-slate-900">
            Ctrl K
          </kbd>
        </button>
      </div>

      {/* Scroller navigations */}
      <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Documentation navigation">
        <div className="space-y-4">
          {sidebarStructure.map((section) => {
            const isSingleItem = section.items.length === 1;
            const singleItem = section.items[0];
            const isCollapsed = collapsed[section.title] ?? false;
            const hasActive = section.items.some((item) => item.id === activeId);

            if (isSingleItem) {
              const isActive = singleItem.id === activeId;
              return (
                <Link
                  key={section.title}
                  to={`/docs/${singleItem.id}`}
                  onClick={onCloseMobile}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-bold transition-all ${isActive
                      ? 'bg-[#E8F3FF] text-[#0B4EA2] ring-1 ring-[#BCD7F5]/50 dark:bg-[#102B4F] dark:text-[#9AC3FF] dark:ring-[#1F3D68]/50'
                      : 'text-[#526A8B] hover:bg-[#F4F9FF] hover:text-[#0B2E63] dark:text-slate-400 dark:hover:bg-[#0B1627] dark:hover:text-slate-100'
                    }`}
                >
                  <span className={isActive ? 'text-[#1F5AAE] dark:text-[#72A8FF]' : 'text-[#8AA3C1] group-hover:text-[#1F5AAE] dark:text-slate-500 dark:group-hover:text-[#72A8FF]'}>
                    {SECTION_ICONS[section.title]}
                  </span>
                  <span>{section.title}</span>
                </Link>
              );
            }

            return (
              <div key={section.title} className="space-y-1">
                <button
                  type="button"
                  onClick={() => toggle(section.title)}
                  className={`group flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left transition-colors ${hasActive
                      ? 'text-[#0B4EA2] dark:text-[#9AC3FF]'
                      : 'text-[#6681A4] hover:bg-[#F4F9FF] hover:text-[#0B2E63] dark:text-slate-500 dark:hover:bg-[#0B1627] dark:hover:text-slate-200'
                    }`}
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    <span className={hasActive ? 'text-[#1F5AAE] dark:text-[#72A8FF]' : 'text-[#8AA3C1] group-hover:text-[#1F5AAE] dark:text-slate-650 dark:group-hover:text-[#72A8FF]'}>
                      {SECTION_ICONS[section.title]}
                    </span>
                    <span className="truncate text-[10.5px] font-black uppercase tracking-[0.14em]">
                      {section.title}
                    </span>
                  </span>
                  {isCollapsed ? <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#1F5AAE]" /> : <ChevronDown className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#1F5AAE]" />}
                </button>

                {!isCollapsed && (
                  <div className="mt-1 space-y-0.5 border-l border-[#D7E7FA] pl-3.5 dark:border-[#183354]">
                    {section.items.map((item) => {
                      const isActive = item.id === activeId;

                      return (
                        <Link
                          key={item.id}
                          to={`/docs/${item.id}`}
                          onClick={onCloseMobile}
                          className={`relative block rounded-lg px-3 py-1.5 text-[12.5px] font-semibold leading-snug transition-all ${isActive
                              ? 'bg-[#E8F3FF] text-[#0B4EA2] dark:bg-[#102B4F] dark:text-[#9AC3FF]'
                              : 'text-[#526A8B] hover:bg-[#F4F9FF] hover:text-[#0B2E63] dark:text-slate-400 dark:hover:bg-[#0B1627] dark:hover:text-slate-100'
                            }`}
                        >
                          {isActive && (
                            <span className="absolute -left-[15px] top-1/2 h-5 w-0.75 -translate-y-1/2 rounded-full bg-[#1F5AAE] dark:bg-[#72A8FF]" />
                          )}
                          {item.title}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* Sidebar Footer theme controls */}
      <div className="flex flex-shrink-0 items-center justify-between border-t border-[#D7E7FA] px-4 py-4 dark:border-[#183354]">
        <div className="min-w-0">
          <p className="text-[11px] font-bold text-[#0B2E63] dark:text-slate-200">NOLA SMS Pro</p>
          <p className="mt-0.5 text-[10px] font-medium text-[#7B93B1] dark:text-slate-650">Version 1.0 docs</p>
        </div>
        <button
          type="button"
          onClick={toggleTheme}
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#D7E7FA] text-[#6681A4] transition-all hover:border-[#4F8EF7] hover:bg-[#F4F9FF] hover:text-[#1F5AAE] dark:border-[#1F3D68] dark:text-slate-400 dark:hover:bg-[#10243C] dark:hover:text-[#72A8FF]"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="sticky top-0 z-20 hidden h-screen w-[304px] flex-shrink-0 lg:flex">
        <SidebarContent />
      </aside>

      {isOpenOnMobile && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-[#07111F]/55 backdrop-blur-sm"
            onClick={onCloseMobile}
            aria-label="Close navigation"
          />
          <div className="relative z-50 h-full w-[304px] max-w-[88vw] shadow-2xl shadow-[#07111F]/25">
            <SidebarContent mobile />
          </div>
        </div>
      )}
    </>
  );
};
