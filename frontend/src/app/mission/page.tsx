import type { Metadata } from "next";
import { buildMissionControlSummary } from "@/lib/codexforge/mission-control";
import MissionPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Mission Control Dashboard",
  description:
    "CodexForge Mission Control dashboard for readonly system health, surfaces, readiness, safe actions, activity, and safety posture.",
};

export default function MissionPage() {
  const initialData = buildMissionControlSummary();
  return <MissionPageClient initialData={initialData} />;
}
