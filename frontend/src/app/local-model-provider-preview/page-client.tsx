"use client";

import { LocalModelProviderPreviewPanel } from "@/lib/codexforge/local-model-provider-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalModelProviderPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-model-provider-preview"
      workspaceLabel="Local Model Provider Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalModelProviderPreviewPanel />
    </CodexForgeAppShell>
  );
}
