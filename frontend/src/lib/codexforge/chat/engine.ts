import type {
  CodexForgeChatContext,
  CodexForgeStructuredReply,
  CodexForgeMessage,
} from "../types";
import { getCodexForgeEngineDependencies } from "./dependencies";
import type {
  CodexForgeEngineAnalysis,
  CodexForgeEngineDependencies,
  CodexForgeEngineReply,
} from "./contracts";
import {
  analyze,
  buildPlan,
  buildWarnings,
} from "./engine-analysis";
import { persistBrainGraph } from "./engine-graph";
import { buildStructured, structuredToText } from "./engine-render";
import { mergeWarnings } from "./engine-shared";

/* ================= CONSTANTS ================= */

const SAFE_EXECUTION_CANDIDATE_TOOLS = [
  "read-file",
  "list-files",
  "search-project",
] as const;

const MAX_TOOL_RESULT_PATHS = 6;
const MAX_TOOL_RESULT_LINES = 4;
const MAX_TOOL_RESULT_PREVIEW = 160;
const MAX_GROUNDED_NOTES = 4;
const MAX_MULTI_FILE_MATCHES = 3;

/* ================= TYPES ================= */

type SafeToolName = (typeof SAFE_EXECUTION_CANDIDATE_TOOLS)[number];

type SafeToolPlan = {
  toolName: SafeToolName;
  reason: string;
  input: Record<string, unknown>;
};

type GroundedFileCandidate = {
  path: string;
  line?: number;
  preview?: string;
  role?: string;
  editPoint?: string;
  signals: string[];
  relatedPaths: string[];
  source: "search-match" | "read-file";
  priority: number;
};

type SafeToolGrounding = {
  matchedFile?: string;
  matchedLine?: number;
  fileRoleSummary?: string;
  likelyEditPoint?: string;
  relatedPaths: string[];
  contentSignals: string[];
  candidateFiles: GroundedFileCandidate[];
};

type SafeToolOutcome =
  | {
      status: "executed";
      toolName: SafeToolName;
      reason: string;
      summary: string;
      detailLines: string[];
      fileHints: string[];
      warnings: string[];
      source: "primary" | "follow-up";
      grounding?: SafeToolGrounding;
    }
  | {
      status: "skipped";
      warnings: string[];
    }
  | {
      status: "failed";
      toolName: SafeToolName;
      reason: string;
      summary: string;
      warnings: string[];
    };

type SearchProjectBestMatch = {
  relativePath: string;
  line?: number;
  preview?: string;
};

type SearchProjectMatch = {
  relativePath: string;
  line?: number;
  preview?: string;
};

/* ================= GENERIC HELPERS ================= */

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : undefined;
}

function clampText(text: string, max = MAX_TOOL_RESULT_PREVIEW): string {
  return text.length <= max ? text : `${text.slice(0, max - 1)}…`;
}

function dedupeStrings(values: string[]): string[] {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

function lower(value: string): string {
  return value.toLowerCase();
}

function normalizeSlashes(value: string): string {
  return value.replace(/\\/g, "/");
}

function splitPathSegments(path: string): string[] {
  return normalizeSlashes(path)
    .split("/")
    .map((segment) => segment.trim())
    .filter(Boolean);
}

function getParentPath(path: string): string | undefined {
  const parts = splitPathSegments(path);
  if (parts.length <= 1) return undefined;
  return parts.slice(0, -1).join("/");
}

function getFileName(path: string): string {
  const parts = splitPathSegments(path);
  return parts[parts.length - 1] ?? path;
}

function getFileStem(path: string): string {
  const fileName = getFileName(path);
  const lastDot = fileName.lastIndexOf(".");
  return lastDot > 0 ? fileName.slice(0, lastDot) : fileName;
}

function getFileExtension(path: string): string | undefined {
  const fileName = getFileName(path);
  const lastDot = fileName.lastIndexOf(".");
  return lastDot > 0 ? fileName.slice(lastDot + 1).toLowerCase() : undefined;
}

function scorePathSpecificity(path: string): number {
  const normalized = normalizeSlashes(path);
  const depth = splitPathSegments(normalized).length;
  let score = depth * 10;

  if (normalized.includes("/src/")) score += 25;
  if (normalized.includes("/lib/")) score += 20;
  if (normalized.includes("/app/")) score += 20;
  if (normalized.includes("/api/")) score += 18;
  if (normalized.endsWith(".ts")) score += 8;
  if (normalized.endsWith(".tsx")) score += 10;
  if (normalized.endsWith("/index.ts")) score -= 6;

  return score;
}

function dedupeByKey<T>(
  values: T[],
  getKey: (value: T) => string
): T[] {
  const seen = new Set<string>();
  const deduped: T[] = [];

  for (const value of values) {
    const key = getKey(value);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    deduped.push(value);
  }

  return deduped;
}

function getExecutableToolNames(
  deps: CodexForgeEngineDependencies
): string[] {
  return deps.toolExecution?.getExecutableToolNames() ?? [];
}

function getSafeExecutableToolNames(
  deps: CodexForgeEngineDependencies
): SafeToolName[] {
  const executable = new Set(getExecutableToolNames(deps));
  return SAFE_EXECUTION_CANDIDATE_TOOLS.filter((toolName) =>
    executable.has(toolName)
  );
}

function hasExecutionRequest(context: CodexForgeChatContext): boolean {
  return context.executionRequest?.mode === "execute-task-step";
}

function hasActiveExecutionPhase(context: CodexForgeChatContext): boolean {
  return (
    !!context.execution?.enginePhase &&
    context.execution.enginePhase !== "idle"
  );
}

function buildToolContext(context: CodexForgeChatContext) {
  return {
    repoPath: context.repoPath,
    cwd: context.repoPath ?? context.workspaceRoot,
    workspaceRoot: context.workspaceRoot,
  };
}

/* ================= QUERY / PATH EXTRACTION ================= */

function extractQuotedSegments(text: string): string[] {
  const matches = text.match(/`([^`]+)`|"([^"]+)"|'([^']+)'/g) ?? [];
  return matches
    .map((match) => match.replace(/^["'`]|["'`]$/g, "").trim())
    .filter(Boolean);
}

