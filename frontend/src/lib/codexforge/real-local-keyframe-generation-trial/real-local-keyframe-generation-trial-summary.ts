import { buildKeyframeGenerationSummary } from "@/lib/codexforge/local-keyframe-generation-mvp";
import { buildArtifactCaptureSummary } from "@/lib/codexforge/local-video-artifact-capture-mvp";
import { buildRealApprovedComfyUiSubmitTrialSummary } from "@/lib/codexforge/real-approved-comfyui-submit-trial";
import { buildRealWorkflowPackageValidatorSummary } from "@/lib/codexforge/real-workflow-package-validator";
import type {
  RealLocalKeyframeGenerationTrialBoundary,
  RealLocalKeyframeGenerationTrialCheck,
  RealLocalKeyframeGenerationTrialCheckId,
  RealLocalKeyframeGenerationTrialCheckStatus,
  RealLocalKeyframeGenerationTrialFlowStage,
  RealLocalKeyframeGenerationTrialPlan,
  RealLocalKeyframeGenerationTrialSummary,
} from "./real-local-keyframe-generation-trial-types";

const KEYFRAME_TRIAL_CHECK_COPY: Record<RealLocalKeyframeGenerationTrialCheckId, string> = {
  "local-only target": "Local-only keyframe workflow targets the local ComfyUI boundary only.",
  "approved workflow package": "Approved workflow package means the prepared image workflow package has passed validator review.",
  "explicit user approval": "Explicit user approval is required before any approved local keyframe trial handoff.",
  "no cloud calls": "No cloud calls and no cloud fallback are allowed for this keyframe trial.",
  "no prompt or file upload": "No prompt or file upload happens from this page.",
  "no arbitrary file browsing": "No arbitrary file browsing is needed; the plan uses reviewed shot and scene data only.",
  "no artifact deletion": "No artifact deletion is exposed or implied.",
  "artifact capture destination defined": "Artifact capture destination is defined before local output is expected.",
  "recovery path defined": "Recovery path before retry is defined before any future retry.",
  "shot and scene linkage reviewed": "Shot and scene linkage is reviewed so keyframes match the storyboard.",
};

export function buildRealLocalKeyframeGenerationTrialFlow(): RealLocalKeyframeGenerationTrialFlowStage[] {
  return [
    {
      id: "plan-review-first",
      label: "keyframes are reviewed first",
      plainEnglish: "Keyframes are reviewed first against the storyboard before any approved local trial.",
      localOnly: true,
      approvalGated: false,
    },
    {
      id: "package-and-approval",
      label: "package and approval",
      plainEnglish: "Approved workflow package and explicit user approval are required before handoff.",
      localOnly: true,
      approvalGated: true,
    },
    {
      id: "local-keyframe-workflow",
      label: "local-only keyframe workflow",
      plainEnglish: "Local-only keyframe workflow means no cloud calls, no prompt or file upload, and no arbitrary file browsing.",
      localOnly: true,
      approvalGated: true,
    },
    {
      id: "capture-and-recovery",
      label: "capture and recovery",
      plainEnglish: "Artifact capture destination, review inbox handoff, and recovery path before retry are defined first.",
      localOnly: true,
      approvalGated: false,
    },
  ];
}

export function buildRealLocalKeyframeGenerationTrialCheck(
  id: RealLocalKeyframeGenerationTrialCheckId,
  status: RealLocalKeyframeGenerationTrialCheckStatus
): RealLocalKeyframeGenerationTrialCheck {
  return {
    id,
    status,
    label: id,
    plainEnglish: KEYFRAME_TRIAL_CHECK_COPY[id],
    blocksTrial: status === "blocked" || status === "needs-review",
  };
}

export function buildRealLocalKeyframeGenerationTrialPlan(): RealLocalKeyframeGenerationTrialPlan {
  const keyframes = buildKeyframeGenerationSummary();
  return {
    id: "real-local-keyframe-generation-trial-plan",
    planId: keyframes.request.keyframePlanId,
    promptCount: keyframes.request.promptSet.length,
    selectedShotCount: keyframes.request.selectedShots.length,
    shotSceneLinks: [
      {
        id: "opening-shot-link",
        shot: keyframes.request.selectedShots[0] ?? "opening shot",
        scene: "scene 1 establish",
        reviewGuidance: "Confirm subject, lighting, and composition before approval.",
      },
      {
        id: "middle-shot-link",
        shot: keyframes.request.selectedShots[1] ?? "middle shot",
        scene: "scene 2 action",
        reviewGuidance: "Confirm continuity with opening keyframe and planned motion.",
      },
      {
        id: "closing-shot-link",
        shot: keyframes.request.selectedShots[2] ?? "closing shot",
        scene: "scene 3 close",
        reviewGuidance: "Confirm ending pose and review inbox handoff before retry.",
      },
    ],
    reviewGuidance:
      "Shot and scene linkage must be reviewed before explicit approval. The page summarizes prompts safely and does not upload prompts or files.",
  };
}

