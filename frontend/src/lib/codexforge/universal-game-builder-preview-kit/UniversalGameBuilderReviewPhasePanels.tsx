"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildUniversalGameBuilderReviewModelForSlug } from ".";

export function UniversalGameBuilderBoundaryPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalGameBuilderReviewModelForSlug("universal-game-builder-boundary")} />;
}

export function GameTargetIntakePacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalGameBuilderReviewModelForSlug("game-target-intake-packet")} />;
}

export function GamePlatformClassifierPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalGameBuilderReviewModelForSlug("game-platform-classifier-preview")} />;
}

export function GameServerPlanPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalGameBuilderReviewModelForSlug("game-server-plan-preview")} />;
}

export function GameModpackPlanPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalGameBuilderReviewModelForSlug("game-modpack-plan-preview")} />;
}

export function GameContentPlanPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalGameBuilderReviewModelForSlug("game-content-plan-preview")} />;
}

export function GameAutomationPlanPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalGameBuilderReviewModelForSlug("game-automation-plan-preview")} />;
}

export function GameAssetPipelinePlanPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalGameBuilderReviewModelForSlug("game-asset-pipeline-plan-preview")} />;
}

export function GameDeploymentPlanPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalGameBuilderReviewModelForSlug("game-deployment-plan-preview")} />;
}

export function GameSafetyApprovalPlanPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalGameBuilderReviewModelForSlug("game-safety-approval-plan")} />;
}

export function GameEvidenceCapturePlanPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalGameBuilderReviewModelForSlug("game-evidence-capture-plan")} />;
}

export function GameResultReviewPlanPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalGameBuilderReviewModelForSlug("game-result-review-plan")} />;
}

export function GameRecoveryPlanPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalGameBuilderReviewModelForSlug("game-recovery-plan-preview")} />;
}

export function GamePackagingPlanPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalGameBuilderReviewModelForSlug("game-packaging-plan-preview")} />;
}

export function FirstUniversalGameBuilderCandidatePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalGameBuilderReviewModelForSlug("first-universal-game-builder-candidate")} />;
}

export function ControlledUniversalGameBuilderReleaseCandidatePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalGameBuilderReviewModelForSlug("controlled-universal-game-builder-release-candidate")} />;
}