function looksLikePath(value: string): boolean {
  const normalized = normalizeSlashes(value);
  return (
    normalized.includes("/") ||
    normalized.includes(".") ||
    normalized.startsWith("src") ||
    normalized.startsWith("app") ||
    normalized.startsWith("lib") ||
    normalized.startsWith("components") ||
    normalized.startsWith("pages") ||
    normalized.startsWith("api")
  );
}

function extractPathCandidate(text: string): string | undefined {
  const quoted = extractQuotedSegments(text).find(looksLikePath);
  if (quoted) return quoted;

  const tokenMatch = text.match(
    /(?:[A-Za-z0-9_.-]+[\\/])+[A-Za-z0-9_.-]+|[A-Za-z0-9_.-]+\.[A-Za-z0-9_.-]+/
  );

  const token = tokenMatch?.[0]?.trim();
  return token && looksLikePath(token) ? token : undefined;
}

function extractDirectoryCandidate(text: string): string | undefined {
  const pathCandidate = extractPathCandidate(text);
  if (!pathCandidate) return undefined;

  const normalized = normalizeSlashes(pathCandidate);
  if (!normalized.includes("/")) {
    return normalized.includes(".") ? undefined : normalized;
  }

  const parts = normalized.split("/");
  const last = parts[parts.length - 1];
  if (last.includes(".")) {
    parts.pop();
  }

  return parts.length > 0 ? parts.join("/") : undefined;
}

function stripLeadingIntentWords(text: string): string {
  return text
    .replace(/^\/[a-zA-Z_-]+\s*/, "")
    .replace(
      /^(find|search|look\s+for|grep|where\s+is|where\s+are|show|read|open|inspect|list)\s+/i,
      ""
    )
    .replace(/\s+/g, " ")
    .trim();
}

function extractSearchQuery(text: string): string {
  const quoted = extractQuotedSegments(text).find(
    (segment) => !looksLikePath(segment)
  );
  if (quoted) return quoted;

  const stripped = stripLeadingIntentWords(text);
  return stripped.length > 0 ? stripped : text.trim();
}

/* ================= TOOL SELECTION ================= */

function shouldAutoInspectRepo(
  analysis: CodexForgeEngineAnalysis,
  context: CodexForgeChatContext
): boolean {
  if (!analysis.lastUserMessage || !analysis.userText.trim()) {
    return false;
  }

  if (hasExecutionRequest(context) || hasActiveExecutionPhase(context)) {
    return false;
  }

  const query = lower(analysis.userText);

  return (
    query.includes("read ") ||
    query.includes("open ") ||
    query.includes("show ") ||
    query.includes("inspect ") ||
    query.includes("list ") ||
    query.includes("tree ") ||
    query.includes("files") ||
    query.includes("folders") ||
    query.includes("search ") ||
    query.includes("find ") ||
    query.includes("where is") ||
    query.includes("where are") ||
    query.includes("grep") ||
    query.includes("contains") ||
    query.includes("symbol") ||
    query.includes("reference")
  );
}

