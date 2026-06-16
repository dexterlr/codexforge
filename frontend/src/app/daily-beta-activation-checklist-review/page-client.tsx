"use client";

import { DailyBetaActivationChecklistReviewPanel } from "@/lib/codexforge/daily-beta-activation-checklist-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaActivationChecklistReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-activation-checklist-review"
      workspaceLabel="Activation Checklist"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaActivationChecklistReviewPanel />
    </CodexForgeAppShell>
  );
}
