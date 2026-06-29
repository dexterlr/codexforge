"use client";

import { StrategyLabSignalEngineRoutePanel } from "@/lib/codexforge/strategy-lab-signal-engine/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function EntryRuleDraftPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/entry-rule-draft-preview"
      workspaceLabel="Entry Rule Draft Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <StrategyLabSignalEngineRoutePanel routeSlug="entry-rule-draft-preview" />
    </CodexForgeAppShell>
  );
}
