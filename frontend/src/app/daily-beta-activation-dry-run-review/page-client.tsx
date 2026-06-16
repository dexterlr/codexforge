"use client";

import { DailyBetaActivationDryRunReviewPanel } from "@/lib/codexforge/daily-beta-activation-dry-run-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaActivationDryRunReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-activation-dry-run-review"
      workspaceLabel="Activation Dry-Run"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaActivationDryRunReviewPanel />
    </CodexForgeAppShell>
  );
}
