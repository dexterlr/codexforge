import type { MvpExecutionPath, MvpExecutionStep } from "./real-creative-mvp-types";

export function buildMvpExecutionStep(input: MvpExecutionStep): MvpExecutionStep {
  return input;
}

export function buildMvpExecutionPath(selectedCandidateId = "artifact-capture-only"): MvpExecutionPath {
  const steps = [
    buildMvpExecutionStep({ stepId: "choose-candidate", label: "choose candidate", primaryAction: "Review MVP candidate", requirement: "Operator selects one candidate.", boundary: "No execution starts from selection.", phase72Status: "design-only" }),
    buildMvpExecutionStep({ stepId: "verify-health-evidence", label: "verify health evidence", primaryAction: "Check setup evidence", requirement: "Required probe evidence is present or marked not required.", boundary: "No probing in Phase 72.", phase72Status: "design-only" }),
    buildMvpExecutionStep({ stepId: "confirm-approval", label: "confirm approval", primaryAction: "Review approval packet", requirement: "Approval packet names candidate, side effects, limits, and latest-message authority.", boundary: "No approval means no future execution.", phase72Status: "design-only" }),
    buildMvpExecutionStep({ stepId: "confirm-output-boundary", label: "confirm output boundary", primaryAction: "Review output boundary", requirement: "Artifact root and overwrite policy are explicit.", boundary: "No file writes in Phase 72.", phase72Status: "design-only" }),
    buildMvpExecutionStep({ stepId: "run-sandbox", label: "run sandbox", primaryAction: "Use sandbox evidence", requirement: "Sandbox run is simulation-only and already reviewed.", boundary: "No real execution.", phase72Status: "design-only" }),
    buildMvpExecutionStep({ stepId: "prepare-request", label: "prepare request", primaryAction: "Copy future request packet", requirement: "Request is typed and bounded.", boundary: "Copy-only packet.", phase72Status: "future-only" }),
    buildMvpExecutionStep({ stepId: "future-guarded-execution-boundary", label: "future guarded execution boundary", primaryAction: "Keep execution blocked", requirement: "Future executor must enforce stop boundary before real render.", boundary: "Execution allowed false.", phase72Status: "blocked" }),
    buildMvpExecutionStep({ stepId: "capture-artifact", label: "capture artifact", primaryAction: "Capture artifact metadata", requirement: "Artifact provenance and metadata are attached.", boundary: "No artifact file writes.", phase72Status: "design-only" }),
    buildMvpExecutionStep({ stepId: "review-artifact", label: "review artifact", primaryAction: "Open review board", requirement: "Artifact review board approves or rejects.", boundary: "No automatic promotion.", phase72Status: "design-only" }),
    buildMvpExecutionStep({ stepId: "mark-result", label: "mark result", primaryAction: "Decide next action", requirement: "Validation/review result is human-reviewed.", boundary: "Result does not trigger execution.", phase72Status: "design-only" }),
  ];
  const path: Omit<MvpExecutionPath, "summary"> = {
    pathId: "real-creative-mvp-execution-path",
    selectedCandidateId,
    startRoute: "/creative-mvp",
    requiredInput: ["selected candidate", "bridge health evidence", "sandbox evidence", "approval packet", "output boundary"],
    approvalGate: "operator-safe approval gate before any future execution",
    healthProbeRequirement: "Future Guarded Health Probe evidence required only when the candidate touches a local tool",
    dryRunRequirement: "Creative Execution Sandbox dry-run evidence present before future executor implementation",
    executionBoundary: "Phase 72 design-only: no real execution, no render execution, no command execution",
    outputBoundary: "single artifact root with no parent traversal and no unreviewed absolute output path",
    artifactCapture: "metadata and provenance capture only",
    reviewBoard: "/artifacts/review",
    validationReviewResult: "operator review result required before next phase",
    rollbackCancelPosture: "queued cancellation is designed; running cancellation is future-only; no current process termination in Phase 72",
    steps,
  };

  return { ...path, summary: summarizeMvpExecutionPath(path) };
}

export function summarizeMvpExecutionPath(path: Omit<MvpExecutionPath, "summary"> | MvpExecutionPath): string[] {
  return [
    `Start route: ${path.startRoute}.`,
    `Selected candidate: ${path.selectedCandidateId}.`,
    `Execution boundary: ${path.executionBoundary}.`,
    `Review board: ${path.reviewBoard}.`,
    `Steps: ${path.steps.length}; Phase 72 remains design-only.`,
  ];
}
