"use client";

import { BetaTwoHardeningPassPanel } from "@/lib/codexforge/beta-2-hardening-pass/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BetaTwoHardeningPassPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/beta-2-hardening-pass"
      workspaceLabel="Beta 2 Hardening Pass"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BetaTwoHardeningPassPanel />
    </CodexForgeAppShell>
  );
}
