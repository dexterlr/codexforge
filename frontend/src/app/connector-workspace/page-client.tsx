"use client";

import { ConnectorWorkspaceShellPanel } from "@/lib/codexforge/connector-workspace-shell/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ConnectorWorkspacePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/connector-workspace"
      workspaceLabel="Connector Workspace"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ConnectorWorkspaceShellPanel />
    </CodexForgeAppShell>
  );
}
