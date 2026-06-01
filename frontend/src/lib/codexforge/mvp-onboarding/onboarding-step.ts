import type { OnboardingStep } from "./mvp-onboarding-types";

export function buildOnboardingStep(id: string, title: string, route: string, plainEnglish: string): OnboardingStep {
  return { id, title, route, plainEnglish };
}

export function buildDefaultOnboardingSteps(): OnboardingStep[] {
  return [
    buildOnboardingStep("choose-task", "Choose a safe task", "/assist", "Start with one small coding goal."),
    buildOnboardingStep("pick-file", "Pick a file", "/files", "Keep the file boundary clear."),
    buildOnboardingStep("preview-patch", "Preview the patch", "/code-flow/live-run", "Look at the diff before review."),
    buildOnboardingStep("review-apply", "Review apply request", "/guarded-apply-mvp", "Approval is separate from preview."),
    buildOnboardingStep("capture-evidence", "Capture evidence", "/apply-evidence", "Record what happened."),
    buildOnboardingStep("validate", "Validate separately", "/validation-results", "Run checks manually and paste output."),
    buildOnboardingStep("review-result", "Review result", "/review-inbox", "Handle evidence, failures, or handoffs."),
    buildOnboardingStep("see-history", "See run history", "/run-history", "Review recent work before the next task."),
    buildOnboardingStep("demo", "Demo what happened", "/demo", "Show the safe flow and what remains manual."),
  ];
}
