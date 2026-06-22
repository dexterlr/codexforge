"use client";

import { UnifiedCodexForgeCockpitPanel } from "@/lib/codexforge/unified-cockpit/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CodexForgeCockpitPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/codexforge-cockpit"
      workspaceLabel="CodexForge Cockpit"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <UnifiedCodexForgeCockpitPanel />
    </CodexForgeAppShell>
  );
}
