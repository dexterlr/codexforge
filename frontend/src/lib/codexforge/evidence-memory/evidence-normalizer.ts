import type { ReadOnlyExecutionStatus } from "../read-only-step-execution";
import {
  buildEvidenceMemoryStableKey,
  clampEvidenceMemoryScore,
  sourceRefKey,
  uniqueEvidenceMemoryStrings,
  type EvidenceMemoryEvidenceType,
  type EvidenceMemoryInput,
  type EvidenceMemoryRawItemInput,
  type EvidenceMemoryReadOnlyEvidenceItemLike,
  type EvidenceMemorySourceRef,
  type NormalizedEvidenceBundle,
  type NormalizedEvidenceItem,
} from "./evidence-memory-types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function readString(value: unknown, fallback = ""): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function readNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function readStatus(value: unknown): ReadOnlyExecutionStatus | "unknown" {
  if (
    value === "pending" ||
    value === "skipped" ||
    value === "blocked" ||
    value === "failed" ||
    value === "completed"
  ) {
    return value;
  }

  return "unknown";
}

function normalizeEvidenceType(value: unknown): EvidenceMemoryEvidenceType {
  if (
    value === "file" ||
    value === "path" ||
    value === "line" ||
    value === "match" ||
    value === "summary" ||
    value === "warning" ||
    value === "error" ||
    value === "snippet" ||
    value === "result-status"
  ) {
    return value;
  }

  return "unknown";
}

function normalizeConfidence(value: EvidenceMemoryRawItemInput["confidence"]): number {
  if (typeof value === "number") return clampEvidenceMemoryScore(value);
  if (value === "high") return 0.88;
  if (value === "medium") return 0.62;
  if (value === "low") return 0.34;
  return 0.5;
}

function normalizeSourceRefs(refs: EvidenceMemorySourceRef[] = []): EvidenceMemorySourceRef[] {
  const byKey = new Map<string, EvidenceMemorySourceRef>();

  for (const ref of refs) {
    const id = readString(ref.id);
    if (!id) continue;
    const next = {
      type: ref.type,
      id,
      label: readString(ref.label, id),
    };
    byKey.set(sourceRefKey(next), next);
  }

  return Array.from(byKey.values()).sort((left, right) =>
    sourceRefKey(left).localeCompare(sourceRefKey(right))
  );
}

function baseSourceRefs(args: {
  taskId: string | null;
  stepId: string | null;
  requestId: string;
  executionId: string;
  toolName: string;
  filePath?: string | null;
  lineNumber?: number | null;
}): EvidenceMemorySourceRef[] {
  const refs: Array<EvidenceMemorySourceRef | null> = [
    args.taskId ? { type: "task" as const, id: args.taskId, label: "Task" } : null,
    args.stepId ? { type: "step" as const, id: args.stepId, label: "Step" } : null,
    { type: "execution-request" as const, id: args.requestId, label: "Execution request" },
    { type: "execution-result" as const, id: args.executionId, label: "Execution result" },
    { type: "tool" as const, id: args.toolName, label: "Read-only tool" },
    args.filePath ? { type: "file" as const, id: args.filePath, label: "File path" } : null,
    args.filePath && args.lineNumber !== null && args.lineNumber !== undefined
      ? {
          type: "line" as const,
          id: buildEvidenceMemoryStableKey(args.filePath, args.lineNumber),
          label: `Line ${args.lineNumber}`,
        }
      : null,
  ];

  return refs.filter((ref): ref is EvidenceMemorySourceRef => ref !== null);
}

export function normalizeEvidenceItem(input: EvidenceMemoryRawItemInput): NormalizedEvidenceItem {
  const sourceExecutionId = readString(input.sourceExecutionId, "unknown-execution");
  const sourceRequestId = readString(input.sourceRequestId, "unknown-request");
  const toolName = readString(input.toolName, "unknown-tool");
  const type = normalizeEvidenceType(input.type);
  const label = readString(input.label, type === "unknown" ? "Evidence" : type);
  const value = readString(input.value, readString(input.snippet, label));
  const snippet = readString(input.snippet, value.length > 180 ? `${value.slice(0, 177)}...` : value);
  const filePath = readString(input.filePath) || null;
  const lineNumber = input.lineNumber ?? null;
  const relatedTaskId = readString(input.relatedTaskId) || null;
  const relatedStepId = readString(input.relatedStepId) || null;
  const warnings = uniqueEvidenceMemoryStrings(input.warnings ?? []);
  const sourceRefs = normalizeSourceRefs([
    ...baseSourceRefs({
      taskId: relatedTaskId,
      stepId: relatedStepId,
      requestId: sourceRequestId,
      executionId: sourceExecutionId,
      toolName,
      filePath,
      lineNumber,
    }),
    ...(input.sourceRefs ?? []),
  ]);
  const id =
    readString(input.id) ||
    buildEvidenceMemoryStableKey(
      "normalized-evidence",
      sourceExecutionId,
      sourceRequestId,
      toolName,
      type,
      label,
      value,
      filePath,
      lineNumber
    );

  return {
    id,
    sourceExecutionId,
    sourceRequestId,
    toolName,
    type,
    label,
    value,
    snippet,
    filePath,
    lineNumber,
    confidence: normalizeConfidence(input.confidence),
    warnings,
    sourceRefs,
    relatedTaskId,
    relatedStepId,
    resultStatus: readStatus(input.resultStatus),
    sourceType: input.sourceType ?? "derived",
  };
}

