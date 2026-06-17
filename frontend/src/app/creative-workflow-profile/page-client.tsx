"use client";

import { CreativeWorkflowProfilePanel } from "@/lib/codexforge/creative-workflow-profile/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CreativeWorkflowProfilePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/creative-workflow-profile"
      workspaceLabel="Creative Workflow Profile"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CreativeWorkflowProfilePanel />
    </CodexForgeAppShell>
  );
}
