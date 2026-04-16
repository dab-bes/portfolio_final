import type { RefObject } from "react";

/**
 * Invisible clone of the studio header layout (typography + nav row heights) so
 * CoverPage can measure where the title sits at the top of the viewport.
 */
export function HeaderLayoutMirror({
  titleMeasureRef,
}: {
  titleMeasureRef: RefObject<HTMLSpanElement | null>;
}) {
  return (
    <header
      className="pointer-events-none fixed top-0 left-0 z-[-1] flex min-h-56 w-full shrink-0 flex-col items-center justify-center gap-6 px-4 py-8 text-white opacity-0"
      aria-hidden
    >
      <div className="flex w-full flex-col items-center gap-4 text-center">
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
      <div className="relative w-full max-w-xs md:hidden">
        <div className="relative flex min-h-11 w-full items-center justify-between gap-3">
          <span className="flex h-11 w-11 shrink-0" />
          <span className="truncate text-right font-nav text-sm font-light lowercase tracking-wide">
            portfolio
          </span>
        </div>
      </div>
      <div className="hidden w-full grid-cols-3 place-items-center gap-y-2 font-nav font-light lowercase md:grid">
        <span className="whitespace-nowrap font-nav text-sm font-light lowercase opacity-70">
          about me
        </span>
        <span className="whitespace-nowrap font-nav text-sm font-light lowercase opacity-70">
          portfolio
        </span>
        <span className="whitespace-nowrap font-nav text-sm font-light lowercase opacity-70">
          connect
        </span>
      </div>
    </header>
  );
}
