import type { LaunchRollbackPlanReview, LaunchRollbackPlanReviewBoundary, LaunchRollbackPlanReviewModel } from "./launch-rollback-plan-review-types";
import { buildLaunchRollbackPlanReviewStableKey } from "./launch-rollback-plan-review-types";

export const LAUNCH_ROLLBACK_PLAN_REVIEW_LANGUAGE = [
  "Launch rollback plan review",
  "Launch rollback plan review does not trigger rollback",
  "Rollback actions require explicit operator approval",
  "Unsafe rollback shortcuts stay blocked",
  "Rollback groups",
  "Stop condition checklist",
] as const;

const LAUNCH_ROLLBACK_PLAN_REVIEW_SAFETY_DETAILS = [
  "no rollback trigger",
  "no workflow execution",
  "no file mutation",
  "no Daily Beta 1 launch execution",
  "no controlled launch execution",
  "no launch approval automation",
  "no go/no-go auto-pass",
  "no approval packet send behavior",
  "no monitoring job creation",
  "no support runbook publish/send behavior",
  "no Minecraft/project/server build execution yet",
  "no copyrighted franchise asset/name/logo/map/dialogue/music copying",
  "actual server/build/project execution still requires approved execution boundaries",
] as const;

export function buildLaunchRollbackPlanReview(input: Omit<LaunchRollbackPlanReview, "id"> & { idHint: string }): LaunchRollbackPlanReview {
  const { idHint, ...launchRollbackPlanReview } = input;
  return { id: buildLaunchRollbackPlanReviewStableKey("launch-rollback-plan-review", idHint, input.status), ...launchRollbackPlanReview };
}

export function buildLaunchRollbackPlanReviews(): LaunchRollbackPlanReview[] {
  return [
    buildLaunchRollbackPlanReview({
      idHint: "daily-beta-1-launch-rollback-plan-review",
      status: "blocked",
      launchRollbackPlanIdentity: "Launch rollback plan identity: daily-beta-1-launch-rollback-plan-review reviews rollback paths without triggering them.",
      rollbackGroups: [
        "Rollback groups: stop conditions, rollback actions, escalation owners, evidence/logging, denied rollback actions, unresolved blockers, monitoring route, support route, and next recommended action.",
        "Rollback groups stay review-only; the page does not execute workflows, mutate files, or trigger rollback.",
      ],
      stopConditionChecklist: [
        "Stop condition checklist: operator-owned stop criteria, launch boundary breaches, monitoring concerns, support escalation, output retention, and credential handling must be reviewed before any controlled launch.",
        "Stop condition checklist keeps unsafe rollback shortcuts blocked until explicit operator approval exists.",
      ],
      rollbackActionChecklist: [
        "Rollback action checklist: rollback actions are described as manual review requirements, not executable UI controls.",
        "Rollback action checklist does not run shell, git, test, build, smoke, file write, provider, local model, connector, or automation actions.",
      ],
      escalationChecklist: [
        "Escalation checklist: unresolved rollback blockers must be escalated to the operator and support owner before launch can proceed.",
        "Escalation checklist does not send notifications or create background jobs.",
      ],
      evidenceLoggingChecklist: [
        "Evidence/logging checklist: rollback evidence stays review-only and is not ingested, persisted, exported, or sent from this UI.",
        "Evidence/logging checklist keeps launch audit data approval-gated.",
      ],
      deniedRollbackActions: [
        "Denied rollback actions: trigger rollback, execute workflows, mutate files, run commands, call providers, call local models, call connectors, create automations, start monitoring jobs, send notifications, persist approval decisions, store outputs, or store credentials.",
      ],
      unresolvedRollbackBlockers: [
        "Unresolved rollback blockers stay blocked: missing stop conditions, missing rollback owner approval, missing evidence logging policy, missing monitoring owner, missing support owner, and missing approved execution boundaries.",
      ],
      monitoringPlanRoute: "Monitoring plan route: /launch-monitoring-plan-review reviews monitoring requirements without starting jobs.",
      supportRunbookRoute: "Support runbook route: /launch-support-runbook-review reviews support guidance without publishing or sending it.",
      nextRecommendedAction: "Next recommended action: keep rollback actions blocked, review monitoring and support plans, and require explicit operator approval before any rollback-capable path exists.",
      advancedLaunchRollbackPlanReviewDetails: `Advanced launch rollback plan review details: ${LAUNCH_ROLLBACK_PLAN_REVIEW_SAFETY_DETAILS.join("; ")}; no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation/launch data sending without approval.`,
    }),
  ];
}

export function buildLaunchRollbackPlanReviewBoundary(): LaunchRollbackPlanReviewBoundary {
  return { reviewOnly: true, approvalRequired: true, rollbackTriggerAllowedFromUi: false, workflowExecutionAllowedFromUi: false, fileMutationAllowedFromUi: false, providerApiCallsAllowedFromUi: false, localModelCallsAllowedFromUi: false, connectorApiCallsAllowedFromUi: false, automationCreationAllowedFromUi: false, credentialStorageAllowed: false, outputStorageAllowed: false };
}

export function summarizeLaunchRollbackPlanReview(model: Pick<LaunchRollbackPlanReviewModel, "launchRollbackPlanReviews">): string {
  return "Launch rollback plan review reviews " + model.launchRollbackPlanReviews.length + " rollback plan without triggering rollback. Rollback actions require explicit operator approval, and unsafe rollback shortcuts stay blocked.";
}

export function buildLaunchRollbackPlanReviewModel(): LaunchRollbackPlanReviewModel {
  const launchRollbackPlanReviews = buildLaunchRollbackPlanReviews();
  const model: LaunchRollbackPlanReviewModel = {
    title: "Launch rollback plan review",
    summary: "",
    launchRollbackPlanReviews,
    boundary: buildLaunchRollbackPlanReviewBoundary(),
    language: [...LAUNCH_ROLLBACK_PLAN_REVIEW_LANGUAGE],
    advancedDetails: [
      "Launch rollback plan review",
      "Launch rollback plan identity",
      "Rollback groups",
      "Stop condition checklist",
      "Rollback action checklist",
      "Escalation checklist",
      "Evidence logging checklist",
      "Denied rollback actions",
      "Unresolved rollback blockers",
      "Monitoring plan route",
      "Support runbook route",
      "Next recommended action",
      "Launch rollback plan review does not trigger rollback",
      "Rollback actions require explicit operator approval",
      "Unsafe rollback shortcuts stay blocked",
      "advanced launch rollback plan review details collapsed/secondary",
      ...LAUNCH_ROLLBACK_PLAN_REVIEW_SAFETY_DETAILS,
    ],
  };
  return { ...model, summary: summarizeLaunchRollbackPlanReview(model) };
}
