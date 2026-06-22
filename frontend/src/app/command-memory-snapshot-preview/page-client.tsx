"use client";

import { EvidenceMemoryRoutePanel } from "@/lib/codexforge/evidence-memory/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CommandMemorySnapshotPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/command-memory-snapshot-preview"
      workspaceLabel="Command Memory Snapshot Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <EvidenceMemoryRoutePanel routeSlug="command-memory-snapshot-preview" />
    </CodexForgeAppShell>
  );
}
