"use client";

import { useRouter } from "next/navigation";
import { SCENE_IDS, SCENE_LABELS, useScene, type SceneId } from "@/components/SceneContext";

export type SceneNavigationVariant = "full" | "mobile-only";

type SceneNavigationProps = {
  variant?: SceneNavigationVariant;
};

function sceneNavLinkClass(selected: boolean) {
  return `relative whitespace-nowrap pb-1 transition-[opacity,text-shadow] duration-500 ease-out after:pointer-events-none after:absolute after:bottom-0 after:left-1/2 after:h-[0.5px] after:w-full after:-translate-x-1/2 after:origin-center after:bg-white/50 after:transition-transform after:duration-500 after:ease-out motion-reduce:text-shadow-none motion-reduce:transition-opacity motion-reduce:after:transition-none ${
    selected
      ? "opacity-100 [text-shadow:0_0_18px_rgb(255_255_255/0.35),0_0_34px_rgb(255_255_255/0.14)] after:scale-x-100"
      : "text-shadow-none opacity-70 after:scale-x-0 hover:opacity-100 hover:[text-shadow:0_0_18px_rgb(255_255_255/0.35),0_0_34px_rgb(255_255_255/0.14)] hover:after:scale-x-100"
  }`;
}

export function SceneNavigation({ variant = "full" }: SceneNavigationProps) {
  const router = useRouter();
  const { scene: selectedScene, setScene: setSelectedScene } = useScene();

  const goToScene = (n: SceneId) => {
    setSelectedScene(n);
    if (variant === "mobile-only") {
      router.push("/studio");
    }
  };

  return (
    <div
      className="animate-header-scene-nav-in pointer-events-auto relative flex min-h-11 w-full items-center justify-center"
      role="group"
      aria-label="Scenes"
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
  );
}
