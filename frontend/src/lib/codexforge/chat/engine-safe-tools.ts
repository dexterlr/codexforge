import type { CodexForgeChatContext } from "../types";
import type {
  CodexForgeEngineAnalysis,
  CodexForgeEngineDependencies,
} from "./contracts";
import {
  extractReadFileGrounding,
  extractSearchProjectGrounding,
  getFileName,
  getFileStem,
  mergeGroundings,
  type Confidence,
  type SafeToolGrounding,
} from "./engine-grounding";

/* ================= CONSTANTS ================= */

export const SAFE_EXECUTION_CANDIDATE_TOOLS = [
  "read-file",
  "list-files",
  "search-project",
] as const;

const AUTO_EXECUTION_ALLOWED_TOOLS = new Set<string>(
  SAFE_EXECUTION_CANDIDATE_TOOLS
);

const MUTATION_TOOL_NAMES = new Set<string>([
  "write-file",
  "apply-diff",
  "run-command",
  "run-tests",
  "build-web-app",
  "snapshot-project",
]);

const MAX_TOOL_RESULT_PATHS = 10;
const MAX_TOOL_RESULT_LINES = 10;
const MAX_TOOL_RESULT_PREVIEW = 320;
const MAX_APPROVAL_SAFETY_ITEMS = 12;

const CANONICAL_APPROVAL_FLOW =
  "Canonical flow: plan -> generate dry-run diff preview -> review -> approve/reject -> apply approved diff -> verify -> checkpoint.";

/* ================= TYPES ================= */

export type SafeToolName = (typeof SAFE_EXECUTION_CANDIDATE_TOOLS)[number];

export type SafeToolPlan = {
  toolName: SafeToolName;
  reason: string;
  input: Record<string, unknown>;
};

export type SafeToolOutcome =
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

export type IntentFlags = {
  wantsRead: boolean;
  wantsList: boolean;
  wantsSearch: boolean;
  wantsGroundedEditPoint: boolean;
  wantsReview: boolean;
  wantsBuild: boolean;
  wantsDebug: boolean;
  wantsArchitecture: boolean;
  wantsTopLevelOrchestration: boolean;
  wantsVisibleTextRenderer: boolean;
  wantsStructuredReplyAssembly: boolean;
  wantsDiffPreview: boolean;
  wantsPatch: boolean;
  wantsApprovalFlow: boolean;
  wantsApplyDiff: boolean;
  wantsDryRun: boolean;
  wantsVerification: boolean;
  wantsMutation: boolean;
};

type EngineTraceForSafeTools = {
  safeToolPassAttempted: boolean;
  safeToolsExecuted: string[];
  safeToolsFailed: string[];
  grounded: boolean;
  groundedFile?: string;
  groundedFunction?: string;
  groundedLine?: number;
  groundingConfidence?: Confidence;
};

/* ================= LOCAL HELPERS ================= */

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

function asFiniteNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value)
    ? value
    : undefined;
}

function clampText(text: string, max = MAX_TOOL_RESULT_PREVIEW): string {
  return text.length <= max ? text : `${text.slice(0, Math.max(0, max - 3))}...`;
}

function dedupeStrings(values: string[]): string[] {
  const seen = new Set<string>();
  const output: string[] = [];

  for (const value of values) {
    const trimmed = value.trim();
    if (!trimmed) continue;

    const key = trimmed.toLowerCase();
    if (seen.has(key)) continue;

    seen.add(key);
    output.push(trimmed);
  }

  return output;
}

function lower(value: string): string {
  return value.toLowerCase();
}

function normalizeSlashes(value: string): string {
  return value.replace(/\\/g, "/").replace(/\/+/g, "/");
}

