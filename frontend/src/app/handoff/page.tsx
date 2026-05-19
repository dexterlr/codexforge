import type { Metadata } from "next";
import { buildContinuityHandoffSummary } from "@/lib/codexforge/continuity-handoff";
import HandoffPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Continuity Handoff Packet",
  description:
    "CodexForge read-only continuity handoff packet for current state, risks, validation, rollback, memory, Brain continuity, and next safe action.",
};

export default function HandoffPage() {
  const initialData = buildContinuityHandoffSummary();
  return <HandoffPageClient initialData={initialData} />;
}
