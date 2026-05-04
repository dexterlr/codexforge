import type {
  CodexForgeChatContext,
  CodexForgeStructuredReply,
} from "../types";
import type {
  CodexForgeEngineAnalysis,
  CodexForgeEngineDependencies,
} from "./contracts";
import { buildPlan, buildWarnings } from "./engine-analysis";
import { buildStructured, structuredToText } from "./engine-render";
import { mergeWarnings } from "./engine-shared";
import {
  formatPathForDisplay,
  getFileName,
  getFileStem,
  mergeGroundings,
  normalizeGroundedCandidates,
  type Confidence,
  type SafeToolGrounding,
} from "./engine-grounding";
import {
  shouldAutoInspectRepo,
  SAFE_EXECUTION_CANDIDATE_TOOLS,
  getExecutableToolNames,
  buildApprovalIntentSection,
  buildMutationFirewallWarnings,
  type IntentFlags,
  type SafeToolOutcome,
} from "./engine-safe-tools";

/* ================= CONSTANTS ================= */

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
const MAX_RESPONSE_QUALITY_NOTES = 12;
const MAX_ENGINE_TRACE_LINES = 18;
const MAX_GROUNDING_SECTION_ITEMS = MAX_TOOL_RESULT_LINES + 10 + 28;

const FALLBACK_GROUNDED_SUMMARY =
  "CodexForge produced a grounded repository response.";

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
type EngineTraceStageForGroundedRender = {
  name: string;
  status: "pending" | "running" | "completed" | "failed" | "skipped";
  startedAt: number;
  completedAt?: number;
  durationMs?: number;
  summary?: string;
};

type EngineTraceForGroundedRender = {
  runId?: string;
  startedAt: number;
  completedAt?: number;
  durationMs?: number;
  analysisIntent?: string;
  domain?: string;
  graphPersisted?: boolean;
  warningCount?: number;
  generatedDiffPreviewCount?: number;
  pendingApprovalCount?: number;
  approvalIntentDetected: boolean;
  mutationIntentBlocked: boolean;
  autoToolPassAttempted: boolean;
  safeToolPassAttempted: boolean;
  safeToolsExecuted: string[];
  safeToolsFailed: string[];
  grounded: boolean;
  groundedFile?: string;
  groundedFunction?: string;
  groundedLine?: number;
  groundingConfidence?: Confidence;
  responseQualityNotes: string[];
  stages: EngineTraceStageForGroundedRender[];
};
/* ================= LOCAL HELPERS ================= */

function nowMs(): number {
  return Date.now();
}
function lower(value: string): string {
  return value.toLowerCase();
}
function compact(values: Array<string | undefined | null | false>): string[] {
  return values.filter(
    (value): value is string => typeof value === "string" && value.trim().length > 0
  );
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

/* ================= STRUCTURED ENRICHMENT ================= */


function dedupeByKey<T>(
  values: T[],
  getKey: (value: T) => string
): T[] {
  const seen = new Set<string>();
  const output: T[] = [];

  for (const value of values) {
    const key = getKey(value).trim().toLowerCase();
    if (!key || seen.has(key)) continue;

    seen.add(key);
    output.push(value);
  }

  return output;
}
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

export function enrichStructuredWithToolOutcomes(
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

export function enrichStructuredWithSafetyState(
  structured: CodexForgeStructuredReply,
  flags: IntentFlags,
  trace: EngineTraceForGroundedRender,
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

export function validateGroundedClaims(args: {
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

export function finalizeEngineTrace(
  trace: EngineTraceForGroundedRender,
  warnings: string[],
  structured: CodexForgeStructuredReply
): EngineTraceForGroundedRender {
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
  trace: EngineTraceForGroundedRender
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

export function buildResponseQuality(
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

export function buildResponseQualitySection(
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

export function enrichStructuredWithDiagnostics(args: {
  structured: CodexForgeStructuredReply;
  trace: EngineTraceForGroundedRender;
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

function hasExecutionRequest(context: CodexForgeChatContext): boolean {
  return context.executionRequest?.mode === "execute-task-step";
}

function hasActiveExecutionPhase(context: CodexForgeChatContext): boolean {
  return (
    !!context.execution?.enginePhase &&
    context.execution.enginePhase !== "idle"
  );
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

export function buildFinalWarningSet(args: {
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

export function withGroundedExecutionNotes(
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




















