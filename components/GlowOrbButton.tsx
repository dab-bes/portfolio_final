"use client";

import type { ButtonHTMLAttributes } from "react";

const orbInnerClassName =
  "animate-scene-nav-dot-breathe group-hover:[animation-play-state:paused] group-disabled:[animation-play-state:paused] inline-block size-[1.125rem] origin-center rounded-full bg-white blur-[6px] shadow-[0_0_10px_rgba(255,255,255,0.95),0_0_24px_rgba(255,255,255,0.65),0_0_44px_rgba(255,255,255,0.42),0_0_64px_rgba(255,255,255,0.22)] transition-[transform,box-shadow] duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:-translate-y-2 group-hover:scale-125 group-hover:shadow-[0_14px_48px_rgba(255,255,255,0.75),0_0_32px_rgba(255,255,255,0.85),0_0_52px_rgba(255,255,255,0.55),0_0_80px_rgba(255,255,255,0.28)] group-active:translate-y-0 group-active:scale-100 group-active:shadow-[0_0_10px_rgba(255,255,255,0.95),0_0_24px_rgba(255,255,255,0.65),0_0_44px_rgba(255,255,255,0.42),0_0_64px_rgba(255,255,255,0.22)] motion-reduce:animate-none motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-hover:scale-100 motion-reduce:group-hover:shadow-[0_0_10px_rgba(255,255,255,0.95),0_0_24px_rgba(255,255,255,0.65),0_0_44px_rgba(255,255,255,0.42),0_0_64px_rgba(255,255,255,0.22)]";

const floatWrapClassName =
  "animate-scene-nav-dot-float group-hover:[animation-play-state:paused] group-disabled:[animation-play-state:paused] inline-flex items-center justify-center motion-reduce:animate-none";

type GlowOrbButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

/**
 * Scene nav “glow orb” control — same visuals as the mobile menu dot (float + breathe + hover).
 */
export function GlowOrbButton({ className = "", type = "button", ...rest }: GlowOrbButtonProps) {
  return (
    <button
      type={type}
      className={`group flex h-11 w-11 shrink-0 items-center justify-center rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-40 ${className}`}
      {...rest}
    >
      <span className={floatWrapClassName} aria-hidden>
        <span className={orbInnerClassName} />
      </span>
    </button>
  );
}
