"use client";

import { ControlledLiveWorkflowReleaseCandidatePanel } from "@/lib/codexforge/controlled-live-workflow-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-live-workflow-release-candidate"
      workspaceLabel="Controlled Live RC"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ControlledLiveWorkflowReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}
