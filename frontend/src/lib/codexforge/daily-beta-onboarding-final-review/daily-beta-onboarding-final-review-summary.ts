import type {
  DailyBetaOnboardingFinalReview,
  DailyBetaOnboardingFinalReviewBoundary,
  DailyBetaOnboardingFinalReviewModel,
} from "./daily-beta-onboarding-final-review-types";
import { buildDailyBetaOnboardingFinalReviewStableKey } from "./daily-beta-onboarding-final-review-types";

export const DAILY_BETA_ONBOARDING_FINAL_REVIEW_LANGUAGE = [
  "Daily Beta onboarding final review",
  "Daily Beta onboarding final review does not launch workflows",
  "Onboarding changes require explicit operator approval",
  "Unresolved Daily Beta onboarding blockers stay blocked",
  "Onboarding groups",
  "Novice operator path checklist",
] as const;

export function buildDailyBetaOnboardingFinalReview(
  input: Omit<DailyBetaOnboardingFinalReview, "id"> & { idHint: string }
): DailyBetaOnboardingFinalReview {
  const { idHint, ...review } = input;
  return {
    id: buildDailyBetaOnboardingFinalReviewStableKey(
      "daily-beta-onboarding-final-review",
      idHint,
      input.status
    ),
    ...review,
  };
}

export function buildDailyBetaOnboardingFinalReviews(): DailyBetaOnboardingFinalReview[] {
  return [
    buildDailyBetaOnboardingFinalReview({
      idHint: "daily-beta-onboarding-readiness",
      status: "blocked",
      dailyBetaOnboardingIdentity:
        "Daily Beta onboarding identity: daily-beta-onboarding-final-review-daily-beta-onboarding-readiness.",
      onboardingGroups: [
        "Onboarding groups: novice path, expert path, safety explanation, handoff guidance, feedback triage, and rollback orientation.",
      ],
      noviceOperatorPathChecklist: [
        "Novice operator path checklist: first task clarity, review-only wording, approval language, blocked action explanation, and next safe route must be visible.",
      ],
      expertOperatorPathChecklist: [
        "Expert operator path checklist: fast scan labels, release owner handoff, rollout limitation, blocker state, and evidence routing must stay clear.",
      ],
      safetyExplanationChecklist: [
        "Safety explanation checklist: onboarding must say this page does not launch workflows, persist preferences, call providers, call connectors, or mutate files or memory.",
      ],
      handoffChecklist: [
        "Handoff checklist: release signoff route, Daily Beta 1 candidate route, hardening route, documentation route, and feedback route must be easy to find.",
      ],
      deniedOnboardingShortcuts: [
        "Denied onboarding shortcuts: launch workflows, persist settings, persist preferences, approve release, go live, create automations, send notifications, or auto-ingest feedback.",
      ],
      unresolvedOnboardingBlockers: [
        "Unresolved onboarding blockers: unclear novice route, missing expert handoff, stale safety copy, missing rollback owner, and missing approval reminder.",
      ],
      releaseSignoffRoute:
        "Release signoff route: /daily-beta-release-signoff-review reviews release signoff without approving release.",
      dailyBetaOneCandidateRoute:
        "Daily Beta 1 candidate route: /codexforge-daily-beta-1-candidate summarizes Daily Beta 1 readiness without going live.",
      nextRecommendedAction:
        "Next recommended action: keep onboarding blocked until novice, expert, safety, and handoff checklists are reviewed outside this page.",
      advancedOnboardingDetails:
        "Advanced onboarding details: Daily Beta onboarding final review is review-only. Daily Beta onboarding final review does not launch workflows, onboarding changes require explicit operator approval, and unresolved Daily Beta onboarding blockers stay blocked. It does not persist settings, persist preferences, mutate files, mutate memory, execute workflows, call providers, call local models, call connectors, create automations, or create an MCP runtime.",
    }),
  ];
}

export function buildDailyBetaOnboardingFinalReviewBoundary(): DailyBetaOnboardingFinalReviewBoundary {
  return {
    reviewOnly: true,
    approvalRequired: true,
    dailyBetaOnboardingFinalReviewDoesNotLaunchWorkflows: true,
    onboardingChangesRequireExplicitOperatorApproval: true,
    unresolvedDailyBetaOnboardingBlockersStayBlocked: true,
    onboardingLaunchAllowedFromUi: false,
    settingsPersistenceAllowedFromUi: false,
    preferencePersistenceAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    memoryMutationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
  };
}

export function summarizeDailyBetaOnboardingFinalReview(
  model: Pick<DailyBetaOnboardingFinalReviewModel, "reviews">
): string {
  return `Daily Beta onboarding final review reviews ${model.reviews.length} onboarding posture without launching workflows. Onboarding changes require explicit operator approval, and unresolved Daily Beta onboarding blockers stay blocked.`;
}

export function buildDailyBetaOnboardingFinalReviewModel(): DailyBetaOnboardingFinalReviewModel {
  const reviews = buildDailyBetaOnboardingFinalReviews();
  const model: DailyBetaOnboardingFinalReviewModel = {
    title: "Daily Beta onboarding final review",
    summary: "",
    reviews,
    boundary: buildDailyBetaOnboardingFinalReviewBoundary(),
    onboardingLanguage: [...DAILY_BETA_ONBOARDING_FINAL_REVIEW_LANGUAGE],
    advancedDetails: [
      "Daily Beta onboarding final review",
      "Daily Beta onboarding identity",
      "Onboarding groups",
      "Novice operator path checklist",
      "Expert operator path checklist",
      "Safety explanation checklist",
      "Handoff checklist",
      "Denied onboarding shortcuts",
      "Unresolved onboarding blockers",
      "Release signoff route",
      "Daily Beta 1 candidate route",
      "Next recommended action",
      "Daily Beta onboarding final review does not launch workflows",
      "Onboarding changes require explicit operator approval",
      "Unresolved Daily Beta onboarding blockers stay blocked",
      "advanced onboarding details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeDailyBetaOnboardingFinalReview(model) };
}
