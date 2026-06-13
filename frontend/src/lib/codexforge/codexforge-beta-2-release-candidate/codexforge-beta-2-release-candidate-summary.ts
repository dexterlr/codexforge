import type {
  CodexForgeBetaTwoReleaseCandidate,
  CodexForgeBetaTwoReleaseCandidateBoundary,
  CodexForgeBetaTwoReleaseCandidateModel,
} from "./codexforge-beta-2-release-candidate-types";
import { buildCodexForgeBetaTwoReleaseCandidateStableKey } from "./codexforge-beta-2-release-candidate-types";

export const CODEXFORGE_BETA_TWO_RELEASE_CANDIDATE_LANGUAGE = [
  "CodexForge Beta 2 release candidate",
  "CodexForge Beta 2 release candidate does not go live",
  "Beta 2 release requires explicit operator approval",
  "Unresolved Beta 2 blockers stay blocked",
  "Regression status",
  "Live workflow readiness status",
] as const;

export function buildCodexForgeBetaTwoReleaseCandidate(
  input: Omit<CodexForgeBetaTwoReleaseCandidate, "id"> & { idHint: string }
): CodexForgeBetaTwoReleaseCandidate {
  const { idHint, ...candidate } = input;
  return {
    id: buildCodexForgeBetaTwoReleaseCandidateStableKey(
      "codexforge-beta-2-release-candidate",
      idHint,
      input.status
    ),
    ...candidate,
  };
}

export function buildCodexForgeBetaTwoReleaseCandidates(): CodexForgeBetaTwoReleaseCandidate[] {
  return [
    buildCodexForgeBetaTwoReleaseCandidate({
      idHint: "review-only-beta-2-rc",
      status: "blocked",
      betaTwoReleaseCandidateIdentity:
        "Beta 2 release candidate identity: codexforge-beta-2-release-candidate-review-only-beta-2-rc.",
      regressionStatus: [
        "Regression status: release regression review remains blocked until unresolved beta regressions are reviewed and approved outside this page.",
      ],
      safetySignoffStatus: [
        "Safety signoff status: safety signoff requires explicit operator approval and is not granted automatically here.",
      ],
      documentationStatus: [
        "Documentation status: documentation changes require explicit operator approval and stale documentation blockers stay blocked.",
      ],
      onboardingStatus: [
        "Onboarding status: onboarding final pass does not launch workflows and unresolved onboarding blockers stay blocked.",
      ],
      liveWorkflowReadinessStatus: [
        "Live workflow readiness status: provider, local model, connector, automation, and live workflow paths stay review-only and do not go live.",
      ],
      deniedReleasePaths: [
        "Denied release paths: go live, execute workflows, persist release settings, approve release automatically, call providers, call local models, call connectors, create automations, mutate files, store outputs, or mutate memory.",
      ],
      unresolvedBetaTwoBlockers: [
        "Unresolved Beta 2 blockers: unresolved Beta 2 blockers stay blocked until explicit operator approval resolves them outside this page.",
      ],
      controlledOperatorTrialRoute:
        "Controlled operator trial route: /beta-2-controlled-operator-trial previews a controlled operator trial without executing it.",
      operatorFeedbackReviewRoute:
        "Operator feedback review route: /beta-2-operator-feedback-review reviews feedback without auto-ingesting feedback.",
      nextRecommendedAction:
        "Next recommended action: keep Beta 2 release blocked, review controlled trial readiness, and require explicit operator approval before any release.",
      advancedBetaTwoReleaseCandidateDetails:
        "Advanced Beta 2 release candidate details: CodexForge Beta 2 release candidate is review-only. CodexForge Beta 2 release candidate does not go live, Beta 2 release requires explicit operator approval, and unresolved Beta 2 blockers stay blocked. It does not go live, execute workflows, persist release settings, approve release, call providers, call local models, call connectors, create automations, mutate files, store outputs, auto-ingest feedback, or mutate memory.",
    }),
  ];
}

export function buildCodexForgeBetaTwoReleaseCandidateBoundary(): CodexForgeBetaTwoReleaseCandidateBoundary {
  return {
    reviewOnly: true,
    approvalRequired: true,
    codexForgeBetaTwoReleaseCandidateDoesNotGoLive: true,
    betaTwoReleaseRequiresExplicitOperatorApproval: true,
    unresolvedBetaTwoBlockersStayBlocked: true,
    actionsExecutedFromUi: false,
    goLiveAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    releaseSettingsPersistenceAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    memoryMutationAllowedFromUi: false,
  };
}

export function summarizeCodexForgeBetaTwoReleaseCandidate(
  model: Pick<CodexForgeBetaTwoReleaseCandidateModel, "candidates">
): string {
  return `CodexForge Beta 2 release candidate summarizes ${model.candidates.length} Beta 2 release posture without going live. Beta 2 release requires explicit operator approval, and unresolved Beta 2 blockers stay blocked.`;
}

export function buildCodexForgeBetaTwoReleaseCandidateModel(): CodexForgeBetaTwoReleaseCandidateModel {
  const candidates = buildCodexForgeBetaTwoReleaseCandidates();
  const model: CodexForgeBetaTwoReleaseCandidateModel = {
    title: "CodexForge Beta 2 release candidate",
    summary: "",
    candidates,
    boundary: buildCodexForgeBetaTwoReleaseCandidateBoundary(),
    betaTwoReleaseCandidateLanguage: [...CODEXFORGE_BETA_TWO_RELEASE_CANDIDATE_LANGUAGE],
    advancedDetails: [
      "CodexForge Beta 2 release candidate",
      "Beta 2 release candidate identity",
      "Regression status",
      "safety signoff status",
      "documentation status",
      "onboarding status",
      "Live workflow readiness status",
      "denied release paths",
      "unresolved Beta 2 blockers",
      "controlled operator trial route",
      "operator feedback review route",
      "next recommended action",
      "CodexForge Beta 2 release candidate does not go live",
      "Beta 2 release requires explicit operator approval",
      "Unresolved Beta 2 blockers stay blocked",
      "advanced Beta 2 release candidate details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeCodexForgeBetaTwoReleaseCandidate(model) };
}
