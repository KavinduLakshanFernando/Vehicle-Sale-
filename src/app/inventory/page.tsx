'use client';

import React from 'react';
import { useSiteData } from '@/lib/siteDataContext';
import { isPageEnabled } from '@/lib/navigation';
import SectionHeader from '@/components/SectionHeader';
import VehicleCard from '@/components/VehicleCard';

export default function InventoryPage() {
  const siteData = useSiteData();
  const inventory = siteData.content?.inventory;
  const vehicles = siteData.content?.vehicles ?? [];

  const enabledPages = siteData.requirements?.requiredPages ??
    siteData.template?.structure?.pages ?? ['home', 'contact'];
  const contactEnabled = isPageEnabled(enabledPages, 'contact');

  return (
    <div data-preview-page-key="inventory">
      <section className="relative flex items-end overflow-hidden pt-24 min-h-[55vh]">
        {inventory?.bannerImageUrl ? (
          <img
            src={inventory.bannerImageUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            data-preview-field-path="inventory.bannerImageUrl"
          />
        ) : (
          <div
            className="absolute inset-0 bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-secondary)]"
            data-preview-field-path="inventory.bannerImageUrl"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-primary)] via-[var(--brand-primary)]/40 to-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,107,44,0.15),transparent_60%)]" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-12 sm:px-6 lg:px-8">
          <span className="section-eyebrow mb-4 !bg-white/10 !text-[var(--brand-accent-soft)]" data-preview-static="true">
            Apex Motors
          </span>
          <h1
            className="max-w-4xl text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
            data-preview-field-path="inventory.pageTitle"
          >
            {inventory?.pageTitle ?? ''}
          </h1>
          <p
            className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl"
            data-preview-field-path="inventory.pageSubtitle"
          >
            {inventory?.pageSubtitle ?? ''}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--page-background)] to-transparent" />
      </section>

      <section className="mesh-bg py-[var(--section-padding)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Full Collection"
            title="Browse Our Inventory"
            subtitle={`${vehicles.length} premium vehicles available now`}
            align="center"
          />
          <div data-preview-list-path="vehicles" className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {vehicles.map((vehicle, index) => (
              <VehicleCard
                key={vehicle.id ?? `vehicle-${index}`}
                vehicle={vehicle}
                index={index}
                showContactLink
                contactEnabled={contactEnabled}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
