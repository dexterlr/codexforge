"use client";

import { SimulatedCommandArgumentReviewPanel } from "@/lib/codexforge/simulated-command-argument-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedCommandArgumentReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-command-argument-review"
      workspaceLabel="Simulated Command Argument Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedCommandArgumentReviewPanel />
    </CodexForgeAppShell>
  );
}
