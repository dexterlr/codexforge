import {
  listCodexForgeCapabilityBridgeDescriptors,
  type CodexForgeCapabilityBridgeId,
  type CodexForgeResolvedCapabilityBridge,
} from "@/lib/codexforge/tools/capability-bridge-manifest";
import type { CodexForgeToolAdapterDescriptor } from "@/lib/codexforge/tools/tool-adapter-registry";
import type {
  BridgeAdapterGroup,
  BridgeAdapterMatrix,
  BridgeAdapterMatrixItem,
  BridgeCapabilityFamily,
  BridgeReadinessStatus,
} from "./bridge-types";

const familyByBridgeId: Record<CodexForgeCapabilityBridgeId, BridgeCapabilityFamily> = {
  "self-inspection": "self-inspection",
  "ai-router": "AI router",
  "web-research": "web research",
  "pc-bridge": "PC bridge",
  "camera-inspection": "camera",
  "video-render-job-preview": "video-render",
  "blender-adapter-preview": "Blender",
  "blender-production": "Blender",
  "unreal-adapter-preview": "Unreal",
  "unreal-production": "Unreal",
  "comfyui-production": "ComfyUI",
  "trading-research": "trading research",
  "broker-execution": "broker execution",
};

function firstAdapter(bridge: CodexForgeResolvedCapabilityBridge): CodexForgeToolAdapterDescriptor | null {
  return bridge.adapters[0] ?? null;
}

function readinessForBridge(bridge: CodexForgeResolvedCapabilityBridge): BridgeReadinessStatus {
  if (bridge.status === "blocked" || bridge.consent === "blocked") return "blocked";
  if (bridge.status === "available" && bridge.consent === "none") return "ready";
  return "guarded";
}

export function buildBridgeAdapterMatrix(): BridgeAdapterMatrix {
  const bridgeItems = listCodexForgeCapabilityBridgeDescriptors().map((bridge) => {
    const adapter = firstAdapter(bridge);
    const readiness = readinessForBridge(bridge);

    return {
      id: bridge.id,
      family: familyByBridgeId[bridge.id],
      label: bridge.label,
      capability: adapter?.capability ?? "project-inspection",
      mode: readiness === "ready" ? "preview-only" : adapter?.executionMode ?? "blocked",
      readiness,
      approvalRequired: bridge.consent !== "none",
      blockedReason:
        readiness === "blocked"
          ? "Broker execution blocked."
          : readiness === "guarded"
            ? bridge.safetyInvariants[0] ?? "Guarded approval required."
            : null,
      nextSafeMilestone: bridge.nextMilestones[0] ?? "Continue deterministic preview.",
      riskLevel: bridge.riskLevel,
    } satisfies BridgeAdapterMatrixItem;
  });

  const renderJobItem: BridgeAdapterMatrixItem = {
    id: "render-job",
    family: "render-job",
    label: "Render job",
    capability: "rendering",
    mode: "local-safe-simulated",
    readiness: "guarded",
    approvalRequired: true,
    blockedReason: "Render execution requires Operator Run Center approval.",
    nextSafeMilestone: "Keep render jobs in preview until guarded adapter approval exists.",
    riskLevel: "high",
  };

  const items = [bridgeItems[0], bridgeItems[1], renderJobItem, ...bridgeItems.slice(2)].filter(
    (item): item is BridgeAdapterMatrixItem => !!item
  );

  return {
    items,
    groups: groupBridgeAdapters(items),
    summary: summarizeBridgeAdapterMatrixFromItems(items),
  };
}

export function groupBridgeAdapters(items: BridgeAdapterMatrixItem[]): BridgeAdapterGroup[] {
  const families: BridgeCapabilityFamily[] = [
    "self-inspection",
    "AI router",
    "web research",
    "render-job",
    "video-render",
    "Blender",
    "ComfyUI",
    "Unreal",
    "PC bridge",
    "camera",
    "trading research",
    "broker execution",
  ];

  return families
    .map((family) => ({
      family,
      items: items.filter((item) => item.family === family),
    }))
    .filter((group) => group.items.length > 0);
}

function summarizeBridgeAdapterMatrixFromItems(items: BridgeAdapterMatrixItem[]): string[] {
  return [
    `${items.length} adapter families mapped.`,
    `${items.filter((item) => item.readiness === "ready").length} ready.`,
    `${items.filter((item) => item.readiness === "guarded").length} guarded.`,
    `${items.filter((item) => item.readiness === "blocked").length} blocked.`,
  ];
}

export function summarizeBridgeAdapterMatrix(
  matrix: BridgeAdapterMatrix = buildBridgeAdapterMatrix()
): string[] {
  return [...matrix.summary];
}
