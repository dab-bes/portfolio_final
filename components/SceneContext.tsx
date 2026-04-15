"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export const SCENE_IDS = [1, 2, 3] as const;
export type SceneId = (typeof SCENE_IDS)[number];

/** Display names for nav and scene headings (lowercase). */
export const SCENE_LABELS: Record<SceneId, string> = {
  1: "about me",
  2: "portfolio",
  3: "connect",
};

type SceneContextValue = {
  scene: SceneId;
  setScene: (scene: SceneId) => void;
};

const SceneContext = createContext<SceneContextValue | null>(null);

export function SceneProvider({ children }: { children: ReactNode }) {
  const [scene, setScene] = useState<SceneId>(1);
  return <SceneContext.Provider value={{ scene, setScene }}>{children}</SceneContext.Provider>;
}

export function useScene() {
  const ctx = useContext(SceneContext);
  if (!ctx) throw new Error("useScene must be used within SceneProvider");
  return ctx;
}
