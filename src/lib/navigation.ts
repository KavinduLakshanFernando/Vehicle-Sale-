export const PAGE_ROUTES: Record<string, string> = {
  home: '/',
  inventory: '/inventory',
  about_us: '/about_us',
  contact: '/contact',
};

export function pageHref(pageKey: string): string {
  return PAGE_ROUTES[pageKey] ?? '/';
}

export function isPageEnabled(
  enabledPages: string[] | null | undefined,
  pageKey: string,
): boolean {
  return (enabledPages ?? []).includes(pageKey);
}

export function resolveActionHref(
  action: string | null | undefined,
  enabledPages: string[] | null | undefined,
): string | null {
  const pageKey = String(action ?? '').trim();
  if (!pageKey || !isPageEnabled(enabledPages, pageKey)) return null;
  return pageHref(pageKey);
}
