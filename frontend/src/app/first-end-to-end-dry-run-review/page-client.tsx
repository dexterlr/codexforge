"use client";

import { FirstEndToEndDryRunReviewPanel } from "@/lib/codexforge/first-end-to-end-dry-run-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstEndToEndDryRunReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-end-to-end-dry-run-review"
      workspaceLabel="E2E Dry Run"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstEndToEndDryRunReviewPanel />
    </CodexForgeAppShell>
  );
}
