"use client";

import { DailyBetaActivationResultReviewPanel } from "@/lib/codexforge/daily-beta-activation-result-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaActivationResultReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-activation-result-review"
      workspaceLabel="Activation Result"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaActivationResultReviewPanel />
    </CodexForgeAppShell>
  );
}
