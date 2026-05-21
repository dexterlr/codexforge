import { buildWorkflowResultStableKey, capWorkflowResultText, type WorkflowResultExport, type WorkflowResultExportFormat, type WorkflowResultExportSection, type WorkflowResultHandoff } from "./workflow-result-types";

export function buildWorkflowResultExportSection(args: { title: string; body?: string | null }): WorkflowResultExportSection {
  const body = capWorkflowResultText(args.body, 900).text || "Not supplied.";
  return {
    sectionId: buildWorkflowResultStableKey("workflow-result-export-section", args.title, body),
    title: args.title,
    body,
  };
}

export function buildWorkflowResultExport(args: { handoff: WorkflowResultHandoff; format?: WorkflowResultExportFormat; reviewed?: boolean }): WorkflowResultExport {
  const format = args.format ?? "markdown";
  const sections = args.handoff.sections.map((section) => buildWorkflowResultExportSection({ title: section.title, body: section.body }));
  const markdown = sections.map((section) => `## ${section.title}\n${section.body}`).join("\n\n");
  const plain = sections.map((section) => `${section.title}\n${section.body}`).join("\n\n");
  const jsonPreview = JSON.stringify({ title: "Workflow result export preview", sections: sections.slice(0, 8), redacted: true }, null, 2);
  const payload = format === "plain-text" ? plain : format === "json-preview" ? jsonPreview : format === "issue-draft" || format === "pr-summary-draft" ? args.handoff.issueOrPrSummaryDraft : format === "handoff-note" ? args.handoff.plainTextHandoff : markdown;
  return {
    exportId: buildWorkflowResultStableKey("workflow-result-export", args.handoff.handoffId, format),
    format,
    title: "Workflow result export",
    sections,
    redactionNotes: ["No raw secrets.", "No huge raw outputs.", "JSON preview is capped and redacted by default."],
    reviewStatus: args.reviewed ? "reviewed" : "review-required",
    copyLabel: `Copy ${format} workflow result`,
    payload,
  };
}

export function summarizeWorkflowResultExport(resultExport: WorkflowResultExport): string[] {
  return [
    `Export format ${resultExport.format}; ${resultExport.sections.length} section(s); review status ${resultExport.reviewStatus}.`,
    "Export supports markdown, plain-text, json-preview, issue-draft, pr-summary-draft, and handoff-note as copyable UI only.",
  ];
}
