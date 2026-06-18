"use client";

import { FirstLocalRuntimeAdapterImplementationReviewPanel } from "@/lib/codexforge/first-local-runtime-adapter-implementation-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstLocalRuntimeAdapterImplementationReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-local-runtime-adapter-implementation-review"
      workspaceLabel="First Local Runtime Adapter Implementation Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstLocalRuntimeAdapterImplementationReviewPanel />
    </CodexForgeAppShell>
  );
}
