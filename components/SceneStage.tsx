"use client";

import { useScene, type SceneId, SCENE_LABELS } from "@/components/SceneContext";

/** Three columns for scene 2 (left to right on md+). */
const SCENE_2_TEXT_BOXES = [
  "Left — featured project, hero case study, or primary work sample.",
  "Center — secondary project, process notes, or metrics you want to highlight.",
  "Right — gallery strip, stack of links, or a short list of experiments.",
] as const;

const SCENE_CONTENT: Record<
  SceneId,
  { heading: string; body: string }
> = {
  1: {
    heading: SCENE_LABELS[1],
    body: "Introduction, short bio, or what you build — edit this block with your own copy.",
  },
  2: {
    heading: SCENE_LABELS[2],
    body: "",
  },
  3: {
    heading: SCENE_LABELS[3],
    body: "",
  },
};

const CONNECT_SIDEBAR_TEXT =
  "First text block — e.g. availability, location, or how you prefer to be reached.";

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

function Scene2CardImagePlaceholder({ index }: { index: number }) {
  return (
    <div
      role="img"
      aria-label={`Image placeholder ${index + 1}`}
      className="flex aspect-[4/3] w-full shrink-0 items-center justify-center rounded-md border border-dashed border-white/35 bg-white/5 font-nav text-xs font-light lowercase tracking-wide text-white/50"
    >
      image
    </div>
  );
}

function ConnectSidebarImagePlaceholder() {
  return (
    <div
      role="img"
      aria-label="Image placeholder"
      className="flex aspect-[4/3] w-full shrink-0 items-center justify-center rounded-lg border border-dashed border-white/35 bg-white/5 font-nav text-sm font-light lowercase tracking-wide text-white/50"
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
        className={`mx-auto flex min-h-0 w-full flex-1 flex-col rounded-lg border border-white/20 bg-black/40 p-8 shadow-lg backdrop-blur-sm ${
          scene === 2 || scene === 3 ? "max-w-5xl" : "max-w-3xl"
        }`}
      >
        {scene === 1 ? (
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-10">
            <Scene1ImagePlaceholder />
            <div className="min-w-0 flex-1">
              <h1 className="font-brand text-3xl font-thin normal-case tracking-wide md:text-4xl">
                {heading}
              </h1>
              <div className="mt-6">
                <div className="rounded-lg border border-white/15 bg-black/25 px-4 py-3 shadow-sm backdrop-blur-sm">
                  <p className="font-nav text-sm font-light leading-relaxed text-white/90 md:text-base">
                    {body}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : scene === 2 ? (
          <>
            <h1 className="font-brand text-3xl font-thin normal-case tracking-wide md:text-4xl">
              {heading}
            </h1>
            <div className="mt-6 flex min-h-0 flex-1 flex-col gap-4 md:flex-row md:items-stretch md:gap-5">
              {SCENE_2_TEXT_BOXES.map((text, i) => (
                <div
                  key={i}
                  className="flex min-h-0 min-w-0 flex-1 flex-col rounded-lg border border-white/15 bg-black/25 p-4 shadow-sm backdrop-blur-sm md:p-5"
                >
                  <Scene2CardImagePlaceholder index={i} />
                  <p className="mt-auto pt-4 font-nav text-sm font-light leading-relaxed text-white/90 md:text-base">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <h1 className="font-brand text-3xl font-thin normal-case tracking-wide md:text-4xl">
              {heading}
            </h1>
            <div className="mt-6 flex min-h-0 flex-1 flex-col gap-6 md:flex-row md:items-stretch md:gap-8">
              <div className="flex min-h-0 min-w-0 flex-1 flex-col rounded-lg border border-white/15 bg-black/25 p-4 shadow-sm backdrop-blur-sm md:p-5">
                <form
                  className="flex min-h-0 flex-1 flex-col gap-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="connect-contact"
                      className="font-nav text-sm font-light lowercase tracking-wide text-white/70"
                    >
                      contact
                    </label>
                    <input
                      id="connect-contact"
                      name="contact"
                      type="text"
                      autoComplete="email"
                      placeholder="email or how to reach you"
                      className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2.5 font-nav text-sm font-light text-white placeholder:text-white/40 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
                    />
                  </div>
                  <div className="flex min-h-0 flex-1 flex-col gap-2">
                    <label
                      htmlFor="connect-message"
                      className="font-nav text-sm font-light lowercase tracking-wide text-white/70"
                    >
                      message
                    </label>
                    <textarea
                      id="connect-message"
                      name="message"
                      rows={5}
                      placeholder="your message"
                      className="min-h-[8rem] w-full flex-1 resize-y rounded-lg border border-white/15 bg-black/40 px-3 py-2.5 font-nav text-sm font-light text-white placeholder:text-white/40 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-auto w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 font-nav text-sm font-light lowercase tracking-wide text-white transition-colors hover:bg-white/15 active:bg-white/20 md:w-auto md:self-start"
                  >
                    submit
                  </button>
                </form>
              </div>
              <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-4">
                <ConnectSidebarImagePlaceholder />
                <div className="rounded-lg border border-white/15 bg-black/25 px-4 py-3 shadow-sm backdrop-blur-sm">
                  <p className="font-nav text-sm font-light leading-relaxed text-white/90 md:text-base">
                    {CONNECT_SIDEBAR_TEXT}
                  </p>
                </div>
                <div className="rounded-lg border border-white/15 bg-black/25 px-4 py-3 shadow-sm backdrop-blur-sm">
                  <div className="flex flex-wrap gap-2">
                    {[0, 1, 2].map((i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`Button placeholder ${i + 1}`}
                        className="rounded-lg border border-white/20 bg-white/5 px-4 py-2 font-nav text-sm font-light lowercase tracking-wide text-white/90 transition-colors hover:bg-white/10 active:bg-white/15"
                      >
                        button
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
