"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { ProviderAdaptersPanel } from "@/lib/codexforge/provider-adapters/components";

export default function ProviderAdaptersPageClient() {
  return (
    <CodexForgeAppShell activePath="/provider-adapters" workspaceLabel="Provider Adapters" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ProviderAdaptersPanel />
    </CodexForgeAppShell>
  );
}