function buildSafeToolPlan(
  analysis: CodexForgeEngineAnalysis,
  context: CodexForgeChatContext,
  deps: CodexForgeEngineDependencies
): SafeToolPlan | null {
  if (!deps.toolExecution) {
    return null;
  }

  const safeTools = new Set(getSafeExecutableToolNames(deps));
  if (safeTools.size === 0) {
    return null;
  }

  if (!shouldAutoInspectRepo(analysis, context)) {
    return null;
  }

  const query = lower(analysis.userText);
  const explicitPath = extractPathCandidate(analysis.userText);
  const explicitDirectory = extractDirectoryCandidate(analysis.userText);
  const searchQuery = extractSearchQuery(analysis.userText);

  const wantsRead =
    query.includes("read ") ||
    query.includes("open ") ||
    query.includes("show file") ||
    query.includes("inspect file") ||
    query.includes("view file");

  const wantsList =
    query.includes("list ") ||
    query.includes("tree ") ||
    query.includes("files") ||
    query.includes("folders") ||
    query.includes("directory");

  const wantsSearch =
    query.includes("search ") ||
    query.includes("find ") ||
    query.includes("where is") ||
    query.includes("where are") ||
    query.includes("grep") ||
    query.includes("contains") ||
    query.includes("symbol") ||
    query.includes("reference");

  if (wantsRead && explicitPath && safeTools.has("read-file")) {
    return {
      toolName: "read-file",
      reason: `User asked to inspect a specific file (${explicitPath}).`,
      input: {
        path: explicitPath,
      },
    };
  }

  if (wantsList && safeTools.has("list-files")) {
    return {
      toolName: "list-files",
      reason: explicitDirectory
        ? `User asked to inspect folder contents (${explicitDirectory}).`
        : "User asked to list files or folders.",
      input: {
        ...(explicitDirectory ? { path: explicitDirectory } : {}),
        recursive: true,
      },
    };
  }

  if (wantsSearch && searchQuery && safeTools.has("search-project")) {
    return {
      toolName: "search-project",
      reason: `User asked to search the repository for "${searchQuery}".`,
      input: {
        query: searchQuery,
      },
    };
  }

  if (explicitPath && safeTools.has("read-file")) {
    return {
      toolName: "read-file",
      reason: `A specific path was detected (${explicitPath}).`,
      input: {
        path: explicitPath,
      },
    };
  }

  if (searchQuery && safeTools.has("search-project")) {
    return {
      toolName: "search-project",
      reason: `A repository search query was inferred ("${searchQuery}").`,
      input: {
        query: searchQuery,
      },
    };
  }

  return null;
}

/* ================= TOOL RESULT PARSING ================= */

function extractResultSummary(result: unknown): string | undefined {
  const record = asRecord(result);
  return (
    asString(record?.summary) ??
    asString(record?.message) ??
    asString(record?.error)
  );
}

function extractJsonPayload(result: unknown): Record<string, unknown> | null {
  const record = asRecord(result);
  const content = asRecord(record?.content);
  const json = asRecord(content?.json);
  return json;
}

function extractFileHintsFromJson(json: Record<string, unknown> | null): string[] {
  if (!json) return [];

  const hints: string[] = [];

  const results = Array.isArray(json.results) ? json.results : [];
  for (const item of results) {
    const record = asRecord(item);
    const relativePath = asString(record?.relativePath);
    const filePath = asString(record?.filePath);
    const path = relativePath ?? filePath;
    if (path) {
      hints.push(path);
    }
  }

  const entries = Array.isArray(json.entries) ? json.entries : [];
  for (const item of entries) {
    const record = asRecord(item);
    const relativePath = asString(record?.relativePath);
    const path = relativePath ?? asString(record?.path) ?? asString(record?.name);
    if (path) {
      hints.push(path);
    }
  }

  return dedupeStrings(hints).slice(0, MAX_TOOL_RESULT_PATHS);
}

function extractDetailLinesFromJson(
  toolName: SafeToolName,
  json: Record<string, unknown> | null
): string[] {
  if (!json) return [];

  if (toolName === "search-project") {
    const results = Array.isArray(json.results) ? json.results : [];
    return results
      .map((item) => {
        const record = asRecord(item);
        if (!record) return null;

        const relativePath = asString(record.relativePath);
        const line = record.line;
        const preview = asString(record.preview);

        if (!relativePath) return null;

        const linePart =
          typeof line === "number" && Number.isFinite(line) ? `:${line}` : "";
        const previewPart = preview ? ` — ${clampText(preview)}` : "";

        return `${relativePath}${linePart}${previewPart}`;
      })
      .filter((item): item is string => !!item)
      .slice(0, MAX_TOOL_RESULT_LINES);
  }

  if (toolName === "list-files") {
    const entries = Array.isArray(json.entries) ? json.entries : [];
    return entries
      .map((item) => {
        const record = asRecord(item);
        if (!record) return null;

        const relativePath =
          asString(record.relativePath) ??
          asString(record.path) ??
          asString(record.name);

        const type = asString(record.type);
        if (!relativePath) return null;

        return type ? `${relativePath} (${type})` : relativePath;
      })
      .filter((item): item is string => !!item)
      .slice(0, MAX_TOOL_RESULT_LINES);
  }

  if (toolName === "read-file") {
    const raw = asRecord(json.raw);
    const preview =
      asString(json.preview) ??
      asString(json.text) ??
      asString(raw?.text) ??
      asString(raw?.content);

    return preview ? [clampText(preview)] : [];
  }

  return [];
}

