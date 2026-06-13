"use client";

import { BetaTwoControlledOperatorTrialPanel } from "@/lib/codexforge/beta-2-controlled-operator-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BetaTwoControlledOperatorTrialPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/beta-2-controlled-operator-trial"
      workspaceLabel="Beta 2 Controlled Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BetaTwoControlledOperatorTrialPanel />
    </CodexForgeAppShell>
  );
}
