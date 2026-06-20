"use client";

import { ControlledGuidedBuildWorkflowReleaseCandidatePanel } from "@/lib/codexforge/controlled-guided-build-workflow-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledGuidedBuildWorkflowReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-guided-build-workflow-release-candidate"
      workspaceLabel="Controlled Guided Build Workflow Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ControlledGuidedBuildWorkflowReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}