function resultLooksSuccessful(result: unknown): boolean {
  const record = asRecord(result);
  const error = asRecord(record?.error);
  return !error;
}

function extractBestSearchProjectMatch(
  json: Record<string, unknown> | null
): SearchProjectBestMatch | null {
  if (!json) return null;

  const results = Array.isArray(json.results) ? json.results : [];
  for (const item of results) {
    const record = asRecord(item);
    if (!record) continue;

    const relativePath = asString(record.relativePath);
    if (!relativePath) continue;

    const line =
      typeof record.line === "number" && Number.isFinite(record.line)
        ? record.line
        : undefined;

    const preview = asString(record.preview);

    return {
      relativePath,
      ...(line !== undefined ? { line } : {}),
      ...(preview ? { preview } : {}),
    };
  }

  return null;
}

function extractSearchProjectMatches(
  json: Record<string, unknown> | null
): SearchProjectMatch[] {
  if (!json) return [];

  const results = Array.isArray(json.results) ? json.results : [];

  return results
    .map((item) => {
      const record = asRecord(item);
      if (!record) return null;

      const relativePath = asString(record.relativePath);
      if (!relativePath) return null;

      const line =
        typeof record.line === "number" && Number.isFinite(record.line)
          ? record.line
          : undefined;

      const preview = asString(record.preview);

      return {
        relativePath,
        ...(line !== undefined ? { line } : {}),
        ...(preview ? { preview } : {}),
      };
    })
    .filter((match): match is SearchProjectMatch => match !== null)
    .slice(0, MAX_MULTI_FILE_MATCHES);
}

/* ================= GROUNDED READ SUMMARIES ================= */

function inferFileRoleSummary(path: string, content: string): string | undefined {
  const normalizedPath = lower(normalizeSlashes(path));
  const contentLower = lower(content);
  const extension = getFileExtension(path);

  if (
    normalizedPath.includes("/api/") ||
    contentLower.includes("nextr") ||
    contentLower.includes("nextresponse")
  ) {
    return "This looks like an API or route surface.";
  }

  if (
    normalizedPath.includes("/components/") ||
    normalizedPath.endsWith(".tsx")
  ) {
    return "This looks like a UI/component surface.";
  }

  if (
    normalizedPath.includes("/hooks/") ||
    normalizedPath.includes("use-")
  ) {
    return "This looks like a hook or reusable state surface.";
  }

  if (
    normalizedPath.includes("/types") ||
    normalizedPath.endsWith(".d.ts")
  ) {
    return "This looks like a shared typing or contract surface.";
  }

  if (
    normalizedPath.includes("/chat/engine") ||
    contentLower.includes("buildstructured") ||
    contentLower.includes("structuredtotext")
  ) {
    return "This looks like a core engine orchestration surface.";
  }

  if (normalizedPath.includes("/brain/")) {
    return "This looks like a brain or memory orchestration surface.";
  }

  if (normalizedPath.includes("/tools/")) {
    return "This looks like a tool adapter or execution surface.";
  }

  if (extension === "ts") {
    return "This looks like a TypeScript logic module.";
  }

  return undefined;
}

function inferLikelyEditPoint(path: string, content: string): string | undefined {
  const contentLower = lower(content);

  if (contentLower.includes("export async function")) {
    return "The next likely edit point is an exported async flow in this file.";
  }

  if (contentLower.includes("export function")) {
    return "The next likely edit point is one of the exported functions in this file.";
  }

  if (contentLower.includes("class ")) {
    return "The next likely edit point is the main class implementation in this file.";
  }

  if (
    contentLower.includes("buildstructured(") ||
    contentLower.includes("structuredtotext(")
  ) {
    return "The next likely edit point is the structured rendering path.";
  }

  if (
    contentLower.includes("analyze(") ||
    contentLower.includes("buildplan(")
  ) {
    return "The next likely edit point is the analysis or planning path.";
  }

  if (
    contentLower.includes("execute") ||
    contentLower.includes("toolexecution")
  ) {
    return "The next likely edit point is the tool execution path.";
  }

  const parent = getParentPath(path);
  if (parent) {
    return `The next likely edit point is near ${parent}.`;
  }

  return undefined;
}

