"use client";

import { CockpitEvidenceResultRecoveryRoutePanel } from "@/lib/codexforge/cockpit-evidence-result-recovery/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitEvidenceResultRecoveryBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/cockpit-evidence-result-recovery-boundary"
      workspaceLabel="Cockpit Evidence Result Recovery Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CockpitEvidenceResultRecoveryRoutePanel routeSlug="cockpit-evidence-result-recovery-boundary" />
    </CodexForgeAppShell>
  );
}

