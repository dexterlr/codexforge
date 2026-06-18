"use client";

import { AdapterImplementationHarnessReviewPanel } from "@/lib/codexforge/adapter-implementation-harness-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AdapterImplementationHarnessReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/adapter-implementation-harness-review"
      workspaceLabel="Adapter Implementation Harness Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <AdapterImplementationHarnessReviewPanel />
    </CodexForgeAppShell>
  );
}
