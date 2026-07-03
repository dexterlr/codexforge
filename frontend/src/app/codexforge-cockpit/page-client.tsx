"use client";

import { MainPagesGodTierUxStatusRail } from "@/lib/codexforge/main-pages-god-tier-ux";
import { UnifiedCodexForgeCockpitPanel } from "@/lib/codexforge/unified-cockpit/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CodexForgeCockpitPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/codexforge-cockpit"
      workspaceLabel="CodexForge Cockpit"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <MainPagesGodTierUxStatusRail title="CodexForge cockpit command-center boundary" tone="cockpit" />
      <UnifiedCodexForgeCockpitPanel />
    </CodexForgeAppShell>
  );
}
