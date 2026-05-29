import type { LiveRunInput, LiveRunStep, LiveRunStepState } from "./coding-flow-live-run-types";

export function buildLiveRunStepState(input: LiveRunInput): LiveRunStepState {
  const map: Record<LiveRunStep, LiveRunStepState> = {
    start: { currentStep: "start", progressLabel: "Start live run", primaryAction: "Start live run", href: "/code-flow/live-run" },
    "pick-file": { currentStep: "pick-file", progressLabel: "Pick file", primaryAction: "Pick file", href: "/files" },
    "describe-change": { currentStep: "describe-change", progressLabel: "Describe change", primaryAction: "Describe change", href: "/files" },
    "preview-patch": { currentStep: "preview-patch", progressLabel: "Preview patch", primaryAction: "Preview patch", href: "/files" },
    "review-apply-request": { currentStep: "review-apply-request", progressLabel: "Review apply request", primaryAction: "Review apply request", href: "/guarded-apply-mvp" },
    "capture-apply-evidence": { currentStep: "capture-apply-evidence", progressLabel: "Capture apply evidence", primaryAction: "Capture apply evidence", href: "/apply-evidence" },
    "prepare-validation": { currentStep: "prepare-validation", progressLabel: "Prepare validation", primaryAction: "Prepare validation", href: "/validation" },
    "capture-validation-result": { currentStep: "capture-validation-result", progressLabel: "Capture validation result", primaryAction: "Capture validation result", href: "/validation-results" },
    "review-workflow-result": { currentStep: "review-workflow-result", progressLabel: "Review workflow result", primaryAction: "Review workflow result", href: "/workflow-results" },
    "send-to-run-history": { currentStep: "send-to-run-history", progressLabel: "Send to run history", primaryAction: "Send to run history", href: "/run-history" },
    "closed-loop": { currentStep: "closed-loop", progressLabel: "Closed-loop fix", primaryAction: "Open closed-loop", href: "/closed-loop" },
  };
  return map[input.currentStep];
}

export function updateLiveRunStepState(_state: LiveRunStepState, nextStep: LiveRunStep): LiveRunStepState {
  return buildLiveRunStepState({ runId: "preview", selectedFile: null, changeDescription: null, currentStep: nextStep, validationStatus: "unknown", noAutoApply: true, noAutoRun: true, noHiddenPersistence: true, latestMessageAuthorityReminder: "Preserve latest-message authority." });
}