function inferRelatedPaths(path: string): string[] {
  const normalizedPath = normalizeSlashes(path);
  const parent = getParentPath(normalizedPath);
  const stem = getFileStem(normalizedPath);

  return dedupeStrings([
    parent ? `${parent}` : "",
    parent ? `${parent}/index.ts` : "",
    parent ? `${parent}/${stem}.ts` : "",
    parent ? `${parent}/${stem}.tsx` : "",
  ])
    .filter((candidate) => candidate !== normalizedPath)
    .slice(0, MAX_TOOL_RESULT_PATHS);
}

function extractContentSignals(content: string): string[] {
  const lines = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const candidates = lines.filter((line) => {
    const lowered = lower(line);
    return (
      lowered.startsWith("export ") ||
      lowered.startsWith("async function ") ||
      lowered.startsWith("function ") ||
      lowered.startsWith("const ") ||
      lowered.startsWith("class ") ||
      lowered.startsWith("type ") ||
      lowered.startsWith("interface ")
    );
  });

  return candidates
    .slice(0, MAX_GROUNDED_NOTES)
    .map((line) => clampText(line));
}

function createGroundedFileCandidate(args: {
  path: string;
  source: "search-match" | "read-file";
  line?: number;
  preview?: string;
  content?: string;
}): GroundedFileCandidate {
  const content = args.content ?? "";
  const role = inferFileRoleSummary(args.path, content);
  const editPoint = inferLikelyEditPoint(args.path, content);

  const signals = dedupeStrings([
    ...(args.preview ? [clampText(args.preview)] : []),
    ...extractContentSignals(content),
  ]).slice(0, MAX_GROUNDED_NOTES);

  let priority = scorePathSpecificity(args.path);
  if (args.source === "read-file") priority += 100;
  if (args.line !== undefined) priority += 10;
  if (role) priority += 8;
  if (editPoint) priority += 8;
  priority += signals.length * 3;

  return {
    path: args.path,
    source: args.source,
    ...(args.line !== undefined ? { line: args.line } : {}),
    ...(args.preview ? { preview: clampText(args.preview) } : {}),
    ...(role ? { role } : {}),
    ...(editPoint ? { editPoint } : {}),
    signals,
    relatedPaths: inferRelatedPaths(args.path),
    priority,
  };
}

function normalizeGroundedCandidates(
  candidates: GroundedFileCandidate[]
): GroundedFileCandidate[] {
  return dedupeByKey(
    [...candidates].sort((a, b) => b.priority - a.priority),
    (candidate) => normalizeSlashes(candidate.path).toLowerCase()
  ).slice(0, MAX_MULTI_FILE_MATCHES);
}

function extractReadFileGrounding(
  path: string,
  json: Record<string, unknown> | null
): SafeToolGrounding | undefined {
  if (!json) return undefined;

  const raw = asRecord(json.raw);
  const text =
    asString(json.text) ??
    asString(json.preview) ??
    asString(raw?.text) ??
    asString(raw?.content);

  const matchedFile = path.trim();
  const content = text ?? "";

  const primaryCandidate = createGroundedFileCandidate({
    path: matchedFile,
    source: "read-file",
    content,
    preview: asString(json.preview),
  });

  const grounding: SafeToolGrounding = {
    matchedFile,
    candidateFiles: [primaryCandidate],
    relatedPaths: primaryCandidate.relatedPaths,
    contentSignals: primaryCandidate.signals,
  };

  if (primaryCandidate.role) {
    grounding.fileRoleSummary = primaryCandidate.role;
  }

  if (primaryCandidate.editPoint) {
    grounding.likelyEditPoint = primaryCandidate.editPoint;
  }

  return grounding;
}

function extractSearchProjectGrounding(
  json: Record<string, unknown> | null
): SafeToolGrounding | undefined {
  const matches = extractSearchProjectMatches(json);
  if (matches.length === 0) return undefined;

  const candidates = normalizeGroundedCandidates(
    matches.map((match) =>
      createGroundedFileCandidate({
        path: match.relativePath,
        source: "search-match",
        line: match.line,
        preview: match.preview,
      })
    )
  );

  const primary = candidates[0];
  if (!primary) return undefined;

  return {
    matchedFile: primary.path,
    ...(primary.line !== undefined ? { matchedLine: primary.line } : {}),
    ...(primary.role ? { fileRoleSummary: primary.role } : {}),
    ...(primary.editPoint ? { likelyEditPoint: primary.editPoint } : {}),
    relatedPaths: dedupeStrings(
      candidates.flatMap((candidate) => candidate.relatedPaths)
    ).slice(0, MAX_TOOL_RESULT_PATHS),
    contentSignals: dedupeStrings(
      candidates.flatMap((candidate) => candidate.signals)
    ).slice(0, MAX_GROUNDED_NOTES),
    candidateFiles: candidates,
  };
}

