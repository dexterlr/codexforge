import type { EndToEndWorkflowRecoveryReview, EndToEndWorkflowRecoveryReviewBoundary, EndToEndWorkflowRecoveryReviewModel } from "./end-to-end-workflow-recovery-review-types";
import { buildEndToEndWorkflowRecoveryReviewStableKey } from "./end-to-end-workflow-recovery-review-types";

export const END_TO_END_WORKFLOW_RECOVERY_REVIEW_LANGUAGE = [
  "End-to-end workflow recovery review",
  "End-to-end workflow recovery review does not trigger recovery",
  "Recovery actions require explicit operator approval",
  "Unsafe end-to-end recovery shortcuts stay blocked",
  "Recovery groups",
  "Failure categories",
] as const;

export function buildEndToEndWorkflowRecoveryReview(input: Omit<EndToEndWorkflowRecoveryReview, "id"> & { idHint: string }): EndToEndWorkflowRecoveryReview {
  const { idHint, ...review } = input;
  return { id: buildEndToEndWorkflowRecoveryReviewStableKey("end-to-end-workflow-recovery-review", idHint, input.status), ...review };
}

export function buildEndToEndWorkflowRecoveryReviews(): EndToEndWorkflowRecoveryReview[] {
  return [
    buildEndToEndWorkflowRecoveryReview({
      idHint: "end-to-end-workflow-recovery-review-packet",
      status: "blocked",
      endToEndWorkflowRecoveryIdentity: "End-to-end workflow recovery identity: end-to-end-workflow-recovery-review-packet.",
      recoveryGroups: [
        "Recovery groups: boundary failure, provider/local/connector failure, automation failure, file patch failure, test failure, evidence mismatch, unsafe result, rollback, and escalation.",
      ],
      failureCategories: [
        "Failure categories: missing approval, denied scope, timeout, redaction failure, output safety failure, patch conflict, test failure, connector privacy risk, and unresolved hardening blocker.",
      ],
      rollbackChecklist: [
        "Rollback checklist: identify last safe state, rejected action, affected boundary, file/memory safety status, operator owner, and blocked automatic rollback path.",
      ],
      escalationChecklist: [
        "Escalation checklist: clarify operator decision, required evidence, risk owner, stop condition, communication route, and no notification sending from this UI.",
      ],
      operatorDecisionChecklist: [
        "Operator decision checklist: recovery actions require explicit operator approval; approve, reject, defer, escalate, or keep blocked outside this page.",
      ],
      deniedRecoveryActions: [
        "Denied recovery actions: trigger recovery, execute workflows, mutate files, apply patches, run commands, persist decisions, store outputs, or clear blockers automatically.",
      ],
      unresolvedRecoveryBlockers: [
        "Unresolved recovery blockers: missing rollback owner, missing escalation path, unresolved unsafe shortcut, missing operator approval, and missing evidence for recovery choice.",
      ],
      endToEndHardeningRoute: "End-to-end hardening route: /end-to-end-workflow-hardening-pass reviews hardening needs without applying changes.",
      releaseCandidateRoute: "Release candidate route: /codexforge-end-to-end-workflow-release-candidate summarizes release-candidate readiness without going live.",
      nextRecommendedAction: "Next recommended action: keep unsafe end-to-end recovery shortcuts blocked until rollback, escalation, operator decision, and evidence are complete outside this page.",
      advancedRecoveryReviewDetails: "Advanced recovery review details: End-to-end workflow recovery review is review-only. End-to-end workflow recovery review does not trigger recovery, recovery actions require explicit operator approval, and unsafe end-to-end recovery shortcuts stay blocked. It does not execute workflows, mutate files, apply patches, run commands, persist decisions, store outputs, mutate memory, call providers, call local models, call connectors, create automations, or create an MCP runtime.",
    }),
  ];
}

export function buildEndToEndWorkflowRecoveryReviewBoundary(): EndToEndWorkflowRecoveryReviewBoundary {
  return { reviewOnly: true, approvalRequired: true, recoveryTriggerAllowedFromUi: false, workflowExecutionAllowedFromUi: false, fileMutationAllowedFromUi: false, patchApplyAllowedFromUi: false, hardeningApplyAllowedFromUi: false, commandExecutionAllowedFromUi: false, approvalDecisionPersistenceAllowedFromUi: false, outputStorageAllowed: false, memoryMutationAllowedFromUi: false, credentialStorageAllowed: false };
}

export function summarizeEndToEndWorkflowRecoveryReview(model: Pick<EndToEndWorkflowRecoveryReviewModel, "recoveryReviews">): string {
  return "End-to-end workflow recovery review summarizes " + model.recoveryReviews.length + " recovery review packet. End-to-end workflow recovery review does not trigger recovery, recovery actions require explicit operator approval, and unsafe end-to-end recovery shortcuts stay blocked.";
}

export function buildEndToEndWorkflowRecoveryReviewModel(): EndToEndWorkflowRecoveryReviewModel {
  const recoveryReviews = buildEndToEndWorkflowRecoveryReviews();
  const model: EndToEndWorkflowRecoveryReviewModel = {
    title: "End-to-end workflow recovery review",
    summary: "",
    recoveryReviews,
    boundary: buildEndToEndWorkflowRecoveryReviewBoundary(),
    language: [...END_TO_END_WORKFLOW_RECOVERY_REVIEW_LANGUAGE],
    advancedDetails: [
      "End-to-end workflow recovery review",
      "End-to-end workflow recovery identity",
      "Recovery groups",
      "Failure categories",
      "Rollback checklist",
      "Escalation checklist",
      "Operator decision checklist",
      "Denied recovery actions",
      "Unresolved recovery blockers",
      "End-to-end hardening route",
      "Release candidate route",
      "Next recommended action",
      "End-to-end workflow recovery review does not trigger recovery",
      "Recovery actions require explicit operator approval",
      "Unsafe end-to-end recovery shortcuts stay blocked",
      "advanced recovery review details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeEndToEndWorkflowRecoveryReview(model) };
}
