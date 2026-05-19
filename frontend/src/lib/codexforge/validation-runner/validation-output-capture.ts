import {
  buildValidationRunnerStableId,
  type ValidationOutputCapture,
  type ValidationOutputCaptureItem,
  type ValidationOutputStatus,
} from "./validation-runner-types";

const MAX_EXCERPT_LENGTH = 2400;

function excerpt(value?: string | null): { text: string; truncated: boolean } {
  const text = String(value ?? "");
  if (text.length <= MAX_EXCERPT_LENGTH) return { text, truncated: false };
  return { text: `${text.slice(0, MAX_EXCERPT_LENGTH - 14)}\n...[truncated]`, truncated: true };
}

function detectStatus(exitCode: number | null, stdout: string, stderr: string): ValidationOutputStatus {
  const combined = `${stdout}\n${stderr}`.toLowerCase();
  if (exitCode !== null && exitCode !== 0) return "failed";
  if (/\b(fail|failed|error|exception)\b/.test(combined)) return "failed";
  if (/\b(warn|warning)\b/.test(combined)) return "warning";
  if (exitCode === 0 || /\b(pass|passed|success|compiled successfully)\b/.test(combined)) return "passed";
  return stdout || stderr ? "unknown" : "not-supplied";
}

export function buildValidationOutputCaptureItem(args: {
  commandId: string;
  command: string;
  exitCode?: number | null;
  stdout?: string | null;
  stderr?: string | null;
  capturedAtLabel?: string | null;
}): ValidationOutputCaptureItem {
  const stdout = excerpt(args.stdout);
  const stderr = excerpt(args.stderr);
  const exitCode = typeof args.exitCode === "number" ? args.exitCode : null;
  const status = detectStatus(exitCode, stdout.text, stderr.text);
  const detectedMarkers = [
    status === "passed" ? "pass marker" : null,
    status === "failed" ? "fail marker" : null,
    status === "warning" ? "warning marker" : null,
    exitCode !== null ? `exit ${exitCode}` : null,
  ].filter((item): item is string => Boolean(item));
  return {
    id: buildValidationRunnerStableId("validation-output", args.commandId, args.command, String(exitCode), stdout.text, stderr.text),
    commandId: args.commandId,
    command: args.command,
    exitCode,
    stdoutExcerpt: stdout.text,
    stderrExcerpt: stderr.text,
    status,
    detectedMarkers,
    errorSummary: status === "failed" ? stderr.text.split(/\r?\n/).find(Boolean) ?? "Validation failed." : "",
    truncated: stdout.truncated || stderr.truncated,
    capturedAtLabel: args.capturedAtLabel?.trim() || "",
    manualPasteSupported: true,
  };
}

export function buildValidationOutputCapture(args: {
  requestId: string;
  items?: readonly ValidationOutputCaptureItem[] | null;
}): ValidationOutputCapture {
  const items = [...(args.items ?? [])];
  const capture: ValidationOutputCapture = {
    id: buildValidationRunnerStableId("validation-output-capture", args.requestId, String(items.length)),
    requestId: args.requestId,
    items,
    outputCaptured: items.length > 0,
    failureCount: items.filter((item) => item.status === "failed").length,
    summary: [],
  };
  return { ...capture, summary: summarizeValidationOutputCapture(capture) };
}

export function summarizeValidationOutputCapture(capture: Pick<ValidationOutputCapture, "items" | "outputCaptured" | "failureCount">): string[] {
  return [
    `Output captured=${capture.outputCaptured}; ${capture.items.length} item(s).`,
    `${capture.failureCount} failure(s) detected from supplied excerpts.`,
    "Output excerpts are capped, manual paste supported, and no auto-ingestion into Brain occurs.",
  ];
}
