"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildBuildPlanBundleReviewModelForSlug } from ".";

export function BuildPlanBundleBoundaryPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBuildPlanBundleReviewModelForSlug("build-plan-bundle-boundary")} />;
}

export function BuildPlanSummaryPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBuildPlanBundleReviewModelForSlug("build-plan-summary-packet")} />;
}

export function BuildPlanRequirementsPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBuildPlanBundleReviewModelForSlug("build-plan-requirements-packet")} />;
}

export function BuildPlanArchitecturePacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBuildPlanBundleReviewModelForSlug("build-plan-architecture-packet")} />;
}

export function BuildPlanFileManifestPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBuildPlanBundleReviewModelForSlug("build-plan-file-manifest-packet")} />;
}

export function BuildPlanCommandManifestPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBuildPlanBundleReviewModelForSlug("build-plan-command-manifest-packet")} />;
}

export function BuildPlanRuntimeManifestPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBuildPlanBundleReviewModelForSlug("build-plan-runtime-manifest-packet")} />;
}

export function BuildPlanAdapterManifestPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBuildPlanBundleReviewModelForSlug("build-plan-adapter-manifest-packet")} />;
}

export function BuildPlanValidationManifestPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBuildPlanBundleReviewModelForSlug("build-plan-validation-manifest-packet")} />;
}

export function BuildPlanRiskManifestPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBuildPlanBundleReviewModelForSlug("build-plan-risk-manifest-packet")} />;
}

export function BuildPlanApprovalManifestPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBuildPlanBundleReviewModelForSlug("build-plan-approval-manifest-packet")} />;
}

export function BuildPlanEvidenceManifestPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBuildPlanBundleReviewModelForSlug("build-plan-evidence-manifest-packet")} />;
}

export function BuildPlanResultManifestPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBuildPlanBundleReviewModelForSlug("build-plan-result-manifest-packet")} />;
}

export function BuildPlanRecoveryManifestPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBuildPlanBundleReviewModelForSlug("build-plan-recovery-manifest-packet")} />;
}

export function FirstCompleteBuildPlanCandidatePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBuildPlanBundleReviewModelForSlug("first-complete-build-plan-candidate")} />;
}

export function ControlledBuildPlanBundleReleaseCandidatePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBuildPlanBundleReviewModelForSlug("controlled-build-plan-bundle-release-candidate")} />;
}

export function BuildPlanApprovalBoundaryPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBuildPlanBundleReviewModelForSlug("build-plan-approval-boundary")} />;
}

export function BuildPlanApprovalQueuePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBuildPlanBundleReviewModelForSlug("build-plan-approval-queue")} />;
}

export function BuildPlanApprovalDetailPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBuildPlanBundleReviewModelForSlug("build-plan-approval-detail-packet")} />;
}

export function BuildPlanApprovalDiffPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBuildPlanBundleReviewModelForSlug("build-plan-approval-diff-preview")} />;
}

export function BuildPlanApprovalCommandPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBuildPlanBundleReviewModelForSlug("build-plan-approval-command-preview")} />;
}

export function BuildPlanApprovalRuntimePreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBuildPlanBundleReviewModelForSlug("build-plan-approval-runtime-preview")} />;
}

export function BuildPlanApprovalAdapterPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBuildPlanBundleReviewModelForSlug("build-plan-approval-adapter-preview")} />;
}

export function BuildPlanApprovalRiskGatePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBuildPlanBundleReviewModelForSlug("build-plan-approval-risk-gate")} />;
}

export function BuildPlanApprovalEvidenceGatePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBuildPlanBundleReviewModelForSlug("build-plan-approval-evidence-gate")} />;
}

export function BuildPlanApprovalResultGatePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBuildPlanBundleReviewModelForSlug("build-plan-approval-result-gate")} />;
}

export function BuildPlanApprovalRecoveryGatePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBuildPlanBundleReviewModelForSlug("build-plan-approval-recovery-gate")} />;
}

export function BuildPlanReadyToExecutePacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBuildPlanBundleReviewModelForSlug("build-plan-ready-to-execute-packet")} />;
}

export function BuildPlanExecutionHoldStatePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBuildPlanBundleReviewModelForSlug("build-plan-execution-hold-state")} />;
}

export function BuildPlanOperatorSignoffPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBuildPlanBundleReviewModelForSlug("build-plan-operator-signoff-packet")} />;
}

export function FirstApprovedBuildPlanCandidatePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBuildPlanBundleReviewModelForSlug("first-approved-build-plan-candidate")} />;
}

export function ControlledBuildPlanApprovalReleaseCandidatePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBuildPlanBundleReviewModelForSlug("controlled-build-plan-approval-release-candidate")} />;
}
