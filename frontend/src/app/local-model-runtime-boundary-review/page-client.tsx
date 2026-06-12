"use client";

import { LocalModelRuntimeBoundaryReviewPanel } from "@/lib/codexforge/local-model-runtime-boundary-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalModelRuntimeBoundaryReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-model-runtime-boundary-review"
      workspaceLabel="Runtime Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalModelRuntimeBoundaryReviewPanel />
    </CodexForgeAppShell>
  );
}
