import type { RecoveryRetryBoundary, RecoveryRetryBoundaryBoundary, RecoveryRetryBoundaryModel } from "./recovery-retry-boundary-types";
import { buildRecoveryRetryBoundaryStableKey } from "./recovery-retry-boundary-types";
import { buildUniversalExecutionReviewBoundary, UNIVERSAL_EXECUTION_REVIEW_SAFETY_MARKERS } from "../universal-execution-review-kit";

export const RECOVERY_RETRY_BOUNDARY_LANGUAGE = [
  "Recovery retry boundary",
  "Recovery/retry boundary does not trigger recovery or retry",
  "Recovery/retry actions require explicit operator approval",
  "Unsafe recovery shortcuts stay blocked",
  "Recovery groups",
  "Retry checklist",
] as const;

export function buildRecoveryRetryBoundary(input: Omit<RecoveryRetryBoundary, "id"> & { idHint: string }): RecoveryRetryBoundary {
  const { idHint, ...boundary } = input;
  return { id: buildRecoveryRetryBoundaryStableKey("recovery-retry-boundary", idHint, input.status), ...boundary };
}

export function buildRecoveryRetryBoundaries(): RecoveryRetryBoundary[] {
  return [
    buildRecoveryRetryBoundary({
      idHint: "recovery-retry-boundary",
      status: "blocked",
      identity: "Recovery/retry boundary identity: recovery-retry-boundary reviews retry, rollback, escalation, and operator decision options without triggering recovery, retry, rollback, or workflows.",
      sections: [
        { label: "Recovery groups", items: ["Recovery groups: provider retry, command retry, file rollback, connector recovery, automation pause, runtime stop, result rejection, export correction, and handoff escalation stay review-only."] },
        { label: "Retry checklist", items: ["Retry checklist: retry reason, changed input, limit, cooldown, cost, evidence, stop condition, and approval status must be visible before a future retry."] },
        { label: "Rollback checklist", items: ["Rollback checklist: rollback target, file diff, command plan, runtime stop, data retention, evidence link, and approval owner must be reviewed before rollback."] },
        { label: "Escalation checklist", items: ["Escalation checklist: blocked owner, manual handoff, severity, safety posture, support route, and no automatic notification sending from UI."] },
        { label: "Operator decision checklist", items: ["Operator decision checklist: retry, reject, rollback, pause, escalate, package, or abandon decisions require explicit operator approval and are not persisted automatically."] },
        { label: "Denied recovery actions", items: ["Denied recovery actions: trigger retry, rollback files, rerun commands, restart runtimes, call providers/connectors, create automations, execute workflows, or apply fixes from UI."] },
        { label: "Unresolved recovery blockers", items: ["Unresolved recovery blockers: missing failure evidence, missing rollback plan, missing retry limit, missing owner, missing packaging/export route, and missing workflow profile route keep unsafe recovery shortcuts blocked."] },
      ],
      routes: ["/packaging-export-boundary", "/workflow-profile-registry", "/universal-execution-boundary-inventory"],
      nextRecommendedAction: "Next recommended action: keep retry and recovery blocked, review the failure packet, then choose package/export or profile revision only after explicit operator approval.",
      advancedDetails: `Advanced recovery/retry boundary details: Recovery/retry boundary does not trigger recovery or retry. Recovery/retry actions require explicit operator approval. Unsafe recovery shortcuts stay blocked. ${UNIVERSAL_EXECUTION_REVIEW_SAFETY_MARKERS.join("; ")}.`,
    }),
  ];
}

export function buildRecoveryRetryBoundaryBoundary(): RecoveryRetryBoundaryBoundary {
  return buildUniversalExecutionReviewBoundary();
}

export function summarizeRecoveryRetryBoundary(model: Pick<RecoveryRetryBoundaryModel, "recoveryRetryBoundaries">): string {
  return "Recovery/retry boundary reviews " + model.recoveryRetryBoundaries.length + " recovery boundary packet without triggering recovery or retry. Recovery/retry actions require explicit operator approval, and unsafe recovery shortcuts stay blocked.";
}

export function buildRecoveryRetryBoundaryModel(): RecoveryRetryBoundaryModel {
  const recoveryRetryBoundaries = buildRecoveryRetryBoundaries();
  const model: RecoveryRetryBoundaryModel = {
    title: "Recovery retry boundary",
    summary: "",
    reviewPackets: recoveryRetryBoundaries,
    recoveryRetryBoundaries,
    boundary: buildRecoveryRetryBoundaryBoundary(),
    language: [...RECOVERY_RETRY_BOUNDARY_LANGUAGE],
    advancedDetails: [
      "Recovery/retry boundary identity",
      "Recovery groups",
      "Retry checklist",
      "Rollback checklist",
      "Escalation checklist",
      "Operator decision checklist",
      "Denied recovery actions",
      "Unresolved recovery blockers",
      "Packaging/export boundary route",
      "Workflow profile registry route",
      "Next recommended action",
      "advanced recovery/retry boundary details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizeRecoveryRetryBoundary(model) };
}
