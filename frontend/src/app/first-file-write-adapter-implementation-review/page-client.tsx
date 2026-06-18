"use client";

import { FirstFileWriteAdapterImplementationReviewPanel } from "@/lib/codexforge/first-file-write-adapter-implementation-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstFileWriteAdapterImplementationReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-file-write-adapter-implementation-review"
      workspaceLabel="First File Write Adapter Implementation Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstFileWriteAdapterImplementationReviewPanel />
    </CodexForgeAppShell>
  );
}
