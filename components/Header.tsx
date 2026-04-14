export function Header() {
  return (
    <header className="flex min-h-56 w-full shrink-0 flex-col items-center justify-center gap-6 bg-black/60 px-4 py-8 text-white">
      <span className="font-brand text-[40px] font-thin uppercase tracking-wide md:text-[90px]">
        Header
      </span>
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-nav font-light lowercase">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i}>Scene {i + 1}</span>
        ))}
      </div>
    </header>
  );
}
