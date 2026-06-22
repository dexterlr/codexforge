"use client";

import { EvidenceMemoryRoutePanel } from "@/lib/codexforge/evidence-memory/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PlanMemorySnapshotPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/plan-memory-snapshot-preview"
      workspaceLabel="Plan Memory Snapshot Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <EvidenceMemoryRoutePanel routeSlug="plan-memory-snapshot-preview" />
    </CodexForgeAppShell>
  );
}
