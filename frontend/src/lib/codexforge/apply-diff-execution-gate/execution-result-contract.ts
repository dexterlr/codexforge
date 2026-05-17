import {
  buildApplyDiffExecutionGateStableKey,
  uniqueApplyDiffExecutionGateStrings,
  type ApplyExecutionResultContract,
  type ApplyExecutionResultContractSource,
} from "./apply-execution-gate-types";

export function buildApplyExecutionResultContract(
  source: ApplyExecutionResultContractSource
): ApplyExecutionResultContract {
  const status = source.status ?? "not-requested";
  const requestId = String(source.requestId || "missing-request").trim();

  return normalizeApplyExecutionResultContract({
    id: source.resultId ?? `apply-diff-execution-result:${buildApplyDiffExecutionGateStableKey(requestId, status)}`,
    requestId,
    ok: source.ok === true && status === "completed",
    status,
    summary: uniqueApplyDiffExecutionGateStrings(
      source.summary ?? [
        status === "completed"
          ? "Guarded apply-diff execution completed according to the bridge result."
          : status === "request-ready"
            ? "Request packet is ready, but no mutation has been dispatched."
            : "No successful mutation is claimed.",
      ]
    ),
    changedFiles: uniqueApplyDiffExecutionGateStrings(source.changedFiles ?? []),
    warnings: uniqueApplyDiffExecutionGateStrings(source.warnings ?? []),
    errors: uniqueApplyDiffExecutionGateStrings(source.errors ?? []),
    verificationNextSteps: uniqueApplyDiffExecutionGateStrings(source.verificationNextSteps ?? []),
    rollbackNextSteps: uniqueApplyDiffExecutionGateStrings(source.rollbackNextSteps ?? []),
    evidenceRefs: uniqueApplyDiffExecutionGateStrings(source.evidenceRefs ?? []),
  });
}

export function normalizeApplyExecutionResultContract(
  result: ApplyExecutionResultContract
): ApplyExecutionResultContract {
  return {
    ...result,
    ok: result.ok === true && result.status === "completed",
    summary: uniqueApplyDiffExecutionGateStrings(result.summary),
    changedFiles: uniqueApplyDiffExecutionGateStrings(result.changedFiles),
    warnings: uniqueApplyDiffExecutionGateStrings(result.warnings),
    errors: uniqueApplyDiffExecutionGateStrings(result.errors),
    verificationNextSteps: uniqueApplyDiffExecutionGateStrings(result.verificationNextSteps),
    rollbackNextSteps: uniqueApplyDiffExecutionGateStrings(result.rollbackNextSteps),
    evidenceRefs: uniqueApplyDiffExecutionGateStrings(result.evidenceRefs),
  };
}

export function summarizeApplyExecutionResultContract(result: ApplyExecutionResultContract): string[] {
  return [
    `Result contract ${result.id}: status=${result.status}; ok=${result.ok}.`,
    `${result.changedFiles.length} changed file(s) reported by the bridge.`,
    `${result.errors.length} error(s), ${result.warnings.length} warning(s).`,
    "Completed is shown only when the guarded bridge reports success.",
  ];
}
