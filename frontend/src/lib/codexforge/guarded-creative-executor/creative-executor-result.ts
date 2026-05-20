import type {
  CreativeExecutorPolicy,
  CreativeExecutorPreflight,
  CreativeExecutorRequest,
  CreativeExecutorResult,
  CreativeExecutorResultItem,
  CreativeExecutorResultStatus,
} from "./guarded-creative-executor-types";
import { buildCreativeExecutorStableId } from "./guarded-creative-executor-types";
import { buildCreativeExecutorPolicy } from "./creative-executor-policy";
import { buildCreativeExecutorPreflight } from "./creative-executor-preflight";
import { buildCreativeExecutorRequest } from "./creative-executor-request";

export function buildCreativeExecutorResultItem(input: CreativeExecutorResultItem): CreativeExecutorResultItem {
  return input;
}

function determineStatus(policy: CreativeExecutorPolicy, preflight: CreativeExecutorPreflight): CreativeExecutorResultStatus {
  if (!policy.dryRunAllowed) return "policy-blocked";
  if (!preflight.passed) return "preflight-failed";
  if (policy.requestReady) return "request-ready";
  return "dry-run-complete";
}

export function buildCreativeExecutorResult(input: {
  request?: CreativeExecutorRequest;
  policy?: CreativeExecutorPolicy;
  preflight?: CreativeExecutorPreflight;
} = {}): CreativeExecutorResult {
  const request = input.request ?? buildCreativeExecutorRequest();
  const policy = input.policy ?? buildCreativeExecutorPolicy({ request });
  const preflight = input.preflight ?? buildCreativeExecutorPreflight({ request });
  const status = determineStatus(policy, preflight);
  const items = [
    buildCreativeExecutorResultItem({
      itemId: buildCreativeExecutorStableId("result-item", [request.requestId, "dry-run"]),
      label: "Dry-run result",
      status: policy.dryRunAllowed ? "dry-run-complete" : "policy-blocked",
      detail: "Dry-run reports plan readiness only and does not fabricate execution success.",
    }),
    buildCreativeExecutorResultItem({
      itemId: buildCreativeExecutorStableId("result-item", [request.requestId, "execution"]),
      label: "Execution result",
      status: policy.executionAllowed ? "unknown" : "execution-disabled",
      detail: "Result does not fabricate execution success; execution is disabled in Phase 67.",
    }),
  ];

  return {
    resultId: buildCreativeExecutorStableId("creative-executor-result", [request.requestId]),
    requestId: request.requestId,
    status,
    items,
    executionSuccessClaimed: false,
    summary: summarizeCreativeExecutorResult({ status, items, executionSuccessClaimed: false }),
  };
}

export function summarizeCreativeExecutorResult(result: Pick<CreativeExecutorResult, "status" | "items" | "executionSuccessClaimed">): string[] {
  return [
    `Result status: ${result.status}.`,
    `Execution success claimed: ${String(result.executionSuccessClaimed)}.`,
    `${result.items.length} result items visible.`,
    "Only dry-run or request-ready statuses can be reported until a future safe executor exists.",
  ];
}
