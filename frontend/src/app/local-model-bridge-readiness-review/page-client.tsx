"use client";

import { LocalModelBridgeReadinessReviewPanel } from "@/lib/codexforge/local-model-bridge-readiness-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalModelBridgeReadinessReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-model-bridge-readiness-review"
      workspaceLabel="Local Model Bridge Readiness Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalModelBridgeReadinessReviewPanel />
    </CodexForgeAppShell>
  );
}
