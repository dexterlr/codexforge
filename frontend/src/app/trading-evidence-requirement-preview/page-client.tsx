"use client";

import { TradingMandateRiskGovernorRoutePanel } from "@/lib/codexforge/trading-mandate-risk-governor/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TradingEvidenceRequirementPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/trading-evidence-requirement-preview"
      workspaceLabel="Trading Evidence Requirement Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TradingMandateRiskGovernorRoutePanel routeSlug="trading-evidence-requirement-preview" />
    </CodexForgeAppShell>
  );
}
