import { buildImageGenerationSummary } from "@/lib/codexforge/local-image-generation-mvp";
import { buildArtifactCaptureSummary } from "@/lib/codexforge/local-video-artifact-capture-mvp";
import { buildRealApprovedComfyUiSubmitTrialSummary } from "@/lib/codexforge/real-approved-comfyui-submit-trial";
import { buildRealLocalComfyUiHealthProbeSummary } from "@/lib/codexforge/real-local-comfyui-health-probe";
import { buildRealLocalComfyUiMetadataReaderSummary } from "@/lib/codexforge/real-local-comfyui-metadata-reader";
import { buildRealWorkflowPackageValidatorSummary } from "@/lib/codexforge/real-workflow-package-validator";
import type {
  RealLocalImageGenerationTrialBoundary,
  RealLocalImageGenerationTrialCheck,
  RealLocalImageGenerationTrialCheckId,
  RealLocalImageGenerationTrialCheckStatus,
  RealLocalImageGenerationTrialFlowStage,
  RealLocalImageGenerationTrialPackageSummary,
  RealLocalImageGenerationTrialSummary,
} from "./real-local-image-generation-trial-types";

const IMAGE_TRIAL_CHECK_COPY: Record<RealLocalImageGenerationTrialCheckId, string> = {
  "health probe ready": "Health probe ready means localhost-only ComfyUI readiness has been reviewed before the trial.",
  "metadata acceptable": "Metadata acceptable means missing node/model risk is visible before approval.",
  "workflow package valid": "Workflow package valid means a prepared package passed the local-only validator.",
  "explicit user approval": "Explicit user approval is required before the local image trial can be handed to the approved boundary.",
  "local ComfyUI only": "Local ComfyUI only means no cloud calls, no fallback provider, and no prompt or file upload.",
  "artifact capture handoff": "Artifact capture handoff is defined before any local output is expected.",
  "review inbox handoff": "Review inbox handoff is defined so the result is reviewed before any reuse.",
  "recovery path defined": "Recovery path before retry is defined before any future retry is considered.",
  "nothing runs automatically": "Nothing runs automatically from this page; it is not a random generate button.",
};

export function buildRealLocalImageGenerationTrialFlow(): RealLocalImageGenerationTrialFlowStage[] {
  return [
    {
      id: "health-metadata-package",
      label: "review local readiness",
      plainEnglish:
        "health probe ready -> metadata acceptable -> workflow package valid before approval is requested.",
      localOnly: true,
      approvalGated: false,
    },
    {
      id: "explicit-approval",
      label: "explicit approval before local image trial",
      plainEnglish:
        "Explicit approval before local image trial is required; this is not a random generate button.",
      localOnly: true,
      approvalGated: true,
    },
    {
      id: "local-comfyui-only",
      label: "local ComfyUI only",
      plainEnglish: "Local ComfyUI only, with no cloud calls, no fallback provider, and no prompt or file upload.",
      localOnly: true,
      approvalGated: true,
    },
    {
      id: "capture-review-recovery",
      label: "artifact capture and review",
      plainEnglish:
        "artifact capture handoff -> review inbox handoff -> recovery path before retry after any approved local output.",
      localOnly: true,
      approvalGated: false,
    },
  ];
}

export function buildRealLocalImageGenerationTrialCheck(
  id: RealLocalImageGenerationTrialCheckId,
  status: RealLocalImageGenerationTrialCheckStatus
): RealLocalImageGenerationTrialCheck {
  return {
    id,
    status,
    label: id,
    plainEnglish: IMAGE_TRIAL_CHECK_COPY[id],
    blocksTrial: status === "blocked" || status === "needs-review",
  };
}

export function buildRealLocalImageGenerationTrialPackageSummary(): RealLocalImageGenerationTrialPackageSummary {
  const image = buildImageGenerationSummary();
  return {
    id: "real-local-image-generation-trial-package",
    promptSummary: image.prompt.positive,
    negativePromptSummary: image.prompt.negative,
    workflowPackage: image.request.workflowPackage,
    artifactDestination: "Artifact capture handoff; full local paths stay out of the primary view.",
    safeToShowAboveFold: true,
    rawJsonShownAboveFold: false,
  };
}

