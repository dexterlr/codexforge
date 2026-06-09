"use client";

import { UnifiedWorkspaceHomeReviewPanel } from "@/lib/codexforge/unified-workspace-home-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function UnifiedWorkspaceHomeReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/unified-workspace-home-review"
      workspaceLabel="Unified Home"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <UnifiedWorkspaceHomeReviewPanel />
    </CodexForgeAppShell>
  );
}
