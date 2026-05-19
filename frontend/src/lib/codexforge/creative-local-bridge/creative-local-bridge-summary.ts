import type {
  CreativeAdapterCatalogItem,
  CreativeArtifactCapturePlan,
  CreativeBridgeProfile,
  CreativeJobPolicy,
  CreativeLocalBridgeSummary,
} from "./creative-local-bridge-types";
import { isCreativeBridgeProfileReady } from "./creative-bridge-profile";

export function buildCreativeLocalBridgeReactKey(prefix: string, id: string): string {
  return `${prefix}-${id}`.toLowerCase().replace(/[^a-z0-9-]+/g, "-");
}

export function buildCreativeLocalBridgeSummary(input: {
  profiles: CreativeBridgeProfile[];
  adapters: CreativeAdapterCatalogItem[];
  policy: CreativeJobPolicy;
  artifactPlan: CreativeArtifactCapturePlan;
}): CreativeLocalBridgeSummary {
  const executionBlockedCount = input.policy.blockedReasons.length;
  return {
    bridgeProfileCount: input.profiles.length,
    readyProfileCount: input.profiles.filter(isCreativeBridgeProfileReady).length,
    adapterCount: input.adapters.length,
    executionBlockedCount,
    jobRequestReadiness: input.policy.previewAllowed ? "preview-ready" : "needs metadata",
    artifactCaptureReadiness: input.artifactPlan.ready ? "capture plan ready" : "capture plan missing",
    nextSafeAction: input.policy.nextSafeAction,
  };
}

export function summarizeCreativeLocalBridgeSession(summary: CreativeLocalBridgeSummary): string[] {
  return [
    `${summary.bridgeProfileCount} profiles, ${summary.readyProfileCount} ready.`,
    `${summary.adapterCount} adapters, ${summary.executionBlockedCount} execution blockers.`,
    `Job request readiness: ${summary.jobRequestReadiness}.`,
    `Artifact capture readiness: ${summary.artifactCaptureReadiness}.`,
    summary.nextSafeAction,
  ];
}
