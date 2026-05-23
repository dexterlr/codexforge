import { buildRunHistoryStableKey, capRunHistoryText, type RunHistoryHandoff, type RunHistoryHandoffSection, type RunHistoryHandoffSectionKind, type RunHistoryRecord, type RunHistorySensitivity } from "./run-history-types";

export function buildRunHistoryHandoffSection(args: { title: RunHistoryHandoffSectionKind; body?: string | null; sensitivity?: RunHistorySensitivity; reviewedStatusVisible?: boolean }): RunHistoryHandoffSection {
  const body = capRunHistoryText(args.body, 800).text || "Not supplied.";
  return {
    sectionId: buildRunHistoryStableKey("run-history-handoff-section", args.title, body),
    title: args.title,
    body,
    reviewedStatusVisible: args.reviewedStatusVisible ?? true,
    sensitivity: args.sensitivity ?? "project-context",
  };
}

export function buildRunHistoryHandoff(record: RunHistoryRecord, sections?: readonly RunHistoryHandoffSection[]): RunHistoryHandoff {
  const handoffSections = sections?.length ? [...sections] : [
    buildRunHistoryHandoffSection({ title: "run summary", body: `${record.label} (${record.runKind}). Review status: ${record.reviewStatus}.` }),
    buildRunHistoryHandoffSection({ title: "workflow status", body: `Source ${record.sourceWorkflowResultId} from ${record.sourceRoute}.` }),
    buildRunHistoryHandoffSection({ title: "file/change summary", body: record.changeSummary ?? record.selectedFilePath ?? "No file or change summary supplied." }),
    buildRunHistoryHandoffSection({ title: "validation result", body: record.validationStatus }),
    buildRunHistoryHandoffSection({ title: "failure route", body: record.validationStatus === "failed" ? "Route to /closed-loop with capped output summary." : "No failure route needed." }),
    buildRunHistoryHandoffSection({ title: "next action", body: record.currentNextAction }),
    buildRunHistoryHandoffSection({ title: "commit guidance", body: record.validationStatus === "passed" ? "After review, copy commit guidance. No git command is executed from UI." : "Commit guidance waits for passed validation." }),
    buildRunHistoryHandoffSection({ title: "memory candidate", body: record.memoryCandidateReadiness === "ready-for-review" ? "Candidate can be copied to Memory Review; no-auto-promotion." : "No reviewed memory candidate yet." }),
    buildRunHistoryHandoffSection({ title: "review notes", body: "Reviewed status visible. No secrets, no huge raw output, no Brain auto-mutation." }),
  ];
  const compactHandoff = handoffSections.map((section) => `${section.title}: ${section.body}`).join("\n");
  const markdownHandoff = handoffSections.map((section) => `- **${section.title}:** ${section.body}`).join("\n");
  return {
    handoffId: buildRunHistoryStableKey("run-history-handoff", record.runId, handoffSections.length),
    sourceRunId: record.runId,
    sections: handoffSections,
    compactHandoff,
    markdownHandoff,
    issueOrPrDraft: `Run history handoff: ${record.label}\n\n${markdownHandoff}`,
    closedLoopInput: `Closed-loop input from run history: validation result ${record.validationStatus}; next action ${record.currentNextAction}.`,
    memoryReviewCandidate: `Run history memory review candidate: ${record.label}. No secrets, no huge logs, no-auto-promotion.`,
    reviewedStatusVisible: handoffSections.every((section) => section.reviewedStatusVisible),
  };
}

export function summarizeRunHistoryHandoff(handoff: RunHistoryHandoff): string[] {
  return [
    `${handoff.sections.length} handoff section(s), including validation result and next action.`,
    "Outputs: compact handoff, markdown handoff, issue/PR draft, closed-loop input, and memory review candidate.",
    `Reviewed status visible=${handoff.reviewedStatusVisible}.`,
  ];
}
