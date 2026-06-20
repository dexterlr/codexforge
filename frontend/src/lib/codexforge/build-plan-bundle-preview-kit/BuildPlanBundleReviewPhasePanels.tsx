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
