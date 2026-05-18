import type { Metadata } from "next";
import { buildGlobalActivityFeed } from "@/lib/codexforge/global-activity";
import ActivityPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Global Activity Feed",
  description:
    "CodexForge read-only global activity feed for verification, regression, patch workflow, apply gates, memory review, creative planning, stabilization, and next safe action.",
};

export default function ActivityPage() {
  const initialData = buildGlobalActivityFeed();
  return <ActivityPageClient initialData={initialData} />;
}
