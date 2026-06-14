import type {
  CodexForgeDailyBetaOneCandidate,
  CodexForgeDailyBetaOneCandidateBoundary,
  CodexForgeDailyBetaOneCandidateModel,
} from "./codexforge-daily-beta-1-candidate-types";
import { buildCodexForgeDailyBetaOneCandidateStableKey } from "./codexforge-daily-beta-1-candidate-types";

export const CODEXFORGE_DAILY_BETA_ONE_CANDIDATE_LANGUAGE = [
  "CodexForge Daily Beta 1 candidate",
  "CodexForge Daily Beta 1 candidate does not go live",
  "Daily Beta 1 release requires explicit operator approval",
  "Unresolved Daily Beta 1 blockers stay blocked",
  "Daily Beta 1 candidate identity",
  "Daily Beta readiness checklist",
] as const;

export function buildCodexForgeDailyBetaOneCandidate(
  input: Omit<CodexForgeDailyBetaOneCandidate, "id"> & { idHint: string }
): CodexForgeDailyBetaOneCandidate {
  const { idHint, ...candidate } = input;
  return {
    id: buildCodexForgeDailyBetaOneCandidateStableKey(
      "codexforge-daily-beta-1-candidate",
      idHint,
      input.status
    ),
    ...candidate,
  };
}

export function buildCodexForgeDailyBetaOneCandidates(): CodexForgeDailyBetaOneCandidate[] {
  return [
    buildCodexForgeDailyBetaOneCandidate({
      idHint: "daily-beta-1-named-candidate",
      status: "blocked",
      dailyBetaOneCandidateIdentity:
        "Daily Beta 1 candidate identity: codexforge-daily-beta-1-candidate-daily-beta-1-named-candidate.",
      hardeningDocsOnboardingSignoffStatus: [
        "Hardening/docs/onboarding/signoff status: hardening, documentation, onboarding, and release signoff remain blocked until explicit operator approval exists.",
      ],
      multiWorkflowStatus: [
        "Multi-workflow status: operator trial plan, trial review, regression review, and multi-workflow release candidate stay reviewed inputs only.",
      ],
      controlledLiveStatus: [
        "Controlled live status: controlled live capability signoff is visible for review but does not approve live traffic or launch Daily Beta 1.",
      ],
      dailyBetaReadinessChecklist: [
        "Daily Beta readiness checklist: hardening blockers, documentation blockers, onboarding blockers, signoff blockers, rollout plan, rollback owner, and feedback route must be reviewed.",
      ],
      deniedDailyBetaOneActions: [
        "Denied Daily Beta 1 actions: go live, launch Daily Beta 1, execute workflows, persist release settings, call providers, call local models, call connectors, create automations, or store outputs.",
      ],
      unresolvedDailyBetaOneBlockers: [
        "Unresolved Daily Beta 1 blockers: missing explicit release approval, unresolved hardening item, stale documentation blocker, incomplete rollout plan, and missing rollback owner.",
      ],
      dailyBetaOneRolloutPlanRoute:
        "Daily Beta 1 rollout plan route: /daily-beta-1-controlled-rollout-plan plans controlled rollout steps without executing rollout.",
      dailyBetaOneRolloutReviewRoute:
        "Daily Beta 1 rollout review route: /daily-beta-1-rollout-review reviews rollout readiness without proceeding automatically.",
      nextRecommendedAction:
        "Next recommended action: keep Daily Beta 1 blocked until release signoff, controlled rollout plan, rollback readiness, and feedback inbox review are complete outside this page.",
      advancedDailyBetaOneCandidateDetails:
        "Advanced Daily Beta 1 candidate details: CodexForge Daily Beta 1 candidate is review-only. CodexForge Daily Beta 1 candidate does not go live, Daily Beta 1 release requires explicit operator approval, and unresolved Daily Beta 1 blockers stay blocked. It does not launch Daily Beta 1, execute workflows, persist release settings, call providers, call local models, call connectors, create automations, store outputs, or create an MCP runtime.",
    }),
  ];
}

export function buildCodexForgeDailyBetaOneCandidateBoundary(): CodexForgeDailyBetaOneCandidateBoundary {
  return {
    reviewOnly: true,
    approvalRequired: true,
    codexForgeDailyBetaOneCandidateDoesNotGoLive: true,
    dailyBetaOneReleaseRequiresExplicitOperatorApproval: true,
    unresolvedDailyBetaOneBlockersStayBlocked: true,
    goLiveAllowedFromUi: false,
    dailyBetaOneLaunchAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    releaseSettingsPersistenceAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    outputStorageAllowed: false,
  };
}

export function summarizeCodexForgeDailyBetaOneCandidate(
  model: Pick<CodexForgeDailyBetaOneCandidateModel, "candidates">
): string {
  return `CodexForge Daily Beta 1 candidate summarizes ${model.candidates.length} named Daily Beta 1 readiness posture without going live. Daily Beta 1 release requires explicit operator approval, and unresolved Daily Beta 1 blockers stay blocked.`;
}

export function buildCodexForgeDailyBetaOneCandidateModel(): CodexForgeDailyBetaOneCandidateModel {
  const candidates = buildCodexForgeDailyBetaOneCandidates();
  const model: CodexForgeDailyBetaOneCandidateModel = {
    title: "CodexForge Daily Beta 1 candidate",
    summary: "",
    candidates,
    boundary: buildCodexForgeDailyBetaOneCandidateBoundary(),
    dailyBetaOneCandidateLanguage: [...CODEXFORGE_DAILY_BETA_ONE_CANDIDATE_LANGUAGE],
    advancedDetails: [
      "CodexForge Daily Beta 1 candidate",
      "Daily Beta 1 candidate identity",
      "Hardening/docs/onboarding/signoff status",
      "Multi-workflow status",
      "Controlled live status",
      "Daily Beta readiness checklist",
      "Denied Daily Beta 1 actions",
      "Unresolved Daily Beta 1 blockers",
      "Daily Beta 1 rollout plan route",
      "Daily Beta 1 rollout review route",
      "Next recommended action",
      "CodexForge Daily Beta 1 candidate does not go live",
      "Daily Beta 1 release requires explicit operator approval",
      "Unresolved Daily Beta 1 blockers stay blocked",
      "advanced Daily Beta 1 candidate details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeCodexForgeDailyBetaOneCandidate(model) };
}
