import type { TestExecutionBoundaryReadinessReview, TestExecutionBoundaryReadinessReviewBoundary, TestExecutionBoundaryReadinessReviewModel } from "./test-execution-boundary-readiness-review-types";
import { buildTestExecutionBoundaryReadinessReviewStableKey } from "./test-execution-boundary-readiness-review-types";

export const TEST_EXECUTION_BOUNDARY_READINESS_REVIEW_LANGUAGE = [
  "Test execution boundary readiness review",
  "Test execution boundary readiness review does not run tests",
  "Test execution requires explicit operator approval",
  "Unresolved test execution blockers stay blocked",
  "Test boundary groups",
  "Allowed command checklist",
] as const;

export function buildTestExecutionBoundaryReadinessReview(input: Omit<TestExecutionBoundaryReadinessReview, "id"> & { idHint: string }): TestExecutionBoundaryReadinessReview {
  const { idHint, ...review } = input;
  return { id: buildTestExecutionBoundaryReadinessReviewStableKey("test-execution-boundary-readiness-review", idHint, input.status), ...review };
}

export function buildTestExecutionBoundaryReadinessReviews(): TestExecutionBoundaryReadinessReview[] {
  return [
    buildTestExecutionBoundaryReadinessReview({
      idHint: "test-execution-readiness-review-packet",
      status: "blocked",
      testExecutionBoundaryIdentity: "Test execution boundary identity: test-execution-boundary-readiness-review-test-execution-readiness-review-packet.",
      testBoundaryGroups: [
        "Test boundary groups: allowed command, workspace scope, timeout, logging, retry, rollback, evidence capture, and explicit operator approval gate.",
      ],
      allowedCommandChecklist: [
        "Allowed command checklist: future test execution must name one reviewed test command, denied command classes, expected runtime, and explicit operator approval outside this page.",
      ],
      workspaceScopeChecklist: [
        "Workspace scope checklist: test execution scope must be limited to the canonical frontend workspace with no arbitrary path browsing or project scanning from this page.",
      ],
      timeoutLoggingChecklist: [
        "Timeout/logging checklist: timeout, log redaction, failure capture, output retention, and audit owner must be approved before any separate local boundary can run tests.",
      ],
      rollbackRetryChecklist: [
        "Rollback/retry checklist: retry count, stop condition, failed-test handling, and no automatic fix application must be reviewed before execution claims.",
      ],
      deniedTestExecutionActions: [
        "Denied test execution actions: run tests, run shell commands, run git commands, run build or smoke commands, call local bridge endpoints, mutate files, apply patches, or approve test execution automatically.",
      ],
      unresolvedTestExecutionBlockers: [
        "Unresolved test execution blockers: missing allowed command policy, missing workspace scope, missing timeout/logging policy, missing retry rule, and missing explicit operator approval.",
      ],
      unifiedExecutionGapReportRoute: "Unified execution gap report route: /unified-execution-boundary-gap-report summarizes remaining execution gaps without running probes.",
      firstProviderExecutionTrialRoute: "First provider execution trial route: /first-approved-provider-execution-trial reviews provider trial readiness without calling providers.",
      nextRecommendedAction: "Next recommended action: keep test execution blocked until command scope, workspace scope, timeout/logging, retry, rollback, and explicit operator approval are implemented outside this page.",
      advancedTestExecutionBoundaryDetails: "Advanced test execution boundary details: Test execution boundary readiness review is review-only. Test execution boundary readiness review does not run tests, test execution requires explicit operator approval, and unresolved test execution blockers stay blocked. It does not run tests, run shell commands, run git commands, run builds, run smoke checks, call local bridge endpoints, mutate files, apply patches, store outputs, persist approvals, call providers, or create an MCP runtime.",
    }),
  ];
}

export function buildTestExecutionBoundaryReadinessReviewBoundary(): TestExecutionBoundaryReadinessReviewBoundary {
  return { reviewOnly: true, approvalRequired: true, testExecutionFromUiAllowed: false, testBuildSmokeExecutionAllowedFromUi: false, commandExecutionAllowedFromUi: false, shellExecutionAllowedFromUi: false, gitCommandExecutionAllowedFromUi: false, localBridgeEndpointCallsAllowedFromUi: false, fileMutationAllowedFromUi: false, patchApplyAllowedFromUi: false, arbitraryProjectScanningAllowed: false, arbitraryLocalFileBrowsingAllowed: false, outputStorageAllowed: false, credentialStorageAllowed: false };
}

export function summarizeTestExecutionBoundaryReadinessReview(model: Pick<TestExecutionBoundaryReadinessReviewModel, "testExecutionReviews">): string {
  return "Test execution boundary readiness review summarizes " + model.testExecutionReviews.length + " test execution boundary review packet. Test execution boundary readiness review does not run tests, test execution requires explicit operator approval, and unresolved test execution blockers stay blocked.";
}

export function buildTestExecutionBoundaryReadinessReviewModel(): TestExecutionBoundaryReadinessReviewModel {
  const testExecutionReviews = buildTestExecutionBoundaryReadinessReviews();
  const model: TestExecutionBoundaryReadinessReviewModel = {
    title: "Test execution boundary readiness review",
    summary: "",
    testExecutionReviews,
    boundary: buildTestExecutionBoundaryReadinessReviewBoundary(),
    language: [...TEST_EXECUTION_BOUNDARY_READINESS_REVIEW_LANGUAGE],
    advancedDetails: [
      "Test execution boundary readiness review",
      "Test execution boundary identity",
      "Test boundary groups",
      "Allowed command checklist",
      "Workspace scope checklist",
      "Timeout/logging checklist",
      "Rollback/retry checklist",
      "Denied test execution actions",
      "Unresolved test execution blockers",
      "Unified execution gap report route",
      "First provider execution trial route",
      "Next recommended action",
      "Test execution boundary readiness review does not run tests",
      "Test execution requires explicit operator approval",
      "Unresolved test execution blockers stay blocked",
      "advanced test execution boundary details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeTestExecutionBoundaryReadinessReview(model) };
}
