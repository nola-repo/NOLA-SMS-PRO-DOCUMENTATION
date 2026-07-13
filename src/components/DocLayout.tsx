import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { DocSearch } from './DocSearch';
import { type DocPage } from '../data/docsData';
import { Menu } from 'lucide-react';

interface DocLayoutProps {
  children: React.ReactNode;
  page: DocPage;
}

export const DocLayout: React.FC<DocLayoutProps> = ({ children, page }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-[#F7FAFE] text-[#13233D] transition-colors duration-200 dark:bg-[#07111F] dark:text-slate-100">
      <div className="flex min-h-screen w-full">
        <Sidebar
          onSearchClick={() => setIsSearchOpen(true)}
          isOpenOnMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        <div className="min-w-0 flex-1 lg:pl-0">
          <div className="sticky top-0 z-30 border-b border-[#D7E7FA] bg-white/92 px-4 py-3 shadow-sm shadow-[#184B8F]/5 backdrop-blur-xl dark:border-[#1B2E4A] dark:bg-[#07111F]/94 lg:hidden">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMobileSidebarOpen(true)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#BCD7F5] bg-white text-[#1F5AAE] transition-colors hover:border-[#4F8EF7] hover:bg-[#EFF6FF] dark:border-[#1F3D68] dark:bg-[#0B1627] dark:text-[#7FB2FF]"
                aria-label="Open navigation"
              >
                <Menu className="h-5 w-5" />
              </button>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-[#0B2E63] dark:text-white">
                  {page.title}
                </p>
                <p className="truncate text-xs font-medium text-[#5D7596] dark:text-slate-400">
                  NOLA SMS Pro Documentation
                </p>
              </div>
            </div>
          </div>

          <main className="w-full px-4 pb-4 sm:px-7 md:pb-6 lg:px-10">
            {children}
          </main>
        </div>
      </div>

      {/* Global Search Modal */}
      <DocSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};
