"use client";

import { SimulatedFileSafetyReviewPanel } from "@/lib/codexforge/simulated-file-safety-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedFileSafetyReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-file-safety-review"
      workspaceLabel="Simulated File Safety Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedFileSafetyReviewPanel />
    </CodexForgeAppShell>
  );
}
