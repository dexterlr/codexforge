"use client";

import { DailyTestableCockpitMvpRoutePanel } from "@/lib/codexforge/daily-testable-cockpit-mvp/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitEvidenceResultRecoveryPolishPageClient() {
  return (
    <CodexForgeAppShell activePath="/cockpit-evidence-result-recovery-polish" workspaceLabel="Cockpit Evidence Result Recovery Polish" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <DailyTestableCockpitMvpRoutePanel routeSlug="cockpit-evidence-result-recovery-polish" />
    </CodexForgeAppShell>
  );
}
