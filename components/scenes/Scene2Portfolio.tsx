"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";

type ProjectImageSource = string | readonly string[];

const LEFT_COLUMN_THIRD_CYCLING_IMAGES = [
  "/project1/loadingscreen.png",
  "/project1/registry.png",
  "/project1/open.png",
] as const;

/** Optional screenshot per cell; aligns with `SCENE_2_PROJECT_COLUMNS`. */
const SCENE_2_PROJECT_IMAGES: readonly (readonly (ProjectImageSource | undefined)[])[] =
  [
    [
      "/project1/homepage.png",
      "/project1/schedule.png",
      LEFT_COLUMN_THIRD_CYCLING_IMAGES,
    ],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ] as const;

/** Three columns × three projects (drag vertically — 3D wheel). */
const SCENE_2_PROJECT_COLUMNS: readonly (readonly string[])[] = [
  [
    "Left — featured project, hero case study, or primary work sample.",
    "Left — second project (e.g. case study detail or role).",
    "Left — third project (e.g. outcomes or media).",
  ],
  [
    "Center — secondary project, process notes, or metrics you want to highlight.",
    "Center — second project (e.g. process or stack).",
    "Center — third project (e.g. KPIs or screenshots).",
  ],
  [
    "Right — gallery strip, stack of links, or a short list of experiments.",
    "Right — second project (e.g. experiment or side build).",
    "Right — third project (e.g. tools or prototypes).",
  ],
] as const;

/** Pull rotation toward the nearest face (step°); stronger when already close — magnetic well. */
function magnetTowardFace(r: number, step: number): number {
  const target = Math.round(r / step) * step;
  const err = target - r;
  const a = Math.abs(err);
  if (a < 0.02) return target;
  const t = a / 56;
  const pull = 0.012 + 0.075 / (1 + t * t);
  return r + err * pull;
}

function Scene2ProjectImageSlot({
  columnIndex,
  projectIndex,
  src,
}: {
  columnIndex: number;
  projectIndex: number;
  src?: ProjectImageSource;
}) {
  const paths = useMemo(() => {
    if (src === undefined) return [];
    if (typeof src === "string") return [src];
    return [...src];
  }, [src]);

  const [cycleIndex, setCycleIndex] = useState(0);

  useEffect(() => {
    if (paths.length <= 1) return;
    const id = window.setInterval(() => {
      setCycleIndex((i) => (i + 1) % paths.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [paths]);

  if (paths.length > 0) {
    const activeSrc = paths[cycleIndex % paths.length]!;
    const alt =
      paths.length > 1
        ? `Column ${columnIndex + 1}, project ${projectIndex + 1} — image ${cycleIndex + 1} of ${paths.length}`
        : `Column ${columnIndex + 1}, project ${projectIndex + 1}`;
    return (
      <div
        className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-md border border-white/15 bg-black/40"
        aria-label={alt}
      >
        <Image
          key={activeSrc}
          src={activeSrc}
          alt={alt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
    );
  }

  const sideWheelPlaceholder = columnIndex >= 1;

  return (
    <div
      role="img"
      aria-label={`Column ${columnIndex + 1}, project ${projectIndex + 1} image placeholder`}
      className={
        sideWheelPlaceholder
          ? "aspect-[4/3] w-full shrink-0 rounded-md border border-emerald-400/25 bg-emerald-950/45 shadow-[inset_0_0_32px_rgba(6,78,59,0.45)] backdrop-blur-2xl backdrop-saturate-50"
          : "flex aspect-[4/3] w-full shrink-0 items-center justify-center rounded-md border border-dashed border-white/35 bg-white/5 font-nav text-xs font-light lowercase tracking-wide text-white/50"
      }
    >
      {!sideWheelPlaceholder ? "image" : null}
    </div>
  );
}

function Scene2ProjectColumn({
  columnIndex,
  descriptions,
  imageSrcs,
}: {
  columnIndex: number;
  descriptions: readonly string[];
  imageSrcs?: readonly (ProjectImageSource | undefined)[];
}) {
  const n = descriptions.length;
  const step = 360 / n;
  const [rotation, setRotation] = useState(0);
  const dragRef = useRef({ y: 0, rotation: 0 });
  const draggingRef = useRef(false);
  const viewportRef = useRef<HTMLDivElement>(null);

  const onPointerDown = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      draggingRef.current = true;
      dragRef.current = { y: e.clientY, rotation };
    },
    [rotation],
  );

  const onPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (!draggingRef.current) return;
      const dy = e.clientY - dragRef.current.y;
      const raw = dragRef.current.rotation - dy * 0.28;
      setRotation(magnetTowardFace(raw, step));
    },
    [step],
  );

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setRotation((r) => magnetTowardFace(r - e.deltaY * 0.2, step));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
    };
  }, [step]);

  const onPointerUp = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    draggingRef.current = false;
  }, []);

  const activeIndex =
    n > 0 ? ((Math.round(rotation / step) % n) + n) % n : 0;

  return (
    <div
      className="@container relative flex min-h-0 min-w-0 flex-1 flex-col [--project-slide-h:calc(78cqw+7.5rem)] [--wheel-r:calc((var(--project-slide-h)/2)/tan(calc(180deg/var(--scene2-n))))]"
      style={{ ["--scene2-n" as string]: n } as CSSProperties}
      aria-label={`Portfolio column ${columnIndex + 1}, project ${activeIndex + 1} of ${n} — drag or scroll up or down to rotate`}
    >
      <div
        ref={viewportRef}
        className="relative isolate h-[var(--project-slide-h)] min-h-0 shrink-0 cursor-grab touch-none overflow-visible active:cursor-grabbing [perspective:min(22000px,1800cqw)]"
        style={{ perspectiveOrigin: "50% 50%" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onLostPointerCapture={() => {
          draggingRef.current = false;
        }}
      >
        <div
          className="absolute inset-0 [transform-style:preserve-3d]"
          style={{
            transform: `rotateX(${-rotation}deg) scale3d(0.88, 0.88, 0.88)`,
            transition: "none",
            transformOrigin: "50% 50% 0",
          }}
        >
          {descriptions.map((description, projectIndex) => (
            <div
              key={projectIndex}
              className="absolute inset-0 [backface-visibility:hidden] [transform-style:preserve-3d]"
              style={{
                transform: `rotateX(${projectIndex * step}deg) translateZ(var(--wheel-r))`,
              }}
            >
              <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-lg border border-white/15 bg-black/25 p-4 shadow-sm backdrop-blur-sm md:p-5">
                <Scene2ProjectImageSlot
                  columnIndex={columnIndex}
                  projectIndex={projectIndex}
                  src={imageSrcs?.[projectIndex]}
                />
                <p className="pt-4 font-nav text-sm font-light leading-relaxed text-white/90 md:text-base [overflow-wrap:anywhere]">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Scene2Portfolio({ heading }: { heading: string }) {
  return (
    <>
      <h1 className="font-brand text-3xl font-thin normal-case tracking-wide md:text-4xl">
        {heading}
      </h1>
      <div className="portfolio mt-6 flex min-h-0 flex-1 flex-col">
        <div className="flex min-h-0 flex-1 flex-col gap-4 md:flex-row md:items-start md:gap-5">
          {SCENE_2_PROJECT_COLUMNS.map((descriptions, columnIndex) => (
            <Scene2ProjectColumn
              key={columnIndex}
              columnIndex={columnIndex}
              descriptions={descriptions}
              imageSrcs={SCENE_2_PROJECT_IMAGES[columnIndex]}
            />
          ))}
        </div>
      </div>
    </>
  );
}
