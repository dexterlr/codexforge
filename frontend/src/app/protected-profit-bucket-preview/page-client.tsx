"use client";

import { TradingMandateRiskGovernorRoutePanel } from "@/lib/codexforge/trading-mandate-risk-governor/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProtectedProfitBucketPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/protected-profit-bucket-preview"
      workspaceLabel="Protected Profit Bucket Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TradingMandateRiskGovernorRoutePanel routeSlug="protected-profit-bucket-preview" />
    </CodexForgeAppShell>
  );
}
