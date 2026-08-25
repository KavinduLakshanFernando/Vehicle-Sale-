import React from 'react';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  titlePath?: string;
  subtitle?: string;
  subtitlePath?: string;
  align?: 'left' | 'center';
  dark?: boolean;
}

export default function SectionHeader({
  eyebrow,
  title,
  titlePath,
  subtitle,
  subtitlePath,
  align = 'left',
  dark = false,
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center items-center mx-auto' : 'text-left items-start';

  return (
    <div className={`mb-14 flex max-w-3xl flex-col gap-4 ${alignClass}`}>
      <span className="section-eyebrow" data-preview-static="true">
        {eyebrow}
      </span>
      <h2
        className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl ${
          dark ? 'text-white' : 'text-[var(--brand-primary)]'
        }`}
        {...(titlePath ? { 'data-preview-field-path': titlePath } : { 'data-preview-static': 'true' })}
      >
        {title}
      </h2>
      {subtitle !== undefined && (
        <p
          className={`min-h-8 text-lg leading-relaxed ${
            dark ? 'text-slate-300' : 'text-slate-500'
          }`}
          {...(subtitlePath ? { 'data-preview-field-path': subtitlePath } : { 'data-preview-static': 'true' })}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
