"use client";

import { EvidenceMemoryRoutePanel } from "@/lib/codexforge/evidence-memory/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DiffMemorySnapshotPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/diff-memory-snapshot-preview"
      workspaceLabel="Diff Memory Snapshot Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <EvidenceMemoryRoutePanel routeSlug="diff-memory-snapshot-preview" />
    </CodexForgeAppShell>
  );
}
