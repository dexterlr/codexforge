"use client";

import { UnifiedLiveIntegrationReadinessReviewPanel } from "@/lib/codexforge/unified-live-integration-readiness-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function UnifiedLiveIntegrationReadinessReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/unified-live-integration-readiness-review"
      workspaceLabel="Live Readiness"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <UnifiedLiveIntegrationReadinessReviewPanel />
    </CodexForgeAppShell>
  );
}