function mergeGroundings(
  existing: SafeToolGrounding | undefined,
  incoming: SafeToolGrounding | undefined
): SafeToolGrounding | undefined {
  if (!existing) return incoming;
  if (!incoming) return existing;

  const candidateFiles = normalizeGroundedCandidates([
    ...(existing.candidateFiles ?? []),
    ...(incoming.candidateFiles ?? []),
  ]);

  const primary = candidateFiles[0];

  return {
    matchedFile: primary?.path ?? existing.matchedFile ?? incoming.matchedFile,
    matchedLine:
      primary?.line ??
      existing.matchedLine ??
      incoming.matchedLine,
    fileRoleSummary:
      primary?.role ??
      existing.fileRoleSummary ??
      incoming.fileRoleSummary,
    likelyEditPoint:
      primary?.editPoint ??
      existing.likelyEditPoint ??
      incoming.likelyEditPoint,
    relatedPaths: dedupeStrings([
      ...(existing.relatedPaths ?? []),
      ...(incoming.relatedPaths ?? []),
      ...candidateFiles.flatMap((candidate) => candidate.relatedPaths),
    ]).slice(0, MAX_TOOL_RESULT_PATHS),
    contentSignals: dedupeStrings([
      ...(existing.contentSignals ?? []),
      ...(incoming.contentSignals ?? []),
      ...candidateFiles.flatMap((candidate) => candidate.signals),
    ]).slice(0, MAX_GROUNDED_NOTES),
    candidateFiles,
  };
}

/* ================= TOOL EXECUTION ================= */

async function executeToolWithAdapter(
  deps: CodexForgeEngineDependencies,
  toolName: SafeToolName,
  input: Record<string, unknown>,
  context: CodexForgeChatContext,
  reason: string,
  source: "primary" | "follow-up"
): Promise<{
  result: unknown;
  outcome: SafeToolOutcome;
  json: Record<string, unknown> | null;
}> {
  try {
    const result = await deps.toolExecution!.execute({
      toolName,
      input,
      context: buildToolContext(context),
    });

    const summary =
      extractResultSummary(result) ??
      `${toolName} executed successfully.`;

    const json = extractJsonPayload(result);
    const fileHints = extractFileHintsFromJson(json);
    const detailLines = extractDetailLinesFromJson(toolName, json);

    if (!resultLooksSuccessful(result)) {
      return {
        result,
        json,
        outcome: {
          status: "failed",
          toolName,
          reason,
          summary,
          warnings: [`${toolName} failed: ${summary}`],
        },
      };
    }

    const matchedFile =
      toolName === "read-file"
        ? asString(input.path)
        : toolName === "search-project"
          ? extractBestSearchProjectMatch(json)?.relativePath
          : undefined;

    const grounding =
      toolName === "read-file" && matchedFile
        ? extractReadFileGrounding(matchedFile, json)
        : toolName === "search-project"
          ? extractSearchProjectGrounding(json)
          : undefined;

    return {
      result,
      json,
      outcome: {
        status: "executed",
        toolName,
        reason,
        summary,
        detailLines,
        fileHints,
        warnings: [],
        source,
        ...(grounding ? { grounding } : {}),
      },
    };
  } catch (error) {
    const message =
      error instanceof Error && error.message.trim().length > 0
        ? error.message.trim()
        : "Unexpected tool execution failure.";

    return {
      result: null,
      json: null,
      outcome: {
        status: "failed",
        toolName,
        reason,
        summary: message,
        warnings: [`${toolName} failed: ${message}`],
      },
    };
  }
}

async function maybeRunFollowUpReadFile(
  deps: CodexForgeEngineDependencies,
  context: CodexForgeChatContext,
  primaryPlan: SafeToolPlan,
  primaryJson: Record<string, unknown> | null
): Promise<SafeToolOutcome | null> {
  if (primaryPlan.toolName !== "search-project") {
    return null;
  }

  if (hasExecutionRequest(context) || hasActiveExecutionPhase(context)) {
    return null;
  }

  if (!deps.toolExecution?.canExecute("read-file")) {
    return null;
  }

  const bestMatch = extractBestSearchProjectMatch(primaryJson);
  if (!bestMatch?.relativePath) {
    return null;
  }

  const followUpReason = `Follow-up read of strongest search match (${bestMatch.relativePath}).`;

  const followUp = await executeToolWithAdapter(
    deps,
    "read-file",
    { path: bestMatch.relativePath },
    context,
    followUpReason,
    "follow-up"
  );

  if (followUp.outcome.status === "executed" && primaryJson) {
    const primaryGrounding = extractSearchProjectGrounding(primaryJson);
    followUp.outcome.grounding = mergeGroundings(
      primaryGrounding,
      followUp.outcome.grounding
    );
  }

  return followUp.outcome;
}

