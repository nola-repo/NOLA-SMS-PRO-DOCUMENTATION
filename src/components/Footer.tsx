import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => (
  <footer className="mt-16 pt-6 border-t border-slate-100 dark:border-slate-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
    <span className="text-[12px] text-slate-400 dark:text-slate-600">
      © {new Date().getFullYear()} NOLA SMS Pro. All rights reserved.
    </span>
    <div className="flex items-center gap-4 text-[12px] text-slate-400 dark:text-slate-500">
      <Link to="/docs/welcome" className="hover:text-[#334155] dark:hover:text-[#475569] transition-colors">Docs</Link>
      <a href="mailto:support@nolasmspro.com" className="hover:text-[#334155] dark:hover:text-[#475569] transition-colors">Support</a>
    </div>
  </footer>
);
