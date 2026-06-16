import type { LaunchSupportRunbookReview, LaunchSupportRunbookReviewBoundary, LaunchSupportRunbookReviewModel } from "./launch-support-runbook-review-types";
import { buildLaunchSupportRunbookReviewStableKey } from "./launch-support-runbook-review-types";

export const LAUNCH_SUPPORT_RUNBOOK_REVIEW_LANGUAGE = [
  "Launch support runbook review",
  "Launch support runbook review does not publish or send support guidance",
  "Support runbook changes require explicit operator approval",
  "Unresolved support blockers stay blocked",
  "Support runbook groups",
  "Known limitation checklist",
] as const;

const LAUNCH_SUPPORT_RUNBOOK_REVIEW_SAFETY_DETAILS = [
  "no support runbook publish/send behavior",
  "no handoff send behavior",
  "no file mutation",
  "no Daily Beta 1 launch execution",
  "no controlled launch execution",
  "no launch approval automation",
  "no go/no-go auto-pass",
  "no approval packet send behavior",
  "no rollback trigger",
  "no monitoring job creation",
  "no Minecraft/project/server build execution yet",
  "no copyrighted franchise asset/name/logo/map/dialogue/music copying",
  "actual server/build/project execution still requires approved execution boundaries",
] as const;

export function buildLaunchSupportRunbookReview(input: Omit<LaunchSupportRunbookReview, "id"> & { idHint: string }): LaunchSupportRunbookReview {
  const { idHint, ...launchSupportRunbookReview } = input;
  return { id: buildLaunchSupportRunbookReviewStableKey("launch-support-runbook-review", idHint, input.status), ...launchSupportRunbookReview };
}

export function buildLaunchSupportRunbookReviews(): LaunchSupportRunbookReview[] {
  return [
    buildLaunchSupportRunbookReview({
      idHint: "daily-beta-1-launch-support-runbook-review",
      status: "blocked",
      launchSupportRunbookIdentity: "Launch support runbook identity: daily-beta-1-launch-support-runbook-review reviews support guidance without publishing or sending it.",
      supportRunbookGroups: [
        "Support runbook groups: operator support, known limitations, recovery/rollback, escalation, denied support actions, unresolved blockers, go/no-go candidate route, first controlled launch plan route, and next recommended action.",
        "Support runbook groups stay review-only; this page does not publish, send, export, or mutate files from UI.",
      ],
      operatorSupportChecklist: [
        "Operator support checklist: owner coverage, escalation hours, expected manual checks, rollback contact, monitoring contact, and evidence handling must be approved outside this page.",
        "Operator support checklist does not create reminders, scheduled tasks, notifications, or automations.",
      ],
      knownLimitationChecklist: [
        "Known limitation checklist: actual server/build/project execution still requires approved execution boundaries and is not implemented by this launch governance route.",
        "Known limitation checklist: example outcomes such as an original medieval fantasy server inspired by ice, fire, castles, houses, and kingdoms remain planning-only here.",
      ],
      recoveryRollbackChecklist: [
        "Recovery/rollback checklist: recovery and rollback instructions stay review-only and do not trigger recovery, rollback, workflows, commands, or file mutation.",
        "Recovery/rollback checklist keeps unsafe shortcuts blocked until explicit operator approval exists.",
      ],
      escalationChecklist: [
        "Escalation checklist: unresolved support blockers stay blocked and must be reviewed by the operator before launch can proceed.",
        "Escalation checklist does not send support handoff, notifications, or packets.",
      ],
      deniedSupportRunbookActions: [
        "Denied support runbook actions: publish runbook, send support guidance, send handoff, mutate files from UI, export files automatically, launch Daily Beta 1, execute controlled launch, trigger rollback, start monitoring jobs, create automations, call providers, call local models, call connectors, store outputs, or store credentials.",
      ],
      unresolvedSupportBlockers: [
        "Unresolved support blockers stay blocked: missing support owner approval, missing limitation review, missing rollback owner, missing escalation path, missing monitoring handoff, and missing approved execution boundaries.",
      ],
      goNoGoCandidateRoute: "Go/no-go candidate route: /codexforge-daily-beta-1-go-no-go-candidate summarizes readiness without making the decision.",
      firstControlledLaunchPlanRoute: "First controlled launch plan route: /first-controlled-launch-plan plans the first controlled launch without executing it.",
      nextRecommendedAction: "Next recommended action: keep support guidance unpublished, review the go/no-go candidate, and keep first controlled launch execution blocked until approved boundaries exist.",
      advancedLaunchSupportRunbookReviewDetails: `Advanced launch support runbook review details: ${LAUNCH_SUPPORT_RUNBOOK_REVIEW_SAFETY_DETAILS.join("; ")}; no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation/launch data sending without approval.`,
    }),
  ];
}

export function buildLaunchSupportRunbookReviewBoundary(): LaunchSupportRunbookReviewBoundary {
  return { reviewOnly: true, approvalRequired: true, supportRunbookPublishAllowedFromUi: false, handoffSendAllowedFromUi: false, fileMutationAllowedFromUi: false, providerApiCallsAllowedFromUi: false, localModelCallsAllowedFromUi: false, connectorApiCallsAllowedFromUi: false, automationCreationAllowedFromUi: false, credentialStorageAllowed: false, outputStorageAllowed: false };
}

export function summarizeLaunchSupportRunbookReview(model: Pick<LaunchSupportRunbookReviewModel, "launchSupportRunbookReviews">): string {
  return "Launch support runbook review reviews " + model.launchSupportRunbookReviews.length + " support runbook without publishing or sending support guidance. Support runbook changes require explicit operator approval, and unresolved support blockers stay blocked.";
}

export function buildLaunchSupportRunbookReviewModel(): LaunchSupportRunbookReviewModel {
  const launchSupportRunbookReviews = buildLaunchSupportRunbookReviews();
  const model: LaunchSupportRunbookReviewModel = {
    title: "Launch support runbook review",
    summary: "",
    launchSupportRunbookReviews,
    boundary: buildLaunchSupportRunbookReviewBoundary(),
    language: [...LAUNCH_SUPPORT_RUNBOOK_REVIEW_LANGUAGE],
    advancedDetails: [
      "Launch support runbook review",
      "Launch support runbook identity",
      "Support runbook groups",
      "Operator support checklist",
      "Known limitation checklist",
      "Recovery rollback checklist",
      "Escalation checklist",
      "Denied support runbook actions",
      "Unresolved support blockers",
      "Go/no-go candidate route",
      "First controlled launch plan route",
      "Next recommended action",
      "Launch support runbook review does not publish or send support guidance",
      "Support runbook changes require explicit operator approval",
      "Unresolved support blockers stay blocked",
      "advanced launch support runbook review details collapsed/secondary",
      ...LAUNCH_SUPPORT_RUNBOOK_REVIEW_SAFETY_DETAILS,
    ],
  };
  return { ...model, summary: summarizeLaunchSupportRunbookReview(model) };
}
