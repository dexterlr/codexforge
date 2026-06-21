"use client";

import { SimulatedRuntimePortReviewPanel } from "@/lib/codexforge/simulated-runtime-port-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedRuntimePortReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-runtime-port-review"
      workspaceLabel="Simulated Runtime Port Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedRuntimePortReviewPanel />
    </CodexForgeAppShell>
  );
}
