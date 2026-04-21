"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const RESUME_FILE = "Christian Daniel Abbes - Web Developer.pdf";
const RESUME_HREF = `/${encodeURIComponent(RESUME_FILE)}`;
const BIO_STORY_TITLE = "North Is That Way";

const ABOUT_LOGOS = [
  {
    animationClass: "animate-scene-about-in-logo-1",
    srcSvg: "/logos/pacsun.svg",
    srcPng: "/logos/pacsun.png",
    alt: "PacSun logo",
    width: 512,
    height: 101,
  },
  {
    animationClass: "animate-scene-about-in-logo-2",
    srcSvg: "/logos/bbrew.svg",
    srcPng: "/logos/bbrew.png",
    alt: "Brew logo",
    width: 300,
    height: 300,
  },
  {
    animationClass: "animate-scene-about-in-logo-3",
    srcSvg: "/logos/bu.svg",
    srcPng: "/logos/bu.png",
    alt: "BU logo",
    width: 620,
    height: 276,
  },
] as const;

const BBREW_LOGO_PNG = "/logos/bbrew.png";

const ABOUT_LOGO_AUTO_MS = 4000;

/** Real slides + duplicate of first for forward-only wrap (3 → clone → jump to 0). */
const ABOUT_LOGO_TRACK = [...ABOUT_LOGOS, ABOUT_LOGOS[0]] as const;
const ABOUT_LOGO_LOOP_INDEX = ABOUT_LOGOS.length;

function AboutLogoCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const autoPauseRef = useRef(false);
  const scrollEndFallbackTRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [active, setActive] = useState(0);

  const normalizeSlideIndex = useCallback((raw: number) => {
    if (raw >= ABOUT_LOGO_LOOP_INDEX) return 0;
    return Math.min(ABOUT_LOGOS.length - 1, Math.max(0, raw));
  }, []);

  const updateActive = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const w = el.clientWidth;
    if (w <= 0) return;
    const raw = Math.round(el.scrollLeft / w);
    setActive(normalizeSlideIndex(raw));
  }, [normalizeSlideIndex]);

  const jumpOffLoopClone = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const w = el.clientWidth;
    if (w <= 0) return;
    const raw = Math.round(el.scrollLeft / w);
    if (raw >= ABOUT_LOGO_LOOP_INDEX) {
      el.scrollTo({ left: 0, behavior: "auto" });
    }
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateActive();
    el.addEventListener("scroll", updateActive, { passive: true });
    const ro = new ResizeObserver(updateActive);
    ro.observe(el);

    const onScrollEnd = () => jumpOffLoopClone();
    el.addEventListener("scrollend", onScrollEnd);

    const onScrollFallback = () => {
      window.clearTimeout(scrollEndFallbackTRef.current);
      scrollEndFallbackTRef.current = window.setTimeout(onScrollEnd, 140);
    };
    el.addEventListener("scroll", onScrollFallback, { passive: true });

    return () => {
      el.removeEventListener("scroll", updateActive);
      el.removeEventListener("scrollend", onScrollEnd);
      el.removeEventListener("scroll", onScrollFallback);
      window.clearTimeout(scrollEndFallbackTRef.current);
      ro.disconnect();
    };
  }, [updateActive, jumpOffLoopClone]);

  const goTo = (index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const w = el.clientWidth;
    if (w <= 0) return;
    const smooth =
      typeof window !== "undefined" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const raw = Math.round(el.scrollLeft / w);
    const current = normalizeSlideIndex(raw);
    if (index === current) return;

    if (index < current && current === ABOUT_LOGOS.length - 1 && index === 0) {
      el.scrollTo({
        left: ABOUT_LOGO_LOOP_INDEX * w,
        behavior: smooth ? "smooth" : "auto",
      });
      return;
    }

    el.scrollTo({
      left: index * w,
      behavior: smooth ? "smooth" : "auto",
    });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = scrollerRef.current;
    if (!el) return;

    const onVisibility = () => {
      autoPauseRef.current = document.visibilityState !== "visible";
    };
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);

    const id = window.setInterval(() => {
      if (autoPauseRef.current) return;
      const w = el.clientWidth;
      if (w <= 0) return;
      const raw = Math.round(el.scrollLeft / w);
      const effective = raw >= ABOUT_LOGO_LOOP_INDEX ? 0 : raw;
      const nextSlide =
        effective === ABOUT_LOGOS.length - 1 ? ABOUT_LOGO_LOOP_INDEX : effective + 1;
      el.scrollTo({
        left: nextSlide * w,
        behavior: "smooth",
      });
    }, ABOUT_LOGO_AUTO_MS);

    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div
      className="w-full px-2 py-4 md:py-3"
      onMouseEnter={() => {
        autoPauseRef.current = true;
      }}
      onMouseLeave={() => {
        autoPauseRef.current = false;
      }}
    >
      <div
        ref={scrollerRef}
        className="hide-scrollbar flex w-full touch-pan-x snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
      >
        {ABOUT_LOGO_TRACK.map((logo, slideIndex) => (
          <div
            key={
              slideIndex === ABOUT_LOGO_LOOP_INDEX
                ? `${logo.srcPng}-loop`
                : logo.srcPng
            }
            className="flex w-full min-w-full shrink-0 snap-center items-center justify-center py-1"
            aria-hidden={slideIndex === ABOUT_LOGO_LOOP_INDEX ? true : undefined}
          >
            <picture
              className={`${logo.animationClass} block h-auto w-auto max-w-[4.5rem] shrink-0 ${
                logo.srcPng === BBREW_LOGO_PNG
                  ? "md:max-w-[min(10rem,calc(100%-1rem))]"
                  : "md:max-w-[min(8rem,calc(100%-1rem))]"
              }`}
            >
              <source srcSet={logo.srcSvg} type="image/svg+xml" />
              <img
                src={logo.srcPng}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className={`h-auto w-full object-contain max-h-11 ${
                  logo.srcPng === BBREW_LOGO_PNG
                    ? "md:max-h-[5.25rem]"
                    : "md:max-h-16"
                }`}
                decoding="async"
              />
            </picture>
          </div>
        ))}
      </div>
      <div
        className="mt-3 flex justify-center gap-2"
        aria-label="Logo slides"
        role="group"
      >
        {ABOUT_LOGOS.map((logo, i) => (
          <button
            key={logo.srcPng}
            type="button"
            aria-label={`${logo.alt}, slide ${i + 1} of ${ABOUT_LOGOS.length}`}
            aria-current={active === i ? "true" : undefined}
            className={`h-1.5 w-1.5 rounded-full transition-[background-color,transform] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60 ${
              active === i ? "scale-110 bg-white/80" : "bg-white/30 hover:bg-white/45"
            }`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}

function Scene1Portrait({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative aspect-square w-full shrink-0 overflow-hidden rounded-lg md:mx-0 md:w-52 md:max-w-none md:aspect-[4/5] lg:w-60${className ? ` ${className}` : ""}`}
    >
      <picture className="absolute inset-0 block">
        <source srcSet="/self.webp" type="image/webp" />
        <img
          src="/self.png"
          alt="Profile photo"
          width={2134}
          height={1939}
          className="h-full w-full object-cover object-center [mask-image:radial-gradient(ellipse_96%_98%_at_50%_50%,#000_55%,#000_74%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_96%_98%_at_50%_50%,#000_55%,#000_74%,transparent_100%)]"
          decoding="async"
          fetchPriority="high"
        />
      </picture>
    </div>
  );
}

export function Scene1About({
  heading,
  body,
}: {
  heading: string;
  body: string | readonly string[];
}) {
  return (
    <div className="relative flex min-h-0 w-full flex-1 flex-col gap-8 md:flex-row md:items-stretch md:gap-10">
      <div className="flex min-w-0 flex-1 flex-col md:gap-0">
        <h1 className="animate-scene-in-title relative z-20 mt-7 min-w-0 font-brand text-4xl font-thin normal-case tracking-wide md:mt-0">
          {heading}
        </h1>
        <div className="relative max-md:mt-4 md:mt-6">
          <div className="animate-scene-about-in-bio relative z-10 w-full rounded-lg border border-white/15 bg-black/25 px-4 py-3 shadow-sm backdrop-blur-sm max-md:flex max-md:h-[min(65vh,26rem)] max-md:min-h-0 max-md:flex-col max-md:overflow-hidden">
            <div className="hide-scrollbar min-h-0 max-md:min-h-0 max-md:flex-1 max-md:overflow-y-auto max-md:overscroll-y-contain">
              <div className="mb-5 flex items-start justify-between gap-3 border-b border-white/15 pb-3 md:block">
                <h2 className="min-w-0 flex-1 pt-2 text-left font-brand text-lg font-light italic tracking-[0.02em] text-white md:pt-0 md:text-right md:text-xl">
                  {BIO_STORY_TITLE}
                </h2>
                <div className="animate-scene-about-in-photo relative z-20 shrink-0 overflow-hidden rounded-md md:hidden">
                  <Scene1Portrait className="!h-28 !w-28 !max-w-none aspect-square rounded-md !outline-none min-h-0 min-w-0" />
                </div>
              </div>
              {Array.isArray(body) ? (
                <div className="space-y-4">
                  {body.map((paragraph, i) => (
                    <p
                      key={i}
                      className="font-nav text-sm font-light leading-relaxed text-white/90"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="font-nav text-sm font-light leading-relaxed text-white/90">
                  {body}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full shrink-0 flex-col gap-4 md:min-h-0 md:w-60 md:pt-10 lg:w-64">
        <div className="animate-scene-about-in-photo hidden shrink-0 md:mx-auto md:mt-[40px] md:block">
          <Scene1Portrait />
        </div>
        <div className="flex min-h-0 flex-col md:min-h-0 md:flex-1 md:justify-end">
          <AboutLogoCarousel />
        </div>
      </div>
      <a
        href={RESUME_HREF}
        download={RESUME_FILE}
        className="animate-scene-about-in-resume absolute top-0 right-0 z-10 inline-flex border-b border-white/35 px-0 pb-px font-nav text-xs font-light lowercase tracking-wide text-white transition-[opacity,border-color] hover:border-white/55 hover:opacity-80 active:opacity-70"
      >
        download resume
      </a>
    </div>
  );
}
