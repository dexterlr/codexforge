"use client";

import { FirstLocalRuntimeTrialReviewPanel } from "@/lib/codexforge/first-local-runtime-trial-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstLocalRuntimeTrialReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-local-runtime-trial-review"
      workspaceLabel="First Local Runtime Trial Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstLocalRuntimeTrialReviewPanel />
    </CodexForgeAppShell>
  );
}
