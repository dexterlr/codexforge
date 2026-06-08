"use client";

import { ProviderRunbookFinalizationPanel } from "@/lib/codexforge/provider-runbook-finalization/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProviderRunbookFinalizationPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/provider-runbook-finalization"
      workspaceLabel="Runbook Finalization"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderRunbookFinalizationPanel />
    </CodexForgeAppShell>
  );
}
