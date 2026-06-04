"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { JarvisdFileReadPreviewBridgePanel } from "@/lib/codexforge/jarvisd-file-read-preview-bridge/components";

export default function JarvisdFilePreviewBridgePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/jarvisd-file-preview-bridge"
      workspaceLabel="Jarvisd File Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <JarvisdFileReadPreviewBridgePanel />
    </CodexForgeAppShell>
  );
}
