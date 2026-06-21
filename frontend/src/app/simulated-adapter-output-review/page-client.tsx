"use client";

import { SimulatedAdapterOutputReviewPanel } from "@/lib/codexforge/simulated-adapter-output-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedAdapterOutputReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-adapter-output-review"
      workspaceLabel="Simulated Adapter Output Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedAdapterOutputReviewPanel />
    </CodexForgeAppShell>
  );
}
