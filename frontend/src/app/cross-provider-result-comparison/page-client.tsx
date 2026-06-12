"use client";

import { CrossProviderResultComparisonPanel } from "@/lib/codexforge/cross-provider-result-comparison/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CrossProviderResultComparisonPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/cross-provider-result-comparison"
      workspaceLabel="Provider Comparison"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CrossProviderResultComparisonPanel />
    </CodexForgeAppShell>
  );
}
