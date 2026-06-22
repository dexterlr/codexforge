"use client";

import { CockpitEvidenceResultRecoveryRoutePanel } from "@/lib/codexforge/cockpit-evidence-result-recovery/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitEvidenceStreamModelPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/cockpit-evidence-stream-model"
      workspaceLabel="Cockpit Evidence Stream Model"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CockpitEvidenceResultRecoveryRoutePanel routeSlug="cockpit-evidence-stream-model" />
    </CodexForgeAppShell>
  );
}

