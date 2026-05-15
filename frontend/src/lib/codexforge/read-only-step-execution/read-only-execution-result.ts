import {
  buildReadOnlyExecutionStableKey,
  fingerprintReadOnlyInput,
  uniqueReadOnlyExecutionStrings,
  type ReadOnlyExecutionRequest,
  type ReadOnlyExecutionResult,
  type ReadOnlyExecutionStatus,
  type ReadOnlyMatchedLine,
  type ReadOnlyToolRoute,
} from "./read-only-execution-types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function asString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function asNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
}

function getContentJson(record: Record<string, unknown> | null): Record<string, unknown> {
  const content = isRecord(record?.content) ? record.content : null;
  const json = isRecord(content?.json) ? content.json : null;
  return json ?? {};
}

function warningMessages(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (typeof item === "string") return item.trim();
      if (!isRecord(item)) return "";
      return asString(item.message) ?? asString(item.code) ?? "";
    })
    .filter(Boolean);
}

function errorMessage(value: unknown): string | null {
  if (typeof value === "string") return value.trim() || null;
  if (!isRecord(value)) return null;
  return asString(value.message) ?? asString(value.error) ?? null;
}

function collectReadFileEvidence(contentJson: Record<string, unknown>): {
  snippets: string[];
  paths: string[];
  lines: ReadOnlyMatchedLine[];
} {
  const path =
    asString(contentJson.relativePath) ??
    asString(contentJson.requestedPath) ??
    asString(contentJson.absolutePath);
  const content = asString(contentJson.content);
  const snippets = content ? content.split(/\r?\n/).slice(0, 8) : [];

  return {
    snippets,
    paths: path ? [path] : [],
    lines: snippets.map((preview, index) => ({
      id: buildReadOnlyExecutionStableKey("read-only-read-line", path, index + 1),
      path: path ?? "unknown-path",
      line: index + 1,
      preview,
      matchText: null,
    })),
  };
}

function collectListFilesEvidence(contentJson: Record<string, unknown>): {
  snippets: string[];
  paths: string[];
  lines: ReadOnlyMatchedLine[];
} {
  const entries = Array.isArray(contentJson.entries) ? contentJson.entries : [];
  const paths = entries
    .map((entry) => (isRecord(entry) ? asString(entry.path) : null))
    .filter((item): item is string => !!item)
    .slice(0, 30);

  return {
    snippets: paths.slice(0, 10),
    paths,
    lines: [],
  };
}

function collectSearchEvidence(contentJson: Record<string, unknown>): {
  snippets: string[];
  paths: string[];
  lines: ReadOnlyMatchedLine[];
} {
  const results = Array.isArray(contentJson.results) ? contentJson.results : [];
  const matchedLines = results
    .map((item) => {
      if (!isRecord(item)) return null;
      const path = asString(item.relativePath) ?? asString(item.absolutePath);
      if (!path) return null;
      const line = asNumber(item.line);
      const preview = asString(item.preview) ?? "";
      const matchText = asString(item.matchText);
      return {
        id: buildReadOnlyExecutionStableKey(
          "read-only-search-match",
          path,
          line ?? "filename",
          matchText ?? preview
        ),
        path,
        line,
        preview,
        matchText,
      };
    })
    .filter((item): item is ReadOnlyMatchedLine => item !== null)
    .slice(0, 40);

  return {
    snippets: matchedLines.slice(0, 10).map((line) => line.preview || line.path),
    paths: uniqueReadOnlyExecutionStrings(matchedLines.map((line) => line.path)),
    lines: matchedLines,
  };
}

function collectSnapshotEvidence(contentJson: Record<string, unknown>): {
  snippets: string[];
  paths: string[];
  lines: ReadOnlyMatchedLine[];
} {
  const files = Array.isArray(contentJson.files) ? contentJson.files : [];
  const snapshotId = asString(contentJson.snapshotId);
  const paths = files
    .map((file) => (isRecord(file) ? asString(file.relativePath) : null))
    .filter((item): item is string => !!item)
    .slice(0, 30);

  return {
    snippets: uniqueReadOnlyExecutionStrings([snapshotId ? `snapshot ${snapshotId}` : "", ...paths.slice(0, 8)]),
    paths,
    lines: [],
  };
}

function collectEvidenceByTool(toolName: string, contentJson: Record<string, unknown>) {
  if (toolName === "read-file") return collectReadFileEvidence(contentJson);
  if (toolName === "list-files") return collectListFilesEvidence(contentJson);
  if (toolName === "search-project") return collectSearchEvidence(contentJson);
  if (toolName === "snapshot-project") return collectSnapshotEvidence(contentJson);
  return { snippets: [], paths: [], lines: [] };
}

