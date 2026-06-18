"use client";

import { FirstPackagingAdapterImplementationReviewPanel } from "@/lib/codexforge/first-packaging-adapter-implementation-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstPackagingAdapterImplementationReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-packaging-adapter-implementation-review"
      workspaceLabel="First Packaging Adapter Implementation Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstPackagingAdapterImplementationReviewPanel />
    </CodexForgeAppShell>
  );
}
