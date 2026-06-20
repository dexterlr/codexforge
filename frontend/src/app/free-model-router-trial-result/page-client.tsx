"use client";

import { FreeModelRouterTrialResultPanel } from "@/lib/codexforge/free-model-router-trial-result/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FreeModelRouterTrialResultPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/free-model-router-trial-result"
      workspaceLabel="Free Model Router Trial Result"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FreeModelRouterTrialResultPanel />
    </CodexForgeAppShell>
  );
}
