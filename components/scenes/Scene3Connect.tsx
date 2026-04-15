"use client";

import { ConnectGlobe } from "@/components/ConnectGlobe";

const FORMCARRY_ACTION = "https://formcarry.com/s/B-l9Gc-B8hp";

const SOCIAL = [
  { href: "https://www.linkedin.com/in/daniel-abbes", label: "linkedin" },
  { href: "https://github.com/dab-bes", label: "github" },
  { href: "https://bsky.app", label: "bluesky" },
] as const;

export function Scene3Connect({ heading }: { heading: string }) {
  return (
    <>
      <h1 className="font-brand text-3xl font-thin normal-case tracking-wide md:text-4xl">
        {heading}
      </h1>
      <div className="mt-6 flex min-h-0 flex-1 flex-col gap-6 md:flex-row md:items-stretch md:gap-8">
        <div className="flex min-h-0 min-w-0 flex-1 flex-col rounded-lg border border-white/15 bg-black/25 p-4 shadow-sm backdrop-blur-sm md:p-5">
          <div className="mb-4">
            <p className="font-nav text-xs font-light uppercase tracking-[0.2em] text-white/50">
              let&apos;s create
            </p>
            <p className="mt-1 font-nav text-sm font-light leading-relaxed text-white/85">
              I&apos;m ready. I&apos;m listening. Let&apos;s turn imagination into reality.
            </p>
          </div>
          <form
            action={FORMCARRY_ACTION}
            method="POST"
            acceptCharset="UTF-8"
            className="flex min-h-0 flex-1 flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
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
            <div className="flex flex-col gap-2">
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
                required
                placeholder="your message"
                className="min-h-[8rem] w-full flex-1 resize-y rounded-lg border border-white/15 bg-black/40 px-3 py-2.5 font-nav text-sm font-light text-white placeholder:text-white/40 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
              />
            </div>
            <button
              type="submit"
              className="mt-auto w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 font-nav text-sm font-light lowercase tracking-wide text-white transition-colors hover:bg-white/15 active:bg-white/20 md:w-auto md:self-start"
            >
              send message
            </button>
          </form>
        </div>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-5">
          <ConnectGlobe />
          <div className="rounded-lg border border-white/15 bg-black/25 px-4 py-3 shadow-sm backdrop-blur-sm">
            <p className="font-nav text-sm font-light text-white/90 md:text-base">
              Brooklyn, New York
            </p>
            <p className="mt-1 font-nav text-sm font-light text-white/70 md:text-base">
              <a
                href="mailto:cdabbes@proton.me"
                className="text-white/90 underline decoration-white/30 underline-offset-2 transition-colors hover:decoration-white/60"
              >
                cdabbes@proton.me
              </a>
            </p>
          </div>
          <div className="rounded-lg border border-white/15 bg-black/25 px-4 py-3 shadow-sm backdrop-blur-sm">
            <ul className="flex flex-wrap gap-2">
              {SOCIAL.map(({ href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-lg border border-white/20 bg-white/5 px-4 py-2 font-nav text-sm font-light lowercase tracking-wide text-white/90 transition-colors hover:bg-white/10 active:bg-white/15"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
