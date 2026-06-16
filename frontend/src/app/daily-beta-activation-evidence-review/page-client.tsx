"use client";

import { DailyBetaActivationEvidenceReviewPanel } from "@/lib/codexforge/daily-beta-activation-evidence-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaActivationEvidenceReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-activation-evidence-review"
      workspaceLabel="Activation Evidence"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaActivationEvidenceReviewPanel />
    </CodexForgeAppShell>
  );
}
