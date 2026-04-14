export function Header() {
  return (
    <header className="flex min-h-56 w-full shrink-0 flex-col items-center justify-center gap-6 bg-black/60 px-4 py-8 text-white">
      <span className="text-lg font-semibold tracking-wide">Header</span>
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i}>Scene</span>
        ))}
      </div>
    </header>
  );
}
