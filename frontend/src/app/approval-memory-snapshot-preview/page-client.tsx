"use client";

import { EvidenceMemoryRoutePanel } from "@/lib/codexforge/evidence-memory/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ApprovalMemorySnapshotPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/approval-memory-snapshot-preview"
      workspaceLabel="Approval Memory Snapshot Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <EvidenceMemoryRoutePanel routeSlug="approval-memory-snapshot-preview" />
    </CodexForgeAppShell>
  );
}
