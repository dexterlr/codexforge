"use client";

import { CodexForgeEndToEndWorkflowReleaseCandidatePanel } from "@/lib/codexforge/codexforge-end-to-end-workflow-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CodexForgeEndToEndWorkflowReleaseCandidatePanelPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/codexforge-end-to-end-workflow-release-candidate"
      workspaceLabel="End-to-End RC"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CodexForgeEndToEndWorkflowReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}
