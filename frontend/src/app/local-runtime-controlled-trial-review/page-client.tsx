"use client";

import { LocalRuntimeControlledTrialReviewPanel } from "@/lib/codexforge/local-runtime-controlled-trial-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalRuntimeControlledTrialReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-runtime-controlled-trial-review"
      workspaceLabel="Local Runtime Controlled Trial Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalRuntimeControlledTrialReviewPanel />
    </CodexForgeAppShell>
  );
}
