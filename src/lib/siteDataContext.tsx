'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import baseSiteData from '@/data/site-data.json';

export interface VehicleItem {
  id?: string | null;
  name?: string | null;
  year?: string | null;
  mileage?: string | null;
  fuelType?: string | null;
  transmission?: string | null;
  price?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  badge?: string | null;
  [key: string]: unknown;
}

export interface HighlightItem {
  id?: string | null;
  title?: string | null;
  description?: string | null;
  icon?: string | null;
  [key: string]: unknown;
}

export interface WhyChooseItem {
  id?: string | null;
  title?: string | null;
  description?: string | null;
  [key: string]: unknown;
}

export interface SiteData {
  project?: {
    id?: string | null;
    title?: string | null;
    status?: string | null;
  } | null;
  merchant?: {
    businessName?: string | null;
    description?: string | null;
    contact?: {
      phone?: string | null;
      email?: string | null;
      whatsapp?: string | null;
    } | null;
    address?: {
      line1?: string | null;
      city?: string | null;
      district?: string | null;
      province?: string | null;
      postalCode?: string | null;
    } | null;
    social?: {
      facebook?: string | null;
      instagram?: string | null;
      tiktok?: string | null;
      youtube?: string | null;
      linkedin?: string | null;
      website?: string | null;
    } | null;
    logoUrl?: string | null;
  } | null;
  template?: {
    id?: string | null;
    name?: string | null;
    engine?: string | null;
    structure?: {
      version?: number | null;
      name?: string | null;
      pages?: string[] | null;
      theme?: {
        primaryColor?: string | null;
        secondaryColor?: string | null;
        accentColor?: string | null;
        backgroundColor?: string | null;
        textColor?: string | null;
        headingFont?: string | null;
        bodyFont?: string | null;
        baseSize?: string | null;
        heroMinHeight?: string | null;
        sectionPadding?: string | null;
        style?: string | null;
      } | null;
    } | null;
  } | null;
  requirements?: {
    websiteType?: string | null;
    mainPurpose?: string | null;
    requiredPages?: string[] | null;
  } | null;
  content?: {
    common?: {
      logoUrl?: string | null;
      websiteTitle?: string | null;
      shortDescription?: string | null;
      contactNumber?: string | null;
      email?: string | null;
      whatsapp?: string | null;
      address?: string | null;
      navigation?: {
        home?: string | null;
        inventory?: string | null;
        aboutUs?: string | null;
        contact?: string | null;
        [key: string]: string | null | undefined;
      } | null;
      socialMedia?: {
        facebook?: string | null;
        instagram?: string | null;
        youtube?: string | null;
        [key: string]: string | null | undefined;
      } | null;
      [key: string]: unknown;
    } | null;
    home?: {
      heroTitle?: string | null;
      heroSubtitle?: string | null;
      heroButtonText?: string | null;
      heroButtonAction?: string | null;
      bannerImageUrl?: string | null;
      heroSlides?: string[] | null;
      introTitle?: string | null;
      introParagraph?: string | null;
      featuredSectionTitle?: string | null;
      whyChooseTitle?: string | null;
      whyChooseItems?: WhyChooseItem[] | null;
      ctaTitle?: string | null;
      ctaSubtitle?: string | null;
      ctaButtonText?: string | null;
      ctaButtonAction?: string | null;
      [key: string]: unknown;
    } | null;
    inventory?: {
      pageTitle?: string | null;
      pageSubtitle?: string | null;
      bannerImageUrl?: string | null;
      [key: string]: unknown;
    } | null;
    about?: {
      pageTitle?: string | null;
      aboutBusiness?: string | null;
      vision?: string | null;
      mission?: string | null;
      whyChooseUs?: string | null;
      profileImageUrl?: string | null;
      bannerImageUrl?: string | null;
      highlights?: HighlightItem[] | null;
      [key: string]: unknown;
    } | null;
    vehicles?: VehicleItem[] | null;
    gallery?: {
      galleryTitle?: string | null;
      galleryImages?: string[] | null;
      [key: string]: unknown;
    } | null;
    contact?: {
      pageTitle?: string | null;
      pageSubtitle?: string | null;
      contactNumber?: string | null;
      whatsapp?: string | null;
      email?: string | null;
      address?: string | null;
      openingHours?: string | null;
      googleMapLink?: string | null;
      formTitle?: string | null;
      formSubtitle?: string | null;
      submitButtonText?: string | null;
      bannerImageUrl?: string | null;
      [key: string]: unknown;
    } | null;
    [key: string]: unknown;
  } | null;
  media?: {
    business_logo?: string[] | null;
    website_banner?: string[] | null;
    product?: string[] | null;
    logo?: string[] | null;
    hero?: string[] | null;
    gallery?: string[] | null;
    [key: string]: string[] | null | undefined;
  } | null;
}

