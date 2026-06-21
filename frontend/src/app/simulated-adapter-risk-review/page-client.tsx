"use client";

import { SimulatedAdapterRiskReviewPanel } from "@/lib/codexforge/simulated-adapter-risk-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedAdapterRiskReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-adapter-risk-review"
      workspaceLabel="Simulated Adapter Risk Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedAdapterRiskReviewPanel />
    </CodexForgeAppShell>
  );
}
