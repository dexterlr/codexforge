"use client";

import { SimulatedCommandWorkingDirectoryReviewPanel } from "@/lib/codexforge/simulated-command-working-directory-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedCommandWorkingDirectoryReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-command-working-directory-review"
      workspaceLabel="Simulated Command Working Directory Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedCommandWorkingDirectoryReviewPanel />
    </CodexForgeAppShell>
  );
}
