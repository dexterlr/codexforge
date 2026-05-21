import { buildWorkflowResultStableKey, capWorkflowResultText, type WorkflowResultCapture, type WorkflowResultCaptureItem, type WorkflowResultCaptureItemType, type WorkflowResultSensitivity } from "./workflow-result-types";

export function buildWorkflowResultCaptureItem(args: {
  label: string;
  type: WorkflowResultCaptureItemType;
  valueSummary?: string | null;
  sensitivity?: WorkflowResultSensitivity;
  reviewRequired?: boolean;
  includeInHandoff?: boolean;
  includeInMemoryCandidate?: boolean;
}): WorkflowResultCaptureItem {
  const sensitivity = args.sensitivity ?? "project-context";
  const capped = capWorkflowResultText(args.valueSummary, sensitivity === "validation-output" ? 700 : 900);
  const possibleSecret = sensitivity === "possible-secret";
  return {
    itemId: buildWorkflowResultStableKey("capture-item", args.type, args.label, capped.text),
    label: args.label,
    type: args.type,
    valueSummary: capped.truncated ? `${capped.text}\nOutput capped for review.` : capped.text || "Not supplied.",
    sensitivity,
    reviewRequired: args.reviewRequired ?? (possibleSecret || sensitivity === "source-code" || sensitivity === "validation-output" || sensitivity === "private-note"),
    includeInHandoff: args.includeInHandoff ?? !possibleSecret,
    includeInMemoryCandidate: args.includeInMemoryCandidate ?? (!possibleSecret && sensitivity !== "source-code" && sensitivity !== "validation-output" && sensitivity !== "private-note"),
  };
}

export function buildWorkflowResultCapture(args: { sourceResultId?: string | null; items?: readonly WorkflowResultCaptureItem[] | null } = {}): WorkflowResultCapture {
  const items = [...(args.items ?? [])];
  const sourceResultId = args.sourceResultId?.trim() || "manual-session";
  const capture: WorkflowResultCapture = {
    captureId: buildWorkflowResultStableKey("workflow-result-capture", sourceResultId, String(items.length)),
    sourceResultId,
    items,
    summary: [],
  };
  return { ...capture, summary: summarizeWorkflowResultCapture(capture) };
}

export function summarizeWorkflowResultCapture(capture: Pick<WorkflowResultCapture, "items">): string[] {
  const reviewCount = capture.items.filter((item) => item.reviewRequired).length;
  const handoffCount = capture.items.filter((item) => item.includeInHandoff).length;
  const memoryCount = capture.items.filter((item) => item.includeInMemoryCandidate).length;
  return [
    `${capture.items.length} capture item(s), ${reviewCount} require review.`,
    `${handoffCount} item(s) are eligible for copyable handoff.`,
    `${memoryCount} item(s) are eligible for a reviewed memory candidate; possible-secret items are excluded.`,
  ];
}
