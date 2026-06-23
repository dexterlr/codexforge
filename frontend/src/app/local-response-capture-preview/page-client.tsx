"use client";

import { LocalModelBridgeRoutePanel } from "@/lib/codexforge/local-model-bridge/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalResponseCapturePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-response-capture-preview"
      workspaceLabel="Local Response Capture Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalModelBridgeRoutePanel routeSlug="local-response-capture-preview" />
    </CodexForgeAppShell>
  );
}
