"use client";

import { useEffect, useRef, useState } from "react";
import { SCENE_IDS, SCENE_LABELS, useScene } from "@/components/SceneContext";

export function Header() {
  const { scene: selectedScene, setScene: setSelectedScene } = useScene();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuWrapRef = useRef<HTMLDivElement>(null);

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
    <header className="flex min-h-56 w-full shrink-0 flex-col items-center justify-center gap-6 bg-black/60 px-4 py-8 text-white">
      <span className="font-brand text-[40px] font-thin uppercase tracking-wide md:text-[90px]">
        DANIEL ABBES
      </span>

      {/* Mobile: lines left, current scene label right */}
      <div ref={menuWrapRef} className="relative w-full max-w-xs md:hidden">
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
          <span className="truncate text-right font-nav text-sm font-light lowercase tracking-wide">
            {SCENE_LABELS[selectedScene]}
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
      <div className="hidden w-full grid-cols-3 place-items-center gap-y-2 font-nav font-light lowercase md:grid">
        {SCENE_IDS.map((n) => (
          <button
            key={n}
            type="button"
            className={`whitespace-nowrap transition-opacity hover:opacity-100 ${
              selectedScene === n ? "opacity-100 underline decoration-white/50 underline-offset-4" : "opacity-70"
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
