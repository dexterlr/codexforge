"use client";

import { SimulatedAdapterInputReviewPanel } from "@/lib/codexforge/simulated-adapter-input-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedAdapterInputReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-adapter-input-review"
      workspaceLabel="Simulated Adapter Input Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedAdapterInputReviewPanel />
    </CodexForgeAppShell>
  );
}
