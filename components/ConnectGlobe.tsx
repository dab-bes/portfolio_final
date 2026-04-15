"use client";

import { useEffect, useRef } from "react";
import { createGlobe, GLOBE_SILHOUETTE_SIZE_FRAC } from "@/lib/createGlobe";

/** Max diameter of the circular globe in CSS px (layout only; same 3D framing inside). */
const GLOBE_DISPLAY_MAX_PX = 600;

/** Slightly larger than the projected globe so the blue peeks past the limb. */
const BLUE_BACKING_SCALE = 1.1;

/** White veil: only over the globe (smaller than the full square). */
const WHITE_VEIL_SCALE = 1.08;

export function ConnectGlobe() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const measure = () => {
      const w = wrap.clientWidth;
      const basis = w > 0 ? w : GLOBE_DISPLAY_MAX_PX;
      return Math.max(1, Math.floor(Math.min(basis, GLOBE_DISPLAY_MAX_PX)));
    };

    let size = measure();
    const ctrl = createGlobe(canvas, {
      textureUrl: "/globe-texture.png",
      size,
    });

    const ro = new ResizeObserver(() => {
      const next = measure();
      if (next !== size) {
        size = next;
        ctrl.setSize(next);
      }
    });
    ro.observe(wrap);

    return () => {
      ro.disconnect();
      ctrl.destroy();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative isolate mx-auto w-full shrink-0 [aspect-ratio:1/1]"
      style={{ maxWidth: `min(100%, ${GLOBE_DISPLAY_MAX_PX}px)` }}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-950/50"
        style={{
          width: `${GLOBE_SILHOUETTE_SIZE_FRAC * BLUE_BACKING_SCALE * 100}%`,
        }}
        aria-hidden
      />
      <canvas
        ref={canvasRef}
        className="relative z-10 block rounded-full"
        aria-label="Globe with location in New York"
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-20 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.07]"
        style={{
          width: `${GLOBE_SILHOUETTE_SIZE_FRAC * WHITE_VEIL_SCALE * 100}%`,
        }}
        aria-hidden
      />
    </div>
  );
}