export const PREVIEW_DATA_MESSAGE = 'MARKETPLACE_PREVIEW_SITE_DATA';
export const PREVIEW_READY_MESSAGE = 'MARKETPLACE_PREVIEW_READY';
export const PREVIEW_FOCUS_MESSAGE = 'MARKETPLACE_PREVIEW_FOCUS_PAGE';

const PREVIEW_GLOBAL_KEY = '__MARKETPLACE_PREVIEW_SITE_DATA__';
const PREVIEW_PENDING_PAGE_KEY = '__MARKETPLACE_PREVIEW_PENDING_PAGE__';
const PREVIEW_PENDING_FIELD_KEY = '__MARKETPLACE_PREVIEW_PENDING_FIELD__';
const ACTIVE_FIELD_ATTRIBUTE = 'data-marketplace-preview-active-field';

const SiteDataContext = createContext<SiteData>(baseSiteData);

export function useSiteData(): SiteData {
  return useContext(SiteDataContext);
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function deepMerge<T>(base: T, override: unknown): T {
  if (Array.isArray(override)) return override as unknown as T;

  if (isPlainObject(base) && isPlainObject(override)) {
    const result: Record<string, unknown> = { ...base };
    for (const [key, value] of Object.entries(override)) {
      result[key] = deepMerge((base as Record<string, unknown>)[key], value);
    }
    return result as unknown as T;
  }

  return override === undefined ? base : (override as T);
}

function normalizePageKey(pageKey?: string | null, pageLabel?: string | null) {
  const value = String(pageKey ?? pageLabel ?? '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_');

  if (!value || value === 'common') return 'home';
  if (value === 'about') return 'about_us';
  return value;
}

function resolvePreviewPath(pageKey: string) {
  if (typeof window === 'undefined') {
    return pageKey === 'home' ? '/' : `/${pageKey}`;
  }

  const match = window.location.pathname.match(
    /^(\/uploads\/generated-sites\/[^/]+\/[^/]+)/,
  );
  if (!match) {
    return pageKey === 'home' ? '/' : `/${pageKey.replace(/^\/+/, '')}`;
  }

  const suffix = pageKey === 'home' ? '' : `/${pageKey.replace(/^\/+/, '')}`;
  return `${match[1]}${suffix}`;
}

function findPageTarget(pageKey: string) {
  if (typeof document === 'undefined') return null;

  const baseKey = pageKey.replace(/_us$/, '');
  const attrName = 'data' + '-preview-page-key';
  const selectors = [
    '[' + attrName + '="' + pageKey + '"]',
    '[' + attrName + '="' + baseKey + '"]',
    `#${pageKey}_view`,
    `#${baseKey}_view`,
    `#${pageKey}`,
    `#${baseKey}`,
    'main',
    'body',
  ];

  for (const selector of selectors) {
    const element = document.querySelector(selector);
    if (element instanceof HTMLElement) return element;
  }
  return null;
}

function findFieldTarget(
  fieldPath?: string | null,
  fieldValue?: string | null,
) {
  if (typeof document === 'undefined') return null;

  if (fieldPath) {
    const path = CSS.escape(fieldPath);
    const explicitTarget = document.querySelector<HTMLElement>(
      `[data-preview-field-path="${path}"], [data-content-path="${path}"]`,
    );
    if (explicitTarget) return explicitTarget;
  }

  const value = String(fieldValue ?? '')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();
  if (value.length < 2) return null;

  return (
    Array.from(
      document.querySelectorAll<HTMLElement>(
        'h1, h2, h3, h4, p, span, a, button, address, li, dt, dd',
      ),
    )
      .filter((element) => {
        const text =
          element.textContent?.trim().replace(/\s+/g, ' ').toLowerCase() ?? '';
        return text === value || text.includes(value);
      })
      .sort(
        (left, right) =>
          (left.textContent?.length ?? Number.MAX_SAFE_INTEGER) -
          (right.textContent?.length ?? Number.MAX_SAFE_INTEGER),
      )[0] ?? null
  );
}

let activeHighlight: {
  target: HTMLElement;
  outline: string;
  boxShadow: string;
  transition: string;
  scrollMarginTop: string;
} | null = null;

function clearHighlight() {
  if (!activeHighlight) return;

  const { target, outline, boxShadow, transition, scrollMarginTop } =
    activeHighlight;
  target.style.outline = outline;
  target.style.boxShadow = boxShadow;
  target.style.transition = transition;
  target.style.scrollMarginTop = scrollMarginTop;
  target.removeAttribute(ACTIVE_FIELD_ATTRIBUTE);
  activeHighlight = null;
}

function highlightTarget(
  pageKey: string,
  fieldPath?: string | null,
  fieldValue?: string | null,
) {
  const pageTarget = findPageTarget(pageKey);
  if (!pageTarget) return;

  const target = findFieldTarget(fieldPath, fieldValue) ?? pageTarget;
  clearHighlight();
  target.scrollIntoView({
    behavior: 'smooth',
    block: target === pageTarget ? 'start' : 'center',
  });

  activeHighlight = {
    target,
    outline: target.style.outline,
    boxShadow: target.style.boxShadow,
    transition: target.style.transition,
    scrollMarginTop: target.style.scrollMarginTop,
  };
  target.setAttribute(ACTIVE_FIELD_ATTRIBUTE, 'true');
  target.style.scrollMarginTop = '72px';
  target.style.transition = 'box-shadow 0.22s ease, outline-color 0.22s ease';
  target.style.outline = '2px solid rgba(34, 197, 94, 0.98)';
  target.style.boxShadow = '0 0 0 7px rgba(34, 197, 94, 0.2)';
}

function highlightPendingPage(explicitPageKey?: string | null) {
  if (typeof window === 'undefined') return;

  const pageKey =
    explicitPageKey ?? window.sessionStorage.getItem(PREVIEW_PENDING_PAGE_KEY);
  if (!pageKey) return;

  let field: { path?: string; value?: string } | null = null;
  try {
    field = JSON.parse(
      window.sessionStorage.getItem(PREVIEW_PENDING_FIELD_KEY) ?? 'null',
    ) as { path?: string; value?: string } | null;
  } catch {
    field = null;
  }

  highlightTarget(pageKey, field?.path, field?.value);
  window.sessionStorage.removeItem(PREVIEW_PENDING_PAGE_KEY);
  window.sessionStorage.removeItem(PREVIEW_PENDING_FIELD_KEY);
}

function focusPage(
  pageKey?: string | null,
  pageLabel?: string | null,
  fieldPath?: string | null,
  fieldValue?: string | null,
) {
  if (typeof window === 'undefined') return;

  const normalizedPageKey = normalizePageKey(pageKey, pageLabel);
  window.sessionStorage.setItem(PREVIEW_PENDING_PAGE_KEY, normalizedPageKey);
  window.sessionStorage.setItem(
    PREVIEW_PENDING_FIELD_KEY,
    JSON.stringify({ path: fieldPath, value: fieldValue }),
  );

  const targetPath = resolvePreviewPath(normalizedPageKey);
  const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
  if (currentPath !== targetPath) {
    window.location.assign(targetPath);
    return;
  }

  window.setTimeout(() => highlightPendingPage(normalizedPageKey), 120);
}

export function SiteDataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<SiteData>(baseSiteData);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const injected = (window as unknown as Record<string, unknown>)[
      PREVIEW_GLOBAL_KEY
    ];
    if (injected) {
      // Marketplace preview bootstrap — intentional one-time merge on mount
      queueMicrotask(() => setData(deepMerge(baseSiteData, injected)));
    }
    const parentOrigin = (() => {
      try {
        return document.referrer ? new URL(document.referrer).origin : null;
      } catch {
        return null;
      }
    })();

    const handleMessage = (event: MessageEvent) => {
      if (
        event.source !== window.parent ||
        (parentOrigin && event.origin !== parentOrigin)
      ) {
        return;
      }
      const payload = event.data as
        | {
            type?: string;
            siteData?: unknown;
            pageKey?: string;
            pageLabel?: string;
            fieldPath?: string;
            fieldValue?: string;
          }
        | undefined;

      if (payload?.type === PREVIEW_DATA_MESSAGE && payload.siteData) {
        setData(deepMerge(baseSiteData, payload.siteData));
        return;
      }

      if (payload?.type === PREVIEW_FOCUS_MESSAGE) {
        focusPage(
          payload.pageKey,
          payload.pageLabel,
          payload.fieldPath,
          payload.fieldValue,
        );
      }
    };

    window.addEventListener('message', handleMessage);

    const pendingPage = window.sessionStorage.getItem(PREVIEW_PENDING_PAGE_KEY);
    if (pendingPage) {
      window.setTimeout(() => highlightPendingPage(pendingPage), 260);
    }

    try {
      window.parent?.postMessage(
        { type: PREVIEW_READY_MESSAGE },
        parentOrigin ?? '*',
      );
    } catch {
      // The injected-data path still works if cross-origin messaging is blocked.
    }

    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <SiteDataContext.Provider value={data}>{children}</SiteDataContext.Provider>
  );
}
