'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSiteData } from '@/lib/siteDataContext';
import { pageHref } from '@/lib/navigation';

const PAGE_LABELS: Record<string, { labelPath: string; navKey: 'home' | 'inventory' | 'aboutUs' | 'contact' }> = {
  home: { labelPath: 'common.navigation.home', navKey: 'home' },
  inventory: { labelPath: 'common.navigation.inventory', navKey: 'inventory' },
  about_us: { labelPath: 'common.navigation.aboutUs', navKey: 'aboutUs' },
  contact: { labelPath: 'common.navigation.contact', navKey: 'contact' },
};

export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteData = useSiteData();
  const common = siteData.content?.common;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/' || pathname === '';
  const headerSolid = scrolled || !isHome;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const enabledPages = siteData.requirements?.requiredPages ??
    siteData.template?.structure?.pages ?? ['home', 'contact'];

  const businessName =
    common?.websiteTitle ?? siteData.merchant?.businessName ?? '';
  const logoUrl =
    common?.logoUrl ??
    siteData.media?.business_logo?.[0] ??
    siteData.media?.logo?.[0] ??
    siteData.merchant?.logoUrl ??
    '';

  const theme = siteData.template?.structure?.theme;
  const themeStyle = {
    '--brand-primary': theme?.primaryColor ?? '#0a1628',
    '--brand-secondary': theme?.secondaryColor ?? '#152238',
    '--brand-accent': theme?.accentColor ?? '#ff6b2c',
    '--brand-accent-soft': '#ff8f5a',
    '--page-background': theme?.backgroundColor ?? '#f4f7fb',
    '--page-text': theme?.textColor ?? '#0f172a',
    '--hero-min-height': theme?.heroMinHeight ?? '92vh',
    '--section-padding': theme?.sectionPadding ?? '6rem',
  } as React.CSSProperties;

  return (
    <div
      className="min-h-screen bg-[var(--page-background)] text-[var(--page-text)]"
      style={themeStyle}
    >
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          headerSolid
            ? 'border-b border-white/10 bg-[var(--brand-primary)]/95 py-2 shadow-lg backdrop-blur-xl'
            : 'bg-transparent py-4'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" data-target-page="home" className="group flex min-w-0 items-center gap-3">
            <span
              className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/20 transition group-hover:ring-[var(--brand-accent)]/50"
              data-preview-field-path="common.logoUrl"
            >
              {logoUrl ? (
                <img src={logoUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                <span aria-hidden="true" className="text-[10px] text-white/50">Logo</span>
              )}
            </span>
            <span
              className={`truncate text-lg font-bold tracking-tight sm:text-xl ${
                headerSolid ? 'text-white' : 'text-white drop-shadow-md'
              }`}
              data-preview-field-path="common.websiteTitle"
            >
              {businessName}
            </span>
          </Link>

          <button
            type="button"
            data-preview-static
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur-sm lg:hidden"
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span className="text-lg">{mobileOpen ? '✕' : '☰'}</span>
          </button>

          <div className="hidden items-center gap-1 lg:flex">
            {enabledPages.includes('home') && (
              <Link
                href={pageHref('home')}
                data-target-page="home"
                className="rounded-full px-4 py-2 text-sm font-medium text-white/85 transition hover:bg-white/10 hover:text-white"
              >
                <span data-preview-field-path="common.navigation.home">{common?.navigation?.home ?? 'Home'}</span>
              </Link>
            )}
            {enabledPages.includes('inventory') && (
              <Link
                href={pageHref('inventory')}
                data-target-page="inventory"
                className="rounded-full px-4 py-2 text-sm font-medium text-white/85 transition hover:bg-white/10 hover:text-white"
              >
                <span data-preview-field-path="common.navigation.inventory">{common?.navigation?.inventory ?? 'Inventory'}</span>
              </Link>
            )}
            {enabledPages.includes('about_us') && (
              <Link
                href={pageHref('about_us')}
                data-target-page="about_us"
                className="rounded-full px-4 py-2 text-sm font-medium text-white/85 transition hover:bg-white/10 hover:text-white"
              >
                <span data-preview-field-path="common.navigation.aboutUs">{common?.navigation?.aboutUs ?? 'About Us'}</span>
              </Link>
            )}
            {enabledPages.includes('contact') && (
              <Link
                href={pageHref('contact')}
                data-target-page="contact"
                className="btn-primary ml-3 !py-2.5 !text-sm"
              >
                <span data-preview-field-path="common.navigation.contact">{common?.navigation?.contact ?? 'Contact'}</span>
              </Link>
            )}
          </div>
        </nav>

        {mobileOpen && (
          <div className="glass-panel mx-4 mt-2 rounded-2xl p-4 lg:hidden">
            <div className="flex flex-col gap-1">
              {enabledPages.includes('home') && (
                <Link
                  href={pageHref('home')}
                  data-target-page="home"
                  className="rounded-xl px-4 py-3 text-sm font-medium text-[var(--brand-primary)] hover:bg-slate-100"
                  onClick={() => setMobileOpen(false)}
                >
                  <span data-preview-field-path="common.navigation.home">{common?.navigation?.home ?? 'Home'}</span>
                </Link>
              )}
              {enabledPages.includes('inventory') && (
                <Link
                  href={pageHref('inventory')}
                  data-target-page="inventory"
                  className="rounded-xl px-4 py-3 text-sm font-medium text-[var(--brand-primary)] hover:bg-slate-100"
                  onClick={() => setMobileOpen(false)}
                >
                  <span data-preview-field-path="common.navigation.inventory">{common?.navigation?.inventory ?? 'Inventory'}</span>
                </Link>
              )}
              {enabledPages.includes('about_us') && (
                <Link
                  href={pageHref('about_us')}
                  data-target-page="about_us"
                  className="rounded-xl px-4 py-3 text-sm font-medium text-[var(--brand-primary)] hover:bg-slate-100"
                  onClick={() => setMobileOpen(false)}
                >
                  <span data-preview-field-path="common.navigation.aboutUs">{common?.navigation?.aboutUs ?? 'About Us'}</span>
                </Link>
              )}
              {enabledPages.includes('contact') && (
                <Link
                  href={pageHref('contact')}
                  data-target-page="contact"
                  className="rounded-xl px-4 py-3 text-sm font-medium text-[var(--brand-primary)] hover:bg-slate-100"
                  onClick={() => setMobileOpen(false)}
                >
                  <span data-preview-field-path="common.navigation.contact">{common?.navigation?.contact ?? 'Contact'}</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="pt-0">{children}</main>

      <footer className="relative mt-auto overflow-hidden bg-[var(--brand-primary)] text-slate-300">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,107,44,0.12),transparent_60%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-5">
            <p
              className="min-h-6 text-2xl font-extrabold text-white"
              data-preview-field-path="common.websiteTitle"
            >
              {businessName}
            </p>
            <p
              className="mt-4 min-h-8 max-w-sm text-sm leading-relaxed text-slate-400"
              data-preview-field-path="common.shortDescription"
            >
              {common?.shortDescription ?? siteData.merchant?.description ?? ''}
            </p>
          </div>

          <div className="lg:col-span-3">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.15em] text-[var(--brand-accent)]" data-preview-static>
              Navigation
            </p>
            <ul className="space-y-3">
              {enabledPages.includes('home') && (
                <li>
                  <Link
                    href={pageHref('home')}
                    data-target-page="home"
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    <span data-preview-field-path="common.navigation.home">{common?.navigation?.home ?? 'Home'}</span>
                  </Link>
                </li>
              )}
              {enabledPages.includes('inventory') && (
                <li>
                  <Link
                    href={pageHref('inventory')}
                    data-target-page="inventory"
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    <span data-preview-field-path="common.navigation.inventory">{common?.navigation?.inventory ?? 'Inventory'}</span>
                  </Link>
                </li>
              )}
              {enabledPages.includes('about_us') && (
                <li>
                  <Link
                    href={pageHref('about_us')}
                    data-target-page="about_us"
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    <span data-preview-field-path="common.navigation.aboutUs">{common?.navigation?.aboutUs ?? 'About Us'}</span>
                  </Link>
                </li>
              )}
              {enabledPages.includes('contact') && (
                <li>
                  <Link
                    href={pageHref('contact')}
                    data-target-page="contact"
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    <span data-preview-field-path="common.navigation.contact">{common?.navigation?.contact ?? 'Contact'}</span>
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <address className="not-italic lg:col-span-4">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.15em] text-[var(--brand-accent)]" data-preview-static>
              Get in Touch
            </p>
            <p className="min-h-5 text-sm text-slate-400" data-preview-field-path="common.address">
              {common?.address ?? ''}
            </p>
            <a
              className="mt-3 block min-h-5 text-sm text-slate-300 transition hover:text-[var(--brand-accent)]"
              href={common?.email ? `mailto:${common.email}` : undefined}
              data-preview-field-path="common.email"
            >
              {common?.email ?? ''}
            </a>
            <a
              className="mt-2 block min-h-5 text-sm text-slate-300 transition hover:text-[var(--brand-accent)]"
              href={common?.contactNumber ? `tel:${common.contactNumber}` : undefined}
              data-preview-field-path="common.contactNumber"
            >
              {common?.contactNumber ?? ''}
            </a>
            <a
              className="mt-2 block min-h-5 text-sm text-slate-300 transition hover:text-[var(--brand-accent)]"
              href={common?.whatsapp ? `https://wa.me/${common.whatsapp.replace(/[^0-9]/g, '')}` : undefined}
              target="_blank"
              rel="noopener noreferrer"
              data-preview-field-path="common.whatsapp"
            >
              {common?.whatsapp ?? ''}
            </a>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={common?.socialMedia?.facebook ? common.socialMedia.facebook : undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/5 px-4 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
                data-preview-field-path="common.socialMedia.facebook"
              >
                {common?.socialMedia?.facebook ?? ''}
              </a>
              <a
                href={common?.socialMedia?.instagram ? common.socialMedia.instagram : undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/5 px-4 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
                data-preview-field-path="common.socialMedia.instagram"
              >
                {common?.socialMedia?.instagram ?? ''}
              </a>
              <a
                href={common?.socialMedia?.youtube ? common.socialMedia.youtube : undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/5 px-4 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
                data-preview-field-path="common.socialMedia.youtube"
              >
                {common?.socialMedia?.youtube ?? ''}
              </a>
            </div>
          </address>
        </div>
        <div className="relative border-t border-white/5 py-6 text-center text-xs text-slate-500">
          <span data-preview-static>© {new Date().getFullYear()} </span>
          <span data-preview-field-path="common.websiteTitle">{businessName}</span>
          <span data-preview-static>. Crafted for premium driving experiences.</span>
        </div>
      </footer>
    </div>
  );
}
