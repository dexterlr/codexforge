"use client";

import { LocalModelBridgeRoutePanel } from "@/lib/codexforge/local-model-bridge/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalEvidenceCapturePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-evidence-capture-preview"
      workspaceLabel="Local Evidence Capture Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalModelBridgeRoutePanel routeSlug="local-evidence-capture-preview" />
    </CodexForgeAppShell>
  );
}
