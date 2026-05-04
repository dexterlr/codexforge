import type {
  CodexForgeChatContext,
  CodexForgeMessage,
  CodexForgeStructuredReply,
} from "../types";
import { getCodexForgeEngineDependencies } from "./dependencies";
import type {
  CodexForgeEngineAnalysis,
  CodexForgeEngineDependencies,
  CodexForgeEngineReply,
} from "./contracts";
import { analyze, buildPlan, buildWarnings } from "./engine-analysis";
import { persistBrainGraph } from "./engine-graph";
import { buildStructured, structuredToText } from "./engine-render";
import { mergeWarnings } from "./engine-shared";
import {
  extractReadFileGrounding,
  extractSearchProjectGrounding,
  formatPathForDisplay,
  getFileName,
  getFileStem,
  mergeGroundings,
  normalizeGroundedCandidates,
  type Confidence,
  type SafeToolGrounding,
} from "./engine-grounding";

/* ================= CONSTANTS ================= */

const SAFE_EXECUTION_CANDIDATE_TOOLS = [
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

const DIFF_PREVIEW_TOOL_NAMES = new Set<string>([
  "generate-diff",
  "apply-diff",
]);

const VERIFICATION_TOOL_NAMES = new Set<string>([
  "run-command",
  "run-tests",
]);

const MAX_TOOL_RESULT_PATHS = 10;
const MAX_TOOL_RESULT_LINES = 10;
const MAX_TOOL_RESULT_PREVIEW = 320;
const MAX_ENGINE_TRACE_LINES = 18;
const MAX_RESPONSE_QUALITY_NOTES = 12;
const MAX_APPROVAL_SAFETY_ITEMS = 12;
const MAX_GROUNDING_SECTION_ITEMS = MAX_TOOL_RESULT_LINES + 10 + 28;

const FALLBACK_GROUNDED_SUMMARY =
  "CodexForge produced a grounded repository response.";

const CANONICAL_APPROVAL_FLOW =
  "Canonical flow: plan -> generate dry-run diff preview -> review -> approve/reject -> apply approved diff -> verify -> checkpoint.";

/* ================= TYPES ================= */

type SafeToolName = (typeof SAFE_EXECUTION_CANDIDATE_TOOLS)[number];

type EngineStageStatus =
  | "pending"
  | "running"
  | "completed"
  | "failed"
  | "skipped";

type SafeToolPlan = {
  toolName: SafeToolName;
  reason: string;
  input: Record<string, unknown>;
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

type IntentFlags = {
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

type EngineTraceStage = {
  name: string;
  status: EngineStageStatus;
  startedAt: number;
  completedAt?: number;
  durationMs?: number;
  summary?: string;
};

type EngineTrace = {
  runId: string;
  startedAt: number;
  completedAt?: number;
  durationMs?: number;

  analysisIntent?: string;
  domain?: string;

  safeToolPassAttempted: boolean;
  safeToolsExecuted: string[];
  safeToolsFailed: string[];

  grounded: boolean;
  groundedFile?: string;
  groundedFunction?: string;
  groundedLine?: number;
  groundingConfidence?: Confidence;

  generatedDiffPreviewCount: number;
  pendingApprovalCount: number;

  approvalIntentDetected: boolean;
  mutationIntentBlocked: boolean;
  graphPersisted: boolean;

  stages: EngineTraceStage[];
  warningCount: number;
};

type EngineStageTraceHandle = {
  complete(summary?: string): void;
  fail(summary?: string): void;
  skip(summary?: string): void;
};

type ResponseQuality = {
  score: number;
  hasGoal: boolean;
  hasNextSteps: boolean;
  hasFiles: boolean;
  hasEvidence: boolean;
  hasToolAudit: boolean;
  hasGroundedEditPoint: boolean;
  hasDiffPreviewAwareness: boolean;
  hasApprovalAwareness: boolean;
  hasWarnings: boolean;
  notes: string[];
};

type ClaimGuardResult = {
  warnings: string[];
  claimsGroundedExecution: boolean;
  claimsGroundedFile: boolean;
  claimsDiffPreview: boolean;
  claimsApproval: boolean;
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

function compact(values: Array<string | undefined | null | false>): string[] {
  return values
    .map((value) => (typeof value === "string" ? value.trim() : ""))
    .filter((value): value is string => value.length > 0);
}

function lower(value: string): string {
  return value.toLowerCase();
}

function normalizeSlashes(value: string): string {
  return value.replace(/\\/g, "/").replace(/\/+/g, "/");
}

function normalizePathKey(value: string): string {
  return normalizeSlashes(value)
    .replace(/^\/+/, "")
    .replace(/\/+$/, "")
    .toLowerCase();
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

function dedupeByKey<T>(values: T[], getKey: (value: T) => string): T[] {
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

function getExecutableToolNames(deps: CodexForgeEngineDependencies): string[] {
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

function nowMs(): number {
  return Date.now();
}

function createRunId(startedAt: number): string {
  return `codexforge-engine-${startedAt}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

/* ================= TRACE HELPERS ================= */

function createEngineTrace(startedAt: number): EngineTrace {
  return {
    runId: createRunId(startedAt),
    startedAt,
    safeToolPassAttempted: false,
    safeToolsExecuted: [],
    safeToolsFailed: [],
    grounded: false,
    generatedDiffPreviewCount: 0,
    pendingApprovalCount: 0,
    approvalIntentDetected: false,
    mutationIntentBlocked: false,
    graphPersisted: false,
    stages: [],
    warningCount: 0,
  };
}

function startTraceStage(trace: EngineTrace, name: string): EngineStageTraceHandle {
  const startedAt = nowMs();
  const stage: EngineTraceStage = {
    name,
    status: "running",
    startedAt,
  };

  trace.stages.push(stage);

  return {
    complete(summary?: string) {
      const completedAt = nowMs();
      stage.status = "completed";
      stage.completedAt = completedAt;
      stage.durationMs = completedAt - startedAt;
      if (summary) stage.summary = summary;
    },
    fail(summary?: string) {
      const completedAt = nowMs();
      stage.status = "failed";
      stage.completedAt = completedAt;
      stage.durationMs = completedAt - startedAt;
      if (summary) stage.summary = summary;
    },
    skip(summary?: string) {
      const completedAt = nowMs();
      stage.status = "skipped";
      stage.completedAt = completedAt;
      stage.durationMs = completedAt - startedAt;
      if (summary) stage.summary = summary;
    },
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

function extractIntentFlags(text: string): IntentFlags {
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

function buildMutationFirewallWarnings(flags: IntentFlags): string[] {
  if (!flags.wantsMutation) return [];

  return [
    "Mutation intent detected. CodexForge will not auto-run mutation tools from chat without an explicit approval state.",
    "Allowed automatic tools remain read-only: read-file, list-files, search-project.",
  ];
}

function buildApprovalIntentSection(
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

async function executeSafeToolPass(
  analysis: CodexForgeEngineAnalysis,
  context: CodexForgeChatContext,
  deps: CodexForgeEngineDependencies,
  trace?: EngineTrace
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

/* ================= STRUCTURED ENRICHMENT ================= */

function buildGroundingHeadline(
  grounding: SafeToolGrounding | undefined
): string | undefined {
  if (!grounding?.matchedFile) return undefined;

  const displayPath = formatPathForDisplay(grounding.matchedFile);
  const functionPart = grounding.editFunction
    ? ` -> ${grounding.editFunction}(...)`
    : "";
  const linePart = grounding.editLine ? `:${grounding.editLine}` : "";

  return `${displayPath}${linePart}${functionPart}`;
}

function buildGroundingWhyLine(
  grounding: SafeToolGrounding | undefined
): string | undefined {
  if (!grounding) return undefined;

  if (grounding.editFunction === "runCodexForgeEngine") {
    return "Why this edit point: it is the top-level orchestration seam connecting analysis, planning, safe repo inspection, structured rendering, trace construction, claim validation, and graph persistence.";
  }

  if (grounding.editFunction === "executeSafeToolPass") {
    return "Why this edit point: it controls whether CodexForge actually runs safe repo tools instead of only describing the action.";
  }

  if (grounding.editFunction === "maybeFallbackReadFileToSearchProject") {
    return "Why this edit point: it recovers from failed explicit file reads by searching for the intended target instead of returning generic output.";
  }

  if (grounding.editFunction === "enrichStructuredWithToolOutcomes") {
    return "Why this edit point: it controls how tool results become visible in the final structured workspace response.";
  }

  if (grounding.editFunction === "buildGroundedSummary") {
    return "Why this edit point: it controls the first grounded summary line users see after inspection.";
  }

  if (grounding.editFunction === "buildSafeToolPlan") {
    return "Why this edit point: it controls which safe repo inspection tool CodexForge chooses for the request.";
  }

  if (grounding.editFunction === "buildStructured") {
    return "Why this edit point: it assembles the structured reply fields that the CodexForge UI renders.";
  }

  if (grounding.editFunction === "structuredToText") {
    return "Why this edit point: it controls the final visible chat answer, including section ordering, repetition, and low-value rendered details.";
  }

  if (grounding.editFunction === "validateGroundedClaims") {
    return "Why this edit point: it guards against final responses claiming unsupported tool, grounding, approval, or diff-preview evidence.";
  }

  if (grounding.editFunction === "enrichStructuredWithSafetyState") {
    return "Why this edit point: it surfaces mutation, approval, dry-run, and diff-preview state before the response is rendered.";
  }

  if (grounding.editFunction === "buildResponseQuality") {
    return "Why this edit point: it scores whether the final answer has goal, files, next steps, evidence, grounded edit point, diff awareness, and approval awareness.";
  }

  if (grounding.editFunction === "buildEngineTraceSection") {
    return "Why this edit point: it exposes the actual engine path, tool behavior, grounding state, safety gates, warnings, and diagnostic timing.";
  }

  if (grounding.fileRoleSummary) {
    return `Why this file: ${grounding.fileRoleSummary}`;
  }

  return undefined;
}

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
    grounding.editFunction
      ? `Best grounded function: ${grounding.editFunction}`
      : "",
    grounding.editLine !== undefined ? `Best edit line: ${grounding.editLine}` : "",
    grounding.confidence ? `Grounding confidence: ${grounding.confidence}` : "",
    grounding.fileRoleSummary ?? "",
    grounding.likelyEditPoint ?? "",
    buildGroundingWhyLine(grounding) ?? "",
    ...supportingFiles.map(
      (path, index) => `Supporting file ${index + 1}: ${path}`
    ),
  ]);
}

function buildGroundingSectionItems(
  outcome: Extract<SafeToolOutcome, { status: "executed" }>
): string[] {
  const grounding = outcome.grounding;
  if (!grounding) return [];

  const headline = buildGroundingHeadline(grounding);

  const candidateItems = (grounding.candidateFiles ?? []).flatMap(
    (candidate, index) => {
      const prefix = index === 0 ? "Primary file" : `Related file ${index}`;

      return dedupeStrings([
        `${prefix}: ${candidate.path}`,
        candidate.line !== undefined
          ? `${prefix} matched line: ${candidate.line}`
          : "",
        candidate.editFunction
          ? `${prefix} function: ${candidate.editFunction}`
          : "",
        candidate.editLine !== undefined
          ? `${prefix} edit line: ${candidate.editLine}`
          : "",
        candidate.confidence ? `${prefix} confidence: ${candidate.confidence}` : "",
        candidate.role ? `${prefix} role: ${candidate.role}` : "",
        candidate.editPoint ? `${prefix} edit point: ${candidate.editPoint}` : "",
        ...candidate.signals.map((signal) => `${prefix} signal: ${signal}`),
      ]);
    }
  );

  return dedupeStrings([
    headline ? `Best edit target: ${headline}` : "",
    grounding.matchedFile ? `Matched file: ${grounding.matchedFile}` : "",
    grounding.matchedLine !== undefined
      ? `Matched line: ${grounding.matchedLine}`
      : "",
    grounding.editFunction ? `Matched function: ${grounding.editFunction}` : "",
    grounding.editLine !== undefined ? `Edit line: ${grounding.editLine}` : "",
    grounding.confidence ? `Confidence: ${grounding.confidence}` : "",
    grounding.fileRoleSummary ?? "",
    grounding.likelyEditPoint ?? "",
    buildGroundingWhyLine(grounding) ?? "",
    ...candidateItems,
    ...grounding.relatedPaths.map((path) => `Related path: ${path}`),
  ]).slice(0, MAX_GROUNDING_SECTION_ITEMS);
}

function buildGroundedSummary(
  structured: CodexForgeStructuredReply,
  outcomes: Extract<SafeToolOutcome, { status: "executed" }>[]
): string {
  const fallbackSummary = structured.summary ?? FALLBACK_GROUNDED_SUMMARY;

  const grounded = outcomes.find((outcome) => outcome.grounding?.matchedFile);
  if (!grounded?.grounding) return fallbackSummary;

  const headline = buildGroundingHeadline(grounded.grounding);
  const likelyEditPoint = grounded.grounding.likelyEditPoint;

  if (headline && likelyEditPoint) {
    return `${headline} - ${likelyEditPoint}`;
  }

  if (headline) {
    return `Best grounded edit target: ${headline}.`;
  }

  return fallbackSummary;
}

function buildGroundedTopSection(
  outcomes: Extract<SafeToolOutcome, { status: "executed" }>[]
): { title: string; items: string[] } | null {
  const grounded = outcomes.find((outcome) => outcome.grounding?.matchedFile);
  const grounding = grounded?.grounding;

  if (!grounding) return null;

  const headline = buildGroundingHeadline(grounding);

  const items = dedupeStrings([
    headline ? `Best next edit point: ${headline}` : "",
    grounding.fileRoleSummary ? `File role: ${grounding.fileRoleSummary}` : "",
    grounding.likelyEditPoint ?? "",
    buildGroundingWhyLine(grounding) ?? "",
    grounding.confidence ? `Confidence: ${grounding.confidence}` : "",
    grounded ? `Tool used: ${grounded.toolName}` : "",
  ]);

  if (items.length === 0) return null;

  return {
    title: "Grounded recommendation",
    items,
  };
}

function buildToolAuditSection(
  outcomes: Extract<SafeToolOutcome, { status: "executed" }>[]
): { title: string; items: string[] } | null {
  if (outcomes.length === 0) return null;

  const items = outcomes.flatMap((outcome) => {
    const grounding = outcome.grounding;

    return dedupeStrings([
      `${outcome.source === "primary" ? "Primary" : "Follow-up"} tool: ${
        outcome.toolName
      }`,
      `Reason: ${outcome.reason}`,
      `Result: ${outcome.summary}`,
      grounding?.matchedFile ? `Matched file: ${grounding.matchedFile}` : "",
      grounding?.editFunction
        ? `Matched function: ${grounding.editFunction}`
        : "",
      grounding?.confidence ? `Confidence: ${grounding.confidence}` : "",
    ]);
  });

  if (items.length === 0) return null;

  return {
    title: "Tool audit",
    items: items.slice(0, MAX_GROUNDING_SECTION_ITEMS),
  };
}

function buildNextActionSection(
  outcomes: Extract<SafeToolOutcome, { status: "executed" }>[]
): { title: string; items: string[] } | null {
  const grounded = outcomes.find((outcome) => outcome.grounding?.matchedFile);
  const grounding = grounded?.grounding;

  if (!grounding?.matchedFile) return null;

  const headline = buildGroundingHeadline(grounding);

  const items = dedupeStrings([
    headline
      ? `Start here: ${headline}`
      : `Start here: ${grounding.matchedFile}`,
    grounding.editFunction
      ? `Change target: ${grounding.editFunction}(...)`
      : "",
    grounding.editLine !== undefined
      ? `Open around line ${grounding.editLine}.`
      : "",
    "Make one focused change there.",
    "Run npm run build after the edit.",
  ]);

  return {
    title: "Recommended next action",
    items,
  };
}

function shouldKeepExistingSection(section: { title: string; items: string[] }): boolean {
  const title = lower(section.title);

  return (
    title !== "grounded recommendation" &&
    title !== "recommended next action" &&
    title !== "tool audit" &&
    title !== "engine trace" &&
    title !== "response quality" &&
    title !== "approval safety" &&
    title !== "execution safety" &&
    title !== "execution posture" &&
    !title.startsWith("auto inspection:") &&
    !title.startsWith("follow-up inspection:")
  );
}

function shouldKeepNextStep(step: string): boolean {
  const lowerStep = lower(step);

  return (
    !lowerStep.includes("capture the exact error") &&
    !lowerStep.includes("locate the failing file") &&
    !lowerStep.includes("reproduce before fixing") &&
    !lowerStep.includes("review the surfaced repository matches") &&
    !lowerStep.includes(
      "inspect engine-render.ts next because it controls what becomes visible"
    )
  );
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

  const topSection = buildGroundedTopSection(executedOutcomes);
  const nextActionSection = buildNextActionSection(executedOutcomes);
  const toolAuditSection = buildToolAuditSection(executedOutcomes);

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
      outcome.grounding?.fileRoleSummary
        ? [outcome.grounding.fileRoleSummary]
        : []
    ),
    ...executedOutcomes.flatMap((outcome) =>
      outcome.grounding?.editFunction
        ? [`Best function: ${outcome.grounding.editFunction}`]
        : []
    ),
    ...(mergedCandidates.length > 1
      ? [`Multi-file grounding identified ${mergedCandidates.length} relevant files.`]
      : []),
  ]);

  const files = dedupeStrings([
    ...mergedCandidates.map((candidate) => candidate.path),
    ...(structured.files ?? []),
    ...executedOutcomes.flatMap((outcome) => outcome.fileHints),
    ...executedOutcomes.flatMap((outcome) => outcome.grounding?.relatedPaths ?? []),
  ]).slice(0, MAX_TOOL_RESULT_PATHS);

  const nextSteps = dedupeStrings([
    ...executedOutcomes.flatMap((outcome) =>
      outcome.grounding?.editFunction
        ? [
            `Open ${outcome.grounding.matchedFile ?? "the matched file"} at ${
              outcome.grounding.editFunction
            }(...) and make one focused change there.`,
          ]
        : []
    ),
    ...(structured.nextSteps ?? []).filter(shouldKeepNextStep),
  ]);

  const groundingSections = executedOutcomes
    .map((outcome) => {
      const sectionItems = dedupeStrings([
        outcome.summary,
        ...outcome.detailLines,
        ...buildGroundingSectionItems(outcome),
      ]).slice(0, MAX_GROUNDING_SECTION_ITEMS);

      if (sectionItems.length === 0) return null;

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
    );

  const sections = dedupeByKey(
    [
      ...(topSection ? [topSection] : []),
      ...(nextActionSection ? [nextActionSection] : []),
      ...(structured.sections ?? []).filter(shouldKeepExistingSection),
      ...groundingSections,
      ...(toolAuditSection ? [toolAuditSection] : []),
    ],
    (section) => `${lower(section.title)}::${section.items.map(lower).join("|")}`
  );

  return {
    ...structured,
    summary: buildGroundedSummary(structured, executedOutcomes),
    context,
    status,
    files,
    nextSteps,
    sections,
  };
}

function buildExecutionSafetySection(
  flags: IntentFlags,
  deps: CodexForgeEngineDependencies
): { title: string; items: string[] } | null {
  const executableTools = getExecutableToolNames(deps);

  const unsafeAvailable = executableTools.filter(
    (toolName) =>
      MUTATION_TOOL_NAMES.has(toolName) ||
      DIFF_PREVIEW_TOOL_NAMES.has(toolName) ||
      VERIFICATION_TOOL_NAMES.has(toolName)
  );

  const items = dedupeStrings([
    `Automatic execution allowlist: ${SAFE_EXECUTION_CANDIDATE_TOOLS.join(", ")}.`,
    unsafeAvailable.length > 0
      ? `Mutation, preview, or verification-capable tools available but gated: ${unsafeAvailable.join(", ")}.`
      : "",
    flags.wantsMutation
      ? "Mutation request detected: no mutation tool may run automatically from this engine path."
      : "",
    flags.wantsDiffPreview
      ? "Diff preview request detected: generate-diff should remain dry-run and approval-gated through the UI path."
      : "",
    flags.wantsApprovalFlow
      ? "Approval request detected: approval state must be explicit, pending/rejected/applied, and stale diffs must not apply."
      : "",
    flags.wantsVerification
      ? "Verification request detected: build/test commands must be proposed or routed through an approved guarded execution path."
      : "",
  ]);

  if (items.length === 0) return null;

  return {
    title: "Execution safety",
    items,
  };
}

function enrichStructuredWithSafetyState(
  structured: CodexForgeStructuredReply,
  flags: IntentFlags,
  trace: EngineTrace,
  deps: CodexForgeEngineDependencies
): CodexForgeStructuredReply {
  const approvalSection = buildApprovalIntentSection(flags);
  const executionSafetySection = buildExecutionSafetySection(flags, deps);
  const mutationWarnings = buildMutationFirewallWarnings(flags);

  if (!approvalSection && !executionSafetySection && mutationWarnings.length === 0) {
    return structured;
  }

  trace.approvalIntentDetected =
    trace.approvalIntentDetected ||
    flags.wantsApprovalFlow ||
    flags.wantsDiffPreview ||
    flags.wantsApplyDiff;

  trace.mutationIntentBlocked =
    trace.mutationIntentBlocked || flags.wantsMutation || flags.wantsApplyDiff;

  return {
    ...structured,
    status: dedupeStrings([
      ...(structured.status ?? []),
      ...(flags.wantsDiffPreview
        ? ["Diff preview mode detected. Preview must remain dry-run by default."]
        : []),
      ...(flags.wantsApprovalFlow
        ? ["Approval flow detected. Explicit user action is required before mutation."]
        : []),
      ...mutationWarnings,
    ]),
    sections: dedupeByKey(
      [
        ...(structured.sections ?? []).filter(shouldKeepExistingSection),
        ...(approvalSection ? [approvalSection] : []),
        ...(executionSafetySection ? [executionSafetySection] : []),
      ],
      (section) => `${lower(section.title)}::${section.items.map(lower).join("|")}`
    ),
  };
}

/* ================= CLAIM GUARD / QUALITY ================= */

function collectVisibleText(
  structured: CodexForgeStructuredReply,
  text: string
): string {
  return [
    text,
    structured.title,
    structured.summary,
    structured.goal,
    structured.plan?.goal,
    ...(structured.plan?.steps ?? []),
    ...(structured.context ?? []),
    ...(structured.understanding ?? []),
    ...(structured.status ?? []),
    ...(structured.files ?? []),
    ...(structured.commands ?? []),
    ...(structured.risks ?? []),
    ...(structured.nextSteps ?? []),
    ...(structured.sections ?? []).flatMap((section) => [
      section.title,
      ...section.items,
    ]),
  ]
    .filter((value): value is string => typeof value === "string")
    .join("\n")
    .toLowerCase();
}

function collectPrimaryGroundingFromStructured(
  structured: CodexForgeStructuredReply
): {
  file?: string;
  fn?: string;
  line?: number;
  confidence?: Confidence;
} {
  const pool = [
    ...(structured.context ?? []),
    ...(structured.status ?? []),
    ...(structured.sections ?? []).flatMap((section) => section.items),
  ];

  const fileLine = pool.find((item) =>
    /^(matched file|grounded file|best grounded file|primary file):/i.test(item)
  );

  const functionLine = pool.find((item) =>
    /^(matched function|grounded function|best grounded function|best function|primary file function):/i.test(
      item
    )
  );

  const lineLine = pool.find((item) =>
    /^(matched line|grounded line|best edit line|edit line|primary file edit line):/i.test(
      item
    )
  );

  const confidenceLine = pool.find((item) =>
    /^(confidence|grounding confidence|primary file confidence):/i.test(item)
  );

  const extractAfterColon = (value: string | undefined): string | undefined => {
    if (!value) return undefined;
    const colon = value.indexOf(":");
    return colon >= 0 ? value.slice(colon + 1).trim() : value.trim();
  };

  const lineNumber = (() => {
    const value = extractAfterColon(lineLine);
    if (!value) return undefined;

    const match = value.match(/\d+/);
    return match ? Number(match[0]) : undefined;
  })();

  const confidence = (() => {
    const value = lower(extractAfterColon(confidenceLine) ?? "");

    if (value.includes("high")) return "high";
    if (value.includes("medium")) return "medium";
    if (value.includes("low")) return "low";

    return undefined;
  })();

  return {
    file: extractAfterColon(fileLine),
    fn: extractAfterColon(functionLine),
    line: lineNumber,
    confidence,
  };
}

function validateGroundedClaims(args: {
  text: string;
  structured: CodexForgeStructuredReply;
  outcomes: SafeToolOutcome[];
}): ClaimGuardResult {
  const combined = collectVisibleText(args.structured, args.text);

  const executedOutcomes = args.outcomes.filter(
    (outcome): outcome is Extract<SafeToolOutcome, { status: "executed" }> =>
      outcome.status === "executed"
  );

  const structuredGrounding = collectPrimaryGroundingFromStructured(
    args.structured
  );

  const hasExecutedTool = executedOutcomes.length > 0;

  const hasGroundedFile =
    executedOutcomes.some((outcome) => outcome.grounding?.matchedFile) ||
    !!structuredGrounding.file;

  const hasDiffPreview =
    !!args.structured.diffPreviews?.length || !!args.structured.diffs?.length;

  const hasApproval = !!args.structured.approvals?.length;

  const claimsGroundedExecution =
    combined.includes("safe tool executed") ||
    combined.includes("auto tool executed") ||
    combined.includes("tool used:") ||
    combined.includes("executed safe tools:");

  const claimsGroundedFile =
    combined.includes("grounded file") ||
    combined.includes("matched file") ||
    combined.includes("best grounded file") ||
    combined.includes("best edit target");

  const claimsDiffPreview =
    combined.includes("diff preview") ||
    combined.includes("reviewable patch") ||
    combined.includes("generate-diff");

  const claimsApproval =
    combined.includes("approval") ||
    combined.includes("approve diff") ||
    combined.includes("awaiting approval");

  const warnings = dedupeStrings([
    claimsGroundedExecution && !hasExecutedTool
      ? "Claim guard: visible response claimed tool execution, but no executed safe tool outcome was recorded."
      : "",
    claimsGroundedFile && !hasGroundedFile
      ? "Claim guard: visible response claimed grounded file evidence, but no matched file was recorded."
      : "",
    claimsDiffPreview && !hasDiffPreview
      ? "Claim guard: visible response mentioned diff previews, but no diff preview or diff was attached."
      : "",
    claimsApproval && !hasApproval && hasDiffPreview
      ? "Claim guard: visible response mentioned approval, but no approval gate was attached."
      : "",
  ]);

  return {
    warnings,
    claimsGroundedExecution,
    claimsGroundedFile,
    claimsDiffPreview,
    claimsApproval,
  };
}

function finalizeEngineTrace(
  trace: EngineTrace,
  warnings: string[],
  structured: CodexForgeStructuredReply
): EngineTrace {
  const completedAt = nowMs();

  const primaryGrounding = collectPrimaryGroundingFromStructured(structured);
  const diffPreviewCount = structured.diffPreviews?.length ?? 0;
  const pendingApprovalCount =
    structured.approvals?.filter((approval) => approval.state === "pending")
      .length ?? 0;

  return {
    ...trace,
    completedAt,
    durationMs: completedAt - trace.startedAt,
    warningCount: warnings.length,
    generatedDiffPreviewCount: diffPreviewCount,
    pendingApprovalCount,
    grounded: trace.grounded || !!primaryGrounding.file,
    groundedFile: trace.groundedFile ?? primaryGrounding.file,
    groundedFunction: trace.groundedFunction ?? primaryGrounding.fn,
    groundedLine: trace.groundedLine ?? primaryGrounding.line,
    groundingConfidence:
      trace.groundingConfidence ?? primaryGrounding.confidence,
  };
}

function buildEngineTraceSection(
  trace: EngineTrace
): { title: string; items: string[] } | null {
  const items = dedupeStrings([
    `Run: ${trace.runId}`,
    `Duration: ${trace.durationMs ?? 0}ms`,
    trace.analysisIntent ? `Intent: ${trace.analysisIntent}` : "",
    trace.domain ? `Domain: ${trace.domain}` : "",
    `Safe tool pass: ${
      trace.safeToolPassAttempted ? "attempted" : "not attempted"
    }`,
    trace.safeToolsExecuted.length
      ? `Safe tools executed: ${trace.safeToolsExecuted.join(", ")}`
      : "Safe tools executed: none",
    trace.safeToolsFailed.length
      ? `Safe tools failed: ${trace.safeToolsFailed.join(", ")}`
      : "",
    trace.groundedFile ? `Grounded file: ${trace.groundedFile}` : "",
    trace.groundedFunction ? `Grounded function: ${trace.groundedFunction}` : "",
    trace.groundedLine !== undefined
      ? `Grounded line: ${trace.groundedLine}`
      : "",
    trace.groundingConfidence
      ? `Grounding confidence: ${trace.groundingConfidence}`
      : "",
    `Diff previews: ${trace.generatedDiffPreviewCount}`,
    `Pending approvals: ${trace.pendingApprovalCount}`,
    `Approval intent detected: ${
      trace.approvalIntentDetected ? "yes" : "no"
    }`,
    `Mutation intent blocked: ${trace.mutationIntentBlocked ? "yes" : "no"}`,
    `Brain graph persisted: ${trace.graphPersisted ? "yes" : "no"}`,
    `Warnings: ${trace.warningCount}`,
    ...trace.stages.slice(0, MAX_ENGINE_TRACE_LINES).map((stage) =>
      compact([
        `${stage.name}: ${stage.status}`,
        typeof stage.durationMs === "number" ? `${stage.durationMs}ms` : "",
        stage.summary,
      ]).join(" - ")
    ),
  ]);

  if (items.length === 0) return null;

  return {
    title: "Engine trace",
    items,
  };
}

function buildResponseQuality(
  structured: CodexForgeStructuredReply,
  outcomes: SafeToolOutcome[],
  warnings: string[]
): ResponseQuality {
  const visibleText = collectVisibleText(structured, "");

  const executedOutcomes = outcomes.filter(
    (outcome) => outcome.status === "executed"
  );

  const hasGroundedOutcome = executedOutcomes.some(
    (outcome) => outcome.grounding?.matchedFile
  );

  const hasGoal = !!structured.goal || !!structured.plan?.goal;

  const hasNextSteps =
    !!structured.nextSteps?.length || !!structured.plan?.steps?.length;

  const hasFiles =
    !!structured.files?.length || !!structured.plan?.files?.length;

  const hasEvidence =
    hasGroundedOutcome ||
    visibleText.includes("safe tool executed") ||
    visibleText.includes("tool used") ||
    visibleText.includes("evidence") ||
    visibleText.includes("read file:");

  const hasToolAudit =
    structured.sections?.some((section) => lower(section.title) === "tool audit") ??
    false;

  const hasGroundedEditPoint =
    visibleText.includes("best next edit point") ||
    visibleText.includes("best grounded edit target") ||
    visibleText.includes("matched function") ||
    visibleText.includes("change target:");

  const hasDiffPreviewAwareness =
    !!structured.diffPreviews?.length ||
    !!structured.diffs?.length ||
    visibleText.includes("diff preview") ||
    visibleText.includes("reviewable patch") ||
    visibleText.includes("dry-run");

  const hasApprovalAwareness =
    !!structured.approvals?.length ||
    visibleText.includes("approval") ||
    visibleText.includes("approve") ||
    visibleText.includes("reject") ||
    visibleText.includes("explicit user action");

  const hasWarnings = warnings.length > 0;

  let score = 0;

  if (hasGoal) score += 15;
  if (hasNextSteps) score += 15;
  if (hasFiles) score += 10;
  if (hasEvidence) score += 15;
  if (hasToolAudit) score += 10;
  if (hasGroundedEditPoint) score += 20;
  if (hasDiffPreviewAwareness) score += 8;
  if (hasApprovalAwareness) score += 7;
  if (hasWarnings) score -= Math.min(15, warnings.length * 3);

  score = Math.max(0, Math.min(100, score));

  const notes = dedupeStrings([
    hasGoal ? "Goal present." : "Goal missing or weak.",
    hasNextSteps ? "Next steps present." : "Next steps missing or weak.",
    hasFiles ? "Relevant files present." : "File list missing or weak.",
    hasEvidence
      ? "Evidence or tool grounding present."
      : "Evidence missing or weak.",
    hasToolAudit ? "Tool audit present." : "Tool audit not present.",
    hasGroundedEditPoint
      ? "Grounded edit point present."
      : "Grounded edit point not present.",
    hasDiffPreviewAwareness
      ? "Diff preview awareness present."
      : "No diff preview awareness detected.",
    hasApprovalAwareness
      ? "Approval awareness present."
      : "No approval awareness detected.",
    hasWarnings ? `${warnings.length} warning(s) present.` : "No warnings present.",
  ]).slice(0, MAX_RESPONSE_QUALITY_NOTES);

  return {
    score,
    hasGoal,
    hasNextSteps,
    hasFiles,
    hasEvidence,
    hasToolAudit,
    hasGroundedEditPoint,
    hasDiffPreviewAwareness,
    hasApprovalAwareness,
    hasWarnings,
    notes,
  };
}

function buildResponseQualitySection(
  quality: ResponseQuality
): { title: string; items: string[] } {
  return {
    title: "Response quality",
    items: [`Score: ${quality.score}/100`, ...quality.notes],
  };
}

function buildExecutionPostureSection(args: {
  flags: IntentFlags;
  outcomes: SafeToolOutcome[];
  deps: CodexForgeEngineDependencies;
  warnings: string[];
}): { title: string; items: string[] } | null {
  const executableTools = getExecutableToolNames(args.deps);

  const executed = args.outcomes.filter(
    (outcome) => outcome.status === "executed"
  );

  const failed = args.outcomes.filter(
    (outcome) => outcome.status === "failed"
  );

  const items = dedupeStrings([
    `Executable tools available: ${executableTools.length}.`,
    executableTools.length > 0
      ? `Tool registry: ${executableTools.slice(0, 12).join(", ")}.`
      : "",
    `Read-only auto tools: ${SAFE_EXECUTION_CANDIDATE_TOOLS.join(", ")}.`,
    executed.length > 0
      ? `Executed safe tools: ${executed
          .map((outcome) => outcome.toolName)
          .join(", ")}.`
      : "Executed safe tools: none.",
    failed.length > 0
      ? `Failed safe tools: ${failed
          .map((outcome) => outcome.toolName)
          .join(", ")}.`
      : "",
    args.flags.wantsMutation
      ? "Mutation was requested or implied; this engine path kept mutation blocked."
      : "",
    args.flags.wantsDiffPreview
      ? "Diff preview awareness is active; use generate-diff only as dry-run preview until approval UI state exists."
      : "",
    args.flags.wantsApprovalFlow
      ? "Approval awareness is active; apply-diff must require a pending approved preview and stale-diff guard."
      : "",
    args.warnings.length > 0
      ? `Warning pressure: ${args.warnings.length} warning(s).`
      : "Warning pressure: clear.",
  ]);

  if (items.length === 0) return null;

  return {
    title: "Execution posture",
    items,
  };
}

function enrichStructuredWithDiagnostics(args: {
  structured: CodexForgeStructuredReply;
  trace: EngineTrace;
  quality: ResponseQuality;
  flags: IntentFlags;
  outcomes: SafeToolOutcome[];
  deps: CodexForgeEngineDependencies;
  warnings: string[];
}): CodexForgeStructuredReply {
  const traceSection = buildEngineTraceSection(args.trace);
  const qualitySection = buildResponseQualitySection(args.quality);

  const executionPostureSection = buildExecutionPostureSection({
    flags: args.flags,
    outcomes: args.outcomes,
    deps: args.deps,
    warnings: args.warnings,
  });

  const sections = dedupeByKey(
    [
      ...(args.structured.sections ?? []).filter(shouldKeepExistingSection),
      ...(executionPostureSection ? [executionPostureSection] : []),
      ...(traceSection ? [traceSection] : []),
      qualitySection,
    ],
    (section) => `${lower(section.title)}::${section.items.map(lower).join("|")}`
  );

  return {
    ...args.structured,
    status: dedupeStrings([
      ...(args.structured.status ?? []),
      `Engine quality score: ${args.quality.score}/100`,
      args.trace.graphPersisted
        ? "Brain graph persistence completed."
        : "Brain graph persistence did not complete.",
      args.trace.mutationIntentBlocked
        ? "Mutation firewall active."
        : "Mutation firewall clear.",
    ]),
    sections,
  };
}

/* ================= WARNINGS ================= */

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

  return dedupeStrings(warnings);
}

function buildEngineStatusWarnings(
  analysis: CodexForgeEngineAnalysis,
  context: CodexForgeChatContext,
  outcomes: SafeToolOutcome[]
): string[] {
  const warnings: string[] = [];

  const executed = outcomes.filter((outcome) => outcome.status === "executed");
  const failed = outcomes.filter((outcome) => outcome.status === "failed");
  const skipped = outcomes.filter((outcome) => outcome.status === "skipped");

  if (executed.length === 0 && shouldAutoInspectRepo(analysis, context)) {
    warnings.push(
      "CodexForge detected a repo-inspection style request, but no safe repo tool produced an executed outcome."
    );
  }

  if (failed.length > 0) {
    warnings.push(
      `${failed.length} safe repo tool action${
        failed.length === 1 ? "" : "s"
      } failed during automatic inspection.`
    );
  }

  const skippedWithWarnings = skipped.flatMap((outcome) => outcome.warnings);
  if (skippedWithWarnings.length > 0) {
    warnings.push(...skippedWithWarnings);
  }

  return dedupeStrings(warnings);
}

function buildGroundedExecutionNotes(outcomes: SafeToolOutcome[]): string[] {
  const executedOutcomes = outcomes.filter(
    (outcome): outcome is Extract<SafeToolOutcome, { status: "executed" }> =>
      outcome.status === "executed"
  );

  if (executedOutcomes.length === 0) return [];

  return dedupeStrings(
    executedOutcomes.flatMap((outcome) => {
      const grounding = outcome.grounding;

      return [
        `Safe tool executed: ${outcome.toolName}`,
        grounding?.matchedFile ? `Grounded file: ${grounding.matchedFile}` : "",
        grounding?.editFunction
          ? `Grounded function: ${grounding.editFunction}`
          : "",
        grounding?.editLine !== undefined
          ? `Grounded line: ${grounding.editLine}`
          : "",
        grounding?.confidence
          ? `Grounding confidence: ${grounding.confidence}`
          : "",
      ];
    })
  );
}

function buildFinalWarningSet(args: {
  analysis: CodexForgeEngineAnalysis;
  context: CodexForgeChatContext;
  plan: ReturnType<typeof buildPlan>;
  graphWarnings: string[];
  deps: CodexForgeEngineDependencies;
  safeToolOutcomes: SafeToolOutcome[];
  intentFlags: IntentFlags;
  claimGuardWarnings: string[];
}): string[] {
  return mergeWarnings(
    buildWarnings(args.analysis, args.context, args.plan),
    args.graphWarnings,
    buildToolExecutionWarnings(args.context, args.deps, args.safeToolOutcomes),
    buildEngineStatusWarnings(
      args.analysis,
      args.context,
      args.safeToolOutcomes
    ),
    buildMutationFirewallWarnings(args.intentFlags),
    args.claimGuardWarnings
  );
}

function withGroundedExecutionNotes(
  structured: CodexForgeStructuredReply,
  outcomes: SafeToolOutcome[]
): CodexForgeStructuredReply {
  const groundedExecutionNotes = buildGroundedExecutionNotes(outcomes);
  if (groundedExecutionNotes.length === 0) return structured;

  return {
    ...structured,
    context: dedupeStrings([
      ...(structured.context ?? []),
      ...groundedExecutionNotes,
    ]),
    status: dedupeStrings([
      ...(structured.status ?? []),
      "Grounded repo inspection completed.",
    ]),
  };
}

/* ================= MAIN ================= */

export async function runCodexForgeEngine(
  messages: CodexForgeMessage[],
  context: CodexForgeChatContext,
  dependencies?: CodexForgeEngineDependencies
): Promise<CodexForgeEngineReply> {
  const runStartedAt = nowMs();
  const trace = createEngineTrace(runStartedAt);
  const deps = dependencies ?? getCodexForgeEngineDependencies();

  const analysisStage = startTraceStage(trace, "analysis");
  const analysis = analyze(messages, context);
  const intentFlags = extractIntentFlags(analysis.userText);

  trace.analysisIntent = analysis.intent;
  trace.approvalIntentDetected =
    intentFlags.wantsApprovalFlow ||
    intentFlags.wantsDiffPreview ||
    intentFlags.wantsApplyDiff;

  trace.mutationIntentBlocked =
    intentFlags.wantsMutation || intentFlags.wantsApplyDiff;

  analysisStage.complete(`Intent: ${analysis.intent}`);

  const planStage = startTraceStage(trace, "planning");
  const plan = buildPlan(analysis, deps, context);
  trace.domain = plan.domain;

  planStage.complete(
    plan.goal ? `Goal: ${clampText(plan.goal, 160)}` : "Plan built."
  );

  const safeToolStage = startTraceStage(trace, "safe-tool-pass");
  const safeToolOutcomes = await executeSafeToolPass(
    analysis,
    context,
    deps,
    trace
  );

  const executedCount = safeToolOutcomes.filter(
    (outcome) => outcome.status === "executed"
  ).length;

  const failedCount = safeToolOutcomes.filter(
    (outcome) => outcome.status === "failed"
  ).length;

  if (failedCount > 0) {
    safeToolStage.fail(`${executedCount} executed, ${failedCount} failed.`);
  } else if (executedCount > 0) {
    safeToolStage.complete(`${executedCount} safe tool action(s) executed.`);
  } else {
    safeToolStage.skip("No safe tool action executed.");
  }

  const structuredStage = startTraceStage(trace, "structured-render");

  let structured = buildStructured(analysis, plan, context);

  structured = enrichStructuredWithToolOutcomes(structured, safeToolOutcomes);
  structured = enrichStructuredWithSafetyState(
    structured,
    intentFlags,
    trace,
    deps
  );
  structured = withGroundedExecutionNotes(structured, safeToolOutcomes);

  structuredStage.complete("Structured response assembled.");

  const graphStage = startTraceStage(trace, "brain-graph-persistence");
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

    trace.graphPersisted = true;
    graphStage.complete("Brain graph persisted.");
  } catch (error) {
    trace.graphPersisted = false;

    const warning =
      error instanceof Error && error.message.trim()
        ? `Brain graph persistence failed: ${error.message.trim()}`
        : "Brain graph persistence failed.";

    graphWarnings.push(warning);
    graphStage.fail(warning);
  }

  const claimGuardStage = startTraceStage(trace, "claim-guard");
  const textBeforeDiagnostics = structuredToText(structured);

  const claimGuard = validateGroundedClaims({
    text: textBeforeDiagnostics,
    structured,
    outcomes: safeToolOutcomes,
  });

  if (claimGuard.warnings.length > 0) {
    claimGuardStage.fail(`${claimGuard.warnings.length} claim guard warning(s).`);
  } else {
    claimGuardStage.complete("No unsupported visible claims detected.");
  }

  const finalWarnings = buildFinalWarningSet({
    analysis,
    context,
    plan,
    graphWarnings,
    deps,
    safeToolOutcomes,
    intentFlags,
    claimGuardWarnings: claimGuard.warnings,
  });

  const diagnosticsStage = startTraceStage(trace, "diagnostics");

  const preDiagnosticQuality = buildResponseQuality(
    structured,
    safeToolOutcomes,
    finalWarnings
  );

  diagnosticsStage.complete(
    `Quality: ${preDiagnosticQuality.score}/100, warnings: ${finalWarnings.length}.`
  );

  const finalizedTrace = finalizeEngineTrace(trace, finalWarnings, structured);

  structured = enrichStructuredWithDiagnostics({
    structured,
    trace: finalizedTrace,
    quality: preDiagnosticQuality,
    flags: intentFlags,
    outcomes: safeToolOutcomes,
    deps,
    warnings: finalWarnings,
  });

  return {
    text: structuredToText(structured),
    structured,
    intent: analysis.intent,
    ...(finalWarnings.length > 0 ? { warnings: finalWarnings } : {}),
  };
}




