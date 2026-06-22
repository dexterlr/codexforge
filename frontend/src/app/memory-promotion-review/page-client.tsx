"use client";

import { EvidenceMemoryRoutePanel } from "@/lib/codexforge/evidence-memory/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function MemoryPromotionReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/memory-promotion-review"
      workspaceLabel="Memory Promotion Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <EvidenceMemoryRoutePanel routeSlug="memory-promotion-review" />
    </CodexForgeAppShell>
  );
}
