"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { GlowOrbButton } from "@/components/GlowOrbButton";
import { SCENE_IDS, SCENE_LABELS, useScene, type SceneId } from "@/components/SceneContext";

export type SceneNavigationVariant = "full" | "mobile-only";

type SceneNavigationProps = {
  variant?: SceneNavigationVariant;
};

function sceneNavLinkClass(selected: boolean) {
  return `relative whitespace-nowrap pb-1 transition-[transform,opacity,text-shadow] duration-500 ease-out after:pointer-events-none after:absolute after:bottom-0 after:left-1/2 after:h-[0.5px] after:w-full after:-translate-x-1/2 after:origin-center after:bg-white/50 after:transition-transform after:duration-500 after:ease-out motion-reduce:scale-100 motion-reduce:text-shadow-none motion-reduce:transition-opacity motion-reduce:after:transition-none ${
    selected
      ? "opacity-100 scale-[1.1] [text-shadow:0_0_18px_rgb(255_255_255/0.35),0_0_34px_rgb(255_255_255/0.14)] after:scale-x-100"
      : "scale-100 text-shadow-none opacity-70 after:scale-x-0 hover:opacity-100 hover:scale-[1.1] hover:[text-shadow:0_0_18px_rgb(255_255_255/0.35),0_0_34px_rgb(255_255_255/0.14)] hover:after:scale-x-100"
  }`;
}

export function SceneNavigation({ variant = "full" }: SceneNavigationProps) {
  const router = useRouter();
  const { scene: selectedScene, setScene: setSelectedScene } = useScene();
  const [sceneRowOpen, setSceneRowOpen] = useState(false);
  const menuWrapRef = useRef<HTMLDivElement>(null);

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
    <>
      <div
        ref={menuWrapRef}
        className="animate-header-scene-nav-in pointer-events-auto relative flex w-full flex-col items-center gap-4 md:hidden"
      >
        <div className="relative flex min-h-11 w-full max-w-xs items-center justify-center gap-3">
          <GlowOrbButton
            aria-expanded={sceneRowOpen}
            aria-controls="mobile-scene-links"
            aria-label="Choose scene"
            onClick={() => setSceneRowOpen((o) => !o)}
          />
          <span
            className={`min-w-0 max-w-[12rem] truncate text-center font-nav text-sm font-light lowercase tracking-wide ${
              selectedScene == null ? "text-white/40" : ""
            }`}
          >
            {selectedScene != null ? SCENE_LABELS[selectedScene] : "—"}
          </span>
        </div>

        {sceneRowOpen ? (
          <div
            id="mobile-scene-links"
            role="group"
            aria-label="Scenes"
            className="grid w-full grid-cols-3 place-items-center gap-y-2 font-nav font-light lowercase"
          >
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
        ) : null}
      </div>

      {variant === "full" ? (
        <div className="animate-header-scene-nav-in hidden w-full grid-cols-3 place-items-center gap-y-2 font-nav font-light lowercase md:grid">
          {SCENE_IDS.map((n) => (
            <button
              key={n}
              type="button"
              className={sceneNavLinkClass(selectedScene === n)}
              onClick={() => setSelectedScene(n)}
            >
              {SCENE_LABELS[n]}
            </button>
          ))}
        </div>
      ) : null}
    </>
  );
}
