"use client";

import { CockpitEvidenceResultRecoveryRoutePanel } from "@/lib/codexforge/cockpit-evidence-result-recovery/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitRetryPreviewViewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/cockpit-retry-preview-view"
      workspaceLabel="Cockpit Retry Preview View"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CockpitEvidenceResultRecoveryRoutePanel routeSlug="cockpit-retry-preview-view" />
    </CodexForgeAppShell>
  );
}

