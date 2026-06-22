"use client";

import { CockpitEvidenceResultRecoveryRoutePanel } from "@/lib/codexforge/cockpit-evidence-result-recovery/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitRecoverySafetyGatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/cockpit-recovery-safety-gate"
      workspaceLabel="Cockpit Recovery Safety Gate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CockpitEvidenceResultRecoveryRoutePanel routeSlug="cockpit-recovery-safety-gate" />
    </CodexForgeAppShell>
  );
}

