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
    hasKey(value, "groundedContext") ||
    hasKey(value, "memoryCandidates") ||
    hasKey(value, "sourceResults")
  );
}

function WebResearchResultEvidence({ payload }: { payload: JsonRecord }) {
  const groundedContext = asRecord(payload.groundedContext);
  const sourceResults = asRecordArray(payload.sourceResults);
  const citations = asRecordArray(payload.citations);
  const memoryCandidates = asRecordArray(payload.memoryCandidates);
  const evidenceDigest = Array.isArray(groundedContext.evidenceDigest)
    ? groundedContext.evidenceDigest.map((item) => asString(item)).filter(Boolean)
    : [];

  const summary = asString(
    groundedContext.summary,
    "Approved web research evidence is available for review."
  );
  const latestFetchedAt =
    asString(citations[0]?.fetchedAt) ||
    asString(sourceResults[0]?.fetchedAt) ||
    "No source fetched yet";
  const webResearchNextAction = asString(
    payload.nextAction,
    "Review the captured evidence, citations, source excerpts, and memory candidates before using them in a grounded answer."
  );

  return (
    <section
      className="mt-4 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-xs text-cyan-50"
      data-codexforge-web-research-result="true"
      data-codexforge-web-research-evidence="true"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">Web research evidence</p>
          <p className="mt-1 text-cyan-100/80" data-codexforge-web-research-grounded-summary="true">
            {summary}
          </p>
        </div>
        <div className="rounded-full border border-cyan-200/20 bg-cyan-200/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-100">
          {asString(payload.mode, "research")} - {asString(payload.sourceCount, "0")} sources
        </div>
      </div>

      <dl className="mt-4 grid gap-2 sm:grid-cols-4">
        <div data-codexforge-web-research-source-count="true">
          <dt className="font-semibold text-cyan-100/70">Sources</dt>
          <dd>{asString(groundedContext.sourceCount ?? payload.sourceCount, "0")}</dd>
        </div>
        <div data-codexforge-web-research-citation-count="true">
          <dt className="font-semibold text-cyan-100/70">Citations</dt>
          <dd>{asString(groundedContext.citationCount ?? citations.length, "0")}</dd>
        </div>
        <div data-codexforge-web-research-excerpt-count="true">
          <dt className="font-semibold text-cyan-100/70">Evidence excerpts</dt>
          <dd>{asString(groundedContext.excerptCount ?? evidenceDigest.length, "0")}</dd>
        </div>
        <div data-codexforge-web-research-memory-count="true">
          <dt className="font-semibold text-cyan-100/70">Memory candidates</dt>
          <dd>{asString(groundedContext.memoryCandidateCount ?? memoryCandidates.length, "0")}</dd>
        </div>
        <div data-codexforge-web-research-freshness="true">
          <dt className="font-semibold text-cyan-100/70">Freshness</dt>
          <dd>{latestFetchedAt}</dd>
        </div>
      </dl>

      <div
        className="mt-4 rounded-xl border border-white/10 bg-black/15 p-3"
        data-codexforge-web-research-next-action="true"
      >
        <p className="font-semibold text-cyan-100">Next action</p>
        <p className="mt-1 text-cyan-50/85">{webResearchNextAction}</p>
      </div>
      {evidenceDigest.length > 0 ? (
        <div className="mt-4" data-codexforge-web-research-evidence-digest="true">
          <p className="font-semibold text-cyan-100">Evidence digest</p>
          <ul className="mt-2 space-y-2">
            {evidenceDigest.map((item, index) => (
              <li key={`${item}-${index}`} className="rounded-xl border border-white/10 bg-black/15 p-3 text-cyan-50/90">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {citations.length > 0 ? (
        <div className="mt-4" data-codexforge-web-research-citations="true">
          <p className="font-semibold text-cyan-100">Citations</p>
          <ul className="mt-2 space-y-2">
            {citations.map((citation, index) => (
              <li key={`${asString(citation.url)}-${index}`} className="rounded-xl border border-white/10 bg-black/15 p-3">
                <p className="font-semibold">{asString(citation.title, "Untitled source")}</p>
                <p className="mt-1 break-all text-cyan-100/75">{asString(citation.url)}</p>
                <p className="mt-1 text-cyan-100/60">{asString(citation.fetchedAt)}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {memoryCandidates.length > 0 ? (
        <div className="mt-4" data-codexforge-web-research-memory-candidates="true">
          <p className="font-semibold text-cyan-100">Memory candidate review</p>
          <p className="mt-1 text-cyan-100/70">
            Review-only. CodexForge does not persist these research memories automatically.
          </p>
          <ul className="mt-2 space-y-2">
            {memoryCandidates.map((candidate, index) => (
              <li key={`${asString(candidate.id)}-${index}`} className="rounded-xl border border-white/10 bg-black/15 p-3">
                <p className="font-semibold">{asString(candidate.title, "Research memory candidate")}</p>
                <p className="mt-1 text-cyan-50/85">{asString(candidate.content)}</p>
                <p className="mt-1 break-all text-cyan-100/60">{asString(candidate.sourceUrl)}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {sourceResults.length > 0 ? (
        <div className="mt-4" data-codexforge-web-research-source-results="true" data-codexforge-web-research-sources="true">
          <p className="font-semibold text-cyan-100">Source fetch results</p>
          <ul className="mt-2 space-y-2">
            {sourceResults.map((source, index) => (
              <li key={`${asString(source.url)}-${index}`} className="rounded-xl border border-white/10 bg-black/15 p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold">{asString(source.title, "Source")}</p>
                  <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em]">
                    {source.ok === true ? "ok" : "failed"} - {asString(source.status, "0")}
                  </span>
                </div>
                <p className="mt-1 break-all text-cyan-100/60">{asString(source.url)}</p>
                <p className="mt-2 text-cyan-50/85">{asString(source.excerpt)}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
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

      {webResearchResult ? <WebResearchResultEvidence payload={webResearchResult} /> : null}


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
