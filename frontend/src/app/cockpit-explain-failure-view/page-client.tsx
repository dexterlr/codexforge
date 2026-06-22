"use client";

import { CockpitEvidenceResultRecoveryRoutePanel } from "@/lib/codexforge/cockpit-evidence-result-recovery/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitExplainFailureViewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/cockpit-explain-failure-view"
      workspaceLabel="Cockpit Explain Failure View"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CockpitEvidenceResultRecoveryRoutePanel routeSlug="cockpit-explain-failure-view" />
    </CodexForgeAppShell>
  );
}

