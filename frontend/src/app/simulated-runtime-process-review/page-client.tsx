"use client";

import { SimulatedRuntimeProcessReviewPanel } from "@/lib/codexforge/simulated-runtime-process-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedRuntimeProcessReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-runtime-process-review"
      workspaceLabel="Simulated Runtime Process Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedRuntimeProcessReviewPanel />
    </CodexForgeAppShell>
  );
}
