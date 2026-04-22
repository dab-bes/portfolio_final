const KEY = "portfolio-open-scene-nav-after-cover";

export function markSceneNavOpenAfterCoverEnter(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(KEY, "1");
  } catch {
    /* private mode / quota */
  }
}

/** Returns true once per flag set, then clears storage. */
export function consumeSceneNavOpenAfterCoverEnter(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (sessionStorage.getItem(KEY) !== "1") return false;
    sessionStorage.removeItem(KEY);
    return true;
  } catch {
    return false;
  }
}