function evidenceItemToRaw(args: {
  item: EvidenceMemoryReadOnlyEvidenceItemLike;
  sourceExecutionId: string;
  sourceRequestId: string;
  toolName: string;
  resultStatus: ReadOnlyExecutionStatus | "unknown";
  fallbackTaskId: string | null;
  fallbackStepId: string | null;
}): EvidenceMemoryRawItemInput {
  const value = readString(args.item.value);
  const source = readString(args.item.source);
  const sourceLooksLikeFile = source.includes("/") || source.includes("\\") || source.includes(".");
  const lineMatch = readString(args.item.label).match(/line\s+(\d+)/i);

  return {
    id: args.item.id,
    type: args.item.type,
    label: args.item.label,
    value,
    snippet: value,
    source,
    filePath: sourceLooksLikeFile ? source : null,
    lineNumber: lineMatch ? Number.parseInt(lineMatch[1], 10) : null,
    confidence: args.item.confidence,
    warnings: args.item.type === "warning" || args.item.type === "error" ? [value] : [],
    sourceExecutionId: args.sourceExecutionId,
    sourceRequestId: args.sourceRequestId,
    toolName: args.toolName,
    relatedTaskId: readString(args.item.relatedTaskId, args.fallbackTaskId ?? "") || null,
    relatedStepId: readString(args.item.relatedStepId, args.fallbackStepId ?? "") || null,
    resultStatus: args.resultStatus,
    sourceType: "read-only-evidence-item",
  };
}

function resultItems(input: EvidenceMemoryInput, context: {
  taskId: string | null;
  stepId: string | null;
  requestId: string;
  executionId: string;
  toolName: string;
  resultStatus: ReadOnlyExecutionStatus | "unknown";
}): EvidenceMemoryRawItemInput[] {
  const result = input.result;
  if (!result) return [];

  const items: EvidenceMemoryRawItemInput[] = [];
  const summary = readString(result.summary);
  if (summary) {
    items.push({
      type: "summary",
      label: "Result summary",
      value: summary,
      snippet: summary,
      sourceExecutionId: context.executionId,
      sourceRequestId: context.requestId,
      toolName: context.toolName,
      relatedTaskId: context.taskId,
      relatedStepId: context.stepId,
      resultStatus: context.resultStatus,
      confidence: result.ok === true ? 0.78 : 0.46,
      sourceType: "read-only-result",
    });
  }

  items.push({
    type: "result-status",
    label: "Read-only result status",
    value: context.resultStatus,
    snippet: context.resultStatus,
    sourceExecutionId: context.executionId,
    sourceRequestId: context.requestId,
    toolName: context.toolName,
    relatedTaskId: context.taskId,
    relatedStepId: context.stepId,
    resultStatus: context.resultStatus,
    confidence: result.ok === true ? 0.74 : 0.52,
    warnings: context.resultStatus === "completed" ? [] : [`Result status is ${context.resultStatus}.`],
    sourceType: "read-only-result",
  });

  for (const path of (result.filePaths ?? []).slice(0, 40)) {
    items.push({
      type: "path",
      label: "File path",
      value: path,
      snippet: path,
      filePath: path,
      sourceExecutionId: context.executionId,
      sourceRequestId: context.requestId,
      toolName: context.toolName,
      relatedTaskId: context.taskId,
      relatedStepId: context.stepId,
      resultStatus: context.resultStatus,
      confidence: result.ok === true ? 0.82 : 0.48,
      sourceType: "read-only-result-path",
    });
  }

  for (const [index, snippet] of (result.evidenceSnippets ?? []).slice(0, 40).entries()) {
    items.push({
      type: "snippet",
      label: `Snippet ${index + 1}`,
      value: snippet,
      snippet,
      sourceExecutionId: context.executionId,
      sourceRequestId: context.requestId,
      toolName: context.toolName,
      relatedTaskId: context.taskId,
      relatedStepId: context.stepId,
      resultStatus: context.resultStatus,
      confidence: result.ok === true ? 0.72 : 0.42,
      sourceType: "read-only-result-snippet",
    });
  }

  for (const line of (result.matchedLines ?? []).slice(0, 60)) {
    items.push({
      type: line.line === null ? "match" : "line",
      label: line.line === null ? "Match" : `Line ${line.line}`,
      value: readString(line.preview, readString(line.matchText, line.path)),
      snippet: readString(line.preview, readString(line.matchText, line.path)),
      filePath: line.path,
      lineNumber: line.line,
      sourceExecutionId: context.executionId,
      sourceRequestId: context.requestId,
      toolName: context.toolName,
      relatedTaskId: context.taskId,
      relatedStepId: context.stepId,
      resultStatus: context.resultStatus,
      confidence: result.ok === true ? 0.86 : 0.52,
      sourceType: "read-only-result-line",
    });
  }

  for (const warning of (result.warnings ?? []).slice(0, 24)) {
    items.push({
      type: "warning",
      label: "Warning",
      value: warning,
      snippet: warning,
      sourceExecutionId: context.executionId,
      sourceRequestId: context.requestId,
      toolName: context.toolName,
      relatedTaskId: context.taskId,
      relatedStepId: context.stepId,
      resultStatus: context.resultStatus,
      confidence: 0.68,
      warnings: [warning],
      sourceType: "read-only-result",
    });
  }

  const errorMessage = readString(result.errorMessage);
  if (errorMessage) {
    items.push({
      type: "error",
      label: "Error",
      value: errorMessage,
      snippet: errorMessage,
      sourceExecutionId: context.executionId,
      sourceRequestId: context.requestId,
      toolName: context.toolName,
      relatedTaskId: context.taskId,
      relatedStepId: context.stepId,
      resultStatus: context.resultStatus,
      confidence: 0.76,
      warnings: [errorMessage],
      sourceType: "read-only-result",
    });
  }

  return items;
}

