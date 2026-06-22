"use client";

import { CockpitEvidenceResultRecoveryRoutePanel } from "@/lib/codexforge/cockpit-evidence-result-recovery/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitRollbackPreviewViewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/cockpit-rollback-preview-view"
      workspaceLabel="Cockpit Rollback Preview View"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CockpitEvidenceResultRecoveryRoutePanel routeSlug="cockpit-rollback-preview-view" />
    </CodexForgeAppShell>
  );
}

