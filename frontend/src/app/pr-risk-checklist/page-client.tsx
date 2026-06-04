"use client";

import { PrRiskChecklistPanel } from "@/lib/codexforge/pr-risk-checklist/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PrRiskChecklistPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/pr-risk-checklist"
      workspaceLabel="PR Risk"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <PrRiskChecklistPanel />
    </CodexForgeAppShell>
  );
}
