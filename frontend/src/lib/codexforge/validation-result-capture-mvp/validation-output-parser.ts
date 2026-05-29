import type { ValidationOutputParser, ValidationStatus } from "./validation-result-capture-types";

export function buildValidationOutputParser(output = ""): ValidationOutputParser {
  const lines = output.split(/\r?\n/);
  const detectedErrorLines = lines.filter((line) => /error|failed|fail/i.test(line)).slice(0, 8);
  const detectedWarnings = lines.filter((line) => /warn|warning/i.test(line)).slice(0, 8);
  return { outputExcerpt: output.slice(0, 1200), detectedErrorLines, detectedWarnings, truncatedOutput: output.length > 1200 };
}

export function parseValidationOutputSummary(parser: ValidationOutputParser, exitCode: number | null = null): ValidationStatus {
  if (exitCode !== null && exitCode !== 0) return "fail";
  if (parser.detectedErrorLines.length > 0) return "fail";
  if (exitCode === 0 || /pass|passed|success/i.test(parser.outputExcerpt)) return "pass";
  return "unknown";
}
