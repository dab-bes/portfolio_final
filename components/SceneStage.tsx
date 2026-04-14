"use client";

import { useScene, type SceneId } from "@/components/SceneContext";

/** Seven stacked copy blocks for scene 1 (right of the image). */
const SCENE_1_TEXT_BOXES = [
  "First block — introduction or hook.",
  "Second block — short bio or role line.",
  "Third block — what you build or care about.",
  "Fourth block — a highlight or metric.",
  "Fifth block — tools, stack, or methods.",
  "Sixth block — link-out or CTA hint.",
  "Seventh block — closing line or location.",
] as const;

const SCENE_CONTENT: Record<
  SceneId,
  { heading: string; body: string }
> = {
  1: {
    heading: "scene 1",
    body: "",
  },
  2: {
    heading: "scene 2",
    body: "Second scene — projects, case studies, or a gallery can live here.",
  },
  3: {
    heading: "scene 3",
    body: "Third scene — skills, timeline, or experience sections fit well here.",
  },
  4: {
    heading: "scene 4",
    body: "Fourth scene — contact, links, or a call-to-action could go here.",
  },
  5: {
    heading: "scene 5",
    body: "Fifth scene — extras like notes, experiments, or a closing statement.",
  },
};

function Scene1ImagePlaceholder() {
  return (
    <div
      role="img"
      aria-label="Image placeholder"
      className="flex aspect-square w-full shrink-0 items-center justify-center rounded-lg border border-dashed border-white/35 bg-white/5 font-nav text-sm font-light lowercase tracking-wide text-white/50 md:w-44 md:aspect-[4/5] lg:w-52"
    >
      image
    </div>
  );
}

export function SceneStage() {
  const { scene } = useScene();
  const { heading, body } = SCENE_CONTENT[scene];

  return (
    <div className="flex min-h-0 flex-1 flex-col px-4 py-8 text-white">
      <section
        key={scene}
        aria-label={`${heading} content`}
        className="mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col rounded-lg border border-white/20 bg-black/40 p-8 shadow-lg backdrop-blur-sm"
      >
        {scene === 1 ? (
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-10">
            <Scene1ImagePlaceholder />
            <div className="min-w-0 flex-1">
              <h1 className="font-brand text-3xl font-thin uppercase tracking-wide md:text-4xl">
                {heading}
              </h1>
              <div className="mt-6 flex flex-col gap-3">
                {SCENE_1_TEXT_BOXES.map((text, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-white/15 bg-black/25 px-4 py-3 shadow-sm backdrop-blur-sm"
                  >
                    <p className="font-nav text-sm font-light leading-relaxed text-white/90 md:text-base">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            <h1 className="font-brand text-3xl font-thin uppercase tracking-wide md:text-4xl">
              {heading}
            </h1>
            <p className="mt-6 font-nav text-base font-light leading-relaxed text-white/90 md:text-lg">
              {body}
            </p>
          </>
        )}
      </section>
    </div>
  );
}
