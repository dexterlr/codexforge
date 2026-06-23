"use client";

import { LocalModelBridgeRoutePanel } from "@/lib/codexforge/local-model-bridge/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalCapabilityFitPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-capability-fit-preview"
      workspaceLabel="Local Capability Fit Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalModelBridgeRoutePanel routeSlug="local-capability-fit-preview" />
    </CodexForgeAppShell>
  );
}
