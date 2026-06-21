"use client";

import { SimulatedAdapterCapabilityReviewPanel } from "@/lib/codexforge/simulated-adapter-capability-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedAdapterCapabilityReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-adapter-capability-review"
      workspaceLabel="Simulated Adapter Capability Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedAdapterCapabilityReviewPanel />
    </CodexForgeAppShell>
  );
}
