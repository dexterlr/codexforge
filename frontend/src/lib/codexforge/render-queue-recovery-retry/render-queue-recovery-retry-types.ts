export type RenderQueueRecoveryRetryItemId =
  | "failure summary"
  | "likely cause category"
  | "safe recovery checklist"
  | "retry eligibility"
  | "blocked retry reasons"
  | "required user approval"
  | "artifact retention rule"
  | "review inbox handoff"
  | "next recommended route";

export type RenderQueueRecoveryRetryItem = {
  id: RenderQueueRecoveryRetryItemId;
  label: string;
  plainEnglish: string;
  automaticRetryAllowed: false;
};

export type RenderQueueRecoveryRetryRules = {
  automaticRetryAllowed: false;
  silentQueueMutationAllowed: false;
  cloudFallbackAllowed: false;
  failedArtifactDeletionAllowed: false;
  promptOrFileUploadAllowed: false;
  explicitApprovalRequired: true;
};

export type RenderQueueRecoveryRetryModel = {
  title: "Render queue recovery and retry";
  summary: string;
  items: RenderQueueRecoveryRetryItem[];
  rules: RenderQueueRecoveryRetryRules;
  nextRecommendedRoute: "/render-job-status" | "/video-review" | "/local-output-capture";
  reviewInboxHandoff: string;
};

export function buildRenderQueueRecoveryRetryStableKey(
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
