import type { Metadata } from "next";
import FirstTaskPageClient from "./page-client";

export const metadata: Metadata = { title: "CodexForge first safe task", description: "Make one tiny wording change while CodexForge keeps you in control." };

export default function Page() {
  return <FirstTaskPageClient />;
}
