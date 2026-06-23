"use client";

import { LocalModelBridgeRoutePanel } from "@/lib/codexforge/local-model-bridge/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalTimeoutCancellationPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-timeout-cancellation-preview"
      workspaceLabel="Local Timeout Cancellation Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalModelBridgeRoutePanel routeSlug="local-timeout-cancellation-preview" />
    </CodexForgeAppShell>
  );
}
