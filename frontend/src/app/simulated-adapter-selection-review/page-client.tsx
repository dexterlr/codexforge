"use client";

import { SimulatedAdapterSelectionReviewPanel } from "@/lib/codexforge/simulated-adapter-selection-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedAdapterSelectionReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-adapter-selection-review"
      workspaceLabel="Simulated Adapter Selection Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedAdapterSelectionReviewPanel />
    </CodexForgeAppShell>
  );
}
