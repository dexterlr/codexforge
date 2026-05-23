import { buildRunHistoryStableKey, capRunHistoryText, type RunHistoryExport, type RunHistoryExportFormat, type RunHistoryExportSection, type RunHistoryHandoff } from "./run-history-types";

export function buildRunHistoryExportSection(args: { title: string; body?: string | null }): RunHistoryExportSection {
  const body = capRunHistoryText(args.body, 700).text || "Not supplied.";
  return {
    sectionId: buildRunHistoryStableKey("run-history-export-section", args.title, body),
    title: args.title,
    body,
  };
}

export function buildRunHistoryExport(args: { handoff: RunHistoryHandoff; format?: RunHistoryExportFormat; sections?: readonly RunHistoryExportSection[] }): RunHistoryExport {
  const format = args.format ?? "markdown";
  const sections = args.sections?.length ? [...args.sections] : [
    buildRunHistoryExportSection({ title: "Run history handoff", body: args.handoff.markdownHandoff }),
    buildRunHistoryExportSection({ title: "Review status", body: args.handoff.reviewedStatusVisible ? "reviewed status visible" : "review required" }),
    buildRunHistoryExportSection({ title: "Safety", body: "Copyable UI only; no file writes; no huge raw JSON by default." }),
  ];
  const body = sections.map((section) => format === "plain-text" ? `${section.title}: ${section.body}` : `## ${section.title}\n${section.body}`).join("\n\n");
  return {
    exportId: buildRunHistoryStableKey("run-history-export", args.handoff.handoffId, format),
    format,
    title: `Run history ${format} export`,
    sections,
    payload: format === "json-preview" ? JSON.stringify({ title: "Run history preview", sectionCount: sections.length, reviewedStatusVisible: args.handoff.reviewedStatusVisible }, null, 2) : body,
    copyLabel: `Copy ${format}`,
    redactionNotes: ["No secrets", "No huge raw output", "No raw JSON above fold", "Review required"],
  };
}

export function summarizeRunHistoryExport(resultExport: RunHistoryExport): string[] {
  return [
    `${resultExport.format} export with ${resultExport.sections.length} section(s).`,
    "Copyable UI only; no file writes and no hidden persistence.",
  ];
}
