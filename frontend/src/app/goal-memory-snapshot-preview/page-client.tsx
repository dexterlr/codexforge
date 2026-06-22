"use client";

import { EvidenceMemoryRoutePanel } from "@/lib/codexforge/evidence-memory/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GoalMemorySnapshotPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/goal-memory-snapshot-preview"
      workspaceLabel="Goal Memory Snapshot Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <EvidenceMemoryRoutePanel routeSlug="goal-memory-snapshot-preview" />
    </CodexForgeAppShell>
  );
}
