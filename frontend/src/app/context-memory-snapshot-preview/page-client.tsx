"use client";

import { EvidenceMemoryRoutePanel } from "@/lib/codexforge/evidence-memory/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ContextMemorySnapshotPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/context-memory-snapshot-preview"
      workspaceLabel="Context Memory Snapshot Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <EvidenceMemoryRoutePanel routeSlug="context-memory-snapshot-preview" />
    </CodexForgeAppShell>
  );
}
