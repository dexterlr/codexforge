import { buildVideoDraftSummary } from "@/lib/codexforge/local-video-draft-mvp";
import { buildRealApprovedComfyUiSubmitTrialSummary } from "@/lib/codexforge/real-approved-comfyui-submit-trial";
import { buildRealLocalImageGenerationTrialSummary } from "@/lib/codexforge/real-local-image-generation-trial";
import { buildRealLocalKeyframeGenerationTrialSummary } from "@/lib/codexforge/real-local-keyframe-generation-trial";
import { buildRealWorkflowPackageValidatorSummary } from "@/lib/codexforge/real-workflow-package-validator";
import type {
  RealLocalVideoDraftTrialBoundary,
  RealLocalVideoDraftTrialBounds,
  RealLocalVideoDraftTrialCheck,
  RealLocalVideoDraftTrialCheckId,
  RealLocalVideoDraftTrialCheckStatus,
  RealLocalVideoDraftTrialFlowStage,
  RealLocalVideoDraftTrialGpuGuidance,
  RealLocalVideoDraftTrialSummary,
} from "./real-local-video-draft-trial-types";

const VIDEO_DRAFT_TRIAL_CHECK_COPY: Record<RealLocalVideoDraftTrialCheckId, string> = {
  "image trial readiness": "Image trial readiness is reviewed before a video draft depends on generated stills.",
  "keyframe trial readiness": "Keyframe trial readiness is reviewed before motion is attempted.",
  "video workflow package validation": "Video workflow package validation must pass for the prepared local package only.",
  "explicit approval": "Explicit approval is required before a local video draft trial handoff.",
  "local ComfyUI only": "Local ComfyUI only means no cloud fallback and no provider upload.",
  "frame count and duration bounded": "Frame count and duration bounded keeps the draft small and reviewable.",
  "gpu worker guidance reviewed": "Dual GPUs are parallel workers unless a workflow explicitly supports multi-GPU memory sharing.",
  "no cloud fallback": "No cloud fallback is allowed for this local video draft trial.",
  "artifact capture handoff": "Draft output capture is defined before any local output is expected.",
  "retry and recovery path": "Retry and recovery path is defined before any future retry.",
  "review before promotion": "Review before promotion is required; outputs are not silently promoted.",
};

export function buildRealLocalVideoDraftTrialFlow(): RealLocalVideoDraftTrialFlowStage[] {
  return [
    {
      id: "image-keyframe-readiness",
      label: "image and keyframe readiness",
      plainEnglish: "image/keyframe trial readiness is reviewed before a video draft is considered.",
      localOnly: true,
      approvalGated: false,
    },
    {
      id: "video-package-and-approval",
      label: "video package and approval",
      plainEnglish: "video workflow package validation -> explicit approval before local ComfyUI-only handoff.",
      localOnly: true,
      approvalGated: true,
    },
    {
      id: "bounded-local-draft",
      label: "bounded local video draft",
      plainEnglish: "Local video draft only with frame count and duration bounded, no cloud fallback, and no queue mutation.",
      localOnly: true,
      approvalGated: true,
    },
    {
      id: "capture-review-recovery",
      label: "capture review recovery",
      plainEnglish: "draft output capture -> review inbox -> recovery path, with review before promotion.",
      localOnly: true,
      approvalGated: false,
    },
  ];
}

export function buildRealLocalVideoDraftTrialCheck(
  id: RealLocalVideoDraftTrialCheckId,
  status: RealLocalVideoDraftTrialCheckStatus
): RealLocalVideoDraftTrialCheck {
  return {
    id,
    status,
    label: id,
    plainEnglish: VIDEO_DRAFT_TRIAL_CHECK_COPY[id],
    blocksTrial: status === "blocked" || status === "needs-review",
  };
}

export function buildRealLocalVideoDraftTrialBounds(): RealLocalVideoDraftTrialBounds {
  const video = buildVideoDraftSummary();
  return {
    id: "real-local-video-draft-trial-bounds",
    frameCountLabel: "bounded draft frame count from reviewed workflow settings",
    durationLabel: video.request.targetDuration,
    resolutionLabel: video.request.targetResolution,
    frameCountBounded: true,
    durationBounded: true,
  };
}

