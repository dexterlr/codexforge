import type { LocalProviderProbePlan, LocalProviderTarget } from "./local-provider-probe-types";

export function buildLocalProviderProbePlan(target: LocalProviderTarget): LocalProviderProbePlan {
  return {
    id: `${target.id}-probe-plan`,
    targetId: target.id,
    checks: [
      "check base URL presence",
      "check local-only host",
      "check health endpoint plan",
      "check no prompt payload sent",
      "check no secrets sent",
      "check metadata-only result",
    ],
    safeBecause: [
      "This phase describes the probe only.",
      "No live HTTP request is made from the deterministic domain files.",
      "A future live route must stay metadata-only and approval-aware.",
    ],
    liveCallAllowed: false,
  };
}
