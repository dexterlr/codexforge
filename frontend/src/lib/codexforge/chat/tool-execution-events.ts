export const MAX_TOOL_EXECUTION_EVENTS = 8;

type JsonRecord = Record<string, unknown>;

export type CodexForgeToolExecutionEvent = {
  id: string;
  createdAt: number;
  toolName: string;
  ok: boolean;
  status: number;
  approvalId: string;
  approvalSatisfied: boolean;
  policySource: string;
  resultSummary: string;
  contentJson: JsonRecord;
  job: {
    id: string;
    stage: string;
    message: string;
  };
  metadata: {
    adapter: string;
  };
  executionMode: string;
  sideEffect: string;
  localSafe: boolean;
  retryResult: unknown;
};

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as JsonRecord)
    : {};
}

function asString(value: unknown, fallback = "-"): string {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : fallback;
}

function getRetryStatus(value: unknown): number {
  const retry = asRecord(value);
  return typeof retry.status === "number" && Number.isFinite(retry.status)
    ? retry.status
    : 0;
}

export function isSuccessfulCodexForgeToolExecutionRetryResult(
  retryResult: unknown
): boolean {
  const retry = asRecord(retryResult);
  const body = asRecord(retry.body);
  const result = asRecord(body.result);

  return (
    retry.kind === "accepted" &&
    retry.ok === true &&
    body.ok === true &&
    result.ok === true
  );
}

export function buildCodexForgeToolExecutionEventFromRetryResult(
  retryResult: unknown,
  nowMs = Date.now()
): CodexForgeToolExecutionEvent | null {
  if (!isSuccessfulCodexForgeToolExecutionRetryResult(retryResult)) {
    return null;
  }

  const retry = asRecord(retryResult);
  const body = asRecord(retry.body);
  const result = asRecord(body.result);
  const meta = asRecord(body.meta);
  const toolPolicy = asRecord(body.toolPolicy);
  const toolPolicySummary = asRecord(body.toolPolicySummary);

  const content = asRecord(result.content);
  const contentJson = asRecord(content.json);
  const job = asRecord(result.job);
  const resultMetadata = asRecord(result.metadata);

  const toolName = asString(
    meta.toolName ?? toolPolicy.toolName ?? toolPolicySummary.toolName,
    "unknown tool"
  );
  const approvalId = asString(
    meta.approvalId ?? toolPolicy.approvalId ?? toolPolicySummary.approvalId
  );
  const policySource = asString(meta.policySource ?? toolPolicy.source);
  const approvalSatisfied =
    meta.approvalSatisfied === true ||
    toolPolicy.approvalSatisfied === true ||
    toolPolicySummary.approvalSatisfied === true;
  const resultSummary = asString(result.summary);
  const adapter = asString(resultMetadata.adapter ?? contentJson.adapter);
  const executionMode = asString(contentJson.executionMode);
  const sideEffect = asString(contentJson.sideEffect);

  return {
    id: `${toolName}:${approvalId}:${nowMs}`,
    createdAt: nowMs,
    toolName,
    ok: true,
    status: getRetryStatus(retryResult),
    approvalId,
    policySource,
    approvalSatisfied,
    resultSummary,
    contentJson,
    job: {
      id: asString(job.id),
      stage: asString(job.stage),
      message: asString(job.message),
    },
    metadata: {
      adapter,
    },
    executionMode,
    sideEffect,
    localSafe:
      adapter === "local-safe-render-job" ||
      executionMode === "local-safe-simulated" ||
      sideEffect === "none",
    retryResult,
  };
}
