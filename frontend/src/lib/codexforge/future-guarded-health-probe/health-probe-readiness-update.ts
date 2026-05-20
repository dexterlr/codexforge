import type { HealthProbeReadinessUpdate, HealthProbeReadinessUpdateItem, HealthProbeResult, HealthProbeResultItem } from "./future-health-probe-types";
import { buildHealthProbeResult } from "./health-probe-result";

export function buildHealthProbeReadinessUpdateItem(result: HealthProbeResultItem): HealthProbeReadinessUpdateItem {
  const ready = result.status === "supplied-ready" || result.status === "supplied-configured";
  const blocked = result.status === "blocked" || result.blockerReasons.length > 0;
  return {
    targetId: result.targetId,
    localBridgeHealth: ready ? "supplied evidence can inform local bridge health" : blocked ? "blocked evidence keeps bridge health blocked" : "manual evidence required",
    creativeReadinessAudit: ready ? "scorecard can mention supplied health evidence" : "readiness audit remains manual-first",
    guardedExecutorPreflight: ready ? "preflight may cite supplied metadata" : "executor preflight remains blocked/request-ready only",
    videoRenderProviderReadiness: result.targetId.includes("ffmpeg") || result.targetId.includes("artifact") ? "provider readiness can cite supplied metadata only" : "no provider readiness change",
    artifactBoundaryReadiness: result.targetId === "artifact-output-boundary" && ready ? "artifact boundary metadata supplied" : "no artifact boundary persistence",
    nextSetupAction: ready ? "Review supplied evidence; do not persist automatically." : "Collect manual metadata or resolve blockers.",
    persistedAutomatically: false,
  };
}

export function buildHealthProbeReadinessUpdate(result: HealthProbeResult = buildHealthProbeResult()): HealthProbeReadinessUpdate {
  const items = result.items.map(buildHealthProbeReadinessUpdateItem);
  const update: HealthProbeReadinessUpdate = { id: "future-guarded-health-probe-readiness-update", items, summary: [] };
  return { ...update, summary: summarizeHealthProbeReadinessUpdate(update) };
}

export function summarizeHealthProbeReadinessUpdate(update: HealthProbeReadinessUpdate): string[] {
  return [
    `${update.items.length} readiness update rows mapped to local bridge health, creative readiness audit, guarded executor preflight, video render provider readiness, and artifact boundary readiness.`,
    "Readiness update does not persist automatically, mutate Brain graph, or write files.",
  ];
}
