/* ================= TYPES ================= */

export type Confidence = "low" | "medium" | "high";

type KnownEditTarget = {
  primaryFunction: string;
  fallbacks: string[];
  role: string;
  reason: string;
};

type FunctionCandidate = {
  name: string;
  line: number;
  signature: string;
  score: number;
  reason: string;
  virtual?: boolean;
};

export type GroundedFileCandidate = {
  path: string;
  line?: number;
  preview?: string;
  role?: string;
  editPoint?: string;
  editFunction?: string;
  editLine?: number;
  confidence?: Confidence;
  signals: string[];
  relatedPaths: string[];
  source: "search-match" | "read-file";
  priority: number;
};

export type SafeToolGrounding = {
  matchedFile?: string;
  matchedLine?: number;
  fileRoleSummary?: string;
  likelyEditPoint?: string;
  editFunction?: string;
  editLine?: number;
  confidence?: Confidence;
  relatedPaths: string[];
  contentSignals: string[];
  candidateFiles: GroundedFileCandidate[];
};

type SearchProjectMatch = {
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

/* ================= CONSTANTS ================= */

const MAX_TOOL_RESULT_PATHS = 10;
const MAX_TOOL_RESULT_PREVIEW = 320;
const MAX_GROUNDED_NOTES = 10;
const MAX_MULTI_FILE_MATCHES = 8;
const MAX_FUNCTION_CANDIDATES = 96;

const KNOWN_CORE_EDIT_TARGETS: Record<string, KnownEditTarget> = {
  "src/lib/codexforge/chat/engine.ts": {
    primaryFunction: "runCodexForgeEngine",
    fallbacks: [
      "executeSafeToolPass",
      "maybeFallbackReadFileToSearchProject",
      "enrichStructuredWithToolOutcomes",
      "enrichStructuredWithSafetyState",
      "buildGroundedSummary",
      "buildSafeToolPlan",
      "validateGroundedClaims",
      "buildEngineTraceSection",
      "buildResponseQuality",
      "chooseBestFunctionCandidate",
      "inferLikelyEditPoint",
    ],
    role: "This is the core chat engine orchestration layer.",
    reason:
      "It is the top-level orchestration seam where analysis, planning, safe repo inspection, structured rendering, safety state, trace construction, claim validation, quality scoring, and graph persistence converge.",
  },
  "src/lib/codexforge/chat/engine-render.ts": {
    primaryFunction: "buildStructured",
    fallbacks: [
      "structuredToText",
      "buildDiffPreviewBundle",
      "buildDiffPreviewFromDiff",
      "buildDiffApprovalGate",
      "renderGroundedRepoText",
    ],
    role: "This is the structured reply rendering layer.",
    reason:
      "It assembles structured response fields, approval metadata, diff preview fields, and converts them into the final visible chat answer.",
  },
  "src/lib/codexforge/chat/engine-analysis.ts": {
    primaryFunction: "analyze",
    fallbacks: [
      "buildPlan",
      "buildWarnings",
      "buildPlanStatus",
      "buildUnderstandingItems",
    ],
    role: "This is the intent, domain, and plan analysis layer.",
    reason:
      "It classifies the user request and builds the plan primitives consumed by the engine.",
  },
  "src/lib/codexforge/chat/use-codexforge-chat.ts": {
    primaryFunction: "useCodexForgeChat",
    fallbacks: [
      "approvePlan",
      "rejectPlan",
      "approveDiffs",
      "rejectDiffs",
      "runEngineUiAction",
      "sendMessage",
      "executeTaskStep",
    ],
    role: "This is the client-side CodexForge chat state and execution hook.",
    reason:
      "It owns local chat state, task state, approval actions, pending execution state, stale-diff prevention, and the UI-to-engine bridge.",
  },
  "src/lib/codexforge/chat/components/chat-message.tsx": {
    primaryFunction: "ChatMessage",
    fallbacks: [
      "shouldShowApprovalActions",
      "ActionButton",
      "getMessageToneBadge",
      "isApprovalPhase",
    ],
    role: "This is the per-message UI rendering surface.",
    reason:
      "It controls assistant message display, approval action visibility, and message-level execution controls.",
  },
  "src/lib/codexforge/chat/components/structured-reply-block.tsx": {
    primaryFunction: "StructuredReplyBlock",
    fallbacks: [
      "renderStructuredSection",
      "renderDiffPreviews",
      "renderApprovals",
      "buildStructuredSummaryMeta",
    ],
    role: "This is the structured reply UI block.",
    reason:
      "It renders structured plan, execution, diff preview, approval, tool, and status metadata for the workspace UI.",
  },
  "src/lib/codexforge/tools/contracts.ts": {
    primaryFunction: "createCodexForgeToolRegistry",
    fallbacks: [
      "createCodexForgeToolSuccessResult",
      "createCodexForgeToolErrorResult",
      "createToolParameter",
      "isCodexForgeToolDefinition",
    ],
    role: "This is the shared tool contract and result-shape layer.",
    reason:
      "It defines the tool execution schema, safety metadata, handler contract, and normalized success/error result shape.",
  },
  "src/lib/codexforge/tools/server.ts": {
    primaryFunction: "executeCodexForgeTool",
    fallbacks: [
      "getCodexForgeServerToolRegistry",
      "isCodexForgeExecutableToolName",
      "buildServerRegistryTools",
      "withExecutionMetadata",
    ],
    role: "This is the server-side executable tool registry.",
    reason:
      "It binds client-safe tool descriptors to server-only handlers and enforces executable tool resolution.",
  },
  "src/lib/codexforge/tools/generate-diff.ts": {
    primaryFunction: "generateDiffTool",
    fallbacks: [
      "buildUnifiedDiff",
      "normalizeGenerateDiffInput",
      "validateGenerateDiffPath",
      "createGenerateDiffSuccess",
    ],
    role: "This is the dry-run diff preview generation tool.",
    reason:
      "It creates reviewable unified diff previews without mutating workspace files.",
  },
  "src/lib/codexforge/tools/apply-diff.ts": {
    primaryFunction: "applyDiffTool",
    fallbacks: [
      "normalizeApplyDiffInput",
      "applyUnifiedDiff",
      "createBackup",
      "createApplyDiffSuccess",
    ],
    role: "This is the guarded diff mutation tool.",
    reason:
      "It applies approved unified diffs with workspace path validation, dry-run support, and backup metadata.",
  },
  "src/lib/codexforge/types.ts": {
    primaryFunction: "CodexForgeStructuredReply",
    fallbacks: [
      "CodexForgeDiffPreview",
      "CodexForgeApprovalGate",
      "CodexForgeContextExecution",
      "CodexForgeCapabilities",
    ],
    role: "This is the shared CodexForge type contract layer.",
    reason:
      "It defines the cross-boundary contracts used by the engine, route, local hook, UI, tools, and brain graph.",
  },
  "src/lib/codexforge/brain/local-engine-brain.ts": {
    primaryFunction: "run",
    fallbacks: ["sanitizeContext", "buildLocalEngineReply"],
    role: "This is the local engine brain provider adapter.",
    reason:
      "It is the local provider execution entry point that turns chat requests into engine responses.",
  },
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

export function getFileName(path: string): string {
  const parts = splitPathSegments(path);
  return parts[parts.length - 1] ?? path;
}

export function getFileStem(path: string): string {
  const fileName = getFileName(path);
  const lastDot = fileName.lastIndexOf(".");
  return lastDot > 0 ? fileName.slice(0, lastDot) : fileName;
}

function getFileExtension(path: string): string | undefined {
  const fileName = getFileName(path);
  const lastDot = fileName.lastIndexOf(".");
  return lastDot > 0 ? fileName.slice(lastDot + 1).toLowerCase() : undefined;
}

export function formatPathForDisplay(path: string): string {
  return normalizeSlashes(path).replace(/\//g, "\\");
}

function pathMatches(path: string, suffix: string): boolean {
  const cleanPath = normalizePathKey(path);
  const cleanSuffix = normalizePathKey(suffix);

  return cleanPath === cleanSuffix || cleanPath.endsWith(`/${cleanSuffix}`);
}

function findKnownTargetForPath(path: string): KnownEditTarget | undefined {
  const normalizedPath = normalizePathKey(path);

  for (const [suffix, target] of Object.entries(KNOWN_CORE_EDIT_TARGETS)) {
    if (pathMatches(normalizedPath, suffix)) {
      return target;
    }
  }

  return undefined;
}

function scorePathSpecificity(path: string): number {
  const normalized = normalizePathKey(path);
  const depth = splitPathSegments(normalized).length;
  let score = depth * 10;

  if (normalized.includes("/src/")) score += 25;
  if (normalized.startsWith("src/")) score += 25;
  if (normalized.includes("/lib/")) score += 20;
  if (normalized.includes("/app/")) score += 20;
  if (normalized.includes("/api/")) score += 18;
  if (normalized.includes("/chat/")) score += 18;
  if (normalized.includes("/brain/")) score += 14;
  if (normalized.includes("/tools/")) score += 14;
  if (normalized.includes("/components/")) score += 12;
  if (normalized.includes("engine")) score += 16;
  if (normalized.includes("render")) score += 10;
  if (normalized.includes("analysis")) score += 10;
  if (normalized.includes("types")) score += 8;
  if (normalized.endsWith(".ts")) score += 8;
  if (normalized.endsWith(".tsx")) score += 10;
  if (normalized.endsWith(".md")) score += 3;
  if (normalized.endsWith("/index.ts")) score -= 6;
  if (normalized.includes("/node_modules/")) score -= 100;
  if (normalized.includes("/.next/")) score -= 100;
  if (normalized.includes("/dist/")) score -= 70;
  if (normalized.includes("/build/")) score -= 70;

  return score;
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

/* ================= FUNCTION INFERENCE ================= */

function extractFunctionNameFromLine(line: string): string | undefined {
  const functionMatch =
    line.match(/\bexport\s+async\s+function\s+([A-Za-z0-9_]+)\s*\(/) ??
    line.match(/\bexport\s+function\s+([A-Za-z0-9_]+)\s*\(/) ??
    line.match(/\basync\s+function\s+([A-Za-z0-9_]+)\s*\(/) ??
    line.match(/\bfunction\s+([A-Za-z0-9_]+)\s*\(/) ??
    line.match(
      /\bconst\s+([A-Za-z0-9_]+)\s*=\s*(?:async\s*)?\([^)]*\)\s*=>/
    ) ??
    line.match(
      /\bconst\s+([A-Za-z0-9_]+)\s*=\s*(?:async\s*)?[A-Za-z0-9_]+\s*=>/
    ) ??
    line.match(/\btype\s+([A-Za-z0-9_]+)\s*=/) ??
    line.match(/\binterface\s+([A-Za-z0-9_]+)\s*\{/);

  return functionMatch?.[1]?.trim();
}

function scoreFunctionName(name: string): number {
  let score = 0;

  if (name.startsWith("run")) score += 24;
  if (name.includes("CodexForge")) score += 20;
  if (name.includes("Engine")) score += 18;
  if (name.includes("Structured")) score += 14;
  if (name.includes("Tool")) score += 14;
  if (name.includes("Ground")) score += 14;
  if (name.includes("Plan")) score += 10;
  if (name.includes("Analysis")) score += 10;
  if (name.includes("Render")) score += 10;
  if (name.includes("Persist")) score += 8;
  if (name.includes("Build")) score += 6;
  if (name.includes("Infer")) score += 4;
  if (name.includes("Choose")) score += 3;
  if (name.includes("Approval")) score += 16;
  if (name.includes("Diff")) score += 16;
  if (name.includes("Preview")) score += 12;
  if (name.includes("Quality")) score += 10;
  if (name.includes("Trace")) score += 10;
  if (name.includes("Guard")) score += 10;
  if (name.includes("Safety")) score += 10;
  if (name.includes("Validate")) score += 10;

  if (name === "runCodexForgeEngine") score += 120;
  if (name === "executeSafeToolPass") score += 70;
  if (name === "maybeFallbackReadFileToSearchProject") score += 68;
  if (name === "enrichStructuredWithToolOutcomes") score += 65;
  if (name === "enrichStructuredWithSafetyState") score += 66;
  if (name === "buildGroundedSummary") score += 55;
  if (name === "buildSafeToolPlan") score += 54;
  if (name === "buildStructured") score += 70;
  if (name === "structuredToText") score += 72;
  if (name === "validateGroundedClaims") score += 78;
  if (name === "buildResponseQuality") score += 64;
  if (name === "buildEngineTraceSection") score += 58;
  if (name === "chooseBestFunctionCandidate") score -= 20;
  if (name === "inferLikelyEditPoint") score -= 10;

  return score;
}

function findFunctionCandidates(content: string): FunctionCandidate[] {
  const lines = content.split(/\r?\n/);
  const candidates: FunctionCandidate[] = [];

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    const name = extractFunctionNameFromLine(trimmed);
    if (!name) return;

    let score = scoreFunctionName(name);
    const lowered = lower(trimmed);

    if (lowered.startsWith("export async function")) score += 36;
    else if (lowered.startsWith("export function")) score += 30;
    else if (lowered.startsWith("async function")) score += 24;
    else if (lowered.startsWith("function")) score += 20;
    else if (lowered.startsWith("const")) score += 12;
    else if (lowered.startsWith("type")) score += 8;
    else if (lowered.startsWith("interface")) score += 8;

    candidates.push({
      name,
      line: index + 1,
      signature: clampText(trimmed, 220),
      score,
      reason: "Symbol signature found in inspected file.",
    });
  });

  return candidates
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_FUNCTION_CANDIDATES);
}

function createVirtualFunctionCandidate(args: {
  name: string;
  reason: string;
  score?: number;
}): FunctionCandidate {
  return {
    name: args.name,
    line: 0,
    signature: `${args.name}(...)`,
    score: args.score ?? 999,
    reason: args.reason,
    virtual: true,
  };
}

function chooseKnownTargetCandidate(
  path: string,
  candidates: FunctionCandidate[],
  userText: string
): FunctionCandidate | undefined {
  const knownTarget = findKnownTargetForPath(path);
  if (!knownTarget) return undefined;

  const byName = (name: string): FunctionCandidate | undefined =>
    candidates.find((candidate) => candidate.name === name);

  const userTextLower = lower(userText);
  const flags = extractIntentFlags(userTextLower);
  const wantsTopLevel = textSuggestsTopLevelOrchestration(userTextLower);
  const wantsVisibleRenderer = textSuggestsVisibleRenderer(userTextLower);

  const isRenderFile = pathMatches(
    path,
    "src/lib/codexforge/chat/engine-render.ts"
  );
  const isHookFile = pathMatches(
    path,
    "src/lib/codexforge/chat/use-codexforge-chat.ts"
  );
  const isChatMessageFile = pathMatches(
    path,
    "src/lib/codexforge/chat/components/chat-message.tsx"
  );
  const isStructuredBlockFile = pathMatches(
    path,
    "src/lib/codexforge/chat/components/structured-reply-block.tsx"
  );
  const isToolServerFile = pathMatches(
    path,
    "src/lib/codexforge/tools/server.ts"
  );
  const isTypesFile = pathMatches(path, "src/lib/codexforge/types.ts");

  if (isRenderFile && wantsVisibleRenderer) {
    const renderer = byName("structuredToText");
    return (
      renderer ??
      createVirtualFunctionCandidate({
        name: "structuredToText",
        score: 100_000,
        reason:
          "The request is about the final visible chat answer. The safe read may be truncated, so CodexForge selected the known visible text renderer.",
      })
    );
  }

  if (isRenderFile && (flags.wantsDiffPreview || flags.wantsApprovalFlow)) {
    return (
      byName("buildDiffPreviewBundle") ??
      byName("buildDiffPreviewFromDiff") ??
      byName("buildDiffApprovalGate") ??
      byName("buildStructured") ??
      createVirtualFunctionCandidate({
        name: "buildDiffPreviewBundle",
        score: 100_000,
        reason:
          "The request is about approval-driven diff preview rendering, so the diff preview bundle builder is the correct seam.",
      })
    );
  }

  if (isHookFile && (flags.wantsApprovalFlow || flags.wantsApplyDiff)) {
    return (
      byName("approveDiffs") ??
      byName("rejectDiffs") ??
      byName("runEngineUiAction") ??
      byName("useCodexForgeChat") ??
      createVirtualFunctionCandidate({
        name: "approveDiffs",
        score: 100_000,
        reason:
          "The request is about client-side approval actions, so the approval handler in the chat hook is the correct seam.",
      })
    );
  }

  if (isChatMessageFile && flags.wantsApprovalFlow) {
    return (
      byName("shouldShowApprovalActions") ??
      byName("ActionButton") ??
      byName("ChatMessage") ??
      createVirtualFunctionCandidate({
        name: "shouldShowApprovalActions",
        score: 100_000,
        reason:
          "The request is about message-level approval controls, so approval action visibility is the correct seam.",
      })
    );
  }

  if (isStructuredBlockFile && flags.wantsDiffPreview) {
    return (
      byName("renderDiffPreviews") ??
      byName("renderApprovals") ??
      byName("StructuredReplyBlock") ??
      createVirtualFunctionCandidate({
        name: "renderDiffPreviews",
        score: 100_000,
        reason:
          "The request is about rendering diff previews in structured UI, so the diff preview renderer is the correct seam.",
      })
    );
  }

  if (isToolServerFile && flags.wantsApplyDiff) {
    return (
      byName("executeCodexForgeTool") ??
      createVirtualFunctionCandidate({
        name: "executeCodexForgeTool",
        score: 100_000,
        reason:
          "The request is about server-side tool execution and apply-diff gating, so executeCodexForgeTool is the correct seam.",
      })
    );
  }

  if (isTypesFile && (flags.wantsDiffPreview || flags.wantsApprovalFlow)) {
    return (
      byName("CodexForgeDiffPreview") ??
      byName("CodexForgeApprovalGate") ??
      byName("CodexForgeStructuredReply") ??
      createVirtualFunctionCandidate({
        name: "CodexForgeDiffPreview",
        score: 100_000,
        reason:
          "The request is about the approval/diff preview contract, so the shared diff preview type is the correct seam.",
      })
    );
  }

  if (isRenderFile && userTextLower.includes("buildstructured")) {
    return (
      byName("buildStructured") ??
      createVirtualFunctionCandidate({
        name: "buildStructured",
        score: 50_000,
        reason:
          "The request explicitly mentions buildStructured, the structured reply assembly seam.",
      })
    );
  }

  if (wantsTopLevel) {
    return (
      byName(knownTarget.primaryFunction) ??
      createVirtualFunctionCandidate({
        name: knownTarget.primaryFunction,
        score: 100_000,
        reason:
          "The request asks for the top-level orchestration seam. The safe read may be truncated, so CodexForge selected the known canonical entry point for this file.",
      })
    );
  }

  const primary = byName(knownTarget.primaryFunction);
  if (primary) {
    return {
      ...primary,
      score: primary.score + 50_000,
      reason: knownTarget.reason,
    };
  }

  for (const fallback of knownTarget.fallbacks) {
    const candidate = byName(fallback);
    if (candidate) {
      return {
        ...candidate,
        score: candidate.score + 2_000,
        reason: `Known fallback target for ${path}.`,
      };
    }
  }

  return createVirtualFunctionCandidate({
    name: knownTarget.primaryFunction,
    score: 50_000,
    reason:
      "Known canonical target for this file. The safe read output was probably truncated before the function definition.",
  });
}

function chooseBestFunctionCandidate(
  path: string,
  content: string,
  userText = ""
): FunctionCandidate | undefined {
  const normalizedPath = normalizePathKey(path);
  const contentLower = lower(content);
  const userTextLower = lower(userText);
  const candidates = findFunctionCandidates(content);
  const flags = extractIntentFlags(userTextLower);

  const byName = (name: string): FunctionCandidate | undefined =>
    candidates.find((candidate) => candidate.name === name);

  const boost = (
    candidate: FunctionCandidate | undefined,
    amount: number,
    reason?: string
  ): FunctionCandidate | undefined =>
    candidate
      ? {
          ...candidate,
          score: candidate.score + amount,
          ...(reason ? { reason } : {}),
        }
      : undefined;

  const knownTarget = chooseKnownTargetCandidate(path, candidates, userText);

  const isChatEngineFile = pathMatches(
    normalizedPath,
    "src/lib/codexforge/chat/engine.ts"
  );
  const isEngineRenderFile = pathMatches(
    normalizedPath,
    "src/lib/codexforge/chat/engine-render.ts"
  );
  const isEngineAnalysisFile = pathMatches(
    normalizedPath,
    "src/lib/codexforge/chat/engine-analysis.ts"
  );
  const isLocalBrainFile = pathMatches(
    normalizedPath,
    "src/lib/codexforge/brain/local-engine-brain.ts"
  );
  const isChatHookFile = pathMatches(
    normalizedPath,
    "src/lib/codexforge/chat/use-codexforge-chat.ts"
  );
  const isToolServerFile = pathMatches(
    normalizedPath,
    "src/lib/codexforge/tools/server.ts"
  );

  if (isChatEngineFile) {
    const priority = [
      knownTarget,
      flags.wantsApprovalFlow || flags.wantsDiffPreview || flags.wantsMutation
        ? boost(
            byName("enrichStructuredWithSafetyState"),
            82_000,
            "Approval/diff work should surface safety state through structured output before rendering."
          )
        : undefined,
      flags.wantsApprovalFlow || flags.wantsDiffPreview || flags.wantsMutation
        ? boost(
            byName("validateGroundedClaims"),
            80_000,
            "Approval/diff work benefits from the claim guard and final response validation seam."
          )
        : undefined,
      boost(
        byName("runCodexForgeEngine"),
        50_000,
        "Primary chat engine orchestration entry point."
      ) ??
        createVirtualFunctionCandidate({
          name: "runCodexForgeEngine",
          score: 50_000,
          reason:
            "Primary chat engine orchestration entry point. The read output may be truncated before the function definition.",
        }),
      boost(
        byName("executeSafeToolPass"),
        2_000,
        "Safe repo inspection execution coordinator."
      ),
      boost(
        byName("maybeFallbackReadFileToSearchProject"),
        1_950,
        "Recovery seam when explicit file reads fail."
      ),
      boost(
        byName("enrichStructuredWithToolOutcomes"),
        1_800,
        "Tool result to structured response enrichment seam."
      ),
      boost(
        byName("buildGroundedSummary"),
        1_600,
        "Grounded summary rendering seam."
      ),
      boost(byName("buildSafeToolPlan"), 1_200, "Safe tool selection planner."),
      boost(byName("buildResponseQuality"), 900, "Response quality scoring seam."),
      boost(byName("buildEngineTraceSection"), 800, "Engine trace visibility seam."),
      boost(byName("chooseBestFunctionCandidate"), 400, "Function ranking helper."),
      boost(byName("inferLikelyEditPoint"), 350, "Edit-point inference helper."),
    ].filter((candidate): candidate is FunctionCandidate => !!candidate);

    return [...priority, ...candidates].sort((a, b) => b.score - a.score)[0];
  }

  if (isEngineRenderFile) {
    const wantsVisibleTextRenderer = textSuggestsVisibleRenderer(userTextLower);

    if (flags.wantsDiffPreview || flags.wantsApprovalFlow) {
      return (
        knownTarget ??
        boost(
          byName("buildDiffPreviewBundle"),
          100_000,
          "The user asked about approval-driven diff previews, so diff preview bundle construction is the correct edit point."
        ) ??
        boost(
          byName("buildStructured"),
          90_000,
          "Structured reply assembly owns diff preview attachment."
        ) ??
        createVirtualFunctionCandidate({
          name: "buildDiffPreviewBundle",
          score: 100_000,
          reason:
            "The user asked about approval-driven diff previews. The read output may be truncated before the diff preview helper.",
        })
      );
    }

    if (wantsVisibleTextRenderer) {
      return (
        knownTarget ??
        boost(
          byName("structuredToText"),
          100_000,
          "The user asked about the final visible chat answer, repetition, or duplicate rendered sections, so structuredToText is the correct edit point."
        ) ??
        createVirtualFunctionCandidate({
          name: "structuredToText",
          score: 100_000,
          reason:
            "The user asked about the final visible chat answer. The read output may be truncated before structuredToText.",
        })
      );
    }

    return (
      knownTarget ??
      boost(byName("buildStructured"), 10_000, "Structured reply assembly seam.") ??
      boost(byName("structuredToText"), 9_000, "Visible text rendering seam.") ??
      [...candidates].sort((a, b) => b.score - a.score)[0]
    );
  }

  if (isEngineAnalysisFile) {
    return (
      knownTarget ??
      boost(byName("analyze"), 10_000, "Intent analysis entry point.") ??
      boost(byName("buildPlan"), 9_000, "Planning assembly seam.") ??
      boost(byName("buildWarnings"), 7_000, "Warning construction seam.") ??
      [...candidates].sort((a, b) => b.score - a.score)[0]
    );
  }

  if (isLocalBrainFile) {
    return (
      knownTarget ??
      boost(byName("run"), 10_000, "Local brain execution entry point.") ??
      boost(byName("sanitizeContext"), 8_000, "Context sanitation seam.") ??
      [...candidates].sort((a, b) => b.score - a.score)[0]
    );
  }

  if (isChatHookFile) {
    return (
      knownTarget ??
      boost(byName("useCodexForgeChat"), 10_000, "Client state and action hook.") ??
      boost(byName("approveDiffs"), 9_000, "Diff approval action seam.") ??
      boost(byName("rejectDiffs"), 8_000, "Diff rejection action seam.") ??
      boost(byName("runEngineUiAction"), 7_000, "UI to engine action dispatcher.") ??
      [...candidates].sort((a, b) => b.score - a.score)[0]
    );
  }

  if (isToolServerFile) {
    return (
      knownTarget ??
      boost(byName("executeCodexForgeTool"), 10_000, "Server tool execution seam.") ??
      boost(
        byName("isCodexForgeExecutableToolName"),
        8_000,
        "Executable tool name validation seam."
      ) ??
      [...candidates].sort((a, b) => b.score - a.score)[0]
    );
  }

  if (knownTarget) return knownTarget;

  if (contentLower.includes("runcodexforgeengine(")) {
    return (
      boost(
        byName("runCodexForgeEngine"),
        10_000,
        "Referenced engine orchestration function."
      ) ??
      boost(
        byName("executeSafeToolPass"),
        5_000,
        "Referenced safe tool execution function."
      ) ??
      [...candidates].sort((a, b) => b.score - a.score)[0]
    );
  }

  return [...candidates].sort((a, b) => b.score - a.score)[0];
}

function confidenceForEditPoint(
  candidate: FunctionCandidate | undefined
): Confidence {
  if (!candidate) return "low";
  if (candidate.name === "runCodexForgeEngine") return "high";
  if (candidate.name === "structuredToText") return "high";
  if (candidate.name === "buildStructured") return "high";
  if (candidate.name === "validateGroundedClaims") return "high";
  if (candidate.name === "enrichStructuredWithSafetyState") return "high";
  if (candidate.name === "buildResponseQuality") return "high";
  if (candidate.virtual && candidate.score >= 900) return "high";
  if (candidate.score >= 80) return "high";
  if (candidate.score >= 34) return "medium";
  return "low";
}

function describeFunctionReason(candidate: FunctionCandidate): string {
  if (candidate.name === "runCodexForgeEngine") {
    return "It is the top-level orchestration seam where analysis, planning, safe repo inspection, structured rendering, safety state, trace construction, claim validation, quality scoring, and graph persistence converge.";
  }

  if (candidate.name === "executeSafeToolPass") {
    return "It decides whether CodexForge actually performs safe repo inspection instead of only describing the action.";
  }

  if (candidate.name === "maybeFallbackReadFileToSearchProject") {
    return "It recovers from failed explicit reads by searching the repository for the intended file instead of leaving the response generic.";
  }

  if (candidate.name === "enrichStructuredWithToolOutcomes") {
    return "It merges tool outcomes into the structured reply that the UI renders.";
  }

  if (candidate.name === "enrichStructuredWithSafetyState") {
    return "It surfaces approval, diff-preview, dry-run, and mutation-blocking state in the structured response.";
  }

  if (candidate.name === "buildGroundedSummary") {
    return "It controls the first visible grounded summary shown after tool execution.";
  }

  if (candidate.name === "buildSafeToolPlan") {
    return "It controls which safe repo inspection tool CodexForge chooses for the request.";
  }

  if (candidate.name === "buildStructured") {
    return "It assembles the structured reply fields that the workspace renders.";
  }

  if (candidate.name === "structuredToText") {
    return "It controls the final visible chat text, including repetition, section ordering, and low-value rendered details.";
  }

  if (candidate.name === "validateGroundedClaims") {
    return "It prevents the final response from claiming tool execution, grounding, approvals, or diff previews that were not actually produced.";
  }

  if (candidate.name === "buildResponseQuality") {
    return "It scores response completeness so thin answers can be detected and improved.";
  }

  if (candidate.name === "buildEngineTraceSection") {
    return "It exposes the real engine path through traceable structured sections.";
  }

  return candidate.reason;
}

function buildSpecificEditPoint(
  path: string,
  content: string,
  userText = ""
): string | undefined {
  const candidate = chooseBestFunctionCandidate(path, content, userText);
  if (!candidate) return undefined;

  const displayPath = formatPathForDisplay(path);
  const confidence = confidenceForEditPoint(candidate);
  const reason = describeFunctionReason(candidate);
  const linePart = candidate.line > 0 ? `:${candidate.line}` : "";

  return `Best next edit point: ${candidate.name}(...) at ${displayPath}${linePart}. ${reason} Confidence: ${confidence}.`;
}

/* ================= JSON / RESULT PARSING ================= */

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

      const line = asFiniteNumber(record.line);
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
  const normalizedPath = normalizePathKey(path);
  const contentLower = lower(content);
  const extension = getFileExtension(path);
  const knownTarget = findKnownTargetForPath(normalizedPath);

  if (knownTarget) return knownTarget.role;

  if (
    contentLower.includes("runcodexforgeengine") ||
    contentLower.includes("executesafetoolpass") ||
    contentLower.includes("enrichstructuredwithtooloutcomes")
  ) {
    return "This looks like the core chat engine orchestration layer.";
  }

  if (
    contentLower.includes("structuredtotext") ||
    contentLower.includes("buildstructured")
  ) {
    return "This looks like the structured reply rendering layer.";
  }

  if (
    contentLower.includes("diffpreview") ||
    contentLower.includes("approvalgate") ||
    contentLower.includes("approvalrequired")
  ) {
    return "This looks like an approval or diff-preview contract surface.";
  }

  if (
    normalizedPath.includes("/api/") ||
    normalizedPath.endsWith("/route.ts") ||
    contentLower.includes("nextresponse")
  ) {
    return "This looks like an API or route surface.";
  }

  if (normalizedPath.includes("/components/") || normalizedPath.endsWith(".tsx")) {
    return "This looks like a UI/component surface.";
  }

  if (normalizedPath.includes("/hooks/") || normalizedPath.includes("use-")) {
    return "This looks like a hook or reusable state surface.";
  }

  if (normalizedPath.includes("/types") || normalizedPath.endsWith(".d.ts")) {
    return "This looks like a shared typing or contract surface.";
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

function inferLikelyEditPoint(
  path: string,
  content: string,
  userText = ""
): string | undefined {
  const specific = buildSpecificEditPoint(path, content, userText);
  if (specific) return specific;

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
    contentLower.includes("diffpreview") ||
    contentLower.includes("approvalgate") ||
    contentLower.includes("approvalrequired")
  ) {
    return "The next likely edit point is the approval or diff-preview contract path.";
  }

  if (contentLower.includes("analyze(") || contentLower.includes("buildplan(")) {
    return "The next likely edit point is the analysis or planning path.";
  }

  if (contentLower.includes("execute") || contentLower.includes("toolexecution")) {
    return "The next likely edit point is the tool execution path.";
  }

  const parent = getParentPath(path);
  if (parent) return `The next likely edit point is near ${parent}.`;

  return undefined;
}

function inferRelatedPaths(path: string): string[] {
  const normalizedPath = normalizeSlashes(path);
  const parent = getParentPath(normalizedPath);
  const stem = getFileStem(normalizedPath);
  const knownTarget = findKnownTargetForPath(normalizedPath);

  return dedupeStrings([
    parent ? `${parent}` : "",
    parent ? `${parent}/index.ts` : "",
    parent ? `${parent}/${stem}.ts` : "",
    parent ? `${parent}/${stem}.tsx` : "",
    parent ? `${parent}/${stem}-render.ts` : "",
    parent ? `${parent}-${stem}.ts` : "",
    parent ? `${parent}/${stem}-analysis.ts` : "",
    parent ? `${parent}/${stem}-graph.ts` : "",
    parent ? `${parent}/${stem}-shared.ts` : "",
    knownTarget && parent ? `${parent}/engine-render.ts` : "",
    knownTarget && parent ? `${parent}/engine-analysis.ts` : "",
    knownTarget && parent ? `${parent}/engine-graph.ts` : "",
    knownTarget && parent ? `${parent}/engine-shared.ts` : "",
    knownTarget ? "src/lib/codexforge/types.ts" : "",
    knownTarget ? "src/lib/codexforge/tools/server.ts" : "",
    knownTarget ? "src/lib/codexforge/tools/contracts.ts" : "",
    knownTarget ? "src/lib/codexforge/chat/use-codexforge-chat.ts" : "",
    knownTarget
      ? "src/lib/codexforge/chat/components/chat-message.tsx"
      : "",
    knownTarget
      ? "src/lib/codexforge/chat/components/structured-reply-block.tsx"
      : "",
  ])
    .filter((candidate) => normalizePathKey(candidate) !== normalizePathKey(path))
    .slice(0, MAX_TOOL_RESULT_PATHS);
}

function extractContentSignals(content: string): string[] {
  const lines = content
    .split(/\r?\n/)
    .map((line, index) => ({
      line: index + 1,
      text: line.trim(),
    }))
    .filter((entry) => entry.text.length > 0);

  const candidates = lines.filter((entry) => {
    const lowered = lower(entry.text);

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
    .map((entry) => `${entry.line}| ${clampText(entry.text)}`);
}

function extractFocusedSnippet(
  content: string,
  line: number | undefined
): string[] {
  if (!line || line <= 0) return [];

  const lines = content.split(/\r?\n/);
  const start = Math.max(0, line - 3);
  const end = Math.min(lines.length, line + 2);

  return lines
    .slice(start, end)
    .map((text, index) => `${start + index + 1}| ${clampText(text.trim(), 180)}`)
    .filter((item) => !item.endsWith("|"));
}

function createGroundedFileCandidate(args: {
  path: string;
  source: "search-match" | "read-file";
  line?: number;
  preview?: string;
  content?: string;
  userText?: string;
}): GroundedFileCandidate {
  const content = args.content ?? "";
  const userText = args.userText ?? "";
  const role = inferFileRoleSummary(args.path, content);
  const bestFunction = chooseBestFunctionCandidate(args.path, content, userText);
  const editPoint = inferLikelyEditPoint(args.path, content, userText);
  const confidence = confidenceForEditPoint(bestFunction);

  const signals = dedupeStrings([
    ...(args.preview ? [clampText(args.preview)] : []),
    ...extractFocusedSnippet(content, bestFunction?.line || args.line),
    ...extractContentSignals(content),
    bestFunction?.virtual
      ? `Known target: ${bestFunction.name}(...) is the canonical entry point for ${args.path}.`
      : "",
  ]).slice(0, MAX_GROUNDED_NOTES);

  let priority = scorePathSpecificity(args.path);

  if (args.source === "read-file") priority += 120;
  if (args.line !== undefined) priority += 10;
  if (bestFunction?.line !== undefined && bestFunction.line > 0) priority += 16;
  if (bestFunction?.virtual) priority += 20;
  if (bestFunction?.name === "runCodexForgeEngine") priority += 100;
  if (bestFunction?.name === "structuredToText") priority += 100;
  if (bestFunction?.name === "buildStructured") priority += 70;
  if (bestFunction?.name === "validateGroundedClaims") priority += 65;
  if (bestFunction?.name === "enrichStructuredWithSafetyState") priority += 65;
  if (role) priority += 8;
  if (editPoint) priority += 12;
  if (confidence === "high") priority += 25;
  if (confidence === "medium") priority += 10;
  priority += signals.length * 3;

  return {
    path: args.path,
    source: args.source,
    ...(args.line !== undefined ? { line: args.line } : {}),
    ...(args.preview ? { preview: clampText(args.preview) } : {}),
    ...(role ? { role } : {}),
    ...(editPoint ? { editPoint } : {}),
    ...(bestFunction ? { editFunction: bestFunction.name } : {}),
    ...(bestFunction && bestFunction.line > 0
      ? { editLine: bestFunction.line }
      : {}),
    confidence,
    signals,
    relatedPaths: inferRelatedPaths(args.path),
    priority,
  };
}

export function normalizeGroundedCandidates(
  candidates: GroundedFileCandidate[]
): GroundedFileCandidate[] {
  return dedupeByKey(
    [...candidates].sort((a, b) => b.priority - a.priority),
    (candidate) => normalizePathKey(candidate.path)
  ).slice(0, MAX_MULTI_FILE_MATCHES);
}

export function extractReadFileGrounding(
  path: string,
  json: Record<string, unknown> | null,
  userText = ""
): SafeToolGrounding | undefined {
  if (!json) return undefined;

  const text = extractReadFileText(json);
  const matchedFile =
    asString(json.relativePath) ?? asString(json.requestedPath) ?? path.trim();

  const content = text ?? "";

  const primaryCandidate = createGroundedFileCandidate({
    path: matchedFile,
    source: "read-file",
    content,
    preview: asString(json.preview) ?? text,
    userText,
  });

  const grounding: SafeToolGrounding = {
    matchedFile,
    candidateFiles: [primaryCandidate],
    relatedPaths: primaryCandidate.relatedPaths,
    contentSignals: primaryCandidate.signals,
  };

  if (primaryCandidate.editLine !== undefined) {
    grounding.matchedLine = primaryCandidate.editLine;
    grounding.editLine = primaryCandidate.editLine;
  } else if (primaryCandidate.line !== undefined) {
    grounding.matchedLine = primaryCandidate.line;
  }

  if (primaryCandidate.role) grounding.fileRoleSummary = primaryCandidate.role;
  if (primaryCandidate.editPoint) {
    grounding.likelyEditPoint = primaryCandidate.editPoint;
  }
  if (primaryCandidate.editFunction) {
    grounding.editFunction = primaryCandidate.editFunction;
  }
  if (primaryCandidate.confidence) grounding.confidence = primaryCandidate.confidence;

  return grounding;
}

export function extractSearchProjectGrounding(
  json: Record<string, unknown> | null,
  userText = ""
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
        userText,
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
    ...(primary.editFunction ? { editFunction: primary.editFunction } : {}),
    ...(primary.editLine !== undefined ? { editLine: primary.editLine } : {}),
    ...(primary.confidence ? { confidence: primary.confidence } : {}),
    relatedPaths: dedupeStrings(
      candidates.flatMap((candidate) => candidate.relatedPaths)
    ).slice(0, MAX_TOOL_RESULT_PATHS),
    contentSignals: dedupeStrings(
      candidates.flatMap((candidate) => candidate.signals)
    ).slice(0, MAX_GROUNDED_NOTES),
    candidateFiles: candidates,
  };
}

export function mergeGroundings(
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
      primary?.editLine ??
      primary?.line ??
      existing.matchedLine ??
      incoming.matchedLine,
    fileRoleSummary:
      primary?.role ?? existing.fileRoleSummary ?? incoming.fileRoleSummary,
    likelyEditPoint:
      primary?.editPoint ??
      existing.likelyEditPoint ??
      incoming.likelyEditPoint,
    editFunction:
      primary?.editFunction ?? existing.editFunction ?? incoming.editFunction,
    editLine: primary?.editLine ?? existing.editLine ?? incoming.editLine,
    confidence: primary?.confidence ?? existing.confidence ?? incoming.confidence,
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
