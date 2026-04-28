"use client";

import Link from "next/link";
import { useEffect } from "react";
import { SceneNavigation } from "@/components/SceneNavigation";
import { headerBackdropBgClass } from "@/lib/headerBackdrop";

export function Header() {
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
      className={`relative flex min-h-60 w-full shrink-0 flex-col items-center justify-center gap-6 ${headerBackdropBgClass} px-4 py-8 text-white`}
    >
      {/* Ornament: top hairline + wide stroke
      <div
        aria-hidden
        className={`pointer-events-none absolute bottom-[10px] -left-4 right-10 z-[1] h-[0.5px] ${topSmallLineBg}`}
      />
      <div className={`pointer-events-none absolute bottom-0 left-10 right-0 z-[1] h-px ${wideLineBg}`} aria-hidden />
      */}
      <div className="flex w-full flex-col items-center gap-4 text-center">
        <p className="font-nav text-xs font-light uppercase tracking-[0.35em] text-white/55">
          web developer
        </p>
        <Link
          href="/"
          aria-label="Home"
          className="whitespace-nowrap text-center font-brand text-5xl font-thin uppercase tracking-wide transition-opacity hover:opacity-90 md:text-7xl lg:text-8xl"
        >
          DANIEL ABBES
        </Link>
      </div>

      <SceneNavigation variant="full" />
    </header>
  );
}
