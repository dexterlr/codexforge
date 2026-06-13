"use client";

import { FirstAutomationLiveDryRunReplayPanel } from "@/lib/codexforge/first-automation-live-dry-run-replay/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstAutomationLiveDryRunReplayPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-automation-live-dry-run-replay"
      workspaceLabel="Automation Live Replay"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstAutomationLiveDryRunReplayPanel />
    </CodexForgeAppShell>
  );
}
