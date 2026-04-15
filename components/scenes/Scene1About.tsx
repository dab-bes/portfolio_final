"use client";

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

export function Scene1About({
  heading,
  body,
}: {
  heading: string;
  body: string | readonly string[];
}) {
  return (
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
            <div className="flex flex-col items-center justify-center px-4 py-4 md:min-h-0 md:flex-1 md:border-t md:border-white/15">
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
  );
}
