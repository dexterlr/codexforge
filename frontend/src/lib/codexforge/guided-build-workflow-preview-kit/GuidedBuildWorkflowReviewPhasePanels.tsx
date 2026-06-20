"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildGuidedBuildWorkflowReviewModelForSlug } from ".";

export function GuidedBuildWorkflowBoundaryPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildGuidedBuildWorkflowReviewModelForSlug("guided-build-workflow-boundary")} />;
}

export function GuidedBuildGoalReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildGuidedBuildWorkflowReviewModelForSlug("guided-build-goal-review")} />;
}

export function GuidedBuildTargetSelectionPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildGuidedBuildWorkflowReviewModelForSlug("guided-build-target-selection")} />;
}

export function GuidedBuildRequirementChecklistPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildGuidedBuildWorkflowReviewModelForSlug("guided-build-requirement-checklist")} />;
}

export function GuidedBuildArchitectureSketchPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildGuidedBuildWorkflowReviewModelForSlug("guided-build-architecture-sketch")} />;
}

export function GuidedBuildFileBlueprintPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildGuidedBuildWorkflowReviewModelForSlug("guided-build-file-blueprint")} />;
}

export function GuidedBuildCommandBlueprintPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildGuidedBuildWorkflowReviewModelForSlug("guided-build-command-blueprint")} />;
}

export function GuidedBuildRuntimeBlueprintPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildGuidedBuildWorkflowReviewModelForSlug("guided-build-runtime-blueprint")} />;
}

export function GuidedBuildAdapterBlueprintPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildGuidedBuildWorkflowReviewModelForSlug("guided-build-adapter-blueprint")} />;
}

export function GuidedBuildValidationBlueprintPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildGuidedBuildWorkflowReviewModelForSlug("guided-build-validation-blueprint")} />;
}

export function GuidedBuildRiskReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildGuidedBuildWorkflowReviewModelForSlug("guided-build-risk-review")} />;
}

export function GuidedBuildApprovalQueuePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildGuidedBuildWorkflowReviewModelForSlug("guided-build-approval-queue")} />;
}

export function GuidedBuildEvidencePlanPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildGuidedBuildWorkflowReviewModelForSlug("guided-build-evidence-plan")} />;
}

export function GuidedBuildResultPlanPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildGuidedBuildWorkflowReviewModelForSlug("guided-build-result-plan")} />;
}

export function FirstPracticalGuidedBuildCandidatePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildGuidedBuildWorkflowReviewModelForSlug("first-practical-guided-build-candidate")} />;
}

export function ControlledGuidedBuildWorkflowReleaseCandidatePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildGuidedBuildWorkflowReviewModelForSlug("controlled-guided-build-workflow-release-candidate")} />;
}

