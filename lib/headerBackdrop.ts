/**
 * Bottom fade height: solid semi-black until `calc(100% - Npx)`, then fade to transparent.
 * Shared by studio Header and cover HeaderLayoutMirror (opener mirror adds extra bottom length separately).
 */
export const HEADER_BACKDROP_BOTTOM_FADE_PX = 16;

/** Tailwind arbitrary background class for the shared gradient. */
export const headerBackdropBgClass = `bg-[linear-gradient(180deg,rgb(0_0_0/0.6)_0%,rgb(0_0_0/0.6)_calc(100%-${HEADER_BACKDROP_BOTTOM_FADE_PX}px),transparent_100%)]`;
