"use client";

import { SafetyBoundaryExplainabilityPolishPanel } from "@/lib/codexforge/safety-boundary-explainability-polish/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SafetyBoundaryExplainabilityPolishPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/safety-boundary-explainability-polish"
      workspaceLabel="Safety Explanations"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SafetyBoundaryExplainabilityPolishPanel />
    </CodexForgeAppShell>
  );
}
