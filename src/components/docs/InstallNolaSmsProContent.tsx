import React, { useState, useEffect } from 'react';
import type { DocPage } from '../../data/docsData';
import {
  Shield,
  MapPin,
  AlertTriangle,
  Store,
  LogIn,
  Package,
  MousePointerClick,
  CheckCheck,
  Maximize2,
  X,
  ExternalLink,
  Copy,
  Check,
  Link as LinkIcon,
} from 'lucide-react';

// Import step images from src/assets/Install NOLA SMS Pro
import LogInGhlImg from '../../assets/Install NOLA SMS Pro/Log in to GoHighLevel.png';
import OpenMarketplaceImg from '../../assets/Install NOLA SMS Pro/Open the Marketplace.png';
import OpenInstallLinkImg from '../../assets/Install NOLA SMS Pro/Open the Install Link.png';
import ClickInstallImg from '../../assets/Install NOLA SMS Pro/Click Install.png';
import SelectSubAccountImg from '../../assets/Install NOLA SMS Pro/Select Sub-account.png';
import AuthorizePermissionsImg from '../../assets/Install NOLA SMS Pro/Authorize Permissions.png';

interface Props {
  page: DocPage;
}

/* ─── Image Lightbox Modal ─────────────────────────────── */
interface LightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
}

const ImageLightbox: React.FC<LightboxProps> = ({ src, alt, onClose }) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-6xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 flex items-center gap-1.5 text-white/80 hover:text-white text-[12px] font-semibold transition-colors"
        >
          <X className="h-4 w-4" />
          Close
        </button>
        <div className="overflow-hidden rounded-xl border border-white/10 shadow-2xl">
          <img
            src={src}
            alt={alt}
            className="w-full h-auto block max-h-[85vh] object-contain object-top"
          />
        </div>
      </div>
    </div>
  );
};

/* ─── Standard Screenshot Card Frame ───────────────────── */
interface ScreenFrameProps {
  src: string;
  alt: string;
  title: string;
  onOpenLightbox: (src: string) => void;
}

const ScreenFrame: React.FC<ScreenFrameProps> = ({ src, alt, title, onOpenLightbox }) => {
  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070d18] shadow-sm w-full">
      {/* Browser Chrome Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900 px-4 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="ml-2 text-[9px] font-black uppercase tracking-[0.12em] text-slate-400">
            {title}
          </span>
        </div>
        <button
          onClick={() => onOpenLightbox(src)}
          className="flex items-center gap-1 text-[9px] font-black uppercase tracking-[0.12em] text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          aria-label="View full size"
        >
          <Maximize2 className="h-3 w-3" />
          Full size
        </button>
      </div>

      {/* Screenshot — clickable */}
      <button
        className="block w-full cursor-zoom-in focus:outline-none"
        onClick={() => onOpenLightbox(src)}
        aria-label={`View ${alt} full size`}
      >
        <img src={src} alt={alt} className="w-full h-auto block" />
      </button>
    </div>
  );
};

