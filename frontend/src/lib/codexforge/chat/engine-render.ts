import type {
  CodexForgeChatContext,
  CodexForgeDiff,
  CodexForgeStructuredReply,
  CodexForgeStructuredSection,
} from "../types";
import type {
  CodexForgeEngineAnalysis,
  CodexForgeEnginePlan,
} from "./contracts";
import {
  LIMITS,
  clampList,
  clampOptionalList,
  clampText,
  getExecutionDiffCount,
  getExecutionRequest,
  getExecutionSnapshotFileCount,
  isExecutionMode,
  resolveExecutionPhase,
} from "./engine-shared";
import {
  buildPlanStatus,
  buildUnderstandingItems,
} from "./engine-analysis";

/* ================= CONSTANTS ================= */

const MAX_PRIMARY_FILE_ITEMS = 3;
const MAX_SUPPORTING_FILES = 2;
const MAX_SUPPORTING_FILE_ITEMS = 2;
const MAX_GROUNDED_SIGNALS = 2;

/* ================= EXECUTION ================= */

function buildPlanSteps(
  context: CodexForgeChatContext,
  nextSteps: string[]
): string[] {
  const activePlanSteps = clampList(
    context.activePlan?.steps ?? [],
    LIMITS.maxPlanSteps
  );

  return activePlanSteps.length > 0
    ? activePlanSteps
    : clampList(nextSteps, LIMITS.maxPlanSteps);
}

function buildExecutionResultSummary(
  context: CodexForgeChatContext
): string | undefined {
  const request = getExecutionRequest(context);
  const phase = resolveExecutionPhase(context);
  const diffCount = getExecutionDiffCount(context);
  const snapshotFileCount = getExecutionSnapshotFileCount(context);

  if (!request?.mode) return undefined;

  const parts: string[] = [];

  parts.push(
    request.stepText
      ? `Processed step "${request.stepText}"`
      : "Processed the requested task step"
  );

  parts.push(`phase ${phase}`);

  if (typeof diffCount === "number") {
    parts.push(`${diffCount} diff preview${diffCount === 1 ? "" : "s"}`);
  }

  if (typeof snapshotFileCount === "number") {
    parts.push(
      `${snapshotFileCount} snapshot file${
        snapshotFileCount === 1 ? "" : "s"
      }`
    );
  }

  return clampText(parts.join(" • "), LIMITS.maxSummaryText);
}

function getExecutionDiffs(
  context: CodexForgeChatContext
): CodexForgeDiff[] | undefined {
  const diffs = context.execution?.diffs;

  if (!Array.isArray(diffs) || diffs.length === 0) return undefined;

  return diffs
    .filter(
      (diff): diff is CodexForgeDiff =>
        !!diff &&
        typeof diff.filePath === "string" &&
        diff.filePath.trim().length > 0 &&
        typeof diff.patch === "string"
    )
    .slice(0, LIMITS.maxGraphDiffs);
}

/* ================= GROUNDED FILE HELPERS ================= */

function normalizeFiles(files?: string[]): string[] {
  return clampList(files ?? [], LIMITS.maxFiles);
}

function extractTopFileHint(files?: string[]): string | undefined {
  const normalized = normalizeFiles(files);
  return normalized.length > 0 ? normalized[0] : undefined;
}

function extractSupportingFiles(files?: string[]): string[] {
  const normalized = normalizeFiles(files);
  return normalized.slice(1, 1 + MAX_SUPPORTING_FILES);
}

function normalizePath(path: string): string {
  return path.replace(/\\/g, "/").trim();
}

function splitSegments(path: string): string[] {
  return normalizePath(path)
    .split("/")
    .map((segment) => segment.trim())
    .filter(Boolean);
}

function getFileName(path: string): string {
  const segments = splitSegments(path);
  return segments[segments.length - 1] ?? path;
}

function getParentDirectory(path: string): string | undefined {
  const segments = splitSegments(path);
  if (segments.length <= 1) return undefined;
  return segments.slice(0, -1).join("/");
}

