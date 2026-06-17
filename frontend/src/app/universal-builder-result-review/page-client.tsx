"use client";

import { UniversalBuilderResultReviewPanel } from "@/lib/codexforge/universal-builder-result-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function UniversalBuilderResultReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/universal-builder-result-review"
      workspaceLabel="Universal Builder Result Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <UniversalBuilderResultReviewPanel />
    </CodexForgeAppShell>
  );
}
