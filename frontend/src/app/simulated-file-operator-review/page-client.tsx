"use client";

import { SimulatedFileOperatorReviewPanel } from "@/lib/codexforge/simulated-file-operator-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedFileOperatorReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-file-operator-review"
      workspaceLabel="Simulated File Operator Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedFileOperatorReviewPanel />
    </CodexForgeAppShell>
  );
}
