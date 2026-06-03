"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { ProviderRunbookGeneratorPanel } from "@/lib/codexforge/provider-runbook-generator/components";

export default function ProviderRunbookGeneratorPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/provider-runbook-generator"
      workspaceLabel="Runbook Generator"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderRunbookGeneratorPanel />
    </CodexForgeAppShell>
  );
}