function buildResultId(args: {
  requestId: string;
  toolName: string;
  status: ReadOnlyExecutionStatus;
  summary: string;
  evidenceSnippets: string[];
  filePaths: string[];
  warnings: string[];
  errorMessage: string | null;
}): string {
  return buildReadOnlyExecutionStableKey(
    "read-only-result",
    args.requestId,
    args.toolName,
    args.status,
    fingerprintReadOnlyInput({
      summary: args.summary,
      evidenceSnippets: args.evidenceSnippets,
      filePaths: args.filePaths,
      warnings: args.warnings,
      errorMessage: args.errorMessage,
    })
  );
}

export function buildReadOnlyExecutionResult(args: {
  request: ReadOnlyExecutionRequest;
  route?: ReadOnlyToolRoute | null;
  status?: ReadOnlyExecutionStatus;
  ok?: boolean;
  summary?: string;
  evidenceSnippets?: string[];
  filePaths?: string[];
  matchedLines?: ReadOnlyMatchedLine[];
  warnings?: string[];
  errorMessage?: string | null;
  nextSafeAction?: string;
  raw?: unknown;
}): ReadOnlyExecutionResult {
  const status = args.status ?? "pending";
  const ok = args.ok ?? status === "completed";
  const summary =
    args.summary ??
    (status === "pending"
      ? "Read-only execution has not run."
      : status === "blocked"
        ? "Read-only execution is blocked by policy."
        : "Read-only execution result captured.");
  const evidenceSnippets = args.evidenceSnippets ?? [];
  const filePaths = uniqueReadOnlyExecutionStrings(args.filePaths ?? []);
  const matchedLines = args.matchedLines ?? [];
  const warnings = uniqueReadOnlyExecutionStrings(args.warnings ?? []);
  const error = args.errorMessage ?? null;
  const result: ReadOnlyExecutionResult = {
    id: buildResultId({
      requestId: args.request.requestId,
      toolName: args.route?.toolName ?? args.request.selectedReadOnlyTool,
      status,
      summary,
      evidenceSnippets,
      filePaths,
      warnings,
      errorMessage: error,
    }),
    requestId: args.request.requestId,
    toolName: args.route?.toolName ?? args.request.selectedReadOnlyTool,
    ok,
    status,
    summary,
    evidenceSnippets,
    filePaths,
    matchedLines,
    warnings,
    errorMessage: error,
    nextSafeAction:
      args.nextSafeAction ??
      (status === "completed"
        ? "Review captured evidence before selecting any next step."
        : "Fix the request, approval, or tool input before retrying."),
    raw: args.raw ?? null,
  };

  return result;
}

export function normalizeReadOnlyExecutionResult(args: {
  request: ReadOnlyExecutionRequest;
  route?: ReadOnlyToolRoute | null;
  raw: unknown;
}): ReadOnlyExecutionResult {
  if (!args.raw) {
    return buildReadOnlyExecutionResult({
      request: args.request,
      route: args.route,
      status: "pending",
      raw: null,
    });
  }

  const response = isRecord(args.raw) ? args.raw : null;
  const routeResult = isRecord(response?.result) ? response.result : response;
  const toolName =
    asString(routeResult?.toolName) ??
    asString(response?.toolName) ??
    args.route?.toolName ??
    args.request.selectedReadOnlyTool;
  const responseOk = response?.ok === true;
  const resultOk = routeResult?.ok === true;
  const summary =
    asString(routeResult?.summary) ??
    asString(response?.error) ??
    asString(response?.summary) ??
    "Read-only execution response captured.";
  const status: ReadOnlyExecutionStatus =
    responseOk && resultOk
      ? "completed"
      : response?.ok === false &&
          (response?.meta && isRecord(response.meta) && response.meta.blocked === true)
        ? "blocked"
        : resultOk
          ? "completed"
          : "failed";
  const contentJson = getContentJson(routeResult);
  const collected = collectEvidenceByTool(toolName, contentJson);
  const routeWarnings = warningMessages(routeResult?.warnings);
  const error =
    errorMessage(routeResult?.error) ??
    errorMessage(response?.error) ??
    (status === "failed" || status === "blocked" ? summary : null);

  return buildReadOnlyExecutionResult({
    request: args.request,
    route: args.route,
    status,
    ok: status === "completed",
    summary,
    evidenceSnippets: collected.snippets,
    filePaths: uniqueReadOnlyExecutionStrings([
      ...collected.paths,
      ...asStringArray(contentJson.filePaths),
    ]),
    matchedLines: collected.lines,
    warnings: routeWarnings,
    errorMessage: error,
    nextSafeAction:
      status === "completed"
        ? "Review evidence and keep mutation tools blocked."
        : "Keep the step blocked and revise the read-only request.",
    raw: args.raw,
  });
}

export function summarizeReadOnlyExecutionResult(
  result: ReadOnlyExecutionResult
): string[] {
  return [
    `Result ${result.status} for ${result.toolName}.`,
    `${result.filePaths.length} file path(s), ${result.matchedLines.length} matched line(s), and ${result.evidenceSnippets.length} snippet(s) captured.`,
    result.errorMessage ? `Error: ${result.errorMessage}` : "No error message captured.",
  ];
}
