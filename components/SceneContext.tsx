"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export const SCENE_IDS = [1, 2, 3, 4, 5] as const;
export type SceneId = (typeof SCENE_IDS)[number];

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
