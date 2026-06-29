"use client";

import { StrategyLabSignalEngineRoutePanel } from "@/lib/codexforge/strategy-lab-signal-engine/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function StrategyIdeaIntakePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/strategy-idea-intake-preview"
      workspaceLabel="Strategy Idea Intake Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <StrategyLabSignalEngineRoutePanel routeSlug="strategy-idea-intake-preview" />
    </CodexForgeAppShell>
  );
}
