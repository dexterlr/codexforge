import type { DailyBetaReleaseCandidateSummary, DailyBetaReleaseCandidateSummaryBoundary, DailyBetaReleaseCandidateSummaryModel } from "./daily-beta-release-candidate-summary-types";
import { buildDailyBetaReleaseCandidateSummaryStableKey } from "./daily-beta-release-candidate-summary-types";

export const DAILY_BETA_RELEASE_CANDIDATE_SUMMARY_LANGUAGE = [
  "Daily Beta release candidate summary",
  "Daily Beta release candidate summary does not approve release",
  "Release candidate decisions require explicit operator approval",
  "Unresolved release summary blockers stay blocked",
  "Summary groups",
  "Activation readiness summary",
] as const;

export function buildDailyBetaReleaseCandidateSummary(input: Omit<DailyBetaReleaseCandidateSummary, "id"> & { idHint: string }): DailyBetaReleaseCandidateSummary {
  const { idHint, ...releaseCandidateSummary } = input;
  return { id: buildDailyBetaReleaseCandidateSummaryStableKey("daily-beta-release-candidate-summary", idHint, input.status), ...releaseCandidateSummary };
}

export function buildDailyBetaReleaseCandidateSummaries(): DailyBetaReleaseCandidateSummary[] {
  return [
    buildDailyBetaReleaseCandidateSummary({
      idHint: "daily-beta-release-candidate-summary-packet",
      status: "blocked",
      releaseCandidateSummaryIdentity: "Release candidate summary identity: daily-beta-release-candidate-summary-packet.",
      summaryGroups: [
        "Summary groups: activation readiness summary, final gate summary, feedback/regression/hardening summary, operator readiness summary, denied summary actions, unresolved summary blockers, Daily Beta 1 final candidate route, final operator review route, and next recommended action.",
      ],
      activationReadinessSummary: [
        "Activation readiness summary: readiness lock audit, activation candidate, release handoff, and checkpoint docs remain review-only inputs and do not approve release or activate Daily Beta from UI.",
      ],
      finalGateSummary: [
        "Final gate summary: final gate status is summarized without passing the gate automatically, approving release, going live, or persisting release settings.",
      ],
      feedbackRegressionHardeningSummary: [
        "Feedback/regression/hardening summary: feedback, regression, and hardening items stay blocked until explicit operator-approved fixes or decisions happen outside this page.",
      ],
      operatorReadinessSummary: [
        "Operator readiness summary: operator approval, support owner, rollback owner, communication owner, and handoff owner remain manual requirements outside this page.",
      ],
      deniedSummaryActions: [
        "Denied summary actions: approve release, summarize release candidate as approved automatically, go live, activate Daily Beta, activate Daily Beta 1, persist release settings, persist approvals, execute workflows, run tests, send handoff, call providers, call local models, call connectors, create automations, mutate files, mutate memory, store outputs, or store credentials.",
      ],
      unresolvedSummaryBlockers: [
        "Unresolved release summary blockers: missing explicit release candidate approval, unresolved readiness lock audit blocker, unresolved final gate blocker, unresolved feedback/regression/hardening blocker, missing operator readiness review, and missing Daily Beta 1 final candidate review.",
      ],
      dailyBetaOneFinalCandidateRoute: "Daily Beta 1 final candidate route: /codexforge-daily-beta-1-final-candidate summarizes final candidate readiness without activation.",
      finalOperatorReviewRoute: "Final operator review route: /daily-beta-1-final-operator-review reviews operator readiness without signoff automation.",
      nextRecommendedAction: "Next recommended action: treat this summary as review context only, then review the Daily Beta 1 final candidate and final operator review before requesting explicit release approval outside this page.",
      advancedDailyBetaReleaseCandidateSummaryDetails: "Advanced Daily Beta release candidate summary details: Daily Beta release candidate summary is review-only. Daily Beta release candidate summary does not approve release, release candidate decisions require explicit operator approval, and unresolved release summary blockers stay blocked. It does not approve release, summarize release candidate as approved automatically, go live, activate Daily Beta, activate Daily Beta 1, persist release settings, persist approvals, execute workflows, run tests, send handoff, call providers, call local models, call connectors, create automations, mutate files, mutate memory, store outputs, store credentials, or create an MCP runtime.",
    }),
  ];
}

export function buildDailyBetaReleaseCandidateSummaryBoundary(): DailyBetaReleaseCandidateSummaryBoundary {
  return { reviewOnly: true, approvalRequired: true, releaseApprovalAutomationAllowedFromUi: false, releaseSettingsPersistenceAllowedFromUi: false, goLiveAllowedFromUi: false, dailyBetaActivationAllowedFromUi: false, dailyBetaOneActivationAllowedFromUi: false, workflowExecutionAllowedFromUi: false, providerApiCallsAllowedFromUi: false, localModelCallsAllowedFromUi: false, connectorApiCallsAllowedFromUi: false, automationCreationAllowedFromUi: false, fileMutationAllowedFromUi: false, memoryMutationAllowedFromUi: false, outputStorageAllowed: false, credentialStorageAllowed: false };
}

export function summarizeDailyBetaReleaseCandidateSummary(model: Pick<DailyBetaReleaseCandidateSummaryModel, "releaseCandidateSummaries">): string {
  return "Daily Beta release candidate summary summarizes " + model.releaseCandidateSummaries.length + " release candidate packet without approving release. Release candidate decisions require explicit operator approval, and unresolved release summary blockers stay blocked.";
}

export function buildDailyBetaReleaseCandidateSummaryModel(): DailyBetaReleaseCandidateSummaryModel {
  const releaseCandidateSummaries = buildDailyBetaReleaseCandidateSummaries();
  const model: DailyBetaReleaseCandidateSummaryModel = {
    title: "Daily Beta release candidate summary",
    summary: "",
    releaseCandidateSummaries,
    boundary: buildDailyBetaReleaseCandidateSummaryBoundary(),
    language: [...DAILY_BETA_RELEASE_CANDIDATE_SUMMARY_LANGUAGE],
    advancedDetails: [
      "Daily Beta release candidate summary",
      "Release candidate summary identity",
      "Summary groups",
      "Activation readiness summary",
      "Final gate summary",
      "Feedback/regression/hardening summary",
      "Operator readiness summary",
      "Denied summary actions",
      "Unresolved summary blockers",
      "Unresolved release summary blockers",
      "Daily Beta 1 final candidate route",
      "Final operator review route",
      "Next recommended action",
      "Daily Beta release candidate summary does not approve release",
      "Release candidate decisions require explicit operator approval",
      "Unresolved release summary blockers stay blocked",
      "advanced Daily Beta release candidate summary details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeDailyBetaReleaseCandidateSummary(model) };
}
