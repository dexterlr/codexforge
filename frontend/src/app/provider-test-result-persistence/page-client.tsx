"use client";

import { ProviderTestResultPersistencePanel } from "@/lib/codexforge/provider-test-result-persistence/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProviderTestResultPersistencePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/provider-test-result-persistence"
      workspaceLabel="Result Persistence"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderTestResultPersistencePanel />
    </CodexForgeAppShell>
  );
}
