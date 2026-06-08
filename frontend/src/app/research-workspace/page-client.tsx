"use client";

import { ResearchWorkspaceShellPanel } from "@/lib/codexforge/research-workspace-shell/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ResearchWorkspacePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/research-workspace"
      workspaceLabel="Research Workspace"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ResearchWorkspaceShellPanel />
    </CodexForgeAppShell>
  );
}
