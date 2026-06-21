"use client";

import { SimulatedCommandRiskReviewPanel } from "@/lib/codexforge/simulated-command-risk-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedCommandRiskReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-command-risk-review"
      workspaceLabel="Simulated Command Risk Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedCommandRiskReviewPanel />
    </CodexForgeAppShell>
  );
}