export function getExecutableToolNames(
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

/* ================= INTENT HELPERS ================= */

function textSuggestsTopLevelOrchestration(text: string): boolean {
  const normalized = lower(text);

  return (
    normalized.includes("top-level orchestration") ||
    normalized.includes("top level orchestration") ||
    normalized.includes("orchestration edit point") ||
    normalized.includes("coordinates analysis") ||
    normalized.includes("coordinate analysis") ||
    normalized.includes("tool execution, structured output") ||
    normalized.includes("structured output, and graph persistence") ||
    normalized.includes("analysis, tool execution") ||
    normalized.includes("graph persistence") ||
    normalized.includes("top-level") ||
    normalized.includes("top level")
  );
}

function textSuggestsVisibleRenderer(text: string): boolean {
  const normalized = lower(text);

  return (
    normalized.includes("visible chat answer") ||
    normalized.includes("visible answer") ||
    normalized.includes("final text") ||
    normalized.includes("final answer") ||
    normalized.includes("text renderer") ||
    normalized.includes("visible text") ||
    normalized.includes("structuredtotext") ||
    normalized.includes("structured to text") ||
    normalized.includes("render grounded") ||
    normalized.includes("rendered answer") ||
    normalized.includes("repetitive") ||
    normalized.includes("repetition") ||
    normalized.includes("duplicate") ||
    normalized.includes("deduplicat") ||
    normalized.includes("suppress duplicate") ||
    normalized.includes("low-value section") ||
    normalized.includes("boilerplate")
  );
}

function textSuggestsStructuredAssembly(text: string): boolean {
  const normalized = lower(text);

  return (
    normalized.includes("structured reply") ||
    normalized.includes("structured output") ||
    normalized.includes("sections") ||
    normalized.includes("context") ||
    normalized.includes("status") ||
    normalized.includes("files") ||
    normalized.includes("next steps") ||
    normalized.includes("contract")
  );
}

function textSuggestsDiffPreview(text: string): boolean {
  const normalized = lower(text);

  return (
    normalized.includes("diff preview") ||
    normalized.includes("diff previews") ||
    normalized.includes("reviewable patch") ||
    normalized.includes("patch preview") ||
    normalized.includes("generated patch") ||
    normalized.includes("generate-diff") ||
    normalized.includes("dry-run diff") ||
    normalized.includes("dry run diff") ||
    normalized.includes("show patch") ||
    normalized.includes("propose changes") ||
    normalized.includes("preview changes")
  );
}

function textSuggestsApprovalFlow(text: string): boolean {
  const normalized = lower(text);

  return (
    normalized.includes("approval") ||
    normalized.includes("approve") ||
    normalized.includes("reject") ||
    normalized.includes("awaiting_diff_approval") ||
    normalized.includes("awaiting diff approval") ||
    normalized.includes("human approval") ||
    normalized.includes("explicit approval") ||
    normalized.includes("approval-driven") ||
    normalized.includes("approval driven")
  );
}

function textSuggestsApplyDiff(text: string): boolean {
  const normalized = lower(text);

  return (
    normalized.includes("apply-diff") ||
    normalized.includes("apply diff") ||
    normalized.includes("apply patch") ||
    normalized.includes("apply changes") ||
    normalized.includes("write the changes") ||
    normalized.includes("mutate files") ||
    normalized.includes("make the file changes")
  );
}

function textSuggestsDryRun(text: string): boolean {
  const normalized = lower(text);

  return (
    normalized.includes("dry-run") ||
    normalized.includes("dry run") ||
    normalized.includes("no mutation") ||
    normalized.includes("without mutating") ||
    normalized.includes("without applying") ||
    normalized.includes("preview only")
  );
}

function textSuggestsVerification(text: string): boolean {
  const normalized = lower(text);

  return (
    normalized.includes("verify") ||
    normalized.includes("verification") ||
    normalized.includes("run build") ||
    normalized.includes("npm run build") ||
    normalized.includes("run tests") ||
    normalized.includes("test after") ||
    normalized.includes("check after")
  );
}

export function extractIntentFlags(text: string): IntentFlags {
  const query = lower(text);

  const wantsGroundedEditPoint =
    query.includes("edit point") ||
    query.includes("next edit") ||
    query.includes("best next edit") ||
    query.includes("best place to change") ||
    query.includes("best place to edit") ||
    query.includes("where should i edit") ||
    query.includes("where to edit");

  const wantsRead =
    query.includes("read ") ||
    query.includes("open ") ||
    query.includes("show ") ||
    query.includes("show file") ||
    query.includes("inspect ") ||
    query.includes("inspect file") ||
    query.includes("view file") ||
    query.includes("review file") ||
    query.includes("check file") ||
    query.includes("analyze file") ||
    query.includes("analyse file") ||
    wantsGroundedEditPoint;

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

  const wantsReview =
    query.includes("review ") ||
    query.includes("check ") ||
    query.includes("analyze ") ||
    query.includes("analyse ") ||
    query.includes("look at ");

  const wantsBuild =
    query.includes("build ") ||
    query.includes("create ") ||
    query.includes("make ") ||
    query.includes("implement ") ||
    query.includes("generate ");

  const wantsDebug =
    query.includes("debug") ||
    query.includes("bug") ||
    query.includes("error") ||
    query.includes("broken") ||
    query.includes("failing") ||
    query.includes("fix ");

  const wantsArchitecture =
    query.includes("architecture") ||
    query.includes("contract") ||
    query.includes("orchestration") ||
    query.includes("source of truth") ||
    query.includes("state ownership") ||
    query.includes("pipeline");

  const wantsTopLevelOrchestration = textSuggestsTopLevelOrchestration(query);
  const wantsVisibleTextRenderer = textSuggestsVisibleRenderer(query);
  const wantsStructuredReplyAssembly = textSuggestsStructuredAssembly(query);
  const wantsDiffPreview = textSuggestsDiffPreview(query);
  const wantsPatch =
    wantsDiffPreview ||
    query.includes("patch") ||
    query.includes("diff") ||
    query.includes("unified diff");
  const wantsApprovalFlow = textSuggestsApprovalFlow(query);
  const wantsApplyDiff = textSuggestsApplyDiff(query);
  const wantsDryRun = textSuggestsDryRun(query);
  const wantsVerification = textSuggestsVerification(query);
  const wantsMutation =
    wantsApplyDiff ||
    query.includes("write-file") ||
    query.includes("write file") ||
    query.includes("run-command") ||
    query.includes("run command") ||
    query.includes("execute command");

  return {
    wantsRead,
    wantsList,
    wantsSearch,
    wantsGroundedEditPoint,
    wantsReview,
    wantsBuild,
    wantsDebug,
    wantsArchitecture,
    wantsTopLevelOrchestration,
    wantsVisibleTextRenderer,
    wantsStructuredReplyAssembly,
    wantsDiffPreview,
    wantsPatch,
    wantsApprovalFlow,
    wantsApplyDiff,
    wantsDryRun,
    wantsVerification,
    wantsMutation,
  };
}

/* ================= MUTATION FIREWALL ================= */

function assertAutoExecutionIsSafe(toolName: string): void {
  if (!AUTO_EXECUTION_ALLOWED_TOOLS.has(toolName)) {
    throw new Error(`Refused automatic execution of unsafe tool: ${toolName}`);
  }

  if (MUTATION_TOOL_NAMES.has(toolName)) {
    throw new Error(`Refused automatic mutation-capable tool: ${toolName}`);
  }
}

export function buildMutationFirewallWarnings(flags: IntentFlags): string[] {
  if (!flags.wantsMutation) return [];

  return [
    "Mutation intent detected. CodexForge will not auto-run mutation tools from chat without an explicit approval state.",
    "Allowed automatic tools remain read-only: read-file, list-files, search-project.",
  ];
}

export function buildApprovalIntentSection(
  flags: IntentFlags
): { title: string; items: string[] } | null {
  if (!flags.wantsDiffPreview && !flags.wantsApprovalFlow && !flags.wantsApplyDiff) {
    return null;
  }

  const items = dedupeStrings([
    flags.wantsDiffPreview
      ? "Diff preview intent detected: generate or display a reviewable patch without mutating files."
      : "",
    flags.wantsApprovalFlow
      ? "Approval intent detected: require explicit user approval before apply-diff or file mutation."
      : "",
    flags.wantsApplyDiff
      ? "Apply intent detected: mutation must stay blocked until an approved diff preview exists."
      : "",
    flags.wantsDryRun
      ? "Dry-run requested: proposed changes should remain preview-only."
      : "Default safety posture: diff previews stay dry-run unless an approved apply path is explicitly invoked.",
    flags.wantsVerification
      ? "Verification intent detected: build/test commands should be proposed or run only through an approved guarded path."
      : "",
    CANONICAL_APPROVAL_FLOW,
  ]).slice(0, MAX_APPROVAL_SAFETY_ITEMS);

  if (items.length === 0) return null;

  return {
    title: "Approval safety",
    items,
  };
}

/* ================= QUERY / PATH EXTRACTION ================= */

function extractQuotedSegments(text: string): string[] {
  const matches = text.match(/`([^`]+)`|"([^"]+)"|'([^']+)'/g) ?? [];

  return matches
    .map((match) => match.replace(/^["'`]|["'`]$/g, "").trim())
    .filter(Boolean);
}

