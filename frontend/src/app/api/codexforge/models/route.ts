import { NextResponse } from "next/server";
import {
  buildCodexForgeModelRouterSummary,
  CODEXFORGE_MODEL_ROUTER_VERSION,
} from "@/lib/codexforge/ai/model-router";

export async function GET() {
  const modelRouter = buildCodexForgeModelRouterSummary();

  return NextResponse.json({
    ok: true,
    version: CODEXFORGE_MODEL_ROUTER_VERSION,
    modelRouter,
    safetySummary: {
      planner: "high-reasoning-responses-profile",
      selfUpgrade: "high-reasoning-read-only-review",
      fastChat: "low-reasoning-cost-controlled",
      visionInspection: "explicit-session-consent-required",
      computerUse: "blocked-until-local-bridge-consent-and-audit",
      brokerExecution: "blocked",
    },
  });
}
