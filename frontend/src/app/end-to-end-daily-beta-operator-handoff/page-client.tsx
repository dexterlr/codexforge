"use client";

import { EndToEndDailyBetaOperatorHandoffPanel } from "@/lib/codexforge/end-to-end-daily-beta-operator-handoff/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function EndToEndDailyBetaOperatorHandoffPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/end-to-end-daily-beta-operator-handoff"
      workspaceLabel="E2E Handoff"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <EndToEndDailyBetaOperatorHandoffPanel />
    </CodexForgeAppShell>
  );
}
