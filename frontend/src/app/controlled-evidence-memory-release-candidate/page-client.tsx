"use client";

import { EvidenceMemoryRoutePanel } from "@/lib/codexforge/evidence-memory/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledEvidenceMemoryReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-evidence-memory-release-candidate"
      workspaceLabel="Controlled Evidence Memory Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <EvidenceMemoryRoutePanel routeSlug="controlled-evidence-memory-release-candidate" />
    </CodexForgeAppShell>
  );
}
