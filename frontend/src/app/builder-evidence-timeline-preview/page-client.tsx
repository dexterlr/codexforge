"use client";

import { BuilderEvidenceTimelinePreviewPanel } from "@/lib/codexforge/builder-evidence-timeline-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuilderEvidenceTimelinePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/builder-evidence-timeline-preview"
      workspaceLabel="Builder Evidence Timeline Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BuilderEvidenceTimelinePreviewPanel />
    </CodexForgeAppShell>
  );
}
