"use client";

import { LocalModelBridgeRoutePanel } from "@/lib/codexforge/local-model-bridge/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalRuntimeIdentityPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-runtime-identity-preview"
      workspaceLabel="Local Runtime Identity Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalModelBridgeRoutePanel routeSlug="local-runtime-identity-preview" />
    </CodexForgeAppShell>
  );
}
