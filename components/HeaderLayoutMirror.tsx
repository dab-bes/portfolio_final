"use client";

import { useEffect, type RefObject } from "react";
import { headerBackdropBgClass } from "@/lib/headerBackdrop";

const HEADER_BACKDROP = headerBackdropBgClass;

/**
 * Invisible clone of the studio header layout (typography + nav row heights) so
 * CoverPage can measure where the title sits at the top of the viewport.
 */
export function HeaderLayoutMirror({
  titleMeasureRef,
  coverGlideActive = false,
}: {
  titleMeasureRef: RefObject<HTMLSpanElement | null>;
  coverGlideActive?: boolean;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    console.log("[portfolio:/] NEW: HeaderLayoutMirror mounted (cover measuring header)");
    return () =>
      console.log("[portfolio cover→studio] HeaderLayoutMirror unmounted (cover tree gone)");
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    if (coverGlideActive) {
      console.log("[portfolio:cover] HeaderLayoutMirror backdrop fading in (glide active)");
    }
  }, [coverGlideActive]);

  return (
    <header
      className="pointer-events-none fixed top-0 left-0 z-[5] flex min-h-60 w-full shrink-0 flex-col items-center justify-center gap-6 px-4 py-8 text-white"
      aria-hidden
    >
      <div
        className={`absolute inset-x-0 top-0 bottom-0 ${HEADER_BACKDROP} transition-opacity duration-700 ease-out ${
          coverGlideActive ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="relative flex w-full flex-col items-center gap-4 text-center opacity-0">
        <p className="font-nav text-xs font-light uppercase tracking-[0.35em] text-white/55">
          web developer
        </p>
        <span
          ref={titleMeasureRef}
          className="whitespace-nowrap text-center font-brand text-5xl font-thin uppercase tracking-wide md:text-7xl lg:text-8xl"
        >
          DANIEL ABBES
        </span>
      </div>
      {/* Match studio Header scene nav slot (orb / links share min height); no real nav on cover. */}
      <div className="relative min-h-11 w-full" aria-hidden>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-11 w-11 shrink-0" />
        </div>
      </div>
      {/* Ornament: top hairline + wide stroke (same stack as Header) — disabled
      <div
        className={`pointer-events-none absolute bottom-[10px] -left-4 right-10 z-[1] h-[0.5px] origin-left bg-[linear-gradient(to_right,rgb(255_255_255/0.35)_0%,rgb(255_255_255/0.35)_82%,transparent_100%)] transition-transform duration-700 ease-out motion-reduce:transition-none ${
          coverGlideActive ? "scale-x-100" : "scale-x-0"
        }`}
        aria-hidden
      />
      <div
        className={`pointer-events-none absolute bottom-0 left-10 right-0 z-[1] h-px origin-center bg-[linear-gradient(to_right,transparent_0%,rgb(255_255_255/0.45)_10%,rgb(255_255_255/0.45)_100%)] transition-transform duration-700 ease-out motion-reduce:transition-none ${
          coverGlideActive ? "scale-x-100" : "scale-x-0"
        }`}
        aria-hidden
      />
      */}
    </header>
  );
}
