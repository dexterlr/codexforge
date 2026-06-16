import type { LaunchMonitoringPlanReview, LaunchMonitoringPlanReviewBoundary, LaunchMonitoringPlanReviewModel } from "./launch-monitoring-plan-review-types";
import { buildLaunchMonitoringPlanReviewStableKey } from "./launch-monitoring-plan-review-types";

export const LAUNCH_MONITORING_PLAN_REVIEW_LANGUAGE = [
  "Launch monitoring plan review",
  "Launch monitoring plan review does not start monitoring jobs",
  "Monitoring setup requires explicit operator approval",
  "Unresolved monitoring blockers stay blocked",
  "Monitoring groups",
  "Operator review cadence checklist",
] as const;

const LAUNCH_MONITORING_PLAN_REVIEW_SAFETY_DETAILS = [
  "no monitoring job creation",
  "no polling loop creation",
  "no notification sending",
  "no Daily Beta 1 launch execution",
  "no controlled launch execution",
  "no launch approval automation",
  "no go/no-go auto-pass",
  "no approval packet send behavior",
  "no rollback trigger",
  "no support runbook publish/send behavior",
  "no Minecraft/project/server build execution yet",
  "no copyrighted franchise asset/name/logo/map/dialogue/music copying",
  "actual server/build/project execution still requires approved execution boundaries",
] as const;

export function buildLaunchMonitoringPlanReview(input: Omit<LaunchMonitoringPlanReview, "id"> & { idHint: string }): LaunchMonitoringPlanReview {
  const { idHint, ...launchMonitoringPlanReview } = input;
  return { id: buildLaunchMonitoringPlanReviewStableKey("launch-monitoring-plan-review", idHint, input.status), ...launchMonitoringPlanReview };
}

export function buildLaunchMonitoringPlanReviews(): LaunchMonitoringPlanReview[] {
  return [
    buildLaunchMonitoringPlanReview({
      idHint: "daily-beta-1-launch-monitoring-plan-review",
      status: "blocked",
      launchMonitoringPlanIdentity: "Launch monitoring plan identity: daily-beta-1-launch-monitoring-plan-review reviews monitoring requirements without starting jobs.",
      monitoringGroups: [
        "Monitoring groups: evidence/logging, alerts/notifications, operator review cadence, privacy/redaction, denied monitoring actions, unresolved blockers, support route, go/no-go candidate route, and next recommended action.",
        "Monitoring groups stay review-only; this page does not start monitoring jobs, create polling loops, send notifications, or create background jobs.",
      ],
      evidenceLoggingChecklist: [
        "Evidence/logging checklist: monitoring evidence remains review-only and is not ingested, persisted, exported, or sent by this UI.",
        "Evidence/logging checklist keeps audit and launch data approval-gated.",
      ],
      alertNotificationChecklist: [
        "Alert/notification checklist: alert rules and notifications require explicit operator approval and are not created here.",
        "Alert/notification checklist avoids notification sending, polling loops, schedules, watches, and background jobs.",
      ],
      operatorReviewCadenceChecklist: [
        "Operator review cadence checklist: review timing, owner coverage, escalation thresholds, and rollback handoff remain planning-only.",
        "Operator review cadence checklist does not schedule tasks, reminders, or conditional watches.",
      ],
      privacyRedactionChecklist: [
        "Privacy/redaction checklist: monitoring data must be redacted and approved before any external or persistent handling.",
        "Privacy/redaction checklist does not store credentials, endpoints, tokens, provider outputs, connector data, or local model outputs.",
      ],
      deniedMonitoringActions: [
        "Denied monitoring actions: start monitoring jobs, create polling loops, send notifications, create background jobs, create automations, schedule tasks, create reminders, create conditional watches, fetch connector data, call providers, call local models, call connectors, store outputs, or store credentials.",
      ],
      unresolvedMonitoringBlockers: [
        "Unresolved monitoring blockers stay blocked: missing monitoring owner, missing evidence policy, missing alert approval, missing privacy/redaction approval, missing review cadence, and missing approved execution boundaries.",
      ],
      supportRunbookRoute: "Support runbook route: /launch-support-runbook-review reviews support guidance without publishing or sending it.",
      goNoGoCandidateRoute: "Go/no-go candidate route: /codexforge-daily-beta-1-go-no-go-candidate summarizes readiness without making the decision.",
      nextRecommendedAction: "Next recommended action: keep monitoring setup blocked, finish support runbook review, then review the Daily Beta 1 go/no-go candidate.",
      advancedLaunchMonitoringPlanReviewDetails: `Advanced launch monitoring plan review details: ${LAUNCH_MONITORING_PLAN_REVIEW_SAFETY_DETAILS.join("; ")}; no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation/launch data sending without approval.`,
    }),
  ];
}

export function buildLaunchMonitoringPlanReviewBoundary(): LaunchMonitoringPlanReviewBoundary {
  return { reviewOnly: true, approvalRequired: true, monitoringJobCreationAllowedFromUi: false, pollingLoopAllowedFromUi: false, notificationSendingAllowedFromUi: false, providerApiCallsAllowedFromUi: false, localModelCallsAllowedFromUi: false, connectorApiCallsAllowedFromUi: false, automationCreationAllowedFromUi: false, fileMutationAllowedFromUi: false, credentialStorageAllowed: false, outputStorageAllowed: false };
}

export function summarizeLaunchMonitoringPlanReview(model: Pick<LaunchMonitoringPlanReviewModel, "launchMonitoringPlanReviews">): string {
  return "Launch monitoring plan review reviews " + model.launchMonitoringPlanReviews.length + " monitoring plan without starting monitoring jobs. Monitoring setup requires explicit operator approval, and unresolved monitoring blockers stay blocked.";
}

export function buildLaunchMonitoringPlanReviewModel(): LaunchMonitoringPlanReviewModel {
  const launchMonitoringPlanReviews = buildLaunchMonitoringPlanReviews();
  const model: LaunchMonitoringPlanReviewModel = {
    title: "Launch monitoring plan review",
    summary: "",
    launchMonitoringPlanReviews,
    boundary: buildLaunchMonitoringPlanReviewBoundary(),
    language: [...LAUNCH_MONITORING_PLAN_REVIEW_LANGUAGE],
    advancedDetails: [
      "Launch monitoring plan review",
      "Launch monitoring plan identity",
      "Monitoring groups",
      "Evidence logging checklist",
      "Alert notification checklist",
      "Operator review cadence checklist",
      "Privacy redaction checklist",
      "Denied monitoring actions",
      "Unresolved monitoring blockers",
      "Support runbook route",
      "Go/no-go candidate route",
      "Next recommended action",
      "Launch monitoring plan review does not start monitoring jobs",
      "Monitoring setup requires explicit operator approval",
      "Unresolved monitoring blockers stay blocked",
      "advanced launch monitoring plan review details collapsed/secondary",
      ...LAUNCH_MONITORING_PLAN_REVIEW_SAFETY_DETAILS,
    ],
  };
  return { ...model, summary: summarizeLaunchMonitoringPlanReview(model) };
}