async function executeSafeToolPass(
  analysis: CodexForgeEngineAnalysis,
  context: CodexForgeChatContext,
  deps: CodexForgeEngineDependencies
): Promise<SafeToolOutcome[]> {
  if (!deps.toolExecution) {
    return [
      {
        status: "skipped",
        warnings: [
          "Tool execution adapter is not attached. Engine is running in planning-only mode.",
        ],
      },
    ];
  }

  const executableToolNames = getExecutableToolNames(deps);
  if (executableToolNames.length === 0) {
    return [
      {
        status: "skipped",
        warnings: [
          "Tool execution adapter is attached but no executable tools are available.",
        ],
      },
    ];
  }

  const safeExecutableToolNames = getSafeExecutableToolNames(deps);
  if (safeExecutableToolNames.length === 0) {
    return [
      {
        status: "skipped",
        warnings: [
          "Executable tools are available, but no safe read/search tools are currently exposed.",
        ],
      },
    ];
  }

  const plan = buildSafeToolPlan(analysis, context, deps);
  if (!plan) {
    return [
      {
        status: "skipped",
        warnings: [],
      },
    ];
  }

  const primary = await executeToolWithAdapter(
    deps,
    plan.toolName,
    plan.input,
    context,
    plan.reason,
    "primary"
  );

  const outcomes: SafeToolOutcome[] = [primary.outcome];

  if (primary.outcome.status === "executed") {
    const followUpOutcome = await maybeRunFollowUpReadFile(
      deps,
      context,
      plan,
      primary.json
    );

    if (followUpOutcome) {
      outcomes.push(followUpOutcome);
    }
  }

  return outcomes;
}

/* ================= STRUCTURED ENRICHMENT ================= */

function buildGroundingContextLines(
  outcome: Extract<SafeToolOutcome, { status: "executed" }>
): string[] {
  const grounding = outcome.grounding;
  if (!grounding) return [];

  const supportingFiles = (grounding.candidateFiles ?? [])
    .slice(1)
    .map((candidate) => candidate.path);

  return dedupeStrings([
    grounding.matchedFile ? `Best grounded file: ${grounding.matchedFile}` : "",
    grounding.matchedLine !== undefined
      ? `Best grounded line: ${grounding.matchedLine}`
      : "",
    grounding.fileRoleSummary ?? "",
    grounding.likelyEditPoint ?? "",
    ...supportingFiles.map((path, index) => `Supporting file ${index + 1}: ${path}`),
  ]);
}

function buildGroundingSectionItems(
  outcome: Extract<SafeToolOutcome, { status: "executed" }>
): string[] {
  const grounding = outcome.grounding;
  if (!grounding) return [];

  const candidateItems = (grounding.candidateFiles ?? []).flatMap(
    (candidate, index) => {
      const prefix =
        index === 0
          ? "Primary file"
          : `Related file ${index}`;

      return dedupeStrings([
        `${prefix}: ${candidate.path}`,
        candidate.line !== undefined ? `${prefix} line: ${candidate.line}` : "",
        candidate.role ? `${prefix} role: ${candidate.role}` : "",
        candidate.editPoint ? `${prefix} edit point: ${candidate.editPoint}` : "",
        ...candidate.signals.map((signal) => `${prefix} signal: ${signal}`),
      ]);
    }
  );

  return dedupeStrings([
    grounding.matchedFile ? `Matched file: ${grounding.matchedFile}` : "",
    grounding.matchedLine !== undefined
      ? `Matched line: ${grounding.matchedLine}`
      : "",
    grounding.fileRoleSummary ?? "",
    grounding.likelyEditPoint ?? "",
    ...candidateItems,
    ...grounding.relatedPaths.map((path) => `Related path: ${path}`),
  ]).slice(0, MAX_TOOL_RESULT_LINES + MAX_GROUNDED_NOTES + 6);
}

