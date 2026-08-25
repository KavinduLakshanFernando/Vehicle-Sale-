import siteData from '@/data/site-data.json';
import type { SiteData } from './siteDataContext';

export function getSiteData(): SiteData {
  return siteData;
}
