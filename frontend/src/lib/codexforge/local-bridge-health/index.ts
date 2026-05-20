export * from "./local-bridge-health-types";
export * from "./bridge-health-target";
export * from "./bridge-health-profile";
export * from "./bridge-health-check-plan";
export * from "./bridge-health-policy";
export * from "./bridge-health-probe-preview";
export * from "./bridge-health-result";
export * from "./bridge-health-setup-guide";
export * from "./bridge-health-next-action";
export * from "./bridge-health-summary";

// index exports buildBridgeHealthTarget buildDefaultBridgeHealthTargets buildBridgeHealthProfile
// buildDefaultBridgeHealthProfiles isBridgeHealthProfileConfigured buildBridgeHealthCheckPlan
// buildBridgeHealthCheck buildBridgeHealthPolicy isBridgeHealthProbeAllowed
// buildBridgeHealthProbePreview buildBridgeHealthProbePreviewItem buildBridgeHealthResult
// buildBridgeHealthResultItem buildBridgeHealthSetupGuide buildBridgeHealthSetupStep
// selectBridgeHealthNextAction buildBridgeHealthNextActionPlan buildLocalBridgeHealthSummary

import { buildBridgeHealthCheckPlan } from "./bridge-health-check-plan";
import { buildBridgeHealthNextActionPlan } from "./bridge-health-next-action";
import { buildBridgeHealthPolicy } from "./bridge-health-policy";
import { buildBridgeHealthProbePreview } from "./bridge-health-probe-preview";
import { buildDefaultBridgeHealthProfiles } from "./bridge-health-profile";
import { buildBridgeHealthResult } from "./bridge-health-result";
import { buildBridgeHealthSetupGuide } from "./bridge-health-setup-guide";
import { buildLocalBridgeHealthSummary } from "./bridge-health-summary";
import { buildDefaultBridgeHealthTargets } from "./bridge-health-target";
import type { LocalBridgeHealthModel } from "./local-bridge-health-types";

export function buildLocalBridgeHealthModel(): LocalBridgeHealthModel {
  const targets = buildDefaultBridgeHealthTargets();
  const profiles = buildDefaultBridgeHealthProfiles(targets);
  const checkPlan = buildBridgeHealthCheckPlan(targets, profiles);
  const policy = buildBridgeHealthPolicy();
  const probePreview = buildBridgeHealthProbePreview(targets);
  const result = buildBridgeHealthResult(targets, profiles);
  const setupGuide = buildBridgeHealthSetupGuide();
  const nextActionPlan = buildBridgeHealthNextActionPlan({ profiles, result, setupGuide });
  const summary = buildLocalBridgeHealthSummary({ targets, profiles, result, policy });
  return { targets, profiles, checkPlan, policy, probePreview, result, setupGuide, nextActionPlan, summary };
}
