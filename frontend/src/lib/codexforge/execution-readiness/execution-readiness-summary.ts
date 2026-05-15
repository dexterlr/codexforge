import { buildExecutionApprovalReadiness } from "./execution-approval-readiness";
import { buildExecutionReadinessPolicy, isExecutionReadinessAllowed } from "./execution-readiness-policy";
import { buildExecutionRiskReadiness } from "./execution-risk-readiness";
import { buildExecutionStepPreflight } from "./execution-step-preflight";
import { buildExecutionTestReadiness } from "./execution-test-readiness";
import { buildExecutionToolReadiness } from "./execution-tool-readiness";
import {
  type ExecutionReadinessInput,
  type ExecutionReadinessSummary,
} from "./execution-readiness-types";

export function buildExecutionReadinessSummary(
  input: ExecutionReadinessInput
): ExecutionReadinessSummary {
  const policy = buildExecutionReadinessPolicy(input);
  const stepPreflight = buildExecutionStepPreflight({ input, policy });
  const toolReadiness = buildExecutionToolReadiness(input);
  const riskReadiness = buildExecutionRiskReadiness(input);
  const testReadiness = buildExecutionTestReadiness(input);
  const approvalReadiness = buildExecutionApprovalReadiness({
    input,
    policy,
    toolReadiness,
    testReadiness,
  });
  const draft: ExecutionReadinessSummary = {
    id: "execution-readiness-summary",
    input,
    policy,
    stepPreflight,
    toolReadiness,
    riskReadiness,
    testReadiness,
    approvalReadiness,
    readinessAllowed: isExecutionReadinessAllowed(policy),
    executionAllowed: false,
    summary: [],
  };

  return {
    ...draft,
    summary: summarizeExecutionReadinessSummary(draft),
  };
}

export function summarizeExecutionReadinessSummary(
  summary: ExecutionReadinessSummary
): string[] {
  return [
    summary.readinessAllowed
      ? "Execution readiness can be reviewed."
      : "Execution readiness is blocked by policy.",
    "execution blocked until approval",
    `${summary.stepPreflight.items.length} step preflights, ${summary.toolReadiness.tools.length} tool postures, ${summary.testReadiness.tests.length} suggested checks, and ${summary.approvalReadiness.activeStates.length} approval states are visible.`,
    "This phase does not execute tasks, run commands, mutate files, or mutate Brain graph state.",
  ];
}
