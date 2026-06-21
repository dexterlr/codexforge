"use client";

import { SimulatedCommandOperatorReviewPanel } from "@/lib/codexforge/simulated-command-operator-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedCommandOperatorReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-command-operator-review"
      workspaceLabel="Simulated Command Operator Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedCommandOperatorReviewPanel />
    </CodexForgeAppShell>
  );
}
