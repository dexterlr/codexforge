"use client";

import { UniversalExecutionReviewSurface } from "@/lib/codexforge/universal-execution-review-kit";
import { buildWorkflowProfileRegistryModel } from "@/lib/codexforge/workflow-profile-registry";

const WORKFLOW_PROFILE_REGISTRY_MARKERS = [
  "Workflow profile registry",
  "Workflow profile registry does not execute workflow profiles",
  "Profile execution requires explicit operator approval",
  "Unresolved workflow profile blockers stay blocked",
  "Profile groups",
  "Video-call meeting profile",
] as const;

export function WorkflowProfileRegistryPanel() {
  const model = buildWorkflowProfileRegistryModel();

  return (
    <UniversalExecutionReviewSurface
      phase="Phase 629"
      title="Workflow profile registry"
      subtitle="Workflow profile registry lists future workflow profiles without executing them. Profile execution requires explicit operator approval, and unresolved workflow profile blockers stay blocked."
      primaryLabel="Review workflow profiles"
      anchor="workflow-profile-registry"
      plainEnglishTitle="Plain-English workflow profile registry"
      plainEnglishCopy="This page makes the universal foundation visible for future video, research, chatbot, monitoring, video-call, coding, connector, creative, and game-server workflows. It does not execute profiles, call tools/providers/connectors, create automations, write files, join calls, or run commands from UI."
      language={model.language}
      markers={[...WORKFLOW_PROFILE_REGISTRY_MARKERS]}
      links={[
        { href: "/creative-workflow-profile", label: "Creative profile" },
        { href: "/research-workflow-profile", label: "Research profile" },
        { href: "/chatbot-workflow-profile", label: "Chatbot profile" },
        { href: "/game-server-workflow-profile", label: "Game server profile" },
      ]}
      packets={model.workflowProfileRegistries}
      advancedSummary="Advanced workflow profile registry details"
      advancedDetails={model.advancedDetails}
      advancedCopy="advanced workflow profile registry details collapsed/secondary. This route does not execute workflow profiles, call providers, call connectors, execute tools, execute agents, create automations, or write files."
      dataScope="workflow-profile-registry buildWorkflowProfileRegistryStableKey WorkflowProfileRegistryPanel"
    />
  );
}
