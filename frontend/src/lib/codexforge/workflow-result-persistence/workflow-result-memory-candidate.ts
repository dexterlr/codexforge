import { buildWorkflowResultStableKey, capWorkflowResultText, type WorkflowResultMemoryCandidate, type WorkflowResultMemoryCategory, type WorkflowResultRecord } from "./workflow-result-types";

export function buildWorkflowResultMemoryCandidate(args: { record: WorkflowResultRecord; reusableLesson?: string | null; projectContext?: string | null; category?: WorkflowResultMemoryCategory; excludedSensitiveDetails?: readonly string[] | null; operatorReviewed?: boolean }): WorkflowResultMemoryCandidate {
  const title = `Workflow result: ${args.record.workflowKind} ${args.record.finalStatus}`;
  const excludedSensitiveDetails = [...(args.excludedSensitiveDetails ?? ["raw secrets", "huge logs", "source code snippets not reviewed"])];
  return {
    candidateId: buildWorkflowResultStableKey("workflow-result-memory-candidate", args.record.resultId, args.category ?? "unknown"),
    sourceResultId: args.record.resultId,
    title,
    summary: capWorkflowResultText(args.record.validationSummary ?? args.record.resultLabel, 600).text,
    reusableLesson: capWorkflowResultText(args.reusableLesson ?? "Capture the outcome, review failures, and route the next safe action before promotion.", 600).text,
    projectContext: capWorkflowResultText(args.projectContext ?? args.record.sourceRoute, 500).text,
    excludedSensitiveDetails,
    promotionReadiness: args.operatorReviewed ? "ready-for-review" : "needs-review",
    reviewRequired: true,
    suggestedMemoryCategory: args.category ?? (args.record.finalStatus === "validation-failed" ? "validation-failure" : "workflow-preference"),
    noAutoPromotionGuarantee: true,
    noSecrets: true,
    noHugeLogs: true,
  };
}

export function validateWorkflowResultMemoryCandidate(candidate: WorkflowResultMemoryCandidate): { ok: boolean; blockedReasons: string[]; warnings: string[] } {
  const blockedReasons = [
    candidate.noAutoPromotionGuarantee ? null : "Memory candidate must guarantee no auto-promotion.",
    candidate.noSecrets ? null : "Memory candidate must exclude secrets.",
    candidate.noHugeLogs ? null : "Memory candidate must exclude huge logs.",
  ].filter((item): item is string => Boolean(item));
  const warnings = candidate.promotionReadiness === "needs-review" ? ["Operator review required before memory review or inbox handoff."] : [];
  return { ok: blockedReasons.length === 0, blockedReasons, warnings };
}

export function summarizeWorkflowResultMemoryCandidate(candidate: WorkflowResultMemoryCandidate): string[] {
  return [
    `${candidate.title}; category ${candidate.suggestedMemoryCategory}; readiness ${candidate.promotionReadiness}.`,
    "No-auto-promotion guarantee is explicit; sensitive details and huge logs are excluded.",
    `Excluded sensitive details: ${candidate.excludedSensitiveDetails.join(", ")}.`,
  ];
}
