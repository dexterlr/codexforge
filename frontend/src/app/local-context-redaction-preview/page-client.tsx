"use client";

import { LocalModelBridgeRoutePanel } from "@/lib/codexforge/local-model-bridge/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalContextRedactionPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-context-redaction-preview"
      workspaceLabel="Local Context Redaction Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalModelBridgeRoutePanel routeSlug="local-context-redaction-preview" />
    </CodexForgeAppShell>
  );
}
