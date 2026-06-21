"use client";

import { SimulatedCommandEnvironmentReviewPanel } from "@/lib/codexforge/simulated-command-environment-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedCommandEnvironmentReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-command-environment-review"
      workspaceLabel="Simulated Command Environment Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedCommandEnvironmentReviewPanel />
    </CodexForgeAppShell>
  );
}
