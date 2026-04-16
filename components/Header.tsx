"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SCENE_IDS, SCENE_LABELS, useScene } from "@/components/SceneContext";

export function Header() {
  const { scene: selectedScene, setScene: setSelectedScene } = useScene();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("[portfolio cover→studio] NEW: Header (scene layout) mounted");
      return () => console.log("[portfolio studio→…] Header (scene layout) unmounted");
    }
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      const el = menuWrapRef.current;
      if (el && !el.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [menuOpen]);

  return (
    <header className="flex min-h-60 w-full shrink-0 flex-col items-center justify-center gap-6 bg-[linear-gradient(180deg,rgb(0_0_0/0.6)_0%,rgb(0_0_0/0.6)_calc(100%-20px),transparent_100%)] px-4 py-8 text-white">
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

      {/* Mobile: lines left, current scene label right */}
      <div
        ref={menuWrapRef}
        className="animate-header-scene-nav-in relative w-full max-w-xs md:hidden"
      >
        <div className="relative flex min-h-11 w-full items-center justify-between gap-3">
          <button
            type="button"
            className="flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-1 rounded-lg bg-white/5 transition-colors hover:bg-white/10 active:bg-white/15"
            aria-expanded={menuOpen}
            aria-controls="scene-menu"
            aria-label="Choose scene"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="h-0.5 w-5 rounded-full bg-white" aria-hidden />
            <span className="h-0.5 w-5 rounded-full bg-white" aria-hidden />
            <span className="h-0.5 w-5 rounded-full bg-white" aria-hidden />
          </button>
          <span
            className={`truncate text-right font-nav text-sm font-light lowercase tracking-wide ${
              selectedScene == null ? "text-white/40" : ""
            }`}
          >
            {selectedScene != null ? SCENE_LABELS[selectedScene] : "—"}
          </span>
        </div>

        {menuOpen ? (
          <div
            id="scene-menu"
            role="listbox"
            aria-label="scenes"
            className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-lg border border-white/20 bg-black/90 shadow-lg backdrop-blur-sm"
          >
            {SCENE_IDS.map((n) => (
              <button
                key={n}
                type="button"
                role="option"
                aria-selected={selectedScene === n}
                className={`font-nav block w-full px-4 py-3 text-left text-sm font-light lowercase transition-colors hover:bg-white/10 ${
                  selectedScene === n ? "bg-white/15 text-white" : "text-white/90"
                }`}
                onClick={() => {
                  setSelectedScene(n);
                  setMenuOpen(false);
                }}
              >
                {SCENE_LABELS[n]}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {/* Desktop: equal columns so scene links span the width evenly */}
      <div className="animate-header-scene-nav-in hidden w-full grid-cols-3 place-items-center gap-y-2 font-nav font-light lowercase md:grid">
        {SCENE_IDS.map((n) => (
          <button
            key={n}
            type="button"
            className={`relative whitespace-nowrap pb-1 transition-[transform,opacity,text-shadow] duration-500 ease-out after:pointer-events-none after:absolute after:bottom-0 after:left-1/2 after:h-[0.5px] after:w-full after:-translate-x-1/2 after:origin-center after:bg-white/50 after:transition-transform after:duration-500 after:ease-out motion-reduce:scale-100 motion-reduce:text-shadow-none motion-reduce:transition-opacity motion-reduce:after:transition-none ${
              selectedScene === n
                ? "opacity-100 scale-[1.1] [text-shadow:0_0_18px_rgb(255_255_255/0.35),0_0_34px_rgb(255_255_255/0.14)] after:scale-x-100"
                : "scale-100 text-shadow-none opacity-70 after:scale-x-0 hover:opacity-100 hover:scale-[1.1] hover:[text-shadow:0_0_18px_rgb(255_255_255/0.35),0_0_34px_rgb(255_255_255/0.14)] hover:after:scale-x-100"
            }`}
            onClick={() => setSelectedScene(n)}
          >
            {SCENE_LABELS[n]}
          </button>
        ))}
      </div>
    </header>
  );
}
