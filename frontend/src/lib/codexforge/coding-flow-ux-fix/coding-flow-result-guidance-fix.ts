import type { CodingFlowResultGuidanceFix, CodingFlowResultGuidanceOutcomeId } from "./coding-flow-ux-fix-types";

const OUTCOME_COPY: Record<CodingFlowResultGuidanceOutcomeId, Omit<CodingFlowResultGuidanceFix, "outcomeId">> = {
  "validation-passed": { title: "Validation passed", meaning: "The copied checks passed in the user's terminal.", nextAction: "Copy workflow handoff.", route: "/workflow-results", copyableGuidance: "Validation passed. Capture commands, short output, and next action.", safetyNote: "Review before commit." },
  "validation-failed": { title: "Validation failed", meaning: "A manual check failed and needs a reviewed fix loop.", nextAction: "Open Closed Loop.", route: "/closed-loop", copyableGuidance: "Validation failed. Include command, failure excerpt, and suspected area.", safetyNote: "Do not stack unrelated changes." },
  "apply-blocked": { title: "Apply blocked", meaning: "Preview, approval, policy, or rollback is missing.", nextAction: "Review apply blocked reasons.", route: "/apply-validation", copyableGuidance: "Apply blocked because required review material is missing.", safetyNote: "No auto-apply." },
  "preview-missing": { title: "Preview missing", meaning: "There is no reviewed patch preview yet.", nextAction: "Preview patch.", route: "/files", copyableGuidance: "Preview missing. Pick a file and describe the change first.", safetyNote: "Preview before applying anything." },
  "output-missing": { title: "Output missing", meaning: "The UI cannot review checks without pasted output.", nextAction: "Paste validation output.", route: "/validation", copyableGuidance: "Output missing. Paste capped terminal output for review.", safetyNote: "No auto-run." },
  "result-needs-review": { title: "Result needs review", meaning: "A result exists but needs a human decision.", nextAction: "Review workflow result.", route: "/workflow-results", copyableGuidance: "Result needs review. Confirm status, evidence, and next action.", safetyNote: "No auto-persistence." },
  "ready-to-commit": { title: "Ready to commit", meaning: "Validation passed and the result handoff is reviewed.", nextAction: "Review latest run.", route: "/run-history", copyableGuidance: "Ready to commit after operator review.", safetyNote: "Commit remains outside this UI." },
  "needs-closed-loop": { title: "Needs Closed Loop", meaning: "A failure needs another focused fix cycle.", nextAction: "Open Closed Loop.", route: "/closed-loop", copyableGuidance: "Needs Closed Loop. Carry failing command and output excerpt.", safetyNote: "No auto-fix." },
  unknown: { title: "Unknown outcome", meaning: "The result is not clear enough to route.", nextAction: "Capture result details.", route: "/workflow-results", copyableGuidance: "Unknown result. Add status, command, and output excerpt.", safetyNote: "Review required." },
};

export function buildResultGuidanceOutcome(outcomeId: CodingFlowResultGuidanceOutcomeId): CodingFlowResultGuidanceFix {
  return { outcomeId, ...OUTCOME_COPY[outcomeId] };
}

export function buildCodingFlowResultGuidanceFix(): CodingFlowResultGuidanceFix[] {
  return (Object.keys(OUTCOME_COPY) as CodingFlowResultGuidanceOutcomeId[]).map(buildResultGuidanceOutcome);
}

export function summarizeCodingFlowResultGuidanceFix(fixes: readonly CodingFlowResultGuidanceFix[]): string {
  return `${fixes.length} result outcomes route passed, failed, blocked, and missing-output states.`;
}
