"use client";

import { CockpitEvidenceResultRecoveryRoutePanel } from "@/lib/codexforge/cockpit-evidence-result-recovery/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstCockpitEvidenceResultRecoveryCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-cockpit-evidence-result-recovery-candidate"
      workspaceLabel="First Cockpit Evidence Result Recovery Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CockpitEvidenceResultRecoveryRoutePanel routeSlug="first-cockpit-evidence-result-recovery-candidate" />
    </CodexForgeAppShell>
  );
}

