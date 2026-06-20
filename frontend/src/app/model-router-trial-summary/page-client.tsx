"use client";

import { ModelRouterTrialSummaryPanel } from "@/lib/codexforge/model-router-trial-summary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelRouterTrialSummaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-router-trial-summary"
      workspaceLabel="Model Router Trial Summary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelRouterTrialSummaryPanel />
    </CodexForgeAppShell>
  );
}
