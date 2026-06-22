"use client";

import { CockpitEvidenceResultRecoveryRoutePanel } from "@/lib/codexforge/cockpit-evidence-result-recovery/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledCockpitEvidenceResultRecoveryReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-cockpit-evidence-result-recovery-release-candidate"
      workspaceLabel="Controlled Cockpit Evidence Result Recovery Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CockpitEvidenceResultRecoveryRoutePanel routeSlug="controlled-cockpit-evidence-result-recovery-release-candidate" />
    </CodexForgeAppShell>
  );
}

