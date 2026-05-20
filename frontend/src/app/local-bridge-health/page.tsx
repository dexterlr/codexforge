import type { Metadata } from "next";
import { buildLocalBridgeHealthModel } from "@/lib/codexforge/local-bridge-health";
import LocalBridgeHealthPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Local Bridge Health",
  description:
    "CodexForge Local Bridge Health Check v1 preview-only/manual-only/future-guarded health target, profile, policy, probe preview, result, setup guide, and next action control plane.",
};

export default function LocalBridgeHealthPage() {
  return <LocalBridgeHealthPageClient initialData={buildLocalBridgeHealthModel()} />;
}
