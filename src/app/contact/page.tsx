'use client';

import React from 'react';
import { useSiteData } from '@/lib/siteDataContext';
import ContactForm from '@/components/ContactForm';

const CONTACT_ICONS: Record<string, React.ReactNode> = {
  phone: '📞',
  whatsapp: (
    <svg className="h-5 w-5 fill-[#25D366]" viewBox="0 0 24 24">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-5.805 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  ),
  address: '📍',
  hours: '🕐',
};

export default function ContactPage() {
  const siteData = useSiteData();
  const contact = siteData.content?.contact;

  const whatsappNumber = contact?.whatsapp || contact?.contactNumber || '+94774567890';
  const cleanWhatsapp = whatsappNumber.replace(/[^0-9]/g, '');

  const infoBlocks = [
    {
      key: 'phone',
      label: 'Phone',
      path: 'contact.contactNumber',
      value: contact?.contactNumber,
      href: contact?.contactNumber ? `tel:${contact.contactNumber}` : undefined,
    },
    {
      key: 'whatsapp',
      label: 'WhatsApp',
      path: 'contact.whatsapp',
      value: contact?.whatsapp ?? contact?.contactNumber ?? '+94 77 456 7890',
      href: cleanWhatsapp ? `https://wa.me/${cleanWhatsapp}` : undefined,
    },
    {
      key: 'address',
      label: 'Address',
      path: 'contact.address',
      value: contact?.address,
    },
    {
      key: 'hours',
      label: 'Opening Hours',
      path: 'contact.openingHours',
      value: contact?.openingHours,
    },
  ];

  return (
    <div data-preview-page-key="contact">
      <section className="relative flex items-end overflow-hidden pt-24 min-h-[50vh]">
        {contact?.bannerImageUrl ? (
          <img
            src={contact.bannerImageUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            data-preview-field-path="contact.bannerImageUrl"
          />
        ) : (
          <div
            className="absolute inset-0 bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-secondary)]"
            data-preview-field-path="contact.bannerImageUrl"
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
            data-preview-field-path="contact.pageTitle"
          >
            {contact?.pageTitle ?? ''}
          </h1>
          <p
            className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl"
            data-preview-field-path="contact.pageSubtitle"
          >
            {contact?.pageSubtitle ?? ''}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--page-background)] to-transparent" />
      </section>

      <section className="mesh-bg py-[var(--section-padding)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
          <div className="lg:col-span-2">
            <span className="section-eyebrow" data-preview-static>Reach Us</span>
            <h2 className="mt-4 text-3xl font-extrabold text-[var(--brand-primary)]" data-preview-static>
              Contact Details
            </h2>
            <div className="mt-8 space-y-4">
              {/* Phone */}
              <div className="card-premium flex gap-4 p-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--brand-primary)]/5 text-xl" data-preview-static>
                  {CONTACT_ICONS.phone}
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400" data-preview-static>Phone</p>
                  {contact?.contactNumber ? (
                    <a
                      className="mt-1 block min-h-6 text-base font-semibold text-[var(--brand-primary)] transition hover:text-[var(--brand-accent)]"
                      href={`tel:${contact.contactNumber}`}
                      data-preview-field-path="contact.contactNumber"
                    >
                      {contact.contactNumber}
                    </a>
                  ) : (
                    <p
                      className="mt-1 min-h-6 text-base font-semibold text-[var(--brand-primary)]"
                      data-preview-field-path="contact.contactNumber"
                    >
                      {contact?.contactNumber ?? ''}
                    </p>
                  )}
                </div>
              </div>

              {/* WhatsApp */}
              <div className="card-premium flex gap-4 p-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--brand-primary)]/5 text-xl" data-preview-static>
                  {CONTACT_ICONS.whatsapp}
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400" data-preview-static>WhatsApp</p>
                  {contact?.whatsapp ? (
                    <a
                      className="mt-1 block min-h-6 text-base font-semibold text-[var(--brand-primary)] transition hover:text-[var(--brand-accent)]"
                      href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-preview-field-path="contact.whatsapp"
                    >
                      {contact.whatsapp}
                    </a>
                  ) : (
                    <p
                      className="mt-1 min-h-6 text-base font-semibold text-[var(--brand-primary)]"
                      data-preview-field-path="contact.whatsapp"
                    >
                      {contact?.whatsapp ?? ''}
                    </p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div className="card-premium flex gap-4 p-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--brand-primary)]/5 text-xl" data-preview-static>
                  {CONTACT_ICONS.address}
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400" data-preview-static>Address</p>
                  <p
                    className="mt-1 min-h-6 text-base font-semibold text-[var(--brand-primary)]"
                    data-preview-field-path="contact.address"
                  >
                    {contact?.address ?? ''}
                  </p>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="card-premium flex gap-4 p-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--brand-primary)]/5 text-xl" data-preview-static>
                  {CONTACT_ICONS.hours}
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400" data-preview-static>Opening Hours</p>
                  <p
                    className="mt-1 min-h-6 text-base font-semibold text-[var(--brand-primary)]"
                    data-preview-field-path="contact.openingHours"
                  >
                    {contact?.openingHours ?? ''}
                  </p>
                </div>
              </div>

              {/* Google Map Link */}
              {contact?.googleMapLink ? (
                <a
                  href={contact.googleMapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-2 w-full truncate"
                  data-preview-field-path="contact.googleMapLink"
                >
                  {contact.googleMapLink}
                </a>
              ) : (
                <span className="inline-flex min-h-5 text-sm text-slate-400" data-preview-field-path="contact.googleMapLink" />
              )}
            </div>
          </div>

          <div className="card-premium p-8 lg:col-span-3 lg:p-10">
            <h2
              className="text-2xl font-extrabold text-[var(--brand-primary)]"
              data-preview-field-path="contact.formTitle"
            >
              {contact?.formTitle ?? ''}
            </h2>
            <p
              className="mt-2 min-h-8 text-slate-500"
              data-preview-field-path="contact.formSubtitle"
            >
              {contact?.formSubtitle ?? ''}
            </p>
            <div className="mt-8">
              <ContactForm
                submitButtonText={contact?.submitButtonText ?? ''}
                submitButtonPath="contact.submitButtonText"
                recipientEmail={contact?.email ?? ''}
                whatsappNumber={whatsappNumber}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
