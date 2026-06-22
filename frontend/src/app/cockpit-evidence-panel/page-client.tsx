"use client";

import { CockpitEvidencePanel } from "@/lib/codexforge/cockpit-evidence-panel/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitEvidencePanelPageClient() {
  return (
    <CodexForgeAppShell activePath="/cockpit-evidence-panel" workspaceLabel="Cockpit Evidence Panel" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <CockpitEvidencePanel />
    </CodexForgeAppShell>
  );
}
