"use client";

import { FullSmokeSuiteStabilityPassPanel } from "@/lib/codexforge/full-smoke-suite-stability-pass/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FullSmokeSuiteStabilityPassPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/full-smoke-suite-stability-pass"
      workspaceLabel="Smoke Stability"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FullSmokeSuiteStabilityPassPanel />
    </CodexForgeAppShell>
  );
}