export function buildRealLocalVideoDraftTrialGpuGuidance(): RealLocalVideoDraftTrialGpuGuidance {
  return {
    id: "real-local-video-draft-trial-gpu-guidance",
    dualGpuMode: "Dual GPUs are parallel workers",
    memorySharingClaim: "No multi-GPU memory sharing claim unless workflow supports it",
    workerGuidance:
      "Use the two GPUs as separate local workers for independent approved jobs. Do not claim shared memory unless the reviewed workflow explicitly supports it.",
  };
}

export function buildRealLocalVideoDraftTrialBoundary(): RealLocalVideoDraftTrialBoundary {
  return {
    id: "real-local-video-draft-trial-boundary",
    localVideoDraftOnly: true,
    explicitApprovalRequired: true,
    localComfyUiOnly: true,
    frameCountAndDurationBounded: true,
    dualGpusParallelWorkers: true,
    noCloudFallback: true,
    artifactCaptureHandoff: true,
    retryRecoveryPath: true,
    reviewBeforePromotion: true,
    queueMutationAllowed: false,
    arbitraryQueueSubmitAllowed: false,
    artifactDeletionAllowed: false,
    automaticRunAllowed: false,
  };
}

export function buildRealLocalVideoDraftTrialChecks(): RealLocalVideoDraftTrialCheck[] {
  const imageTrial = buildRealLocalImageGenerationTrialSummary();
  const keyframeTrial = buildRealLocalKeyframeGenerationTrialSummary();
  const validator = buildRealWorkflowPackageValidatorSummary();
  const submitTrial = buildRealApprovedComfyUiSubmitTrialSummary();
  return [
    buildRealLocalVideoDraftTrialCheck("image trial readiness", imageTrial.status === "approval-ready" ? "ready" : "needs-review"),
    buildRealLocalVideoDraftTrialCheck("keyframe trial readiness", keyframeTrial.status === "approval-ready" ? "ready" : "needs-review"),
    buildRealLocalVideoDraftTrialCheck("video workflow package validation", validator.decision.approvedSubmitTrialMayReview ? "ready" : "needs-review"),
    buildRealLocalVideoDraftTrialCheck("explicit approval", submitTrial.approvalCopy ? "ready" : "needs-review"),
    buildRealLocalVideoDraftTrialCheck("local ComfyUI only", submitTrial.boundary.localComfyUiOnly ? "ready" : "blocked"),
    buildRealLocalVideoDraftTrialCheck("frame count and duration bounded", "ready"),
    buildRealLocalVideoDraftTrialCheck("gpu worker guidance reviewed", "ready"),
    buildRealLocalVideoDraftTrialCheck("no cloud fallback", "ready"),
    buildRealLocalVideoDraftTrialCheck("artifact capture handoff", "ready"),
    buildRealLocalVideoDraftTrialCheck("retry and recovery path", "ready"),
    buildRealLocalVideoDraftTrialCheck("review before promotion", "ready"),
  ];
}

export function summarizeRealLocalVideoDraftTrial(summary: RealLocalVideoDraftTrialSummary): string {
  return `Real local video draft trial: Local video draft only, Frame count and duration bounded, Dual GPUs are parallel workers, No cloud fallback, and Review before promotion. Status ${summary.status}.`;
}

export function buildRealLocalVideoDraftTrialSummary(): RealLocalVideoDraftTrialSummary {
  const checks = buildRealLocalVideoDraftTrialChecks();
  const blocked = checks.some((check) => check.status === "blocked");
  const needsReview = checks.some((check) => check.status === "needs-review");
  const status = blocked ? "blocked" : needsReview ? "not-ready" : "approval-ready";
  const summary: RealLocalVideoDraftTrialSummary = {
    flow: buildRealLocalVideoDraftTrialFlow(),
    checks,
    bounds: buildRealLocalVideoDraftTrialBounds(),
    gpuGuidance: buildRealLocalVideoDraftTrialGpuGuidance(),
    boundary: buildRealLocalVideoDraftTrialBoundary(),
    status,
    approvalCopy:
      "Explicit approval required for this Real local video draft trial. Local video draft only, frame count and duration bounded, Dual GPUs are parallel workers, no multi-GPU memory sharing claim unless workflow supports it, no cloud fallback, artifact capture handoff, retry and recovery path, and Review before promotion.",
    readyForApprovedLocalTrial: status === "approval-ready",
    summary: "",
  };
  return { ...summary, summary: summarizeRealLocalVideoDraftTrial(summary) };
}
