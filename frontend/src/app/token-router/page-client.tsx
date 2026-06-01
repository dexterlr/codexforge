"use client";

import { TokenEfficiencyRouterPanel } from "@/lib/codexforge/token-efficiency-router/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TokenRouterPageClient() {
  return (
    <CodexForgeAppShell activePath="/token-router" workspaceLabel="Token Router" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <TokenEfficiencyRouterPanel />
    </CodexForgeAppShell>
  );
}
