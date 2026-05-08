type JsonRecord = Record<string, unknown>;

export type ToolExecutionResultPanelProps = {
  retryResult?: unknown;
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

function asBooleanLabel(value: unknown): string {
  return value === true ? "Yes" : value === false ? "No" : "-";
}

function stringifyJson(value: unknown): string {
  if (value === undefined || value === null) {
    return "-";
  }

  if (typeof value === "string") {
    return value;
  }

  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

export function ToolExecutionResultPanel({
  retryResult,
}: ToolExecutionResultPanelProps) {
  const retry = asRecord(retryResult);
  const body = asRecord(retry.body ?? retry.Body);
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
  const resultStatus = result.ok === true || body.ok === true ? "Succeeded" : "Unknown";
  const approvalId = asString(
    meta.approvalId ?? toolPolicy.approvalId ?? toolPolicySummary.approvalId
  );
  const policySource = asString(meta.policySource ?? toolPolicy.source);
  const approvalSatisfied = meta.approvalSatisfied ?? toolPolicy.approvalSatisfied;
  const resultSummary = asString(result.summary);
  const jobId = asString(job.id);
  const jobStage = asString(job.stage);
  const jobMessage = asString(job.message);
  const adapter = asString(resultMetadata.adapter ?? contentJson.adapter);
  const executionMode = asString(contentJson.executionMode);
  const sideEffect = asString(contentJson.sideEffect);

  const hasExecutionResult =
    body.ok === true &&
    result &&
    Object.keys(result).length > 0 &&
    result.ok === true;

  if (!hasExecutionResult) {
    return null;
  }

  return (
    <section
      data-codexforge-tool-execution-result-panel
      className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 shadow-sm"
    >
      <div className="flex flex-col gap-1">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
          Tool execution result
        </p>
        <h4 className="text-sm font-semibold text-white">
          {toolName} - {resultStatus}
        </h4>
        <p className="text-xs text-slate-300">
          Approved replay completed through the CodexForge tool-policy guard.
        </p>
      </div>

      <dl className="mt-4 grid gap-2 text-xs text-slate-200 sm:grid-cols-2">
        <div data-codexforge-tool-execution-approval-id>
          <dt className="font-semibold text-slate-400">Approval id</dt>
          <dd className="break-all">{approvalId}</dd>
        </div>
        <div data-codexforge-tool-execution-policy-source>
          <dt className="font-semibold text-slate-400">Policy source</dt>
          <dd>{policySource}</dd>
        </div>
        <div data-codexforge-tool-execution-approval-satisfied>
          <dt className="font-semibold text-slate-400">Approval satisfied</dt>
          <dd>{asBooleanLabel(approvalSatisfied)}</dd>
        </div>
        <div data-codexforge-tool-execution-adapter>
          <dt className="font-semibold text-slate-400">Adapter</dt>
          <dd>{adapter}</dd>
        </div>
        <div data-codexforge-tool-execution-mode>
          <dt className="font-semibold text-slate-400">Execution mode</dt>
          <dd>{executionMode}</dd>
        </div>
        <div data-codexforge-tool-execution-side-effect>
          <dt className="font-semibold text-slate-400">sideEffect</dt>
          <dd>{sideEffect}</dd>
        </div>
        <div data-codexforge-tool-execution-job-stage>
          <dt className="font-semibold text-slate-400">Job stage</dt>
          <dd>{jobStage}</dd>
        </div>
        <div data-codexforge-tool-execution-job-id>
          <dt className="font-semibold text-slate-400">Job id</dt>
          <dd className="break-all">{jobId}</dd>
        </div>
      </dl>

      <div
        data-codexforge-tool-execution-result-summary
        className="mt-4 rounded-xl border border-white/10 bg-black/20 p-3 text-xs text-slate-200"
      >
        <p className="font-semibold text-slate-400">Result summary</p>
        <p className="mt-1">{resultSummary}</p>
        {jobMessage !== "-" ? (
          <p className="mt-2 text-slate-300">Job message: {jobMessage}</p>
        ) : null}
      </div>

      <div
        data-codexforge-tool-execution-content-json
        className="mt-3 rounded-xl border border-white/10 bg-black/30 p-3"
      >
        <p className="text-xs font-semibold text-slate-400">Content JSON summary</p>
        <pre className="mt-2 max-h-64 overflow-auto whitespace-pre-wrap break-words text-xs text-slate-200">
          {stringifyJson(contentJson)}
        </pre>
      </div>

      {adapter === "local-safe-render-job" ||
      executionMode === "local-safe-simulated" ||
      sideEffect === "none" ? (
        <div
          data-codexforge-tool-execution-local-safe
          className="mt-3 rounded-xl border border-cyan-400/30 bg-cyan-400/10 p-3 text-xs text-cyan-100"
        >
          Local-safe simulated execution. No side effects were performed.
        </div>
      ) : null}
    </section>
  );
}
