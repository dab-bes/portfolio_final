"use client";

import { useRouter } from "next/navigation";
import { startTransition, useCallback, useEffect, useRef, useState } from "react";
import { HeaderLayoutMirror } from "@/components/HeaderLayoutMirror";

export function CoverPage() {
  const router = useRouter();
  const [glide, setGlide] = useState<{ dy: number } | null>(null);
  const didNavigate = useRef(false);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const mirrorTitleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    console.log("[portfolio:/] CoverPage mounted");
    return () => console.log("[portfolio cover→studio] CoverPage unmounted (route leaving /)");
  }, []);

  const goStudio = useCallback(() => {
    if (didNavigate.current) return;
    didNavigate.current = true;
    if (process.env.NODE_ENV === "development") {
      console.log("[portfolio cover→studio] router.push(/studio) — next paint will mount studio layout");
    }
    startTransition(() => {
      router.push("/studio");
    });
  }, [router]);

  const onEnter = useCallback(() => {
    if (glide) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      goStudio();
      return;
    }

    const h1 = h1Ref.current;
    const target = mirrorTitleRef.current;
    if (!h1 || !target) {
      goStudio();
      return;
    }

    const dy = target.getBoundingClientRect().top - h1.getBoundingClientRect().top;
    setGlide({ dy });
  }, [glide, goStudio]);

  const onGlideTransitionEnd = useCallback(
    (e: React.TransitionEvent<HTMLDivElement>) => {
      if (e.propertyName !== "transform" || !glide) return;
      goStudio();
    },
    [glide, goStudio],
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-10 px-4 py-16 text-white">
      <HeaderLayoutMirror titleMeasureRef={mirrorTitleRef} coverGlideActive={glide !== null} />

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center gap-4 text-center">
        <div
          className="flex w-full flex-col items-center gap-4 text-center transition-transform duration-700 ease-out will-change-transform"
          style={{
            transform: glide ? `translateY(${glide.dy}px)` : "translateY(0)",
          }}
          onTransitionEnd={onGlideTransitionEnd}
        >
          <p className="font-nav text-xs font-light uppercase tracking-[0.35em] text-white/55">
            web developer
          </p>
          <h1
            ref={h1Ref}
            className="whitespace-nowrap text-center font-brand text-5xl font-thin uppercase tracking-wide md:text-7xl lg:text-8xl"
          >
            DANIEL ABBES
          </h1>
        </div>
        <p
          className={`max-w-lg font-nav text-sm font-light leading-relaxed text-white/75 transition-opacity duration-700 ease-out md:text-base ${
            glide ? "opacity-0" : "opacity-100"
          }`}
        >
          Art, creativity, and code — building things that matter.
        </p>
      </div>
      <button
        type="button"
        onClick={onEnter}
        disabled={!!glide}
        className={`relative z-10 font-nav text-sm font-light lowercase tracking-wide text-white/90 underline decoration-white/40 underline-offset-[10px] transition-[opacity,color,text-decoration-color] duration-700 ease-out hover:text-white hover:decoration-white/70 disabled:pointer-events-none ${
          glide ? "opacity-0" : "opacity-100"
        }`}
      >
        enter site
      </button>
    </div>
  );
}
