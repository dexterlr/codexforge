"use client";

import { PaidModelRouterTrialResultPanel } from "@/lib/codexforge/paid-model-router-trial-result/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PaidModelRouterTrialResultPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/paid-model-router-trial-result"
      workspaceLabel="Paid Model Router Trial Result"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <PaidModelRouterTrialResultPanel />
    </CodexForgeAppShell>
  );
}
