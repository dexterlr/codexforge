import { buildCodingFlowRouteHandoff } from "./coding-flow-route-handoff";
import type { CodingFlowInput, CodingFlowValidationStep } from "./real-coding-flow-types";

export const CODING_FLOW_REQUIRED_VALIDATION_COMMANDS = [
  "npm run build",
  "npm run smoke:codexforge:server",
  "git diff --check",
  "git status --short",
] as const;

export function buildCodingFlowValidationStep(input: CodingFlowInput): CodingFlowValidationStep {
  const blockedReasons = input.applyRequestId ? [] : ["Apply must be reviewed or completed before validation is meaningful."];
  return {
    validationReadiness: blockedReasons.length ? "blocked" : "ready",
    recommendedCommands: [...CODING_FLOW_REQUIRED_VALIDATION_COMMANDS],
    targetedSmokeRecommendations: ["targeted smoke when known", "smoke-codexforge-real-coding-flow.ps1"],
    commandCopyStatus: "copy-only",
    routeHandoff: buildCodingFlowRouteHandoff("Open Validation Runner"),
    outputCaptureExpectation: "Prepare checks. Run or copy checks safely. Paste output to review failures.",
    blockedReasons,
  };
}

export function summarizeCodingFlowValidationStep(step: CodingFlowValidationStep): string {
  return `${step.validationReadiness}: ${step.recommendedCommands.join(", ")}`;
}
