"use client";

import { BuilderResultTimelinePreviewPanel } from "@/lib/codexforge/builder-result-timeline-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuilderResultTimelinePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/builder-result-timeline-preview"
      workspaceLabel="Builder Result Timeline Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BuilderResultTimelinePreviewPanel />
    </CodexForgeAppShell>
  );
}
