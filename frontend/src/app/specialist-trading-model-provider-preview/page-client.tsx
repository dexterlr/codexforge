"use client";

import { SpecialistTradingModelProviderPreviewPanel } from "@/lib/codexforge/specialist-trading-model-provider-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SpecialistTradingModelProviderPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/specialist-trading-model-provider-preview"
      workspaceLabel="Specialist Trading Model Provider Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SpecialistTradingModelProviderPreviewPanel />
    </CodexForgeAppShell>
  );
}
