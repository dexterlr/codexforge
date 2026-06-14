import type {
  CodexForgeDailyBetaReleaseCandidate,
  CodexForgeDailyBetaReleaseCandidateBoundary,
  CodexForgeDailyBetaReleaseCandidateModel,
} from "./codexforge-daily-beta-release-candidate-types";
import { buildCodexForgeDailyBetaReleaseCandidateStableKey } from "./codexforge-daily-beta-release-candidate-types";

export const CODEXFORGE_DAILY_BETA_RELEASE_CANDIDATE_LANGUAGE = [
  "CodexForge Daily Beta release candidate",
  "CodexForge Daily Beta release candidate does not go live",
  "Daily Beta release requires explicit operator approval",
  "Unresolved Daily Beta blockers stay blocked",
  "Daily beta release candidate identity",
  "Daily workflow readiness status",
] as const;

export function buildCodexForgeDailyBetaReleaseCandidate(
  input: Omit<CodexForgeDailyBetaReleaseCandidate, "id"> & { idHint: string }
): CodexForgeDailyBetaReleaseCandidate {
  const { idHint, ...candidate } = input;
  return {
    id: buildCodexForgeDailyBetaReleaseCandidateStableKey(
      "codexforge-daily-beta-release-candidate",
      idHint,
      input.status
    ),
    ...candidate,
  };
}

export function buildCodexForgeDailyBetaReleaseCandidates(): CodexForgeDailyBetaReleaseCandidate[] {
  return [
    buildCodexForgeDailyBetaReleaseCandidate({
      idHint: "review-only-daily-beta-rc",
      status: "blocked",
      dailyBetaReleaseCandidateIdentity:
        "Daily beta release candidate identity: codexforge-daily-beta-release-candidate-review-only-daily-beta-rc.",
      multiWorkflowStatus: [
        "Multi-workflow status: multi-workflow plan, trial review, regression review, and release candidate must stay reviewed and blocked until approval exists.",
      ],
      controlledLiveSignoffStatus: [
        "Controlled live signoff status: controlled live capability signoff is not automatic and still requires explicit operator approval.",
      ],
      dailyWorkflowReadinessStatus: [
        "Daily workflow readiness status: first real daily workflow, evidence review, result review, recovery review, and hardening review must remain visible before Daily Beta launch is considered.",
      ],
      approvalSafetyReadinessStatus: [
        "Approval/safety readiness status: Daily Beta release needs approval owner, evidence owner, result owner, recovery owner, release owner, and privacy owner outside this page.",
      ],
      deniedDailyBetaReleaseActions: [
        "Denied Daily Beta release actions: go live, launch Daily Beta, execute workflows, persist release settings, call providers, call local models, call connectors, create automations, write files, or mutate memory.",
      ],
      unresolvedDailyBetaBlockers: [
        "Unresolved Daily Beta blockers: missing explicit release approval, unresolved multi-workflow regression, incomplete controlled live signoff, unsafe output retention, and missing feedback review.",
      ],
      dailyBetaControlledOperatorTrialRoute:
        "Daily Beta controlled operator trial route: /daily-beta-controlled-operator-trial previews Daily Beta trial behavior without executing workflows.",
      dailyBetaFeedbackReviewRoute:
        "Daily Beta feedback review route: /daily-beta-feedback-review reviews feedback without auto-ingesting feedback.",
      nextRecommendedAction:
        "Next recommended action: keep Daily Beta release blocked until controlled trial and feedback review are complete outside this page.",
      advancedDailyBetaReleaseCandidateDetails:
        "Advanced Daily Beta release candidate details: CodexForge Daily Beta release candidate is review-only. CodexForge Daily Beta release candidate does not go live, Daily Beta release requires explicit operator approval, and unresolved Daily Beta blockers stay blocked. It does not go live, launch Daily Beta, execute workflows, persist release settings, call providers, call local models, call connectors, create automations, mutate files, mutate memory, or create an MCP runtime.",
    }),
  ];
}

export function buildCodexForgeDailyBetaReleaseCandidateBoundary(): CodexForgeDailyBetaReleaseCandidateBoundary {
  return {
    reviewOnly: true,
    approvalRequired: true,
    codexForgeDailyBetaReleaseCandidateDoesNotGoLive: true,
    dailyBetaReleaseRequiresExplicitOperatorApproval: true,
    unresolvedDailyBetaBlockersStayBlocked: true,
    goLiveAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    releaseSettingsPersistenceAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    automationExecutionAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    memoryMutationAllowedFromUi: false,
  };
}

export function summarizeCodexForgeDailyBetaReleaseCandidate(
  model: Pick<CodexForgeDailyBetaReleaseCandidateModel, "candidates">
): string {
  return `CodexForge Daily Beta release candidate summarizes ${model.candidates.length} Daily Beta release posture without going live. Daily Beta release requires explicit operator approval, and unresolved Daily Beta blockers stay blocked.`;
}

export function buildCodexForgeDailyBetaReleaseCandidateModel(): CodexForgeDailyBetaReleaseCandidateModel {
  const candidates = buildCodexForgeDailyBetaReleaseCandidates();
  const model: CodexForgeDailyBetaReleaseCandidateModel = {
    title: "CodexForge Daily Beta release candidate",
    summary: "",
    candidates,
    boundary: buildCodexForgeDailyBetaReleaseCandidateBoundary(),
    dailyBetaReleaseCandidateLanguage: [...CODEXFORGE_DAILY_BETA_RELEASE_CANDIDATE_LANGUAGE],
    advancedDetails: [
      "CodexForge Daily Beta release candidate",
      "Daily beta release candidate identity",
      "Multi-workflow status",
      "Controlled live signoff status",
      "Daily workflow readiness status",
      "Approval/safety readiness status",
      "Denied Daily Beta release actions",
      "Unresolved Daily Beta blockers",
      "Daily Beta controlled operator trial route",
      "Daily Beta feedback review route",
      "Next recommended action",
      "CodexForge Daily Beta release candidate does not go live",
      "Daily Beta release requires explicit operator approval",
      "Unresolved Daily Beta blockers stay blocked",
      "advanced Daily Beta release candidate details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeCodexForgeDailyBetaReleaseCandidate(model) };
}
