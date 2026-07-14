import React from 'react';
import { ImageIcon, Monitor, Smartphone, Workflow } from 'lucide-react';

export type IllustrationType = 'desktop' | 'phone' | 'workflow' | 'product';

interface IllustrationFrameProps {
  type: IllustrationType;
  title: string;
  caption?: string;
  alt?: string;
  className?: string;
}

const typeConfig: Record<
  IllustrationType,
  { icon: React.ReactNode; label: string; aspect: string; maxW?: string }
> = {
  desktop: {
    icon: <Monitor className="h-4 w-4" />,
    label: 'Desktop Preview',
    aspect: 'aspect-video',
  },
  phone: {
    icon: <Smartphone className="h-4 w-4" />,
    label: 'Phone Preview',
    aspect: 'aspect-[9/16]',
    maxW: 'max-w-[240px] mx-auto',
  },
  workflow: {
    icon: <Workflow className="h-4 w-4" />,
    label: 'Workflow Diagram',
    aspect: 'aspect-[21/9]',
  },
  product: {
    icon: <ImageIcon className="h-4 w-4" />,
    label: 'Product Illustration',
    aspect: 'aspect-[4/3]',
  },
};

export const IllustrationFrame: React.FC<IllustrationFrameProps> = ({
  type,
  title,
  caption,
  alt,
  className = '',
}) => {
  const config = typeConfig[type];

  return (
    <figure
      className={`overflow-hidden rounded-2xl border border-[#CBD5E1] bg-white shadow-sm shadow-[#0F172A]/8 dark:border-[#334155] dark:bg-[#020617] ${className}`}
      role="img"
      aria-label={alt ?? title}
    >
      <div className="flex items-center justify-between gap-3 border-b border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 dark:border-[#1E293B] dark:bg-[#111827]">
        <div className="flex items-center gap-2 text-[#334155] dark:text-[#CBD5E1]">
          {config.icon}
          <span className="text-[10px] font-black uppercase tracking-[0.14em] text-[#475569] dark:text-slate-400">
            {config.label}
          </span>
        </div>
      </div>

      <div className={`relative ${config.aspect} ${config.maxW ?? 'w-full'} bg-[#F8FAFC] dark:bg-[#111827]`}>
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(232,243,255,0.9),rgba(255,255,255,0.4))] dark:bg-[linear-gradient(135deg,rgba(7,17,31,0.95),rgba(16,43,79,0.45))]" />
        <div className="relative flex h-full flex-col items-center justify-center p-6 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#CBD5E1] bg-white text-[#334155] shadow-sm dark:border-[#475569] dark:bg-[#1E293B] dark:text-[#CBD5E1]">
            <ImageIcon className="h-5 w-5" />
          </div>
          <p className="text-[14px] font-black text-[#0F172A] dark:text-white">{title}</p>
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#94A3B8] dark:text-slate-500">
            Illustration placeholder
          </p>
        </div>
      </div>

      {caption && (
        <figcaption className="border-t border-[#E2E8F0] px-4 py-3 dark:border-[#1E293B]">
          <p className="text-[13px] leading-snug text-[#475569] dark:text-slate-300">{caption}</p>
        </figcaption>
      )}
    </figure>
  );
};
