import type { AssistedCodingStep } from "./assisted-coding-mode-types";

export function buildAssistedCodingStep(id: string, title: string, route: string, safeBecause: string, stillManual: string): AssistedCodingStep {
  return { id, title, route, safeBecause, stillManual };
}

export function buildDefaultAssistedCodingSteps(): AssistedCodingStep[] {
  return [
    buildAssistedCodingStep("choose-goal", "Choose a coding goal", "/assist", "The guide only recommends a route.", "You still choose the goal."),
    buildAssistedCodingStep("pick-file", "Pick a file", "/files", "File reading is separate from writing.", "You still decide which file is in scope."),
    buildAssistedCodingStep("preview-patch", "Preview the patch", "/code-flow/live-run", "Preview is separate from apply.", "You still review the diff."),
    buildAssistedCodingStep("review-apply", "Review apply request", "/guarded-apply-mvp", "Apply remains approval-gated.", "You still approve or stop."),
    buildAssistedCodingStep("capture-evidence", "Capture evidence", "/apply-evidence", "Evidence is recorded after review.", "You still verify it is honest."),
    buildAssistedCodingStep("validate", "Capture validation result", "/validation-results", "Validation is separate from apply.", "You still run checks manually."),
    buildAssistedCodingStep("review", "Review result", "/review-inbox", "Review collects next items without persistence claims.", "You still decide what is complete."),
  ];
}
