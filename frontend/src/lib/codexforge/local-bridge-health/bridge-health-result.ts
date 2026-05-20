import type { BridgeHealthProfile, BridgeHealthResult, BridgeHealthResultItem, BridgeHealthTarget } from "./local-bridge-health-types";
import { buildDefaultBridgeHealthProfiles, isBridgeHealthProfileConfigured } from "./bridge-health-profile";
import { buildDefaultBridgeHealthTargets } from "./bridge-health-target";

export function buildBridgeHealthResultItem(input: BridgeHealthResultItem): BridgeHealthResultItem {
  return input;
}

export function buildBridgeHealthResult(
  targets: BridgeHealthTarget[] = buildDefaultBridgeHealthTargets(),
  profiles: BridgeHealthProfile[] = buildDefaultBridgeHealthProfiles(targets)
): BridgeHealthResult {
  const items = targets.map((target) => {
    const profile = profiles.find((item) => item.targetId === target.id);
    const configured = profile ? isBridgeHealthProfileConfigured(profile) : false;
    return buildBridgeHealthResultItem({
      targetId: target.id,
      status: configured ? "configured" : target.healthStatus,
      configured,
      reachableStatus: target.probeMode === "manual-only" ? "manual-only" : "unknown",
      versionLabel: profile?.expectedVersionLabel,
      missingConfig: profile?.missingConfiguration ?? ["profile"],
      blockerReasons: target.executionRisk === "blocked" || target.executionRisk === "high" ? [target.nextSetupAction] : [],
      warningReasons: configured ? [] : ["Result does not fabricate reachability; evidence is unknown until supplied."],
      manualNotes: ["Manual-only unless future guarded probe is approved and allowlisted."],
      evidenceSource: profile?.configured ? "operator-supplied" : "metadata-default",
      confidence: configured ? "medium" : "low",
    });
  });
  return { id: "local-bridge-health-result", items, summary: summarizeBridgeHealthResult({ id: "local-bridge-health-result", items, summary: [] }) };
}

export function summarizeBridgeHealthResult(result: BridgeHealthResult): string[] {
  return [
    `${result.items.length} result items derived from metadata.`,
    `${result.items.filter((item) => item.reachableStatus === "unknown").length} targets have unknown reachability.`,
    "Result does not fabricate reachability; only supplied evidence can mark a target reachable.",
  ];
}
