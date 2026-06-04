"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { JarvisdRecoveryConsolePanel } from "@/lib/codexforge/jarvisd-recovery-console/components";

export default function JarvisdRecoveryConsolePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/jarvisd-recovery-console"
      workspaceLabel="Jarvisd Recovery"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <JarvisdRecoveryConsolePanel />
    </CodexForgeAppShell>
  );
}