function inferFileRole(filePath: string): string {
  const lower = normalizePath(filePath).toLowerCase();
  const fileName = getFileName(filePath).toLowerCase();

  if (lower.includes("/api/") || fileName.includes("route")) {
    return "API route";
  }

  if (lower.includes("/hooks/") || fileName.startsWith("use-")) {
    return "state hook";
  }

  if (
    lower.includes("/components/") ||
    lower.endsWith(".tsx") ||
    fileName.includes("page")
  ) {
    return "UI component";
  }

  if (fileName.includes("contract") || fileName.includes("types")) {
    return "shared contract";
  }

  if (fileName.includes("engine")) {
    return "core engine logic";
  }

  if (fileName.includes("analysis")) {
    return "analysis layer";
  }

  if (fileName.includes("render")) {
    return "rendering layer";
  }

  if (fileName.includes("brain")) {
    return "brain orchestration";
  }

  if (fileName.includes("tool")) {
    return "tool execution surface";
  }

  return "implementation file";
}

function inferEditSuggestion(filePath: string): string {
  const lower = normalizePath(filePath).toLowerCase();

  if (lower.includes("engine")) {
    return "Modify logic flow or decision branches inside this file.";
  }

  if (lower.includes("route")) {
    return "Adjust request/response contract or handler logic.";
  }

  if (lower.includes("render")) {
    return "Adjust how grounded results are turned into structured output.";
  }

  if (lower.includes("analysis")) {
    return "Adjust inference, scoring, or planning rules here.";
  }

  if (lower.includes("hook") || lower.includes("use-")) {
    return "Update client state handling or hook behavior here.";
  }

  if (lower.includes("types") || lower.includes("contract")) {
    return "Update the shared contract carefully before touching callers.";
  }

  if (lower.includes("component") || lower.endsWith(".tsx")) {
    return "Update UI behavior or props/state handling.";
  }

  return "Inspect and update the relevant logic in this file.";
}

function inferSupportingRelationship(
  filePath: string,
  primaryFilePath: string
): string {
  const normalized = normalizePath(filePath).toLowerCase();
  const primaryNormalized = normalizePath(primaryFilePath).toLowerCase();

  const parent = getParentDirectory(filePath);
  const primaryParent = getParentDirectory(primaryFilePath);

  if (normalized.includes("types") || normalized.includes("contract")) {
    return "Likely shared contract";
  }

  if (normalized.includes("route")) {
    return "Likely caller or entry route";
  }

  if (normalized.includes("render")) {
    return "Likely rendering layer";
  }

  if (normalized.includes("analysis")) {
    return "Likely analysis layer";
  }

  if (normalized.includes("engine")) {
    return "Likely engine layer";
  }

  if (normalized.includes("hook") || normalized.includes("use-")) {
    return "Likely state surface";
  }

  if (parent && primaryParent && parent === primaryParent) {
    return "Likely nearby supporting file";
  }

  if (
    normalized.includes("/api/") &&
    !primaryNormalized.includes("/api/")
  ) {
    return "Likely related backend surface";
  }

  if (
    normalized.endsWith(".tsx") &&
    !primaryNormalized.endsWith(".tsx")
  ) {
    return "Likely related UI surface";
  }

  return "Likely supporting file";
}

function buildPrimaryFileSection(filePath: string): CodexForgeStructuredSection {
  return {
    title: "Primary file",
    items: [
      `Path: ${filePath}`,
      `Role: ${inferFileRole(filePath)}`,
      `Likely edit point: ${inferEditSuggestion(filePath)}`,
    ].slice(0, MAX_PRIMARY_FILE_ITEMS),
  };
}

function buildSupportingFileSections(
  primaryFilePath: string,
  supportingFiles: string[]
): CodexForgeStructuredSection[] {
  return supportingFiles.map((filePath, index) => ({
    title: `Supporting file ${index + 1}`,
    items: [
      `Path: ${filePath}`,
      `Relationship: ${inferSupportingRelationship(filePath, primaryFilePath)}`,
    ].slice(0, MAX_SUPPORTING_FILE_ITEMS),
  }));
}

