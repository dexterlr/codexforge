"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { JarvisdLocalDaemonMvpScaffoldPanel } from "@/lib/codexforge/jarvisd-local-daemon-mvp-scaffold/components";

export default function JarvisdDaemonMvpPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/jarvisd-daemon-mvp"
      workspaceLabel="Jarvisd Daemon MVP"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <JarvisdLocalDaemonMvpScaffoldPanel />
    </CodexForgeAppShell>
  );
}