export function buildRealLocalKeyframeGenerationTrialBoundary(): RealLocalKeyframeGenerationTrialBoundary {
  return {
    id: "real-local-keyframe-generation-trial-boundary",
    keyframesReviewedFirst: true,
    localOnlyKeyframeWorkflow: true,
    explicitApprovalRequired: true,
    approvedWorkflowPackageRequired: true,
    artifactCaptureDestinationDefined: true,
    recoveryPathBeforeRetry: true,
    cloudCallsAllowed: false,
    promptOrFileUploadAllowed: false,
    arbitraryFileBrowsingAllowed: false,
    artifactDeletionAllowed: false,
    automaticRunAllowed: false,
  };
}

export function buildRealLocalKeyframeGenerationTrialChecks(): RealLocalKeyframeGenerationTrialCheck[] {
  const validator = buildRealWorkflowPackageValidatorSummary();
  const submitTrial = buildRealApprovedComfyUiSubmitTrialSummary();
  const artifactCapture = buildArtifactCaptureSummary();
  return [
    buildRealLocalKeyframeGenerationTrialCheck("local-only target", submitTrial.boundary.localComfyUiOnly ? "ready" : "blocked"),
    buildRealLocalKeyframeGenerationTrialCheck("approved workflow package", validator.decision.approvedSubmitTrialMayReview ? "ready" : "needs-review"),
    buildRealLocalKeyframeGenerationTrialCheck("explicit user approval", submitTrial.approvalCopy ? "ready" : "needs-review"),
    buildRealLocalKeyframeGenerationTrialCheck("no cloud calls", "ready"),
    buildRealLocalKeyframeGenerationTrialCheck("no prompt or file upload", "ready"),
    buildRealLocalKeyframeGenerationTrialCheck("no arbitrary file browsing", "ready"),
    buildRealLocalKeyframeGenerationTrialCheck("no artifact deletion", "ready"),
    buildRealLocalKeyframeGenerationTrialCheck("artifact capture destination defined", artifactCapture.input.artifactKind ? "ready" : "needs-review"),
    buildRealLocalKeyframeGenerationTrialCheck("recovery path defined", "ready"),
    buildRealLocalKeyframeGenerationTrialCheck("shot and scene linkage reviewed", "needs-review"),
  ];
}

export function summarizeRealLocalKeyframeGenerationTrial(summary: RealLocalKeyframeGenerationTrialSummary): string {
  return `Real local keyframe generation trial: Keyframes are reviewed first, Local-only keyframe workflow, Shot and scene linkage, No prompt or file upload, and Recovery path before retry. Status ${summary.status}.`;
}

export function buildRealLocalKeyframeGenerationTrialSummary(): RealLocalKeyframeGenerationTrialSummary {
  const checks = buildRealLocalKeyframeGenerationTrialChecks();
  const blocked = checks.some((check) => check.status === "blocked");
  const needsReview = checks.some((check) => check.status === "needs-review");
  const status = blocked ? "blocked" : needsReview ? "not-ready" : "approval-ready";
  const summary: RealLocalKeyframeGenerationTrialSummary = {
    flow: buildRealLocalKeyframeGenerationTrialFlow(),
    checks,
    plan: buildRealLocalKeyframeGenerationTrialPlan(),
    boundary: buildRealLocalKeyframeGenerationTrialBoundary(),
    status,
    approvalCopy:
      "Explicit approval required for this Local-only keyframe workflow. Keyframes are reviewed first, no cloud calls, no prompt or file upload, no arbitrary file browsing, artifact capture destination defined, and recovery path before retry.",
    readyForApprovedLocalTrial: status === "approval-ready",
    summary: "",
  };
  return { ...summary, summary: summarizeRealLocalKeyframeGenerationTrial(summary) };
}
