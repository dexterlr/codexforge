"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { JarvisdHealthVersionProbePanel } from "@/lib/codexforge/jarvisd-health-version-probe/components";

export default function JarvisdHealthPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/jarvisd-health"
      workspaceLabel="Jarvisd Health"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <JarvisdHealthVersionProbePanel />
    </CodexForgeAppShell>
  );
}
