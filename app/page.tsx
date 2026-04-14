export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-24 dark:bg-zinc-950">
      <main className="max-w-lg text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Portfolio
        </h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          Add your projects and content here in{" "}
          <code className="rounded bg-zinc-200/80 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
            app/page.tsx
          </code>
          .
        </p>
      </main>
    </div>
  );
}
