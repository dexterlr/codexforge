import { buildWorkflowResultStableKey, capWorkflowResultText, type ValidationCommandResult, type ValidationCommandStatus, type ValidationResultRecord } from "./workflow-result-types";

function detectStatus(exitCode: number | null, stdout: string, stderr: string): ValidationCommandStatus {
  const combined = `${stdout}\n${stderr}`.toLowerCase();
  if (!stdout && !stderr && exitCode === null) return "not-run";
  if (exitCode !== null && exitCode !== 0) return "fail";
  if (/\b(error|failed|failure|exception)\b/.test(combined)) return "fail";
  if (/\b(warn|warning)\b/.test(combined)) return "warning";
  if (exitCode === 0 || /\b(pass|passed|success)\b/.test(combined)) return "pass";
  return "unknown";
}

export function buildValidationCommandResult(args: {
  command: string;
  exitCode?: number | null;
  stdout?: string | null;
  stderr?: string | null;
  reviewNote?: string | null;
  status?: ValidationCommandStatus;
}): ValidationCommandResult {
  const stdout = capWorkflowResultText(args.stdout, 900);
  const stderr = capWorkflowResultText(args.stderr, 900);
  const exitCode = typeof args.exitCode === "number" ? args.exitCode : null;
  const status = args.status ?? detectStatus(exitCode, stdout.text, stderr.text);
  const combined = `${stdout.text}\n${stderr.text}`;
  return {
    commandId: buildWorkflowResultStableKey("validation-command-result", args.command, String(exitCode), stdout.text, stderr.text),
    command: args.command,
    exitCode,
    status,
    stdoutExcerpt: stdout.text,
    stderrExcerpt: stderr.text,
    detectedErrors: combined.match(/\b(error|failed|failure|exception)\b/gi) ?? [],
    detectedWarnings: combined.match(/\b(warn|warning)\b/gi) ?? [],
    truncated: stdout.truncated || stderr.truncated,
    reviewNote: args.reviewNote?.trim() || "Manual output only; do not fabricate output.",
  };
}

export function buildValidationResultRecord(args: { sourceValidationRequestId?: string | null; commands?: readonly ValidationCommandResult[] | null } = {}): ValidationResultRecord {
  const commands = [...(args.commands ?? [])];
  const passCount = commands.filter((item) => item.status === "pass").length;
  const failCount = commands.filter((item) => item.status === "fail").length;
  const unknownCount = commands.filter((item) => item.status === "unknown" || item.status === "not-run" || item.status === "manual-only").length;
  const overallStatus: ValidationCommandStatus = commands.length < 1 ? "not-run" : failCount > 0 ? "fail" : commands.some((item) => item.status === "warning") ? "warning" : unknownCount > 0 ? "unknown" : "pass";
  return {
    validationResultId: buildWorkflowResultStableKey("validation-result-record", args.sourceValidationRequestId ?? "manual", String(commands.length), overallStatus),
    sourceValidationRequestId: args.sourceValidationRequestId?.trim() || "manual-validation",
    commands,
    overallStatus,
    passCount,
    failCount,
    unknownCount,
    outputReviewSummary: commands.length > 0 ? `${commands.length} supplied command result(s) reviewed with capped excerpts.` : "No validation output supplied; record does not fabricate output.",
    failureSummary: failCount > 0 ? `${failCount} command(s) failed. Route through Closed Loop Fix Workflow.` : "No failed supplied command output.",
    recommendedRoute: failCount > 0 ? "/closed-loop" : overallStatus === "pass" ? "/workflow-results" : "/validation",
    nextAction: failCount > 0 ? "Open Closed Loop Fix Workflow with the capped failure summary." : overallStatus === "pass" ? "Prepare commit/tag/push guidance after operator review." : "Capture or review validation output before deciding.",
    doesNotFabricateOutput: true,
    capsExcerpts: true,
  };
}

export function summarizeValidationResultRecord(record: ValidationResultRecord): string[] {
  return [
    `Validation status ${record.overallStatus}; pass ${record.passCount}, fail ${record.failCount}, unknown ${record.unknownCount}.`,
    record.outputReviewSummary,
    `${record.failureSummary} Next action: ${record.nextAction}`,
  ];
}
