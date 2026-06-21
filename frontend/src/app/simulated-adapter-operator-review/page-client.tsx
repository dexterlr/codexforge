"use client";

import { SimulatedAdapterOperatorReviewPanel } from "@/lib/codexforge/simulated-adapter-operator-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedAdapterOperatorReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-adapter-operator-review"
      workspaceLabel="Simulated Adapter Operator Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedAdapterOperatorReviewPanel />
    </CodexForgeAppShell>
  );
}
