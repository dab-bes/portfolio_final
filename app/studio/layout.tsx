import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SceneProvider } from "@/components/SceneContext";

export default function StudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SceneProvider>
      <Header />
      <main className="flex min-h-0 flex-1 flex-col">{children}</main>
      <Footer />
    </SceneProvider>
  );
}
