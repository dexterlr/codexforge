"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { ProviderLatencyCostComparisonPanel } from "@/lib/codexforge/provider-latency-cost-comparison/components";

export default function ProviderCostLatencyComparisonPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/provider-cost-latency-comparison"
      workspaceLabel="Cost and Latency"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderLatencyCostComparisonPanel />
    </CodexForgeAppShell>
  );
}
