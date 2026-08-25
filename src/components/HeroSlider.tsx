'use client';

import React, { useCallback, useEffect, useState } from 'react';

interface HeroSliderProps {
  slides: string[];
  listPath: string;
  minHeight?: string;
  overlay?: boolean;
  children: React.ReactNode;
}

export default function HeroSlider({
  slides,
  listPath,
  minHeight = 'var(--hero-min-height, 92vh)',
  overlay = true,
  children,
}: HeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const slideCount = slides.length;
  const interval = 5000;

  const goTo = useCallback(
    (index: number) => {
      if (slideCount === 0) return;
      setActiveIndex(((index % slideCount) + slideCount) % slideCount);
      setProgress(0);
    },
    [slideCount],
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (slideCount <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slideCount);
      setProgress(0);
    }, interval);
    return () => window.clearInterval(timer);
  }, [slideCount]);

  useEffect(() => {
    if (slideCount <= 1) return;
    const start = Date.now();
    const tick = window.setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / interval) * 100, 100));
    }, 50);
    return () => window.clearInterval(tick);
  }, [activeIndex, slideCount]);

  return (
    <section
      className="relative flex min-h-[92vh] items-center overflow-hidden"
      style={{ minHeight }}
    >
      <div className="absolute inset-0" data-preview-list-path="home.heroSlides">
        {slideCount > 0 ? (
          slides.map((imageUrl, index) => (
            <div
              key={`hero-slide-${index}`}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === activeIndex ? 'opacity-100' : 'opacity-0'
              }`}
              data-preview-item-path={`home.heroSlides[${index}]`}
              aria-hidden={index !== activeIndex}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt=""
                  className={`h-full w-full object-cover ${index === activeIndex ? 'animate-ken-burns' : ''}`}
                  data-preview-field-path={`home.heroSlides[${index}]`}
                />
              ) : (
                <div
                  className="h-full w-full bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-secondary)]"
                  data-preview-field-path={`home.heroSlides[${index}]`}
                />
              )}
            </div>
          ))
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-secondary)]" />
        )}
      </div>

      {overlay && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-primary)]/95 via-[var(--brand-primary)]/75 to-[var(--brand-primary)]/40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,transparent_0%,var(--brand-primary)_70%)] opacity-60" />
        </>
      )}

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-28 pt-32 sm:px-6 lg:px-8">
        <div className="animate-fade-up max-w-4xl">{children}</div>
      </div>

      {slideCount > 1 && (
        <>
          <button
            type="button"
            data-preview-static
            onClick={goPrev}
            className="absolute left-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xl text-white backdrop-blur-md transition hover:bg-white/20 sm:flex lg:left-8"
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            type="button"
            data-preview-static
            onClick={goNext}
            className="absolute right-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xl text-white backdrop-blur-md transition hover:bg-white/20 sm:flex lg:right-8"
            aria-label="Next slide"
          >
            ›
          </button>

          <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              {slides.map((_, index) => (
                <button
                  key={`hero-dot-${index}`}
                  type="button"
                  data-preview-static
                  onClick={() => goTo(index)}
                  className={`relative overflow-hidden rounded-full transition-all ${
                    index === activeIndex
                      ? 'h-2 w-10 bg-white/30'
                      : 'h-2 w-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                >
                  {index === activeIndex && (
                    <span
                      className="absolute inset-y-0 left-0 rounded-full bg-[var(--brand-accent)] transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                </button>
              ))}
            </div>
            <span className="text-xs font-medium tracking-widest text-white/60" data-preview-static>
              {String(activeIndex + 1).padStart(2, '0')} / {String(slideCount).padStart(2, '0')}
            </span>
          </div>
        </>
      )}

      <div className="absolute bottom-0 left-0 right-0 z-10 h-24 bg-gradient-to-t from-[var(--page-background)] to-transparent" />
    </section>
  );
}
