import type {
  TestFailureTriage,
  TestFailureTriageRouterBoundary,
  TestFailureTriageRouterModel,
} from "./test-failure-triage-router-types";
import { buildTestFailureTriageRouterStableKey } from "./test-failure-triage-router-types";

export const TEST_FAILURE_TRIAGE_ROUTER_LANGUAGE = [
  "Test failure triage router",
  "Triage does not auto-fix failures",
  "Retry is never automatic",
  "No commands are run automatically",
  "Likely cause category",
  "Recovery handoff",
] as const;

export function buildTestFailureTriage(
  input: Omit<TestFailureTriage, "id"> & { idHint: string }
): TestFailureTriage {
  const { idHint, ...triage } = input;
  return {
    id: buildTestFailureTriageRouterStableKey(
      "test-failure-triage-router",
      idHint,
      input.likelyCauseCategory,
      input.severity
    ),
    ...triage,
  };
}

export function buildTestFailureTriages(): TestFailureTriage[] {
  return [
    buildTestFailureTriage({
      idHint: "failed-regression-review",
      failureIdentity:
        "Failure identity: failed test result routed from a reviewed test result summary.",
      sourceTestResult:
        "Source test result: /test-result-summary supplies status, command summary, output summary, and failure summary.",
      likelyCauseCategory: "test regression",
      severity: "high",
      safeNextAction:
        "Safe next action: review the failure, compare it with the patch result, and prepare a new codebase change plan if the failure points to code.",
      recommendedRoute:
        "Recommended route: /codebase-change-plan for a reviewed follow-up plan, or /review-inbox when the result needs disposition first.",
      retryEligibility: "eligible after review",
      blockedRetryReasons: [
        "Retry is never automatic",
        "No commands are run automatically",
        "Approval is required before any test run",
      ],
      patchPlanningRoute:
        "Patch planning route: /codebase-change-plan prepares follow-up work without applying patches.",
      recoveryHandoff:
        "Recovery handoff: /recovery receives rollback, retry, or manual investigation notes without auto-fix behavior.",
      advancedTriageDetails:
        "Advanced triage details: this router does not auto-fix failures, retry automatically, execute commands, apply patches, mutate files, call providers, or promote memory.",
    }),
    buildTestFailureTriage({
      idHint: "blocked-timeout-review",
      failureIdentity:
        "Failure identity: blocked or timed-out test result that needs boundary review.",
      sourceTestResult:
        "Source test result: timed out or blocked result from /test-result-summary.",
      likelyCauseCategory: "timeout",
      severity: "medium",
      safeNextAction:
        "Safe next action: review timeout policy, command scope, and workspace trust before considering a smaller command plan.",
      recommendedRoute:
        "Recommended route: /test-command-planner to prepare a smaller reviewed test command plan.",
      retryEligibility: "blocked",
      blockedRetryReasons: [
        "Timeout policy needs review",
        "Future execution remains behind approved local boundary",
        "Retry is never automatic",
      ],
      patchPlanningRoute:
        "Patch planning route: /patch-preview-workbench remains available only for reviewed patch context.",
      recoveryHandoff:
        "Recovery handoff: /recovery captures blocked retry reasons and manual next steps.",
      advancedTriageDetails:
        "Advanced triage details: blocked retries stay review-only and cannot trigger local execution or hidden mutation.",
    }),
  ];
}

export function buildTestFailureTriageRouterBoundary(): TestFailureTriageRouterBoundary {
  return {
    triageAutoFixAllowed: false,
    retryAutomaticAllowed: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    testsRunFromPageAllowed: false,
    patchApplyAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    providerApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    secretValuesDisplayedAllowed: false,
    credentialStorageAllowed: false,
    providerRegistryMutationAllowed: false,
    routerPolicyMutationAllowed: false,
    memoryAutoPromotionAllowed: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    brainGraphMutationAllowed: false,
    packageInstallAllowedFromUi: false,
  };
}

export function summarizeTestFailureTriageRouter(
  model: Pick<TestFailureTriageRouterModel, "triageItems">
): string {
  return `Test failure triage router prepares ${model.triageItems.length} failure triage route shape(s). Triage does not auto-fix failures, retry is never automatic, and no commands are run automatically.`;
}

export function buildTestFailureTriageRouterModel(): TestFailureTriageRouterModel {
  const triageItems = buildTestFailureTriages();
  const model: TestFailureTriageRouterModel = {
    title: "Test failure triage router",
    summary: "",
    triageItems,
    boundary: buildTestFailureTriageRouterBoundary(),
    triageLanguage: [...TEST_FAILURE_TRIAGE_ROUTER_LANGUAGE],
    advancedDetails: [
      "Test failure triage router",
      "Triage does not auto-fix failures",
      "Retry is never automatic",
      "No commands are run automatically",
      "Failure identity",
      "Source test result",
      "Likely cause category",
      "Severity",
      "Safe next action",
      "Recommended route",
      "Retry eligibility",
      "Blocked retry reasons",
      "Patch planning route",
      "Recovery handoff",
      "Approved local boundary required",
      "Advanced triage details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizeTestFailureTriageRouter(model) };
}
