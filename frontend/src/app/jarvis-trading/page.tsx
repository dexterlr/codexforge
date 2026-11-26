import type { Metadata } from "next";
import JarvisTradingWorkspacePageClient from "./page-client";

export const metadata: Metadata = {
  title: "Trading Research",
  description: "Research-only planning with no advice, live data, broker connection, order placement, automation, or live-money action.",
};

export default async function JarvisTradingWorkspacePage({
  searchParams,
}: {
  searchParams: Promise<{ conversation?: string | string[] }>;
}) {
  const { conversation } = await searchParams;
  const conversationId = typeof conversation === "string" && conversation ? conversation : null;
  return <JarvisTradingWorkspacePageClient conversationId={conversationId} />;
}