function enrichStructuredWithToolOutcomes(
  structured: CodexForgeStructuredReply,
  outcomes: SafeToolOutcome[]
): CodexForgeStructuredReply {
  const executedOutcomes = outcomes.filter(
    (outcome): outcome is Extract<SafeToolOutcome, { status: "executed" }> =>
      outcome.status === "executed"
  );

  if (executedOutcomes.length === 0) {
    return structured;
  }

  const mergedCandidates = normalizeGroundedCandidates(
    executedOutcomes.flatMap((outcome) => outcome.grounding?.candidateFiles ?? [])
  );

  const context = dedupeStrings([
    ...(structured.context ?? []),
    ...executedOutcomes.flatMap((outcome) => [
      outcome.source === "primary"
        ? `Auto-inspection used ${outcome.toolName}.`
        : `Follow-up inspection used ${outcome.toolName}.`,
      outcome.reason,
      outcome.summary,
      ...buildGroundingContextLines(outcome),
    ]),
  ]);

  const status = dedupeStrings([
    ...(structured.status ?? []),
    ...executedOutcomes.map((outcome) =>
      outcome.source === "primary"
        ? `Auto tool executed: ${outcome.toolName}`
        : `Follow-up tool executed: ${outcome.toolName}`
    ),
    ...executedOutcomes.flatMap((outcome) =>
      outcome.grounding?.fileRoleSummary ? [outcome.grounding.fileRoleSummary] : []
    ),
    ...(mergedCandidates.length > 1
      ? [`Multi-file grounding identified ${mergedCandidates.length} relevant files.`]
      : []),
  ]);

  const files = dedupeStrings([
    ...(structured.files ?? []),
    ...executedOutcomes.flatMap((outcome) => outcome.fileHints),
    ...executedOutcomes.flatMap((outcome) => outcome.grounding?.relatedPaths ?? []),
    ...mergedCandidates.map((candidate) => candidate.path),
  ]).slice(0, MAX_TOOL_RESULT_PATHS);

  const nextSteps = dedupeStrings([
    ...(structured.nextSteps ?? []),
    ...executedOutcomes.flatMap((outcome) =>
      outcome.grounding?.likelyEditPoint ? [outcome.grounding.likelyEditPoint] : []
    ),
    ...(mergedCandidates.length > 1
      ? [
          "Check the primary file first, then validate the related supporting files before editing.",
        ]
      : []),
    ...(files.length > 0
      ? ["Review the surfaced repository matches and continue from the strongest lead."]
      : []),
  ]);

  const sections = [
    ...(structured.sections ?? []),
    ...executedOutcomes
      .map((outcome) => {
        const sectionItems = dedupeStrings([
          outcome.summary,
          ...outcome.detailLines,
          ...buildGroundingSectionItems(outcome),
        ]).slice(0, MAX_TOOL_RESULT_LINES + MAX_GROUNDED_NOTES + 6);

        if (sectionItems.length === 0) {
          return null;
        }

        return {
          title:
            outcome.source === "primary"
              ? `Auto inspection: ${outcome.toolName}`
              : `Follow-up inspection: ${outcome.toolName}`,
          items: sectionItems,
        };
      })
      .filter(
        (
          section
        ): section is {
          title: string;
          items: string[];
        } => section !== null
      ),
  ];

  return {
    ...structured,
    context,
    status,
    files,
    nextSteps,
    sections,
  };
}

function buildToolExecutionWarnings(
  context: CodexForgeChatContext,
  deps: CodexForgeEngineDependencies,
  outcomes: SafeToolOutcome[]
): string[] {
  const warnings: string[] = [];

  if (!deps.toolExecution) {
    warnings.push(
      "Tool execution adapter is not attached. Engine is running in planning-only mode."
    );
    return warnings;
  }

  if (hasExecutionRequest(context)) {
    warnings.push(
      "Execution request detected, so automatic repo inspection was skipped for this pass."
    );
  } else if (hasActiveExecutionPhase(context)) {
    warnings.push(
      "Execution phase is active, so automatic repo inspection was skipped for this pass."
    );
  }

  for (const outcome of outcomes) {
    warnings.push(...outcome.warnings);
  }

  return warnings;
}

/* ================= MAIN ================= */

export async function runCodexForgeEngine(
  messages: CodexForgeMessage[],
  context: CodexForgeChatContext,
  dependencies?: CodexForgeEngineDependencies
): Promise<CodexForgeEngineReply> {
  const deps = dependencies ?? getCodexForgeEngineDependencies();

  const analysis = analyze(messages, context);
  const plan = buildPlan(analysis, deps, context);

  const safeToolOutcomes = await executeSafeToolPass(analysis, context, deps);

  let structured = buildStructured(analysis, plan, context);
  structured = enrichStructuredWithToolOutcomes(structured, safeToolOutcomes);

  const text = structuredToText(structured);

  const graphWarnings: string[] = [];
  try {
    persistBrainGraph({
      deps,
      messages,
      context,
      analysis,
      plan,
      structured,
    });
  } catch (error) {
    graphWarnings.push(
      error instanceof Error && error.message.trim()
        ? `Brain graph persistence failed: ${error.message.trim()}`
        : "Brain graph persistence failed."
    );
  }

  const warnings = mergeWarnings(
    buildWarnings(analysis, context, plan),
    graphWarnings,
    buildToolExecutionWarnings(context, deps, safeToolOutcomes)
  );

  return {
    text,
    structured,
    intent: analysis.intent,
    ...(warnings.length > 0 ? { warnings } : {}),
  };
}