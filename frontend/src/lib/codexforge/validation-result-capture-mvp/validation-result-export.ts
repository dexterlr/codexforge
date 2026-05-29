import type { ValidationOutputParser, ValidationPassFailSummary, ValidationResultExport } from "./validation-result-capture-types";

export function buildValidationResultExport(summary: ValidationPassFailSummary, parser: ValidationOutputParser): ValidationResultExport {
  return { format: "markdown", redacted: true, body: `# Validation result\nStatus: ${summary.status}\nReason: ${summary.reason}\nErrors: ${parser.detectedErrorLines.length}\nWarnings: ${parser.detectedWarnings.length}\nNo auto-run. Output supplied manually.` };
}
