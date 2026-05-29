import type { ValidationOutputParser, ValidationPassFailSummary } from "./validation-result-capture-types";
import { parseValidationOutputSummary } from "./validation-output-parser";

export function buildValidationPassFailSummary(parser: ValidationOutputParser, exitCode: number | null = null): ValidationPassFailSummary {
  const status = parseValidationOutputSummary(parser, exitCode);
  return { status, exitCode, reason: status === "fail" ? "Detected failing output or non-zero exit code." : status === "pass" ? "Detected passing output or zero exit code." : "Manual output is needed for a clear pass/fail result." };
}
