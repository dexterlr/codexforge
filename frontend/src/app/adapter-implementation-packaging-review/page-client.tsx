"use client";

import { AdapterImplementationPackagingReviewPanel } from "@/lib/codexforge/adapter-implementation-packaging-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AdapterImplementationPackagingReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/adapter-implementation-packaging-review"
      workspaceLabel="Adapter Implementation Packaging Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <AdapterImplementationPackagingReviewPanel />
    </CodexForgeAppShell>
  );
}
