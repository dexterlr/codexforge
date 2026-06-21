"use client";

import { SimulatedRuntimeRiskReviewPanel } from "@/lib/codexforge/simulated-runtime-risk-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedRuntimeRiskReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-runtime-risk-review"
      workspaceLabel="Simulated Runtime Risk Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedRuntimeRiskReviewPanel />
    </CodexForgeAppShell>
  );
}
