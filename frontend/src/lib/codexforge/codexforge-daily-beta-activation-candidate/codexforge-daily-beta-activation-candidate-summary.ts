import type { CodexForgeDailyBetaActivationCandidate, CodexForgeDailyBetaActivationCandidateBoundary, CodexForgeDailyBetaActivationCandidateModel } from "./codexforge-daily-beta-activation-candidate-types";
import { buildCodexForgeDailyBetaActivationCandidateStableKey } from "./codexforge-daily-beta-activation-candidate-types";

export const CODEXFORGE_DAILY_BETA_ACTIVATION_CANDIDATE_LANGUAGE = [
  "CodexForge Daily Beta activation candidate",
  "CodexForge Daily Beta activation candidate does not go live",
  "Daily Beta activation requires explicit operator approval",
  "Unresolved activation candidate blockers stay blocked",
  "Daily Beta activation candidate identity",
  "Live boundary status",
] as const;

export function buildCodexForgeDailyBetaActivationCandidate(input: Omit<CodexForgeDailyBetaActivationCandidate, "id"> & { idHint: string }): CodexForgeDailyBetaActivationCandidate {
  const { idHint, ...activationCandidate } = input;
  return { id: buildCodexForgeDailyBetaActivationCandidateStableKey("codexforge-daily-beta-activation-candidate", idHint, input.status), ...activationCandidate };
}

export function buildCodexForgeDailyBetaActivationCandidates(): CodexForgeDailyBetaActivationCandidate[] {
  return [
    buildCodexForgeDailyBetaActivationCandidate({
      idHint: "codexforge-daily-beta-activation-candidate-packet",
      status: "blocked",
      dailyBetaActivationCandidateIdentity: "Daily Beta activation candidate identity: codexforge-daily-beta-activation-candidate-packet.",
      finalGateStatus: [
        "Final gate status: final gate remains blocked until explicit operator approval and does not pass automatically, activate Daily Beta, or go live from UI.",
      ],
      controlledTrialStatus: [
        "Controlled trial status: controlled operator trial review remains preview-only and does not execute workflows, call providers, call local models, call connectors, or create automations.",
      ],
      feedbackRegressionFinalHardeningStatus: [
        "Feedback/regression/final hardening status: feedback is not auto-ingested, regressions are not tested or fixed from UI, and hardening changes are not applied automatically.",
      ],
      liveBoundaryStatus: [
        "Live boundary status: live boundary signoff remains review-only and does not route live provider, local model, connector, automation, file, test, or workflow traffic.",
      ],
      deniedActivationCandidateActions: [
        "Denied activation candidate actions: go live, activate Daily Beta, execute workflows, persist activation settings, persist approval decisions, pass the final gate, run controlled trials, send handoff, lock readiness, call providers, call local models, call connectors, create automations, mutate files, mutate memory, store outputs, or store credentials.",
      ],
      unresolvedActivationCandidateBlockers: [
        "Unresolved activation candidate blockers: missing activation approval, unresolved final gate blocker, unresolved controlled trial blocker, unresolved feedback/regression/final hardening blocker, missing live boundary approval, missing handoff review, and missing readiness lock review.",
      ],
      releaseHandoffRoute: "Release handoff route: /daily-beta-activation-release-handoff packages handoff guidance without sending or applying it.",
      readinessLockRoute: "Readiness lock route: /daily-beta-activation-readiness-lock reviews lock criteria without locking readiness automatically.",
      nextRecommendedAction: "Next recommended action: keep the activation candidate blocked and review release handoff plus readiness lock before requesting activation approval outside this page.",
      advancedCodexForgeDailyBetaActivationCandidateDetails: "Advanced CodexForge Daily Beta activation candidate details: CodexForge Daily Beta activation candidate is review-only. CodexForge Daily Beta activation candidate does not go live, Daily Beta activation requires explicit operator approval, and unresolved activation candidate blockers stay blocked. It does not go live, activate Daily Beta, execute workflows, persist activation settings, persist approval decisions, pass the final gate, run controlled trials, send handoff, lock readiness, call providers, call local models, call connectors, create automations, mutate files, mutate memory, store outputs, store credentials, or create an MCP runtime.",
    }),
  ];
}

export function buildCodexForgeDailyBetaActivationCandidateBoundary(): CodexForgeDailyBetaActivationCandidateBoundary {
  return { reviewOnly: true, approvalRequired: true, goLiveAllowedFromUi: false, dailyBetaActivationAllowedFromUi: false, workflowExecutionAllowedFromUi: false, activationSettingsPersistenceAllowedFromUi: false, approvalDecisionPersistenceAllowedFromUi: false, providerApiCallsAllowedFromUi: false, localModelCallsAllowedFromUi: false, connectorApiCallsAllowedFromUi: false, automationCreationAllowedFromUi: false, fileMutationAllowedFromUi: false, memoryMutationAllowedFromUi: false, outputStorageAllowed: false, credentialStorageAllowed: false };
}

export function summarizeCodexForgeDailyBetaActivationCandidate(model: Pick<CodexForgeDailyBetaActivationCandidateModel, "activationCandidates">): string {
  return "CodexForge Daily Beta activation candidate summarizes " + model.activationCandidates.length + " activation candidate packet without going live. Daily Beta activation requires explicit operator approval, and unresolved activation candidate blockers stay blocked.";
}

export function buildCodexForgeDailyBetaActivationCandidateModel(): CodexForgeDailyBetaActivationCandidateModel {
  const activationCandidates = buildCodexForgeDailyBetaActivationCandidates();
  const model: CodexForgeDailyBetaActivationCandidateModel = {
    title: "CodexForge Daily Beta activation candidate",
    summary: "",
    activationCandidates,
    boundary: buildCodexForgeDailyBetaActivationCandidateBoundary(),
    language: [...CODEXFORGE_DAILY_BETA_ACTIVATION_CANDIDATE_LANGUAGE],
    advancedDetails: [
      "CodexForge Daily Beta activation candidate",
      "Daily Beta activation candidate identity",
      "Final gate status",
      "Controlled trial status",
      "Feedback/regression/final hardening status",
      "Live boundary status",
      "Denied activation candidate actions",
      "Unresolved activation candidate blockers",
      "Release handoff route",
      "Readiness lock route",
      "Next recommended action",
      "CodexForge Daily Beta activation candidate does not go live",
      "Daily Beta activation requires explicit operator approval",
      "Unresolved activation candidate blockers stay blocked",
      "advanced CodexForge Daily Beta activation candidate details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeCodexForgeDailyBetaActivationCandidate(model) };
}
