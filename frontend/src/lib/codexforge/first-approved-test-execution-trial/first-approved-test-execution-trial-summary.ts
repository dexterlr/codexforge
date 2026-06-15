import type { FirstApprovedTestExecutionTrial, FirstApprovedTestExecutionTrialBoundary, FirstApprovedTestExecutionTrialModel } from "./first-approved-test-execution-trial-types";
import { buildFirstApprovedTestExecutionTrialStableKey } from "./first-approved-test-execution-trial-types";

export const FIRST_APPROVED_TEST_EXECUTION_TRIAL_LANGUAGE = [
  "First approved test execution trial",
  "First approved test execution trial does not run tests from UI",
  "Test execution requires explicit operator approval at the boundary",
  "Unapproved test execution paths remain blocked",
  "Test trial groups",
  "Approved command checklist",
] as const;

export function buildFirstApprovedTestExecutionTrial(input: Omit<FirstApprovedTestExecutionTrial, "id"> & { idHint: string }): FirstApprovedTestExecutionTrial {
  const { idHint, ...trial } = input;
  return { id: buildFirstApprovedTestExecutionTrialStableKey("first-approved-test-execution-trial", idHint, input.status), ...trial };
}

export function buildFirstApprovedTestExecutionTrials(): FirstApprovedTestExecutionTrial[] {
  return [
    buildFirstApprovedTestExecutionTrial({
      idHint: "test-execution-trial-review-packet",
      status: "blocked",
      firstApprovedTestExecutionIdentity: "First approved test execution identity: first-approved-test-execution-trial-test-execution-trial-review-packet.",
      testTrialGroups: [
        "Test trial groups: approved command, workspace scope, timeout, logging, evidence capture, result review, denied command paths, and explicit operator approval gate.",
      ],
      approvedCommandChecklist: [
        "Approved command checklist: a future test execution boundary must name the exact command, package manager context, allowed arguments, timeout, and stop condition before any separate local executor may run it.",
      ],
      workspaceScopeChecklist: [
        "Workspace scope checklist: the canonical frontend workspace, denied roots, environment redaction, and no arbitrary local project scanning must be reviewed before test execution.",
      ],
      timeoutLoggingChecklist: [
        "Timeout/logging checklist: timeout ceiling, log capture limit, failure truncation, secret redaction, and operator-visible evidence rules must be approved outside this page.",
      ],
      evidenceResultChecklist: [
        "Evidence/result checklist: test output evidence, pass/fail result summary, retention rule, rejection path, and audit owner must be reviewed before use.",
      ],
      deniedTestExecutionActions: [
        "Denied test execution actions: run tests, run builds, run smoke checks, run shell commands, call local bridge endpoints, store outputs, persist approvals, or mutate files.",
      ],
      unresolvedTestExecutionBlockers: [
        "Unresolved test execution blockers: missing bounded local test executor, missing approved command allowlist, missing timeout/logging policy, missing evidence handling, and missing explicit operator approval.",
      ],
      firstRealEndToEndWorkflowTrialPlanRoute: "First real end-to-end workflow trial plan route: /first-real-end-to-end-workflow-trial-plan composes approved boundaries without executing workflows.",
      endToEndEvidenceReviewRoute: "End-to-end evidence review route: /end-to-end-workflow-evidence-review reviews evidence before use without ingesting it automatically.",
      nextRecommendedAction: "Next recommended action: keep unapproved test execution paths blocked until approved commands, workspace scope, timeout/logging, evidence/result handling, and explicit operator approval are implemented outside this page.",
      advancedTestExecutionTrialDetails: "Advanced test execution trial details: First approved test execution trial is review-only. First approved test execution trial does not run tests from UI, test execution requires explicit operator approval at the boundary, and unapproved test execution paths remain blocked. It does not run tests, run shell commands, run builds, run smoke checks, call local bridge endpoints, store outputs, persist approvals, call providers, call local models, call connectors, create automations, mutate files, mutate memory, or create an MCP runtime.",
    }),
  ];
}

export function buildFirstApprovedTestExecutionTrialBoundary(): FirstApprovedTestExecutionTrialBoundary {
  return { reviewOnly: true, approvalRequired: true, testExecutionFromUiAllowed: false, buildExecutionFromUiAllowed: false, smokeExecutionFromUiAllowed: false, commandExecutionAllowedFromUi: false, shellExecutionAllowedFromUi: false, localBridgeEndpointCallsAllowedFromUi: false, approvalDecisionPersistenceAllowedFromUi: false, workflowExecutionAllowedFromUi: false, fileMutationAllowedFromUi: false, outputStorageAllowed: false, credentialStorageAllowed: false };
}

export function summarizeFirstApprovedTestExecutionTrial(model: Pick<FirstApprovedTestExecutionTrialModel, "testExecutionTrials">): string {
  return "First approved test execution trial summarizes " + model.testExecutionTrials.length + " test execution trial review packet. First approved test execution trial does not run tests from UI, test execution requires explicit operator approval at the boundary, and unapproved test execution paths remain blocked.";
}

export function buildFirstApprovedTestExecutionTrialModel(): FirstApprovedTestExecutionTrialModel {
  const testExecutionTrials = buildFirstApprovedTestExecutionTrials();
  const model: FirstApprovedTestExecutionTrialModel = {
    title: "First approved test execution trial",
    summary: "",
    testExecutionTrials,
    boundary: buildFirstApprovedTestExecutionTrialBoundary(),
    language: [...FIRST_APPROVED_TEST_EXECUTION_TRIAL_LANGUAGE],
    advancedDetails: [
      "First approved test execution trial",
      "First approved test execution identity",
      "Test trial groups",
      "Approved command checklist",
      "Workspace scope checklist",
      "Timeout/logging checklist",
      "Evidence/result checklist",
      "Denied test execution actions",
      "Unresolved test execution blockers",
      "First real end-to-end workflow trial plan route",
      "End-to-end evidence review route",
      "Next recommended action",
      "First approved test execution trial does not run tests from UI",
      "Test execution requires explicit operator approval at the boundary",
      "Unapproved test execution paths remain blocked",
      "advanced test execution trial details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeFirstApprovedTestExecutionTrial(model) };
}
