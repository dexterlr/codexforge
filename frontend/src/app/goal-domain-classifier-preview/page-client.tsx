"use client";

import { GoalCompilerRoutePanel } from "@/lib/codexforge/goal-compiler/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GoalDomainClassifierPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/goal-domain-classifier-preview"
      workspaceLabel="Goal Domain Classifier Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GoalCompilerRoutePanel routeSlug="goal-domain-classifier-preview" />
    </CodexForgeAppShell>
  );
}
