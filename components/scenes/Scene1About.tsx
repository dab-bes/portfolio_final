"use client";

const RESUME_FILE = "Christian Daniel Abbes - Web Developer.pdf";
const RESUME_HREF = `/${encodeURIComponent(RESUME_FILE)}`;
const BIO_STORY_TITLE = "North Is That Way";

function Scene1Portrait({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative aspect-square w-full shrink-0 overflow-hidden rounded-lg md:mx-0 md:w-52 md:max-w-none md:aspect-[4/5] lg:w-60${className ? ` ${className}` : ""}`}
    >
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
      <div className="flex min-w-0 flex-1 flex-col md:gap-0">
        <h1 className="animate-scene-in-title relative z-20 mt-7 min-w-0 font-brand text-4xl font-thin normal-case tracking-wide md:mt-0">
          {heading}
        </h1>
        <div className="relative max-md:mt-4 md:mt-6">
          <div className="animate-scene-about-in-bio relative z-10 w-full rounded-lg border border-white/15 bg-black/25 px-4 py-3 shadow-sm backdrop-blur-sm max-md:flex max-md:h-[min(65vh,26rem)] max-md:min-h-0 max-md:flex-col max-md:overflow-hidden">
            <div className="hide-scrollbar min-h-0 max-md:min-h-0 max-md:flex-1 max-md:overflow-y-auto max-md:overscroll-y-contain">
              <div className="mb-5 flex items-start justify-between gap-3 border-b border-white/15 pb-3 md:block">
                <h2 className="min-w-0 flex-1 pt-2 text-left font-brand text-lg font-light italic tracking-[0.02em] text-white md:pt-0 md:text-right md:text-xl">
                  {BIO_STORY_TITLE}
                </h2>
                <div className="animate-scene-about-in-photo relative z-20 shrink-0 overflow-hidden rounded-md md:hidden">
                  <Scene1Portrait className="!h-28 !w-28 !max-w-none aspect-square rounded-md !outline-none min-h-0 min-w-0" />
                </div>
              </div>
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
      <div className="flex w-full shrink-0 flex-col gap-4 md:min-h-0 md:w-60 md:pt-10 lg:w-64">
        <div className="animate-scene-about-in-photo hidden shrink-0 md:mx-auto md:block">
          <Scene1Portrait />
        </div>
        <div className="flex min-h-0 flex-col md:min-h-0 md:flex-1 md:justify-end">
          <div className="flex w-full flex-row flex-wrap items-center justify-center gap-3 px-2 py-4 max-md:gap-4 md:flex-nowrap md:gap-3 md:py-3">
            <picture className="animate-scene-about-in-logo-1 block h-auto w-auto max-w-[4.5rem] shrink-0 md:max-w-[calc((100%_-_1.5rem)_/_3)]">
              <source srcSet="/logos/pacsun.svg" type="image/svg+xml" />
              <img
                src="/logos/pacsun.png"
                alt="PacSun logo"
                width={512}
                height={101}
                className="h-auto max-h-11 w-full object-contain md:max-h-10"
                decoding="async"
              />
            </picture>
            <picture className="animate-scene-about-in-logo-2 block h-auto w-auto max-w-[4.5rem] shrink-0 md:max-w-[calc((100%_-_1.5rem)_/_3)]">
              <source srcSet="/logos/bbrew.svg" type="image/svg+xml" />
              <img
                src="/logos/bbrew.png"
                alt="Brew logo"
                width={300}
                height={300}
                className="h-auto max-h-11 w-full object-contain md:max-h-10"
                decoding="async"
              />
            </picture>
            <picture className="animate-scene-about-in-logo-3 block h-auto w-auto max-w-[4.5rem] shrink-0 md:max-w-[calc((100%_-_1.5rem)_/_3)]">
              <source srcSet="/logos/bu.svg" type="image/svg+xml" />
              <img
                src="/logos/bu.png"
                alt="BU logo"
                width={620}
                height={276}
                className="h-auto max-h-11 w-full object-contain md:max-h-10"
                decoding="async"
              />
            </picture>
          </div>
        </div>
      </div>
      <a
        href={RESUME_HREF}
        download={RESUME_FILE}
        className="animate-scene-about-in-resume absolute top-0 right-0 z-10 inline-flex border-b border-white/35 px-0 pb-px font-nav text-xs font-light lowercase tracking-wide text-white transition-[opacity,border-color] hover:border-white/55 hover:opacity-80 active:opacity-70"
      >
        download resume
      </a>
    </div>
  );
}
