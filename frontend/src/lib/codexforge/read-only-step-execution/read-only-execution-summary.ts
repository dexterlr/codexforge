import { buildReadOnlyEvidence } from "./read-only-evidence";
import { buildReadOnlyExecutionLedger } from "./read-only-execution-ledger";
import { buildReadOnlyExecutionPolicy, isReadOnlyExecutionAllowed } from "./read-only-execution-policy";
import { buildReadOnlyExecutionRequest } from "./read-only-execution-request";
import { buildReadOnlyExecutionResult } from "./read-only-execution-result";
import { buildReadOnlyToolRoute } from "./read-only-tool-router";
import type {
  ReadOnlyExecutionRequest,
  ReadOnlyExecutionRequestDraft,
  ReadOnlyExecutionResult,
  ReadOnlyExecutionSummary,
} from "./read-only-execution-types";

export function buildReadOnlyExecutionSummary(
  input: ReadOnlyExecutionRequest | ReadOnlyExecutionRequestDraft = {}
): ReadOnlyExecutionSummary {
  const request =
    "requestId" in input ? input : buildReadOnlyExecutionRequest(input);
  const policy = buildReadOnlyExecutionPolicy(request);
  const route = buildReadOnlyToolRoute(request);
  const result: ReadOnlyExecutionResult = buildReadOnlyExecutionResult({
    request,
    route,
    status: policy.allowed && route.allowed ? "pending" : "blocked",
    ok: false,
    summary:
      policy.allowed && route.allowed
        ? "Read-only execution is ready for an explicit button click."
        : "Read-only execution is blocked before tool dispatch.",
    errorMessage:
      policy.allowed && route.allowed ? null : policy.blockedReasons.join(" "),
  });
  const evidence = buildReadOnlyEvidence({ request, result });
  const ledger = buildReadOnlyExecutionLedger({ request, policy, route, result });
  const summary: ReadOnlyExecutionSummary = {
    id: "read-only-execution-summary",
    request,
    policy,
    route,
    result,
    evidence,
    ledger,
    executionAllowed: isReadOnlyExecutionAllowed(policy) && route.allowed,
    summary: [],
  };

  return {
    ...summary,
    summary: summarizeReadOnlyExecutionSummary(summary),
  };
}

export function summarizeReadOnlyExecutionSummary(
  summary: ReadOnlyExecutionSummary
): string[] {
  return [
    summary.executionAllowed
      ? "Approved read-only step execution is ready for an explicit operator click."
      : "Read-only step execution remains blocked.",
    `Tool ${summary.route.toolName} is ${summary.route.toolClass}; result status is ${summary.result.status}.`,
    `${summary.evidence.items.length} evidence item(s) and ${summary.ledger.items.length} ledger item(s) are visible.`,
    "Read-only execution only; Mutation tools remain blocked; explicit approval required; no file mutation.",
  ];
}
