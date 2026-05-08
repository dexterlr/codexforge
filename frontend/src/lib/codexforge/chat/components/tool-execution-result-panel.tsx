import type { CodexForgeToolExecutionEvent } from "@/lib/codexforge/chat/tool-execution-events";

type JsonRecord = Record<string, unknown>;

export type ToolExecutionResultPanelProps = {
  retryResult?: unknown;
  executionEvent?: CodexForgeToolExecutionEvent | null;
};

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as JsonRecord)
    : {};
}

function asRecordArray(value: unknown): JsonRecord[] {
  return Array.isArray(value)
    ? value.filter((item): item is JsonRecord => Boolean(item) && typeof item === "object" && !Array.isArray(item))
    : [];
}

function hasKey(value: JsonRecord, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(value, key);
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


function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function isWebResearchResult(value: JsonRecord): boolean {
  return (
    asString(value.version).includes("web-research-executor") ||
    asString(value.mode) === "source-fetch" ||
    asString(value.mode) === "research-plan-only" ||
    Array.isArray(value.citations) ||
    Array.isArray(value.sourceResults)
  );
}

function WebResearchResultEvidence({ payload }: { payload: JsonRecord }) {
  const citations = asArray(payload.citations).map(asRecord);
  const sourceResults = asArray(payload.sourceResults).map(asRecord);
  const sourceCount =
    typeof payload.sourceCount === "number" && Number.isFinite(payload.sourceCount)
      ? payload.sourceCount
      : sourceResults.length;
  const citationCount = citations.length;
  const mode = asString(payload.mode, "unknown");
  const query = asString(payload.query, "-");
  const nextAction = asString(payload.nextAction, "-");
  const firstFetchedAt = asString(
    citations[0]?.fetchedAt ?? sourceResults[0]?.fetchedAt,
    "-"
  );

  return (
    <section
      className="mt-4 rounded-2xl border border-sky-300/20 bg-sky-400/10 p-4 text-xs text-sky-50"
      data-codexforge-web-research-result="true"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h5 className="text-sm font-semibold">Web research evidence</h5>
          <p className="mt-1 text-sky-100/80">
            Approved source-scoped research returned citation metadata and source excerpts.
          </p>
        </div>
        <span
          className="rounded-full border border-sky-200/20 bg-sky-200/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]"
          data-codexforge-web-research-mode="true"
        >
          {mode}
        </span>
      </div>

      <dl className="mt-4 grid gap-2 sm:grid-cols-2">
        <div data-codexforge-web-research-query="true">
          <dt className="font-semibold text-sky-100/70">Query</dt>
          <dd className="break-words">{query}</dd>
        </div>
        <div data-codexforge-web-research-freshness="true">
          <dt className="font-semibold text-sky-100/70">Freshness</dt>
          <dd>{firstFetchedAt}</dd>
        </div>
        <div data-codexforge-web-research-source-count="true">
          <dt className="font-semibold text-sky-100/70">Sources</dt>
          <dd>{sourceCount}</dd>
        </div>
        <div data-codexforge-web-research-citation-count="true">
          <dt className="font-semibold text-sky-100/70">Citations</dt>
          <dd>{citationCount}</dd>
        </div>
      </dl>


      {citations.length > 0 ? (
        <div className="mt-4" data-codexforge-web-research-citations="true">
          <p className="font-semibold text-sky-100/80">Captured citations</p>
          <ul className="mt-2 space-y-2">
            {citations.slice(0, 5).map((citation, index) => {
              const url = asString(citation.url, "-");
              const title = asString(citation.title, url);
              const fetchedAt = asString(citation.fetchedAt, "-");

              return (
                <li
                  key={`${url}-${index}`}
                  className="rounded-xl border border-white/10 bg-black/15 p-3"
                  data-codexforge-web-research-citation="true"
                >
                  <p className="font-semibold">{title}</p>
                  <p className="mt-1 break-all text-sky-100/70">{url}</p>
                  <p className="mt-1 text-sky-100/60">Fetched: {fetchedAt}</p>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}

      {sourceResults.length > 0 ? (
        <div className="mt-4" data-codexforge-web-research-sources="true">
          <p className="font-semibold text-sky-100/80">Source excerpts</p>
          <ul className="mt-2 space-y-2">
            {sourceResults.slice(0, 3).map((source, index) => {
              const url = asString(source.url, "-");
              const title = asString(source.title, url);
              const excerpt = asString(source.excerpt, "-");
              const status = asString(source.status, "-");

              return (
                <li
                  key={`${url}-${index}`}
                  className="rounded-xl border border-white/10 bg-black/15 p-3"
                  data-codexforge-web-research-source="true"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold">{title}</p>
                    <span className="text-sky-100/60">HTTP {status}</span>
                  </div>
                  <p className="mt-1 break-all text-sky-100/70">{url}</p>
                  <p className="mt-2 text-sky-50/85">{excerpt}</p>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}

      <div
        className="mt-4 rounded-xl border border-white/10 bg-black/15 p-3"
        data-codexforge-web-research-next-action="true"
      >
        <span className="font-semibold">Next action: </span>
        <span>{nextAction}</span>
      </div>
    </section>
  );
}

export function ToolExecutionResultPanel({
  retryResult,
  executionEvent,
}: ToolExecutionResultPanelProps) {
  const retry = asRecord(executionEvent?.retryResult ?? retryResult);
  const body = asRecord(retry.body ?? retry.Body);
  const result = asRecord(body.result);
  const meta = asRecord(body.meta);
  const toolPolicy = asRecord(body.toolPolicy);
  const toolPolicySummary = asRecord(body.toolPolicySummary);

  const content = asRecord(result.content);
  const contentJson = asRecord(content.json);
  const visibleContentJson = executionEvent?.contentJson ?? contentJson;
  const webResearchResult = isWebResearchResult(visibleContentJson) ? visibleContentJson : null;
  const job = asRecord(result.job);
  const resultMetadata = asRecord(result.metadata);

  const toolName = asString(
    meta.toolName ?? toolPolicy.toolName ?? toolPolicySummary.toolName,
    "unknown tool"
  );
  const resultStatus = executionEvent?.ok === true || result.ok === true || body.ok === true ? "Succeeded" : "Unknown";
  const approvalId = asString(
    meta.approvalId ?? toolPolicy.approvalId ?? toolPolicySummary.approvalId
  );
  const policySource = executionEvent?.policySource ?? asString(meta.policySource ?? toolPolicy.source);
  const approvalSatisfied = executionEvent?.approvalSatisfied ?? meta.approvalSatisfied ?? toolPolicy.approvalSatisfied;
  const resultSummary = executionEvent?.resultSummary ?? asString(result.summary);
  const jobId = executionEvent?.job.id ?? asString(job.id);
  const jobStage = executionEvent?.job.stage ?? asString(job.stage);
  const jobMessage = executionEvent?.job.message ?? asString(job.message);
  const adapter = executionEvent?.metadata.adapter ?? asString(resultMetadata.adapter ?? contentJson.adapter);
  const executionMode = executionEvent?.executionMode ?? asString(contentJson.executionMode);
  const sideEffect = executionEvent?.sideEffect ?? asString(contentJson.sideEffect);

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
      {webResearchResult ? <WebResearchResultEvidence payload={webResearchResult} /> : null}
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
          {stringifyJson(visibleContentJson)}
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