export const InstallNolaSmsProContent: React.FC<Props> = ({ page }) => {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const directInstallUrl =
    'https://marketplace.leadconnectorhq.com/v2/oauth/chooselocation?response_type=code&redirect_uri=https%3A%2F%2Fsmspro-api.nolacrm.io%2Foauth%2Fcallback&client_id=6999da2b8f278296d95f7274-mmn30t4f&scope=conversations%2Fmessage.readonly+conversations.readonly+conversations.write+contacts.readonly+contacts.write+conversations%2Fmessage.write+oauth.write+oauth.readonly+locations.readonly+locations%2FcustomValues.readonly+locations%2FcustomValues.write+locations%2FcustomFields.readonly&version_id=6999da2b8f278296d95f7274';

  const openLightbox = (src: string) => setLightboxSrc(src);
  const closeLightbox = () => setLightboxSrc(null);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(directInstallUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const steps = [
    {
      icon: LogIn,
      color: 'text-blue-500',
      badge: 'Step 1',
      title: 'Log in to GoHighLevel',
      sub: 'Agency admin credentials',
      desc: 'Sign in to your GoHighLevel portal using your administrator credentials.',
      details: [
        'Ensure you are logged into the main Agency administrator profile.',
        'Sub-account user accounts cannot authorize Marketplace applications.',
      ],
      img: LogInGhlImg,
    },
    {
      icon: Store,
      color: 'text-emerald-500',
      badge: 'Step 2',
      title: 'Open the Marketplace or Open the Install Link',
      sub: 'Marketplace Search or Direct OAuth URL',
      desc: 'You can either open the App Marketplace inside GoHighLevel or click the direct installation link to launch location authorization.',
      details: [
        'Option A (Marketplace): Switch to Agency View in GoHighLevel, navigate to App Marketplace in the left sidebar, and search for "NOLA SMS Pro".',
        'Option B (Direct Link): Use the official LeadConnector Marketplace OAuth installation URL provided below to launch location selection directly.',
      ],
      img: OpenMarketplaceImg,
      hasDirectUrlBox: true,
    },
    {
      icon: Package,
      color: 'text-amber-500',
      badge: 'Step 3',
      title: 'Click Install',
      sub: 'Select app from search results',
      desc: 'Click on the NOLA SMS Pro app listing and select the "Install" button.',
      details: [
        'Review app details, developer verification, and platform description.',
        'Click Install to begin the location mapping wizard.',
      ],
      img: ClickInstallImg,
    },
    {
      icon: MapPin,
      color: 'text-rose-500',
      badge: 'Step 4',
      title: 'Select Sub-account',
      sub: 'Choose target location',
      desc: 'Select the designated sub-account (location) where you want NOLA SMS Pro enabled.',
      details: [
        'Select the exact location name from the location drop-down list.',
        'NOLA SMS Pro integrates on a per-subaccount location basis.',
      ],
      img: SelectSubAccountImg,
    },
    {
      icon: MousePointerClick,
      color: 'text-teal-500',
      badge: 'Step 5',
      title: 'Authorize Permissions',
      sub: 'Allow & Install scope consent',
      desc: 'Review the requested permission scopes — conversations, contacts, location details, custom values, and custom fields — then click "Allow & Install" / Authorize.',
      details: [
        'Grant scopes required for contact database sync and SMS outbox routing.',
        'Once authorized, GoHighLevel automatically redirects you to the NOLA setup & registration wizard.',
      ],
      img: AuthorizePermissionsImg,
    },
  ];

  return (
    <div className="w-full space-y-12 pb-10">

      {/* INTRO */}
      <section id="install-intro" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">What this guide covers</h2>
        <p className="text-[14.5px] leading-7 text-slate-700 dark:text-slate-300">
          Authorize GoHighLevel to integrate with the NOLA platform so the app can send text messages and synchronize your contact database. This process takes less than 3 minutes and only needs to be done once per sub-account.
        </p>
        <p className="text-[14.5px] leading-7 text-slate-700 dark:text-slate-300">
          Once installed, every contact imported into your GoHighLevel CRM becomes immediately available inside NOLA SMS Pro — no exports, no CSV uploads, and no manual syncing required.
        </p>
        <p className="text-[14.5px] leading-7 text-slate-700 dark:text-slate-300">
          The authorization handshake uses standard OAuth through the GoHighLevel Marketplace, granting NOLA SMS Pro only necessary scopes: conversations, contacts, location details, custom values, and custom fields.
        </p>
      </section>

      {/* PREREQUISITES */}
      <section id="install-prerequisites" className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Before you begin</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              icon: <Shield className="h-5 w-5 text-blue-500" />,
              label: 'HighLevel Agency Access',
              detail: 'Administrator-level access to your GoHighLevel Agency Account',
            },
            {
              icon: <MapPin className="h-5 w-5 text-emerald-500" />,
              label: 'Target Sub-account',
              detail: 'The specific sub-account (location) name where the app should be installed',
            },
          ].map((item) => (
            <div key={item.label} className="premium-card flex flex-col justify-between h-full">
              <div>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                  {item.icon}
                </div>
                <h3 className="text-[15px] font-black text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                  {item.label}
                </h3>
                <p className="text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WARNING */}
      <section id="install-agency-warning">
        <div className="flex items-start gap-3.5 rounded-xl border border-amber-200 bg-amber-50/40 px-5 py-4 dark:border-amber-900/40 dark:bg-amber-950/10">
          <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600 dark:text-amber-400" />
          <div>
            <p className="text-[13.5px] font-black text-amber-800 dark:text-amber-300 uppercase tracking-wide mb-1">
              Switch to Agency View First
            </p>
            <p className="text-[13px] leading-relaxed text-amber-700 dark:text-amber-400 font-medium">
              If navigating within GoHighLevel, the Marketplace is accessible from <strong>Agency View</strong>. Alternatively, you can click the direct installation link to jump straight to sub-account authorization.
            </p>
          </div>
        </div>
      </section>

      {/* STEP-BY-STEP INSTALLATION */}
      <section id="install-steps" className="space-y-5">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Installation steps</h2>
        <div className="space-y-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#111827] hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 shadow-sm shadow-[#0F172A]/2 space-y-5"
              >
                {/* Primary Screenshot Frame */}
                <div className="w-full">
                  <ScreenFrame
                    src={step.img}
                    alt={step.title}
                    title={`${step.badge} — ${step.title}`}
                    onOpenLightbox={openLightbox}
                  />
                </div>

                {/* Direct Install Link Box */}
                {step.hasDirectUrlBox && (
                  <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-4 dark:border-blue-900/50 dark:bg-blue-950/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-blue-700 dark:text-blue-300">
                        <LinkIcon className="h-3.5 w-3.5" />
                        Direct Marketplace Installation URL
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleCopyLink}
                          className="inline-flex items-center gap-1 rounded-md bg-white px-2.5 py-1 text-[11px] font-bold text-blue-700 shadow-sm border border-blue-200 hover:bg-blue-50 transition-colors dark:bg-slate-900 dark:border-blue-800 dark:text-blue-300"
                        >
                          {copiedLink ? (
                            <>
                              <Check className="h-3 w-3 text-emerald-500" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              Copy Link
                            </>
                          )}
                        </button>
                        <a
                          href={directInstallUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-md bg-blue-600 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm hover:bg-blue-700 transition-colors"
                        >
                          Open Link
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                    <p className="text-[12px] font-mono break-all text-slate-600 dark:text-slate-400 bg-white/80 dark:bg-slate-900/60 p-2.5 rounded-lg border border-blue-100 dark:border-blue-900/30">
                      {directInstallUrl}
                    </p>
                  </div>
                )}

                {/* Header: Icon + Title */}
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/50">
                    <Icon className={`h-5 w-5 ${step.color}`} />
                  </div>
                  <div>
                    <h4 className="text-[16px] font-black text-slate-900 dark:text-white leading-tight">
                      {step.title}
                    </h4>
                    <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      {step.sub}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-400 font-medium pl-1">
                  {step.desc}
                </p>

                {/* Bullet details */}
                <ul className="space-y-2 pl-1 border-t border-slate-100 dark:border-slate-800/60 pt-4">
                  {step.details.map((detail, subIdx) => (
                    <li key={subIdx} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-slate-600 dark:text-slate-400">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-400 dark:bg-slate-600" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* EXPECTED OUTCOME */}
      <section id="install-outcome">
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/40 px-5 py-4 dark:border-emerald-800/40 dark:bg-emerald-900/10">
          <CheckCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
          <div>
            <p className="text-[13.5px] font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-wide mb-0.5">Expected outcome</p>
            <p className="text-[13.5px] leading-relaxed text-emerald-700 dark:text-emerald-400 font-medium">
              After completing the installation steps, GoHighLevel establishes the OAuth connection and automatically redirects you to the NOLA SMS Pro setup &amp; registration screen.
            </p>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxSrc && (
        <ImageLightbox
          src={lightboxSrc}
          alt="Full size screenshot"
          onClose={closeLightbox}
        />
      )}

    </div>
  );
};

