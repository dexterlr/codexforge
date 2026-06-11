"use client";

import { BetaHardeningFinalPassPanel } from "@/lib/codexforge/beta-hardening-final-pass/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BetaHardeningFinalPassPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/beta-hardening-final-pass"
      workspaceLabel="Beta Hardening"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BetaHardeningFinalPassPanel />
    </CodexForgeAppShell>
  );
}