function stripTrailingSentencePunctuation(value: string): string {
  return value.replace(/[.,;:!?]+$/g, "").trim();
}

function looksLikePath(value: string): boolean {
  const normalized = normalizeSlashes(stripTrailingSentencePunctuation(value));

  return (
    normalized.includes("/") ||
    normalized.includes("\\") ||
    normalized.includes(".") ||
    normalized.startsWith("src") ||
    normalized.startsWith("app") ||
    normalized.startsWith("lib") ||
    normalized.startsWith("components") ||
    normalized.startsWith("pages") ||
    normalized.startsWith("api") ||
    normalized.startsWith("docs") ||
    normalized.startsWith("public")
  );
}

function extractPathCandidate(text: string): string | undefined {
  const quoted = extractQuotedSegments(text)
    .map(stripTrailingSentencePunctuation)
    .find(looksLikePath);

  if (quoted) return quoted;

  const tokenMatch = text.match(
    /(?:[A-Za-z]:)?(?:[A-Za-z0-9_.-]+[\\/])+[A-Za-z0-9_.-]+|[A-Za-z0-9_.-]+\.[A-Za-z0-9_.-]+/
  );

  const token = stripTrailingSentencePunctuation(tokenMatch?.[0]?.trim() ?? "");
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
      /^(find|search|look\s+for|grep|where\s+is|where\s+are|show|read|open|inspect|list|review|check|analy[sz]e)\s+/i,
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

export function shouldAutoInspectRepo(
  analysis: CodexForgeEngineAnalysis,
  context: CodexForgeChatContext
): boolean {
  if (!analysis.lastUserMessage || !analysis.userText.trim()) {
    return false;
  }

  if (hasExecutionRequest(context) || hasActiveExecutionPhase(context)) {
    return false;
  }

  const flags = extractIntentFlags(analysis.userText);

  return (
    flags.wantsRead ||
    flags.wantsList ||
    flags.wantsSearch ||
    flags.wantsGroundedEditPoint ||
    flags.wantsReview ||
    flags.wantsDebug ||
    flags.wantsArchitecture ||
    flags.wantsTopLevelOrchestration ||
    flags.wantsVisibleTextRenderer ||
    flags.wantsStructuredReplyAssembly ||
    flags.wantsDiffPreview ||
    flags.wantsApprovalFlow
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

  const flags = extractIntentFlags(analysis.userText);
  const explicitPath = extractPathCandidate(analysis.userText);
  const explicitDirectory = extractDirectoryCandidate(analysis.userText);
  const searchQuery = extractSearchQuery(analysis.userText);

  if (
    (flags.wantsRead ||
      flags.wantsGroundedEditPoint ||
      flags.wantsArchitecture ||
      flags.wantsTopLevelOrchestration ||
      flags.wantsVisibleTextRenderer ||
      flags.wantsStructuredReplyAssembly ||
      flags.wantsDiffPreview ||
      flags.wantsApprovalFlow) &&
    explicitPath &&
    safeTools.has("read-file")
  ) {
    return {
      toolName: "read-file",
      reason: `User asked to inspect a specific file (${explicitPath}).`,
      input: { path: explicitPath },
    };
  }

  if (flags.wantsList && safeTools.has("list-files")) {
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

  if (flags.wantsSearch && searchQuery && safeTools.has("search-project")) {
    return {
      toolName: "search-project",
      reason: `User asked to search the repository for "${searchQuery}".`,
      input: { query: searchQuery },
    };
  }

  if (explicitPath && safeTools.has("read-file")) {
    return {
      toolName: "read-file",
      reason: `A specific path was detected (${explicitPath}).`,
      input: { path: explicitPath },
    };
  }

  if (searchQuery && safeTools.has("search-project")) {
    return {
      toolName: "search-project",
      reason: `A repository search query was inferred ("${searchQuery}").`,
      input: { query: searchQuery },
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

  if (content?.type === "json") {
    const json = asRecord(content.json);
    if (json) return json;
  }

  const json = asRecord(content?.json);
  if (json) return json;

  return null;
}

function extractReadFileText(
  json: Record<string, unknown> | null
): string | undefined {
  if (!json) return undefined;

  const raw = asRecord(json.raw);

  return (
    asString(json.content) ??
    asString(json.text) ??
    asString(json.preview) ??
    asString(raw?.content) ??
    asString(raw?.text)
  );
}

function extractFileHintsFromJson(json: Record<string, unknown> | null): string[] {
  if (!json) return [];

  const hints: string[] = [];

  const relativePath = asString(json.relativePath);
  const absolutePath = asString(json.absolutePath);
  const requestedPath = asString(json.requestedPath);

  if (relativePath) hints.push(relativePath);
  else if (requestedPath) hints.push(requestedPath);
  else if (absolutePath) hints.push(absolutePath);

  const results = Array.isArray(json.results) ? json.results : [];
  for (const item of results) {
    const record = asRecord(item);
    const hitRelativePath = asString(record?.relativePath);
    const filePath = asString(record?.filePath);
    const path = hitRelativePath ?? filePath;

    if (path) hints.push(path);
  }

  const entries = Array.isArray(json.entries) ? json.entries : [];
  for (const item of entries) {
    const record = asRecord(item);
    const entryRelativePath = asString(record?.relativePath);
    const path =
      entryRelativePath ?? asString(record?.path) ?? asString(record?.name);

    if (path) hints.push(path);
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
        const line = asFiniteNumber(record.line);
        const preview = asString(record.preview);

        if (!relativePath) return null;

        const linePart = line !== undefined ? `:${line}` : "";
        const previewPart = preview ? ` - ${clampText(preview)}` : "";

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
    const relativePath = asString(json.relativePath);
    const totalBytes =
      asFiniteNumber(json.sizeBytes) ??
      asFiniteNumber(json.bytes) ??
      asFiniteNumber(json.byteLength);

    const totalLines =
      asFiniteNumber(json.lineCount) ??
      asFiniteNumber(json.lines) ??
      asFiniteNumber(json.totalLines);

    const truncated = json.truncated === true;
    const text = extractReadFileText(json);

    return dedupeStrings([
      relativePath ? `Read file: ${relativePath}` : "",
      relativePath && totalBytes !== undefined
        ? `File size: ${totalBytes} bytes`
        : "",
      relativePath && totalLines !== undefined ? `Line count: ${totalLines}` : "",
      truncated ? "Read output was truncated." : "",
      text ? clampText(text) : "",
    ]).slice(0, MAX_TOOL_RESULT_LINES);
  }

  return [];
}

function resultLooksSuccessful(result: unknown): boolean {
  const record = asRecord(result);
  return record?.ok === true && !asRecord(record?.error);
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

    const line = asFiniteNumber(record.line);
    const preview = asString(record.preview);

    return {
      relativePath,
      ...(line !== undefined ? { line } : {}),
      ...(preview ? { preview } : {}),
    };
  }

  return null;
}

function getSafeToolFailureReason(outcome: SafeToolOutcome): string | undefined {
  if (outcome.status !== "failed") return undefined;
  return outcome.summary || outcome.warnings[0];
}

function buildSearchQueryForFailedRead(
  primaryPlan: SafeToolPlan,
  userText: string
): string {
  const inputPath = asString(primaryPlan.input.path);
  const fileName = inputPath ? getFileName(inputPath) : undefined;
  const stem = inputPath ? getFileStem(inputPath) : undefined;
  const extracted = extractSearchQuery(userText);

  return dedupeStrings([
    fileName ?? "",
    stem ?? "",
    extracted,
    inputPath ?? "",
  ])
    .slice(0, 3)
    .join(" ");
}

/* ================= TOOL EXECUTION ================= */

async function executeToolWithAdapter(
  deps: CodexForgeEngineDependencies,
  toolName: SafeToolName,
  input: Record<string, unknown>,
  context: CodexForgeChatContext,
  reason: string,
  source: "primary" | "follow-up",
  userText = ""
): Promise<{
  outcome: SafeToolOutcome;
  json: Record<string, unknown> | null;
}> {
  try {
    assertAutoExecutionIsSafe(toolName);

    const result = await deps.toolExecution!.execute({
      toolName,
      input,
      context: buildToolContext(context),
    });

    const summary =
      extractResultSummary(result) ?? `${toolName} executed successfully.`;

    const json = extractJsonPayload(result);
    const fileHints = extractFileHintsFromJson(json);
    const detailLines = extractDetailLinesFromJson(toolName, json);

    if (!resultLooksSuccessful(result)) {
      return {
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
        ? extractReadFileGrounding(matchedFile, json, userText)
        : toolName === "search-project"
          ? extractSearchProjectGrounding(json, userText)
          : undefined;

    return {
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
  primaryJson: Record<string, unknown> | null,
  userText = ""
): Promise<SafeToolOutcome | null> {
  if (primaryPlan.toolName !== "search-project") return null;
  if (hasExecutionRequest(context) || hasActiveExecutionPhase(context)) return null;
  if (!deps.toolExecution?.canExecute("read-file")) return null;

  const bestMatch = extractBestSearchProjectMatch(primaryJson);
  if (!bestMatch?.relativePath) return null;

  const followUp = await executeToolWithAdapter(
    deps,
    "read-file",
    { path: bestMatch.relativePath },
    context,
    `Follow-up read of strongest search match (${bestMatch.relativePath}).`,
    "follow-up",
    userText
  );

  if (followUp.outcome.status === "executed" && primaryJson) {
    const primaryGrounding = extractSearchProjectGrounding(primaryJson, userText);

    followUp.outcome.grounding = mergeGroundings(
      primaryGrounding,
      followUp.outcome.grounding
    );
  }

  return followUp.outcome;
}

async function maybeFallbackReadFileToSearchProject(
  deps: CodexForgeEngineDependencies,
  context: CodexForgeChatContext,
  primaryPlan: SafeToolPlan,
  primaryOutcome: SafeToolOutcome,
  userText = ""
): Promise<SafeToolOutcome | null> {
  if (primaryPlan.toolName !== "read-file") return null;
  if (primaryOutcome.status !== "failed") return null;
  if (hasExecutionRequest(context) || hasActiveExecutionPhase(context)) return null;
  if (!deps.toolExecution?.canExecute("search-project")) return null;

  const query = buildSearchQueryForFailedRead(primaryPlan, userText);
  if (!query) return null;

  const fallbackSearch = await executeToolWithAdapter(
    deps,
    "search-project",
    { query },
    context,
    `Fallback search after read-file failed (${getSafeToolFailureReason(primaryOutcome) ?? "unknown reason"}).`,
    "follow-up",
    userText
  );

  if (fallbackSearch.outcome.status !== "executed") {
    return fallbackSearch.outcome;
  }

  const followUpRead = await maybeRunFollowUpReadFile(
    deps,
    context,
    {
      toolName: "search-project",
      reason: fallbackSearch.outcome.reason,
      input: { query },
    },
    fallbackSearch.json,
    userText
  );

  if (!followUpRead) return fallbackSearch.outcome;

  if (followUpRead.status === "executed" && fallbackSearch.json) {
    const primaryGrounding = extractSearchProjectGrounding(fallbackSearch.json, userText);

    followUpRead.grounding = mergeGroundings(
      primaryGrounding,
      followUpRead.grounding
    );
  }

  return followUpRead;
}

export async function executeSafeToolPass(
  analysis: CodexForgeEngineAnalysis,
  context: CodexForgeChatContext,
  deps: CodexForgeEngineDependencies,
  trace?: EngineTraceForSafeTools
): Promise<SafeToolOutcome[]> {
  trace && (trace.safeToolPassAttempted = true);

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
          "Executable tools are available, but no safe read/search/list tools are currently exposed.",
        ],
      },
    ];
  }

  const plan = buildSafeToolPlan(analysis, context, deps);
  if (!plan) {
    return [{ status: "skipped", warnings: [] }];
  }

  const primary = await executeToolWithAdapter(
    deps,
    plan.toolName,
    plan.input,
    context,
    plan.reason,
    "primary",
    analysis.userText
  );

  const outcomes: SafeToolOutcome[] = [primary.outcome];

  if (primary.outcome.status === "executed") {
    const followUpOutcome = await maybeRunFollowUpReadFile(
      deps,
      context,
      plan,
      primary.json,
      analysis.userText
    );

    if (followUpOutcome) {
      outcomes.push(followUpOutcome);
    }
  }

  if (primary.outcome.status === "failed") {
    const recoveryOutcome = await maybeFallbackReadFileToSearchProject(
      deps,
      context,
      plan,
      primary.outcome,
      analysis.userText
    );

    if (recoveryOutcome) {
      outcomes.push(recoveryOutcome);
    }
  }

  if (trace) {
    trace.safeToolsExecuted = dedupeStrings([
      ...trace.safeToolsExecuted,
      ...outcomes
        .filter((outcome) => outcome.status === "executed")
        .map((outcome) => outcome.toolName),
    ]);

    trace.safeToolsFailed = dedupeStrings([
      ...trace.safeToolsFailed,
      ...outcomes
        .filter((outcome) => outcome.status === "failed")
        .map((outcome) => outcome.toolName),
    ]);

    const grounded = outcomes.find(
      (outcome) => outcome.status === "executed" && outcome.grounding?.matchedFile
    );

    if (grounded?.status === "executed" && grounded.grounding) {
      trace.grounded = true;
      trace.groundedFile = grounded.grounding.matchedFile;
      trace.groundedFunction = grounded.grounding.editFunction;
      trace.groundedLine = grounded.grounding.editLine;
      trace.groundingConfidence = grounded.grounding.confidence;
    }
  }

  return outcomes;
}





