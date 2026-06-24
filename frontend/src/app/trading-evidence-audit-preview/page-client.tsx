"use client";

import { TradingResearchDomainRoutePanel } from "@/lib/codexforge/trading-research-domain-pack/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TradingEvidenceAuditPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/trading-evidence-audit-preview"
      workspaceLabel="Trading Evidence Audit Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TradingResearchDomainRoutePanel routeSlug="trading-evidence-audit-preview" />
    </CodexForgeAppShell>
  );
}
