"use client";

import { ResearchRunbookFinalizationPanel } from "@/lib/codexforge/research-runbook-finalization/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ResearchRunbookFinalizationPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/research-runbook-finalization"
      workspaceLabel="Research Runbook Finalization"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ResearchRunbookFinalizationPanel />
    </CodexForgeAppShell>
  );
}
