"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildUniversalProjectBuilderReviewModelForSlug } from ".";

export function UniversalProjectBuilderBoundaryPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalProjectBuilderReviewModelForSlug("universal-project-builder-boundary")} />;
}

export function AppBuilderTargetPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalProjectBuilderReviewModelForSlug("app-builder-target-packet")} />;
}

export function WebsiteBuilderTargetPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalProjectBuilderReviewModelForSlug("website-builder-target-packet")} />;
}

export function DashboardBuilderTargetPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalProjectBuilderReviewModelForSlug("dashboard-builder-target-packet")} />;
}

export function ToolBuilderTargetPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalProjectBuilderReviewModelForSlug("tool-builder-target-packet")} />;
}

export function ResearchPackBuilderTargetPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalProjectBuilderReviewModelForSlug("research-pack-builder-target-packet")} />;
}

export function AutomationWorkflowBuilderTargetPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalProjectBuilderReviewModelForSlug("automation-workflow-builder-target-packet")} />;
}

export function CreativeWorkflowBuilderTargetPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalProjectBuilderReviewModelForSlug("creative-workflow-builder-target-packet")} />;
}

export function TradingWorkspaceBuilderTargetPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalProjectBuilderReviewModelForSlug("trading-workspace-builder-target-packet")} />;
}

export function DataWorkspaceBuilderTargetPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalProjectBuilderReviewModelForSlug("data-workspace-builder-target-packet")} />;
}

export function DocumentationPackBuilderTargetPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalProjectBuilderReviewModelForSlug("documentation-pack-builder-target-packet")} />;
}

export function IntegrationPackBuilderTargetPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalProjectBuilderReviewModelForSlug("integration-pack-builder-target-packet")} />;
}

export function UniversalProjectBuilderSafetyPlanPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalProjectBuilderReviewModelForSlug("universal-project-builder-safety-plan")} />;
}

export function FirstUniversalProjectBuilderCandidatePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalProjectBuilderReviewModelForSlug("first-universal-project-builder-candidate")} />;
}

export function UniversalBuilderMvpTrialPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalProjectBuilderReviewModelForSlug("universal-builder-mvp-trial-packet")} />;
}

export function ControlledUniversalProjectBuilderReleaseCandidatePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalProjectBuilderReviewModelForSlug("controlled-universal-project-builder-release-candidate")} />;
}
