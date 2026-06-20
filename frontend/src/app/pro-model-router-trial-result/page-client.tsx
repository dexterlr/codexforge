"use client";

import { ProModelRouterTrialResultPanel } from "@/lib/codexforge/pro-model-router-trial-result/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProModelRouterTrialResultPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/pro-model-router-trial-result"
      workspaceLabel="Pro Model Router Trial Result"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProModelRouterTrialResultPanel />
    </CodexForgeAppShell>
  );
}
