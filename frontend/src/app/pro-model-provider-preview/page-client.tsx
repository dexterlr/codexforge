"use client";

import { ProModelProviderPreviewPanel } from "@/lib/codexforge/pro-model-provider-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProModelProviderPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/pro-model-provider-preview"
      workspaceLabel="Pro Model Provider Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProModelProviderPreviewPanel />
    </CodexForgeAppShell>
  );
}
