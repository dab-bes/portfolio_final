"use client";

import { ConnectGlobe } from "@/components/ConnectGlobe";

const FORMCARRY_ACTION = "https://formcarry.com/s/B-l9Gc-B8hp";

const CONNECT_FOOTER_LI_LIFT = [
  "animate-connect-footer-in-1",
  "animate-connect-footer-in-2",
  "animate-connect-footer-in-3",
] as const;

const SOCIAL: ReadonlyArray<{
  href: string;
  label: string;
  logoSrc?: string;
  /** Required when logoSrc is set (icon-only control). */
  ariaLabel?: string;
}> = [
  {
    href: "https://www.linkedin.com/in/daniel-abbes",
    label: "linkedin",
    logoSrc: "/logos/linkedin.svg",
    ariaLabel: "LinkedIn",
  },
  {
    href: "https://github.com/dab-bes",
    label: "github",
    logoSrc: "/logos/github.svg",
    ariaLabel: "GitHub",
  },
  {
    href: "https://app.flashes.blue/profile/dab8es.bsky.social",
    label: "bluesky",
    logoSrc: "/logos/bluesky.svg",
    ariaLabel: "Bluesky",
  },
];

export function Scene3Connect({ heading }: { heading: string }) {
  return (
    <>
      <h1 className="animate-scene-in-title font-brand text-3xl font-thin normal-case tracking-wide md:text-4xl">
        {heading}
      </h1>
      <div className="mt-6 flex min-h-0 flex-1 flex-col gap-3 md:flex-row md:items-stretch md:gap-8">
        <div className="flex min-h-0 min-w-0 flex-1 flex-col rounded-lg border border-white/15 bg-black/25 p-4 shadow-sm backdrop-blur-sm md:p-5">
          <div className="mb-4">
            <p className="animate-connect-form-in-1 font-nav text-sm font-light uppercase leading-relaxed tracking-[0.2em] text-white/85">
              let&apos;s create
            </p>
            <p className="animate-connect-form-in-2 mt-1 font-nav text-xs font-light lowercase tracking-wide text-white/50">
              i&apos;m ready. i&apos;m listening. let&apos;s turn imagination into reality.
            </p>
          </div>
          <form
            action={FORMCARRY_ACTION}
            method="POST"
            acceptCharset="UTF-8"
            className="flex min-h-0 flex-1 flex-col gap-4"
          >
            <div className="animate-connect-form-in-3 flex flex-col gap-2">
              <label
                htmlFor="connect-name"
                className="font-nav text-sm font-light lowercase tracking-wide text-white/70"
              >
                name
              </label>
              <input
                id="connect-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="your name"
                className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2.5 font-nav text-sm font-light text-white placeholder:text-white/40 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
              />
            </div>
            <div className="animate-connect-form-in-4 flex flex-col gap-2">
              <label
                htmlFor="connect-email"
                className="font-nav text-sm font-light lowercase tracking-wide text-white/70"
              >
                email
              </label>
              <input
                id="connect-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="your email"
                className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2.5 font-nav text-sm font-light text-white placeholder:text-white/40 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
              />
            </div>
            <div className="animate-connect-form-in-5 flex min-h-0 flex-1 flex-col gap-2">
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
                required
                placeholder="your message"
                className="min-h-[8rem] w-full flex-1 resize-y rounded-lg border border-white/15 bg-black/40 px-3 py-2.5 font-nav text-sm font-light text-white placeholder:text-white/40 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
              />
            </div>
            <button
              type="submit"
              className="animate-connect-form-in-6 mt-auto w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 font-nav text-sm font-light lowercase tracking-wide text-white transition-colors hover:bg-white/15 active:bg-white/20 md:w-auto md:self-start"
            >
              send message
            </button>
          </form>
        </div>

        <div className="relative flex min-h-0 min-w-0 flex-1 flex-col">
          {/* Reserve bottom band for footer overlay (icons + location); tighter on mobile now that footer is one row. */}
          <div className="relative z-0 min-h-0 flex-1 pb-24 md:pb-[11rem]">
            <ConnectGlobe />
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex w-full flex-row items-end justify-between gap-x-3 sm:gap-x-4">
            <ul className="pointer-events-auto m-0 flex min-w-0 max-w-[min(20rem,55%)] list-none flex-row flex-wrap justify-start gap-2 [text-shadow:0_1px_14px_rgba(0,0,0,0.92)]">
              {SOCIAL.map(({ href, label, logoSrc, ariaLabel }, index) => (
                <li
                  key={label}
                  className={
                    CONNECT_FOOTER_LI_LIFT[
                      Math.min(index, CONNECT_FOOTER_LI_LIFT.length - 1)
                    ]
                  }
                >
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={logoSrc ? ariaLabel : undefined}
                    className={
                      logoSrc
                        ? "inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/30 bg-black/70 text-white shadow-[0_2px_12px_rgba(0,0,0,0.45)] backdrop-blur-sm transition-colors hover:border-white/45 hover:bg-black/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:bg-black/90 md:size-11"
                        : "inline-flex shrink-0 items-center rounded-lg border border-white/25 bg-black/60 px-4 py-2 font-nav text-sm font-light lowercase tracking-wide text-white shadow-[0_2px_12px_rgba(0,0,0,0.45)] backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-black/75 active:bg-black/85"
                    }
                  >
                    {logoSrc ? (
                      <img
                        src={logoSrc}
                        alt=""
                        width={28}
                        height={28}
                        className="size-5 shrink-0 opacity-100 md:size-7"
                      />
                    ) : (
                      label
                    )}
                  </a>
                </li>
              ))}
            </ul>
            <div className="pointer-events-auto min-w-0 w-max max-w-full shrink-0 text-right [text-shadow:0_1px_14px_rgba(0,0,0,0.92)]">
              <p className="animate-connect-footer-in-4 font-nav text-sm font-light text-white md:text-base">
                brooklyn, new york
              </p>
              <p className="animate-connect-footer-in-5 mt-1 font-nav text-sm font-light text-white md:text-base">
                <a
                  href="mailto:cdabbes@proton.me"
                  className="break-all text-white underline decoration-white/55 underline-offset-[3px] transition-colors hover:decoration-white sm:break-normal"
                >
                  cdabbes@proton.me
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
