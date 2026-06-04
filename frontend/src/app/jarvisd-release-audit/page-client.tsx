"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { JarvisdReleaseAuditPanel } from "@/lib/codexforge/jarvisd-release-audit/components";

export default function JarvisdReleaseAuditPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/jarvisd-release-audit"
      workspaceLabel="Jarvisd Release"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <JarvisdReleaseAuditPanel />
    </CodexForgeAppShell>
  );
}
