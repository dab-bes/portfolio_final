"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";

/** Hides site footer on the cover (`/`), shown everywhere else. */
export function ConditionalFooter() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <Footer />;
}
