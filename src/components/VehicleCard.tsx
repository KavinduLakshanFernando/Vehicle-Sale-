'use client';

import Link from 'next/link';
import React from 'react';
import type { VehicleItem } from '@/lib/siteDataContext';
import { pageHref } from '@/lib/navigation';

interface VehicleCardProps {
  vehicle: VehicleItem;
  index: number;
  showContactLink?: boolean;
  contactEnabled?: boolean;
}

export default function VehicleCard({
  vehicle,
  index,
  showContactLink = false,
  contactEnabled = false,
}: VehicleCardProps) {
  const imageUrl = vehicle.imageUrl ?? '';

  return (
    <article
      className="card-premium group"
      data-preview-item-path={`vehicles[${index}]`}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt=""
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
            data-preview-field-path={`vehicles[${index}].imageUrl`}
          />
        ) : (
          <div
            className="flex h-full items-center justify-center text-sm text-slate-400"
            data-preview-field-path={`vehicles[${index}].imageUrl`}
          >
            No image
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {vehicle.badge && (
          <span
            className="absolute left-4 top-4 rounded-full bg-[var(--brand-accent)] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white shadow-lg"
            data-preview-field-path={`vehicles[${index}].badge`}
          >
            {vehicle.badge}
          </span>
        )}
        {!vehicle.badge && (
          <span
            className="absolute left-4 top-4 min-h-5 rounded-full px-3.5 py-1.5 text-[11px] font-bold text-transparent"
            data-preview-field-path={`vehicles[${index}].badge`}
          />
        )}
      </div>

      <div className="p-6">
        <h3
          className="min-h-6 text-xl font-bold text-[var(--brand-primary)]"
          data-preview-field-path={`vehicles[${index}].name`}
        >
          {vehicle.name ?? ''}
        </h3>

        <div className="mt-3 flex flex-wrap gap-2">
          {vehicle.year ? (
            <span
              className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600"
              data-preview-field-path={`vehicles[${index}].year`}
            >
              {vehicle.year}
            </span>
          ) : (
            <span className="hidden" data-preview-field-path={`vehicles[${index}].year`} />
          )}
          {vehicle.mileage ? (
            <span
              className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600"
              data-preview-field-path={`vehicles[${index}].mileage`}
            >
              {vehicle.mileage}
            </span>
          ) : (
            <span className="hidden" data-preview-field-path={`vehicles[${index}].mileage`} />
          )}
          {vehicle.fuelType ? (
            <span
              className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600"
              data-preview-field-path={`vehicles[${index}].fuelType`}
            >
              {vehicle.fuelType}
            </span>
          ) : (
            <span className="hidden" data-preview-field-path={`vehicles[${index}].fuelType`} />
          )}
          {vehicle.transmission ? (
            <span
              className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600"
              data-preview-field-path={`vehicles[${index}].transmission`}
            >
              {vehicle.transmission}
            </span>
          ) : (
            <span className="hidden" data-preview-field-path={`vehicles[${index}].transmission`} />
          )}
        </div>

        <p
          className="mt-4 min-h-10 line-clamp-2 text-sm leading-relaxed text-slate-500"
          data-preview-field-path={`vehicles[${index}].description`}
        >
          {vehicle.description ?? ''}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-5">
          <p
            className="min-h-6 text-2xl font-extrabold gradient-text"
            data-preview-field-path={`vehicles[${index}].price`}
          >
            {vehicle.price ?? ''}
          </p>
          {showContactLink && contactEnabled && (
            <Link
              href={pageHref('contact')}
              data-target-page="contact"
              data-preview-static
              className="rounded-full bg-[var(--brand-primary)] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[var(--brand-secondary)]"
            >
              Inquire →
            </Link>
          )}
          {showContactLink && !contactEnabled && (
            <span data-target-page="contact" data-preview-static className="rounded-full bg-slate-100 px-5 py-2.5 text-xs font-bold text-slate-500">
              Inquire →
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
