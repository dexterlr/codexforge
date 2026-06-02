import type {
  ImageGenerationReadiness,
  ImageGenerationRequest,
  ImageGenerationResult,
} from "./local-image-generation-types";

export function buildImageGenerationReadiness(
  request: ImageGenerationRequest,
  result?: ImageGenerationResult
): ImageGenerationReadiness {
  if (result?.status === "supplied-preview" || result?.status === "approved-boundary-result") {
    return {
      id: `${request.id}-readiness`,
      status: "result-supplied",
      blockers: [],
      nextStep: "Review the supplied image artifact before deciding what to keep.",
    };
  }

  if (!request.prompt.trim()) {
    return {
      id: `${request.id}-readiness`,
      status: "needs-prompt",
      blockers: ["Prompt is empty."],
      nextStep: "Write the image prompt first.",
    };
  }

  if (!request.workflowPackage.trim()) {
    return {
      id: `${request.id}-readiness`,
      status: "needs-workflow",
      blockers: ["Workflow package is not selected."],
      nextStep: "Choose a reviewed local image workflow package.",
    };
  }

  if (request.approvalStatus === "needs-review") {
    return {
      id: `${request.id}-readiness`,
      status: "needs-safety-review",
      blockers: ["Safety review is not complete."],
      nextStep: "Review safety and destination before approving the request packet.",
    };
  }

  if (request.approvalStatus === "blocked") {
    return {
      id: `${request.id}-readiness`,
      status: "needs-approval",
      blockers: ["Approval is blocked."],
      nextStep: "Resolve the approval blocker before any future executor can use this request.",
    };
  }

  if (request.executionPosture === "blocked-until-approved-executor") {
    return {
      id: `${request.id}-readiness`,
      status: "blocked-no-executor",
      blockers: ["No approved local executor is available from this MVP page."],
      nextStep: "Keep the request ready and capture a result only when it is supplied manually or by an approved boundary.",
    };
  }

  if (request.executionPosture === "request-only") {
    return {
      id: `${request.id}-readiness`,
      status: "request-ready",
      blockers: [],
      nextStep: "Copy the image request for review. Nothing runs automatically.",
    };
  }

  return {
    id: `${request.id}-readiness`,
    status: "unknown",
    blockers: ["Execution posture is unknown."],
    nextStep: "Confirm the approved local-only boundary before proceeding.",
  };
}
