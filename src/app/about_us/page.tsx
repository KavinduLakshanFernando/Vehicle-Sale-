'use client';

import React from 'react';
import { useSiteData } from '@/lib/siteDataContext';
import SectionHeader from '@/components/SectionHeader';

export default function AboutPage() {
  const siteData = useSiteData();
  const about = siteData.content?.about;
  const highlights = about?.highlights ?? [];

  return (
    <div data-preview-page-key="about_us">
      <section className="relative flex items-end overflow-hidden pt-24 min-h-[55vh]">
        {about?.bannerImageUrl ? (
          <img
            src={about.bannerImageUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            data-preview-field-path="about.bannerImageUrl"
          />
        ) : (
          <div
            className="absolute inset-0 bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-secondary)]"
            data-preview-field-path="about.bannerImageUrl"
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
            data-preview-field-path="about.pageTitle"
          >
            {about?.pageTitle ?? ''}
          </h1>
          <p
            className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl"
            data-preview-field-path="about.aboutBusiness"
          >
            {about?.aboutBusiness ?? ''}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--page-background)] to-transparent" />
      </section>

      <section className="py-[var(--section-padding)]">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="order-1 space-y-8 lg:order-1">
            <div className="card-premium p-8">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--brand-accent)]" data-preview-static>
                Our Vision
              </p>
              <p
                className="mt-4 min-h-8 text-lg leading-relaxed text-slate-600"
                data-preview-field-path="about.vision"
              >
                {about?.vision ?? ''}
              </p>
            </div>

            <div className="card-premium p-8">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--brand-accent)]" data-preview-static>
                Our Mission
              </p>
              <p
                className="mt-4 min-h-8 text-lg leading-relaxed text-slate-600"
                data-preview-field-path="about.mission"
              >
                {about?.mission ?? ''}
              </p>
            </div>

            <div className="card-premium p-8">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--brand-accent)]" data-preview-static>
                Why Choose Us
              </p>
              <p
                className="mt-4 min-h-8 text-lg leading-relaxed text-slate-600"
                data-preview-field-path="about.whyChooseUs"
              >
                {about?.whyChooseUs ?? ''}
              </p>
            </div>
          </div>
          <div className="relative order-2 lg:order-2">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[var(--brand-accent)]/15 to-transparent blur-2xl" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/5">
              {about?.profileImageUrl ? (
                <img
                  src={about.profileImageUrl}
                  alt=""
                  className="h-full w-full object-cover"
                  data-preview-field-path="about.profileImageUrl"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-slate-200 text-slate-400" data-preview-field-path="about.profileImageUrl">
                  Image
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mesh-bg py-[var(--section-padding)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Achievements" title="Our Track Record" align="center" />
          <div data-preview-list-path="about.highlights" className="grid gap-6 md:grid-cols-3">
            {highlights.map((item, index) => (
              <div
                key={item.id ?? `highlight-${index}`}
                className="card-premium p-10 text-center"
                data-preview-item-path={`about.highlights[${index}]`}
              >
                <span
                  className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-secondary)] text-3xl shadow-lg"
                  data-preview-field-path={`about.highlights[${index}].icon`}
                >
                  {item.icon ?? ''}
                </span>
                <h3
                  className="min-h-6 text-xl font-bold text-[var(--brand-primary)]"
                  data-preview-field-path={`about.highlights[${index}].title`}
                >
                  {item.title ?? ''}
                </h3>
                <p
                  className="mt-3 min-h-10 text-sm leading-relaxed text-slate-500"
                  data-preview-field-path={`about.highlights[${index}].description`}
                >
                  {item.description ?? ''}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
