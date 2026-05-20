import type { BridgeHealthPolicy, BridgeHealthProfile, BridgeHealthResult, BridgeHealthTarget, LocalBridgeHealthSummary } from "./local-bridge-health-types";
import { buildDefaultBridgeHealthProfiles, isBridgeHealthProfileConfigured } from "./bridge-health-profile";
import { buildBridgeHealthPolicy } from "./bridge-health-policy";
import { buildBridgeHealthResult } from "./bridge-health-result";
import { buildDefaultBridgeHealthTargets } from "./bridge-health-target";

export function buildLocalBridgeHealthSummary(args: {
  targets?: BridgeHealthTarget[];
  profiles?: BridgeHealthProfile[];
  result?: BridgeHealthResult;
  policy?: BridgeHealthPolicy;
} = {}): LocalBridgeHealthSummary {
  const targets = args.targets ?? buildDefaultBridgeHealthTargets();
  const profiles = args.profiles ?? buildDefaultBridgeHealthProfiles(targets);
  const result = args.result ?? buildBridgeHealthResult(targets, profiles);
  const policy = args.policy ?? buildBridgeHealthPolicy();
  const configuredCount = profiles.filter(isBridgeHealthProfileConfigured).length;
  const readyCount = result.items.filter((item) => item.status === "ready").length;
  const missingConfigCount = profiles.filter((profile) => profile.missingConfiguration.length > 0).length;
  const blockedProbeCount = policy.blockedReasons.length;
  const manualOnlyCount = result.items.filter((item) => item.reachableStatus === "manual-only" || item.status === "manual-only").length;
  const futureProbeReadiness = configuredCount === targets.length && policy.requestReady ? "request-ready" : missingConfigCount > 0 ? "setup-required" : "blocked";
  const nextSafeAction = missingConfigCount > 0 ? "Follow setup guide." : "Plan future guarded health probe phase.";
  const summary: LocalBridgeHealthSummary = {
    id: "local-bridge-health-summary",
    targetCount: targets.length,
    configuredCount,
    readyCount,
    missingConfigCount,
    blockedProbeCount,
    manualOnlyCount,
    futureProbeReadiness,
    nextSafeAction,
    summary: [],
  };
  return { ...summary, summary: summarizeLocalBridgeHealthSession(summary) };
}

export function summarizeLocalBridgeHealthSession(summary: LocalBridgeHealthSummary): string[] {
  return [
    `${summary.targetCount} targets, ${summary.configuredCount} configured, ${summary.readyCount} ready.`,
    `${summary.missingConfigCount} missing config, ${summary.blockedProbeCount} blocked probe reasons, ${summary.manualOnlyCount} manual-only targets.`,
    `Future probe readiness: ${summary.futureProbeReadiness}. Next safe action: ${summary.nextSafeAction}`,
  ];
}
