import type { Metadata } from "next";
import JarvisTradingWorkspacePageClient from "./page-client";

export const metadata: Metadata = {
  title: "Trading Research",
  description: "Research-only planning with no advice, live data, broker connection, order placement, automation, or live-money action.",
};

export default function JarvisTradingWorkspacePage() {
  return <JarvisTradingWorkspacePageClient />;
}
