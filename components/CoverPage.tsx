"use client";

import { useRouter } from "next/navigation";
import {
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { GlowOrbButton } from "@/components/GlowOrbButton";
import { HeaderLayoutMirror } from "@/components/HeaderLayoutMirror";
import { markSceneNavOpenAfterCoverEnter } from "@/lib/sceneNavFromCoverSession";

function CoverTextBackdrop({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative rounded-2xl px-5 py-4 md:px-6 md:py-5 ${className}`}>
      <div className="relative">{children}</div>
    </div>
  );
}

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
    markSceneNavOpenAfterCoverEnter();
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

    const dy =
      target.getBoundingClientRect().top - h1.getBoundingClientRect().top;
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

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center gap-4 text-center md:max-w-3xl lg:max-w-4xl">
        <div
          className="w-full transition-transform duration-700 ease-out will-change-transform"
          style={{
            transform: glide ? `translateY(${glide.dy}px)` : "translateY(0)",
          }}
          onTransitionEnd={onGlideTransitionEnd}
        >
          <CoverTextBackdrop className="w-full md:!pt-3 md:!pb-7 lg:!pt-3.5 lg:!pb-8">
            <div className="flex flex-col items-center gap-4 text-center">
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
          </CoverTextBackdrop>
        </div>
        <CoverTextBackdrop className="max-w-lg">
          <p
            className={`font-nav text-sm font-light leading-relaxed text-white/75 transition-opacity duration-700 ease-out md:text-base ${
              glide ? "opacity-0" : "opacity-100"
            }`}
          >
            Art, creativity, and code — building things that matter.
          </p>
        </CoverTextBackdrop>
      </div>
      <GlowOrbButton
        type="button"
        aria-label="Enter site"
        onClick={onEnter}
        disabled={!!glide}
        className={`relative z-10 ${
          glide ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}