function buildGroundedSections(files?: string[]): CodexForgeStructuredSection[] {
  const topFile = extractTopFileHint(files);
  if (!topFile) return [];

  const supportingFiles = extractSupportingFiles(files);

  return [
    buildPrimaryFileSection(topFile),
    ...buildSupportingFileSections(topFile, supportingFiles),
  ];
}

function buildGroundedContextNotes(files?: string[]): string[] {
  const topFile = extractTopFileHint(files);
  if (!topFile) return [];

  const supportingFiles = extractSupportingFiles(files);

  return clampList(
    [
      `Primary grounded file: ${topFile}`,
      ...supportingFiles.map(
        (filePath, index) => `Supporting grounded file ${index + 1}: ${filePath}`
      ),
    ],
    1 + MAX_SUPPORTING_FILES
  );
}

function buildGroundedStatusNotes(files?: string[]): string[] {
  const topFile = extractTopFileHint(files);
  if (!topFile) return [];

  const supportingFiles = extractSupportingFiles(files);

  return clampList(
    [
      "Grounded repository evidence is available.",
      topFile ? `Primary file selected: ${getFileName(topFile)}` : "",
      supportingFiles.length > 0
        ? `Supporting files selected: ${supportingFiles.length}`
        : "",
    ],
    MAX_GROUNDED_SIGNALS + 1
  );
}

/* ================= SUMMARY ================= */

function buildSummary(
  analysis: CodexForgeEngineAnalysis,
  plan: CodexForgeEnginePlan,
  context: CodexForgeChatContext
): string {
  if (isExecutionMode(context)) {
    return (
      buildExecutionResultSummary(context) ??
      "CodexForge processed the requested task step."
    );
  }

  const topFile = extractTopFileHint(plan.files);
  const supportingFiles = extractSupportingFiles(plan.files);

  if (topFile && supportingFiles.length > 0) {
    return `Primary match: ${topFile} with ${supportingFiles.length} supporting file${
      supportingFiles.length === 1 ? "" : "s"
    }.`;
  }

  if (topFile) {
    return `Primary match: ${topFile} — likely the best place to continue.`;
  }

  return `CodexForge structured ${analysis.intent} response.`;
}

/* ================= PLAN ================= */

function buildStructuredPlan(
  analysis: CodexForgeEngineAnalysis,
  plan: CodexForgeEnginePlan,
  context: CodexForgeChatContext
) {
  const executionRequest = getExecutionRequest(context);

  return {
    goal: plan.goal,
    steps: buildPlanSteps(context, plan.nextSteps),
    nextAction:
      executionRequest?.mode === "execute-task-step"
        ? plan.nextSteps[0] ?? "Review result"
        : context.activePlan?.nextAction ??
          plan.nextSteps[0] ??
          "Take next step",
    risks: clampOptionalList(plan.risks, LIMITS.maxRisks),
    files: clampOptionalList(plan.files, LIMITS.maxFiles),
    commands: clampOptionalList(plan.commands, LIMITS.maxCommands),
    status: buildPlanStatus(analysis.intent, context),
    intent: analysis.intent,
    domain: plan.domain,
    tags: clampOptionalList(plan.tags, LIMITS.maxTags),
  };
}

/* ================= STRUCTURED ================= */

