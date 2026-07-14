import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, CornerDownLeft, ArrowUp, ArrowDown, X } from 'lucide-react';
import { docsData, type DocPage } from '../data/docsData';

interface DocSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocSearch: React.FC<DocSearchProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<DocPage[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Keyboard shortcut Ctrl+K / Cmd+K listener
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle fuzzy matching
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const filtered = docsData.filter((page) => {
      const matchTitle = page.title.toLowerCase().includes(query.toLowerCase());
      const matchDesc = page.description.toLowerCase().includes(query.toLowerCase());
      const matchPurpose = page.purpose.toLowerCase().includes(query.toLowerCase());
      const matchSection = page.section.toLowerCase().includes(query.toLowerCase());
      const matchSub = page.subsection?.toLowerCase().includes(query.toLowerCase()) || false;
      
      return matchTitle || matchDesc || matchPurpose || matchSection || matchSub;
    });

    setResults(filtered.slice(0, 8)); // Limit to 8 items
    setSelectedIndex(0);
  }, [query]);

  // Navigate on selection
  const handleSelect = useCallback((pageId: string) => {
    navigate(`/docs/${pageId}`);
    onClose();
  }, [navigate, onClose]);

  // Keyboard navigation inside search results
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
        e.preventDefault();
      } else if (e.key === 'ArrowDown') {
        setSelectedIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0));
        e.preventDefault();
      } else if (e.key === 'ArrowUp') {
        setSelectedIndex((prev) => (results.length > 0 ? (prev - 1 + results.length) % results.length : 0));
        e.preventDefault();
      } else if (e.key === 'Enter') {
        if (results[selectedIndex]) {
          handleSelect(results[selectedIndex].id);
        }
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSelect, isOpen, onClose, results, selectedIndex]);

  // Close when clicking outside modal box
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center bg-[#020617]/60 px-4 pt-[10vh] backdrop-blur-sm transition-all duration-200 dark:bg-slate-950/80"
      onClick={handleBackdropClick}
    >
      <div 
        ref={containerRef}
        className="w-full max-w-xl overflow-hidden rounded-lg border border-[#CBD5E1] bg-white shadow-2xl shadow-[#020617]/20 transition-all duration-200 dark:border-[#334155] dark:bg-[#020617]"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-[#E2E8F0] px-4 dark:border-[#1E293B]">
          <Search className="h-5 w-5 flex-shrink-0 text-[#334155] dark:text-[#CBD5E1]" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search documentation (e.g. Sender ID, credits...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent py-4 text-base text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-0 dark:text-slate-100"
          />
          <button 
            onClick={onClose}
            className="rounded-lg p-1 text-[#94A3B8] hover:bg-[#F8FAFC] hover:text-[#334155] dark:hover:bg-[#111827] dark:hover:text-[#CBD5E1]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[360px] overflow-y-auto p-2">
          {query.trim() === '' ? (
            <div className="py-12 text-center text-slate-400 dark:text-slate-500">
              <Search className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">Type to start searching across the knowledge base...</p>
              <div className="mt-3 flex justify-center gap-3 text-xs text-slate-400">
                <span><kbd className="px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 font-sans shadow-sm">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 font-sans shadow-sm">K</kbd> to launch</span>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-slate-400 dark:text-slate-500">
              <HelpCircleIcon className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No documentation matches your query &ldquo;<span className="font-semibold text-slate-600 dark:text-slate-300">{query}</span>&rdquo;</p>
            </div>
          ) : (
            <div className="space-y-0.5">
              {results.map((page, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={page.id}
                    onClick={() => handleSelect(page.id)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex cursor-pointer items-center justify-between rounded-lg px-4 py-3 transition-all duration-150 ${
                      isSelected 
                        ? 'border-l-4 border-[#334155] bg-[#F8FAFC] pl-3 text-[#0F172A] dark:border-[#CBD5E1] dark:bg-[#111827] dark:text-slate-100' 
                        : 'text-[#475569] dark:text-slate-400'
                    }`}
                  >
                    <div className="flex-1 min-w-0 pr-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#334155] dark:text-[#CBD5E1]">
                          {page.section}
                        </span>
                        {page.subsection && (
                          <>
                            <span className="text-slate-300 dark:text-slate-700 text-xs">/</span>
                            <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                              {page.subsection}
                            </span>
                          </>
                        )}
                      </div>
                      <h4 className="truncate text-sm font-bold text-[#0F172A] dark:text-slate-100">
                        {page.title}
                      </h4>
                      <p className="truncate text-xs text-[#6681A4] dark:text-slate-400">
                        {page.description}
                      </p>
                    </div>
                    {isSelected && (
                      <span className="flex items-center gap-1 text-[10px] text-slate-400 font-semibold uppercase">
                        Select <CornerDownLeft className="h-3 w-3" />
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Search Modal Footer / Legend */}
        {results.length > 0 && (
          <div className="flex items-center justify-between border-t border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-[10px] font-semibold uppercase text-[#94A3B8] dark:border-[#1E293B] dark:bg-[#111827] dark:text-slate-500">
            <div className="flex gap-4">
              <span className="flex items-center gap-1">
                <ArrowUp className="h-3 w-3" /> <ArrowDown className="h-3 w-3" /> Navigate
              </span>
              <span className="flex items-center gap-1">
                <CornerDownLeft className="h-3 w-3" /> Select
              </span>
            </div>
            <span>Esc to close</span>
          </div>
        )}
      </div>
    </div>
  );
};

const HelpCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);
