"use client";

import { SpecialistWorkerRegistryRoutePanel } from "@/lib/codexforge/specialist-worker-registry/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TradingAnalysisWorkerProfilePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/trading-analysis-worker-profile-preview"
      workspaceLabel="Trading Analysis Worker Profile Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SpecialistWorkerRegistryRoutePanel routeSlug="trading-analysis-worker-profile-preview" />
    </CodexForgeAppShell>
  );
}
