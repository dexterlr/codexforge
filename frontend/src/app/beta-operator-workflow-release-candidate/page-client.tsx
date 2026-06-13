"use client";

import { BetaOperatorWorkflowReleaseCandidatePanel } from "@/lib/codexforge/beta-operator-workflow-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BetaOperatorWorkflowReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/beta-operator-workflow-release-candidate"
      workspaceLabel="Beta Workflow RC"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BetaOperatorWorkflowReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}
