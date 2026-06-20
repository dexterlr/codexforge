"use client";

import { BuilderPlanOutlinePreviewPanel } from "@/lib/codexforge/builder-plan-outline-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuilderPlanOutlinePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/builder-plan-outline-preview"
      workspaceLabel="Builder Plan Outline Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BuilderPlanOutlinePreviewPanel />
    </CodexForgeAppShell>
  );
}
