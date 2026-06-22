"use client";

import { EvidenceMemoryRoutePanel } from "@/lib/codexforge/evidence-memory/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstEvidenceMemoryCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-evidence-memory-candidate"
      workspaceLabel="First Evidence Memory Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <EvidenceMemoryRoutePanel routeSlug="first-evidence-memory-candidate" />
    </CodexForgeAppShell>
  );
}