export function normalizeReadOnlyExecutionEvidence(input: EvidenceMemoryInput = {}): NormalizedEvidenceBundle {
  const request = isRecord(input.request) ? input.request : {};
  const result = isRecord(input.result) ? input.result : {};
  const evidence = isRecord(input.evidence) ? input.evidence : {};
  const sourceRequestId = readString(request.requestId, readString(result.requestId, readString(evidence.requestId, "unknown-request")));
  const sourceExecutionId = readString(result.id, buildEvidenceMemoryStableKey("read-only-execution", sourceRequestId));
  const toolName = readString(result.toolName, readString(request.selectedReadOnlyTool, "unknown-tool"));
  const relatedTaskId =
    readString(input.relatedTaskId, readString(input.taskId, readString(request.taskId))) || null;
  const relatedStepId =
    readString(input.relatedStepId, readString(input.stepId, readString(request.stepId))) || null;
  const resultStatus = readStatus(result.status);
  const rawItems = [
    ...resultItems(
      {
        ...input,
        result,
      },
      {
        taskId: relatedTaskId,
        stepId: relatedStepId,
        requestId: sourceRequestId,
        executionId: sourceExecutionId,
        toolName,
        resultStatus,
      }
    ),
    ...((evidence.items ?? []) as EvidenceMemoryReadOnlyEvidenceItemLike[]).map((item) =>
      evidenceItemToRaw({
        item,
        sourceExecutionId,
        sourceRequestId,
        toolName,
        resultStatus,
        fallbackTaskId: relatedTaskId,
        fallbackStepId: relatedStepId,
      })
    ),
  ];
  const byId = new Map<string, NormalizedEvidenceItem>();

  for (const raw of rawItems) {
    const normalized = normalizeEvidenceItem(raw);
    byId.set(normalized.id, normalized);
  }

  const items = Array.from(byId.values()).sort((left, right) => {
    const typeOrder = left.type.localeCompare(right.type);
    if (typeOrder !== 0) return typeOrder;
    const pathOrder = String(left.filePath ?? "").localeCompare(String(right.filePath ?? ""));
    if (pathOrder !== 0) return pathOrder;
    const lineOrder = (left.lineNumber ?? 0) - (right.lineNumber ?? 0);
    if (lineOrder !== 0) return lineOrder;
    return left.id.localeCompare(right.id);
  });
  const warnings = uniqueEvidenceMemoryStrings(items.flatMap((item) => item.warnings));
  const bundle: NormalizedEvidenceBundle = {
    id: "normalized-read-only-execution-evidence",
    sourceExecutionId,
    sourceRequestId,
    toolName,
    relatedTaskId,
    relatedStepId,
    resultStatus,
    items,
    warnings,
    summary: [],
  };

  return { ...bundle, summary: summarizeNormalizedEvidence(bundle) };
}

export function summarizeNormalizedEvidence(bundle: NormalizedEvidenceBundle): string[] {
  const paths = uniqueEvidenceMemoryStrings(bundle.items.map((item) => item.filePath));
  const lineCount = bundle.items.filter((item) => item.lineNumber !== null).length;
  const warningCount = bundle.items.filter((item) => item.type === "warning").length;
  const errorCount = bundle.items.filter((item) => item.type === "error").length;

  return [
    `${bundle.items.length} normalized read-only evidence item(s).`,
    `${paths.length} file path(s) and ${lineCount} line-specific item(s) are traceable.`,
    `${warningCount} warning item(s) and ${errorCount} error item(s) remain review-visible.`,
    "Normalized evidence is pure data only; no file reads, graph mutation, network calls, or generated ids.",
  ];
}

export function readEvidenceMemoryNumber(value: unknown): number | null {
  return readNumber(value);
}
