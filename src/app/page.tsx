'use client';

import React from 'react';
import Link from 'next/link';
import { useSiteData } from '@/lib/siteDataContext';
import { isPageEnabled, pageHref, resolveActionHref } from '@/lib/navigation';
import HeroSlider from '@/components/HeroSlider';
import SectionHeader from '@/components/SectionHeader';
import VehicleCard from '@/components/VehicleCard';

export default function HomePage() {
  const siteData = useSiteData();
  const home = siteData.content?.home;
  const vehicles = siteData.content?.vehicles ?? [];
  const gallery = siteData.content?.gallery;
  const whyChooseItems = home?.whyChooseItems ?? [];
  const galleryImages = gallery?.galleryImages ?? [];

  const enabledPages = siteData.requirements?.requiredPages ??
    siteData.template?.structure?.pages ?? ['home', 'contact'];

  const heroHref = resolveActionHref(home?.heroButtonAction, enabledPages);
  const ctaHref = resolveActionHref(home?.ctaButtonAction, enabledPages);
  const inventoryEnabled = isPageEnabled(enabledPages, 'inventory');
  const contactEnabled = isPageEnabled(enabledPages, 'contact');

  const featuredVehicles = vehicles.slice(0, 3);
  const heroSlides = home?.heroSlides ?? [];

  return (
    <div data-preview-page-key="home">
      <HeroSlider slides={heroSlides} listPath="home.heroSlides">
        <span className="section-eyebrow mb-6 !bg-white/10 !text-[var(--brand-accent-soft)]" data-preview-static="true">
          Premium Vehicle Sales
        </span>
        <h1
          className="text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-7xl"
          data-preview-field-path="home.heroTitle"
        >
          {home?.heroTitle ?? ''}
        </h1>
        <p
          className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200/90 sm:text-xl"
          data-preview-field-path="home.heroSubtitle"
        >
          {home?.heroSubtitle ?? ''}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          {heroHref ? (
            <Link href={heroHref} className="btn-primary" data-preview-field-path="home.heroButtonText">
              {home?.heroButtonText ?? ''}
            </Link>
          ) : (
            <span className="btn-primary" data-preview-field-path="home.heroButtonText">
              {home?.heroButtonText ?? ''}
            </span>
          )}
          {contactEnabled && (
            <Link href={pageHref('contact')} data-target-page="contact" data-preview-static className="btn-secondary">
              Book a Test Drive
            </Link>
          )}
        </div>
      </HeroSlider>

      {/* Stats strip */}
      <section className="relative z-10 -mt-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { value: `${vehicles.length}+`, label: 'Vehicles' },
            { value: '150', label: 'Point Check' },
            { value: '15+', label: 'Years' },
            { value: '24h', label: 'Response' },
          ].map((stat) => (
            <div key={stat.label} className="glass-panel rounded-2xl p-5 text-center shadow-lg" data-preview-static>
              <p className="text-2xl font-extrabold gradient-text sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mesh-bg py-[var(--section-padding)]">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeader
              eyebrow="Who We Are"
              title={home?.introTitle ?? ''}
              titlePath="home.introTitle"
              subtitle={home?.introParagraph ?? ''}
              subtitlePath="home.introParagraph"
            />
            {inventoryEnabled && (
              <Link href={pageHref('inventory')} data-target-page="inventory" data-preview-static className="btn-primary">
                Explore Collection →
              </Link>
            )}
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[var(--brand-accent)]/20 to-transparent blur-2xl" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/5">
              {galleryImages[0] ? (
                <img
                  src={galleryImages[0]}
                  alt=""
                  className="h-full w-full object-cover"
                  data-preview-field-path="gallery.galleryImages[0]"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-slate-200 text-slate-400" data-preview-field-path="gallery.galleryImages[0]">
                  Image
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-[var(--section-padding)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeader
              eyebrow="Featured"
              title={home?.featuredSectionTitle ?? ''}
              titlePath="home.featuredSectionTitle"
            />
            {inventoryEnabled ? (
              <Link href={pageHref('inventory')} data-target-page="inventory" data-preview-static className="btn-primary shrink-0">
                View All →
              </Link>
            ) : (
              <span data-target-page="inventory" data-preview-static className="text-sm font-semibold text-slate-400">View All →</span>
            )}
          </div>

          <div data-preview-list-path="vehicles" className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {featuredVehicles.map((vehicle, index) => (
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

      <section className="mesh-bg py-[var(--section-padding)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Why Us"
            title={home?.whyChooseTitle ?? ''}
            titlePath="home.whyChooseTitle"
            align="center"
          />
          <div data-preview-list-path="home.whyChooseItems" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseItems.map((item, index) => (
              <div
                key={item.id ?? `why-${index}`}
                className="card-premium group p-8"
                data-preview-item-path={`home.whyChooseItems[${index}]`}
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--brand-accent)] to-[var(--brand-accent-soft)] text-lg font-bold text-white shadow-lg">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3
                  className="min-h-6 text-lg font-bold text-[var(--brand-primary)]"
                  data-preview-field-path={`home.whyChooseItems[${index}].title`}
                >
                  {item.title ?? ''}
                </h3>
                <p
                  className="mt-3 min-h-10 text-sm leading-relaxed text-slate-500"
                  data-preview-field-path={`home.whyChooseItems[${index}].description`}
                >
                  {item.description ?? ''}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[var(--section-padding)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Showroom"
            title={gallery?.galleryTitle ?? ''}
            titlePath="gallery.galleryTitle"
            align="center"
          />
          <div
            data-preview-list-path="gallery.galleryImages"
            className="grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2 md:gap-4"
          >
            {galleryImages.map((imageUrl, index) => (
              <div
                key={`gallery-${index}`}
                className={`bento-item bg-slate-100 ${
                  index === 0 ? 'md:col-span-2 md:row-span-2 aspect-square md:aspect-auto md:min-h-[420px]' : 'aspect-[4/3]'
                }`}
                data-preview-item-path={`gallery.galleryImages[${index}]`}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="" data-preview-field-path={`gallery.galleryImages[${index}]`} />
                ) : (
                  <div className="flex h-full min-h-[120px] items-center justify-center text-sm text-slate-400" data-preview-field-path={`gallery.galleryImages[${index}]`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-[var(--section-padding)]">
        <div className="absolute inset-0 bg-[var(--brand-primary)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,107,44,0.2),transparent_50%)]" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Ready?"
            title={home?.ctaTitle ?? ''}
            titlePath="home.ctaTitle"
            subtitle={home?.ctaSubtitle ?? ''}
            subtitlePath="home.ctaSubtitle"
            align="center"
            dark
          />
          <div className="mt-2">
            {ctaHref ? (
              <Link href={ctaHref} className="btn-primary" data-preview-field-path="home.ctaButtonText">
                {home?.ctaButtonText ?? ''}
              </Link>
            ) : (
              <span className="btn-primary" data-preview-field-path="home.ctaButtonText">
                {home?.ctaButtonText ?? ''}
              </span>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
