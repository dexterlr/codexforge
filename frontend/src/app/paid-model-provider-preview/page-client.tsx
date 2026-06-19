"use client";

import { PaidModelProviderPreviewPanel } from "@/lib/codexforge/paid-model-provider-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PaidModelProviderPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/paid-model-provider-preview"
      workspaceLabel="Paid Model Provider Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <PaidModelProviderPreviewPanel />
    </CodexForgeAppShell>
  );
}
