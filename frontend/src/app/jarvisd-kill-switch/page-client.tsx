"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { JarvisdKillSwitchSafeShutdownPanel } from "@/lib/codexforge/jarvisd-kill-switch-safe-shutdown/components";

export default function JarvisdKillSwitchPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/jarvisd-kill-switch"
      workspaceLabel="Jarvisd Kill Switch"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <JarvisdKillSwitchSafeShutdownPanel />
    </CodexForgeAppShell>
  );
}
