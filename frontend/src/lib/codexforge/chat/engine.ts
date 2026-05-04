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
import {
  extractIntentFlags,
  buildApprovalIntentSection,
  buildMutationFirewallWarnings,
  executeSafeToolPass,
  shouldAutoInspectRepo,
} from "./engine-safe-tools";
import {
  buildFinalWarningSet,
  buildResponseQuality,
  enrichStructuredWithDiagnostics,
  enrichStructuredWithSafetyState,
  enrichStructuredWithToolOutcomes,
  finalizeEngineTrace,
  validateGroundedClaims,
  withGroundedExecutionNotes,
} from "./engine-grounded-render";

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
  autoToolPassAttempted: boolean;
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
  responseQualityNotes: string[];
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
    autoToolPassAttempted: false,
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
    responseQualityNotes: [],
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













