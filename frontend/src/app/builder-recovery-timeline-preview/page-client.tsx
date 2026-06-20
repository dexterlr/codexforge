"use client";

import { BuilderRecoveryTimelinePreviewPanel } from "@/lib/codexforge/builder-recovery-timeline-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuilderRecoveryTimelinePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/builder-recovery-timeline-preview"
      workspaceLabel="Builder Recovery Timeline Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BuilderRecoveryTimelinePreviewPanel />
    </CodexForgeAppShell>
  );
}
