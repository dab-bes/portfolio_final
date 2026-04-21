"use client";

import type { ButtonHTMLAttributes } from "react";
import { useLayoutEffect, useState } from "react";

/** Default time until the orb appears (mobile, coarse pointer, or desktop if the mouse never moves). */
const ORB_ENTRANCE_DELAY_MS = 2000;

/** Desktop + fine pointer: reveal on first mousemove, with the same 2s timer as mobile if the pointer never moves. */
function isDesktopFinePointer(): boolean {
  return window.matchMedia("(min-width: 768px) and (pointer: fine)").matches;
}

const orbInnerClassName =
  "animate-scene-nav-dot-breathe group-hover:[animation-play-state:paused] group-disabled:[animation-play-state:paused] inline-block size-[1.125rem] origin-center rounded-full bg-white blur-[6px] shadow-[0_0_10px_rgba(255,255,255,0.95),0_0_24px_rgba(255,255,255,0.65),0_0_44px_rgba(255,255,255,0.42),0_0_64px_rgba(255,255,255,0.22)] transition-transform duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-125 motion-reduce:animate-none motion-reduce:group-hover:scale-100";

const floatWrapClassName =
  "animate-scene-nav-dot-float group-hover:[animation-play-state:paused] group-disabled:[animation-play-state:paused] inline-flex items-center justify-center motion-reduce:animate-none";

type GlowOrbButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

/**
 * Scene nav “glow orb” control — same visuals as the mobile menu dot (float + breathe).
 * Entrance: 2s delay, except desktop + fine pointer may reveal earlier on first mousemove.
 * Skipped when prefers-reduced-motion.
 */
export function GlowOrbButton({ className = "", type = "button", ...rest }: GlowOrbButtonProps) {
  const [entered, setEntered] = useState(false);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setEntered(true);
      return;
    }

    if (isDesktopFinePointer()) {
      let revealed = false;
      const reveal = () => {
        if (revealed) return;
        revealed = true;
        setEntered(true);
        window.removeEventListener("mousemove", onMouseMove);
        window.clearTimeout(fallbackId);
      };
      const onMouseMove = () => reveal();
      const fallbackId = window.setTimeout(reveal, ORB_ENTRANCE_DELAY_MS);
      window.addEventListener("mousemove", onMouseMove, { passive: true });
      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.clearTimeout(fallbackId);
      };
    }

    const id = window.setTimeout(() => setEntered(true), ORB_ENTRANCE_DELAY_MS);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div
      className={`group inline-flex shrink-0 transition-opacity duration-700 ease-out ${className}`}
      style={
        !entered
          ? { opacity: 0, pointerEvents: "none" }
          : undefined
      }
      inert={!entered}
    >
      <button
        type={type}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none"
        {...rest}
      >
        <span className={floatWrapClassName} aria-hidden>
          <span className={orbInnerClassName} />
        </span>
      </button>
    </div>
  );
}
