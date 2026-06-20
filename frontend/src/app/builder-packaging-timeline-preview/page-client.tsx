"use client";

import { BuilderPackagingTimelinePreviewPanel } from "@/lib/codexforge/builder-packaging-timeline-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuilderPackagingTimelinePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/builder-packaging-timeline-preview"
      workspaceLabel="Builder Packaging Timeline Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BuilderPackagingTimelinePreviewPanel />
    </CodexForgeAppShell>
  );
}
