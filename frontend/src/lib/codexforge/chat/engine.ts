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

/* ================= CONSTANTS ================= */

const SAFE_EXECUTION_CANDIDATE_TOOLS = [
  "read-file",
  "list-files",
  "search-project",
] as const;

const MAX_TOOL_RESULT_PATHS = 10;
const MAX_TOOL_RESULT_LINES = 10;
const MAX_TOOL_RESULT_PREVIEW = 320;
const MAX_GROUNDED_NOTES = 10;
const MAX_MULTI_FILE_MATCHES = 8;
const MAX_FUNCTION_CANDIDATES = 96;
const MAX_GROUNDING_SECTION_ITEMS =
  MAX_TOOL_RESULT_LINES + MAX_GROUNDED_NOTES + 24;

const FALLBACK_GROUNDED_SUMMARY =
  "CodexForge produced a grounded repository response.";

const KNOWN_CORE_EDIT_TARGETS: Record<
  string,
  {
    primaryFunction: string;
    fallbacks: string[];
    role: string;
    reason: string;
  }
> = {
  "src/lib/codexforge/chat/engine.ts": {
    primaryFunction: "runCodexForgeEngine",
    fallbacks: [
      "executeSafeToolPass",
      "enrichStructuredWithToolOutcomes",
      "buildGroundedSummary",
      "buildSafeToolPlan",
      "chooseBestFunctionCandidate",
      "inferLikelyEditPoint",
    ],
    role: "This is the core chat engine orchestration layer.",
    reason:
      "It is the top-level orchestration seam where analysis, planning, safe repo inspection, structured rendering, and graph persistence converge.",
  },
  "src/lib/codexforge/chat/engine-render.ts": {
    primaryFunction: "buildStructured",
    fallbacks: ["structuredToText"],
    role: "This is the structured reply rendering layer.",
    reason:
      "It assembles structured response fields and converts them into the final visible chat answer.",
  },
  "src/lib/codexforge/chat/engine-analysis.ts": {
    primaryFunction: "analyze",
    fallbacks: ["buildPlan", "buildWarnings"],
    role: "This is the intent, domain, and plan analysis layer.",
    reason:
      "It classifies the user request and builds the plan primitives consumed by the engine.",
  },
  "src/lib/codexforge/brain/local-engine-brain.ts": {
    primaryFunction: "run",
    fallbacks: ["sanitizeContext"],
    role: "This is the local engine brain provider adapter.",
    reason:
      "It is the local provider execution entry point that turns chat requests into engine responses.",
  },
};

/* ================= TYPES ================= */

type SafeToolName = (typeof SAFE_EXECUTION_CANDIDATE_TOOLS)[number];

type Confidence = "low" | "medium" | "high";

type SafeToolPlan = {
  toolName: SafeToolName;
  reason: string;
  input: Record<string, unknown>;
};

type FunctionCandidate = {
  name: string;
  line: number;
  signature: string;
  score: number;
  reason: string;
  virtual?: boolean;
};

