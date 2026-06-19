"use client";

import { SpecialistTradingModelUseDryRunPanel } from "@/lib/codexforge/specialist-trading-model-use-dry-run/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SpecialistTradingModelUseDryRunPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/specialist-trading-model-use-dry-run"
      workspaceLabel="Specialist Trading Model Use Dry-Run"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SpecialistTradingModelUseDryRunPanel />
    </CodexForgeAppShell>
  );
}

