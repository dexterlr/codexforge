"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { JarvisdLocalDaemonContractPanel } from "@/lib/codexforge/jarvisd-local-daemon-contract/components";

export default function JarvisdContractPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/jarvisd-contract"
      workspaceLabel="Jarvisd Contract"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <JarvisdLocalDaemonContractPanel />
    </CodexForgeAppShell>
  );
}
