import type {
  RenderJobStatusPollingModel,
  RenderJobStatusPollingPolicy,
  RenderJobStatusPollingPolicyId,
  RenderJobStatusPollingReadiness,
} from "./render-job-status-polling-types";

const POLICY_COPY: Record<RenderJobStatusPollingPolicyId, string> = {
  "local job ID/reference":
    "Status checks use a local job reference from an approved local queue record, not a cloud job.",
  "polling cadence policy":
    "Polling cadence policy is conservative and bounded so CodexForge does not spam the local bridge.",
  "timeout policy":
    "Timeout policy makes stale, missing, or unhealthy bridge responses visible instead of looping forever.",
  "stopped/paused state":
    "Stopped or paused state is shown as status only; it does not cancel, hold, retry, or reorder the queue.",
  "bridge health dependency":
    "Bridge health dependency means live polling waits for the approved local bridge to be healthy.",
  "ComfyUI health dependency":
    "ComfyUI health dependency means local ComfyUI readiness is checked by the approved boundary, not by arbitrary UI calls.",
  "artifact capture dependency":
    "Artifact capture dependency keeps completed or failed outputs routed to capture and review before reuse.",
  "no cloud polling":
    "No cloud polling: this surface does not check cloud providers, cloud queues, or hosted job APIs.",
  "no secret exposure":
    "No secret exposure: status summaries never show passwords, API keys, tokens, or process environment values.",
  "user-visible status summary":
    "User-visible status summary explains queued, running, held, stopped, complete, failed, or unknown in plain English.",
};

export function buildRenderJobStatusPollingPolicy(
  id: RenderJobStatusPollingPolicyId
): RenderJobStatusPollingPolicy {
  return {
    id,
    label: id,
    plainEnglish: POLICY_COPY[id],
    mutatesQueue: false,
  };
}

export function buildRenderJobStatusPollingPolicies(): RenderJobStatusPollingPolicy[] {
  return (Object.keys(POLICY_COPY) as RenderJobStatusPollingPolicyId[]).map(
    buildRenderJobStatusPollingPolicy
  );
}

export function buildRenderJobStatusPollingReadiness(): RenderJobStatusPollingReadiness {
  return {
    id: "approved-local-bridge",
    label: "Live polling remains behind the approved local bridge",
    status: "contract-ready",
    livePollingEnabled: false,
    approvalGated: true,
  };
}

export function buildRenderJobStatusPollingModel(): RenderJobStatusPollingModel {
  const model: RenderJobStatusPollingModel = {
    title: "Render job status polling",
    summary: "",
    policies: buildRenderJobStatusPollingPolicies(),
    readiness: buildRenderJobStatusPollingReadiness(),
    localOnly: true,
    cloudPollingAllowed: false,
    secretExposureAllowed: false,
    queueMutationAllowed: false,
  };

  return { ...model, summary: summarizeRenderJobStatusPolling(model) };
}

export function summarizeRenderJobStatusPolling(
  model: RenderJobStatusPollingModel
): string {
  return `${model.title}: Local job status only, with Polling cadence policy, Timeout policy, No cloud polling, and ${model.readiness.label}.`;
}
