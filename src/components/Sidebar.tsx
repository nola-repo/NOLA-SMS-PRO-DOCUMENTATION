import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BookOpen, ChevronDown, ChevronRight, HelpCircle, X,
  MessageSquare, CreditCard, Rocket
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
  ACCOUNT: <CreditCard className="h-4 w-4 shrink-0" />,
  SUPPORT: <HelpCircle className="h-4 w-4 shrink-0" />,
};

export const Sidebar: React.FC<SidebarProps> = ({ isOpenOnMobile, onCloseMobile }) => {
  const location = useLocation();
  const activeId = location.pathname.split('/docs/')[1] || 'welcome';

  // Map database section names to figma mockup headers
  const getFigmaHeader = (title: string) => {
    switch (title) {
      case 'OVERVIEW': return 'Intro';
      case 'SETUP': return 'Getting started';
      case 'MESSAGING': return 'Messaging';
      case 'ACCOUNT': return 'Account';
      case 'SUPPORT': return 'Support';
      default: return title;
    }
  };

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

  // Dynamically auto-expand active sections
  useEffect(() => {
    sidebarStructure.forEach((section) => {
      const hasActive = section.items.some((item) => item.id === activeId);
      if (hasActive && collapsed[section.title]) {
        setCollapsed((prev) => ({ ...prev, [section.title]: false }));
      }
    });
  }, [activeId, collapsed]);

  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="flex h-full w-full flex-col bg-white dark:bg-[#020617]">
      
      {/* Mobile-only header info */}
      {mobile && (
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="h-7 w-7 object-contain rounded" />
            <span className="font-black text-[#0F172A] dark:text-white text-sm">NOLA SMS Pro</span>
          </div>
          <button
            onClick={onCloseMobile}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-655"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Main navigation list */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">

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
                      : 'text-slate-400 dark:text-slate-500 hover:text-slate-650 dark:hover:text-slate-350'
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
                  <div className="pl-3.5 space-y-1 border-l border-slate-150 dark:border-slate-800/80 ml-5">
                    {section.items.map((item) => {
                      const isActive = item.id === activeId;
                      return (
                        <Link
                          key={item.id}
                          to={`/docs/${item.id}`}
                          onClick={onCloseMobile}
                          className={`relative block px-3.5 py-2 text-xs font-semibold leading-relaxed transition-all rounded-full ${
                            isActive
                              ? 'bg-[#F1F5F9] dark:bg-[#1E293B] text-[#334155] dark:text-[#CBD5E1] font-bold'
                              : 'text-slate-500 hover:text-slate-850 hover:bg-slate-100/40 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/20'
                          }`}
                        >
                          {isActive && (
                            <span className="absolute left-[3px] top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-[#334155] dark:bg-[#CBD5E1]" />
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
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="sticky top-[7.25rem] h-[calc(100vh-7.25rem)] w-[292px] flex-shrink-0 hidden lg:flex border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#020617] z-10 transition-colors duration-200">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      {isOpenOnMobile && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <button
            className="absolute inset-0 bg-[#020617]/60 backdrop-blur-sm"
            onClick={onCloseMobile}
          />
          <div className="relative z-50 h-full w-[292px] max-w-[85vw] shadow-2xl bg-white dark:bg-[#020617] border-r border-slate-200 dark:border-slate-800 animate-slide-in">
            <SidebarContent mobile />
          </div>
        </div>
      )}
    </>
  );
};
