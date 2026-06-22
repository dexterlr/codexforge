"use client";

import { CockpitEvidenceResultRecoveryRoutePanel } from "@/lib/codexforge/cockpit-evidence-result-recovery/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitCommandEvidenceViewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/cockpit-command-evidence-view"
      workspaceLabel="Cockpit Command Evidence View"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CockpitEvidenceResultRecoveryRoutePanel routeSlug="cockpit-command-evidence-view" />
    </CodexForgeAppShell>
  );
}

