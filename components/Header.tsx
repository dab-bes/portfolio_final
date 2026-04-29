"use client";

import Link from "next/link";
import { useEffect } from "react";
import { SceneNavigation } from "@/components/SceneNavigation";
import { useScene } from "@/components/SceneContext";
import { headerBackdropBgClass } from "@/lib/headerBackdrop";

export function Header() {
  const { scene } = useScene();
  const collapseNav = scene !== null;
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("[portfolio cover→studio] NEW: Header (scene layout) mounted");
      return () => console.log("[portfolio studio→…] Header (scene layout) unmounted");
    }
  }, []);

  /* Ornament gradients (top hairline + wide stroke) — disabled
  const topSmallLineBg =
    "bg-[linear-gradient(to_right,rgb(255_255_255/0.35)_0%,rgb(255_255_255/0.35)_82%,transparent_100%)]";
  const wideLineBg =
    "bg-[linear-gradient(to_right,transparent_0%,rgb(255_255_255/0.45)_10%,rgb(255_255_255/0.45)_100%)]";
  */

  return (
    <header
      className={`relative flex w-full shrink-0 flex-col items-center px-4 text-white md:min-h-60 md:justify-center md:gap-8 md:py-8 ${headerBackdropBgClass} ${
        collapseNav
          ? "max-md:min-h-0 max-md:flex-row max-md:items-center max-md:justify-between max-md:gap-4 max-md:py-3"
          : "min-h-60 justify-center gap-6 py-8"
      }`}
    >
      {/* Ornament: top hairline + wide stroke
      <div
        aria-hidden
        className={`pointer-events-none absolute bottom-[10px] -left-4 right-10 z-[1] h-[0.5px] ${topSmallLineBg}`}
      />
      <div className={`pointer-events-none absolute bottom-0 left-10 right-0 z-[1] h-px ${wideLineBg}`} aria-hidden />
      */}
      <div
        className={
          collapseNav
            ? "flex w-full min-w-0 flex-col gap-1 text-left max-md:flex-1 max-md:items-start md:flex-none md:items-center md:gap-4 md:text-center"
            : "flex w-full flex-col items-center gap-4 text-center"
        }
      >
        <p
          className={`font-nav text-xs font-light uppercase tracking-[0.35em] text-white/55 ${
            collapseNav ? "max-md:hidden" : ""
          }`}
        >
          web developer
        </p>
        <Link
          href="/"
          aria-label="Home"
          className={`whitespace-nowrap font-brand font-thin uppercase tracking-wide transition-opacity hover:opacity-90 ${
            collapseNav
              ? "text-center text-5xl max-md:text-left max-md:text-2xl max-md:leading-tight md:text-center md:text-7xl lg:text-8xl"
              : "text-center text-5xl md:text-7xl lg:text-8xl"
          }`}
        >
          DANIEL ABBES
        </Link>
      </div>

      <SceneNavigation variant="full" collapseMobileTray={collapseNav} />
    </header>
  );
}
