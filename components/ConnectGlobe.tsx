"use client";

import { useEffect, useRef } from "react";
import { createGlobe, GLOBE_SILHOUETTE_SIZE_FRAC } from "@/lib/createGlobe";

/** Max diameter of the circular globe in CSS px (layout only; same 3D framing inside). */
const GLOBE_DISPLAY_MAX_PX = 680;

/** Blue glow behind the globe; >1 extends past the projected sphere edge. */
const BLUE_BACKING_SCALE = 1.1;

/** White veil: slightly larger than the projected globe (same ratio as before alignment). */
const WHITE_VEIL_SCALE = 1.11;

export function ConnectGlobe() {
  /** Inner “globe view” box; drives canvas pixel size (matches outer square). */
  const globeStackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = globeStackRef.current;
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
      className="animate-globe-float-in relative isolate mx-auto w-full min-w-0 shrink-0 [aspect-ratio:1/1]"
      style={{ maxWidth: `min(100%, ${GLOBE_DISPLAY_MAX_PX}px)` }}
    >
      <div ref={globeStackRef} className="absolute inset-0 rounded-full">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-950/50"
          style={{
            width: `${GLOBE_SILHOUETTE_SIZE_FRAC * BLUE_BACKING_SCALE * 100}%`,
          }}
          aria-hidden
        />
        <canvas
          ref={canvasRef}
          className="absolute left-1/2 top-1/2 z-10 block -translate-x-1/2 -translate-y-1/2 rounded-full"
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
    </div>
  );
}
