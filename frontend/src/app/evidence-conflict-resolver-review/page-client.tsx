"use client";

import { EvidenceConflictResolverReviewPanel } from "@/lib/codexforge/evidence-conflict-resolver-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function EvidenceConflictResolverReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/evidence-conflict-resolver-review"
      workspaceLabel="Evidence Conflict Resolver Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <EvidenceConflictResolverReviewPanel />
    </CodexForgeAppShell>
  );
}
