"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";

type ProjectImageSource = string | readonly string[];

const SCENE2_CAROUSEL_MQ = "(max-width: 767px)";

function useIsBelowMd(): boolean {
  const [q, setQ] = useState(false);
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(SCENE2_CAROUSEL_MQ);
    setQ(mq.matches);
    const on = () => setQ(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return q;
}

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

const SCENE_2_LEFT_PROJECT_COPY =
  "Wedding Weekend Info App\ndes. 2025" as const;
const SCENE_2_LEFT_PROJECT_URL = "https://abbes-vila.com" as const;

/** Center/right: plain text only (no link). Swap left `href` when needed. */
const SCENE_2_COLUMN_FOOTER_ITEMS = [
  {
    kind: "link" as const,
    href: SCENE_2_LEFT_PROJECT_URL,
    label: "abbes-vila.com",
  },
  { kind: "text" as const, label: "comingsoon.com" },
  { kind: "text" as const, label: "comingsoon.com" },
] as const;

const SCENE_2_COMING_SOON = "coming soon" as const;

/** Three columns × three projects (drag vertically — 3D wheel). */
const SCENE_2_PROJECT_COLUMNS: readonly (readonly string[])[] = [
  [
    SCENE_2_LEFT_PROJECT_COPY,
    SCENE_2_LEFT_PROJECT_COPY,
    SCENE_2_LEFT_PROJECT_COPY,
  ],
  [
    SCENE_2_COMING_SOON,
    SCENE_2_COMING_SOON,
    SCENE_2_COMING_SOON,
  ],
  [
    SCENE_2_COMING_SOON,
    SCENE_2_COMING_SOON,
    SCENE_2_COMING_SOON,
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

/** Same pull as `magnetTowardFace`, but toward a fixed angle (e.g. nearest full turn for face 0). */
function magnetTowardTarget(r: number, target: number): number {
  const err = target - r;
  const a = Math.abs(err);
  if (a < 0.02) return target;
  const t = a / 56;
  const pull = 0.012 + 0.075 / (1 + t * t);
  return r + err * pull;
}

function normalizeRotation0To360(r: number): number {
  return ((r % 360) + 360) % 360;
}

/** Degrees / second — exponential damping until low speed, then snap to first project (0° mod 360). */
function scene2IntroSpinParams(columnIndex: number): {
  initialVelocity: number;
  damping: number;
  magnetBelow: number;
} {
  const direction = columnIndex % 2 === 0 ? 1 : -1;
  const initialVelocity = direction * (620 + columnIndex * 95);
  return { initialVelocity, damping: 2.35, magnetBelow: 38 };
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
  deferAxisToSwipeColumns = false,
  onColumnHorizontal,
}: {
  columnIndex: number;
  descriptions: readonly string[];
  imageSrcs?: readonly (ProjectImageSource | undefined)[];
  /** When true, wait for a dominant move axis so horizontal can change the column strip vs vertical 3D wheel. */
  deferAxisToSwipeColumns?: boolean;
  onColumnHorizontal?: (e: {
    phase: "move" | "end" | "cancel";
    deltaX: number;
  }) => void;
}) {
  const n = descriptions.length;
  const step = 360 / n;
  const [rotation, setRotation] = useState(0);
  const dragRef = useRef({ y: 0, rotation: 0 });
  const draggingRef = useRef(false);
  const axisRef = useRef<"u" | "h" | "v">("u");
  const startRef = useRef({ x: 0, y: 0, rotation: 0 });
  const viewportRef = useRef<HTMLDivElement>(null);
  const introRafRef = useRef(0);
  const introCancelRef = useRef(false);

  const cancelIntroSpin = useCallback(() => {
    introCancelRef.current = true;
    if (introRafRef.current) {
      cancelAnimationFrame(introRafRef.current);
      introRafRef.current = 0;
    }
  }, []);

  useEffect(() => {
    introCancelRef.current = false;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const { initialVelocity, damping, magnetBelow } =
      scene2IntroSpinParams(columnIndex);
    const anim = { r: 0, v: initialVelocity };
    let last = performance.now();

    const tick = (now: number) => {
      if (introCancelRef.current) return;
      const dt = Math.min(1 / 30, (now - last) / 1000);
      last = now;

      let { r, v } = anim;
      if (Math.abs(v) >= magnetBelow) {
        r += v * dt;
        v *= Math.exp(-damping * dt);
      } else {
        v *= Math.exp(-damping * 1.25 * dt);
        const goal = Math.round(r / 360) * 360;
        r = magnetTowardTarget(r + v * dt, goal);
        if (Math.abs(v) < 0.35) v = 0;
      }
      anim.r = r;
      anim.v = v;

      const goal = Math.round(r / 360) * 360;
      const settled = Math.abs(v) < 0.2 && Math.abs(r - goal) < 0.04;
      if (settled) {
        const final = normalizeRotation0To360(goal);
        anim.r = final;
        setRotation(final);
        introRafRef.current = 0;
        return;
      }

      setRotation(r);
      introRafRef.current = requestAnimationFrame(tick);
    };

    introRafRef.current = requestAnimationFrame(tick);
    return () => {
      introCancelRef.current = true;
      cancelAnimationFrame(introRafRef.current);
      introRafRef.current = 0;
    };
  }, [columnIndex, step]);

  const onPointerDown = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      cancelIntroSpin();
      if (!deferAxisToSwipeColumns) {
        e.currentTarget.setPointerCapture(e.pointerId);
        draggingRef.current = true;
        axisRef.current = "v";
        dragRef.current = { y: e.clientY, rotation };
        return;
      }
      axisRef.current = "u";
      startRef.current = { x: e.clientX, y: e.clientY, rotation };
    },
    [rotation, cancelIntroSpin, deferAxisToSwipeColumns],
  );

  const onPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (deferAxisToSwipeColumns) {
        if (axisRef.current === "u") {
          const dx = e.clientX - startRef.current.x;
          const dy = e.clientY - startRef.current.y;
          if (dx * dx + dy * dy < 100) return;
          if (Math.abs(dx) > Math.abs(dy)) {
            axisRef.current = "h";
            onColumnHorizontal?.({ phase: "move", deltaX: dx });
            return;
          }
          axisRef.current = "v";
          e.currentTarget.setPointerCapture(e.pointerId);
          draggingRef.current = true;
          dragRef.current = { y: e.clientY, rotation: startRef.current.rotation };
        } else if (axisRef.current === "h") {
          onColumnHorizontal?.({
            phase: "move",
            deltaX: e.clientX - startRef.current.x,
          });
          return;
        }
      } else {
        if (!draggingRef.current) return;
      }
      if (axisRef.current !== "v" || !draggingRef.current) return;
      const dy = e.clientY - dragRef.current.y;
      const raw = dragRef.current.rotation - dy * 0.28;
      setRotation(magnetTowardFace(raw, step));
    },
    [deferAxisToSwipeColumns, onColumnHorizontal, step],
  );

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      cancelIntroSpin();
      e.preventDefault();
      setRotation((r) => magnetTowardFace(r - e.deltaY * 0.2, step));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
    };
  }, [step, cancelIntroSpin]);

  const onPointerUp = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (deferAxisToSwipeColumns) {
        if (axisRef.current === "h") {
          onColumnHorizontal?.({
            phase: "end",
            deltaX: e.clientX - startRef.current.x,
          });
        }
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
        axisRef.current = "u";
        draggingRef.current = false;
        return;
      }
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
      draggingRef.current = false;
    },
    [deferAxisToSwipeColumns, onColumnHorizontal],
  );

  const onPointerCancel = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (deferAxisToSwipeColumns) {
        if (axisRef.current === "h") {
          onColumnHorizontal?.({ phase: "cancel", deltaX: 0 });
        }
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
        axisRef.current = "u";
        draggingRef.current = false;
        return;
      }
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
      draggingRef.current = false;
    },
    [deferAxisToSwipeColumns, onColumnHorizontal],
  );

  const activeIndex =
    n > 0 ? ((Math.round(rotation / step) % n) + n) % n : 0;

  const footerItem = SCENE_2_COLUMN_FOOTER_ITEMS[columnIndex];

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
        onPointerCancel={onPointerCancel}
        onLostPointerCapture={() => {
          draggingRef.current = false;
          if (deferAxisToSwipeColumns) axisRef.current = "u";
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
                <div className="flex min-h-0 flex-1 flex-col pt-4">
                  <p className="min-h-0 flex-1 whitespace-pre-line font-nav text-sm font-light leading-relaxed text-white/90 md:text-base [overflow-wrap:anywhere]">
                    {description}
                  </p>
                  {footerItem ? (
                    footerItem.kind === "link" ? (
                      <a
                        href={footerItem.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 shrink-0 self-end font-nav text-xs font-light tracking-wide text-white/65 underline decoration-white/35 underline-offset-[0.2em] transition-[color,text-decoration-color] hover:text-white/90 hover:decoration-white/55"
                      >
                        {footerItem.label}
                      </a>
                    ) : (
                      <span className="mt-2 shrink-0 self-end select-none font-nav text-xs font-light tracking-wide text-white/50 blur-[3px]">
                        {footerItem.label}
                      </span>
                    )
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Scene2Portfolio({ heading }: { heading: string }) {
  const isNarrow = useIsBelowMd();
  const [columnPage, setColumnPage] = useState(0);
  const [dragX, setDragX] = useState(0);
  const viewportWRef = useRef(0);
  const columnViewportRef = useRef<HTMLDivElement | null>(null);

  const onColumnHorizontal = useCallback(
    (e: { phase: "move" | "end" | "cancel"; deltaX: number }) => {
      if (e.phase === "move") {
        setDragX(e.deltaX);
        return;
      }
      if (e.phase === "cancel") {
        setDragX(0);
        return;
      }
      setDragX(0);
      setColumnPage((c) => {
        const w = viewportWRef.current;
        const th = w > 0 ? w * 0.2 : 56;
        if (e.deltaX < -th) return Math.min(2, c + 1);
        if (e.deltaX > th) return Math.max(0, c - 1);
        return c;
      });
    },
    [],
  );

  useLayoutEffect(() => {
    if (!isNarrow) return;
    const el = columnViewportRef.current;
    if (!el) return;
    const read = () => {
      viewportWRef.current = el.getBoundingClientRect().width;
    };
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, [isNarrow]);

  return (
    <>
      <h1 className="animate-scene-in-title font-brand text-3xl font-thin normal-case tracking-wide md:text-4xl">
        {heading}
      </h1>
      <div className="portfolio mt-6 flex min-h-0 flex-1 flex-col">
        {isNarrow ? (
          <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col gap-3">
            <div
              ref={columnViewportRef}
              className="min-h-0 w-full min-w-0 flex-1 overflow-hidden"
              role="region"
              aria-label="Portfolio project columns. Swipe horizontally to move between columns, or vertically on a column to change projects."
            >
              <div
                className="flex h-full min-h-0 w-[300%] will-change-transform"
                style={{
                  transform: `translate3d(calc((-100% / 3) * ${columnPage} + ${dragX}px), 0, 0)`,
                  transition:
                    dragX !== 0
                      ? "none"
                      : "transform 0.38s cubic-bezier(0.32, 0.72, 0, 1)",
                }}
              >
                {SCENE_2_PROJECT_COLUMNS.map((descriptions, columnIndex) => (
                  <div
                    key={columnIndex}
                    className="box-border flex h-full min-h-0 w-1/3 max-w-[33.333%] shrink-0 grow-0 flex-col"
                  >
                    <Scene2ProjectColumn
                      columnIndex={columnIndex}
                      descriptions={descriptions}
                      imageSrcs={SCENE_2_PROJECT_IMAGES[columnIndex]}
                      deferAxisToSwipeColumns
                      onColumnHorizontal={onColumnHorizontal}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div
              className="flex shrink-0 items-center justify-center gap-2.5 pt-0.5"
              role="tablist"
              aria-label="Which column to show"
            >
              {SCENE_2_PROJECT_COLUMNS.map((_, i) => {
                const active = columnPage === i;
                return (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    tabIndex={active ? 0 : -1}
                    onClick={() => {
                      setColumnPage(i);
                      setDragX(0);
                    }}
                    className="flex h-6 w-6 items-center justify-center rounded-full transition-transform duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black/20"
                  >
                    <span
                      aria-hidden
                      className={[
                        "block rounded-full shadow-sm transition-all duration-300 ease-out",
                        active
                          ? "h-2.5 w-2.5 scale-100 bg-gradient-to-b from-pink-200/95 to-rose-200/80 shadow-[0_0_0_1px_rgba(255,255,255,0.35),0_0_12px_rgba(251,207,232,0.5)]"
                          : "h-1.5 w-1.5 scale-100 bg-white/30 hover:scale-110 hover:bg-white/50",
                        active && "ring-1 ring-white/25",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex min-h-0 min-w-0 flex-1 flex-row items-start gap-3 sm:gap-4 md:gap-5">
            {SCENE_2_PROJECT_COLUMNS.map((descriptions, columnIndex) => (
              <Scene2ProjectColumn
                key={columnIndex}
                columnIndex={columnIndex}
                descriptions={descriptions}
                imageSrcs={SCENE_2_PROJECT_IMAGES[columnIndex]}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
