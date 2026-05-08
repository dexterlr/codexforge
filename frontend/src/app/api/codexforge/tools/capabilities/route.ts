import { NextResponse } from "next/server";
import {
  CODEXFORGE_CAPABILITY_BRIDGE_MANIFEST_VERSION,
  CODEXFORGE_GOD_TIER_FEATURE_SEQUENCE,
  buildCodexForgeCapabilityBridgeSummary,
  listCodexForgeCapabilityBridgeDescriptors,
} from "@/lib/codexforge/tools/capability-bridge-manifest";
import { listCodexForgeToolAdapters } from "@/lib/codexforge/tools/tool-adapter-registry";

export async function GET() {
  const bridges = listCodexForgeCapabilityBridgeDescriptors();
  const adapters = listCodexForgeToolAdapters();

  return NextResponse.json({
    ok: true,
    version: CODEXFORGE_CAPABILITY_BRIDGE_MANIFEST_VERSION,
    capabilitySummary: buildCodexForgeCapabilityBridgeSummary(),
    featureSequence: [...CODEXFORGE_GOD_TIER_FEATURE_SEQUENCE],
    capabilities: bridges.map((bridge) => ({
      id: bridge.id,
      label: bridge.label,
      summary: bridge.summary,
      status: bridge.status,
      consent: bridge.consent,
      riskLevel: bridge.riskLevel,
      operatorMode: bridge.operatorMode,
      adapterToolNames: [...bridge.adapterToolNames],
      missingAdapterToolNames: bridge.missingAdapterToolNames,
      safetyInvariants: [...bridge.safetyInvariants],
      nextMilestones: [...bridge.nextMilestones],
    })),
    adapters: adapters.map((adapter) => ({
      toolName: adapter.toolName,
      label: adapter.label,
      capability: adapter.capability,
      executionMode: adapter.executionMode,
      requiresApproval: adapter.requiresApproval,
      blocksByDefault: adapter.blocksByDefault,
      sideEffect: adapter.sideEffect,
      adapter: adapter.adapter,
    })),
  });
}
