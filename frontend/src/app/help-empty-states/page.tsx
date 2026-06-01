import type { Metadata } from "next";
import HelpEmptyStatesPageClient from "./page-client";

export const metadata: Metadata = { title: "CodexForge helpful empty states", description: "Helpful empty states for the novice assisted coding path." };

export default function Page() {
  return <HelpEmptyStatesPageClient />;
}
