"use client";

import { FirstUnifiedCockpitCandidatePanel } from "@/lib/codexforge/first-unified-cockpit-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstUnifiedCockpitCandidatePageClient() {
  return (
    <CodexForgeAppShell activePath="/first-unified-cockpit-candidate" workspaceLabel="First Unified Cockpit Candidate" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <FirstUnifiedCockpitCandidatePanel />
    </CodexForgeAppShell>
  );
}
