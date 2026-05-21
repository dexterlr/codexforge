import { buildWorkflowResultStableKey, capWorkflowResultText, type WorkflowResultHandoff, type WorkflowResultHandoffSection, type WorkflowResultHandoffSectionKind, type WorkflowResultRecord, type WorkflowResultSensitivity, type ValidationResultRecord } from "./workflow-result-types";

export function buildWorkflowResultHandoffSection(args: { title: WorkflowResultHandoffSectionKind; body?: string | null; reviewedByOperator?: boolean; sensitivity?: WorkflowResultSensitivity }): WorkflowResultHandoffSection {
  const body = capWorkflowResultText(args.body, 900).text || "Not supplied.";
  return {
    sectionId: buildWorkflowResultStableKey("workflow-result-handoff-section", args.title, body),
    title: args.title,
    body,
    reviewedByOperator: args.reviewedByOperator ?? false,
    sensitivity: args.sensitivity ?? "project-context",
  };
}

export function buildWorkflowResultHandoff(args: { record: WorkflowResultRecord; validation?: ValidationResultRecord | null; sections?: readonly WorkflowResultHandoffSection[] | null; reviewedByOperator?: boolean }): WorkflowResultHandoff {
  const record = args.record;
  const sections = args.sections?.length ? [...args.sections] : [
    buildWorkflowResultHandoffSection({ title: "what changed", body: record.changeRequestSummary ?? record.resultLabel }),
    buildWorkflowResultHandoffSection({ title: "what was previewed", body: record.previewSummary ?? "Preview not supplied." }),
    buildWorkflowResultHandoffSection({ title: "apply status", body: record.applySummary ?? record.finalStatus }),
    buildWorkflowResultHandoffSection({ title: "validation status", body: args.validation?.outputReviewSummary ?? record.validationSummary ?? "Validation not supplied." }),
    buildWorkflowResultHandoffSection({ title: "failures", body: args.validation?.failureSummary ?? "No failure summary supplied." }),
    buildWorkflowResultHandoffSection({ title: "next action", body: args.validation?.nextAction ?? "Review result before continuing." }),
    buildWorkflowResultHandoffSection({ title: "commit guidance", body: record.finalStatus === "validation-passed" ? "After review: commit, tag, and push guidance may be copied. Do not execute from UI." : "Commit guidance waits for passing validation." }),
    buildWorkflowResultHandoffSection({ title: "review notes", body: "???reviewed by operator??? status must be explicit before persistence or promotion review." }),
  ];
  const lines = sections.map((section) => `${section.title}: ${section.body}`);
  const compactMarkdownHandoff = sections.map((section) => `- **${section.title}:** ${section.body}`).join("\n");
  const reviewedByOperator = args.reviewedByOperator ?? sections.every((section) => section.reviewedByOperator);
  return {
    handoffId: buildWorkflowResultStableKey("workflow-result-handoff", record.resultId, String(sections.length), String(reviewedByOperator)),
    sourceResultId: record.resultId,
    sections,
    plainTextHandoff: lines.join("\n"),
    compactMarkdownHandoff,
    issueOrPrSummaryDraft: `Workflow result: ${record.resultLabel}\n\n${compactMarkdownHandoff}`,
    closedLoopInputSummary: `Closed-loop input: ${args.validation?.failureSummary ?? record.validationSummary ?? record.finalStatus}. Next action: ${args.validation?.nextAction ?? "Review result."}`,
    memoryReviewCandidateSummary: `Reviewed memory candidate source: ${record.resultLabel}. No secret inclusion unless explicitly reviewed. No raw huge outputs.`,
    reviewedByOperator,
  };
}

export function summarizeWorkflowResultHandoff(handoff: WorkflowResultHandoff): string[] {
  return [
    `${handoff.sections.length} handoff section(s), validation status included, next action included.`,
    `Reviewed by operator=${handoff.reviewedByOperator}; secret and huge raw output inclusion blocked by policy.`,
    "Outputs available as plain text, compact markdown, issue/PR draft, closed-loop input, and memory review candidate summary.",
  ];
}
