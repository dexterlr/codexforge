"use client";

import { BuilderApprovalTimelinePreviewPanel } from "@/lib/codexforge/builder-approval-timeline-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuilderApprovalTimelinePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/builder-approval-timeline-preview"
      workspaceLabel="Builder Approval Timeline Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BuilderApprovalTimelinePreviewPanel />
    </CodexForgeAppShell>
  );
}
