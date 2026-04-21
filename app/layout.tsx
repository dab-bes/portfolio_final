import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Ysabeau_Infant } from "next/font/google";
import { Footer } from "@/components/Footer";
import { SceneProvider } from "@/components/SceneContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ysabeauInfant = Ysabeau_Infant({
  variable: "--font-ysabeau-infant",
  subsets: ["latin"],
  weight: "100",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "300",
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${ysabeauInfant.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="flex min-h-dvh min-h-full flex-col bg-[url('/background.jpg')] bg-cover bg-center bg-no-repeat bg-[color:var(--background)]">
        <SceneProvider>
          <div className="flex min-h-0 flex-1 flex-col">{children}</div>
        </SceneProvider>
        <Footer />
      </body>
    </html>
  );
}
