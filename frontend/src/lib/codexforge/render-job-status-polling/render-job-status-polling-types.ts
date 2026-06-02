export type RenderJobStatusPollingPolicyId =
  | "local job ID/reference"
  | "polling cadence policy"
  | "timeout policy"
  | "stopped/paused state"
  | "bridge health dependency"
  | "ComfyUI health dependency"
  | "artifact capture dependency"
  | "no cloud polling"
  | "no secret exposure"
  | "user-visible status summary";

export type RenderJobStatusPollingPolicy = {
  id: RenderJobStatusPollingPolicyId;
  label: string;
  plainEnglish: string;
  mutatesQueue: false;
};

export type RenderJobStatusPollingReadiness = {
  id: "approved-local-bridge";
  label: "Live polling remains behind the approved local bridge";
  status: "contract-ready";
  livePollingEnabled: false;
  approvalGated: true;
};

export type RenderJobStatusPollingModel = {
  title: "Render job status polling";
  summary: string;
  policies: RenderJobStatusPollingPolicy[];
  readiness: RenderJobStatusPollingReadiness;
  localOnly: true;
  cloudPollingAllowed: false;
  secretExposureAllowed: false;
  queueMutationAllowed: false;
};

export function buildRenderJobStatusPollingStableKey(
  ...parts: Array<string | number | null | undefined>
): string {
  return parts
    .map((part) =>
      String(part ?? "empty")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._-]+/g, "-")
    )
    .filter(Boolean)
    .join(":");
}
