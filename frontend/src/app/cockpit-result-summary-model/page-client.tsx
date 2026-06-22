"use client";

import { CockpitEvidenceResultRecoveryRoutePanel } from "@/lib/codexforge/cockpit-evidence-result-recovery/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitResultSummaryModelPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/cockpit-result-summary-model"
      workspaceLabel="Cockpit Result Summary Model"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CockpitEvidenceResultRecoveryRoutePanel routeSlug="cockpit-result-summary-model" />
    </CodexForgeAppShell>
  );
}

