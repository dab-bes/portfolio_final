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
  { heading: string; body: string | readonly string[] }
> = {
  1: {
    heading: SCENE_LABELS[1],
    body: [
      "There is a myth that because of the iron in our ethmoid bone, located in our nose, people possess the ability to connect to the Earth's magnetic field and easily point the way North.",
      "Do I believe I have a surplus of iron in my nose? I mean maybe I do but my doctors keep telling me I'm iron deficient so: not likely.",
      "But iron or no iron, I have always had the ability to effortlessly direct the path North and to me direction is everything.",
      "Not only can I get us out of a corn maze, but my sense of direction has always pointed me towards exploration and success. My internal compass has brought me to art, creativity, and acting. I've explored new languages in both human and computer, and now it gives me the drive to create a meaningful life.",
      "I am curious, resourceful, adaptive and always happy to laugh at your bad (or good!) jokes. And I want to make things! Dinners! Sketch comedy! Fashionable hoodies! Websites! All of the above.",
      "I've got a long and expansive laundry list so hopefully I'll get to it all, but honestly I likely will.",
      'Because if I\'m looking for something or when I have a goal in mind and need to figure out the path forward; I can always trust my nose to guide me and say: "North is that way."',
    ],
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

const RESUME_FILE = "Christian Daniel Abbes - Web Developer.pdf";
const RESUME_HREF = `/${encodeURIComponent(RESUME_FILE)}`;

function Scene1Portrait() {
  return (
    <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-lg bg-black/25 md:w-44 md:aspect-[4/5] lg:w-52">
      <picture className="absolute inset-0 block">
        <source srcSet="/self.webp" type="image/webp" />
        <img
          src="/self.png"
          alt="Profile photo"
          width={2134}
          height={1939}
          className="h-full w-full object-cover object-top"
          decoding="async"
          fetchPriority="high"
        />
      </picture>
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
          scene === 2 || scene === 3 ? "max-w-5xl" : "max-w-3xl md:max-w-5xl"
        }`}
      >
        {scene === 1 ? (
          <div className="flex flex-col gap-8 md:flex-row md:items-stretch md:gap-10">
            <div className="flex w-full shrink-0 flex-col gap-4 md:min-h-0 md:w-44 lg:w-52">
              <Scene1Portrait />
              <div className="flex flex-col md:min-h-0 md:flex-1">
                <div className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-white/15 bg-black/25 shadow-sm backdrop-blur-sm md:min-h-0 md:flex-1">
                  <div className="flex flex-col items-center justify-start gap-3 px-4 py-4 md:min-h-0 md:flex-1 md:justify-center">
                    <picture>
                      <source srcSet="/logos/bbrew.svg" type="image/svg+xml" />
                      <img
                        src="/logos/bbrew.png"
                        alt="Brew logo"
                        width={300}
                        height={300}
                        className="h-auto w-full max-w-12 shrink-0"
                        decoding="async"
                      />
                    </picture>
                    <picture className="mx-auto block w-full max-w-[4.5rem] shrink-0">
                      <source srcSet="/logos/bu.svg" type="image/svg+xml" />
                      <img
                        src="/logos/bu.png"
                        alt="BU logo"
                        width={620}
                        height={276}
                        className="h-auto w-full"
                        decoding="async"
                      />
                    </picture>
                    <picture className="mx-auto block w-full max-w-[4.5rem] shrink-0">
                      <source srcSet="/logos/pacsun.svg" type="image/svg+xml" />
                      <img
                        src="/logos/pacsun.png"
                        alt="PacSun logo"
                        width={512}
                        height={101}
                        className="h-auto w-full"
                        decoding="async"
                      />
                    </picture>
                  </div>
                  <div
                    className="hidden h-px w-full shrink-0 bg-red-500 md:block"
                    aria-hidden
                  />
                  <div className="flex flex-col items-center justify-center px-4 py-4 md:min-h-0 md:flex-1">
                    <a
                      href={RESUME_HREF}
                      download={RESUME_FILE}
                      className="inline-flex rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 font-nav text-sm font-light lowercase tracking-wide text-white transition-colors hover:bg-white/15 active:bg-white/20"
                    >
                      download resume
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="font-brand text-3xl font-thin normal-case tracking-wide md:text-4xl">
                {heading}
              </h1>
              <div className="mt-6">
                <div className="rounded-lg border border-white/15 bg-black/25 px-4 py-3 shadow-sm backdrop-blur-sm">
                  {Array.isArray(body) ? (
                    <div className="space-y-4">
                      {body.map((paragraph, i) => (
                        <p
                          key={i}
                          className="font-nav text-sm font-light leading-relaxed text-white/90"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="font-nav text-sm font-light leading-relaxed text-white/90">
                      {body}
                    </p>
                  )}
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
