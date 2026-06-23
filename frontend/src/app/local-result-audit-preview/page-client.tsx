"use client";

import { LocalModelBridgeRoutePanel } from "@/lib/codexforge/local-model-bridge/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalResultAuditPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-result-audit-preview"
      workspaceLabel="Local Result Audit Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalModelBridgeRoutePanel routeSlug="local-result-audit-preview" />
    </CodexForgeAppShell>
  );
}
