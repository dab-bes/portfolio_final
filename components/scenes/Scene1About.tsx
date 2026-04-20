"use client";

const RESUME_FILE = "Christian Daniel Abbes - Web Developer.pdf";
const RESUME_HREF = `/${encodeURIComponent(RESUME_FILE)}`;

function Scene1Portrait() {
  return (
    <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-lg md:w-44 md:aspect-[4/5] lg:w-52">
      <div
        aria-hidden
        className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,rgba(0,0,0,0.28)_0%,rgba(0,0,0,0.14)_48%,rgba(0,0,0,0.04)_72%,transparent_100%)]"
      />
      <picture className="absolute inset-0 z-[1] block">
        <source srcSet="/self.webp" type="image/webp" />
        <img
          src="/self.png"
          alt="Profile photo"
          width={2134}
          height={1939}
          className="h-full w-full object-cover object-center [mask-image:radial-gradient(ellipse_96%_98%_at_50%_50%,#000_55%,#000_74%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_96%_98%_at_50%_50%,#000_55%,#000_74%,transparent_100%)]"
          decoding="async"
          fetchPriority="high"
        />
      </picture>
    </div>
  );
}

export function Scene1About({
  heading,
  body,
}: {
  heading: string;
  body: string | readonly string[];
}) {
  return (
    <div className="relative flex min-h-0 w-full flex-1 flex-col gap-8 md:flex-row md:items-stretch md:gap-10">
      <div className="min-w-0 flex-1">
        <h1 className="animate-scene-about-in-title font-brand text-3xl font-thin normal-case tracking-wide md:text-4xl">
          {heading}
        </h1>
        <div className="mt-6">
          <div className="animate-scene-about-in-bio rounded-lg border border-white/15 bg-black/25 px-4 py-3 shadow-sm backdrop-blur-sm">
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
      <div className="flex w-full shrink-0 flex-col gap-4 md:min-h-0 md:w-44 lg:w-52">
        <div className="flex flex-col md:min-h-0 md:flex-1">
          <div className="flex min-h-0 flex-col md:min-h-0 md:flex-1">
            <div className="flex w-full flex-col items-center gap-6 px-2 py-4 md:flex-1 md:justify-center md:py-5">
              <picture className="block w-full max-w-[4.5rem] shrink-0">
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
              <picture className="block w-full max-w-[4.5rem] shrink-0">
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
            </div>
          </div>
        </div>
        <div className="animate-scene-about-in-photo shrink-0">
          <Scene1Portrait />
        </div>
      </div>
      <a
        href={RESUME_HREF}
        download={RESUME_FILE}
        className="absolute right-0 top-0 z-10 inline-flex px-0 py-0 font-nav text-xs font-light lowercase tracking-wide text-white transition-opacity hover:opacity-80 active:opacity-70"
      >
        download resume
      </a>
    </div>
  );
}
