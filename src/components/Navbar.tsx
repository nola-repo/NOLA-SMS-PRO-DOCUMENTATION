import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Sun, Moon, Search, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { docsData } from '../data/docsData';

interface NavbarProps {
  onSearchClick: () => void;
  onToggleMobileSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearchClick, onToggleMobileSidebar }) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const activeDocId = location.pathname.split('/docs/')[1] || '';
  const currentDoc = docsData.find(doc => doc.id === activeDocId);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-5 border-b border-slate-100 dark:border-slate-800/60 bg-white/90 dark:bg-[#0C0F1A]/90 backdrop-blur-md">

      {/* Left: hamburger + breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onToggleMobileSidebar}
          className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 lg:hidden flex-shrink-0 transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="h-4.5 w-4.5" />
        </button>

        {/* Breadcrumb: only show Docs / Section — no redundant page title */}
        <nav className="hidden sm:flex items-center gap-1 text-[12px] text-slate-400 dark:text-slate-500 font-medium min-w-0">
          <span>Docs</span>
          {currentDoc && (
            <>
              <ChevronRight className="h-3 w-3 opacity-50 flex-shrink-0" />
              <span className="text-slate-500 dark:text-slate-400 truncate max-w-[240px]">{currentDoc.section}</span>
              {currentDoc.subsection && (
                <>
                  <ChevronRight className="h-3 w-3 opacity-50 flex-shrink-0" />
                  <span className="text-slate-500 dark:text-slate-400 truncate max-w-[160px]">{currentDoc.subsection}</span>
                </>
              )}
            </>
          )}
        </nav>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {/* Search trigger */}
        <button
          onClick={onSearchClick}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 text-[12px] text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-[#475569]/40 transition-all"
        >
          <Search className="h-3.5 w-3.5" />
          <span>Search</span>
          <span className="text-[10px] px-1 py-0.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-300 dark:text-slate-500 font-mono ml-1">⌘K</span>
        </button>

        <button
          onClick={onSearchClick}
          className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 md:hidden transition-colors"
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'light'
            ? <Moon className="h-4 w-4" />
            : <Sun className="h-4 w-4" />
          }
        </button>

      </div>
    </header>
  );
};
