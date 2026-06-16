import type { LaunchGoNoGoReview, LaunchGoNoGoReviewBoundary, LaunchGoNoGoReviewModel } from "./launch-go-no-go-review-types";
import { buildLaunchGoNoGoReviewStableKey } from "./launch-go-no-go-review-types";

export const LAUNCH_GO_NO_GO_REVIEW_LANGUAGE = [
  "Launch go/no-go review",
  "Launch go/no-go review does not launch or approve automatically",
  "Go/no-go decisions require explicit operator approval",
  "Unresolved go/no-go blockers stay blocked",
  "Decision groups",
  "No-go criteria checklist",
] as const;

const LAUNCH_GO_NO_GO_REVIEW_SAFETY_DETAILS = [
  "no go/no-go auto-pass",
  "no launch approval automation",
  "no Daily Beta 1 launch execution",
  "no approval decision persistence",
  "no approval packet send behavior",
  "no rollback trigger",
  "no monitoring job creation",
  "no support runbook publish/send behavior",
  "no controlled launch execution",
  "no Minecraft/project/server build execution yet",
  "no copyrighted franchise asset/name/logo/map/dialogue/music copying",
  "actual server/build/project execution still requires approved execution boundaries",
] as const;

export function buildLaunchGoNoGoReview(input: Omit<LaunchGoNoGoReview, "id"> & { idHint: string }): LaunchGoNoGoReview {
  const { idHint, ...launchGoNoGoReview } = input;
  return { id: buildLaunchGoNoGoReviewStableKey("launch-go-no-go-review", idHint, input.status), ...launchGoNoGoReview };
}

export function buildLaunchGoNoGoReviews(): LaunchGoNoGoReview[] {
  return [
    buildLaunchGoNoGoReview({
      idHint: "daily-beta-1-launch-go-no-go-review",
      status: "blocked",
      launchGoNoGoIdentity: "Launch go/no-go identity: daily-beta-1-launch-go-no-go-review reviews the operator decision without making it.",
      decisionGroups: [
        "Decision groups: go criteria, no-go criteria, operator approval, escalation, denied actions, unresolved blockers, rollback route, monitoring route, and next recommended action.",
        "Decision groups stay review-only; the page does not pass, fail, approve, persist, or execute the go/no-go decision automatically.",
      ],
      goCriteriaChecklist: [
        "Go criteria checklist: boundary approvals, readiness evidence, rollback owner, monitoring owner, support owner, credential handling, output retention, and operator decision must be explicitly reviewed.",
        "Go criteria checklist is not a launch button and does not claim the system can execute a full server/build/project workflow yet.",
      ],
      noGoCriteriaChecklist: [
        "No-go criteria checklist: unresolved launch boundary blockers, missing rollback approval, missing monitoring approval, missing support readiness, missing evidence retention policy, or missing execution boundary approval keep launch blocked.",
        "No-go criteria checklist keeps unapproved controlled launch paths blocked.",
      ],
      operatorApprovalChecklist: [
        "Operator approval checklist: go/no-go decisions require explicit operator approval and are not persisted by this UI.",
        "Operator approval checklist keeps Daily Beta 1 unlaunched until a separate approved path exists.",
      ],
      escalationChecklist: [
        "Escalation checklist: unresolved decision blockers must be escalated to the operator, not bypassed by the page.",
        "Escalation checklist does not send notifications, create background jobs, or route live traffic.",
      ],
      deniedGoNoGoActions: [
        "Denied go/no-go actions: launch Daily Beta 1, approve automatically, pass go/no-go, persist approval decisions, send packets, execute workflows, trigger rollback, start monitoring jobs, call providers, call local models, call connectors, create automations, mutate files, or store outputs.",
      ],
      unresolvedDecisionBlockers: [
        "Unresolved go/no-go blockers stay blocked: missing launch boundary approval, missing packet approval, missing rollback plan approval, missing monitoring plan approval, missing support review, and missing approved execution boundaries.",
      ],
      rollbackPlanRoute: "Rollback plan route: /launch-rollback-plan-review reviews rollback paths without triggering rollback.",
      monitoringPlanRoute: "Monitoring plan route: /launch-monitoring-plan-review reviews monitoring requirements without starting jobs.",
      nextRecommendedAction: "Next recommended action: hold the go/no-go decision as blocked until launch boundaries, packet context, rollback, monitoring, and support review are operator-approved.",
      advancedLaunchGoNoGoReviewDetails: `Advanced launch go/no-go review details: ${LAUNCH_GO_NO_GO_REVIEW_SAFETY_DETAILS.join("; ")}; no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation/launch data sending without approval.`,
    }),
  ];
}

export function buildLaunchGoNoGoReviewBoundary(): LaunchGoNoGoReviewBoundary {
  return { reviewOnly: true, approvalRequired: true, launchAllowedFromUi: false, goNoGoAutoPassAllowedFromUi: false, approvalDecisionPersistenceAllowedFromUi: false, workflowExecutionAllowedFromUi: false, providerApiCallsAllowedFromUi: false, localModelCallsAllowedFromUi: false, connectorApiCallsAllowedFromUi: false, automationCreationAllowedFromUi: false, fileMutationAllowedFromUi: false, credentialStorageAllowed: false, outputStorageAllowed: false };
}

export function summarizeLaunchGoNoGoReview(model: Pick<LaunchGoNoGoReviewModel, "launchGoNoGoReviews">): string {
  return "Launch go/no-go review reviews " + model.launchGoNoGoReviews.length + " operator decision packet without launching or approving automatically. Go/no-go decisions require explicit operator approval, and unresolved go/no-go blockers stay blocked.";
}

export function buildLaunchGoNoGoReviewModel(): LaunchGoNoGoReviewModel {
  const launchGoNoGoReviews = buildLaunchGoNoGoReviews();
  const model: LaunchGoNoGoReviewModel = {
    title: "Launch go/no-go review",
    summary: "",
    launchGoNoGoReviews,
    boundary: buildLaunchGoNoGoReviewBoundary(),
    language: [...LAUNCH_GO_NO_GO_REVIEW_LANGUAGE],
    advancedDetails: [
      "Launch go/no-go review",
      "Launch go/no-go identity",
      "Decision groups",
      "Go criteria checklist",
      "No-go criteria checklist",
      "Operator approval checklist",
      "Escalation checklist",
      "Denied go/no-go actions",
      "Unresolved decision blockers",
      "Rollback plan route",
      "Monitoring plan route",
      "Next recommended action",
      "Launch go/no-go review does not launch or approve automatically",
      "Go/no-go decisions require explicit operator approval",
      "Unresolved go/no-go blockers stay blocked",
      "advanced launch go/no-go review details collapsed/secondary",
      ...LAUNCH_GO_NO_GO_REVIEW_SAFETY_DETAILS,
    ],
  };
  return { ...model, summary: summarizeLaunchGoNoGoReview(model) };
}
