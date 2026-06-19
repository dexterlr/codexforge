"use client";

import { FreeModelProviderPreviewPanel } from "@/lib/codexforge/free-model-provider-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FreeModelProviderPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/free-model-provider-preview"
      workspaceLabel="Free Model Provider Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FreeModelProviderPreviewPanel />
    </CodexForgeAppShell>
  );
}
