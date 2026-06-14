import type {
  DailyBetaReleaseSignoffReview,
  DailyBetaReleaseSignoffReviewBoundary,
  DailyBetaReleaseSignoffReviewModel,
} from "./daily-beta-release-signoff-review-types";
import { buildDailyBetaReleaseSignoffReviewStableKey } from "./daily-beta-release-signoff-review-types";

export const DAILY_BETA_RELEASE_SIGNOFF_REVIEW_LANGUAGE = [
  "Daily Beta release signoff review",
  "Daily Beta release signoff review does not approve release",
  "Release signoff requires explicit operator approval",
  "Unresolved release signoff blockers stay blocked",
  "Signoff groups",
  "Controlled live capability status",
] as const;

export function buildDailyBetaReleaseSignoffReview(
  input: Omit<DailyBetaReleaseSignoffReview, "id"> & { idHint: string }
): DailyBetaReleaseSignoffReview {
  const { idHint, ...review } = input;
  return {
    id: buildDailyBetaReleaseSignoffReviewStableKey(
      "daily-beta-release-signoff-review",
      idHint,
      input.status
    ),
    ...review,
  };
}

export function buildDailyBetaReleaseSignoffReviews(): DailyBetaReleaseSignoffReview[] {
  return [
    buildDailyBetaReleaseSignoffReview({
      idHint: "daily-beta-release-signoff",
      status: "blocked",
      dailyBetaReleaseSignoffIdentity:
        "Daily Beta release signoff identity: daily-beta-release-signoff-review-daily-beta-release-signoff.",
      signoffGroups: [
        "Signoff groups: hardening review, documentation review, onboarding review, controlled live capability, evidence readiness, result readiness, and recovery readiness.",
      ],
      hardeningDocsOnboardingStatus: [
        "Hardening/docs/onboarding status: each upstream final review must remain visible and blocked until explicit operator approval exists.",
      ],
      controlledLiveCapabilityStatus: [
        "Controlled live capability status: live capability signoff is a reviewed input, not an automatic approval or go-live trigger.",
      ],
      approvalEvidenceResultRecoveryReadinessChecklist: [
        "Approval/evidence/result/recovery readiness checklist: approval owner, evidence packet, result owner, recovery owner, rollback path, and operator escalation path must be complete.",
      ],
      deniedSignoffShortcuts: [
        "Denied signoff shortcuts: approve release, persist signoff decisions, go live, launch Daily Beta 1, execute workflows, call providers, call connectors, create automations, or store outputs.",
      ],
      unresolvedReleaseSignoffBlockers: [
        "Unresolved release signoff blockers: missing approval owner, unresolved hardening blocker, stale documentation language, incomplete onboarding handoff, and missing rollback evidence.",
      ],
      dailyBetaOneCandidateRoute:
        "Daily Beta 1 candidate route: /codexforge-daily-beta-1-candidate summarizes Daily Beta 1 readiness without going live.",
      dailyBetaOneRolloutPlanRoute:
        "Daily Beta 1 rollout plan route: /daily-beta-1-controlled-rollout-plan plans controlled rollout steps without executing rollout.",
      nextRecommendedAction:
        "Next recommended action: keep release signoff blocked until every hardening, documentation, onboarding, live capability, evidence, result, and recovery owner approves outside this page.",
      advancedSignoffDetails:
        "Advanced signoff details: Daily Beta release signoff review is review-only. Daily Beta release signoff review does not approve release, release signoff requires explicit operator approval, and unresolved release signoff blockers stay blocked. It does not persist signoff decisions, go live, launch Daily Beta 1, execute workflows, call providers, call local models, call connectors, create automations, store outputs, or create an MCP runtime.",
    }),
  ];
}

export function buildDailyBetaReleaseSignoffReviewBoundary(): DailyBetaReleaseSignoffReviewBoundary {
  return {
    reviewOnly: true,
    approvalRequired: true,
    dailyBetaReleaseSignoffReviewDoesNotApproveRelease: true,
    releaseSignoffRequiresExplicitOperatorApproval: true,
    unresolvedReleaseSignoffBlockersStayBlocked: true,
    releaseApprovalAllowedFromUi: false,
    releaseSignoffAutomationAllowedFromUi: false,
    releaseSignoffDecisionPersistenceAllowedFromUi: false,
    goLiveAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    outputStorageAllowed: false,
  };
}

export function summarizeDailyBetaReleaseSignoffReview(
  model: Pick<DailyBetaReleaseSignoffReviewModel, "reviews">
): string {
  return `Daily Beta release signoff review reviews ${model.reviews.length} signoff posture without approving release. Release signoff requires explicit operator approval, and unresolved release signoff blockers stay blocked.`;
}

export function buildDailyBetaReleaseSignoffReviewModel(): DailyBetaReleaseSignoffReviewModel {
  const reviews = buildDailyBetaReleaseSignoffReviews();
  const model: DailyBetaReleaseSignoffReviewModel = {
    title: "Daily Beta release signoff review",
    summary: "",
    reviews,
    boundary: buildDailyBetaReleaseSignoffReviewBoundary(),
    signoffLanguage: [...DAILY_BETA_RELEASE_SIGNOFF_REVIEW_LANGUAGE],
    advancedDetails: [
      "Daily Beta release signoff review",
      "Daily Beta release signoff identity",
      "Signoff groups",
      "Hardening/docs/onboarding status",
      "Controlled live capability status",
      "Approval/evidence/result/recovery readiness checklist",
      "Denied signoff shortcuts",
      "Unresolved release signoff blockers",
      "Daily Beta 1 candidate route",
      "Daily Beta 1 rollout plan route",
      "Next recommended action",
      "Daily Beta release signoff review does not approve release",
      "Release signoff requires explicit operator approval",
      "Unresolved release signoff blockers stay blocked",
      "advanced signoff details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeDailyBetaReleaseSignoffReview(model) };
}
