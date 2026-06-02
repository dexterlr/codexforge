import type {
  VideoDraftHandoff,
  VideoDraftReadiness,
  VideoDraftRequest,
  VideoDraftResult,
} from "./local-video-draft-types";

export function buildVideoDraftHandoff(
  request: VideoDraftRequest,
  readiness: VideoDraftReadiness,
  result: VideoDraftResult
): VideoDraftHandoff {
  return {
    id: `${request.id}-handoff`,
    copyLabel: "Copy draft request allowed",
    requestHandoff: `Video draft request ${request.id}: ${request.targetDuration}, ${request.targetResolution}, ${request.workflowPackage}, queue posture ${request.renderQueuePosture}.`,
    resultHandoff: `Video draft result ${result.status}: ${result.suppliedDraftLabel}.`,
    nextStep:
      readiness.status === "blocked-no-executor"
        ? "Draft request is ready for review but blocked until a future approved executor exists."
        : readiness.nextStep,
  };
}
