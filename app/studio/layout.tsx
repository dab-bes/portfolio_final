import { Header } from "@/components/Header";

export default function StudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex min-h-0 flex-1 flex-col">{children}</main>
    </>
  );
}
