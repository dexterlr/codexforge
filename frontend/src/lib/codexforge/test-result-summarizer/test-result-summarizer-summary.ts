import type {
  TestResultSummarizerBoundary,
  TestResultSummarizerModel,
  TestResultSummary,
} from "./test-result-summarizer-types";
import { buildTestResultSummarizerStableKey } from "./test-result-summarizer-types";

export const TEST_RESULT_SUMMARIZER_LANGUAGE = [
  "Test result summarizer",
  "Results are reviewed before promotion",
  "Raw output stays secondary",
  "Memory is not auto-promoted",
  "Failure summary",
  "Review inbox handoff",
] as const;

export function buildTestResultSummary(
  input: Omit<TestResultSummary, "id"> & { idHint: string }
): TestResultSummary {
  const { idHint, ...result } = input;
  return {
    id: buildTestResultSummarizerStableKey(
      "test-result-summarizer",
      idHint,
      input.status
    ),
    ...result,
  };
}

export function buildTestResultSummaries(): TestResultSummary[] {
  return [
    buildTestResultSummary({
      idHint: "failed-needs-review",
      resultIdentity:
        "Result identity: reviewed test result packet from a future approved local boundary.",
      sourceExecutionRequest:
        "Source execution request: /test-execution-approval supplies the reviewed command, workspace scope, timeout policy, and approval copy.",
      status: "failed",
      commandSummary:
        "Command summary: the reviewed command summary is shown without rerunning it and without exposing environment values.",
      outputSummary:
        "Output summary: concise operator-readable output summary stays above the fold; raw output stays secondary.",
      failureSummary:
        "Failure summary: failed assertions, build errors, timeout notes, or blocked status remain visible and are not hidden behind success copy.",
      changedRiskFollowUp:
        "Changed-risk follow-up: route changed-risk review back to /patch-result-capture and project risk review before retry planning.",
      patchResultRoute:
        "Patch result route: /patch-result-capture links the test result back to the patch outcome.",
      reviewInboxHandoff:
        "Review inbox handoff: /review-inbox receives the human review handoff before promotion.",
      nextRecommendedRoute:
        "Next recommended route: /test-failure-triage for failed, blocked, timed out, or needs review results.",
      blockedReasons: [
        "Results are reviewed before promotion",
        "Raw output stays secondary",
        "Memory is not auto-promoted",
      ],
      advancedRawOutputDetails:
        "Advanced raw output details: raw output stays collapsed or secondary. This summarizer does not execute commands, mutate files, call appendEvent, call saveBrainGraph, mutate Brain graph, auto-promote memory, call providers, or hide failures.",
    }),
    buildTestResultSummary({
      idHint: "passed-review-required",
      resultIdentity:
        "Result identity: passed test result packet still waiting for review.",
      sourceExecutionRequest:
        "Source execution request: linked to the reviewed test execution approval boundary.",
      status: "passed",
      commandSummary:
        "Command summary: passed command is summarized for review, not used as automatic promotion authority.",
      outputSummary:
        "Output summary: passed output is summarized in plain English and raw output stays secondary.",
      failureSummary:
        "Failure summary: no failure indicated, but review still confirms scope, command, and risk follow-up.",
      changedRiskFollowUp:
        "Changed-risk follow-up: confirm patch result, risk notes, and review inbox disposition before any memory candidate is created elsewhere.",
      patchResultRoute:
        "Patch result route: /patch-result-capture remains the related patch outcome route.",
      reviewInboxHandoff:
        "Review inbox handoff: /review-inbox reviews the result before any downstream promotion.",
      nextRecommendedRoute:
        "Next recommended route: /review-inbox for final human review.",
      blockedReasons: [
        "Promotion requires review",
        "Memory is not auto-promoted",
        "No direct graph mutation from UI",
      ],
      advancedRawOutputDetails:
        "Advanced raw output details: passed output is not persisted, promoted, or converted into graph state by this UI.",
    }),
  ];
}

export function buildTestResultSummarizerBoundary(): TestResultSummarizerBoundary {
  return {
    resultsReviewedBeforePromotionRequired: true,
    rawOutputPrimaryAllowed: false,
    memoryAutoPromotionAllowed: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    brainGraphMutationAllowed: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    testsRunFromPageAllowed: false,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    fileMutationAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    secretValuesDisplayedAllowed: false,
    credentialStorageAllowed: false,
    providerRegistryMutationAllowed: false,
    routerPolicyMutationAllowed: false,
    packageInstallAllowedFromUi: false,
  };
}

export function summarizeTestResultSummarizer(
  model: Pick<TestResultSummarizerModel, "results">
): string {
  return `Test result summarizer prepares ${model.results.length} result summary shape(s). Results are reviewed before promotion, raw output stays secondary, and memory is not auto-promoted.`;
}

export function buildTestResultSummarizerModel(): TestResultSummarizerModel {
  const results = buildTestResultSummaries();
  const model: TestResultSummarizerModel = {
    title: "Test result summarizer",
    summary: "",
    results,
    boundary: buildTestResultSummarizerBoundary(),
    resultLanguage: [...TEST_RESULT_SUMMARIZER_LANGUAGE],
    advancedDetails: [
      "Test result summarizer",
      "Results are reviewed before promotion",
      "Raw output stays secondary",
      "Memory is not auto-promoted",
      "Result identity",
      "Source execution request",
      "Status: passed, failed, blocked, timed out, needs review",
      "Command summary",
      "Output summary",
      "Failure summary",
      "Changed-risk follow-up",
      "Patch result route",
      "Review inbox handoff",
      "Next recommended route",
      "Blocked reasons",
      "Approved local boundary required",
      "Advanced raw output details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizeTestResultSummarizer(model) };
}
