"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { GlowOrbButton } from "@/components/GlowOrbButton";
import { SCENE_IDS, SCENE_LABELS, useScene, type SceneId } from "@/components/SceneContext";
import { consumeSceneNavOpenAfterCoverEnter } from "@/lib/sceneNavFromCoverSession";

export type SceneNavigationVariant = "full" | "mobile-only";

type SceneNavigationProps = {
  variant?: SceneNavigationVariant;
  /** When set (typically while a studio scene is open), mobile header uses a compact tray — nav fills trailing space beside the title. */
  collapseMobileTray?: boolean;
};

/** Shared easing; orb/link durations differ so the orb clears before links fade in. */
const sceneMenuOpacityEase = "ease-out motion-reduce:transition-none";

function sceneNavLinkClass(selected: boolean) {
  return `relative whitespace-nowrap pb-1 transition-[opacity,text-shadow] duration-500 ease-out after:pointer-events-none after:absolute after:bottom-0 after:left-1/2 after:h-[0.5px] after:w-full after:-translate-x-1/2 after:origin-center after:bg-white/50 after:transition-transform after:duration-500 after:ease-out motion-reduce:text-shadow-none motion-reduce:transition-opacity motion-reduce:after:transition-none ${
    selected
      ? "opacity-100 [text-shadow:0_0_18px_rgb(255_255_255/0.35),0_0_34px_rgb(255_255_255/0.14)] after:scale-x-100"
      : "text-shadow-none opacity-70 after:scale-x-0 hover:opacity-100 hover:[text-shadow:0_0_18px_rgb(255_255_255/0.35),0_0_34px_rgb(255_255_255/0.14)] hover:after:scale-x-100"
  }`;
}

export function SceneNavigation({
  variant = "full",
  collapseMobileTray = false,
}: SceneNavigationProps) {
  const router = useRouter();
  const { scene: selectedScene, setScene: setSelectedScene } = useScene();
  const [sceneRowOpen, setSceneRowOpen] = useState(false);
  const menuWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (consumeSceneNavOpenAfterCoverEnter()) setSceneRowOpen(true);
  }, []);

  useEffect(() => {
    if (!sceneRowOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      const el = menuWrapRef.current;
      if (el && !el.contains(e.target as Node)) setSceneRowOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [sceneRowOpen]);

  const goToScene = (n: SceneId) => {
    setSelectedScene(n);
    setSceneRowOpen(false);
    if (variant === "mobile-only") {
      router.push("/studio");
    }
  };

  return (
    <div
      ref={menuWrapRef}
      className={`animate-header-scene-nav-in pointer-events-auto relative min-h-11 w-full ${
        collapseMobileTray
          ? "max-md:flex max-md:min-h-11 max-md:flex-1 max-md:justify-end"
          : ""
      }`}
    >
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity ${sceneMenuOpacityEase} ${
          sceneRowOpen
            ? "pointer-events-none opacity-0 duration-300"
            : "opacity-100 duration-[1.4s]"
        }`}
      >
        <GlowOrbButton
          aria-expanded={sceneRowOpen}
          aria-controls="scene-nav-links"
          aria-label="Choose scene"
          tabIndex={sceneRowOpen ? -1 : undefined}
          onClick={() => setSceneRowOpen((o) => !o)}
        />
      </div>

      <div
        id="scene-nav-links"
        role="group"
        aria-label="Scenes"
        aria-hidden={!sceneRowOpen}
        inert={!sceneRowOpen}
        className={`absolute inset-0 flex items-center justify-center transition-opacity ${sceneMenuOpacityEase} ${
          sceneRowOpen
            ? "opacity-100 delay-300 duration-[1.4s]"
            : "pointer-events-none opacity-0 delay-0 duration-300"
        }`}
      >
        <div className="grid w-max max-w-[min(100vw-2rem,36rem)] grid-cols-3 place-items-center gap-x-5 px-3 font-nav text-sm font-light lowercase sm:gap-x-6 md:gap-x-10 md:text-base lg:gap-x-12">
          {SCENE_IDS.map((n) => (
            <button
              key={n}
              type="button"
              className={sceneNavLinkClass(selectedScene === n)}
              onClick={() => goToScene(n)}
            >
              {SCENE_LABELS[n]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