type GroundedFileCandidate = {
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

type SafeToolGrounding = {
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
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function clampText(text: string, max = MAX_TOOL_RESULT_PREVIEW): string {
  return text.length <= max ? text : `${text.slice(0, Math.max(0, max - 1))}…`;
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

function formatPathForDisplay(path: string): string {
  return normalizeSlashes(path).replace(/\//g, "\\");
}

function pathMatches(path: string, suffix: string): boolean {
  const cleanPath = normalizePathKey(path);
  const cleanSuffix = normalizePathKey(suffix);

  return cleanPath === cleanSuffix || cleanPath.endsWith(`/${cleanSuffix}`);
}

function findKnownTargetForPath(
  path: string
): (typeof KNOWN_CORE_EDIT_TARGETS)[string] | undefined {
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
  if (normalized.includes("/chat/")) score += 16;
  if (normalized.includes("/brain/")) score += 14;
  if (normalized.includes("/tools/")) score += 12;
  if (normalized.includes("engine")) score += 14;
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
  };
} 

/* ================= LINE / FUNCTION INFERENCE ================= */

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
    );

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

  if (name === "runCodexForgeEngine") score += 100;
  if (name === "executeSafeToolPass") score += 70;
  if (name === "enrichStructuredWithToolOutcomes") score += 65;
  if (name === "buildGroundedSummary") score += 55;
  if (name === "buildSafeToolPlan") score += 54;
  if (name === "buildStructured") score += 70;
  if (name === "structuredToText") score += 72;
  if (name === "chooseBestFunctionCandidate") score -= 30;
  if (name === "inferLikelyEditPoint") score -= 20;

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

    candidates.push({
      name,
      line: index + 1,
      signature: clampText(trimmed, 220),
      score,
      reason: "Function signature found in inspected file.",
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
  const wantsTopLevel = textSuggestsTopLevelOrchestration(userText);
  const wantsVisibleRenderer = textSuggestsVisibleRenderer(userText);
  const isRenderFile = pathMatches(path, "src/lib/codexforge/chat/engine-render.ts");

  if (isRenderFile && wantsVisibleRenderer) {
    const renderer = byName("structuredToText");
    return (
      renderer
        ? {
            ...renderer,
            score: renderer.score + 100_000,
            reason:
              "The request is about the final visible chat answer, repetition, or low-value rendered sections, so structuredToText is the correct edit point.",
          }
        : createVirtualFunctionCandidate({
            name: "structuredToText",
            score: 100_000,
            reason:
              "The request is about the final visible chat answer. The safe read may be truncated, so CodexForge selected the known visible text renderer.",
          })
    );
  }

  if (isRenderFile && userTextLower.includes("buildstructured")) {
    const structured = byName("buildStructured");
    return (
      structured ??
      createVirtualFunctionCandidate({
        name: "buildStructured",
        score: 50_000,
        reason:
          "The request explicitly mentions buildStructured, the structured reply assembly seam.",
      })
    );
  }

  if (wantsTopLevel) {
    const primary = byName(knownTarget.primaryFunction);
    return (
      primary ??
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
  const isLocalBrainFile = pathMatches(
    normalizedPath,
    "src/lib/codexforge/brain/local-engine-brain.ts"
  );

  if (isChatEngineFile) {
    const priority = [
      knownTarget,
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
      boost(byName("chooseBestFunctionCandidate"), 400, "Function ranking helper."),
      boost(byName("inferLikelyEditPoint"), 350, "Edit-point inference helper."),
    ].filter((candidate): candidate is FunctionCandidate => !!candidate);

    return [...priority, ...candidates].sort((a, b) => b.score - a.score)[0];
  }

  if (isEngineRenderFile) {
    const wantsVisibleTextRenderer = textSuggestsVisibleRenderer(userTextLower);

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

  if (isLocalBrainFile) {
    return (
      knownTarget ??
      boost(byName("run"), 10_000, "Local brain execution entry point.") ??
      boost(byName("sanitizeContext"), 8_000, "Context sanitation seam.") ??
      [...candidates].sort((a, b) => b.score - a.score)[0]
    );
  }

  if (knownTarget) {
    return knownTarget;
  }

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
  if (candidate.virtual && candidate.score >= 900) return "high";
  if (candidate.score >= 80) return "high";
  if (candidate.score >= 34) return "medium";
  return "low";
}

function describeFunctionReason(candidate: FunctionCandidate): string {
  if (candidate.name === "runCodexForgeEngine") {
    return "It is the top-level orchestration seam where analysis, planning, safe repo inspection, structured rendering, and graph persistence converge.";
  }

  if (candidate.name === "executeSafeToolPass") {
    return "It decides whether CodexForge actually performs safe repo inspection instead of only describing the action.";
  }

  if (candidate.name === "enrichStructuredWithToolOutcomes") {
    return "It merges tool outcomes into the structured reply that the UI renders.";
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
  const quoted = extractQuotedSegments(text).find(looksLikePath);
  if (quoted) return quoted;

  const tokenMatch = text.match(
    /(?:[A-Za-z]:)?(?:[A-Za-z0-9_.-]+[\\/])+[A-Za-z0-9_.-]+|[A-Za-z0-9_.-]+\.[A-Za-z0-9_.-]+/
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
    flags.wantsStructuredReplyAssembly
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
      flags.wantsStructuredReplyAssembly) &&
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

  if (knownTarget) {
    return knownTarget.role;
  }

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

  if (contentLower.includes("analyze(") || contentLower.includes("buildplan(")) {
    return "The next likely edit point is the analysis or planning path.";
  }

  if (contentLower.includes("execute") || contentLower.includes("toolexecution")) {
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
  const knownTarget = findKnownTargetForPath(normalizedPath);

  return dedupeStrings([
    parent ? `${parent}` : "",
    parent ? `${parent}/index.ts` : "",
    parent ? `${parent}/${stem}.ts` : "",
    parent ? `${parent}/${stem}.tsx` : "",
    parent ? `${parent}/${stem}-render.ts` : "",
    parent ? `${parent}/${stem}-analysis.ts` : "",
    parent ? `${parent}/${stem}-graph.ts` : "",
    parent ? `${parent}/${stem}-shared.ts` : "",
    knownTarget && parent ? `${parent}/engine-render.ts` : "",
    knownTarget && parent ? `${parent}/engine-analysis.ts` : "",
    knownTarget && parent ? `${parent}/engine-graph.ts` : "",
    knownTarget && parent ? `${parent}/engine-shared.ts` : "",
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
    ...(bestFunction && bestFunction.line > 0 ? { editLine: bestFunction.line } : {}),
    confidence,
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
    (candidate) => normalizePathKey(candidate.path)
  ).slice(0, MAX_MULTI_FILE_MATCHES);
}

function extractReadFileGrounding(
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
  if (primaryCandidate.editPoint) grounding.likelyEditPoint = primaryCandidate.editPoint;
  if (primaryCandidate.editFunction) grounding.editFunction = primaryCandidate.editFunction;
  if (primaryCandidate.confidence) grounding.confidence = primaryCandidate.confidence;

  return grounding;
}

function extractSearchProjectGrounding(
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

  return outcomes;
}

/* ================= STRUCTURED ENRICHMENT ================= */

function buildGroundingHeadline(
  grounding: SafeToolGrounding | undefined
): string | undefined {
  if (!grounding?.matchedFile) return undefined;

  const displayPath = formatPathForDisplay(grounding.matchedFile);
  const functionPart = grounding.editFunction
    ? ` → ${grounding.editFunction}(...)`
    : "";
  const linePart = grounding.editLine ? `:${grounding.editLine}` : "";

  return `${displayPath}${linePart}${functionPart}`;
}

function buildGroundingWhyLine(
  grounding: SafeToolGrounding | undefined
): string | undefined {
  if (!grounding) return undefined;

  if (grounding.editFunction === "runCodexForgeEngine") {
    return "Why this edit point: it is the top-level orchestration seam connecting analysis, planning, safe repo inspection, structured rendering, and graph persistence.";
  }

  if (grounding.editFunction === "executeSafeToolPass") {
    return "Why this edit point: it controls whether CodexForge actually runs safe repo tools instead of only describing the action.";
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
    return "Why this edit point: it assembles the structured reply fields the CodexForge UI renders.";
  }

  if (grounding.editFunction === "structuredToText") {
    return "Why this edit point: it controls the final visible chat answer, including section ordering, repetition, and low-value rendered details.";
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
    return `${headline} — ${likelyEditPoint}`;
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
    !lowerStep.includes("inspect engine-render.ts next because it controls what becomes visible")
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

  return warnings;
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
        grounding?.confidence ? `Grounding confidence: ${grounding.confidence}` : "",
      ];
    })
  );
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

  const groundedExecutionNotes = buildGroundedExecutionNotes(safeToolOutcomes);
  if (groundedExecutionNotes.length > 0) {
    structured = {
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
    buildToolExecutionWarnings(context, deps, safeToolOutcomes),
    buildEngineStatusWarnings(analysis, context, safeToolOutcomes)
  );

  return {
    text,
    structured,
    intent: analysis.intent,
    ...(warnings.length > 0 ? { warnings } : {}),
  };
}




