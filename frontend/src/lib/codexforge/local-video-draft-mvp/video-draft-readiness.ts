import type {
  VideoDraftReadiness,
  VideoDraftRequest,
  VideoDraftResult,
} from "./local-video-draft-types";

export function buildVideoDraftReadiness(
  request: VideoDraftRequest,
  result?: VideoDraftResult
): VideoDraftReadiness {
  if (result?.status === "supplied-preview" || result?.status === "approved-boundary-result") {
    return {
      id: `${request.id}-readiness`,
      status: "result-supplied",
      blockers: [],
      nextStep: "Review the supplied draft video before deciding whether it becomes a final candidate later.",
    };
  }

  if (!request.prompt.trim()) {
    return {
      id: `${request.id}-readiness`,
      status: "needs-prompt",
      blockers: ["Prompt is empty."],
      nextStep: "Write the draft prompt first.",
    };
  }

  if (!request.storyboard.trim()) {
    return {
      id: `${request.id}-readiness`,
      status: "needs-storyboard",
      blockers: ["Storyboard is missing."],
      nextStep: "Prepare storyboard beats before draft review.",
    };
  }

  if (request.keyframes.length === 0) {
    return {
      id: `${request.id}-readiness`,
      status: "needs-keyframes",
      blockers: ["No keyframes selected."],
      nextStep: "Supply or request keyframes before draft video review.",
    };
  }

  if (!request.workflowPackage.trim()) {
    return {
      id: `${request.id}-readiness`,
      status: "needs-workflow-package",
      blockers: ["Workflow package is missing."],
      nextStep: "Choose a reviewed local video draft workflow package.",
    };
  }

  if (request.approvalStatus === "needs-review") {
    return {
      id: `${request.id}-readiness`,
      status: "needs-safety-review",
      blockers: ["Safety review is not complete."],
      nextStep: "Review local-only safety before approval.",
    };
  }

  if (!request.dryRunReviewed) {
    return {
      id: `${request.id}-readiness`,
      status: "needs-dry-run",
      blockers: ["Workflow dry run contract is not reviewed."],
      nextStep: "Review the dry run contract before any future submit boundary.",
    };
  }

  if (!request.submitBoundaryReviewed) {
    return {
      id: `${request.id}-readiness`,
      status: "needs-submit-boundary",
      blockers: ["Approved submit boundary is not reviewed."],
      nextStep: "Review the approved submit boundary before future execution.",
    };
  }

  if (request.approvalStatus === "blocked") {
    return {
      id: `${request.id}-readiness`,
      status: "needs-safety-review",
      blockers: ["Approval is blocked."],
      nextStep: "Resolve the approval blocker before future local execution.",
    };
  }

  if (request.executionPosture === "blocked-until-approved-executor") {
    return {
      id: `${request.id}-readiness`,
      status: "blocked-no-executor",
      blockers: ["No approved local video executor is available from this MVP page."],
      nextStep: "Keep the draft request ready and capture only supplied draft results.",
    };
  }

  if (request.executionPosture === "request-only") {
    return {
      id: `${request.id}-readiness`,
      status: "request-ready",
      blockers: [],
      nextStep: "Copy the draft request for review. Nothing renders automatically.",
    };
  }

  return {
    id: `${request.id}-readiness`,
    status: "unknown",
    blockers: ["Execution posture is unknown."],
    nextStep: "Confirm a local-only approved boundary before proceeding.",
  };
}
