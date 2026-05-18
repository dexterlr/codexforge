import type { Metadata } from "next";
import RuntimeReplayPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Runtime Event Replay Simulator",
  description:
    "CodexForge preview-only Runtime Event Replay Simulator for selected journal events, graph snapshot reducer preview, impact analysis, risk detection, and rollback guidance.",
};

export default function RuntimeReplayPage() {
  return <RuntimeReplayPageClient />;
}
