"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { JarvisdPermissionBoundaryPanel } from "@/lib/codexforge/jarvisd-permission-boundary/components";

export default function JarvisdPermissionsPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/jarvisd-permissions"
      workspaceLabel="Jarvisd Permissions"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <JarvisdPermissionBoundaryPanel />
    </CodexForgeAppShell>
  );
}
