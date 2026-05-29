import type { ValidationOutputParser, ValidationPassFailSummary, ValidationResultCaptureSummary } from "./validation-result-capture-types";

export function buildValidationResultCaptureSummary(summary: ValidationPassFailSummary, parser: ValidationOutputParser): ValidationResultCaptureSummary {
  return { title: "Capture validation result", status: summary.status, nextAction: summary.status === "fail" ? "Copy failure handoff" : "Copy result summary", errorCount: parser.detectedErrorLines.length, warningCount: parser.detectedWarnings.length };
}
