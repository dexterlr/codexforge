import type {
  KeyframeGenerationReadiness,
  KeyframeGenerationRequest,
  KeyframeGenerationResult,
} from "./local-keyframe-generation-types";

export function buildKeyframeGenerationReadiness(
  request: KeyframeGenerationRequest,
  result?: KeyframeGenerationResult
): KeyframeGenerationReadiness {
  if (result?.status === "supplied-preview" || result?.status === "approved-boundary-result") {
    return {
      id: `${request.id}-readiness`,
      status: "result-supplied",
      blockers: [],
      nextStep: "Review supplied keyframes before using them in a draft video request.",
    };
  }

  if (request.promptSet.length === 0) {
    return {
      id: `${request.id}-readiness`,
      status: "needs-prompt",
      blockers: ["Prompt set is empty."],
      nextStep: "Add one still-frame prompt for each selected shot.",
    };
  }

  if (!request.localImageWorkflowPackage.trim()) {
    return {
      id: `${request.id}-readiness`,
      status: "needs-workflow",
      blockers: ["Local image workflow package is missing."],
      nextStep: "Choose a reviewed local image workflow package for keyframes.",
    };
  }

  if (request.approvalStatus === "needs-review") {
    return {
      id: `${request.id}-readiness`,
      status: "needs-safety-review",
      blockers: ["Safety review is not complete."],
      nextStep: "Review the still-frame request before approval.",
    };
  }

  if (request.approvalStatus === "blocked") {
    return {
      id: `${request.id}-readiness`,
      status: "needs-approval",
      blockers: ["Approval is blocked."],
      nextStep: "Resolve the approval blocker before future local execution.",
    };
  }

  if (request.executionPosture === "blocked-until-approved-executor") {
    return {
      id: `${request.id}-readiness`,
      status: "blocked-no-executor",
      blockers: ["No approved local keyframe executor is available from this MVP page."],
      nextStep: "Keep the keyframe request ready and capture only supplied keyframes.",
    };
  }

  if (request.executionPosture === "request-only") {
    return {
      id: `${request.id}-readiness`,
      status: "request-ready",
      blockers: [],
      nextStep: "Copy the keyframe request for review. Nothing runs automatically.",
    };
  }

  return {
    id: `${request.id}-readiness`,
    status: "unknown",
    blockers: ["Execution posture is unknown."],
    nextStep: "Confirm a local-only approved boundary before proceeding.",
  };
}
