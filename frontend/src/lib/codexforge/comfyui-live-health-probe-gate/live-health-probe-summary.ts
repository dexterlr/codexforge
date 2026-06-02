import type { LiveHealthProbeSummary } from "./comfyui-live-health-gate-types";
import { buildLiveHealthProbeDecision } from "./live-health-probe-decision";
import { buildLiveHealthProbeHandoff } from "./live-health-probe-handoff";
import { buildLiveHealthProbePolicy } from "./live-health-probe-policy";
import { buildLiveHealthProbeReadiness } from "./live-health-probe-readiness";
import { buildDefaultLiveHealthProbeRequest } from "./live-health-probe-request";
import { buildLiveHealthProbeSafety } from "./live-health-probe-safety";

export function summarizeLiveHealthProbeGate(summary: LiveHealthProbeSummary): string {
  return `ComfyUI health gate is ${summary.decision.status}: no video is generated, no workflow runs, no prompts are sent, and no queue is changed.`;
}

export function buildLiveHealthProbeSummary(): LiveHealthProbeSummary {
  const request = buildDefaultLiveHealthProbeRequest();
  const policy = buildLiveHealthProbePolicy(request);
  const decision = buildLiveHealthProbeDecision(request, policy);
  const summary: LiveHealthProbeSummary = {
    request,
    policy,
    safety: buildLiveHealthProbeSafety(),
    readiness: buildLiveHealthProbeReadiness(request, policy),
    decision,
    handoff: buildLiveHealthProbeHandoff(decision),
    summary: "",
  };
  return { ...summary, summary: summarizeLiveHealthProbeGate(summary) };
}
