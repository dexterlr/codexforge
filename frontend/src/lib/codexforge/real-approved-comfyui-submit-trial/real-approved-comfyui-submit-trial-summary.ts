import { buildSubmitBoundarySummary } from "@/lib/codexforge/comfyui-approved-submit-boundary";
import { buildArtifactCaptureSummary } from "@/lib/codexforge/local-video-artifact-capture-mvp";
import { buildRealLocalComfyUiHealthProbeSummary } from "@/lib/codexforge/real-local-comfyui-health-probe";
import { buildRealLocalComfyUiMetadataReaderSummary } from "@/lib/codexforge/real-local-comfyui-metadata-reader";
import { buildRealWorkflowPackageValidatorSummary } from "@/lib/codexforge/real-workflow-package-validator";
import type {
  RealApprovedComfyUiSubmitTrialBoundary,
  RealApprovedComfyUiSubmitTrialCheck,
  RealApprovedComfyUiSubmitTrialCheckId,
  RealApprovedComfyUiSubmitTrialCheckStatus,
  RealApprovedComfyUiSubmitTrialFlowStage,
  RealApprovedComfyUiSubmitTrialSummary,
} from "./real-approved-comfyui-submit-trial-types";

const TRIAL_CHECK_COPY: Record<RealApprovedComfyUiSubmitTrialCheckId, string> = {
  "health probe is ready": "Health probe must be ready before any approved local submit trial can proceed.",
  "metadata reader is acceptable": "Metadata reader must be acceptable or reviewed so missing node/model risk is visible.",
  "workflow package validator is ready": "Workflow package validator must be ready for the prepared package only.",
  "approved ComfyUI submit boundary exists": "Approved ComfyUI submit boundary must exist before a trial can be handed off.",
  "artifact capture path is defined": "Artifact capture handoff must be defined before any result is expected.",
  "recovery path is defined": "Recovery path before retry must be defined before any future retry.",
  "user approval copy is present": "Explicit approval required copy must be present and reviewable.",
  "final live queue call remains behind boundary": "Final live queue call remains behind the approved local boundary and is not run from arbitrary UI.",
};

export function buildRealApprovedComfyUiSubmitTrialFlow(): RealApprovedComfyUiSubmitTrialFlowStage[] {
  return [
    {
      id: "approved-local-only-executor",
      label: "approved local-only executor",
      plainEnglish: "Use an approved local-only executor boundary, not a random generate button.",
      localOnly: true,
      requiresApproval: true,
    },
    {
      id: "explicit-safety-checks",
      label: "explicit safety checks",
      plainEnglish: "Check health, metadata, package validation, artifact capture, review inbox, and recovery path first.",
      localOnly: true,
      requiresApproval: true,
    },
    {
      id: "explicit-user-approval",
      label: "explicit user approval",
      plainEnglish: "Explicit approval required before any future local ComfyUI-only handoff.",
      localOnly: true,
      requiresApproval: true,
    },
    {
      id: "artifact-review-recovery",
      label: "artifact capture handoff",
      plainEnglish: "Artifact capture handoff, review inbox, and recovery path before retry are part of the trial boundary.",
      localOnly: true,
      requiresApproval: false,
    },
  ];
}

export function buildRealApprovedComfyUiSubmitTrialCheck(
  id: RealApprovedComfyUiSubmitTrialCheckId,
  status: RealApprovedComfyUiSubmitTrialCheckStatus
): RealApprovedComfyUiSubmitTrialCheck {
  return {
    id,
    status,
    label: id,
    plainEnglish: TRIAL_CHECK_COPY[id],
    blocksTrial: status === "blocked" || status === "needs-review",
  };
}

export function buildRealApprovedComfyUiSubmitTrialBoundary(): RealApprovedComfyUiSubmitTrialBoundary {
  return {
    id: "real-approved-comfyui-submit-trial-boundary",
    notRandomGenerateButton: true,
    explicitApprovalRequired: true,
    localComfyUiOnly: true,
    artifactCaptureHandoff: true,
    recoveryPathBeforeRetry: true,
    cloudCallsAllowed: false,
    secretsShown: false,
    arbitraryUiSubmitAllowed: false,
    finalLiveQueueCallAllowed: false,
  };
}

export function buildRealApprovedComfyUiSubmitTrialChecks(): RealApprovedComfyUiSubmitTrialCheck[] {
  const health = buildRealLocalComfyUiHealthProbeSummary();
  const metadata = buildRealLocalComfyUiMetadataReaderSummary();
  const validator = buildRealWorkflowPackageValidatorSummary();
  const submitBoundary = buildSubmitBoundarySummary();
  const artifactCapture = buildArtifactCaptureSummary();
  return [
    buildRealApprovedComfyUiSubmitTrialCheck("health probe is ready", health.readyForLiveProbe ? "ready" : "needs-review"),
    buildRealApprovedComfyUiSubmitTrialCheck("metadata reader is acceptable", metadata.status === "blocked" ? "blocked" : "ready"),
    buildRealApprovedComfyUiSubmitTrialCheck("workflow package validator is ready", validator.decision.state === "ready" ? "ready" : "needs-review"),
    buildRealApprovedComfyUiSubmitTrialCheck("approved ComfyUI submit boundary exists", submitBoundary.executionPosture.id ? "ready" : "needs-review"),
    buildRealApprovedComfyUiSubmitTrialCheck("artifact capture path is defined", artifactCapture.handoff.nextStep ? "ready" : "needs-review"),
    buildRealApprovedComfyUiSubmitTrialCheck("recovery path is defined", "ready"),
    buildRealApprovedComfyUiSubmitTrialCheck("user approval copy is present", "ready"),
    buildRealApprovedComfyUiSubmitTrialCheck("final live queue call remains behind boundary", "blocked"),
  ];
}

export function summarizeRealApprovedComfyUiSubmitTrial(
  summary: RealApprovedComfyUiSubmitTrialSummary
): string {
  return `Real approved ComfyUI submit trial: Explicit approval required, Local ComfyUI only, Artifact capture handoff, Recovery path before retry, and Not a random generate button. Status ${summary.status}.`;
}

export function buildRealApprovedComfyUiSubmitTrialSummary(): RealApprovedComfyUiSubmitTrialSummary {
  const checks = buildRealApprovedComfyUiSubmitTrialChecks();
  const blocked = checks.some((check) => check.status === "blocked");
  const needsReview = checks.some((check) => check.status === "needs-review");
  const status = blocked ? "blocked" : needsReview ? "not-ready" : "handoff-ready";
  const summary: RealApprovedComfyUiSubmitTrialSummary = {
    flow: buildRealApprovedComfyUiSubmitTrialFlow(),
    checks,
    boundary: buildRealApprovedComfyUiSubmitTrialBoundary(),
    status,
    readyForLiveSubmit: false,
    approvalCopy:
      "Explicit approval required for a local ComfyUI-only submit trial. No cloud calls, no secrets, no arbitrary UI submit, artifact capture handoff required, review inbox handoff required, and recovery path before retry.",
    summary: "",
  };
  return { ...summary, summary: summarizeRealApprovedComfyUiSubmitTrial(summary) };
}
