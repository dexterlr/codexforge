import {
  buildReadOnlyExecutionStableKey,
  type ReadOnlyEvidence,
  type ReadOnlyEvidenceConfidence,
  type ReadOnlyEvidenceItem,
  type ReadOnlyEvidenceItemType,
  type ReadOnlyExecutionRequest,
  type ReadOnlyExecutionResult,
} from "./read-only-execution-types";

function itemId(args: {
  type: ReadOnlyEvidenceItemType;
  label: string;
  value: string;
  source: string;
  taskId: string;
  stepId: string;
}): string {
  return buildReadOnlyExecutionStableKey(
    "read-only-evidence",
    args.taskId,
    args.stepId,
    args.type,
    args.label,
    args.value,
    args.source
  );
}

export function buildReadOnlyEvidenceItem(args: {
  type: ReadOnlyEvidenceItemType;
  label: string;
  value: string;
  source: string;
  confidence?: ReadOnlyEvidenceConfidence;
  relatedTaskId: string;
  relatedStepId: string;
}): ReadOnlyEvidenceItem {
  return {
    id: itemId({
      type: args.type,
      label: args.label,
      value: args.value,
      source: args.source,
      taskId: args.relatedTaskId,
      stepId: args.relatedStepId,
    }),
    type: args.type,
    label: args.label,
    value: args.value,
    source: args.source,
    confidence: args.confidence ?? "high",
    relatedTaskId: args.relatedTaskId,
    relatedStepId: args.relatedStepId,
  };
}

export function buildReadOnlyEvidence(args: {
  request: ReadOnlyExecutionRequest;
  result?: ReadOnlyExecutionResult | null;
  items?: ReadOnlyEvidenceItem[];
}): ReadOnlyEvidence {
  const generated: ReadOnlyEvidenceItem[] = [];
  const result = args.result;

  if (result) {
    generated.push(
      buildReadOnlyEvidenceItem({
        type: "summary",
        label: "Result summary",
        value: result.summary,
        source: result.toolName,
        relatedTaskId: args.request.taskId,
        relatedStepId: args.request.stepId,
      })
    );

    for (const path of result.filePaths.slice(0, 24)) {
      generated.push(
        buildReadOnlyEvidenceItem({
          type: "path",
          label: "File path",
          value: path,
          source: result.toolName,
          relatedTaskId: args.request.taskId,
          relatedStepId: args.request.stepId,
        })
      );
    }

    for (const match of result.matchedLines.slice(0, 24)) {
      generated.push(
        buildReadOnlyEvidenceItem({
          type: match.line === null ? "match" : "line",
          label: match.line === null ? "Match" : `Line ${match.line}`,
          value: match.preview || match.matchText || match.path,
          source: match.path,
          relatedTaskId: args.request.taskId,
          relatedStepId: args.request.stepId,
        })
      );
    }

    for (const warning of result.warnings.slice(0, 12)) {
      generated.push(
        buildReadOnlyEvidenceItem({
          type: "warning",
          label: "Warning",
          value: warning,
          source: result.toolName,
          confidence: "medium",
          relatedTaskId: args.request.taskId,
          relatedStepId: args.request.stepId,
        })
      );
    }

    if (result.errorMessage) {
      generated.push(
        buildReadOnlyEvidenceItem({
          type: "error",
          label: "Error",
          value: result.errorMessage,
          source: result.toolName,
          confidence: "high",
          relatedTaskId: args.request.taskId,
          relatedStepId: args.request.stepId,
        })
      );
    }
  }

  const byId = new Map<string, ReadOnlyEvidenceItem>();
  for (const item of [...generated, ...(args.items ?? [])]) {
    byId.set(item.id, item);
  }

  const evidence: ReadOnlyEvidence = {
    id: "read-only-evidence",
    requestId: args.request.requestId,
    items: Array.from(byId.values()),
    summary: [],
  };

  return {
    ...evidence,
    summary: summarizeReadOnlyEvidence(evidence),
  };
}

export function summarizeReadOnlyEvidence(evidence: ReadOnlyEvidence): string[] {
  const warnings = evidence.items.filter((item) => item.type === "warning").length;
  const errors = evidence.items.filter((item) => item.type === "error").length;

  return [
    `${evidence.items.length} read-only evidence item(s) captured.`,
    `${warnings} warning item(s) and ${errors} error item(s) are visible.`,
    "Evidence is local UI state only and does not mutate files or the Brain graph.",
  ];
}
