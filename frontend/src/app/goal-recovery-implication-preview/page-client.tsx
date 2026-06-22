"use client";

import { GoalCompilerRoutePanel } from "@/lib/codexforge/goal-compiler/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GoalRecoveryImplicationPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/goal-recovery-implication-preview"
      workspaceLabel="Goal Recovery Implication Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GoalCompilerRoutePanel routeSlug="goal-recovery-implication-preview" />
    </CodexForgeAppShell>
  );
}