export function buildRealLocalImageGenerationTrialBoundary(): RealLocalImageGenerationTrialBoundary {
  return {
    id: "real-local-image-generation-trial-boundary",
    notRandomGenerateButton: true,
    explicitApprovalBeforeLocalImageTrial: true,
    localComfyUiOnly: true,
    artifactCaptureHandoff: true,
    reviewInboxHandoff: true,
    recoveryPathBeforeRetry: true,
    cloudCallsAllowed: false,
    arbitraryQueueSubmitAllowed: false,
    arbitraryFileBrowsingAllowed: false,
    artifactDeletionAllowed: false,
    automaticRunAllowed: false,
  };
}

export function buildRealLocalImageGenerationTrialChecks(): RealLocalImageGenerationTrialCheck[] {
  const health = buildRealLocalComfyUiHealthProbeSummary();
  const metadata = buildRealLocalComfyUiMetadataReaderSummary();
  const validator = buildRealWorkflowPackageValidatorSummary();
  const submitTrial = buildRealApprovedComfyUiSubmitTrialSummary();
  const artifactCapture = buildArtifactCaptureSummary();

  return [
    buildRealLocalImageGenerationTrialCheck("health probe ready", health.readyForLiveProbe ? "ready" : "needs-review"),
    buildRealLocalImageGenerationTrialCheck("metadata acceptable", metadata.status === "blocked" ? "blocked" : "needs-review"),
    buildRealLocalImageGenerationTrialCheck("workflow package valid", validator.decision.approvedSubmitTrialMayReview ? "ready" : "needs-review"),
    buildRealLocalImageGenerationTrialCheck("explicit user approval", submitTrial.approvalCopy ? "ready" : "needs-review"),
    buildRealLocalImageGenerationTrialCheck("local ComfyUI only", submitTrial.boundary.localComfyUiOnly ? "ready" : "blocked"),
    buildRealLocalImageGenerationTrialCheck("artifact capture handoff", artifactCapture.handoff.nextStep ? "ready" : "needs-review"),
    buildRealLocalImageGenerationTrialCheck("review inbox handoff", "ready"),
    buildRealLocalImageGenerationTrialCheck("recovery path defined", "ready"),
    buildRealLocalImageGenerationTrialCheck("nothing runs automatically", "ready"),
  ];
}

export function summarizeRealLocalImageGenerationTrial(summary: RealLocalImageGenerationTrialSummary): string {
  return `Real local image generation trial: Explicit approval before local image trial, Local ComfyUI only, Artifact capture handoff, Not a random generate button, and Nothing runs automatically. Status ${summary.status}.`;
}

export function buildRealLocalImageGenerationTrialSummary(): RealLocalImageGenerationTrialSummary {
  const checks = buildRealLocalImageGenerationTrialChecks();
  const blocked = checks.some((check) => check.status === "blocked");
  const needsReview = checks.some((check) => check.status === "needs-review");
  const status = blocked ? "blocked" : needsReview ? "not-ready" : "approval-ready";
  const summary: RealLocalImageGenerationTrialSummary = {
    flow: buildRealLocalImageGenerationTrialFlow(),
    checks,
    packageSummary: buildRealLocalImageGenerationTrialPackageSummary(),
    boundary: buildRealLocalImageGenerationTrialBoundary(),
    status,
    approvalCopy:
      "Explicit approval before local image trial: I approve this prepared local image trial for Local ComfyUI only. Nothing runs automatically from this page, no cloud calls, no prompt or file upload, artifact capture handoff and review inbox handoff are required.",
    readyForApprovedLocalTrial: status === "approval-ready",
    summary: "",
  };
  return { ...summary, summary: summarizeRealLocalImageGenerationTrial(summary) };
}
