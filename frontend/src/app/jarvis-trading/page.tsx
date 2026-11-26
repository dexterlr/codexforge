import type { Metadata } from "next";
import JarvisTradingWorkspacePageClient from "./page-client";

export const metadata: Metadata = {
  title: "Trading Research",
  description: "Scan market observations and financial news, then explore trading strategies with Jarvis.",
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
