import type {
  RenderQueueRecoveryRetryItem,
  RenderQueueRecoveryRetryItemId,
  RenderQueueRecoveryRetryModel,
} from "./render-queue-recovery-retry-types";

const ITEM_COPY: Record<RenderQueueRecoveryRetryItemId, string> = {
  "failure summary":
    "Failure summary explains what happened in plain English without exposing secrets or raw logs above the fold.",
  "likely cause category":
    "Likely cause category can be missing model, missing node, out of memory, timeout, artifact missing, or unknown.",
  "safe recovery checklist":
    "Safe recovery checklist reviews health, package, settings, artifacts, and approval before retry is discussed.",
  "retry eligibility":
    "Retry eligibility is reviewed explicitly and never means an automatic retry.",
  "blocked retry reasons":
    "Blocked retry reasons include missing approval, unhealthy bridge, unsafe package, missing artifact capture, or unclear failure.",
  "required user approval":
    "Explicit approval required before retry means the operator must review and approve a retry request first.",
  "artifact retention rule":
    "Failed artifacts are retained; recovery does not delete failed outputs or evidence.",
  "review inbox handoff":
    "Review inbox handoff keeps the failed result visible for human review before reuse or retry.",
  "next recommended route":
    "Next recommended route sends the operator to status, review, or capture instead of silently changing the queue.",
};

export function buildRenderQueueRecoveryRetryItem(
  id: RenderQueueRecoveryRetryItemId
): RenderQueueRecoveryRetryItem {
  return {
    id,
    label: id,
    plainEnglish: ITEM_COPY[id],
    automaticRetryAllowed: false,
  };
}

export function buildRenderQueueRecoveryRetryItems(): RenderQueueRecoveryRetryItem[] {
  return (Object.keys(ITEM_COPY) as RenderQueueRecoveryRetryItemId[]).map(
    buildRenderQueueRecoveryRetryItem
  );
}

export function buildRenderQueueRecoveryRetryModel(): RenderQueueRecoveryRetryModel {
  const model: RenderQueueRecoveryRetryModel = {
    title: "Render queue recovery and retry",
    summary: "",
    items: buildRenderQueueRecoveryRetryItems(),
    rules: {
      automaticRetryAllowed: false,
      silentQueueMutationAllowed: false,
      cloudFallbackAllowed: false,
      failedArtifactDeletionAllowed: false,
      promptOrFileUploadAllowed: false,
      explicitApprovalRequired: true,
    },
    nextRecommendedRoute: "/render-job-status",
    reviewInboxHandoff: "Review inbox handoff",
  };

  return { ...model, summary: summarizeRenderQueueRecoveryRetry(model) };
}

export function summarizeRenderQueueRecoveryRetry(
  model: RenderQueueRecoveryRetryModel
): string {
  return `${model.title}: Retry is never automatic. Explicit approval required before retry. No cloud fallback. Failed artifacts are retained. ${model.reviewInboxHandoff}.`;
}
