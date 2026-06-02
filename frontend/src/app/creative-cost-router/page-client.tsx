"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { CreativeCostSaverRouterPanel } from "@/lib/codexforge/creative-cost-saver-router/components";

export default function CreativeCostRouterPageClient() {
  return (
    <CodexForgeAppShell activePath="/creative-cost-router" workspaceLabel="Creative Cost" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <CreativeCostSaverRouterPanel />
    </CodexForgeAppShell>
  );
}
