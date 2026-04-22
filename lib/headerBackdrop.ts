/**
 * Bottom fade height: solid semi-black until `calc(100% - Npx)`, then fade to transparent.
 * Shared by studio Header and cover HeaderLayoutMirror.
 */
export const HEADER_BACKDROP_BOTTOM_FADE_PX = 16;

/**
 * Tailwind arbitrary `bg-[...]` for the shared gradient.
 * Must be a single static string (no `${}`) so Tailwind can see the full class and emit CSS.
 * Keep `calc(100%-16px)` in sync with `HEADER_BACKDROP_BOTTOM_FADE_PX`.
 */
export const headerBackdropBgClass =
  "bg-[linear-gradient(180deg,rgb(0_0_0/0.6)_0%,rgb(0_0_0/0.6)_calc(100%-16px),transparent_100%)]";
