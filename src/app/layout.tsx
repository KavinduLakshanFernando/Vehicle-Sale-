import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import React from 'react';
import './globals.css';
import { getSiteData } from '@/lib/data';
import { SiteDataProvider } from '@/lib/siteDataContext';
import SiteChrome from '@/components/SiteChrome';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const display = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['500', '600', '700', '800'],
});

export function generateMetadata(): Metadata {
  const siteData = getSiteData();
  return {
    title:
      siteData.content?.common?.websiteTitle ??
      siteData.merchant?.businessName ??
      'Vehicle Sale',
    description:
      siteData.content?.common?.shortDescription ??
      siteData.merchant?.description ??
      'Quality vehicles for sale',
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${display.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <SiteDataProvider>
          <SiteChrome>{children}</SiteChrome>
        </SiteDataProvider>
      </body>
    </html>
  );
}
