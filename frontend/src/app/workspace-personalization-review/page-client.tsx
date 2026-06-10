"use client";

import { WorkspacePersonalizationReviewPanel } from "@/lib/codexforge/workspace-personalization-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function WorkspacePersonalizationReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/workspace-personalization-review"
      workspaceLabel="Personalization"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <WorkspacePersonalizationReviewPanel />
    </CodexForgeAppShell>
  );
}