export function buildStructured(
  analysis: CodexForgeEngineAnalysis,
  plan: CodexForgeEnginePlan,
  context: CodexForgeChatContext
): CodexForgeStructuredReply {
  const executionRequest = getExecutionRequest(context);
  const executionPhase = resolveExecutionPhase(context);
  const diffCount = getExecutionDiffCount(context);
  const snapshotFileCount = getExecutionSnapshotFileCount(context);

  const groundedSections = buildGroundedSections(plan.files);
  const groundedContextNotes = buildGroundedContextNotes(plan.files);
  const groundedStatusNotes = buildGroundedStatusNotes(plan.files);

  return {
    mode:
      executionRequest?.mode === "execute-task-step"
        ? "local-execution"
        : "local",

    title: `${analysis.projectName} ${analysis.intent}`,

    summary: buildSummary(analysis, plan, context),

    goal: plan.goal,

    context: clampOptionalList(
      [...(plan.contextNotes ?? []), ...groundedContextNotes],
      LIMITS.maxContextItems
    ),

    understanding: clampOptionalList(
      buildUnderstandingItems(analysis, context, plan),
      LIMITS.maxUnderstandingItems
    ),

    sections: [
      ...groundedSections,
      ...(plan.sections ?? []),
    ],

    files: clampOptionalList(plan.files, LIMITS.maxFiles),
    commands: clampOptionalList(plan.commands, LIMITS.maxCommands),
    risks: clampOptionalList(plan.risks, LIMITS.maxRisks),
    nextSteps: clampOptionalList(plan.nextSteps, LIMITS.maxNextSteps),
    status: clampOptionalList(
      [...(plan.status ?? []), ...groundedStatusNotes],
      LIMITS.maxStatusItems
    ),
    tools: plan.recommendedTools,

    plan: buildStructuredPlan(analysis, plan, context),

    domain: plan.domain,
    tags: clampOptionalList(plan.tags, LIMITS.maxTags),

    execution:
      executionRequest?.mode === "execute-task-step"
        ? {
            phase: executionPhase,
            ...(typeof diffCount === "number" ? { diffCount } : {}),
            ...(typeof snapshotFileCount === "number"
              ? { snapshotFileCount }
              : {}),
          }
        : undefined,

    diffs: getExecutionDiffs(context),
  };
}

/* ================= TEXT ================= */

function pushSection(
  lines: string[],
  title: string,
  items?: string[]
): void {
  if (!items?.length) return;

  lines.push(title);
  for (const item of items) {
    lines.push(`- ${item}`);
  }
  lines.push("");
}

export function structuredToText(reply: CodexForgeStructuredReply): string {
  const lines: string[] = [];

  if (reply.title) {
    lines.push(reply.title, "");
  }

  if (reply.summary) {
    lines.push(reply.summary, "");
  }

  pushSection(lines, "Goal", reply.goal ? [reply.goal] : undefined);

  pushSection(lines, "Context", reply.context);
  pushSection(lines, "Understanding", reply.understanding);

  if (reply.sections) {
    for (const section of reply.sections) {
      pushSection(lines, section.title, section.items);
    }
  }

  pushSection(lines, "Files", reply.files);
  pushSection(lines, "Commands", reply.commands);
  pushSection(lines, "Risks", reply.risks);

  if (reply.nextSteps?.length) {
    lines.push("Next steps");
    reply.nextSteps.forEach((step, index) => {
      lines.push(`${index + 1}. ${step}`);
    });
    lines.push("");
  }

  if (reply.tools?.length) {
    lines.push("Tools");
    for (const tool of reply.tools) {
      lines.push(`- ${tool.name} (${tool.availability}): ${tool.description}`);
    }
    lines.push("");
  }

  if (reply.diffs?.length) {
    lines.push("Diffs");
    for (const diff of reply.diffs) {
      lines.push(`- ${diff.filePath}`);
    }
    lines.push("");
  }

  if (reply.snapshot) {
    lines.push("Snapshot");
    lines.push(`- File count: ${reply.snapshot.fileCount}`);
    if (reply.snapshot.sampledPaths.length > 0) {
      for (const path of reply.snapshot.sampledPaths.slice(
        0,
        LIMITS.maxSampledPaths
      )) {
        lines.push(`- ${path}`);
      }
    }
    lines.push("");
  }

  if (reply.status?.length) {
    pushSection(lines, "Status", reply.status);
  }

  return lines.join("\n").trim();
}