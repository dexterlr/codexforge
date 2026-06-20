"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildUniversalBuilderCockpitReviewModelForSlug } from ".";

export function UniversalBuilderCockpitBoundaryPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalBuilderCockpitReviewModelForSlug("universal-builder-cockpit-boundary")} />;
}

export function BuildAnythingGoalComposerPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalBuilderCockpitReviewModelForSlug("build-anything-goal-composer")} />;
}

export function BuilderIntentClarifierPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalBuilderCockpitReviewModelForSlug("builder-intent-clarifier-preview")} />;
}

export function BuilderTargetRecommendationPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalBuilderCockpitReviewModelForSlug("builder-target-recommendation-preview")} />;
}

export function BuilderPlanOutlinePreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalBuilderCockpitReviewModelForSlug("builder-plan-outline-preview")} />;
}

export function BuilderAdapterStackPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalBuilderCockpitReviewModelForSlug("builder-adapter-stack-preview")} />;
}

export function BuilderApprovalTimelinePreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalBuilderCockpitReviewModelForSlug("builder-approval-timeline-preview")} />;
}

export function BuilderEvidenceTimelinePreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalBuilderCockpitReviewModelForSlug("builder-evidence-timeline-preview")} />;
}

export function BuilderResultTimelinePreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalBuilderCockpitReviewModelForSlug("builder-result-timeline-preview")} />;
}

export function BuilderRecoveryTimelinePreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalBuilderCockpitReviewModelForSlug("builder-recovery-timeline-preview")} />;
}

export function BuilderPackagingTimelinePreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalBuilderCockpitReviewModelForSlug("builder-packaging-timeline-preview")} />;
}

export function BuilderCostPrivacyRiskReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalBuilderCockpitReviewModelForSlug("builder-cost-privacy-risk-review")} />;
}

export function BuilderOperatorDecisionPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalBuilderCockpitReviewModelForSlug("builder-operator-decision-packet")} />;
}

export function FirstGuidedBuildAnythingCandidatePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalBuilderCockpitReviewModelForSlug("first-guided-build-anything-candidate")} />;
}

export function UniversalBuilderCockpitTrialPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalBuilderCockpitReviewModelForSlug("universal-builder-cockpit-trial-packet")} />;
}

export function ControlledUniversalBuilderCockpitReleaseCandidatePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalBuilderCockpitReviewModelForSlug("controlled-universal-builder-cockpit-release-candidate")} />;
}
