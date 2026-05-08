import { NextResponse } from "next/server";
import { buildCodexForgeSelfUpgradeBacklog } from "@/lib/codexforge/tools/self-upgrade-backlog";

export async function GET() {
  const backlog = buildCodexForgeSelfUpgradeBacklog();

  return NextResponse.json({
    ok: true,
    ...backlog,
    safetySummary: {
      localPcControl: "explicit-session-consent-required",
      cameraAccess: "explicit-session-consent-required",
      webAccess: "approval-required",
      creativeAppAutomation: "approval-required",
      tradingResearch: "approval-required",
      brokerExecution: "blocked",
    },
  });
}
