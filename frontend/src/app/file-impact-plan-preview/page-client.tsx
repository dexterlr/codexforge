"use client";

import { PlanDiffCommandComposerRoutePanel } from "@/lib/codexforge/plan-diff-command-composer/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FileImpactPlanPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/file-impact-plan-preview"
      workspaceLabel="File Impact Plan Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <PlanDiffCommandComposerRoutePanel routeSlug="file-impact-plan-preview" />
    </CodexForgeAppShell>
  );
}
